import {Button, Menu} from '@mantine/core';
import {memo, useCallback} from 'react';

import {useLevelEditorContext} from '../LevelEditorContext';
import type {LevelInspectorUiView} from '../types/LevelInspectorUiView';

function LevelEditorViewMenu() {
	const {dispatch, uiViews} = useLevelEditorContext();

	const toggleUiView = useCallback(
		(uiView: LevelInspectorUiView) => {
			const newViews = new Set(uiViews);
			if (uiViews.has(uiView)) {
				newViews.delete(uiView);
			} else {
				newViews.add(uiView);
			}

			dispatch({
				type: 'setActiveUiViews',
				uiViews: newViews,
			});
		},
		[dispatch, uiViews],
	);

	return (
		<Menu
			closeOnItemClick={false}
			shadow="md"
			transitionProps={{transition: 'fade-down'}}
		>
			<Menu.Target>
				<Button variant="default">View options</Button>
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.CheckboxItem
					checked={uiViews.has('WORLD_MAP')}
					onChange={() => {
						toggleUiView('WORLD_MAP');
					}}
				>
					World map
				</Menu.CheckboxItem>

				<Menu.Divider />

				<Menu.CheckboxItem
					checked={uiViews.has('SIDEBAR')}
					onChange={() => {
						toggleUiView('SIDEBAR');
					}}
				>
					Sidebar
				</Menu.CheckboxItem>

				<Menu.CheckboxItem
					disabled={!uiViews.has('SIDEBAR')}
					checked={uiViews.has('PREVIEW')}
					onChange={() => {
						toggleUiView('PREVIEW');
					}}
				>
					Terrain preview
				</Menu.CheckboxItem>

				<Menu.Divider />

				<Menu.CheckboxItem
					checked={uiViews.has('OBJECT')}
					onChange={() => {
						toggleUiView('OBJECT');
					}}
				>
					Objects
				</Menu.CheckboxItem>

				<Menu.CheckboxItem
					checked={uiViews.has('DECO')}
					onChange={() => {
						toggleUiView('DECO');
					}}
				>
					Decorations
				</Menu.CheckboxItem>

				<Menu.CheckboxItem
					checked={uiViews.has('GEO')}
					onChange={() => {
						toggleUiView('GEO');
					}}
				>
					Terrain
				</Menu.CheckboxItem>

				{import.meta.env.VITE_IN_GAME_SCREENSHOT_URL_PREFIX != null ? (
					<Menu.CheckboxItem
						checked={uiViews.has('INGAME')}
						onChange={() => {
							toggleUiView('INGAME');
						}}
					>
						Original in-game screenshot
					</Menu.CheckboxItem>
				) : null}
			</Menu.Dropdown>
		</Menu>
	);
}

export default memo(LevelEditorViewMenu);
