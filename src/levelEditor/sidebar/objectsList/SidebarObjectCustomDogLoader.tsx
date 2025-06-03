import {Suspense, lazy} from 'react';

import Spinner from '../../../common/Spinner';

import styles from './SidebarObjectCustomDogLoader.module.css';

const SidebarObjectCustomDog = lazy(
	() => import('../objectsList/SidebarObjectCustomDog')
);

export default function SidebarObjectCustomDogLoader(
	props: React.ComponentProps<typeof SidebarObjectCustomDog>
) {
	return (
		<Suspense
			fallback={
				<>
					<div className={styles.loader}>
						<Spinner size={32} />
					</div>

					<button disabled type="button">
						Choose from gallery
					</button>
				</>
			}
		>
			<SidebarObjectCustomDog {...props} />
		</Suspense>
	);
}
