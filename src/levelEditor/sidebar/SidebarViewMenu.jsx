// @flow strict

// $FlowFixMe[untyped-import]
import {Menu, MenuButton, MenuItem} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/theme-dark.css';
import {memo} from 'react';

import useDarkMode from '../../util/useDarkMode';
import type {LevelInspectorUiView} from '../types/LevelInspectorUiView';

import styles from './SidebarViewMenu.module.css';

type Props = $ReadOnly<{
	activeUiViews: Array<LevelInspectorUiView>,
	onActiveUiViewToggle: (uiView: LevelInspectorUiView) => mixed,
}>;

function SidebarViewMenu(props: Props): React$Node {
	const isDarkMode = useDarkMode();

	return (
		<div className={styles.root}>
			<Menu
				menuButton={<MenuButton>Change view</MenuButton>}
				theming={isDarkMode ? 'dark' : undefined}
			>
				<MenuItem
					checked={props.activeUiViews.includes('OBJECT')}
					onClick={(ev) => props.onActiveUiViewToggle('OBJECT')}
					type="checkbox"
					value="OBJECT"
				>
					Objects
				</MenuItem>

				<MenuItem
					checked={props.activeUiViews.includes('DECO')}
					onClick={(ev) => props.onActiveUiViewToggle('DECO')}
					type="checkbox"
					value="DECO"
				>
					Decorations
				</MenuItem>

				<MenuItem
					checked={props.activeUiViews.includes('GEO')}
					onClick={(ev) => props.onActiveUiViewToggle('GEO')}
					type="checkbox"
					value="GEO"
				>
					Terrain
				</MenuItem>

				<MenuItem
					checked={props.activeUiViews.includes('INGAME')}
					disabled={import.meta.env.VITE_IN_GAME_SCREENSHOT_URL_PREFIX == null}
					onClick={(ev) => props.onActiveUiViewToggle('INGAME')}
					type="checkbox"
					value="INGAME"
				>
					Original in-game screenshot
				</MenuItem>
			</Menu>
		</div>
	);
}

export default (memo<Props>(SidebarViewMenu): React$AbstractComponent<
	Props,
	mixed
>);
