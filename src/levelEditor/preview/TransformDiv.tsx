import {useMemo} from 'react';

type Props = Readonly<
	{
		baseTransform: {
			x: number;
			y: number;
			xScale?: number;
			yScale?: number;
			angle?: number;
		};
		centerDiv?: boolean;
		origin: [number, number] | null;
		renderOffset: [number, number] | null;
		rotateFirst?: boolean;
	} & Omit<React.ComponentProps<'div'>, 'style'>
>;

export default function TransformDiv({
	baseTransform,
	centerDiv,
	origin,
	renderOffset,
	rotateFirst,
	...otherProps
}: Props) {
	const styles = useMemo(() => {
		const transforms = [];

		if (
			typeof baseTransform.xScale === 'number' &&
			baseTransform.xScale !== 1
		) {
			transforms.push(`scaleX(${baseTransform.xScale.toString()})`);
		}

		if (
			typeof baseTransform.yScale === 'number' &&
			baseTransform.yScale !== 1
		) {
			transforms.push(`scaleY(${baseTransform.yScale.toString()})`);
		}

		if (typeof baseTransform.angle === 'number' && baseTransform.angle !== 0) {
			const rotateTransform = `rotate(${(
				-1 *
				Math.sign(baseTransform.xScale != null ? baseTransform.xScale : 1) *
				(baseTransform.angle != null ? baseTransform.angle : 0)
			).toString()}deg)`;

			if (rotateFirst) {
				transforms.unshift(rotateTransform);
			} else {
				transforms.push(rotateTransform);
			}
		}

		return {
			left: baseTransform.x + (renderOffset != null ? renderOffset[0] : 0),
			top: baseTransform.y + (renderOffset != null ? renderOffset[1] : 0),
			transform:
				transforms.length !== 0
					? (centerDiv ? 'translate(-50%, -50%) ' : '') + transforms.join(' ')
					: '',
			transformOrigin:
				origin != null
					? `${origin[0].toString()}px ${origin[1].toString()}px`
					: '',
		};
	}, [
		baseTransform.angle,
		baseTransform.x,
		baseTransform.xScale,
		baseTransform.y,
		baseTransform.yScale,
		centerDiv,
		origin,
		renderOffset,
		rotateFirst,
	]);

	return <div {...otherProps} style={styles} />;
}
