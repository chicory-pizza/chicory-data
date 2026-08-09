import {createFileRoute} from '@tanstack/react-router';

import SplashScreen from '../splash/SplashScreen';

export const Route = createFileRoute('/')({
	component: SplashScreen,
});
