// @flow strict

import ErrorBoundary from '../../../common/ErrorBoundary';
import type {GameObjectType} from '../../types/GameObjectType';
import {OBJECT_EDITABLE_PROPERTIES_SCHEMA} from '../../types/ObjectEditablePropertiesSchema';
import SidebarObjectCustomDog from '../objectsList/SidebarObjectCustomDog';
import type {SidebarEntityPropertiesComponentType} from '../properties/SidebarEntityPropertiesComponentType';

import SidebarEditableProperties from './SidebarEditableProperties';

export default function SidebarObjectProperties(
	props: SidebarEntityPropertiesComponentType<GameObjectType, 'OBJECT'>
): React$MixedElement {
	const entity = props.entity;

	return (
		<>
			{entity.obj === 'objCustomDog' ? (
				<ErrorBoundary>
					<SidebarObjectCustomDog obj={entity} />
				</ErrorBoundary>
			) : null}

			<ErrorBoundary>
				<SidebarEditableProperties
					excludeProperties={['obj', 'x', 'y']}
					onEditProperty={(key: string, value: string | number | null) => {
						props.onEntityEditProperty(props.index, key, value, props.type);
					}}
					properties={entity}
					schema={OBJECT_EDITABLE_PROPERTIES_SCHEMA.get(entity.obj) ?? []}
				/>
			</ErrorBoundary>
		</>
	);
}
