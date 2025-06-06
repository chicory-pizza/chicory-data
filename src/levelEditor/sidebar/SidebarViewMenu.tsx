import {Button, Menu} from '@mantine/core';
import {IconCheck} from '@tabler/icons-react';
import {memo} from 'react';

import type {LevelInspectorUiView} from '../types/LevelInspectorUiView';

import styles from './SidebarViewMenu.module.css';

function SidebarViewMenuItemChecked({show}: Readonly<{show: boolean}>) {
	return show ? <IconCheck size={16} /> : <div className={styles.blankIcon} />;
}

type Props = Readonly<{
	activeUiViews: Set<LevelInspectorUiView>;
	onActiveUiViewToggle: (uiView: LevelInspectorUiView) => void;
}>;

function SidebarViewMenu(props: Props) {
	return (
		<div className={styles.root}>
			<Menu closeOnItemClick={false} shadow="md">
				<Menu.Target>
					<Button variant="default">Change view</Button>
				</Menu.Target>

				<Menu.Dropdown>
					<Menu.Item
						leftSection={
							<SidebarViewMenuItemChecked
								show={props.activeUiViews.has('OBJECT')}
							/>
						}
						onClick={() => props.onActiveUiViewToggle('OBJECT')}
					>
						Objects
					</Menu.Item>

					<Menu.Item
						leftSection={
							<SidebarViewMenuItemChecked
								show={props.activeUiViews.has('DECO')}
							/>
						}
						onClick={() => props.onActiveUiViewToggle('DECO')}
					>
						Decorations
					</Menu.Item>

					<Menu.Item
						leftSection={
							<SidebarViewMenuItemChecked
								show={props.activeUiViews.has('GEO')}
							/>
						}
						onClick={() => props.onActiveUiViewToggle('GEO')}
					>
						Terrain
					</Menu.Item>

					{import.meta.env.VITE_IN_GAME_SCREENSHOT_URL_PREFIX != null ? (
						<Menu.Item
							leftSection={
								<SidebarViewMenuItemChecked
									show={props.activeUiViews.has('INGAME')}
								/>
							}
							onClick={() => props.onActiveUiViewToggle('INGAME')}
						>
							Original in-game screenshot
						</Menu.Item>
					) : null}
				</Menu.Dropdown>
			</Menu>
		</div>
	);
}

export default memo(SidebarViewMenu);
