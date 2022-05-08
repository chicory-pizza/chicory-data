// @flow strict

// $FlowFixMe[untyped-import]
import {Menu, MenuButton, MenuItem} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import {memo} from 'react';

import type {LevelInspectorUiView} from '../types/LevelInspectorUiView';

import styles from './SidebarViewMenu.module.css';

type Props = $ReadOnly<{
	activeUiViews: Array<LevelInspectorUiView>,
	onActiveUiViewToggle: (uiView: LevelInspectorUiView) => mixed,
}>;

function SidebarViewMenu(props: Props): React$Node {
	return (
		<div className={styles.root}>
			<Menu menuButton={<MenuButton>Change view</MenuButton>}>
				<MenuItem
					checked={props.activeUiViews.includes('OBJECTS')}
					onClick={(ev) => props.onActiveUiViewToggle('OBJECTS')}
					type="checkbox"
					value="OBJECTS"
				>
					Objects
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
					checked={props.activeUiViews.includes('DECOS')}
					onClick={(ev) => props.onActiveUiViewToggle('DECOS')}
					type="checkbox"
					value="DECOS"
				>
					Decorations
				</MenuItem>
				<MenuItem
					checked={props.activeUiViews.includes('INGAME')}
					disabled={process.env.REACT_APP_IN_GAME_SCREENSHOT_URL_PREFIX == null}
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
