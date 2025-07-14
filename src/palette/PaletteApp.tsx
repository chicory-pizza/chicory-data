import {Box} from '@mantine/core';

import ErrorBoundary from '../common/ErrorBoundary';
import OpenGraph from '../common/OpenGraph';
import AppHeader from '../header/AppHeader';
import useMobileViewport from '../util/useMobileViewport';

import ColorCalculator from './ColorCalculator';
import ColorGrid from './ColorGrid';
import styles from './PaletteApp.module.css';
import {PALETTE_COLORS} from './types/PaletteColorsList';

export default function PaletteApp() {
	useMobileViewport();

	const palettes = [];
	for (const [title, palette] of PALETTE_COLORS) {
		palettes.push({
			description: title,
			colors: palette,
		});
	}

	return (
		<div className={styles.root}>
			<OpenGraph
				description="View color palettes used in Chicory: A Colorful Tale"
				title="Color palettes"
				url="palette"
			/>

			<AppHeader title="Color palettes" />

			<div className={styles.main}>
				<Box my="xs">
					<ErrorBoundary>
						<ColorCalculator />
					</ErrorBoundary>
				</Box>

				<div>
					<ColorGrid palettes={palettes} />
				</div>
			</div>
		</div>
	);
}
