// @flow strict

import styles from './CustomSelectOptionLabelImage.module.css';

type Props = $ReadOnly<{
	alt?: string,
	src: string,
	...
}>;

export default function CustomSelectOptionLabelImage(
	props: Props
): React$Element<'img'> {
	return (
		<img
			alt=""
			{...props}
			className={styles.image}
			loading="lazy"
			width={24}
			height={24}
		/>
	);
}
