// @flow strict

import type {OptionType} from '../../../common/CustomSelect';
import CustomSelect from '../../../common/CustomSelect';

type Props = $ReadOnly<{
	onChange: (newValue: OptionType<string>) => mixed,
	options: $ReadOnlyArray<string>,
	value: string,
}>;

export default function PropertySelectInput({
	onChange,
	options,
	value,
}: Props): React$Node {
	const selectOptions = options.map((option) => {
		return {
			label: option === '' ? '(Blank)' : option,
			value: option,
		};
	});

	return (
		<CustomSelect
			maxMenuHeight={300}
			onChange={onChange}
			options={selectOptions}
			value={selectOptions.find((option) => {
				return option.value === value;
			})}
		/>
	);
}
