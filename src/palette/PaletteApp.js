// @flow strict

import {useEffect} from 'react';

import AppHeader from '../header/AppHeader';
import changeDocumentTitle from '../util/changeDocumentTitle';

import ColorGrid from './ColorGrid';
import styles from './PaletteApp.module.css';
import {PALETTE_COLORS} from './types/PaletteColorsList';

export default function PaletteApp(): React$Node {
	useEffect(() => {
		changeDocumentTitle('Color palettes');
	}, []);

	const palettes = [];
	for (const [title, palette] of PALETTE_COLORS) {
		palettes.push({
			description: title,
			colors: palette,
		});
	}

	return (
		<div className={styles.root}>
			<AppHeader title="Color palettes" />

			<div className={styles.main}>
				<ColorGrid palettes={palettes} />
			</div>
		</div>
	);
}
