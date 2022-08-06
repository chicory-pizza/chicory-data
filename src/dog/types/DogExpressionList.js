// @flow strict

import transformImageImport from '../../util/transformImageImport';

export const DOG_EXPRESSION_LIST: $ReadOnlyArray<{
	value: string,
	label: string,
	chicorobotName: ?string,
	image: string,
}> = [
	{
		value: 'normal',
		label: '(None)',
		chicorobotName: 'normal',
		image: transformImageImport(
			new URL('../images/sprDog_head_0.png', import.meta.url)
		),
		// image: transformImageImport(new URL('../images/dog_expressions/sprDog_expression_0.png', import.meta.url)),
	},
	{
		value: 'small',
		label: 'small',
		chicorobotName: 'small',
		image: transformImageImport(
			new URL(
				'../images/dog_expressions/sprDog_expression_0.png',
				import.meta.url
			)
		),
	},
	{
		value: 'closed',
		label: 'closed',
		chicorobotName: 'closed',
		image: transformImageImport(
			new URL(
				'../images/dog_expressions/sprDog_expression_1.png',
				import.meta.url
			)
		),
	},
	{
		value: 'grin',
		label: 'grin',
		chicorobotName: 'grin',
		image: transformImageImport(
			new URL(
				'../images/dog_expressions/sprDog_expression_2.png',
				import.meta.url
			)
		),
	},
	{
		value: 'angry',
		label: 'angry/grr/gr/grrr',
		chicorobotName: 'grr',
		image: transformImageImport(
			new URL(
				'../images/dog_expressions/sprDog_expression_3.png',
				import.meta.url
			)
		),
	},
	{
		value: 'nervous',
		label: 'nervous',
		chicorobotName: 'nervous',
		image: transformImageImport(
			new URL(
				'../images/dog_expressions/sprDog_expression_4.png',
				import.meta.url
			)
		),
	},
	{
		value: 'gah',
		label: 'gah/gasp',
		chicorobotName: 'gasp',
		image: transformImageImport(
			new URL(
				'../images/dog_expressions/sprDog_expression_5.png',
				import.meta.url
			)
		),
	},
	{
		value: 'heee',
		label: 'heee',
		chicorobotName: 'heee',
		image: transformImageImport(
			new URL(
				'../images/dog_expressions/sprDog_expression_6.png',
				import.meta.url
			)
		),
	},
	{
		value: 'whoa',
		label: 'whoa',
		chicorobotName: 'whoa',
		image: transformImageImport(
			new URL(
				'../images/dog_expressions/sprDog_expression_7.png',
				import.meta.url
			)
		),
	},
	{
		value: 'sorry',
		label: 'sorry',
		chicorobotName: 'sorry',
		image: transformImageImport(
			new URL(
				'../images/dog_expressions/sprDog_expression_8.png',
				import.meta.url
			)
		),
	},
	{
		value: 'stop',
		label: 'stop',
		chicorobotName: 'stop',
		image: transformImageImport(
			new URL(
				'../images/dog_expressions/sprDog_expression_9.png',
				import.meta.url
			)
		),
	},
	{
		value: 'ouch',
		label: 'ouch/ow',
		chicorobotName: 'ouch',
		image: transformImageImport(
			new URL(
				'../images/dog_expressions/sprDog_expression_10.png',
				import.meta.url
			)
		),
	},
	{
		value: 'worry',
		label: 'worry/worried',
		chicorobotName: 'worry',
		image: transformImageImport(
			new URL(
				'../images/dog_expressions/sprDog_expression_11.png',
				import.meta.url
			)
		),
	},
	{
		value: 'knockdown',
		label: 'knockdown',
		chicorobotName: 'knockdown',
		image: transformImageImport(
			new URL(
				'../images/dog_expressions/sprDog_expression_12.png',
				import.meta.url
			)
		),
	},
	{
		value: 'smit',
		label: 'smit/swoon',
		chicorobotName: 'smit',
		image: transformImageImport(
			new URL(
				'../images/dog_expressions/sprDog_expression_13.png',
				import.meta.url
			)
		),
	},
	{
		value: 'smile',
		label: 'smile',
		chicorobotName: 'smile',
		image: transformImageImport(
			new URL(
				'../images/dog_expressions/sprDog_expression_14.png',
				import.meta.url
			)
		),
	},
	{
		value: 'cheeky',
		label: 'cheeky',
		chicorobotName: 'cheeky',
		image: transformImageImport(
			new URL(
				'../images/dog_expressions/sprDog_expression_15.png',
				import.meta.url
			)
		),
	},
	{
		value: 'hmph',
		label: 'hmph/hmf',
		chicorobotName: 'hmph',
		image: transformImageImport(
			new URL(
				'../images/dog_expressions/sprDog_expression_16.png',
				import.meta.url
			)
		),
	},
	{
		value: 'ok',
		label: 'ok',
		chicorobotName: 'okay',
		image: transformImageImport(
			new URL(
				'../images/dog_expressions/sprDog_expression_17.png',
				import.meta.url
			)
		),
	},
	{
		value: 'depressed',
		label: 'depressed',
		chicorobotName: 'depressed',
		image: transformImageImport(
			new URL(
				'../images/dog_expressions/sprDog_expression_19.png',
				import.meta.url
			)
		),
	},
	{
		value: 'embarass',
		label: 'embarass',
		chicorobotName: 'embarassed',
		image: transformImageImport(
			new URL(
				'../images/dog_expressions/sprDog_expression_20.png',
				import.meta.url
			)
		),
	},
	{
		value: 'closed_sad',
		label: 'closed_sad',
		chicorobotName: 'closed sad',
		image: transformImageImport(
			new URL(
				'../images/dog_expressions/sprDog_expression_21.png',
				import.meta.url
			)
		),
	},
	{
		value: 'evil',
		label: 'evil',
		chicorobotName: 'evil',
		image: transformImageImport(
			new URL(
				'../images/dog_expressions/sprDog_expression_18.png',
				import.meta.url
			)
		),
	},
	{
		value: 'confused',
		label: 'confused',
		chicorobotName: null,
		image: transformImageImport(
			new URL('../images/dog_expressions/custom_confused.png', import.meta.url)
		),
	},
	{
		value: 'content',
		label: 'content',
		chicorobotName: null,
		image: transformImageImport(
			new URL('../images/dog_expressions/custom_content.png', import.meta.url)
		),
	},
	{
		value: 'feral',
		label: 'feral',
		chicorobotName: null,
		image: transformImageImport(
			new URL('../images/dog_expressions/custom_feral.png', import.meta.url)
		),
	},
	{
		value: 'gleeful',
		label: 'gleeful',
		chicorobotName: null,
		image: transformImageImport(
			new URL('../images/dog_expressions/custom_gleeful.png', import.meta.url)
		),
	},
	{
		value: 'joyful',
		label: 'joyful',
		chicorobotName: null,
		image: transformImageImport(
			new URL('../images/dog_expressions/custom_joyful.png', import.meta.url)
		),
	},
	{
		value: 'mortified',
		label: 'mortified',
		chicorobotName: null,
		image: transformImageImport(
			new URL('../images/dog_expressions/custom_mortified.png', import.meta.url)
		),
	},
	{
		value: 'regretful',
		label: 'regretful',
		chicorobotName: null,
		image: transformImageImport(
			new URL('../images/dog_expressions/custom_regretful.png', import.meta.url)
		),
	},
	{
		value: 'sad_hours',
		label: 'sad_hours',
		chicorobotName: null,
		image: transformImageImport(
			new URL('../images/dog_expressions/custom_sad_hours.png', import.meta.url)
		),
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
