import {memo, useCallback, useEffect} from 'react';
import {components, type OptionProps} from 'react-select';

import CustomSelect from '../../common/CustomSelect';
import type {OptionType} from '../../common/CustomSelect';

type Props = Readonly<{
	formatOptionLabel?: (data: OptionType<string>) => React.ReactNode;
	onChange: (value: string) => void;
	onPreviewChange: (value: string | null) => void;
	options: Array<OptionType<string>>;
	value: string;
}>;

function CustomMenuWithMouseHoverOptions({
	formatOptionLabel,
	onChange,
	onPreviewChange,
	options,
	value,
}: Props) {
	const onOptionChange = useCallback(
		(newValue: OptionType<string> | null) => {
			if (newValue != null) {
				onChange(newValue.value);
			}
		},
		[onChange]
	);

	const onMenuClose = useCallback(() => {
		onPreviewChange(null);
	}, [onPreviewChange]);

	// eslint-disable-next-line @eslint-react/no-nested-component-definitions, @eslint-react/prefer-read-only-props
	function Option(props: OptionProps<OptionType<string>>) {
		useEffect(() => {
			if (props.isFocused) {
				onPreviewChange(props.data.value);
			}
		}, [props.data.value, props.isFocused]);

		return <components.Option {...props} />;
	}

	return (
		<CustomSelect
			components={{Option}}
			formatOptionLabel={formatOptionLabel}
			isMulti={false}
			maxMenuHeight={300}
			onChange={onOptionChange}
			onMenuClose={onMenuClose}
			options={options}
			value={options.find((option) => {
				return option.value === value;
			})}
		/>
	);
}

export default memo(CustomMenuWithMouseHoverOptions);
