import {useCallback} from 'react';

import styles from './PropertyRangeInput.module.css';

type Props = Readonly<{
	max: number;
	min: number;
	onCommitValue: (newValue: number) => void;
	step?: number;
	value: number;
}>;

export default function PropertyRangeInput({
	max,
	min,
	onCommitValue,
	step,
	value,
}: Props) {
	const onChange = useCallback(
		(ev: React.ChangeEvent<HTMLInputElement>) => {
			onCommitValue(parseFloat(ev.currentTarget.value));
		},
		[onCommitValue]
	);

	return (
		<input
			className={styles.input}
			max={max}
			min={min}
			onChange={onChange}
			step={step}
			type="range"
			value={value}
		/>
	);
}
