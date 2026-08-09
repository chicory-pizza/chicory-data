import {screen} from '@testing-library/react';
import {expect, test} from 'vitest';

import renderDogEditorRoute from '../testUtil/renderDogEditorRoute';

test('renders the UI', async () => {
	await renderDogEditorRoute();

	expect(screen.getByText('Drawdog maker')).toBeVisible();
});
