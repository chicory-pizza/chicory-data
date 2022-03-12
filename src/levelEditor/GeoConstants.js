// @flow strict

export const GEO_WIDTH = 81;
export const GEO_HEIGHT = 46;

// Colors
const PIXEL_COLORS: Map<number, string> = new Map();

// higher ground layers
PIXEL_COLORS.set(255, '#eeeeee');
PIXEL_COLORS.set(254, '#e5e5e5');
PIXEL_COLORS.set(253, '#dddddd');
PIXEL_COLORS.set(252, '#d4d4d4');
PIXEL_COLORS.set(251, '#cccccc');
PIXEL_COLORS.set(250, '#c3c3c3');
PIXEL_COLORS.set(249, '#bbbbbb');
PIXEL_COLORS.set(248, '#b2b2b2');
PIXEL_COLORS.set(247, '#aaaaaa'); // [0, 3, 2]
PIXEL_COLORS.set(246, '#a1a1a1'); // [0, -2, -14]
PIXEL_COLORS.set(244, '#999999'); // [0, 5, 1]
PIXEL_COLORS.set(243, '#909090'); // [0, 6, 1]
PIXEL_COLORS.set(242, '#888888'); // [0, 6, 1]

PIXEL_COLORS.set(6, 'blue'); // water
PIXEL_COLORS.set(5, 'brown'); // unwalkable collision
PIXEL_COLORS.set(4, 'lightblue'); // sky
PIXEL_COLORS.set(3, 'pink'); // swimable wall
PIXEL_COLORS.set(2, '#555'); // unswimable wall
PIXEL_COLORS.set(1, '#e2e2e2'); // ramp
PIXEL_COLORS.set(0, '#fff'); // walkable

export {PIXEL_COLORS};

// Explanations
export const PIXEL_COLORS_EXPLANATIONS = [
	{
		description: 'Walkable',
		colors: [0],
	},
	{
		description: 'Ramp',
		colors: [1],
	},
	{
		description: 'Unswimable wall',
		colors: [2],
	},
	{
		description: 'Swimable wall',
		colors: [3],
	},
	{
		description: 'Unwalkable collision',
		colors: [5],
	},
	{
		description: 'Sky',
		colors: [4],
	},
	{
		description: 'Water',
		colors: [6],
	},
	{
		description: 'Higher ground layers',
		colors: [255, 254, 253, 252, 251, 250, 249, 248, 247, 246, 244, 243, 242],
	},
];
