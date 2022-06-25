// @flow strict

import ErrorBoundary from '../../../common/ErrorBoundary';
import type {DecorationType} from '../../types/DecorationType';
import type {SidebarEntityPropertiesComponentType} from './SidebarEntityPropertiesComponentType';

import PropertyNumberInput from './PropertyNumberInput';
import styles from './SidebarDecoProperties.module.css';

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
						props.onEntityEditProperty(props.index, 'xs', newValue, props.type);
					}}
					step={0.05}
				/>

				<span className={styles.coordinatesText}>YS:</span>
				<PropertyNumberInput
					initialValue={deco.ys}
					onCommitValue={(newValue: number | string | null) => {
						props.onEntityEditProperty(props.index, 'ys', newValue, props.type);
					}}
					step={0.05}
				/>
			</div>

			<div className={styles.coordinatesRoot}>
				<span className={styles.coordinatesText}>ang:</span>
				<PropertyNumberInput
					initialValue={deco.ang}
					onCommitValue={(newValue: number | string | null) => {
						props.onEntityEditProperty(
							props.index,
							'ang',
							newValue,
							props.type
						);
					}}
				/>
			</div>
		</ErrorBoundary>
	);
}
