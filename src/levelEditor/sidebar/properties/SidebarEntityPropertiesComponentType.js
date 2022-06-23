// @flow strict

export type SidebarEntityPropertiesComponentType<Entity, EntityType> =
	$ReadOnly<{
		entity: Entity,
		index: number,
		onEntityEditProperty: (
			entityIndex: number,
			key: string,
			value: string | number | null,
			entityType: EntityType
		) => mixed,
		type: EntityType,
	}>;
