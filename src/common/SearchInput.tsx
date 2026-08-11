import {Input, TextInput, Tooltip} from '@mantine/core';
import {MagnifyingGlassIcon} from '@phosphor-icons/react/dist/csr/MagnifyingGlass';

type Props = Readonly<{
	setValue: (newValue: string) => void;
	value: string;
}>;

export default function SearchInput({setValue, value}: Props) {
	return (
		<TextInput
			aria-label="Search"
			leftSectionPointerEvents="none"
			leftSection={<MagnifyingGlassIcon size={16} />}
			rightSection={
				value !== '' ? (
					<Tooltip label="Clear">
						<Input.ClearButton
							onClick={() => {
								setValue('');
							}}
						/>
					</Tooltip>
				) : undefined
			}
			onChange={(newFilter) => {
				setValue(newFilter.currentTarget.value);
			}}
			placeholder="Search"
			spellCheck={false}
			type="search"
			value={value}
		/>
	);
}
