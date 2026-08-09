import {screen} from '@testing-library/react';
import {expect, test} from 'vitest';

import {renderWithFileRoutes} from '../file-route-utils';

test('renders the splash screen', async () => {
	renderWithFileRoutes('/');

	expect(await screen.findByText('Chicory: A Colorful Modding')).toBeVisible();

	expect(await screen.findByText('⛰ Level editor')).toBeVisible();
});
