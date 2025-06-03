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

type Props = Readonly<{
	excludeProperties: Array<string>;
	onEditProperty: (key: string, value: string | number | null) => void;
	properties: Record<string, string | number | unknown>;
	schema: ReadonlyArray<EditablePropertiesType>;
	testIdPrefix?: string;
}>;

export default function SidebarEditableProperties(props: Props) {
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
				let input;
				let help: string | null = null;

				const value = props.properties[propertyKey];
				const propertyType = props.schema.find((type) => {
					return type.key === propertyKey;
				});
				if (propertyType) {
					if (propertyType.type === 'NUMBER') {
						input = (
							<PropertyNumberInput
								initialValue={
									typeof value === 'string' || typeof value === 'number'
										? value
										: null
								}
								onCommitValue={(newValue: number | string | null) => {
									props.onEditProperty(propertyKey, newValue);
								}}
							/>
						);
					} else if (propertyType.type === 'ENUM') {
						input = (
							<PropertySelectInput
								onEditProperty={props.onEditProperty}
								options={propertyType.options}
								propertyKey={propertyKey}
								value={typeof value === 'string' ? value : undefined}
							/>
						);
					} else if (propertyType.type === 'PALETTE') {
						input = (
							<PropertyPaletteInput
								onEditProperty={props.onEditProperty}
								propertyKey={propertyKey}
								value={typeof value === 'string' ? value : undefined}
							/>
						);
					} else if (propertyType.type === 'DOG_EXPRESSION') {
						input = (
							<PropertyDogExpressionInput
								onEditProperty={props.onEditProperty}
								propertyKey={propertyKey}
								value={typeof value === 'string' ? value : undefined}
							/>
						);
					} else if (propertyType.type === 'GM_COLOR') {
						input = (
							<PropertyGameMakerColorInput
								defaultValue={propertyType.default}
								onEditProperty={props.onEditProperty}
								propertyKey={propertyKey}
								value={typeof value === 'number' ? value : undefined}
							/>
						);
					} else if (propertyType.type === 'IMAGE_BUFFER') {
						input = (
							<PropertyImageBufferInput
								onEditProperty={props.onEditProperty}
								propertyKey={propertyKey}
								value={typeof value === 'string' ? value : undefined}
							/>
						);
					}

					help =
						'help' in propertyType &&
						propertyType.help != null &&
						propertyType.help !== propertyKey // avoid useless help text that is same with property key
							? propertyType.help
							: null;
				}

				if (!input) {
					// STRING or unknown, just show as textbox
					input = (
						<PropertyTextInput
							initialValue={value != null ? String(value) : ''}
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

				return (
					<Fragment key={propertyKey}>
						<div
							className={
								styles.label + ' ' + (help != null ? styles.labelWithHelp : '')
							}
							title={help ?? undefined}
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
