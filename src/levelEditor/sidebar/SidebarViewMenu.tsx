import {Button} from '@mantine/core';
import {Menu, MenuItem} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/theme-dark.css';
import {memo} from 'react';

import useDarkMode from '../../util/useDarkMode';
import type {LevelInspectorUiView} from '../types/LevelInspectorUiView';

import styles from './SidebarViewMenu.module.css';

type Props = Readonly<{
	activeUiViews: Set<LevelInspectorUiView>;
	onActiveUiViewToggle: (uiView: LevelInspectorUiView) => void;
}>;

function SidebarViewMenu(props: Props) {
	const isDarkMode = useDarkMode();

	return (
		<div className={styles.root}>
			<Menu
				menuButton={<Button variant="default">Change view</Button>}
				theming={isDarkMode ? 'dark' : undefined}
			>
				<MenuItem
					checked={props.activeUiViews.has('OBJECT')}
					onClick={() => props.onActiveUiViewToggle('OBJECT')}
					type="checkbox"
					value="OBJECT"
				>
					Objects
				</MenuItem>

				<MenuItem
					checked={props.activeUiViews.has('DECO')}
					onClick={() => props.onActiveUiViewToggle('DECO')}
					type="checkbox"
					value="DECO"
				>
					Decorations
				</MenuItem>

				<MenuItem
					checked={props.activeUiViews.has('GEO')}
					onClick={() => props.onActiveUiViewToggle('GEO')}
					type="checkbox"
					value="GEO"
				>
					Terrain
				</MenuItem>

				<MenuItem
					checked={props.activeUiViews.has('INGAME')}
					disabled={import.meta.env.VITE_IN_GAME_SCREENSHOT_URL_PREFIX == null}
					onClick={() => props.onActiveUiViewToggle('INGAME')}
					type="checkbox"
					value="INGAME"
				>
					Original in-game screenshot
				</MenuItem>
			</Menu>
		</div>
	);
}

export default memo(SidebarViewMenu);
