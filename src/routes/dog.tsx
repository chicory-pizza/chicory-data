import {createFileRoute} from '@tanstack/react-router';

import DogEditorApp from '../dog/DogEditorApp';

export const Route = createFileRoute('/dog')({
	component: DogEditorApp,
});
