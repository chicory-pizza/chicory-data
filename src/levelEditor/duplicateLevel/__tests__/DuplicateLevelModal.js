import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderAppRoutes from '../../../testUtil/renderAppRoutes';

test('duplicates the level', async () => {
	await renderAppRoutes();

	await screen.findByText('Duplicate level');

	await userEvent.click(screen.getByText('Duplicate level'));

	await userEvent.type(screen.getByTestId('duplicatelevelmodal-layer'), '1');
	await userEvent.type(screen.getByTestId('duplicatelevelmodal-x'), '2');
	await userEvent.type(screen.getByTestId('duplicatelevelmodal-y'), '3');
	await userEvent.click(screen.getByTestId('duplicatelevelmodal-submit'));

	expect(screen.getByTestId('worldmap-active')).toHaveTextContent('2, 3');
});
