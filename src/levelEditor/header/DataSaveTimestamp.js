// @flow strict

import {useState} from 'react';

import useInterval from '../../util/useInterval';

// $FlowFixMe
const rtf = new Intl.RelativeTimeFormat('en');

function getRelativeText(lastSaveTime: number): string {
	const now = Date.now() / 1000;
	const diff = now - lastSaveTime;

	if (diff <= 10) {
		return 'just now';
	}

	let group = 1;
	let unit = 'second';
	if (diff >= 60) {
		group = 60;
		unit = 'minute';
	} else if (diff >= 60 * 60) {
		group = 60 * 60;
		unit = 'hour';
	} else if (diff >= 60 * 60 * 24) {
		return 'a long time ago';
	}

	return rtf.format(-Math.floor(diff / group), unit);
}

type Props = {
	lastSaveTime: ?number,
};

export default function DataSaveTimestamp({lastSaveTime}: Props): React$Node {
	const [, forceUpdate] = useState(0);

	useInterval(
		() => {
			forceUpdate(Date.now());
		},
		lastSaveTime != null ? 1000 : null
	);

	if (lastSaveTime == null) {
		return 'Not saved yet';
	}

	return <>Last saved {getRelativeText(lastSaveTime)}</>;
}
