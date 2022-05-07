// @flow strict

export type DogHairType = {
	internalName: string,
	imageIndex: number,
	imageWithPaddingPath: string,
};

export const DOG_HAIR_LIST: $ReadOnlyArray<DogHairType> = [
	{
		internalName: 'Simple',
		imageIndex: 5,
		imageWithPaddingPath: require('../images/hair_padding/sprDog_hat_5.png'),
	},
	{
		internalName: 'Flip',
		imageIndex: 6,
		imageWithPaddingPath: require('../images/hair_padding/sprDog_hat_6.png'),
	},
	{
		internalName: 'Floofy',
		imageIndex: 7,
		imageWithPaddingPath: require('../images/hair_padding/sprDog_hat_7.png'),
	},
	{
		internalName: 'Big Fluffy',
		imageIndex: 10,
		imageWithPaddingPath: require('../images/hair_padding/sprDog_hat_10.png'),
	},
	{
		internalName: 'Gorgeous',
		imageIndex: 11,
		imageWithPaddingPath: require('../images/hair_padding/sprDog_hat_11.png'),
	},
	{
		internalName: 'Mullet',
		imageIndex: 56,
		imageWithPaddingPath: require('../images/hair_padding/sprDog_hat_56.png'),
	},
	{
		internalName: 'Bowl',
		imageIndex: 57,
		imageWithPaddingPath: require('../images/hair_padding/sprDog_hat_57.png'),
	},
	{
		internalName: 'Pony',
		imageIndex: 58,
		imageWithPaddingPath: require('../images/hair_padding/sprDog_hat_58.png'),
	},
	{
		internalName: 'Hedgehog',
		imageIndex: 59,
		imageWithPaddingPath: require('../images/hair_padding/sprDog_hat_59.png'),
	},
	{
		internalName: 'Boyband',
		imageIndex: 60,
		imageWithPaddingPath: require('../images/hair_padding/sprDog_hat_60.png'),
	},
	{
		internalName: 'Shaved',
		imageIndex: 61,
		imageWithPaddingPath: require('../images/hair_padding/sprDog_hat_61.png'),
	},
	{
		internalName: 'Shortcurl',
		imageIndex: 62,
		imageWithPaddingPath: require('../images/hair_padding/sprDog_hat_62.png'),
	},
	{
		internalName: 'Pixie',
		imageIndex: 63,
		imageWithPaddingPath: require('../images/hair_padding/sprDog_hat_63.png'),
	},
	{
		internalName: 'Bob',
		imageIndex: 64,
		imageWithPaddingPath: require('../images/hair_padding/sprDog_hat_64.png'),
	},
	{
		internalName: 'Anime',
		imageIndex: 65,
		imageWithPaddingPath: require('../images/hair_padding/sprDog_hat_65.png'),
	},
	{
		internalName: 'Dreds',
		imageIndex: 66,
		imageWithPaddingPath: require('../images/hair_padding/sprDog_hat_66.png'),
	},
	{
		internalName: 'Fuzz',
		imageIndex: 67,
		imageWithPaddingPath: require('../images/hair_padding/sprDog_hat_67.png'),
	},
	{
		internalName: 'Fro',
		imageIndex: 68,
		imageWithPaddingPath: require('../images/hair_padding/sprDog_hat_68.png'),
	},
	{
		internalName: 'Emo',
		imageIndex: 69,
		imageWithPaddingPath: require('../images/hair_padding/sprDog_hat_69.png'),
	},
	{
		internalName: 'Pigtails',
		imageIndex: 70,
		imageWithPaddingPath: require('../images/hair_padding/sprDog_hat_70.png'),
	},
	{
		internalName: 'Pompadour',
		imageIndex: 71,
		imageWithPaddingPath: require('../images/hair_padding/sprDog_hat_71.png'),
	},
	{
		internalName: 'Spikehawk',
		imageIndex: 72,
		imageWithPaddingPath: require('../images/hair_padding/sprDog_hat_72.png'),
	},
	{
		internalName: 'Flame',
		imageIndex: 73,
		imageWithPaddingPath: require('../images/hair_padding/sprDog_hat_73.png'),
	},
	{
		internalName: 'Topknot',
		imageIndex: 74,
		imageWithPaddingPath: require('../images/hair_padding/sprDog_hat_74.png'),
	},
	{
		internalName: 'Bellhair',
		imageIndex: 75,
		imageWithPaddingPath: require('../images/hair_padding/sprDog_hat_75.png'),
	},
	{
		internalName: 'Hawk',
		imageIndex: 76,
		imageWithPaddingPath: require('../images/hair_padding/sprDog_hat_76.png'),
	},
	{
		internalName: 'Longpony',
		imageIndex: 77,
		imageWithPaddingPath: require('../images/hair_padding/sprDog_hat_77.png'),
	},
	{
		internalName: 'Highback',
		imageIndex: 90,
		imageWithPaddingPath: require('../images/hair_padding/sprDog_hat_90.png'),
	},
	{
		internalName: 'Swoosh',
		imageIndex: 91,
		imageWithPaddingPath: require('../images/hair_padding/sprDog_hat_91.png'),
	},
	{
		internalName: 'Mofro',
		imageIndex: 92,
		imageWithPaddingPath: require('../images/hair_padding/sprDog_hat_92.png'),
	},
	{
		internalName: 'Poodle',
		imageIndex: 93,
		imageWithPaddingPath: require('../images/hair_padding/sprDog_hat_93.png'),
	},
	{
		internalName: 'Frizz',
		imageIndex: 94,
		imageWithPaddingPath: require('../images/hair_padding/sprDog_hat_94.png'),
	},
	{
		internalName: 'Curleye',
		imageIndex: 95,
		imageWithPaddingPath: require('../images/hair_padding/sprDog_hat_95.png'),
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
