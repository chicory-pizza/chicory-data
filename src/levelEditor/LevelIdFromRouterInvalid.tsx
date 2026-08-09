import {Link} from '@tanstack/react-router';

import BigPageNotice from '../common/BigPageNotice';

export default function LevelIdFromRouterInvalid() {
	return (
		<BigPageNotice heading="⚠️ Not a valid level ID">
			<Link to="/level/$levelId" params={{levelId: '0_0_0'}} preload="intent">
				Teleport to Luncheon
			</Link>
		</BigPageNotice>
	);
}
