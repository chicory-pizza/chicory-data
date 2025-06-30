import {DOG_CLOTHES_LIST} from '../../types/DogClothesList';
import {DOG_EXPRESSION_LIST} from '../../types/DogExpressionList';
import {DOG_HAIR_LIST} from '../../types/DogHairList';
import {DOG_HAT_LIST} from '../../types/DogHatList';
import type {DrawdogPreset} from '../DrawdogPresets';
import {DRAWDOG_PRESETS} from '../DrawdogPresets';

// The browser color picker returns the hex colors in lowercase
// so match the preset colors to that
//
// https://html.spec.whatwg.org/multipage/input.html#color-state-(type=color)
const VALID_COLOR = /^#[0-9a-f]{6}$/;

test.each(DRAWDOG_PRESETS)(
	'clothes and colors for $name are valid',
	(preset: DrawdogPreset) => {
		expect(
			DOG_CLOTHES_LIST.find((clothes) => {
				return preset.clothes === clothes.internalName;
			})
		).toBeTruthy();

		expect(preset.clothesColor).toMatch(VALID_COLOR);

		const presetExpression = preset.expression ?? 'normal';
		expect(
			DOG_EXPRESSION_LIST.find((expression) => {
				return presetExpression === expression.value;
			})
		).toBeTruthy();

		expect(
			DOG_HAIR_LIST.find((hair) => {
				return preset.hair === hair.internalName;
			})
		).toBeTruthy();

		preset.hats.forEach((presetHat) => {
			expect(
				DOG_HAT_LIST.find((hat) => {
					return presetHat.name === hat.internalName;
				})
			).toBeTruthy();

			expect(presetHat.color).toMatch(VALID_COLOR);
		});

		expect(preset.name).not.toBe('');

		expect(preset.skinColor).toMatch(VALID_COLOR);

		expect(preset.skinOutlineColor ?? '#000000').toMatch(VALID_COLOR);
	}
);
