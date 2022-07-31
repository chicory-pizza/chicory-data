// @flow strict

export type SidebarEntityPropertiesComponentType<Entity, EntityType> =
	$ReadOnly<{
		entity: Entity,
		index: number,
		onEntityEditProperties: (
			entityIndex: number,
			properties: {
				[key: string]: string | number | null,
			},
			entityType: EntityType
		) => mixed,
		type: EntityType,
	}>;
