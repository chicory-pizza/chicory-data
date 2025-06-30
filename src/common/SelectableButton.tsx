import styles from './SelectableButton.module.css';

type Props = Readonly<
	{
		selected: boolean;
	} & Omit<React.ComponentProps<'button'>, 'type'>
>;

export default function SelectableButton({
	selected,
	className = '',
	...otherProps
}: Props) {
	return (
		<button
			{...otherProps}
			className={(selected ? styles.selected : '') + ' ' + className}
			type="button"
		/>
	);
}
