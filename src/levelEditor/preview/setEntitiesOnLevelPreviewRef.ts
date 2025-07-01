import type {GameEntityType} from '../types/GameEntityType';

export default function setEntitiesOnLevelPreviewRef(
	ref: React.RefObject<Map<GameEntityType, Map<number, HTMLElement>> | null>,
	entityType: GameEntityType,
	index: number,
	node: HTMLElement | null
): () => void {
	if (!ref.current) {
		ref.current = new Map();
	}

	const entities =
		ref.current.get(entityType) ??
		ref.current.set(entityType, new Map()).get(entityType);
	if (entities == null) {
		return () => {};
	}

	if (node) {
		entities.set(index, node);
	} else {
		entities.delete(index);
	}

	return () => {
		entities.delete(index);
	};
}
