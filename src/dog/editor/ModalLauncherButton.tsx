import OpenInNewIcon from '../../common/icons/OpenInNewIcon';

import styles from './ModalLauncherButton.module.css';

type Props = Readonly<
	Omit<React.ComponentProps<'button'>, 'className' | 'type'>
>;

export default function ModalLauncherButton(props: Props) {
	return (
		<button {...props} className={styles.button} type="button">
			<OpenInNewIcon size="1.2em" />
		</button>
	);
}
