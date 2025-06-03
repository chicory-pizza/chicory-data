import CommonDataLoadButton from './CommonDataLoadButton';
import CommonDataSaveButton from './CommonDataSaveButton';
import CommonDataSaveTimestamp from './CommonDataSaveTimestamp';
import styles from './CommonDataSelector.module.css';

type Props = Readonly<{
	isSaveDisabled: boolean;
	lastSaveTime: number | null;
	onFileLoad: (reader: FileReader) => void;
	onFileSave: (
		existingHandle?: FileSystemFileHandle | null
	) => Promise<FileSystemFileHandle | null>;
	saveButtonLabel: string;
}>;

export default function CommonDataSelector(props: Props) {
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
