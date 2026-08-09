import './index.css';

import {Stack} from '@mantine/core';
import {createRouter, RouterProvider} from '@tanstack/react-router';
import {createRoot} from 'react-dom/client';

import './util/shimRequestIdleCallback';
import AppWrapper from './AppWrapper';
import BasicErrorAlert from './common/BasicErrorAlert';
import LoadingBigBanner from './LoadingBigBanner';
import PageNotFound from './PageNotFound';
import {routeTree} from './routeTree.gen';
import {paintdogConsoleText} from './util/paintdogConsoleText';

// Start
console.log(paintdogConsoleText);

const container = document.getElementById('root');
if (container == null) {
	throw new Error('App root container is missing');
}

const router = createRouter({
	defaultErrorComponent({error}) {
		return (
			<Stack p="md" flex="1">
				<BasicErrorAlert error={error} />
			</Stack>
		);
	},
	defaultNotFoundComponent: () => <PageNotFound />,
	defaultPendingComponent: () => <LoadingBigBanner />,
	routeTree,
	// scrollRestoration: true,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

createRoot(container).render(
	<AppWrapper>
		<RouterProvider router={router} />
	</AppWrapper>,
);
