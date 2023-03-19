// @flow strict

import styles from './SelectableButton.module.css';

type Props = $ReadOnly<{
	selected: boolean,
	className?: string,
	children: ?React$Node,
	...
}>;

export default function SelectableButton({
	children,
	selected,
	className,
	...otherProps
}: Props): React$Node {
	return (
		<button
			{...otherProps}
			type="button"
			className={
				(selected ? styles.selected : styles.unselected) + ' ' + className
			}
		>
			{children}
		</button>
	);
}
