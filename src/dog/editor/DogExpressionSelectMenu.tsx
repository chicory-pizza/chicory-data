import {useMemo} from 'react';

import {DOG_EXPRESSION_LIST} from '../types/DogExpressionList';

import CustomMenuWithMouseHoverOptions from './CustomMenuWithMouseHoverOptions';

type Props = Readonly<{
	onChange: (value: string) => void;
	onPreviewChange: (value: string | null) => void;
	value: string;
}>;

export default function DogExpressionSelectMenu({
	onChange,
	onPreviewChange,
	value,
}: Props) {
	const options = useMemo(() => {
		return DOG_EXPRESSION_LIST.map((option) => {
			return {
				label: option.label,
				value: option.value,
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
