// @flow strict

// $FlowFixMe[untyped-import]
import Select from 'react-select';

export type OptionType<T> = {
	label: string,
	value: T,
};

type Props<T> = $ReadOnly<{
	components?: {
		Option?: React.AbstractComponent<
			{children: React$Node, data: OptionType<T>, isFocused: boolean, ...},
			mixed,
		>,
		SingleValue?: React.AbstractComponent<
			{children: React$Node, data: OptionType<T>, ...},
			mixed,
		>,
	},
	formatOptionLabel?: (option: OptionType<T>) => React$Node,
	maxMenuHeight: number,
	onChange: (newOption: OptionType<T>) => mixed,
	onMenuClose?: () => void,
	options:
		| Array<OptionType<T>>
		| $ReadOnlyArray<OptionType<T>>
		| Array<{
				label: string,
				options: Array<OptionType<T>>,
		  }>
		| $ReadOnlyArray<{
				label: string,
				options: $ReadOnlyArray<OptionType<T>>,
		  }>,
	value: ?OptionType<T>,
}>;

const CUSTOM_STYLES = {
	control(provided: {[property: string]: string}, state: {...}) {
		return {
			...provided,
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
	dropdownIndicator(provided: {[property: string]: string}, state: {...}) {
		return {
			...provided,
			color: 'var(--input-border-color)',
			transition: 'none',
			'&:hover': {
				color: 'var(--input-border-hover-color)',
			},
		};
	},
	indicatorSeparator(provided: {[property: string]: string}, state: {...}) {
		return {
			...provided,
			backgroundColor: 'var(--input-border-color)',
		};
	},
	input(provided: {[property: string]: string}, state: {...}) {
		return {
			...provided,
			color: 'var(--input-text-color)',
		};
	},
	menuList(provided: {[property: string]: string}, state: {...}) {
		return {
			...provided,
			background: 'var(--input-background-color)',
		};
	},
	menuPortal(provided: {[property: string]: string}, state: {...}) {
		return {
			...provided,
			zIndex: 99,
		};
	},
	option(provided: {[property: string]: string}, state: {...}) {
		return {
			...provided,
			color: '',
			cursor: 'pointer',
		};
	},
	singleValue(provided: {[property: string]: string}, state: {...}) {
		return {
			...provided,
			color: 'var(--body-text-color)',
		};
	},
};

const CUSTOM_THEME = (theme: {
	borderRadius: number,
	colors: {
		primary: string,
		primary75: string,
		primary50: string,
		primary25: string,
		danger: string,
		dangerLight: string,
		neutral0: string,
		neutral5: string,
		neutral10: string,
		neutral20: string,
		neutral30: string,
		neutral40: string,
		neutral50: string,
		neutral60: string,
		neutral70: string,
		neutral80: string,
		neutral90: string,
	},
	spacing: {baseUnit: number, controlHeight: number, menuGutter: number},
}) => {
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

export default function CustomSelect<T>(props: Props<T>): React$MixedElement {
	return (
		<Select
			components={props.components}
			formatOptionLabel={props.formatOptionLabel}
			maxMenuHeight={props.maxMenuHeight}
			menuPortalTarget={document.body}
			onChange={props.onChange}
			onMenuClose={props.onMenuClose}
			options={props.options}
			styles={CUSTOM_STYLES}
			theme={CUSTOM_THEME}
			value={props.value}
		/>
	);
}
