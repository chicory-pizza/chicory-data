// @flow strict

export const GEO_WIDTH = 81;
export const GEO_HEIGHT = 46;

export const SCREEN_WIDTH = 1920;
export const SCREEN_HEIGHT: number = 1080 + 10; // I don't know why the geo has 10px extra at the bottom...

// Colors
const EDITOR_UI_PIXEL_COLORS: Map<number, string> = new Map();
const EXPORT_TERRAIN_PIXEL_COLORS: Map<number, string> = new Map();

// higher ground layers
EDITOR_UI_PIXEL_COLORS.set(255, '#eeeeee');
EDITOR_UI_PIXEL_COLORS.set(254, '#e5e5e5');
EDITOR_UI_PIXEL_COLORS.set(253, '#dddddd');
EDITOR_UI_PIXEL_COLORS.set(252, '#d4d4d4');
EDITOR_UI_PIXEL_COLORS.set(251, '#cccccc');
EDITOR_UI_PIXEL_COLORS.set(250, '#c3c3c3');
EDITOR_UI_PIXEL_COLORS.set(249, '#bbbbbb');
EDITOR_UI_PIXEL_COLORS.set(248, '#b2b2b2');
EDITOR_UI_PIXEL_COLORS.set(247, '#aaaaaa'); // [0, 3, 2]
EDITOR_UI_PIXEL_COLORS.set(246, '#a1a1a1'); // [0, -2, -14]
EDITOR_UI_PIXEL_COLORS.set(244, '#999999'); // [0, 5, 1]
EDITOR_UI_PIXEL_COLORS.set(243, '#909090'); // [0, 6, 1]
EDITOR_UI_PIXEL_COLORS.set(242, '#888888'); // [0, 6, 1]

EDITOR_UI_PIXEL_COLORS.set(6, 'blue'); // water
EDITOR_UI_PIXEL_COLORS.set(5, 'brown'); // unwalkable collision
EDITOR_UI_PIXEL_COLORS.set(4, 'lightblue'); // sky
EDITOR_UI_PIXEL_COLORS.set(3, 'pink'); // swimable wall
EDITOR_UI_PIXEL_COLORS.set(2, '#555'); // unswimable wall
EDITOR_UI_PIXEL_COLORS.set(1, '#e2e2e2'); // ramp
EDITOR_UI_PIXEL_COLORS.set(0, '#fff'); // walkable

// higher ground layers
EXPORT_TERRAIN_PIXEL_COLORS.set(255, '#eeeeee');
EXPORT_TERRAIN_PIXEL_COLORS.set(254, '#e5e5e5');
EXPORT_TERRAIN_PIXEL_COLORS.set(253, '#dddddd');
EXPORT_TERRAIN_PIXEL_COLORS.set(252, '#d4d4d4');
EXPORT_TERRAIN_PIXEL_COLORS.set(251, '#cccccc');
EXPORT_TERRAIN_PIXEL_COLORS.set(250, '#c3c3c3');
EXPORT_TERRAIN_PIXEL_COLORS.set(249, '#bbbbbb');
EXPORT_TERRAIN_PIXEL_COLORS.set(248, '#b2b2b2');
EXPORT_TERRAIN_PIXEL_COLORS.set(247, '#aaaaaa'); // [0, 3, 2]
EXPORT_TERRAIN_PIXEL_COLORS.set(246, '#a1a1a1'); // [0, -2, -14]
EXPORT_TERRAIN_PIXEL_COLORS.set(244, '#999999'); // [0, 5, 1]
EXPORT_TERRAIN_PIXEL_COLORS.set(243, '#909090'); // [0, 6, 1]
EXPORT_TERRAIN_PIXEL_COLORS.set(242, '#888888'); // [0, 6, 1]

EXPORT_TERRAIN_PIXEL_COLORS.set(6, 'blue'); // water
EXPORT_TERRAIN_PIXEL_COLORS.set(5, 'brown'); // unwalkable collision
EXPORT_TERRAIN_PIXEL_COLORS.set(4, 'lightblue'); // sky
EXPORT_TERRAIN_PIXEL_COLORS.set(3, 'pink'); // swimable wall
EXPORT_TERRAIN_PIXEL_COLORS.set(2, '#555'); // unswimable wall
EXPORT_TERRAIN_PIXEL_COLORS.set(1, '#e2e2e2'); // ramp
EXPORT_TERRAIN_PIXEL_COLORS.set(0, '#fff'); // walkable

export {EDITOR_UI_PIXEL_COLORS, EXPORT_TERRAIN_PIXEL_COLORS};

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

export type ToolbarColorItem = {
	description: string,
};
// For use of displaying in toolbar
const TOOLBAR_COLOR_LOOKUP: Map<number, ToolbarColorItem> = new Map();
for (const colorItem of PIXEL_COLORS_EXPLANATIONS) {
	colorItem.colors.forEach((color, arrayIndex) => {
		let description = colorItem.description;
		if (description === 'Higher ground layers') {
			description = 'Height ' + arrayIndex;
		}

		TOOLBAR_COLOR_LOOKUP.set(color, {
			description: description,
		});
	});
}

export {TOOLBAR_COLOR_LOOKUP};
