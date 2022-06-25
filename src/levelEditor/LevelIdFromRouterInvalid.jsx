// @flow strict

import {Link} from 'react-router-dom';

import BigPageNotice from '../common/BigPageNotice';

export default function LevelIdFromRouterInvalid(): React$Node {
	return (
		<BigPageNotice heading="⚠️ Not a valid level ID">
			<Link to="/level/0_0_0">Teleport to Luncheon</Link>
		</BigPageNotice>
	);
}
