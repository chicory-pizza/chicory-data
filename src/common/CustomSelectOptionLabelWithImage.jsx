// @flow strict

import styles from './CustomSelectOptionLabelWithImage.module.css';

type Props = $ReadOnly<{
	image: React$Node,
	label: React$Node,
}>;

export default function CustomSelectOptionLabelWithImage(
	props: Props
): React$MixedElement {
	return (
		<div className={styles.wrap}>
			{props.image}
			<span className={styles.label}>{props.label}</span>
		</div>
	);
}
