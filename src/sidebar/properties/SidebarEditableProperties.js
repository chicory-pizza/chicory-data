// @flow strict

import type {EditablePropertiesType} from '../../types/EditablePropertiesSchemaType';

import PropertyNumberInput from './PropertyNumberInput';
import PropertySelectInput from './PropertySelectInput';
import PropertyTextInput from './PropertyTextInput';
import styles from './SidebarEditableProperties.module.css';

type Props = $ReadOnly<{
	excludeProperties: Array<string>,
	onLevelEditProperty: (key: string, value: string | number) => mixed,
	properties: {...},
	schema: Array<EditablePropertiesType>,
}>;

export default function SidebarEditableProperties(props: Props): React$Node {
	const propertyKeys = Array.from(
		new Set(
			Object.keys(props.properties).concat(
				props.schema.map((type) => {
					return type.key;
				})
			)
		)
	)
		.filter((propertyKey) => {
			return !props.excludeProperties.includes(propertyKey);
		})
		.sort();

	return (
		<div className={styles.root}>
			{propertyKeys.map((propertyKey: string) => {
				const propertyType = props.schema.find((type) => {
					return type.key === propertyKey;
				});

				let input;
				if (propertyType?.type === 'NUMBER') {
					input = (
						<PropertyNumberInput
							initialValue={props.properties[propertyKey] ?? ''}
							onCommitValue={(newValue: number | string) => {
								props.onLevelEditProperty(propertyKey, newValue);
							}}
						/>
					);
				} else if (propertyType?.type === 'ENUM') {
					input = (
						<PropertySelectInput
							onChange={(newValue) => {
								props.onLevelEditProperty(propertyKey, newValue.value);
							}}
							options={propertyType.options}
							value={props.properties[propertyKey]}
						/>
					);
				} else {
					// STRING or unknown, just show as textbox
					input = (
						<PropertyTextInput
							initialValue={props.properties[propertyKey] ?? ''}
							onCommitValue={(newValue: string) => {
								props.onLevelEditProperty(propertyKey, newValue);
							}}
						/>
					);
				}

				return (
					<div className={styles.row} key={propertyKey}>
						<div className={styles.label}>{propertyKey}</div>

						<div className={styles.input}>{input}</div>
					</div>
				);
			})}
		</div>
	);
}
