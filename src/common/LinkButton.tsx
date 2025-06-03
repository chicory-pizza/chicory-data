import styles from './LinkButton.module.css';

type Props = Readonly<
	Omit<React.ComponentProps<'button'>, 'className' | 'type'>
>;

// A button that looks like a link
export default function LinkButton({...otherProps}: Props) {
	return <button {...otherProps} className={styles.button} type="button" />;
}
