import {Button} from '@mantine/core';
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

					<Button disabled variant="default">
						Choose from gallery
					</Button>
				</>
			}
		>
			<SidebarObjectCustomDog {...props} />
		</Suspense>
	);
}
