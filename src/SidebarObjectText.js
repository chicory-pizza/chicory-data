// @flow strict

import type {GameObjectType} from './types/GameObjectType';

type Props = {
	obj: GameObjectType,
};

export default function SidebarObjectText({obj}: Props): React$Node {
	const sliced = obj.obj.slice('obj'.length);

	if (obj.obj === 'objPortal') {
		if (typeof obj.name === 'string') {
			return `${sliced} (${obj.name})`;
		}

		if (typeof obj.dest === 'string') {
			return `${sliced} (${obj.dest})`;
		}
	}

	if (obj.obj === 'objNode' && typeof obj.name === 'string') {
		return `${sliced} (${obj.name})`;
	}

	return sliced;
}
