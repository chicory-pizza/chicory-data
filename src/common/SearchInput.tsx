import {Input, TextInput, Tooltip} from '@mantine/core';
import {MagnifyingGlassIcon} from '@phosphor-icons/react/dist/csr/MagnifyingGlass';

type Props = Readonly<{
	className?: string;
	label?: string;
	setValue: (newValue: string) => void;
	value: string;
}>;

export default function SearchInput({
	className,
	label = 'Search',
	setValue,
	value,
}: Props) {
	return (
		<TextInput
			aria-label={label}
			className={className}
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
			placeholder={label}
			spellCheck={false}
			type="search"
			value={value}
		/>
	);
}
