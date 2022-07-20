// @flow strict

import {useCallback, useMemo} from 'react';

import CustomSelectOptionLabelImage from '../../common/CustomSelectOptionLabelImage.jsx';
import CustomSelectOptionLabelWithImage from '../../common/CustomSelectOptionLabelWithImage';
import {DOG_HAIR_LIST} from '../types/DogHairList';

import CustomMenuWithMouseHoverOptions from './CustomMenuWithMouseHoverOptions';

type Props = $ReadOnly<{
	onChange: (value: string) => mixed,
	onPreviewChange: (value: ?string) => mixed,
	value: string,
}>;

export default function DogHairSelect({
	onChange,
	onPreviewChange,
	value,
}: Props): React$Node {
	const menuOptions = useMemo(() => {
		return DOG_HAIR_LIST.map((option) => {
			return {
				label: option.externalName,
				value: option.internalName,
			};
		});
	}, []);

	const hairListAsKey = useMemo(() => {
		const list = new Map();

		DOG_HAIR_LIST.forEach((option) => {
			list.set(option.internalName, option);
		});

		return list;
	}, []);

	const formatOptionLabel = useCallback(
		(option) => {
			const hair = hairListAsKey.get(option.value);

			if (!hair) {
				return option.label;
			}

			return (
				<CustomSelectOptionLabelWithImage
					image={
						<CustomSelectOptionLabelImage src={hair.imageWithTrimmedPath} />
					}
					label={option.label}
				/>
			);
		},
		[hairListAsKey]
	);

	return (
		<CustomMenuWithMouseHoverOptions
			formatOptionLabel={formatOptionLabel}
			onChange={onChange}
			onPreviewChange={onPreviewChange}
			options={menuOptions}
			value={value}
		/>
	);
}
