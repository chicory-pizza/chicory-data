// @flow strict

import CloseButton from '../CloseButton';
import type {GameObjectType} from '../types/GameObjectType';

import styles from './SidebarObjectsList.module.css';
import SidebarObjectText from './SidebarObjectText';

type Props = $ReadOnly<{
	levelObjects: Array<GameObjectType>,
	objectIndexHover: ?number,
	onObjectDelete: (objectIndex: number) => mixed,
	onObjectHover: (objectIndex: ?number) => mixed,
}>;

export default function SidebarObjectsList(props: Props): React$Node {
	return (
		<details className={styles.root} open>
			<summary>
				{props.levelObjects.length > 0
					? 'Objects (' + props.levelObjects.length + ')'
					: 'No objects'}
			</summary>

			<ul className={styles.list}>
				{props.levelObjects.map((obj, index) => {
					return (
						<li key={index}>
							<span
								className={
									styles.item +
									' ' +
									(props.objectIndexHover === index ? styles.highlight : '')
								}
								onMouseEnter={() => props.onObjectHover(index)}
								onMouseLeave={() => props.onObjectHover(null)}
							>
								<span className={styles.text}>
									<SidebarObjectText obj={obj} />
								</span>

								{props.objectIndexHover === index ? (
									<CloseButton
										color="#000"
										label={'Delete ' + obj.obj}
										onClick={() => props.onObjectDelete(index)}
										size=".5em"
									/>
								) : null}
							</span>
						</li>
					);
				})}
			</ul>
		</details>
	);
}
