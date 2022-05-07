// @flow strict

import {useMemo} from 'react';

import CustomMenuWithMouseHoverOptions from './CustomMenuWithMouseHoverOptions';
import {DOG_CLOTHES_LIST} from './types/DogClothesList';

type Props = $ReadOnly<{
	onChange: (value: string) => mixed,
	onPreviewChange: (value: ?string) => mixed,
	value: string,
}>;

export default function DogClothesSelect({
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
