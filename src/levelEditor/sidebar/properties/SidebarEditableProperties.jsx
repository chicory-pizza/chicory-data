// @flow strict

import {Fragment} from 'react';

import type {EditablePropertiesType} from '../../types/EditablePropertiesSchemaType';

import PropertyDogExpressionInput from './PropertyDogExpressionInput';
import PropertyGameMakerColorInput from './PropertyGameMakerColorInput';
import PropertyImageBufferInput from './PropertyImageBufferInput';
import PropertyNumberInput from './PropertyNumberInput';
import PropertyPaletteInput from './PropertyPaletteInput';
import PropertySelectInput from './PropertySelectInput';
import PropertyTextInput from './PropertyTextInput';
import styles from './SidebarEditableProperties.module.css';

type Props = $ReadOnly<{
	excludeProperties: Array<string>,
	onEditProperty: (key: string, value: string | number | null) => mixed,
	properties: {...},
	schema: Array<EditablePropertiesType>,
	testIdPrefix?: string,
}>;

export default function SidebarEditableProperties(props: Props): React$Node {
	const propertyKeys = Array.from(
		new Set(
			(Object.keys(props.properties) as $ReadOnlyArray<string>).concat(
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
							// $FlowFixMe[invalid-computed-prop]
							initialValue={props.properties[propertyKey] ?? ''}
							onCommitValue={(newValue: number | string | null) => {
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
							// $FlowFixMe[invalid-computed-prop]
							value={props.properties[propertyKey]}
						/>
					);
				} else if (propertyType?.type === 'PALETTE') {
					input = (
						<PropertyPaletteInput
							onEditProperty={props.onEditProperty}
							propertyKey={propertyKey}
							// $FlowFixMe[invalid-computed-prop]
							value={props.properties[propertyKey]}
						/>
					);
				} else if (propertyType?.type === 'DOG_EXPRESSION') {
					input = (
						<PropertyDogExpressionInput
							onEditProperty={props.onEditProperty}
							propertyKey={propertyKey}
							// $FlowFixMe[invalid-computed-prop]
							value={props.properties[propertyKey]}
						/>
					);
				} else if (propertyType?.type === 'GM_COLOR') {
					input = (
						<PropertyGameMakerColorInput
							defaultValue={propertyType.default}
							onEditProperty={props.onEditProperty}
							propertyKey={propertyKey}
							// $FlowFixMe[invalid-computed-prop]
							value={props.properties[propertyKey]}
						/>
					);
				} else if (propertyType?.type === 'IMAGE_BUFFER') {
					input = (
						<PropertyImageBufferInput
							onEditProperty={props.onEditProperty}
							propertyKey={propertyKey}
							// $FlowFixMe[invalid-computed-prop]
							value={props.properties[propertyKey]}
						/>
					);
				} else {
					// STRING or unknown, just show as textbox
					input = (
						<PropertyTextInput
							// $FlowFixMe[invalid-computed-prop]
							initialValue={props.properties[propertyKey] ?? ''}
							onCommitValue={(newValue: string) => {
								props.onEditProperty(propertyKey, newValue);
							}}
							testId={
								props.testIdPrefix != null
									? props.testIdPrefix + '-' + propertyKey
									: null
							}
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
