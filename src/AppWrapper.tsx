import {HelmetProvider} from '@dr.pogodin/react-helmet';
import {StrictMode, Suspense} from 'react';

import ErrorBoundary from './common/ErrorBoundary';
import CustomMantine from './CustomMantine';
import LoadingBigBanner from './LoadingBigBanner';

type Props = Readonly<{
	children: React.ReactNode;
}>;

export default function AppWrapper(props: Props) {
	return (
		<StrictMode>
			<Suspense fallback={<LoadingBigBanner />}>
				<ErrorBoundary>
					<CustomMantine>
						<HelmetProvider>{props.children}</HelmetProvider>
					</CustomMantine>
				</ErrorBoundary>
			</Suspense>
		</StrictMode>
	);
}
