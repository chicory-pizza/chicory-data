import {createFileRoute} from '@tanstack/react-router';

import LevelEditorApp from '../levelEditor/LevelEditorApp';

export const Route = createFileRoute('/level/$levelId')({
	component: LevelEditorApp,
});
