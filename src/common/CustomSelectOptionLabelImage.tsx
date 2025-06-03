import styles from './CustomSelectOptionLabelImage.module.css';

type Props = Readonly<
	Omit<
		React.ComponentProps<'img'>,
		'className' | 'height' | 'loading' | 'width'
	> & {
		src: string;
	}
>;

export default function CustomSelectOptionLabelImage(props: Props) {
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
