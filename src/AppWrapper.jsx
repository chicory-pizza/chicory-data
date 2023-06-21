// @flow strict

import {StrictMode, Suspense} from 'react';
import {HelmetProvider} from 'react-helmet-async';

import ErrorBoundary from './common/ErrorBoundary';
import LoadingBigBanner from './LoadingBigBanner';

type Props = $ReadOnly<{
	children: React$Node,
}>;

export default function AppWrapper(props: Props): React$MixedElement {
	return (
		<StrictMode>
			<Suspense fallback={<LoadingBigBanner />}>
				<ErrorBoundary>
					<HelmetProvider>{props.children}</HelmetProvider>
				</ErrorBoundary>
			</Suspense>
		</StrictMode>
	);
}
