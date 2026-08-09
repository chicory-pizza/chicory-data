// Based on https://tanstack.com/router/latest/docs/how-to/test-file-based-routing#3-create-route-testing-utilities

import {
	createMemoryHistory,
	createRouter,
	RouterProvider,
} from '@tanstack/react-router';
import {render} from '@testing-library/react';

import AppWrapper from '../src/AppWrapper';
import {routeTree} from '../src/routeTree.gen';

// Create test router with generated route tree
function createTestRouterFromFiles(initialLocation = '/') {
	return createRouter({
		history: createMemoryHistory({
			initialEntries: [initialLocation],
		}),
		routeTree,
	});
}

// Custom render function for file-based routes
export function renderWithFileRoutes(initialLocation: string) {
	const router = createTestRouterFromFiles(initialLocation);

	render(
		<AppWrapper>
			<RouterProvider router={router} />
		</AppWrapper>,
	);
}
