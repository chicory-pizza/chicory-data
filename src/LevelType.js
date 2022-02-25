// @flow strict

export type LevelType = {
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
	exits?: string,
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
	title?: string,
	transition: number,
};
