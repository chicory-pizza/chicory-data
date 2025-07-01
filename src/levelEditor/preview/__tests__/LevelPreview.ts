import {screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderLevelEditorRoute from '../../testUtil/renderLevelEditorRoute';

jest.setTimeout(20000); // hack, sigh

test('checks transforms of decos and objCustomDog', async () => {
	jest.mock('../../level_data.json', () => ({
		'0_0_0': {
			ambiance: '-1',
			objects: [
				{
					obj: 'objCustomDog',
					x: 872,
					y: 333,
					angle: 90,
					xscale: 1.5,
					yscale: 0.5,
				},
			],
			geo: 'eJztwTEBAAAAwqD1T20LL6AAAADgbQ6OAAE=',
			foley: '0 ',
			palette: '',
			area: '',
			transition: '0',
			music: '-1',
			decos: [
				{
					spr: 'tree_trunk7',
					ang: 297.3189,
					ys: -1.3799,
					xs: 1.3799,
					x: 1318,
					y: 52,
				},
			],
			object_id: '',
			name: '',
		},
	}));

	await renderLevelEditorRoute();

	await userEvent.click(await screen.findByText('View options'));
	await userEvent.click(await screen.findByText('Decorations'));

	const levelPreviewRoot = screen.getByTestId('levelpreview-root');

	/* eslint-disable testing-library/no-node-access */
	const objCustomDog =
		levelPreviewRoot.querySelector('.dogPreview')?.parentElement?.parentElement;
	expect(objCustomDog?.getAttribute('style')).toContain(
		'transform: translate(-50%, -50%) rotate(-90deg) scaleX(1.5) scaleY(0.5);'
	);
	expect(objCustomDog?.getAttribute('style')).toContain(
		'transform-origin: 75px 130px;'
	);

	const deco =
		within(levelPreviewRoot).getByAltText('tree_trunk7').parentElement;
	expect(deco?.getAttribute('style')).toContain(
		'transform: scaleX(1.3799) scaleY(-1.3799) rotate(-297.3189deg);'
	);
	expect(deco?.getAttribute('style')).toContain(
		'transform-origin: 249px 151px;'
	);
});
