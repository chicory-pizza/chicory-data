// @flow strict

import {useMemo} from 'react';

import {DOG_HAT_LIST} from '../types/DogHatList';

import CustomMenuWithMouseHoverOptions from './CustomMenuWithMouseHoverOptions';

type Props = $ReadOnly<{
	onChange: (value: string) => mixed,
	onPreviewChange: (value: ?string) => mixed,
	value: string,
}>;

export default function DogHatSelect({
	onChange,
	onPreviewChange,
	value,
}: Props): React$Node {
	const options = useMemo(() => {
		return DOG_HAT_LIST.map((option) => {
			return {
				label: option.externalName,
				value: option.internalName,
			};
		});
	}, []);

	return (
		<CustomMenuWithMouseHoverOptions
			onChange={onChange}
			onPreviewChange={onPreviewChange}
			options={options}
			value={value}
		/>
	);
}
