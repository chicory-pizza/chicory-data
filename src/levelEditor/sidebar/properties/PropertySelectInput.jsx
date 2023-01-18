// @flow strict

import {memo, useCallback} from 'react';

import CustomSelect from '../../../common/CustomSelect';
import type {OptionType} from '../../../common/CustomSelect';

type Props = $ReadOnly<{
	onEditProperty: (key: string, value: string | number) => mixed,
	options: $ReadOnlyArray<string>,
	propertyKey: string,
	value: string,
}>;

function PropertySelectInput({
	onEditProperty,
	options,
	propertyKey,
	value,
}: Props): React$Node {
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
			maxMenuHeight={300}
			onChange={onChange}
			options={selectOptions}
			value={selectedValue ?? null}
		/>
	);
}

export default (memo<Props>(PropertySelectInput): React$AbstractComponent<
	Props,
	mixed
>);
