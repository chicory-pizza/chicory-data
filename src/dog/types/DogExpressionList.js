// @flow strict

export const DOG_EXPRESSION_LIST: $ReadOnlyArray<{
	value: string,
	label: string,
	chicorobotName: string,
	image: string,
}> = [
	{
		value: 'normal',
		label: '(None)',
		chicorobotName: 'normal',
		image: require('../images/sprDog_head_0.png'),
		// image: require('../images/dog_expressions/sprDog_expression_0.png'),
	},
	{
		value: 'small',
		label: 'small',
		chicorobotName: 'small',
		image: require('../images/dog_expressions/sprDog_expression_0.png'),
	},
	{
		value: 'closed',
		label: 'closed',
		chicorobotName: 'closed',
		image: require('../images/dog_expressions/sprDog_expression_1.png'),
	},
	{
		value: 'grin',
		label: 'grin',
		chicorobotName: 'grin',
		image: require('../images/dog_expressions/sprDog_expression_2.png'),
	},
	{
		value: 'angry',
		label: 'angry/grr/gr/grrr',
		chicorobotName: 'grr',
		image: require('../images/dog_expressions/sprDog_expression_3.png'),
	},
	{
		value: 'nervous',
		label: 'nervous',
		chicorobotName: 'nervous',
		image: require('../images/dog_expressions/sprDog_expression_4.png'),
	},
	{
		value: 'gah',
		label: 'gah/gasp',
		chicorobotName: 'gasp',
		image: require('../images/dog_expressions/sprDog_expression_5.png'),
	},
	{
		value: 'heee',
		label: 'heee',
		chicorobotName: 'heee',
		image: require('../images/dog_expressions/sprDog_expression_6.png'),
	},
	{
		value: 'whoa',
		label: 'whoa',
		chicorobotName: 'whoa',
		image: require('../images/dog_expressions/sprDog_expression_7.png'),
	},
	{
		value: 'sorry',
		label: 'sorry',
		chicorobotName: 'sorry',
		image: require('../images/dog_expressions/sprDog_expression_8.png'),
	},
	{
		value: 'stop',
		label: 'stop',
		chicorobotName: 'stop',
		image: require('../images/dog_expressions/sprDog_expression_9.png'),
	},
	{
		value: 'ouch',
		label: 'ouch/ow',
		chicorobotName: 'ouch',
		image: require('../images/dog_expressions/sprDog_expression_10.png'),
	},
	{
		value: 'worry',
		label: 'worry/worried',
		chicorobotName: 'worry',
		image: require('../images/dog_expressions/sprDog_expression_11.png'),
	},
	{
		value: 'knockdown',
		label: 'knockdown',
		chicorobotName: 'knockdown',
		image: require('../images/dog_expressions/sprDog_expression_12.png'),
	},
	{
		value: 'smit',
		label: 'smit/swoon',
		chicorobotName: 'smit',
		image: require('../images/dog_expressions/sprDog_expression_13.png'),
	},
	{
		value: 'smile',
		label: 'smile',
		chicorobotName: 'smile',
		image: require('../images/dog_expressions/sprDog_expression_14.png'),
	},
	{
		value: 'cheeky',
		label: 'cheeky',
		chicorobotName: 'cheeky',
		image: require('../images/dog_expressions/sprDog_expression_15.png'),
	},
	{
		value: 'hmph',
		label: 'hmph/hmf',
		chicorobotName: 'hmph',
		image: require('../images/dog_expressions/sprDog_expression_16.png'),
	},
	{
		value: 'ok',
		label: 'ok',
		chicorobotName: 'okay',
		image: require('../images/dog_expressions/sprDog_expression_17.png'),
	},
	{
		value: 'depressed',
		label: 'depressed',
		chicorobotName: 'depressed',
		image: require('../images/dog_expressions/sprDog_expression_19.png'),
	},
	{
		value: 'embarass',
		label: 'embarass',
		chicorobotName: 'embarassed',
		image: require('../images/dog_expressions/sprDog_expression_20.png'),
	},
	{
		value: 'closed_sad',
		label: 'closed_sad',
		chicorobotName: 'closed sad',
		image: require('../images/dog_expressions/sprDog_expression_21.png'),
	},
	{
		value: 'evil',
		label: 'evil',
		chicorobotName: 'evil',
		image: require('../images/dog_expressions/sprDog_expression_18.png'),
	},
].sort((a, b) => {
	if (a.value < b.value) {
		return -1;
	}

	if (a.value > b.value) {
		return 1;
	}

	return 0;
});
