import {createFileRoute} from '@tanstack/react-router';

import PaletteApp from '../palette/PaletteApp';

export const Route = createFileRoute('/palette')({
	component: PaletteApp,
});
