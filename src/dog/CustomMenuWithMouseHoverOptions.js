// @flow strict

import {memo, useCallback, useEffect} from 'react';
// $FlowFixMe[untyped-import]
import {components} from 'react-select';

import CustomSelect from '../common/CustomSelect';
import type {OptionType} from '../common/CustomSelect';

type Props = $ReadOnly<{
	onChange: (value: string) => mixed,
	onPreviewChange: (value: ?string) => mixed,
	options: Array<OptionType<string>>,
	value: string,
}>;

function CustomMenuWithMouseHoverOptions({
	onChange,
	onPreviewChange,
	options,
	value,
}: Props): React$Node {
	const onOptionChange = useCallback(
		(newValue) => {
			onChange(newValue.value);
		},
		[onChange]
	);

	const onMenuClose = useCallback(() => {
		onPreviewChange(null);
	}, [onPreviewChange]);

	function Option(props) {
		useEffect(() => {
			if (props.isFocused) {
				onPreviewChange(props.data.value);
			}
		}, [props.data.value, props.isFocused]);

		return <components.Option {...props}>{props.children}</components.Option>;
	}

	return (
		<CustomSelect
			components={{Option}}
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

export default (memo<Props>(
	CustomMenuWithMouseHoverOptions
): React$AbstractComponent<Props, mixed>);
