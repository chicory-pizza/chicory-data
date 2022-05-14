// @flow strict

import {screen} from '@testing-library/react';

import renderDogEditorRoute from '../testUtil/renderDogEditorRoute';

test('renders the UI', async () => {
	await renderDogEditorRoute();

	await screen.findByText('Drawdog maker');
});
