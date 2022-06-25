// @flow strict

import type {DrawdogPreset} from '../DrawdogPresets';
import {DRAWDOG_PRESETS} from '../DrawdogPresets';

const VALID_COLOR = /^#[0-9a-f]{6}$/;

test.each(DRAWDOG_PRESETS)(
	'colors for $name are valid',
	async (preset: DrawdogPreset) => {
		// The browser color picker returns the hex colors in lowercase
		// so match the preset colors to that
		//
		// https://html.spec.whatwg.org/multipage/input.html#color-state-(type=color)
		expect(preset.clothesColor).toMatch(VALID_COLOR);

		preset.hats.forEach((hat) => {
			expect(hat.color).toMatch(VALID_COLOR);
		});

		expect(preset.skinColor).toMatch(VALID_COLOR);
	}
);
