// @flow strict

import {memo, useEffect, useRef} from 'react';

import CloseButton from '../../../common/CloseButton';
import ErrorBoundary from '../../../common/ErrorBoundary';
import usePrevious from '../../../util/usePrevious';
import type {DecorationType} from '../../types/DecorationType';
import type {GameEntityType} from '../../types/GameEntityType';
import type {GameObjectType} from '../../types/GameObjectType';
import {OBJECT_EDITABLE_PROPERTIES_SCHEMA} from '../../types/ObjectEditablePropertiesSchema';
import PropertyNumberInput from '../properties/PropertyNumberInput';
import SidebarEditableProperties from '../properties/SidebarEditableProperties';

import styles from './SidebarEntityItem.module.css';
import SidebarObjectCustomDog from './SidebarObjectCustomDog';
import SidebarObjectText from './SidebarObjectText';

type Props = $ReadOnly<{
	expanded: boolean,
	highlighted: boolean,
	index: number,
	dec?: DecorationType,
	obj?: GameObjectType,
	onItemToggle: (entityIndex: number) => mixed,
	onEntityDelete: (entitytIndex: number, entityType: GameEntityType) => mixed,
	onEntityEditProperty: (
		entityIndex: number,
		key: string,
		value: string | number | null,
		entityType: GameEntityType
	) => mixed,
	onEntityHover: (entityIndex: ?number) => mixed,
	type: GameEntityType,
}>;

function SidebarEntityItem(props: Props): React$Node {
	const item = useRef<?HTMLLIElement>(null);
	const previousExpanded = usePrevious(props.expanded);

	useEffect(() => {
		if (previousExpanded !== props.expanded && props.expanded) {
			item.current?.scrollIntoView({
				block: 'nearest',
			});
		}
	}, [previousExpanded, props.expanded]);

	return (
		<li
			className={
				styles.item +
				' ' +
				(props.highlighted
					? props.type === 'OBJECT'
						? styles.objHighlight
						: styles.decHighlight
					: '')
			}
			onMouseEnter={() => props.onEntityHover(props.index)}
			onMouseLeave={() => props.onEntityHover(null)}
			ref={item}
		>
			{/* Flexbox doesn't work well in <details><summary> :( */}
			<div className={styles.title}>
				<button
					className={styles.toggleIcon}
					onFocus={() => props.onEntityHover(props.index)}
					onClick={() => props.onItemToggle(props.index)}
					title={props.expanded ? 'Collapse details' : 'Expand details'}
					type="button"
				>
					{props.expanded ? '▼' : '▶︎'}
				</button>

				<span className={styles.text}>
					{props.dec ? (
						props.dec.spr
					) : props.obj != null ? (
						<SidebarObjectText obj={props.obj} />
					) : null}{' '}
				</span>

				{props.highlighted ? (
					<CloseButton
						color="#000"
						label={
							'Delete ' +
							(props.dec
								? props.dec.spr
								: props.obj
								? props.obj.obj.slice('obj'.length)
								: '')
						}
						onClick={() => props.onEntityDelete(props.index, props.type)}
						size=".6em"
					/>
				) : null}
			</div>

			{props.expanded ? (
				<div className={styles.editor}>
					<div className={styles.entryRoot}>
						<span className={styles.objectCoordinatesText}>X:</span>
						<PropertyNumberInput
							initialValue={
								props.dec ? props.dec.x : props.obj ? props.obj.x : 0
							}
							onCommitValue={(newValue: number | string | null) => {
								props.onEntityEditProperty(
									props.index,
									'x',
									newValue,
									props.type
								);
							}}
						/>

						<span className={styles.objectCoordinatesText}>Y:</span>
						<PropertyNumberInput
							initialValue={
								props.dec ? props.dec.y : props.obj ? props.obj.y : 0
							}
							onCommitValue={(newValue: number | string | null) => {
								props.onEntityEditProperty(
									props.index,
									'y',
									newValue,
									props.type
								);
							}}
						/>
					</div>
					{props.obj ? (
						<>
							{props.obj.obj === 'objCustomDog' ? (
								<ErrorBoundary>
									<SidebarObjectCustomDog obj={props.obj} />
								</ErrorBoundary>
							) : null}
							<ErrorBoundary>
								<SidebarEditableProperties
									excludeProperties={['obj', 'x', 'y']}
									onEditProperty={(
										key: string,
										value: string | number | null
									) => {
										props.onEntityEditProperty(
											props.index,
											key,
											value,
											props.type
										);
									}}
									properties={props.obj}
									schema={
										OBJECT_EDITABLE_PROPERTIES_SCHEMA.get(props.obj.obj) ?? []
									}
								/>
							</ErrorBoundary>
						</>
					) : props.dec ? (
						<ErrorBoundary>
							<div className={styles.entryRoot}>
								<span className={styles.objectCoordinatesText}>XS:</span>
								<PropertyNumberInput
									initialValue={props.dec.xs}
									onCommitValue={(newValue: number | string | null) => {
										props.onEntityEditProperty(
											props.index,
											'xs',
											newValue,
											props.type
										);
									}}
									step={0.05}
								/>

								<span className={styles.objectCoordinatesText}>YS:</span>
								<PropertyNumberInput
									initialValue={props.dec.ys}
									onCommitValue={(newValue: number | string | null) => {
										props.onEntityEditProperty(
											props.index,
											'ys',
											newValue,
											props.type
										);
									}}
									step={0.05}
								/>
							</div>
							<div className={styles.entryRoot}>
								<span className={styles.label}>ang:</span>
								<PropertyNumberInput
									initialValue={props.dec.ang}
									onCommitValue={(newValue: number | string | null) => {
										props.onEntityEditProperty(
											props.index,
											'ang',
											newValue,
											props.type
										);
									}}
								/>
							</div>
						</ErrorBoundary>
					) : null}
				</div>
			) : null}
		</li>
	);
}

export default (memo<Props>(SidebarEntityItem): React$AbstractComponent<
	Props,
	mixed
>);
