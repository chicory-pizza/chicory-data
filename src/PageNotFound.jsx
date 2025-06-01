// @flow strict

import {Helmet} from '@dr.pogodin/react-helmet';
import {Link} from 'react-router-dom';

import BigPageNotice from './common/BigPageNotice';
import useDocumentTitle from './util/useDocumentTitle';

export default function PageNotFound(): React$Node {
	useDocumentTitle('Page not found');

	return (
		<>
			<Helmet>
				<meta content="404" name="prerender-status-code" />
			</Helmet>

			<BigPageNotice heading="⚠️ Page not found">
				<Link to="/">Teleport to Luncheon</Link>
			</BigPageNotice>
		</>
	);
}
