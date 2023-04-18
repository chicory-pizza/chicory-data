// @flow strict

export const GEO_WIDTH = 81;
export const GEO_HEIGHT = 46;

export const SCREEN_WIDTH = 1920;
export const SCREEN_HEIGHT = 1080 + 10; // I don't know why the geo has 10px extra at the bottom...

const PIXEL_COLOR_WALKABLE = 0;
const PIXEL_COLOR_RAMP = 1;
const PIXEL_COLOR_UNSWIMABLE_WALL = 2;
const PIXEL_COLOR_SWIMABLE_WALL = 3;
const PIXEL_COLOR_SKY = 4;
const PIXEL_COLOR_UNWALKABLE_COLLISION = 5;
const PIXEL_COLOR_WATER = 6;
const PIXEL_COLOR_HEIGHTS = [
	255,
	254,
	253,
	252,
	251,
	250,
	249,
	248,
	247, // [0, 3, 2]
	246, // [0, -2, -14]
	244, // [0, 5, 1]
	243, // [0, 6, 1]
	242, // [0, 6, 1]
];

// Colors
export const EDITOR_UI_PIXEL_COLORS: Map<number, string> = new Map([
	[PIXEL_COLOR_WALKABLE, '#fff'],
	[PIXEL_COLOR_RAMP, '#f3cd90'],
	[PIXEL_COLOR_UNSWIMABLE_WALL, '#4f4d66'],
	[PIXEL_COLOR_SWIMABLE_WALL, '#8e89c4'],
	[PIXEL_COLOR_SKY, '#a4c4ff'],
	[PIXEL_COLOR_UNWALKABLE_COLLISION, '#ef5436'],
	[PIXEL_COLOR_WATER, '#3e54e4'],
	[PIXEL_COLOR_HEIGHTS[0], '#fdcece'],
	[PIXEL_COLOR_HEIGHTS[1], '#f0afaf'],
	[PIXEL_COLOR_HEIGHTS[2], '#ce98a6'],
	[PIXEL_COLOR_HEIGHTS[3], '#c1839f'],
	[PIXEL_COLOR_HEIGHTS[4], '#b06b92'],
	[PIXEL_COLOR_HEIGHTS[5], '#9a587d'],
	[PIXEL_COLOR_HEIGHTS[6], '#825076'],
	[PIXEL_COLOR_HEIGHTS[7], '#6d4a6d'],
	[PIXEL_COLOR_HEIGHTS[8], '#594063'],
	[PIXEL_COLOR_HEIGHTS[9], '#493958'],
	[PIXEL_COLOR_HEIGHTS[10], '#3d3352'],
	[PIXEL_COLOR_HEIGHTS[11], '#35304c'],
	[PIXEL_COLOR_HEIGHTS[12], '#2e2c48'],
]);

export const EXPORT_TERRAIN_PIXEL_COLORS: Map<number, string> = new Map([
	[PIXEL_COLOR_WALKABLE, '#fff'],
	[PIXEL_COLOR_RAMP, '#e2e2e2'],
	[PIXEL_COLOR_UNSWIMABLE_WALL, '#555'],
	[PIXEL_COLOR_SWIMABLE_WALL, 'pink'],
	[PIXEL_COLOR_SKY, 'lightblue'],
	[PIXEL_COLOR_UNWALKABLE_COLLISION, 'brown'],
	[PIXEL_COLOR_WATER, 'blue'],
	[PIXEL_COLOR_HEIGHTS[0], '#eeeeee'],
	[PIXEL_COLOR_HEIGHTS[1], '#e5e5e5'],
	[PIXEL_COLOR_HEIGHTS[2], '#dddddd'],
	[PIXEL_COLOR_HEIGHTS[3], '#d4d4d4'],
	[PIXEL_COLOR_HEIGHTS[4], '#cccccc'],
	[PIXEL_COLOR_HEIGHTS[5], '#c3c3c3'],
	[PIXEL_COLOR_HEIGHTS[6], '#bbbbbb'],
	[PIXEL_COLOR_HEIGHTS[7], '#b2b2b2'],
	[PIXEL_COLOR_HEIGHTS[8], '#aaaaaa'],
	[PIXEL_COLOR_HEIGHTS[9], '#a1a1a1'],
	[PIXEL_COLOR_HEIGHTS[10], '#999999'],
	[PIXEL_COLOR_HEIGHTS[11], '#909090'],
	[PIXEL_COLOR_HEIGHTS[12], '#888888'],
]);

// Explanations
export const PIXEL_COLORS_EXPLANATIONS = [
	{
		description: 'Walkable',
		colors: [PIXEL_COLOR_WALKABLE],
	},
	{
		description: 'Ramp',
		colors: [PIXEL_COLOR_RAMP],
	},
	{
		description: 'Unswimable wall',
		colors: [PIXEL_COLOR_UNSWIMABLE_WALL],
	},
	{
		description: 'Swimable wall',
		colors: [PIXEL_COLOR_SWIMABLE_WALL],
	},
	{
		description: 'Unwalkable collision',
		colors: [PIXEL_COLOR_UNWALKABLE_COLLISION],
	},
	{
		description: 'Sky',
		colors: [PIXEL_COLOR_SKY],
	},
	{
		description: 'Water',
		colors: [PIXEL_COLOR_WATER],
	},
	{
		description: 'Higher ground layers',
		colors: [
			PIXEL_COLOR_HEIGHTS[0],
			PIXEL_COLOR_HEIGHTS[1],
			PIXEL_COLOR_HEIGHTS[2],
			PIXEL_COLOR_HEIGHTS[3],
			PIXEL_COLOR_HEIGHTS[4],
			PIXEL_COLOR_HEIGHTS[5],
			PIXEL_COLOR_HEIGHTS[6],
			PIXEL_COLOR_HEIGHTS[7],
			PIXEL_COLOR_HEIGHTS[8],
			PIXEL_COLOR_HEIGHTS[9],
			PIXEL_COLOR_HEIGHTS[10],
			PIXEL_COLOR_HEIGHTS[11],
			PIXEL_COLOR_HEIGHTS[12],
		],
	},
];

export type ToolbarColorItem = {
	description: string,
};

// For use of displaying in toolbar
const TOOLBAR_COLOR_LOOKUP: Map<number, ToolbarColorItem> = new Map();
for (const colorItem of PIXEL_COLORS_EXPLANATIONS) {
	colorItem.colors.forEach((color, arrayIndex) => {
		let description = colorItem.description;
		if (description === 'Higher ground layers') {
			description = 'Height ' + (arrayIndex + 1);
		}

		TOOLBAR_COLOR_LOOKUP.set(color, {
			description: description,
		});
	});
}

export {TOOLBAR_COLOR_LOOKUP};
