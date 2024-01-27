// @flow strict

import transformImageImport from '../../util/transformImageImport';

const DOG_ANIMATIONS: Map<
	string,
	{
		idle1: Array<string>,
		idle2: Array<string>,
		ear: Array<string>,
		headAnim: Array<{
			x: number,
			y: number,
			ang: number,
		}>,
		bodyAnim: Array<{
			x: number,
			y: number,
			ang: number,
		}>,
	},
> = new Map();

DOG_ANIMATIONS.set('idle', {
	idle1: [
		transformImageImport(
			new URL(
				'../images/dog_animations/idle/sprDog_idle_A_0.png',
				import.meta.url
			)
		),
		transformImageImport(
			new URL(
				'../images/dog_animations/idle/sprDog_idle_A_1.png',
				import.meta.url
			)
		),
		transformImageImport(
			new URL(
				'../images/dog_animations/idle/sprDog_idle_A_2.png',
				import.meta.url
			)
		),
		transformImageImport(
			new URL(
				'../images/dog_animations/idle/sprDog_idle_A_3.png',
				import.meta.url
			)
		),
		transformImageImport(
			new URL(
				'../images/dog_animations/idle/sprDog_idle_A_4.png',
				import.meta.url
			)
		),
		transformImageImport(
			new URL(
				'../images/dog_animations/idle/sprDog_idle_A_5.png',
				import.meta.url
			)
		),
		transformImageImport(
			new URL(
				'../images/dog_animations/idle/sprDog_idle_A_6.png',
				import.meta.url
			)
		),
		transformImageImport(
			new URL(
				'../images/dog_animations/idle/sprDog_idle_A_7.png',
				import.meta.url
			)
		),
	],
	idle2: [
		transformImageImport(
			new URL(
				'../images/dog_animations/idle/sprDog_idle_B_0.png',
				import.meta.url
			)
		),
		transformImageImport(
			new URL(
				'../images/dog_animations/idle/sprDog_idle_B_1.png',
				import.meta.url
			)
		),
		transformImageImport(
			new URL(
				'../images/dog_animations/idle/sprDog_idle_B_2.png',
				import.meta.url
			)
		),
		transformImageImport(
			new URL(
				'../images/dog_animations/idle/sprDog_idle_B_3.png',
				import.meta.url
			)
		),
		transformImageImport(
			new URL(
				'../images/dog_animations/idle/sprDog_idle_B_4.png',
				import.meta.url
			)
		),
		transformImageImport(
			new URL(
				'../images/dog_animations/idle/sprDog_idle_B_5.png',
				import.meta.url
			)
		),
		transformImageImport(
			new URL(
				'../images/dog_animations/idle/sprDog_idle_B_6.png',
				import.meta.url
			)
		),
		transformImageImport(
			new URL(
				'../images/dog_animations/idle/sprDog_idle_B_7.png',
				import.meta.url
			)
		),
	],
	ear: [
		transformImageImport(
			new URL(
				'../images/dog_animations/idle/sprDog_idle_ear_0.png',
				import.meta.url
			)
		),
		transformImageImport(
			new URL(
				'../images/dog_animations/idle/sprDog_idle_ear_1.png',
				import.meta.url
			)
		),
		transformImageImport(
			new URL(
				'../images/dog_animations/idle/sprDog_idle_ear_2.png',
				import.meta.url
			)
		),
		transformImageImport(
			new URL(
				'../images/dog_animations/idle/sprDog_idle_ear_3.png',
				import.meta.url
			)
		),
		transformImageImport(
			new URL(
				'../images/dog_animations/idle/sprDog_idle_ear_4.png',
				import.meta.url
			)
		),
		transformImageImport(
			new URL(
				'../images/dog_animations/idle/sprDog_idle_ear_5.png',
				import.meta.url
			)
		),
		transformImageImport(
			new URL(
				'../images/dog_animations/idle/sprDog_idle_ear_6.png',
				import.meta.url
			)
		),
		transformImageImport(
			new URL(
				'../images/dog_animations/idle/sprDog_idle_ear_7.png',
				import.meta.url
			)
		),
	],
	headAnim: [
		{x: -2.5, y: -45.6, ang: 0.32},
		{x: -2.2, y: -45.05, ang: 0.32},
		{x: -1.85, y: -46.2, ang: 0.32},
		{x: -2.45, y: -48.65, ang: 0.45},
		{x: -2.75, y: -49.5, ang: 0.32},
		{x: -2.75, y: -49.9, ang: 0.32},
		{x: -2.75, y: -47.75, ang: 0.32},
		{x: -2.5, y: -46.85, ang: 0.32},
	],
	bodyAnim: [
		{x: -4.55, y: -12.05, ang: 0},
		{x: -4.3, y: -12.3, ang: 0},
		{x: -3.55, y: -13.55, ang: 0},
		{x: -4.1, y: -14.05, ang: 0},
		{x: -4.1, y: -14.05, ang: 0},
		{x: -4.05, y: -14.05, ang: 0},
		{x: -3.85, y: -13.4, ang: 0},
		{x: -3.95, y: -12.3, ang: 0},
	],
});

export default DOG_ANIMATIONS;
