import {useMemo} from 'react';

import {DOG_CLOTHES_LIST} from '../types/DogClothesList';

import CustomMenuWithMouseHoverOptions from './CustomMenuWithMouseHoverOptions';

type Props = Readonly<{
	onChange: (value: string) => void;
	onPreviewChange: (value: string | null) => void;
	value: string;
}>;

export default function DogClothesSelectMenu({
	onChange,
	onPreviewChange,
	value,
}: Props) {
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
