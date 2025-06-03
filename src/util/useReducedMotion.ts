import {useMedia} from 'react-use';

export default function useReducedMotion(): boolean {
	return useMedia('(prefers-reduced-motion: reduce)', false);
}
