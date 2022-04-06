// @flow strict

import {memo, useCallback} from 'react';
// $FlowFixMe[untyped-import]
import {components} from 'react-select';

import CustomSelect from '../../../common/CustomSelect';
import {LEVEL_PALETTE_LIST, PALETTE_COLORS} from '../../types/LevelPaletteList';

import styles from './PropertyPaletteInput.module.css';

function PaletteDetail({
	children,
	value,
}: {
	children: React$Node,
	value: string,
}) {
	const colors = PALETTE_COLORS.get(value);

	return (
		<div className={styles.option}>
			<span className={styles.optionText}>{children}</span>

			{colors != null ? (
				<div className={styles.optionColors}>
					{colors.map((rgb) => {
						const text = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]}`;

						return (
							<div
								className={styles.color}
								key={text}
								style={{background: text}}
							/>
						);
					})}
				</div>
			) : null}
		</div>
	);
}

function SingleValue(props) {
	return (
		<components.SingleValue {...props}>
			<PaletteDetail value={props.data.value}>{props.children}</PaletteDetail>
		</components.SingleValue>
	);
}

function Option(props) {
	return (
		<components.Option {...props}>
			<PaletteDetail value={props.data.value}>{props.children}</PaletteDetail>
		</components.Option>
	);
}

type Props = $ReadOnly<{
	onEditProperty: (key: string, value: string) => mixed,
	propertyKey: string,
	value: string,
}>;

function PropertyPaletteInput({
	onEditProperty,
	propertyKey,
	value,
}: Props): React$Node {
	const options = LEVEL_PALETTE_LIST;

	const selectOptions = options.map((option) => {
		return {
			label: option === '' ? '(Blank)' : option,
			value: option,
		};
	});

	const selectedValue = selectOptions.find((option) => {
		return option.value === value;
	});

	const onChange = useCallback(
		(newValue) => {
			onEditProperty(propertyKey, newValue.value);
		},
		[onEditProperty, propertyKey]
	);

	return (
		<CustomSelect
			components={{Option, SingleValue}}
			maxMenuHeight={300}
			onChange={onChange}
			options={selectOptions}
			value={selectedValue}
		/>
	);
}

export default (memo<Props>(PropertyPaletteInput): React$AbstractComponent<
	Props,
	mixed
>);
