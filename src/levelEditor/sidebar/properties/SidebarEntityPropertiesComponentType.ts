import type {GameEntityType} from '../../types/GameEntityType';

export type SidebarEntityPropertiesComponentType<Entity> = Readonly<{
	entity: Entity;
	index: number;
	onEntityEditProperties: (
		entityIndex: number,
		properties: {
			[key: string]: string | number | null;
		},
		entityType: GameEntityType
	) => void;
	type: GameEntityType;
}>;
