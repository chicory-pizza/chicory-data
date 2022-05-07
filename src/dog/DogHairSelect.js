// @flow strict

import {memo, useCallback, useEffect} from 'react';
// $FlowFixMe[untyped-import]
import {components} from 'react-select';

import CustomSelect from '../common/CustomSelect';

import {DOG_HAIR_LIST} from './types/DogHairList';

type Props = $ReadOnly<{
	onChange: (value: string) => mixed,
	onPreviewChange: (value: ?string) => mixed,
	value: string,
}>;

function DogHairSelect({onChange, onPreviewChange, value}: Props): React$Node {
	const selectOptions = DOG_HAIR_LIST.map((option) => {
		return {
			label: option.internalName,
			value: option.internalName,
		};
	});

	const selectedValue = selectOptions.find((option) => {
		return option.value === value;
	});

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
			options={selectOptions}
			value={selectedValue}
		/>
	);
}

export default (memo<Props>(DogHairSelect): React$AbstractComponent<
	Props,
	mixed
>);
