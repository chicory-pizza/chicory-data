import {Button, Menu} from '@mantine/core';
import {memo, useCallback} from 'react';

import MenuItemCheckedIcon from '../../common/MenuItemCheckedIcon';
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
		[dispatch, uiViews]
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
				<Menu.Item
					leftSection={<MenuItemCheckedIcon show={uiViews.has('WORLD_MAP')} />}
					onClick={() => toggleUiView('WORLD_MAP')}
				>
					World map
				</Menu.Item>

				<Menu.Divider />

				<Menu.Item
					leftSection={<MenuItemCheckedIcon show={uiViews.has('SIDEBAR')} />}
					onClick={() => toggleUiView('SIDEBAR')}
				>
					Sidebar
				</Menu.Item>

				<Menu.Item
					disabled={!uiViews.has('SIDEBAR')}
					leftSection={<MenuItemCheckedIcon show={uiViews.has('PREVIEW')} />}
					onClick={() => toggleUiView('PREVIEW')}
				>
					Terrain preview
				</Menu.Item>

				<Menu.Divider />

				<Menu.Item
					leftSection={<MenuItemCheckedIcon show={uiViews.has('OBJECT')} />}
					onClick={() => toggleUiView('OBJECT')}
				>
					Objects
				</Menu.Item>

				<Menu.Item
					leftSection={<MenuItemCheckedIcon show={uiViews.has('DECO')} />}
					onClick={() => toggleUiView('DECO')}
				>
					Decorations
				</Menu.Item>

				<Menu.Item
					leftSection={<MenuItemCheckedIcon show={uiViews.has('GEO')} />}
					onClick={() => toggleUiView('GEO')}
				>
					Terrain
				</Menu.Item>

				{import.meta.env.VITE_IN_GAME_SCREENSHOT_URL_PREFIX != null ? (
					<Menu.Item
						leftSection={<MenuItemCheckedIcon show={uiViews.has('INGAME')} />}
						onClick={() => toggleUiView('INGAME')}
					>
						Original in-game screenshot
					</Menu.Item>
				) : null}
			</Menu.Dropdown>
		</Menu>
	);
}

export default memo(LevelEditorViewMenu);
