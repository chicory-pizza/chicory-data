// @flow strict

// $FlowFixMe[untyped-import]
import {Menu, MenuButton, MenuItem, MenuRadioGroup} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import {memo} from 'react';

import type {LevelInspectorUiView} from '../types/LevelInspectorUiView';

import styles from './SidebarViewMenu.module.css';

type Props = $ReadOnly<{
	setUiView: (newUiView: LevelInspectorUiView) => mixed,
	uiView: LevelInspectorUiView,
}>;

function SidebarViewMenu(props: Props): React$Node {
	return (
		<div className={styles.root}>
			<Menu menuButton={<MenuButton>Change view</MenuButton>}>
				<MenuRadioGroup
					value={props.uiView}
					onRadioChange={(ev) => props.setUiView(ev.value)}
				>
					<MenuItem type="radio" value="GEO">
						Geo terrain
					</MenuItem>

					<MenuItem
						disabled={
							process.env.REACT_APP_IN_GAME_SCREENSHOT_URL_PREFIX == null
						}
						type="radio"
						value="INGAME"
					>
						Original in-game screenshot
					</MenuItem>
				</MenuRadioGroup>
			</Menu>
		</div>
	);
}

export default (memo<Props>(SidebarViewMenu): React$AbstractComponent<
	Props,
	mixed
>);
