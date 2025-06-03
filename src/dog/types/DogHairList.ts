import transformImageImport from '../../util/transformImageImport';

export type DogHairType = {
	internalName: string;
	externalName: string;
	chicorobotName: string;
	imageIndex: number;
	imageWithPaddingPath: string;
	imageWithTrimmedPath: string;
};

export const DOG_HAIR_LIST: ReadonlyArray<DogHairType> = [
	{
		internalName: 'Simple',
		externalName: 'Simple (default)',
		chicorobotName: 'Simple',
		imageIndex: 5,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hair_padding/sprDog_hat_5.png', import.meta.url)
		),
		imageWithTrimmedPath: transformImageImport(
			new URL('../images/hair_trimmed/sprDog_hat_5.png', import.meta.url)
		),
	},
	{
		internalName: 'Flip',
		externalName: 'Flip',
		chicorobotName: 'Flip',
		imageIndex: 6,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hair_padding/sprDog_hat_6.png', import.meta.url)
		),
		imageWithTrimmedPath: transformImageImport(
			new URL('../images/hair_trimmed/sprDog_hat_6.png', import.meta.url)
		),
	},
	{
		internalName: 'Floofy',
		externalName: 'Floofy',
		chicorobotName: 'Floofy',
		imageIndex: 7,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hair_padding/sprDog_hat_7.png', import.meta.url)
		),
		imageWithTrimmedPath: transformImageImport(
			new URL('../images/hair_trimmed/sprDog_hat_7.png', import.meta.url)
		),
	},
	{
		internalName: 'Big Fluffy',
		externalName: 'Big Fluffy',
		chicorobotName: 'Big Fluffy',
		imageIndex: 10,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hair_padding/sprDog_hat_10.png', import.meta.url)
		),
		imageWithTrimmedPath: transformImageImport(
			new URL('../images/hair_trimmed/sprDog_hat_10.png', import.meta.url)
		),
	},
	{
		internalName: 'Gorgeous',
		externalName: 'Gorgeous',
		chicorobotName: 'Gorgeous',
		imageIndex: 11,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hair_padding/sprDog_hat_11.png', import.meta.url)
		),
		imageWithTrimmedPath: transformImageImport(
			new URL('../images/hair_trimmed/sprDog_hat_11.png', import.meta.url)
		),
	},
	{
		internalName: 'Mullet',
		externalName: 'Mullet',
		chicorobotName: 'Mullet',
		imageIndex: 56,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hair_padding/sprDog_hat_56.png', import.meta.url)
		),
		imageWithTrimmedPath: transformImageImport(
			new URL('../images/hair_trimmed/sprDog_hat_56.png', import.meta.url)
		),
	},
	{
		internalName: 'Bowl',
		externalName: 'Bowl',
		chicorobotName: 'Bowl',
		imageIndex: 57,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hair_padding/sprDog_hat_57.png', import.meta.url)
		),
		imageWithTrimmedPath: transformImageImport(
			new URL('../images/hair_trimmed/sprDog_hat_57.png', import.meta.url)
		),
	},
	{
		internalName: 'Pony',
		externalName: 'Pony',
		chicorobotName: 'Pony',
		imageIndex: 58,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hair_padding/sprDog_hat_58.png', import.meta.url)
		),
		imageWithTrimmedPath: transformImageImport(
			new URL('../images/hair_trimmed/sprDog_hat_58.png', import.meta.url)
		),
	},
	{
		internalName: 'Hedgehog',
		externalName: 'Hedgehog',
		chicorobotName: 'Hedgehog',
		imageIndex: 59,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hair_padding/sprDog_hat_59.png', import.meta.url)
		),
		imageWithTrimmedPath: transformImageImport(
			new URL('../images/hair_trimmed/sprDog_hat_59.png', import.meta.url)
		),
	},
	{
		internalName: 'Boyband',
		externalName: 'Boyband',
		chicorobotName: 'Boyband',
		imageIndex: 60,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hair_padding/sprDog_hat_60.png', import.meta.url)
		),
		imageWithTrimmedPath: transformImageImport(
			new URL('../images/hair_trimmed/sprDog_hat_60.png', import.meta.url)
		),
	},
	{
		internalName: 'Shaved',
		externalName: 'Shaved',
		chicorobotName: 'Shaved',
		imageIndex: 61,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hair_padding/sprDog_hat_61.png', import.meta.url)
		),
		imageWithTrimmedPath: transformImageImport(
			new URL('../images/hair_trimmed/sprDog_hat_61.png', import.meta.url)
		),
	},
	{
		internalName: 'Shortcurl',
		externalName: 'Shortcurl',
		chicorobotName: 'Shortcurl',
		imageIndex: 62,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hair_padding/sprDog_hat_62.png', import.meta.url)
		),
		imageWithTrimmedPath: transformImageImport(
			new URL('../images/hair_trimmed/sprDog_hat_62.png', import.meta.url)
		),
	},
	{
		internalName: 'Pixie',
		externalName: 'Pixie',
		chicorobotName: 'Pixie',
		imageIndex: 63,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hair_padding/sprDog_hat_63.png', import.meta.url)
		),
		imageWithTrimmedPath: transformImageImport(
			new URL('../images/hair_trimmed/sprDog_hat_63.png', import.meta.url)
		),
	},
	{
		internalName: 'Bob',
		externalName: 'Bob',
		chicorobotName: 'Bob',
		imageIndex: 64,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hair_padding/sprDog_hat_64.png', import.meta.url)
		),
		imageWithTrimmedPath: transformImageImport(
			new URL('../images/hair_trimmed/sprDog_hat_64.png', import.meta.url)
		),
	},
	{
		internalName: 'Anime',
		externalName: 'Anime',
		chicorobotName: 'Anime',
		imageIndex: 65,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hair_padding/sprDog_hat_65.png', import.meta.url)
		),
		imageWithTrimmedPath: transformImageImport(
			new URL('../images/hair_trimmed/sprDog_hat_65.png', import.meta.url)
		),
	},
	{
		internalName: 'Dreds',
		externalName: 'Dreds',
		chicorobotName: 'Dreds',
		imageIndex: 66,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hair_padding/sprDog_hat_66.png', import.meta.url)
		),
		imageWithTrimmedPath: transformImageImport(
			new URL('../images/hair_trimmed/sprDog_hat_66.png', import.meta.url)
		),
	},
	{
		internalName: 'Fuzz',
		externalName: 'Fuzz',
		chicorobotName: 'Fuzz',
		imageIndex: 67,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hair_padding/sprDog_hat_67.png', import.meta.url)
		),
		imageWithTrimmedPath: transformImageImport(
			new URL('../images/hair_trimmed/sprDog_hat_67.png', import.meta.url)
		),
	},
	{
		internalName: 'Fro',
		externalName: 'Fro',
		chicorobotName: 'Fro',
		imageIndex: 68,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hair_padding/sprDog_hat_68.png', import.meta.url)
		),
		imageWithTrimmedPath: transformImageImport(
			new URL('../images/hair_trimmed/sprDog_hat_68.png', import.meta.url)
		),
	},
	{
		internalName: 'Emo',
		externalName: 'Emo',
		chicorobotName: 'Emo',
		imageIndex: 69,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hair_padding/sprDog_hat_69.png', import.meta.url)
		),
		imageWithTrimmedPath: transformImageImport(
			new URL('../images/hair_trimmed/sprDog_hat_69.png', import.meta.url)
		),
	},
	{
		internalName: 'Pigtails',
		externalName: 'Pigtails',
		chicorobotName: 'Pigtails',
		imageIndex: 70,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hair_padding/sprDog_hat_70.png', import.meta.url)
		),
		imageWithTrimmedPath: transformImageImport(
			new URL('../images/hair_trimmed/sprDog_hat_70.png', import.meta.url)
		),
	},
	{
		internalName: 'Pompadour',
		externalName: 'Pompadour',
		chicorobotName: 'Pompadour',
		imageIndex: 71,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hair_padding/sprDog_hat_71.png', import.meta.url)
		),
		imageWithTrimmedPath: transformImageImport(
			new URL('../images/hair_trimmed/sprDog_hat_71.png', import.meta.url)
		),
	},
	{
		internalName: 'Spikehawk',
		externalName: 'Spikehawk',
		chicorobotName: 'Spikehawk',
		imageIndex: 72,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hair_padding/sprDog_hat_72.png', import.meta.url)
		),
		imageWithTrimmedPath: transformImageImport(
			new URL('../images/hair_trimmed/sprDog_hat_72.png', import.meta.url)
		),
	},
	{
		internalName: 'Flame',
		externalName: 'Flame',
		chicorobotName: 'Flame',
		imageIndex: 73,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hair_padding/sprDog_hat_73.png', import.meta.url)
		),
		imageWithTrimmedPath: transformImageImport(
			new URL('../images/hair_trimmed/sprDog_hat_73.png', import.meta.url)
		),
	},
	{
		internalName: 'Topknot',
		externalName: 'Topknot',
		chicorobotName: 'Topknot',
		imageIndex: 74,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hair_padding/sprDog_hat_74.png', import.meta.url)
		),
		imageWithTrimmedPath: transformImageImport(
			new URL('../images/hair_trimmed/sprDog_hat_74.png', import.meta.url)
		),
	},
	{
		internalName: 'Bellhair',
		externalName: 'Bellhair',
		chicorobotName: 'Bellhair',
		imageIndex: 75,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hair_padding/sprDog_hat_75.png', import.meta.url)
		),
		imageWithTrimmedPath: transformImageImport(
			new URL('../images/hair_trimmed/sprDog_hat_75.png', import.meta.url)
		),
	},
	{
		internalName: 'Hawk',
		externalName: 'Hawk',
		chicorobotName: 'Hawk',
		imageIndex: 76,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hair_padding/sprDog_hat_76.png', import.meta.url)
		),
		imageWithTrimmedPath: transformImageImport(
			new URL('../images/hair_trimmed/sprDog_hat_76.png', import.meta.url)
		),
	},
	{
		internalName: 'Longpony',
		externalName: 'Longpony',
		chicorobotName: 'Longpony',
		imageIndex: 77,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hair_padding/sprDog_hat_77.png', import.meta.url)
		),
		imageWithTrimmedPath: transformImageImport(
			new URL('../images/hair_trimmed/sprDog_hat_77.png', import.meta.url)
		),
	},
	{
		internalName: 'Highback',
		externalName: 'Highback',
		chicorobotName: 'Highback',
		imageIndex: 90,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hair_padding/sprDog_hat_90.png', import.meta.url)
		),
		imageWithTrimmedPath: transformImageImport(
			new URL('../images/hair_trimmed/sprDog_hat_90.png', import.meta.url)
		),
	},
	{
		internalName: 'Swoosh',
		externalName: 'Swoosh',
		chicorobotName: 'Swoosh',
		imageIndex: 91,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hair_padding/sprDog_hat_91.png', import.meta.url)
		),
		imageWithTrimmedPath: transformImageImport(
			new URL('../images/hair_trimmed/sprDog_hat_91.png', import.meta.url)
		),
	},
	{
		internalName: 'Mofro',
		externalName: 'Mofro',
		chicorobotName: 'Mofro',
		imageIndex: 92,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hair_padding/sprDog_hat_92.png', import.meta.url)
		),
		imageWithTrimmedPath: transformImageImport(
			new URL('../images/hair_trimmed/sprDog_hat_92.png', import.meta.url)
		),
	},
	{
		internalName: 'Poodle',
		externalName: 'Poodle',
		chicorobotName: 'Poodle',
		imageIndex: 93,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hair_padding/sprDog_hat_93.png', import.meta.url)
		),
		imageWithTrimmedPath: transformImageImport(
			new URL('../images/hair_trimmed/sprDog_hat_93.png', import.meta.url)
		),
	},
	{
		internalName: 'Frizz',
		externalName: 'Frizz',
		chicorobotName: 'Frizz',
		imageIndex: 94,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hair_padding/sprDog_hat_94.png', import.meta.url)
		),
		imageWithTrimmedPath: transformImageImport(
			new URL('../images/hair_trimmed/sprDog_hat_94.png', import.meta.url)
		),
	},
	{
		internalName: 'Curleye',
		externalName: 'Curleye',
		chicorobotName: 'Curleye',
		imageIndex: 95,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/hair_padding/sprDog_hat_95.png', import.meta.url)
		),
		imageWithTrimmedPath: transformImageImport(
			new URL('../images/hair_trimmed/sprDog_hat_95.png', import.meta.url)
		),
	},
].sort((a, b) => {
	if (a.internalName > b.internalName) {
		return 1;
	}

	if (a.internalName < b.internalName) {
		return -1;
	}

	return 0;
});
