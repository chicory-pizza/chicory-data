import LinkButton from '../../../common/LinkButton';
import {useCurrentCoordinatesNonNullable} from '../../CurrentCoordinatesContext';
import type {GameObjectType} from '../../types/GameObjectType';
import convertLevelIdToCoordinates from '../../util/convertLevelIdToCoordinates';
import getGameObjectSimpleName from '../../util/getGameObjectSimpleName';

type Props = Readonly<{
	obj: GameObjectType;
}>;

export default function SidebarObjectText({obj}: Props) {
	const [, setNewCoordinates] = useCurrentCoordinatesNonNullable();

	const sliced = getGameObjectSimpleName(obj.obj);

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

	if (obj.obj === 'objCustomDog' && typeof obj.comment === 'string') {
		return `${sliced} (${obj.comment})`;
	}

	return sliced;
}
