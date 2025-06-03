import {screen} from '@testing-library/react';

import renderDogEditorRoute from '../testUtil/renderDogEditorRoute';

test('renders the UI', async () => {
	await renderDogEditorRoute();

	expect(screen.getByText('Drawdog maker')).toBeVisible();
});
