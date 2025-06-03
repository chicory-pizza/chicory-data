import {useCallback, useMemo} from 'react';

import type {OptionType} from '../../common/CustomSelect';
import CustomSelectOptionLabelImage from '../../common/CustomSelectOptionLabelImage';
import CustomSelectOptionLabelWithImage from '../../common/CustomSelectOptionLabelWithImage';
import {DOG_HAIR_LIST} from '../types/DogHairList';
import type {DogHairType} from '../types/DogHairList';

import CustomMenuWithMouseHoverOptions from './CustomMenuWithMouseHoverOptions';

type Props = Readonly<{
	onChange: (value: string) => void;
	onPreviewChange: (value: string | null) => void;
	value: string;
}>;

export default function DogHairSelectMenu({
	onChange,
	onPreviewChange,
	value,
}: Props) {
	const menuOptions = useMemo(() => {
		return DOG_HAIR_LIST.map((option) => {
			return {
				label: option.externalName,
				value: option.internalName,
			};
		});
	}, []);

	const hairListAsKey = useMemo(() => {
		const list = new Map<string, DogHairType>();

		DOG_HAIR_LIST.forEach((option) => {
			list.set(option.internalName, option);
		});

		return list;
	}, []);

	const formatOptionLabel = useCallback(
		(option: OptionType<string>) => {
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
