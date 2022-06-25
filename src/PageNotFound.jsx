// @flow strict

import {Link} from 'react-router-dom';

import BigPageNotice from './common/BigPageNotice';

export default function PageNotFound(): React$Node {
	return (
		<BigPageNotice heading="⚠️ Page not found">
			<Link to="/">Teleport to Luncheon</Link>
		</BigPageNotice>
	);
}
