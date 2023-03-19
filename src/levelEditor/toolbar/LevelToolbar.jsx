// @flow strict

import {useEffect} from 'react';

import type {EditorToolType} from '../types/EditorToolType';

import styles from './LevelToolbar.module.css';
import LevelToolbarTool from './LevelToolbarTool';

type Props = $ReadOnly<{
	onEditorToolTypeUpdate: (toolType: EditorToolType) => mixed,
	editorToolType: EditorToolType,
}>;

export default function LevelToolbar(props: Props): React$Node {
	useEffect(() => {
		// Double guard to prevent user from painting when terrain view is not visible becaue why not
		props.onEditorToolTypeUpdate('Select');
		return () => {
			props.onEditorToolTypeUpdate('Select');
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.toolbar}>
			<LevelToolbarTool
				toolType={'Select'}
				currentToolType={props.editorToolType}
				onEditorToolTypeUpdate={props.onEditorToolTypeUpdate}
			></LevelToolbarTool>
			<LevelToolbarTool
				toolType={'Paint'}
				currentToolType={props.editorToolType}
				onEditorToolTypeUpdate={props.onEditorToolTypeUpdate}
			></LevelToolbarTool>
			<LevelToolbarTool
				toolType={'Fill'}
				currentToolType={props.editorToolType}
				onEditorToolTypeUpdate={props.onEditorToolTypeUpdate}
			></LevelToolbarTool>
			<LevelToolbarTool
				toolType={'Eyedropper'}
				currentToolType={props.editorToolType}
				onEditorToolTypeUpdate={props.onEditorToolTypeUpdate}
			></LevelToolbarTool>
			<div className={styles.colorContainer}>
				<span className={styles.colorDisplay} />
				Walkable #ffffff
				<br />
				R: 123 G: 123 B: 123
			</div>
			Size:
			<input type="range" min="1" max="20" />
		</div>
	);
}
