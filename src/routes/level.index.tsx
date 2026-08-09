import {createFileRoute, Navigate} from '@tanstack/react-router';

function RouteComponent() {
	return <Navigate to="/level/$levelId" params={{levelId: '0_0_0'}} />;
}

export const Route = createFileRoute('/level/')({
	component: RouteComponent,
});
