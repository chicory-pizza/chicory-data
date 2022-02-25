// @flow

import type {LevelType} from './types/LevelType';

import {decode} from 'base64-arraybuffer';
import 'konva/lib/shapes/Rect';
import {inflate} from 'pako';
import React, {memo} from 'react';
import {Stage, Layer, Rect} from 'react-konva/lib/ReactKonvaCore';

type Props = {
	level: LevelType,
};

const GEO_WIDTH = 81;
const GEO_HEIGHT = 46;
const SCALE = 4;

const PIXEL_COLORS: {[pixel: string]: string} = {
	// higher ground layers
	'255': '#eee',
	'254': '#ddd',
	'253': '#ccc',
	'252': '#bbb',
	'251': '#aaa',
	'250': '#999',
	'249': '#888',
	'248': '#777',
	'247': '#666', // [0, 3, 2]
	'246': '#555', // [0, -2, -14]
	'244': '#444', // [0, 5, 1]
	'243': '#333', // [0, 6, 1]
	'242': '#222', // [0, 6, 1]

	'6': 'blue', // water
	'5': 'brown', // unwalkable collision
	'4': 'lightblue', // sky
	'3': 'pink', // climbable wall
	'2': '#555', // unclimbable wall
	'1': '#eee', // ramp
	'0': '#fff', // walkable
};

function GeoPreview(props: Props): React$Node {
	// todo use error boundary
	let output: Uint8Array;
	try {
		output = inflate(decode(props.level.geo));
	} catch (ex) {
		console.error(ex);
		return "Can't generate geo preview";
	}

	return (
		<div>
			<Stage
				listening={false}
				width={GEO_WIDTH * SCALE}
				height={GEO_HEIGHT * SCALE}
				scaleX={SCALE}
				scaleY={SCALE}
			>
				<Layer>
					{Array.from(output).map((pixel, index) => {
						let fill = PIXEL_COLORS[pixel];
						if (fill == null) {
							console.warn('unknown pixel color' + pixel);
							return null;
						}

						return (
							<Rect
								key={index}
								x={index % GEO_WIDTH}
								y={Math.floor(index / GEO_WIDTH)}
								width={1}
								height={1}
								fill={fill}
							/>
						);
					})}
				</Layer>
			</Stage>
		</div>
	);
}

export default (memo<Props>(GeoPreview): React$AbstractComponent<Props, mixed>);
