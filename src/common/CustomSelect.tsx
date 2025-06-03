import Select, {
	type CSSObjectWithLabel,
	type GroupBase,
	type Props as ReactSelectProps,
	type Theme,
} from 'react-select';

export type OptionType<T> = {
	label: string;
	value: T;
};

const CUSTOM_STYLES = {
	control(baseStyles: CSSObjectWithLabel) {
		return {
			...baseStyles,
			background: 'var(--input-background-color)',
			borderColor: 'var(--input-border-color)',
			borderRadius: 0,
			cursor: 'pointer',
			transition: 'none',
			'&:hover': {
				borderColor: 'var(--input-border-hover-color)',
			},
		};
	},
	dropdownIndicator(baseStyles: CSSObjectWithLabel) {
		return {
			...baseStyles,
			color: 'var(--input-border-color)',
			transition: 'none',
			'&:hover': {
				color: 'var(--input-border-hover-color)',
			},
		};
	},
	indicatorSeparator(baseStyles: CSSObjectWithLabel) {
		return {
			...baseStyles,
			backgroundColor: 'var(--input-border-color)',
		};
	},
	input(baseStyles: CSSObjectWithLabel) {
		return {
			...baseStyles,
			color: 'var(--input-text-color)',
		};
	},
	menuList(baseStyles: CSSObjectWithLabel) {
		return {
			...baseStyles,
			background: 'var(--input-background-color)',
		};
	},
	menuPortal(baseStyles: CSSObjectWithLabel) {
		return {
			...baseStyles,
			zIndex: 99,
		};
	},
	option(baseStyles: CSSObjectWithLabel) {
		return {
			...baseStyles,
			color: '',
			cursor: 'pointer',
		};
	},
	singleValue(baseStyles: CSSObjectWithLabel) {
		return {
			...baseStyles,
			color: 'var(--body-text-color)',
		};
	},
};

const CUSTOM_THEME = (theme: Theme) => {
	return {
		...theme,
		colors: {
			...theme.colors,
			primary: 'var(--luncheon-purple)',
			primary25: 'var(--luncheon-orange)',
			primary50: 'var(--luncheon-teal)',
		},
	};
};

export default function CustomSelect<
	Option,
	IsMulti extends boolean = false,
	Group extends GroupBase<Option> = GroupBase<Option>,
>(
	props: Readonly<
		Omit<
			ReactSelectProps<Option, IsMulti, Group>,
			'menuPortalTarget' | 'styles' | 'themes'
		>
	>
) {
	return (
		<Select
			{...props}
			menuPortalTarget={document.body}
			styles={CUSTOM_STYLES}
			theme={CUSTOM_THEME}
		/>
	);
}
