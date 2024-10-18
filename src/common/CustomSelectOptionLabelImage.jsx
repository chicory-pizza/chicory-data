// @flow strict

import styles from './CustomSelectOptionLabelImage.module.css';

type Props = $ReadOnly<{
	alt?: string,
	src: string,
	...
}>;

export default function CustomSelectOptionLabelImage(
	props: Props
): React$MixedElement {
	return (
		<img
			alt=""
			{...props}
			className={styles.image}
			height={24}
			loading="lazy"
			width={24}
		/>
	);
}
