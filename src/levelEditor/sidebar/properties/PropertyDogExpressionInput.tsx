import {memo, useCallback} from 'react';

import CustomSelect from '../../../common/CustomSelect';
import type {OptionType} from '../../../common/CustomSelect';
import {DOG_EXPRESSION_LIST} from '../../../dog/types/DogExpressionList';

type Props = Readonly<{
	onEditProperty: (key: string, value: string) => void;
	propertyKey: string;
	value: string | undefined;
}>;

function PropertyDogExpressionInput({
	onEditProperty,
	propertyKey,
	value,
}: Props) {
	const selectOptions = [{label: '(Blank)', value: ''}].concat(
		DOG_EXPRESSION_LIST.map((option) => {
			if (!option.inGame) {
				return null;
			}

			return {
				label: option.label,
				value: option.value,
			};
		}).filter(Boolean)
	);

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

export default memo(PropertyDogExpressionInput);
