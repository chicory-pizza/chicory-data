import ErrorBoundary from '../../../common/ErrorBoundary';
import type {GameObjectType} from '../../types/GameObjectType';
import {OBJECT_EDITABLE_PROPERTIES_SCHEMA} from '../../types/ObjectEditablePropertiesSchema';
import SidebarObjectCustomDogLoader from '../objectsList/SidebarObjectCustomDogLoader';

import SidebarEditableProperties from './SidebarEditableProperties';
import type {SidebarEntityPropertiesComponentType} from './SidebarEntityPropertiesComponentType';

export default function SidebarObjectProperties(
	props: SidebarEntityPropertiesComponentType<GameObjectType>
) {
	const entity = props.entity;

	let schema = OBJECT_EDITABLE_PROPERTIES_SCHEMA.get(entity.obj) ?? [];
	schema = schema.concat({key: 'id', type: 'NUMBER'});

	return (
		<>
			{entity.obj === 'objCustomDog' ? (
				<ErrorBoundary>
					<SidebarObjectCustomDogLoader
						editProperties={props.onEntityEditProperties}
						entityIndex={props.index}
						obj={entity}
					/>
				</ErrorBoundary>
			) : null}

			<ErrorBoundary>
				<SidebarEditableProperties
					excludeProperties={['obj', 'x', 'y']}
					onEditProperty={(key: string, value: string | number | null) => {
						props.onEntityEditProperties(
							props.index,
							{[key]: value},
							props.type
						);
					}}
					properties={entity}
					schema={schema}
				/>
			</ErrorBoundary>
		</>
	);
}
