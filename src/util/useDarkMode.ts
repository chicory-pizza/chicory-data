import {useMedia} from 'react-use';

export default function useDarkMode(): boolean {
	return useMedia('(prefers-color-scheme: dark)', false);
}
