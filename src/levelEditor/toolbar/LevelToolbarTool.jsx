// @flow strict

import type {EditorToolType} from '../types/EditorToolType';

import styles from './LevelToolbarTool.module.css';

type Props = $ReadOnly<{
	toolType: EditorToolType,
	currentToolType: EditorToolType,
	onEditorToolTypeUpdate: (toolType: EditorToolType) => mixed,
}>;

export default function LevelToolbarTool(props: Props): React$Node {
	const {toolType} = props;
	return (
		<button
			type="button"
			onClick={() => props.onEditorToolTypeUpdate(props.toolType)}
			className={
				toolType === props.currentToolType ? styles.toolSelected : styles.tool
			}
		>
			{props.toolType}
		</button>
	);
}
