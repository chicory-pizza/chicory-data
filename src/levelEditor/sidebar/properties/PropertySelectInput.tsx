import {memo, useCallback} from 'react';

import CustomSelect from '../../../common/CustomSelect';
import type {OptionType} from '../../../common/CustomSelect';

type Props = Readonly<{
	onEditProperty: (key: string, value: string) => void;
	options: ReadonlyArray<string>;
	propertyKey: string;
	value: string | undefined;
}>;

function PropertySelectInput({
	onEditProperty,
	options,
	propertyKey,
	value,
}: Props) {
	const selectOptions = options.map((option) => {
		return {
			label: option === '' ? '(Blank)' : option,
			value: option,
		};
	});

	const selectedValue = selectOptions.find((option) => {
		return option.value === value;
	});

	const onOptionChange = useCallback(
		(newValue: OptionType<string> | null) => {
			if (newValue != null) {
				onEditProperty(propertyKey, newValue.value);
			}
		},
		[onEditProperty, propertyKey]
	);

	return (
		<CustomSelect
			maxMenuHeight={300}
			onChange={onOptionChange}
			options={selectOptions}
			value={selectedValue ?? null}
		/>
	);
}

export default memo(PropertySelectInput);
