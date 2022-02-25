// @flow strict

import React from 'react';

import './LevelPreview.css';

type LevelProps = {
	ambiance: string,
	area: string,
	decos: Array<{
		ang: number,
		spr: string,
		x: number,
		xs: number,
		y: number,
		ys: number,
	}>,
	exits: string,
	foley: string,
	geo: string,
	music: string,
	name: string,
	object_id: number,
	objects: Array<{
		obj: string,
		x: number,
		y: number,
		...
	}>,
	palette: string,
	title: string,
	transition: number,
};

type Props = {
	level: LevelProps,
};

export default function LevelPreview({level}: Props): React$Node {
	console.log(level);

	return (
		<div className="LevelPreview">
			{level.objects.map((obj, index) => {
				return (
					<div
						key={index}
						style={{position: 'absolute', top: obj.y, left: obj.x}}
					>
						{obj.obj}
					</div>
				);
			})}
		</div>
	);
}
