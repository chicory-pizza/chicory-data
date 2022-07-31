// @flow strict

import {Suspense, lazy} from 'react';

import Spinner from '../../../common/Spinner.jsx';
import type {Props} from '../objectsList/SidebarObjectCustomDog';

import styles from './SidebarObjectCustomDogLoader.module.css';

const SidebarObjectCustomDog = lazy(() =>
	import('../objectsList/SidebarObjectCustomDog')
);

export default function SidebarObjectCustomDogLoader(props: Props): React$Node {
	return (
		<Suspense
			fallback={
				<div className={styles.loader}>
					<Spinner size={32} />
				</div>
			}
		>
			<SidebarObjectCustomDog obj={props.obj} />
		</Suspense>
	);
}
