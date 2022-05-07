// @flow strict

import ErrorBoundary from '../common/ErrorBoundary';

import styles from './DogEditorApp.module.css';
import DogPreview from './DogPreview';

export default function DogEditorApp(): React$Node {
	return (
		<div className={styles.root}>
			<ErrorBoundary>
				<DogPreview
					clothes="Overalls"
					clothesColor="#00F3DD"
					hat="Bandana"
					hatColor="#B69AFF"
					hair="Simple"
					skinColor="#FFA894"
				/>
			</ErrorBoundary>
		</div>
	);
}
