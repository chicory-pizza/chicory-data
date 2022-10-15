// @flow strict

import transformImageImport from '../../util/transformImageImport';

export const DOG_EXPRESSION_LIST: $ReadOnlyArray<{
	value: string,
	label: string,
	chicorobotName: ?string,
	image: string,
	imageHQ?: string, // HQ image used for big preview area
	inGame: boolean, // Some expressions like 'feral' are custom and not available in-game
}> = [
	{
		value: 'normal',
		label: '(None)',
		chicorobotName: 'normal',
		image: transformImageImport(
			new URL('../images/sprDog_head_0.png', import.meta.url)
		),
		// image: transformImageImport(new URL('../images/dog_expressions/sprDog_expression_0.png', import.meta.url)),
		inGame: true,
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
		imageHQ: transformImageImport(
			new URL('../images/dog_expressions_hq/small.png', import.meta.url)
		),
		inGame: true,
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
		imageHQ: transformImageImport(
			new URL('../images/dog_expressions_hq/closed.png', import.meta.url)
		),
		inGame: true,
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
		imageHQ: transformImageImport(
			new URL('../images/dog_expressions_hq/grin.png', import.meta.url)
		),
		inGame: true,
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
		imageHQ: transformImageImport(
			new URL('../images/dog_expressions_hq/angry.png', import.meta.url)
		),
		inGame: true,
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
		imageHQ: transformImageImport(
			new URL('../images/dog_expressions_hq/nervous.png', import.meta.url)
		),
		inGame: true,
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
		imageHQ: transformImageImport(
			new URL('../images/dog_expressions_hq/gah.png', import.meta.url)
		),
		inGame: true,
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
		imageHQ: transformImageImport(
			new URL('../images/dog_expressions_hq/heee.png', import.meta.url)
		),
		inGame: true,
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
		imageHQ: transformImageImport(
			new URL('../images/dog_expressions_hq/whoa.png', import.meta.url)
		),
		inGame: true,
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
		imageHQ: transformImageImport(
			new URL('../images/dog_expressions_hq/sorry.png', import.meta.url)
		),
		inGame: true,
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
		imageHQ: transformImageImport(
			new URL('../images/dog_expressions_hq/stop.png', import.meta.url)
		),
		inGame: true,
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
		imageHQ: transformImageImport(
			new URL('../images/dog_expressions_hq/ouch.png', import.meta.url)
		),
		inGame: true,
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
		imageHQ: transformImageImport(
			new URL('../images/dog_expressions_hq/worry.png', import.meta.url)
		),
		inGame: true,
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
		imageHQ: transformImageImport(
			new URL('../images/dog_expressions_hq/knockdown.png', import.meta.url)
		),
		inGame: true,
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
		imageHQ: transformImageImport(
			new URL('../images/dog_expressions_hq/smit.png', import.meta.url)
		),
		inGame: true,
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
		imageHQ: transformImageImport(
			new URL('../images/dog_expressions_hq/smile.png', import.meta.url)
		),
		inGame: true,
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
		imageHQ: transformImageImport(
			new URL('../images/dog_expressions_hq/cheeky.png', import.meta.url)
		),
		inGame: true,
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
		imageHQ: transformImageImport(
			new URL('../images/dog_expressions_hq/hmph.png', import.meta.url)
		),
		inGame: true,
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
		imageHQ: transformImageImport(
			new URL('../images/dog_expressions_hq/ok.png', import.meta.url)
		),
		inGame: true,
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
		imageHQ: transformImageImport(
			new URL('../images/dog_expressions_hq/depressed.png', import.meta.url)
		),
		inGame: true,
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
		imageHQ: transformImageImport(
			new URL('../images/dog_expressions_hq/embarass.png', import.meta.url)
		),
		inGame: true,
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
		imageHQ: transformImageImport(
			new URL('../images/dog_expressions_hq/closed_sad.png', import.meta.url)
		),
		inGame: true,
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
		imageHQ: transformImageImport(
			new URL('../images/dog_expressions_hq/evil.png', import.meta.url)
		),
		inGame: true,
	},

	// Custom
	{
		value: 'confused',
		label: 'confused',
		chicorobotName: 'custom confused',
		image: transformImageImport(
			new URL('../images/dog_expressions/custom_confused.png', import.meta.url)
		),
		imageHQ: transformImageImport(
			new URL('../images/dog_expressions_hq/confused.png', import.meta.url)
		),
		inGame: false,
	},
	{
		value: 'content',
		label: 'content',
		chicorobotName: 'custom content',
		image: transformImageImport(
			new URL('../images/dog_expressions/custom_content.png', import.meta.url)
		),
		imageHQ: transformImageImport(
			new URL('../images/dog_expressions_hq/content.png', import.meta.url)
		),
		inGame: false,
	},
	{
		value: 'feral',
		label: 'feral',
		chicorobotName: 'custom feral',
		image: transformImageImport(
			new URL('../images/dog_expressions/custom_feral.png', import.meta.url)
		),
		imageHQ: transformImageImport(
			new URL('../images/dog_expressions_hq/feral.png', import.meta.url)
		),
		inGame: false,
	},
	{
		value: 'gleeful',
		label: 'gleeful',
		chicorobotName: 'custom gleeful',
		image: transformImageImport(
			new URL('../images/dog_expressions/custom_gleeful.png', import.meta.url)
		),
		imageHQ: transformImageImport(
			new URL('../images/dog_expressions_hq/gleeful.png', import.meta.url)
		),
		inGame: false,
	},
	{
		value: 'joyful',
		label: 'joyful',
		chicorobotName: 'custom joyful',
		image: transformImageImport(
			new URL('../images/dog_expressions/custom_joyful.png', import.meta.url)
		),
		imageHQ: transformImageImport(
			new URL('../images/dog_expressions_hq/joyful.png', import.meta.url)
		),
		inGame: false,
	},
	{
		value: 'mortified',
		label: 'mortified',
		chicorobotName: 'custom mortified',
		image: transformImageImport(
			new URL('../images/dog_expressions/custom_mortified.png', import.meta.url)
		),
		imageHQ: transformImageImport(
			new URL('../images/dog_expressions_hq/mortified.png', import.meta.url)
		),
		inGame: false,
	},
	{
		value: 'regretful',
		label: 'regretful',
		chicorobotName: 'custom regretful',
		image: transformImageImport(
			new URL('../images/dog_expressions/custom_regretful.png', import.meta.url)
		),
		imageHQ: transformImageImport(
			new URL('../images/dog_expressions_hq/regretful.png', import.meta.url)
		),
		inGame: false,
	},
	{
		value: 'sad_hours',
		label: 'sad_hours',
		chicorobotName: 'custom sad hours',
		image: transformImageImport(
			new URL('../images/dog_expressions/custom_sad_hours.png', import.meta.url)
		),
		imageHQ: transformImageImport(
			new URL('../images/dog_expressions_hq/sad_hours.png', import.meta.url)
		),
		inGame: false,
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
