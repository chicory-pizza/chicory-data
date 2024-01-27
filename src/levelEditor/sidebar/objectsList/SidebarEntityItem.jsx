// @flow strict

import {memo, useEffect, useRef} from 'react';
import {usePrevious} from 'react-use';

import CloseButton from '../../../common/CloseButton';
import type {DecorationType} from '../../types/DecorationType';
import type {GameEntityType} from '../../types/GameEntityType';
import type {GameObjectType} from '../../types/GameObjectType';
import PropertyNumberInput from '../properties/PropertyNumberInput';
import type {SidebarEntityPropertiesComponentType} from '../properties/SidebarEntityPropertiesComponentType';

import styles from './SidebarEntityItem.module.css';

type Props<
	Entity: GameObjectType | DecorationType,
	EntityType: GameEntityType,
> = $ReadOnly<{
	entity: Entity,
	entityPropertiesComponent: React$ComponentType<
		SidebarEntityPropertiesComponentType<Entity, EntityType>,
	>,
	expandedTime: ?number,
	getEntityName: (entity: Entity, filter: string) => string,
	highlighted: boolean,
	highlightClassName: string,
	index: number,
	onItemToggle: (entityIndex: number) => mixed,
	onEntityDelete: (entitytIndex: number, entityType: EntityType) => mixed,
	onEntityEditProperties: (
		entityIndex: number,
		properties: {
			[key: string]: string | number | null,
		},
		entityType: EntityType
	) => mixed,
	onEntityHover: (entityIndex: ?number) => mixed,
	renderItemDisplayText: (entity: Entity) => React$Node,
	type: EntityType,
}>;

function SidebarEntityItem<
	Entity: GameObjectType | DecorationType,
	EntityType: GameEntityType,
>(props: Props<Entity, EntityType>): React$Node {
	const item = useRef<?HTMLLIElement>(null);

	const expanded = props.expandedTime != null;
	const previousExpandedTime = usePrevious(props.expandedTime);

	useEffect(() => {
		if (
			previousExpandedTime !== props.expandedTime &&
			props.expandedTime != null &&
			props.expandedTime > 1
		) {
			item.current?.scrollIntoView({
				block: 'nearest',
			});
		}
	}, [previousExpandedTime, props.expandedTime]);

	return (
		<li
			className={
				styles.item + ' ' + (props.highlighted ? props.highlightClassName : '')
			}
			onMouseEnter={() => props.onEntityHover(props.index)}
			onMouseLeave={() => props.onEntityHover(null)}
			ref={item}
		>
			{/* Flexbox doesn't work well in <details><summary> :( */}
			<div className={styles.title}>
				<button
					className={styles.toggleIcon}
					onClick={() => props.onItemToggle(props.index)}
					onFocus={() => props.onEntityHover(props.index)}
					title={expanded ? 'Collapse details' : 'Expand details'}
					type="button"
				>
					{expanded ? '▾' : '▸︎'}
				</button>

				<span className={styles.text}>
					{props.renderItemDisplayText(props.entity)}{' '}
				</span>

				{props.highlighted ? (
					<CloseButton
						label={'Delete ' + props.getEntityName(props.entity, '')}
						onClick={() => props.onEntityDelete(props.index, props.type)}
						size=".6em"
					/>
				) : null}
			</div>

			{expanded ? (
				<div className={styles.editor}>
					<div className={styles.coordinatesRoot}>
						<span className={styles.coordinatesText}>X:</span>
						<PropertyNumberInput
							initialValue={props.entity.x}
							onCommitValue={(newValue: number | string | null) => {
								props.onEntityEditProperties(
									props.index,
									{x: newValue},
									props.type
								);
							}}
						/>

						<span className={styles.coordinatesText}>Y:</span>
						<PropertyNumberInput
							initialValue={props.entity.y}
							onCommitValue={(newValue: number | string | null) => {
								props.onEntityEditProperties(
									props.index,
									{y: newValue},
									props.type
								);
							}}
						/>
					</div>

					<props.entityPropertiesComponent
						entity={props.entity}
						index={props.index}
						onEntityEditProperties={props.onEntityEditProperties}
						type={props.type}
					/>
				</div>
			) : null}
		</li>
	);
}

export default (memo(SidebarEntityItem): React$AbstractComponent<
	React$ElementConfig<typeof SidebarEntityItem>,
	mixed,
>);
