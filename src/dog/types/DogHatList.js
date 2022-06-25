// @flow strict

import transformImageImport from '../../util/transformImageImport';

export type DogHatType = {
	internalName: string,
	externalName: string,
	chicorobotName: string,
	imageIndex: number,
	imageWithPaddingPath?: string,

	layer2ImagePath?: string,
	showHair?: number,
	showHairExtraImagePath?: string,
};

export const DOG_HAT_LIST: $ReadOnlyArray<DogHatType> = [
	{
		internalName: 'None',
		externalName: 'None',
		chicorobotName: 'None',
		imageIndex: -1,
	},
	{
		internalName: 'Custom Hat',
		externalName: 'Custom Hat',
		chicorobotName: 'Custom',
		imageIndex: 0,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_0.png', import.meta.url)
		),
		showHair: 2,
	},
	{
		internalName: 'Bandana',
		externalName: 'Bandana (default)',
		chicorobotName: 'Bandana',
		imageIndex: 0,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_0.png', import.meta.url)
		),
	},
	{
		internalName: 'Beanie',
		externalName: 'Beanie',
		chicorobotName: 'Beanie',
		imageIndex: 1,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_1.png', import.meta.url)
		),
	},
	{
		internalName: 'Brimcap',
		externalName: 'Brimcap',
		chicorobotName: 'Brimcap',
		imageIndex: 2,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_2.png', import.meta.url)
		),
	},
	{
		internalName: 'Strawhat',
		externalName: 'Strawhat',
		chicorobotName: 'Strawhat',
		imageIndex: 3,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_3.png', import.meta.url)
		),
		showHair: 2,
	},
	{
		internalName: 'Sunhat',
		externalName: 'Sunhat',
		chicorobotName: 'Sunhat',
		imageIndex: 4,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_4.png', import.meta.url)
		),
		showHair: 2,
	},
	{
		internalName: 'Headband',
		externalName: 'Headband',
		chicorobotName: 'Headband',
		imageIndex: 8,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_8.png', import.meta.url)
		),
		showHair: 1,
	},
	{
		internalName: 'Bow',
		externalName: 'Bow',
		chicorobotName: 'Bow',
		imageIndex: 9,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_9.png', import.meta.url)
		),
		showHair: 1,
	},
	{
		internalName: 'Scarf',
		externalName: 'Scarf',
		chicorobotName: 'Scarf',
		imageIndex: -1,
		layer2ImagePath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body2_2.png', import.meta.url)
		),
	},
	{
		internalName: 'Kerchief',
		externalName: 'Kerchief',
		chicorobotName: 'Kerchief',
		imageIndex: -1,
		layer2ImagePath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body2_1.png', import.meta.url)
		),
	},
	{
		internalName: 'Antenna',
		externalName: 'Antenna',
		chicorobotName: 'Antenna',
		imageIndex: 12,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_12.png', import.meta.url)
		),
	},
	{
		internalName: 'Flower',
		externalName: 'Flower',
		chicorobotName: 'Flower',
		imageIndex: 13,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_13.png', import.meta.url)
		),
		showHair: 1,
	},
	{
		internalName: 'Howdy',
		externalName: 'Howdy',
		chicorobotName: 'Howdy',
		imageIndex: 14,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_14.png', import.meta.url)
		),
		showHair: 2,
	},
	{
		internalName: 'Shades',
		externalName: 'Shades',
		chicorobotName: 'Shades',
		imageIndex: 15,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_15.png', import.meta.url)
		),
		showHair: 1,
	},
	{
		internalName: 'Tinted Shades',
		externalName: 'Tinted Shades',
		chicorobotName: 'Tinted Shades',
		imageIndex: 16,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_16.png', import.meta.url)
		),
		showHair: 1,
	},
	{
		internalName: 'Line Shades',
		externalName: 'Line Shades',
		chicorobotName: 'Line Shades',
		imageIndex: 17,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_17.png', import.meta.url)
		),
		showHair: 1,
	},
	{
		internalName: 'Big Shades',
		externalName: 'Big Shades',
		chicorobotName: 'Big Shades',
		imageIndex: 18,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_18.png', import.meta.url)
		),
		showHair: 1,
	},
	{
		internalName: 'Beret',
		externalName: 'Beret',
		chicorobotName: 'Beret',
		imageIndex: 19,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_19.png', import.meta.url)
		),
	},
	{
		internalName: 'Wielder Tie',
		externalName: 'Wielder Wrap',
		chicorobotName: 'Wielder Wrap',
		imageIndex: 21,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_21.png', import.meta.url)
		),
	},
	{
		internalName: 'Rex Head',
		externalName: 'Rex Head',
		chicorobotName: 'Rex Head',
		imageIndex: 20,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_20.png', import.meta.url)
		),
		showHair: 2,
	},
	{
		internalName: 'Half-Moons',
		externalName: 'Half-Moons',
		chicorobotName: 'Half-Moons',
		imageIndex: 23,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_23.png', import.meta.url)
		),
		showHair: 1,
	},
	{
		internalName: 'Newsie',
		externalName: 'Newsie',
		chicorobotName: 'Newsie',
		imageIndex: 22,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_22.png', import.meta.url)
		),
	},
	{
		internalName: 'Pointish Glasses',
		externalName: 'Pointish Glasses',
		chicorobotName: 'Pointish Glasses',
		imageIndex: 26,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_26.png', import.meta.url)
		),
		showHair: 1,
	},
	{
		internalName: 'Round Glasses',
		externalName: 'Round Glasses',
		chicorobotName: 'Round Glasses',
		imageIndex: 24,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_24.png', import.meta.url)
		),
		showHair: 1,
	},
	{
		internalName: 'Square Glasses',
		externalName: 'Square Glasses',
		chicorobotName: 'Square Glasses',
		imageIndex: 25,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_25.png', import.meta.url)
		),
		showHair: 1,
	},
	{
		internalName: 'Spellcaster',
		externalName: 'Spellcaster',
		chicorobotName: 'Spellcaster',
		imageIndex: 27,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_27.png', import.meta.url)
		),
		showHair: 2,
	},
	{
		internalName: 'Backwards',
		externalName: 'Backwards',
		chicorobotName: 'Backwards',
		imageIndex: 28,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_28.png', import.meta.url)
		),
	},
	{
		internalName: 'Feather',
		externalName: 'Feather',
		chicorobotName: 'Feather',
		imageIndex: 29,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_29.png', import.meta.url)
		),
	},
	{
		internalName: 'Ahoy',
		externalName: 'Ahoy',
		chicorobotName: 'Ahoy',
		imageIndex: 30,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_30.png', import.meta.url)
		),
		showHair: 2,
	},
	{
		internalName: 'Delivery',
		externalName: 'Delivery',
		chicorobotName: 'Delivery',
		imageIndex: 31,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_31.png', import.meta.url)
		),
	},
	{
		internalName: 'Earmuffs',
		externalName: 'Earmuffs',
		chicorobotName: 'Earmuffs',
		imageIndex: 32,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_32.png', import.meta.url)
		),
		showHair: 2,
	},
	{
		internalName: 'Clown',
		externalName: 'Clown',
		chicorobotName: 'Clown',
		imageIndex: 33,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_33.png', import.meta.url)
		),
		showHair: 1,
	},
	{
		internalName: 'Wintry',
		externalName: 'Wintry',
		chicorobotName: 'Wintry',
		imageIndex: 34,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_34.png', import.meta.url)
		),
	},
	{
		internalName: 'Eyepatch',
		externalName: 'Eyepatch',
		chicorobotName: 'Eyepatch',
		imageIndex: 35,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_35.png', import.meta.url)
		),
		showHair: 1,
	},
	{
		internalName: 'Gnome',
		externalName: 'Gnome',
		chicorobotName: 'Gnome',
		imageIndex: 36,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_36.png', import.meta.url)
		),
	},
	{
		internalName: 'Mascot Head',
		externalName: 'Mascot Head',
		chicorobotName: 'Mascot Head',
		imageIndex: 37,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_37.png', import.meta.url)
		),
	},
	{
		internalName: 'Spike Helmet',
		externalName: 'Spike Helmet',
		chicorobotName: 'Spike Helmet',
		imageIndex: 38,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_38.png', import.meta.url)
		),
	},
	{
		internalName: 'Big Fungus',
		externalName: 'Big Fungus',
		chicorobotName: 'Big Fungus',
		imageIndex: 39,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_39.png', import.meta.url)
		),
		showHair: 2,
	},
	{
		internalName: 'Nautical',
		externalName: 'Nautical',
		chicorobotName: 'Nautical',
		imageIndex: 40,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_40.png', import.meta.url)
		),
	},
	{
		internalName: 'Fungus',
		externalName: 'Fungus',
		chicorobotName: 'Fungus',
		imageIndex: 41,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_41.png', import.meta.url)
		),
	},
	{
		internalName: 'Goggles',
		externalName: 'Goggles',
		chicorobotName: 'Goggles',
		imageIndex: 42,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_42.png', import.meta.url)
		),
		showHair: 1,
	},
	{
		internalName: 'Headphones',
		externalName: 'Headphones',
		chicorobotName: 'Headphones',
		imageIndex: 78,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_78.png', import.meta.url)
		),
		showHair: 2,
	},
	{
		internalName: 'Chef',
		externalName: 'Chef',
		chicorobotName: 'Chef',
		imageIndex: 43,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_43.png', import.meta.url)
		),
	},
	{
		internalName: 'Foxy',
		externalName: 'Foxy',
		chicorobotName: 'Foxy',
		imageIndex: 44,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_44.png', import.meta.url)
		),
	},
	{
		internalName: 'Sparkles',
		externalName: 'Sparkles',
		chicorobotName: 'Sparkles',
		imageIndex: 45,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_45.png', import.meta.url)
		),
		showHair: 1,
	},
	{
		internalName: 'Aviators',
		externalName: 'Aviators',
		chicorobotName: 'Aviators',
		imageIndex: 46,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_46.png', import.meta.url)
		),
		showHair: 1,
	},
	{
		internalName: 'Beak',
		externalName: 'Beak',
		chicorobotName: 'Beak',
		imageIndex: 47,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_47.png', import.meta.url)
		),
		showHair: 1,
	},
	{
		internalName: 'Rim Shades',
		externalName: 'Rim Shades',
		chicorobotName: 'Rim Shades',
		imageIndex: 48,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_48.png', import.meta.url)
		),
		showHair: 1,
	},
	{
		internalName: 'Bell',
		externalName: 'Bell',
		chicorobotName: 'Bell',
		imageIndex: 49,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_49.png', import.meta.url)
		),
		showHair: 2,
	},
	{
		internalName: 'Elf',
		externalName: 'Elf',
		chicorobotName: 'Elf',
		imageIndex: 50,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_50.png', import.meta.url)
		),
	},
	{
		internalName: 'Gardener',
		externalName: 'Gardener',
		chicorobotName: 'Gardener',
		imageIndex: 51,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_51.png', import.meta.url)
		),
	},
	{
		internalName: 'Stache',
		externalName: 'Stache',
		chicorobotName: 'Stache',
		imageIndex: 52,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_52.png', import.meta.url)
		),
		showHair: 1,
	},
	{
		internalName: 'Monocle',
		externalName: 'Monocle',
		chicorobotName: 'Monocle',
		imageIndex: 53,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_53.png', import.meta.url)
		),
		showHair: 1,
	},
	{
		internalName: 'Stormy',
		externalName: 'Stormy',
		chicorobotName: 'Stormy',
		imageIndex: 54,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_54.png', import.meta.url)
		),
		showHair: 1,
	},
	{
		internalName: 'Superstar',
		externalName: 'Superstar',
		chicorobotName: 'Superstar',
		imageIndex: 55,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_55.png', import.meta.url)
		),
		showHair: 1,
	},
	{
		internalName: 'Shawl',
		externalName: 'Shawl',
		chicorobotName: 'Shawl',
		imageIndex: -1,
		layer2ImagePath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body2_9.png', import.meta.url)
		),
	},
	{
		internalName: 'Spike',
		externalName: 'Spike',
		chicorobotName: 'Spike',
		imageIndex: -1,
		layer2ImagePath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body2_10.png', import.meta.url)
		),
	},
	{
		internalName: 'Studs',
		externalName: 'Studs',
		chicorobotName: 'Studs',
		imageIndex: -1,
		layer2ImagePath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body2_11.png', import.meta.url)
		),
	},
	{
		internalName: 'Skate Helmet',
		externalName: 'Skate Helmet',
		chicorobotName: 'Skate Helmet',
		imageIndex: 80,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_80.png', import.meta.url)
		),
	},
	{
		internalName: 'Mask',
		externalName: 'Mask',
		chicorobotName: 'Mask',
		imageIndex: 81,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_81.png', import.meta.url)
		),
		showHair: 1,
	},
	{
		internalName: 'Top Hat',
		externalName: 'Top Hat',
		chicorobotName: 'Top Hat',
		imageIndex: 82,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_82.png', import.meta.url)
		),
		showHair: 2,
	},
	{
		internalName: 'Hajib',
		externalName: 'Headscarf',
		chicorobotName: 'Headscarf',
		imageIndex: 79,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_79.png', import.meta.url)
		),
	},
	{
		internalName: 'Beard',
		externalName: 'Beard',
		chicorobotName: 'Beard',
		imageIndex: 84,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_84.png', import.meta.url)
		),
		showHair: 1,
	},
	{
		internalName: 'Tiara',
		externalName: 'Tiara',
		chicorobotName: 'Tiara',
		imageIndex: 87,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_87.png', import.meta.url)
		),
		showHair: 1,
	},
	{
		internalName: 'Crown',
		externalName: 'Crown',
		chicorobotName: 'Crown',
		imageIndex: 85,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_85.png', import.meta.url)
		),
	},
	{
		internalName: 'Earflap',
		externalName: 'Earflaps',
		chicorobotName: 'Earflaps',
		imageIndex: 86,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_86.png', import.meta.url)
		),
	},
	{
		internalName: 'PLACEHOLDER_CLOTHES1',
		externalName: 'Helm',
		chicorobotName: 'Helm',
		imageIndex: 83,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_83.png', import.meta.url)
		),
	},
	{
		internalName: 'PLACEHOLDER_CLOTHES2',
		externalName: 'Horns',
		chicorobotName: 'Horns',
		imageIndex: 88,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_88.png', import.meta.url)
		),
		showHair: 89,
		showHairExtraImagePath: transformImageImport(
			new URL('../images/hat_padding/sprDog_hat_89.png', import.meta.url)
		),
	},
].sort((a, b) => {
	if (a.externalName > b.externalName) {
		return 1;
	}

	if (a.externalName < b.externalName) {
		return -1;
	}

	return 0;
});
