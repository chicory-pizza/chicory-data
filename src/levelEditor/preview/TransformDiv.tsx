import {useCallback, useEffect, useReducer, useState} from 'react';

import type {TransformType} from '../types/TransformType';

type TransformAction = 'MOVE';

type Props = Readonly<
	{
		baseTransform: TransformType;
		centerDiv?: boolean;
		rotateFirst?: boolean;
		renderOffset: [number, number] | null;
		mapMouseMoveCoordinates: [number, number] | null;
		origin: [number, number] | null;
		onTransformUpdate: (transform: TransformType) => void;
	} & Omit<React.ComponentProps<'div'>, 'onMouseDown' | 'style'>
>;

type ReducerAction =
	| {
			type: 'MOVE';
			deltaX: number;
			deltaY: number;
	  }
	| {
			type: 'SET';
			transform: TransformType;
	  };

function transformReducer(prevTransform: TransformType, action: ReducerAction) {
	switch (action.type) {
		case 'MOVE':
			return {
				...prevTransform,
				x: prevTransform.x + action.deltaX,
				y: prevTransform.y + action.deltaY,
			};
		case 'SET':
			return action.transform;
		default:
			return prevTransform;
	}
}

export default function TransformDiv({
	baseTransform,
	renderOffset,
	mapMouseMoveCoordinates,
	centerDiv,
	onTransformUpdate,
	origin,
	rotateFirst,
	...otherProps
}: Props) {
	const [currentTransform, dispatch] = useReducer(
		transformReducer,
		baseTransform
	);
	const [currentTransformAction, setCurrentTransformAction] =
		useState<TransformAction | null>(null);
	const [prevMousePos, setPrevMousePos] = useState<[number, number] | null>(
		null
	);

	function onMouseDown(
		ev: React.MouseEvent<HTMLDivElement>,
		action: TransformAction
	) {
		if (ev.buttons === 1 && mapMouseMoveCoordinates != null) {
			ev.preventDefault();
			setPrevMousePos(mapMouseMoveCoordinates);
			setCurrentTransformAction(action);
		}
	}

	const onMouseUp = useCallback(() => {
		if (currentTransformAction != null) {
			setPrevMousePos(null);
			setCurrentTransformAction(null);
			onTransformUpdate(currentTransform);
		}
	}, [currentTransformAction, currentTransform, onTransformUpdate]);

	useEffect(() => {
		document.addEventListener('mouseup', onMouseUp);

		return () => {
			document.removeEventListener('mouseup', onMouseUp);
		};
	}, [onMouseUp]);

	// Mainly for updating transform when it gets updated by something other than dragging/dropping
	useEffect(() => {
		dispatch({
			type: 'SET',
			transform: {
				x: baseTransform.x,
				y: baseTransform.y,
				xScale: baseTransform.xScale,
				yScale: baseTransform.yScale,
				angle: baseTransform.angle,
			},
		});
	}, [
		baseTransform.x,
		baseTransform.y,
		baseTransform.xScale,
		baseTransform.yScale,
		baseTransform.angle,
	]);

	useEffect(() => {
		// Decided to detect changes to mapMouseMoveCoordinates instead of using mousemove events since
		// mapMouseMoveCoordinates gets updated by LevelInspector anyways.
		if (
			prevMousePos != null &&
			mapMouseMoveCoordinates != null &&
			currentTransformAction != null
		) {
			setPrevMousePos(mapMouseMoveCoordinates);

			dispatch({
				type: currentTransformAction,
				deltaX: mapMouseMoveCoordinates[0] - prevMousePos[0],
				deltaY: mapMouseMoveCoordinates[1] - prevMousePos[1],
			});
		}
	}, [currentTransformAction, mapMouseMoveCoordinates, prevMousePos]);

	const getTransformStyle = useCallback(() => {
		const transforms = [];

		const transformOrigin =
			origin != null ? `${origin[0]}px ${origin[1]}px` : '';

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
			const rotateTransform = `rotate(${
				-1 *
				Math.sign(
					currentTransform.xScale != null ? currentTransform.xScale : 1
				) *
				(currentTransform.angle != null ? currentTransform.angle : 0)
			}deg)`;

			if (rotateFirst) {
				transforms.unshift(rotateTransform);
			} else {
				transforms.push(rotateTransform);
			}
		}

		return {
			left: currentTransform.x + (renderOffset != null ? renderOffset[0] : 0),
			top: currentTransform.y + (renderOffset != null ? renderOffset[1] : 0),
			transform:
				transforms.length !== 0
					? (centerDiv ? 'translate(-50%, -50%) ' : '') + transforms.join(' ')
					: '',
			transformOrigin,
			cursor: currentTransformAction === 'MOVE' ? 'move' : 'pointer',
		};
	}, [
		currentTransform,
		renderOffset,
		origin,
		currentTransformAction,
		rotateFirst,
		centerDiv,
	]);

	return (
		// eslint-disable-next-line jsx-a11y/no-static-element-interactions
		<div
			{...otherProps}
			onMouseDown={(ev) => onMouseDown(ev, 'MOVE')}
			style={getTransformStyle()}
		/>
	);
}
