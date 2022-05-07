// @flow strict

export const DOG_EXPRESSION_LIST: $ReadOnlyArray<{
	value: string,
	label: string,
}> = [
	{value: '', label: '(None)'},
	{value: 'small', label: 'small'},
	{value: 'closed', label: 'closed'},
	{value: 'grin', label: 'grin'},
	{value: 'angry', label: 'angry/grr/gr/grrr'},
	{value: 'nervous', label: 'nervous'},
	{value: 'gah', label: 'gah/gasp'},
	{value: 'heee', label: 'heee'},
	{value: 'whoa', label: 'whoa'},
	{value: 'sorry', label: 'sorry'},
	{value: 'stop', label: 'stop'},
	{value: 'ouch', label: 'ouch/ow'},
	{value: 'worry', label: 'worry/worried'},
	{value: 'knockdown', label: 'knockdown'},
	{value: 'smit', label: 'smit/swoon'},
	{value: 'smile', label: 'smile'},
	{value: 'cheeky', label: 'cheeky'},
	{value: 'hmph', label: 'hmph/hmf'},
	{value: 'ok', label: 'ok'},
	{value: 'depressed', label: 'depressed'},
	{value: 'embarass', label: 'embarass'},
	{value: 'closed_sad', label: 'closed_sad'},
	{value: 'evil', label: 'evil'},
].sort((a, b) => {
	if (a.value < b.value) {
		return -1;
	}

	if (a.value > b.value) {
		return 1;
	}

	return 0;
});
