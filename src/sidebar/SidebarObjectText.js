// @flow strict

import type {GameObjectType} from '../types/GameObjectType';

import {useCurrentCoordinates} from '../CurrentCoordinatesContext';
import LinkButton from '../LinkButton';
import React from 'react';
import convertLevelIdToCoordinates from '../util/convertLevelIdToCoordinates';

type Props = $ReadOnly<{
	obj: GameObjectType,
}>;

export default function SidebarObjectText({obj}: Props): React$Node {
	const [, setNewCoordinates] = useCurrentCoordinates();

	const sliced = obj.obj.slice('obj'.length);

	if (obj.obj === 'objPortal') {
		const newLevelId = typeof obj.dest === 'string' ? obj.dest : null;
		const name = typeof obj.name === 'string' ? obj.name : null;

		return (
			<>
				{sliced}
				{newLevelId != null ? (
					<>
						&nbsp;(
						<LinkButton
							onClick={() => {
								// todo add validation
								setNewCoordinates(
									convertLevelIdToCoordinates(newLevelId.replace(/,/g, '_'))
								);
							}}
						>
							{name ?? newLevelId}
						</LinkButton>
						)
					</>
				) : name != null ? (
					'(' + name + ')'
				) : null}
			</>
		);
	}

	if (obj.obj === 'objNode' && typeof obj.name === 'string') {
		return `${sliced} (${obj.name})`;
	}

	return sliced;
}
