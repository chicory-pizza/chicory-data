// @flow strict

import OpenInNewIcon from '../../common/icons/OpenInNewIcon';

import styles from './ModalLauncherButton.module.css';

type Props = $ReadOnly<{...}>;

export default function ModalLauncherButton(props: Props): React$MixedElement {
	return (
		<button {...props} className={styles.button} type="button">
			<OpenInNewIcon size="1.2em" />
		</button>
	);
}
