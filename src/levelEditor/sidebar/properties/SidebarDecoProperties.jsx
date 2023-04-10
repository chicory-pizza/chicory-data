// @flow strict

import ErrorBoundary from '../../../common/ErrorBoundary';
import type {DecorationType} from '../../types/DecorationType';

import PropertyNumberInput from './PropertyNumberInput';
import PropertyRangeInput from './PropertyRangeInput';
import styles from './SidebarDecoProperties.module.css';
import type {SidebarEntityPropertiesComponentType} from './SidebarEntityPropertiesComponentType';

export default function SidebarDecoProperties(
	props: SidebarEntityPropertiesComponentType<DecorationType, 'DECO'>
): React$MixedElement {
	const deco = props.entity;

	return (
		<ErrorBoundary>
			<div className={styles.coordinatesRoot}>
				<span className={styles.coordinatesText}>XS:</span>
				<PropertyNumberInput
					initialValue={deco.xs}
					onCommitValue={(newValue: number | string | null) => {
						props.onEntityEditProperties(
							props.index,
							{xs: newValue},
							props.type
						);
					}}
					step={0.05}
				/>

				<span className={styles.coordinatesText}>YS:</span>
				<PropertyNumberInput
					initialValue={deco.ys}
					onCommitValue={(newValue: number | string | null) => {
						props.onEntityEditProperties(
							props.index,
							{ys: newValue},
							props.type
						);
					}}
					step={0.05}
				/>
			</div>

			<div className={styles.coordinatesRoot}>
				<span className={styles.coordinatesText}>ang:</span>

				<PropertyRangeInput
					defaultValue={0}
					max={360}
					min={-360}
					onCommitValue={(newValue: number) => {
						props.onEntityEditProperties(
							props.index,
							{ang: newValue},
							props.type
						);
					}}
					value={deco.ang}
				/>

				<PropertyNumberInput
					initialValue={deco.ang}
					onCommitValue={(newValue: number | string | null) => {
						props.onEntityEditProperties(
							props.index,
							{ang: newValue},
							props.type
						);
					}}
				/>
			</div>
		</ErrorBoundary>
	);
}
