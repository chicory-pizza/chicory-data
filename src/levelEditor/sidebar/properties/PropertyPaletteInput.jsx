// @flow strict

import {memo, useCallback} from 'react';

import CustomSelect from '../../../common/CustomSelect';
import type {OptionType} from '../../../common/CustomSelect';
import {
	LEVEL_PALETTE_LIST,
	PALETTE_COLORS,
} from '../../../palette/types/PaletteColorsList';

import styles from './PropertyPaletteInput.module.css';

function formatOptionLabel(option: OptionType<string>) {
	const colors = PALETTE_COLORS.get(option.value);

	return (
		<div className={styles.option}>
			<span className={styles.optionText}>{option.label}</span>

			{colors != null ? (
				<div className={styles.optionColors}>
					{colors.map((rgb) => {
						const text = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]}`;

						return (
							<div
								className={styles.color}
								key={text}
								style={{background: text}}
							/>
						);
					})}
				</div>
			) : null}
		</div>
	);
}

type Props = $ReadOnly<{
	onEditProperty: (key: string, value: string) => mixed,
	propertyKey: string,
	value: string,
}>;

function PropertyPaletteInput({
	onEditProperty,
	propertyKey,
	value,
}: Props): React$Node {
	const options = LEVEL_PALETTE_LIST;

	const selectOptions = options.map((option) => {
		return {
			label: option === '' ? '(Blank)' : option,
			value: option,
		};
	});

	const selectedValue = selectOptions.find((option) => {
		return option.value === value;
	});

	const onChange = useCallback(
		(newValue: OptionType<string>) => {
			onEditProperty(propertyKey, newValue.value);
		},
		[onEditProperty, propertyKey]
	);

	return (
		<CustomSelect
			formatOptionLabel={formatOptionLabel}
			maxMenuHeight={300}
			onChange={onChange}
			options={selectOptions}
			value={selectedValue ?? null}
		/>
	);
}

export default memo<Props>(PropertyPaletteInput) as React.AbstractComponent<
	Props,
	mixed,
>;
