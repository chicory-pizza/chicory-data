// @flow strict

import {useMemo} from 'react';

import {DOG_CLOTHES_LIST} from '../types/DogClothesList';

import CustomMenuWithMouseHoverOptions from './CustomMenuWithMouseHoverOptions';

type Props = $ReadOnly<{
	onChange: (value: string) => mixed,
	onPreviewChange: (value: ?string) => mixed,
	value: string,
}>;

export default function DogClothesSelectMenu({
	onChange,
	onPreviewChange,
	value,
}: Props): React$Node {
	const options = useMemo(() => {
		return DOG_CLOTHES_LIST.map((option) => {
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
