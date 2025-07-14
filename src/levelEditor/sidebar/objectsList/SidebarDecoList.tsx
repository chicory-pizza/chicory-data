import {Button, Collapse} from '@mantine/core';
import {memo, useCallback} from 'react';

import MessageBox from '../../../common/MessageBox';
import {useLevelEditorContext} from '../../LevelEditorContext';
import type {DecorationType} from '../../types/DecorationType';
import type {GameEntityType} from '../../types/GameEntityType';
import type {SidebarPanel} from '../../types/SidebarPanel';
import SidebarDecoProperties from '../properties/SidebarDecoProperties';

import styles from './SidebarDecoList.module.css';
import SidebarEntityList from './SidebarEntityList';
import type {ListItemsExpandedReducerAction} from './useListItemsExpandedReducer';

type Props = Readonly<{
	dispatchEntitiesListItemsExpanded: (
		action: ListItemsExpandedReducerAction
	) => void;
	entityIndexHover: number | null;
	entitiesListItemsExpanded: Map<number, number>;
	expanded: boolean;
	levelDecos: Array<DecorationType>;
	onEntityDelete: (entityIndex: number, entityType: GameEntityType) => void;
	onEntityEditProperties: (
		entityIndex: number,
		properties: {
			[key: string]: string | number | null;
		},
		entityType: GameEntityType
	) => void;
	onEntityHover: (
		entityType: GameEntityType,
		entityIndex: number | null
	) => void;
	onFocusEntityOnLevelPreview: (
		entityType: GameEntityType,
		entityIndex: number
	) => void;
	onSidebarPanelExpandToggle: (
		ev: React.MouseEvent<HTMLElement>,
		sidebarPanel: SidebarPanel
	) => void;
}>;

function SidebarDecoList(props: Props) {
	const {dispatch, uiViews} = useLevelEditorContext();

	const getEntityName = useCallback((entity: DecorationType) => {
		return entity.spr;
	}, []);

	const renderItemDisplayText = useCallback((entity: DecorationType) => {
		return entity.spr;
	}, []);

	const infoBeforeListComponent = props.expanded ? (
		<Collapse in={!uiViews.has('DECO')} mb="-xs">
			<MessageBox
				message={
					<Button
						onClick={() => {
							dispatch({
								type: 'setActiveUiViews',
								uiViews: new Set(uiViews).add('DECO'),
							});
						}}
						variant="filled"
					>
						Show decorations
					</Button>
				}
				type="INFO"
				title="Decorations are currently hidden"
				mb="xs"
			/>
		</Collapse>
	) : null;

	return (
		<SidebarEntityList
			dispatchEntitiesListItemsExpanded={
				props.dispatchEntitiesListItemsExpanded
			}
			entities={props.levelDecos}
			entitiesListItemsExpanded={props.entitiesListItemsExpanded}
			entityHighlightClassName={styles.highlight}
			entityIndexHover={props.entityIndexHover}
			entityPropertiesComponent={SidebarDecoProperties}
			expanded={props.expanded}
			getEntityName={getEntityName}
			infoBeforeListComponent={infoBeforeListComponent}
			name="Decorations"
			onEntityDelete={props.onEntityDelete}
			onEntityEditProperties={props.onEntityEditProperties}
			onEntityHover={props.onEntityHover}
			onFocusEntityOnLevelPreview={props.onFocusEntityOnLevelPreview}
			onSidebarPanelExpandToggle={props.onSidebarPanelExpandToggle}
			renderItemDisplayText={renderItemDisplayText}
			sidebarPanelType="DECOS"
			type="DECO"
		/>
	);
}

export default memo(SidebarDecoList);
