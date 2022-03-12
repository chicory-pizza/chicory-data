// @flow strict

import {Fragment} from 'react';

import type {EditablePropertiesType} from '../../types/EditablePropertiesSchemaType';

import PropertyNumberInput from './PropertyNumberInput';
import PropertySelectInput from './PropertySelectInput';
import PropertyTextInput from './PropertyTextInput';
import styles from './SidebarEditableProperties.module.css';

type Props = $ReadOnly<{
	excludeProperties: Array<string>,
	onEditProperty: (key: string, value: string | number) => mixed,
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
		.sort((a, b) => {
			const lowerA = a.toLowerCase();
			const lowerB = b.toLowerCase();

			if (lowerA < lowerB) {
				return -1;
			} else if (lowerA > lowerB) {
				return 1;
			}
			return 0;
		});

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
								props.onEditProperty(propertyKey, newValue);
							}}
						/>
					);
				} else if (propertyType?.type === 'ENUM') {
					input = (
						<PropertySelectInput
							onEditProperty={props.onEditProperty}
							options={propertyType.options}
							propertyKey={propertyKey}
							value={props.properties[propertyKey]}
						/>
					);
				} else {
					// STRING or unknown, just show as textbox
					input = (
						<PropertyTextInput
							initialValue={props.properties[propertyKey] ?? ''}
							onCommitValue={(newValue: string) => {
								props.onEditProperty(propertyKey, newValue);
							}}
						/>
					);
				}

				const help =
					propertyType?.help != null && propertyType.help !== propertyKey
						? propertyType.help
						: null;

				return (
					<Fragment key={propertyKey}>
						<div
							className={
								styles.label + ' ' + (help != null ? styles.labelWithHelp : '')
							}
							title={help}
						>
							{propertyKey}
							{help != null ? ' [?]' : ''}
						</div>

						<div className={styles.input}>{input}</div>
					</Fragment>
				);
			})}
		</div>
	);
}
