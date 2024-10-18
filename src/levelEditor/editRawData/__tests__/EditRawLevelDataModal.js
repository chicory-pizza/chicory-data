// @flow strict

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderLevelEditorRoute from '../../testUtil/renderLevelEditorRoute';
import type {LevelType} from '../../types/LevelType';

jest.setTimeout(10000); // hack, sigh

test('edits the raw data', async () => {
	await renderLevelEditorRoute();

	await screen.findByText('Edit raw data');

	await userEvent.click(screen.getByText('Edit raw data'));

	const textarea = screen.getByTestId('editrawleveldatamodal-textarea');
	await userEvent.clear(textarea);
	await userEvent.type(
		textarea,
		// https://github.com/testing-library/user-event/issues/584
		JSON.stringify({
			ambiance: '-1',
			objects: [],
			geo: 'eJztwTEBAAAAwqD1T20LL6AAAADgbQ6OAAE=',
			foley: '0 ',
			palette: '',
			area: '',
			transition: '0',
			music: '-1',
			decos: [],
			object_id: '',
			name: 'test',
		} as LevelType).replace(/[{[]/g, '$&$&')
	);
	await userEvent.click(screen.getByTestId('editrawleveldatamodal-submit'));

	expect(screen.getByTestId('sidebarlevelproperties-name')).toHaveValue('test');
});
