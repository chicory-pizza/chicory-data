import {decode} from 'base64-arraybuffer';
import {inflate} from 'pako';
import {useEffect, useMemo} from 'react';
import {usePrevious} from 'react-use';

export default function useLoadImageFromCustomDogTextBuffer(
	text: string | null
): string | null {
	const currentBlob = useMemo(() => {
		if (text == null) {
			return null;
		}

		const blob = new Blob([inflate(decode(text))], {
			type: 'image/png',
		});

		return URL.createObjectURL(blob);
	}, [text]);

	const prevBlob = usePrevious(currentBlob);

	// Clean up old blob URL
	useEffect(() => {
		if (currentBlob !== prevBlob && prevBlob != null) {
			URL.revokeObjectURL(prevBlob);
		}
	}, [currentBlob, prevBlob]);

	return currentBlob;
}
