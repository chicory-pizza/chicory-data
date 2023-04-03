// @flow strict

import {memo, useCallback, useEffect, useReducer, useState} from 'react';

import type {TransformType} from '../types/TransformType';

type TransformAction = 'move';

type Props = $ReadOnly<{
	baseTransform: TransformType,
	className: string,
	renderOffset: ?[number, number],
	mapMouseMoveCoordinates: ?[number, number],
	origin: ?[number, number],
	onTransformUpdate: (transform: TransformType) => mixed,
	children: React$Node,
	...
}>;

type ReducerAction =
	| {type: 'move', deltaX: number, deltaY: number}
	| {type: null};

function TransformDiv({
	baseTransform,
	renderOffset,
	mapMouseMoveCoordinates,
	children,
	onTransformUpdate,
	origin,
	className,
	...otherProps
}: Props): React$Node {
	const [currentTransform, dispatch] = useReducer(
		transformReducer,
		baseTransform
	);
	const [transformAction, setTransformAction] =
		useState<?TransformAction>(null);
	const [prevMousePos, setPrevMousePos] = useState<?[number, number]>(null);

	function onMouseDown(
		ev: SyntheticMouseEvent<HTMLDivElement>,
		action: TransformAction
	) {
		if (mapMouseMoveCoordinates != null) {
			ev.preventDefault();
			setPrevMousePos(mapMouseMoveCoordinates);
			setTransformAction(action);
		}
	}

	const onMouseUp = useCallback(
		(ev: MouseEvent) => {
			if (transformAction != null) {
				setPrevMousePos(null);
				setTransformAction(null);
				onTransformUpdate(currentTransform);
			}
		},
		[transformAction, currentTransform, onTransformUpdate]
	);

	useEffect(() => {
		document.addEventListener('mouseup', onMouseUp);

		return () => {
			document.removeEventListener('mouseup', onMouseUp);
		};
	}, [onMouseUp]);

	function transformReducer(
		prevTransform: TransformType,
		action: ReducerAction
	) {
		switch (action.type) {
			case 'move':
				return {
					...prevTransform,
					x: prevTransform.x + action.deltaX,
					y: prevTransform.y + action.deltaY,
				};
			default:
				return prevTransform;
		}
	}

	useEffect(() => {
		if (
			prevMousePos != null &&
			mapMouseMoveCoordinates != null &&
			transformAction != null
		) {
			setPrevMousePos(mapMouseMoveCoordinates);

			dispatch({
				type: transformAction,
				deltaX: mapMouseMoveCoordinates[0] - prevMousePos[0],
				deltaY: mapMouseMoveCoordinates[1] - prevMousePos[1],
			});
		}
	}, [transformAction, mapMouseMoveCoordinates, prevMousePos]);

	const getTransformStyle = useCallback(() => {
		const transforms = [];
		let transformOrigin = '';

		transformOrigin = origin != null ? `${origin[0]}px ${origin[1]}px` : '';

		if (
			typeof currentTransform.xScale === 'number' &&
			currentTransform.xScale !== 1
		) {
			transforms.push(`scaleX(${currentTransform.xScale})`);
		}

		if (
			typeof currentTransform.yScale === 'number' &&
			currentTransform.yScale !== 1
		) {
			transforms.push(`scaleY(${currentTransform.yScale})`);
		}

		if (
			typeof currentTransform.angle === 'number' &&
			currentTransform.angle !== 0
		) {
			transforms.push(
				`rotate(${
					-1 *
					Math.sign(
						currentTransform.xScale != null ? currentTransform.xScale : 1
					) *
					(currentTransform.angle != null ? currentTransform.angle : 0)
				}deg)`
			);
		}

		return {
			left: currentTransform.x + (renderOffset != null ? renderOffset[0] : 0),
			top: currentTransform.y + (renderOffset != null ? renderOffset[1] : 0),
			transform: transforms.length !== 0 ? transforms.join(' ') : null,
			transformOrigin,
		};
	}, [currentTransform, renderOffset, origin]);

	return (
		// eslint-disable-next-line jsx-a11y/no-static-element-interactions
		<div
			{...otherProps}
			className={className}
			onMouseDown={(ev) => onMouseDown(ev, 'move')}
			style={getTransformStyle()}
		>
			{children}
		</div>
	);
}

export default (memo<Props>(TransformDiv): React$AbstractComponent<
	Props,
	mixed
>);
