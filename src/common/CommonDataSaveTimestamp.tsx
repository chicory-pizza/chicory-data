import {useState} from 'react';
import {useInterval} from 'react-use';

const rtf = new Intl.RelativeTimeFormat('en');

function getRelativeText(lastSaveTime: number): string {
	const now = Date.now() / 1000;
	const diff = now - lastSaveTime;

	if (diff <= 10) {
		return 'just now';
	}

	let group = 1;
	let unit: Intl.RelativeTimeFormatUnit = 'second';
	if (diff >= 60) {
		group = 60;
		unit = 'minute';
	}

	if (diff >= 60 * 60) {
		group = 60 * 60;
		unit = 'hour';
	}

	if (diff >= 60 * 60 * 24) {
		return 'a long time ago';
	}

	return rtf.format(-Math.floor(diff / group), unit);
}

type Props = Readonly<{
	lastSaveTime: number | null;
}>;

export default function DataSaveTimestamp({lastSaveTime}: Props) {
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
