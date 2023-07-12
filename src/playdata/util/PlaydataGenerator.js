// @flow strict

import type {DrawdogPreset} from '../../dog/presets/DrawdogPresets';
import convertHexToBgrInteger from '../../util/convertHexToBgrInteger';

type Playdata = $ReadOnly<{
	customBrushColors?: Array<string>,
	dog?: $ReadOnly<{
		clothes?: string,
		clothesColor?: string,
		hair?: string,
		hatName?: string,
		hatColor?: string,
		name?: string,
		skinColor?: string,
	}>,
}>;

type GameSave = {
	clothes?: string,
	color_part_0?: number, // hatColor
	color_part_1?: number, // skinColor
	color_part_2?: number, // clothesColor
	custompaint_0?: number,
	custompaint_1?: number,
	custompaint_2?: number,
	custompaint_3?: number,
	custompaint_4?: number,
	custompaint_5?: number,
	custompaint_6?: number,
	custompaint_7?: number,
	hair?: string,
	hat?: string,
	name?: string,
};

export default class PlaydataGenerator {
	#playdata: Playdata = {};

	// eslint-disable-next-line no-use-before-define
	static loadFromDogPreset(preset: DrawdogPreset): PlaydataGenerator {
		return new PlaydataGenerator()
			.setDogClothes(preset.clothes)
			.setDogClothesColor(preset.clothesColor)
			.setDogHair(preset.hair)
			.setDogHatName(preset.hats[0].name)
			.setDogHatColor(preset.hats[0].color)
			.setDogName(preset.name)
			.setDogSkinColor(preset.skinColor);
	}

	exportToGameSave(): GameSave {
		const save: GameSave = {};

		const {customBrushColors, dog} = this.#playdata;
		if (dog) {
			save.clothes = dog.clothes ?? undefined;
			save.color_part_2 =
				dog.clothesColor != null
					? convertHexToBgrInteger(dog.clothesColor)
					: undefined;
			save.hair = dog.hair ?? undefined;
			save.hat = dog.hatName ?? undefined;
			save.color_part_0 =
				dog.hatColor != null ? convertHexToBgrInteger(dog.hatColor) : undefined;
			save.name = dog.name ?? undefined;
			save.color_part_1 =
				dog.skinColor != null
					? convertHexToBgrInteger(dog.skinColor)
					: undefined;
		}

		if (customBrushColors) {
			save.custompaint_0 =
				customBrushColors[0] != null
					? convertHexToBgrInteger(customBrushColors[0])
					: undefined;
			save.custompaint_1 =
				customBrushColors[1] != null
					? convertHexToBgrInteger(customBrushColors[1])
					: undefined;
			save.custompaint_2 =
				customBrushColors[2] != null
					? convertHexToBgrInteger(customBrushColors[2])
					: undefined;
			save.custompaint_3 =
				customBrushColors[3] != null
					? convertHexToBgrInteger(customBrushColors[3])
					: undefined;
			save.custompaint_4 =
				customBrushColors[4] != null
					? convertHexToBgrInteger(customBrushColors[4])
					: undefined;
			save.custompaint_5 =
				customBrushColors[5] != null
					? convertHexToBgrInteger(customBrushColors[5])
					: undefined;
			save.custompaint_6 =
				customBrushColors[6] != null
					? convertHexToBgrInteger(customBrushColors[6])
					: undefined;
			save.custompaint_7 =
				customBrushColors[7] != null
					? convertHexToBgrInteger(customBrushColors[7])
					: undefined;
		}

		return save;
	}

	// Dog appearance
	setDogClothes(clothes: ?string): this {
		this.#playdata = {
			...this.#playdata,
			dog: {
				...this.#playdata.dog,
				clothes: clothes ?? undefined,
			},
		};

		return this;
	}

	setDogClothesColor(clothesColor: ?string): this {
		this.#playdata = {
			...this.#playdata,
			dog: {
				...this.#playdata.dog,
				clothesColor: clothesColor ?? undefined,
			},
		};

		return this;
	}

	setDogHair(hair: ?string): this {
		this.#playdata = {
			...this.#playdata,
			dog: {
				...this.#playdata.dog,
				hair: hair ?? undefined,
			},
		};

		return this;
	}

	setDogHatName(hatName: ?string): this {
		this.#playdata = {
			...this.#playdata,
			dog: {
				...this.#playdata.dog,
				hatName: hatName ?? undefined,
			},
		};

		return this;
	}

	setDogHatColor(hatColor: ?string): this {
		this.#playdata = {
			...this.#playdata,
			dog: {
				...this.#playdata.dog,
				hatColor: hatColor ?? undefined,
			},
		};

		return this;
	}

	setDogName(name: ?string): this {
		this.#playdata = {
			...this.#playdata,
			dog: {
				...this.#playdata.dog,
				name: name ?? undefined,
			},
		};

		return this;
	}

	setDogSkinColor(skinColor: ?string): this {
		this.#playdata = {
			...this.#playdata,
			dog: {
				...this.#playdata.dog,
				skinColor: skinColor ?? undefined,
			},
		};

		return this;
	}

	// Other
	setCustomBrushColors(customBrushColors: ?Array<string>): this {
		if (customBrushColors != null && customBrushColors.length > 8) {
			throw new Error('Custom brush colors can only have a maximum of 8');
		}

		this.#playdata = {
			...this.#playdata,
			customBrushColors: customBrushColors ?? undefined,
		};

		return this;
	}
}
