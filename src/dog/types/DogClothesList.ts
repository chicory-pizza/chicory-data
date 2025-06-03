import transformImageImport from '../../util/transformImageImport';

export type DogClothesType = {
	internalName: string;
	externalName: string;
	chicorobotName: string;
	imageIndex: number;
	imageWithPaddingPath: string;

	layer2ImagePath?: string;
	collar?: number;
};

export const DOG_CLOTHES_LIST: ReadonlyArray<DogClothesType> = [
	{
		internalName: 'Overalls',
		externalName: 'Overalls (default)',
		chicorobotName: 'Overalls',
		imageIndex: 0,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_0.png', import.meta.url)
		),
	},
	{
		internalName: 'Custom Tee',
		externalName: 'Custom Tee',
		chicorobotName: 'Custom',
		imageIndex: 0,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_0.png', import.meta.url)
		),
	},
	{
		internalName: 'Flower Dress',
		externalName: 'Flower Dress',
		chicorobotName: 'Flower Dress',
		imageIndex: 1,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_1.png', import.meta.url)
		),
	},
	{
		internalName: 'Hoodie',
		externalName: 'Hoodie',
		chicorobotName: 'Hoodie',
		imageIndex: 2,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_2.png', import.meta.url)
		),
	},
	{
		internalName: 'Pocket Jacket',
		externalName: 'Pocket Jacket',
		chicorobotName: 'Pocket Jacket',
		imageIndex: 3,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_3.png', import.meta.url)
		),
	},
	{
		internalName: 'Starry Tee',
		externalName: 'Starry Tee',
		chicorobotName: 'Starry Tee',
		imageIndex: 4,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_4.png', import.meta.url)
		),
	},
	{
		internalName: 'Stripey Tee',
		externalName: 'Stripey Tee',
		chicorobotName: 'Stripey Tee',
		imageIndex: 5,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_5.png', import.meta.url)
		),
	},
	{
		internalName: 'Sunny Tee',
		externalName: 'Sunny Tee',
		chicorobotName: 'Sunny Tee',
		imageIndex: 6,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_6.png', import.meta.url)
		),
	},
	{
		internalName: 'Bolt Tee',
		externalName: 'Bolt Tee',
		chicorobotName: 'Bolt Tee',
		imageIndex: 7,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_7.png', import.meta.url)
		),
	},
	{
		internalName: 'Moon Tee',
		externalName: 'Moon Tee',
		chicorobotName: 'Moon Tee',
		imageIndex: 8,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_8.png', import.meta.url)
		),
	},
	{
		internalName: 'Big Star',
		externalName: 'Big Star',
		chicorobotName: 'Big Star',
		imageIndex: 9,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_9.png', import.meta.url)
		),
	},
	{
		internalName: 'Black Tee',
		externalName: 'Black Tee',
		chicorobotName: 'Black Tee',
		imageIndex: 10,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_10.png', import.meta.url)
		),
	},
	{
		internalName: 'Kerchief',
		externalName: 'Kerchief',
		chicorobotName: 'Kerchief',
		imageIndex: 10,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_10.png', import.meta.url)
		),
		layer2ImagePath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body2_1.png', import.meta.url)
		),
	},
	{
		internalName: 'Scarf',
		externalName: 'Scarf',
		chicorobotName: 'Scarf',
		imageIndex: 10,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_10.png', import.meta.url)
		),
		layer2ImagePath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body2_2.png', import.meta.url)
		),
	},
	{
		internalName: 'Bee',
		externalName: 'Bee',
		chicorobotName: 'Bee',
		imageIndex: 11,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_11.png', import.meta.url)
		),
	},
	{
		internalName: 'Big Flower',
		externalName: 'Big Flower',
		chicorobotName: 'Big Flower',
		imageIndex: 12,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_12.png', import.meta.url)
		),
	},
	{
		internalName: 'High Nooner',
		externalName: 'High Nooner',
		chicorobotName: 'High Nooner',
		imageIndex: 13,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_13.png', import.meta.url)
		),
	},
	{
		internalName: 'Dot Dress',
		externalName: 'Dot Dress',
		chicorobotName: 'Dot Dress',
		imageIndex: 14,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_14.png', import.meta.url)
		),
	},
	{
		internalName: 'Cord Coat',
		externalName: 'Cord Coat',
		chicorobotName: 'Cord Coat',
		imageIndex: 15,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_15.png', import.meta.url)
		),
		layer2ImagePath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body2_3.png', import.meta.url)
		),
		collar: 1,
	},
	{
		internalName: 'Puffy Jacket',
		externalName: 'Puffy Jacket',
		chicorobotName: 'Puffy Jacket',
		imageIndex: 16,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_16.png', import.meta.url)
		),
	},
	{
		internalName: 'Dorky',
		externalName: 'Dorky',
		chicorobotName: 'Dorky',
		imageIndex: 17,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_17.png', import.meta.url)
		),
	},
	{
		internalName: 'Fuzzy',
		externalName: 'Woven',
		chicorobotName: 'Woven',
		imageIndex: 18,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_18.png', import.meta.url)
		),
	},
	{
		internalName: 'Wielder Cloak',
		externalName: 'Wielder Cloak',
		chicorobotName: 'Wielder Cloak',
		imageIndex: 20,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_20.png', import.meta.url)
		),
		layer2ImagePath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body2_4.png', import.meta.url)
		),
	},
	{
		internalName: 'Rex Bod',
		externalName: 'Rex Bod',
		chicorobotName: 'Rex Bod',
		imageIndex: 19,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_19.png', import.meta.url)
		),
	},
	{
		internalName: 'Island',
		externalName: 'Island',
		chicorobotName: 'Island',
		imageIndex: 25,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_25.png', import.meta.url)
		),
	},
	{
		internalName: 'Hotneck',
		externalName: 'Hotneck',
		chicorobotName: 'Hotneck',
		imageIndex: 21,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_21.png', import.meta.url)
		),
	},
	{
		internalName: 'Gothy',
		externalName: 'Gothy',
		chicorobotName: 'Gothy',
		imageIndex: 22,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_22.png', import.meta.url)
		),
	},
	{
		internalName: 'College',
		externalName: 'College',
		chicorobotName: 'College',
		imageIndex: 28,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_28.png', import.meta.url)
		),
	},
	{
		internalName: 'Nice Shirt',
		externalName: 'Nice Shirt',
		chicorobotName: 'Nice Shirt',
		imageIndex: 23,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_23.png', import.meta.url)
		),
	},
	{
		internalName: 'Smock',
		externalName: 'Smock',
		chicorobotName: 'Smock',
		imageIndex: 24,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_24.png', import.meta.url)
		),
	},
	{
		internalName: 'Splashpants',
		externalName: 'Splashpants',
		chicorobotName: 'Splashpants',
		imageIndex: 26,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_26.png', import.meta.url)
		),
	},
	{
		internalName: 'Splash Onesie',
		externalName: 'Splash Onesie',
		chicorobotName: 'Splash Onesie',
		imageIndex: 27,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_27.png', import.meta.url)
		),
	},
	{
		internalName: 'Biker Jacket',
		externalName: 'Biker Jacket',
		chicorobotName: 'Biker Jacket',
		imageIndex: 29,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_29.png', import.meta.url)
		),
	},
	{
		internalName: 'Mascot Bod',
		externalName: 'Mascot Bod',
		chicorobotName: 'Mascot Bod',
		imageIndex: 30,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_30.png', import.meta.url)
		),
	},
	{
		internalName: 'Avast',
		externalName: 'Avast',
		chicorobotName: 'Avast',
		imageIndex: 31,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_31.png', import.meta.url)
		),
	},
	{
		internalName: 'Mailbag',
		externalName: 'Mailbag',
		chicorobotName: 'Mailbag',
		imageIndex: 32,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_32.png', import.meta.url)
		),
	},
	{
		internalName: 'Bard',
		externalName: 'Bard',
		chicorobotName: 'Bard',
		imageIndex: 33,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_33.png', import.meta.url)
		),
		layer2ImagePath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body2_5.png', import.meta.url)
		),
		collar: 1,
	},
	{
		internalName: 'Tux',
		externalName: 'Tux',
		chicorobotName: 'Tux',
		imageIndex: 34,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_34.png', import.meta.url)
		),
	},
	{
		internalName: 'Scientist',
		externalName: 'Scientist',
		chicorobotName: 'Scientist',
		imageIndex: 35,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_35.png', import.meta.url)
		),
	},
	{
		internalName: 'Fuzzy Jacket',
		externalName: 'Fuzzy Jacket',
		chicorobotName: 'Fuzzy Jacket',
		imageIndex: 36,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_36.png', import.meta.url)
		),
		layer2ImagePath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body2_6.png', import.meta.url)
		),
		collar: 1,
	},
	{
		internalName: 'Sailor',
		externalName: 'Sailor',
		chicorobotName: 'Sailor',
		imageIndex: 37,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_37.png', import.meta.url)
		),
		layer2ImagePath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body2_8.png', import.meta.url)
		),
	},
	{
		internalName: 'Sequins',
		externalName: 'Sequins',
		chicorobotName: 'Sequins',
		imageIndex: 38,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_38.png', import.meta.url)
		),
	},
	{
		internalName: 'Shawl',
		externalName: 'Shawl',
		chicorobotName: 'Shawl',
		imageIndex: 10,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_10.png', import.meta.url)
		),
		layer2ImagePath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body2_9.png', import.meta.url)
		),
	},
	{
		internalName: 'Spike',
		externalName: 'Spike',
		chicorobotName: 'Spike',
		imageIndex: 10,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_10.png', import.meta.url)
		),
		layer2ImagePath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body2_10.png', import.meta.url)
		),
	},
	{
		internalName: 'Studs',
		externalName: 'Studs',
		chicorobotName: 'Studs',
		imageIndex: 39,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_39.png', import.meta.url)
		),
		layer2ImagePath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body2_11.png', import.meta.url)
		),
	},
	{
		internalName: 'Black Dress',
		externalName: 'Black Dress',
		chicorobotName: 'Black Dress',
		imageIndex: 39,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_39.png', import.meta.url)
		),
	},
	{
		internalName: 'Leafy',
		externalName: 'Leafy',
		chicorobotName: 'Leafy',
		imageIndex: 40,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_40.png', import.meta.url)
		),
	},
	{
		internalName: 'Pajamas',
		externalName: 'Pajamas',
		chicorobotName: 'Pajamas',
		imageIndex: 41,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_41.png', import.meta.url)
		),
	},
	{
		internalName: 'Cute Dress',
		externalName: 'Cute Dress',
		chicorobotName: 'Cute Dress',
		imageIndex: 42,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_42.png', import.meta.url)
		),
	},
	{
		internalName: 'Pilot',
		externalName: 'Pilot',
		chicorobotName: 'Pilot',
		imageIndex: 43,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_43.png', import.meta.url)
		),
	},
	{
		internalName: 'Shell Tee',
		externalName: 'Shell Tee',
		chicorobotName: 'Shell Tee',
		imageIndex: 44,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_44.png', import.meta.url)
		),
	},
	{
		internalName: 'Big Heart',
		externalName: 'Big Heart',
		chicorobotName: 'Big Heart',
		imageIndex: 45,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_45.png', import.meta.url)
		),
	},
	{
		internalName: 'Robo',
		externalName: 'Robo',
		chicorobotName: 'Robo',
		imageIndex: 46,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_46.png', import.meta.url)
		),
	},
	{
		internalName: 'Ski Jacket',
		externalName: 'Ski Jacket',
		chicorobotName: 'Ski Jacket',
		imageIndex: 47,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_47.png', import.meta.url)
		),
		layer2ImagePath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body2_12.png', import.meta.url)
		),
		collar: 1,
	},
	{
		internalName: 'Gi',
		externalName: 'Hiker',
		chicorobotName: 'Hiker',
		imageIndex: 50,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_50.png', import.meta.url)
		),
		layer2ImagePath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body2_15.png', import.meta.url)
		),
		collar: 2,
	},
	{
		internalName: 'Princess',
		externalName: 'Gorgeous',
		chicorobotName: 'Gorgeous',
		imageIndex: 48,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_48.png', import.meta.url)
		),
		layer2ImagePath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body2_13.png', import.meta.url)
		),
	},
	{
		internalName: 'Royal',
		externalName: 'Royal',
		chicorobotName: 'Royal',
		imageIndex: 49,
		imageWithPaddingPath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body_49.png', import.meta.url)
		),
		layer2ImagePath: transformImageImport(
			new URL('../images/clothes_padding/sprDog_body2_14.png', import.meta.url)
		),
		collar: 1,
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
