// @flow strict

import {memo, useCallback} from 'react';

import CustomSelect from '../../../common/CustomSelect';
import type {OptionType} from '../../../common/CustomSelect';
import {DOG_EXPRESSION_LIST} from '../../../dog/types/DogExpressionList';

type Props = $ReadOnly<{
	onEditProperty: (key: string, value: string | number) => mixed,
	propertyKey: string,
	value: string,
}>;

function PropertyDogExpressionInput({
	onEditProperty,
	propertyKey,
	value,
}: Props): React$Node {
	const selectOptions = DOG_EXPRESSION_LIST.map((option) => {
		if (!option.inGame) {
			return null;
		}

		return {
			label: option.label,
			value: option.value,
		};
	}).filter(Boolean);

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
			maxMenuHeight={300}
			onChange={onChange}
			options={selectOptions}
			value={selectedValue ?? null}
		/>
	);
}

export default memo<Props>(
	PropertyDogExpressionInput
) as React.AbstractComponent<Props, mixed>;
