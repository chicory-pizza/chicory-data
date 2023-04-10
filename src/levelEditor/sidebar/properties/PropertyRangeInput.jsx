// @flow strict

import {useCallback} from 'react';

import styles from './PropertyRangeInput.module.css';

type Props = $ReadOnly<{
	defaultValue: number,
	max: number,
	min: number,
	onCommitValue: (newValue: number) => mixed,
	step?: number,
	value: number,
}>;

export default function PropertyRangeInput({
	defaultValue,
	max,
	min,
	onCommitValue,
	step,
	value,
}: Props): React$Node {
	const onChange = useCallback(
		(ev: SyntheticInputEvent<HTMLInputElement>) => {
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
