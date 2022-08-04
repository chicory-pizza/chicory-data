// @flow strict

import CommonDataLoadButton from './CommonDataLoadButton';
import CommonDataSaveButton from './CommonDataSaveButton';
import CommonDataSaveTimestamp from './CommonDataSaveTimestamp';
import styles from './CommonDataSelector.module.css';

type Props = $ReadOnly<{
	isSaveDisabled: boolean,
	lastSaveTime: ?number,
	onFileLoad: (reader: FileReader) => mixed,
	onFileSave: (
		existingHandle: ?FileSystemFileHandle
	) => Promise<?FileSystemFileHandle>,
	saveButtonLabel: string,
}>;

export default function CommonDataSelector(props: Props): React$MixedElement {
	return (
		<div className={styles.root}>
			<div className={styles.space}>
				<CommonDataLoadButton onFileLoad={props.onFileLoad} />
			</div>

			<CommonDataSaveButton
				buttonProps={{
					className: styles.space,
					disabled: props.isSaveDisabled,
				}}
				label={props.saveButtonLabel}
				onFileSave={props.onFileSave}
			/>

			<CommonDataSaveTimestamp lastSaveTime={props.lastSaveTime} />
		</div>
	);
}
