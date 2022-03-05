// @flow strict

import {memo, useEffect, useRef} from 'react';

import CloseButton from '../../CloseButton';
import type {GameObjectType} from '../../types/GameObjectType';
import usePrevious from '../../util/usePrevious';
import SidebarObjectText from '../SidebarObjectText';

import styles from './SidebarObjectsItem.module.css';

type Props = $ReadOnly<{
	expanded: boolean,
	highlighted: boolean,
	index: number,
	obj: GameObjectType,
	onItemToggle: (objectIndex: number) => mixed,
	onObjectDelete: (objectIndex: number) => mixed,
	onObjectHover: (objectIndex: ?number) => mixed,
}>;

function SidebarObjectItem(props: Props): React$Node {
	const item = useRef<?HTMLLIElement>(null);
	const previousExpanded = usePrevious(props.expanded);

	useEffect(() => {
		if (previousExpanded !== props.expanded && props.expanded) {
			item.current?.scrollIntoView({
				block: 'nearest',
			});
		}
	}, [previousExpanded, props.expanded]);

	return (
		<li
			className={
				styles.item + ' ' + (props.highlighted ? styles.highlight : '')
			}
			onMouseEnter={() => props.onObjectHover(props.index)}
			onMouseLeave={() => props.onObjectHover(null)}
			ref={item}
		>
			{/* Flexbox doesn't work well in <details><summary> :( */}
			<div className={styles.title}>
				<button
					className={styles.toggleIcon}
					onFocus={() => props.onObjectHover(props.index)}
					onClick={() => props.onItemToggle(props.index)}
					title={props.expanded ? 'Collapse details' : 'Expand details'}
					type="button"
				>
					{props.expanded ? '▼' : '▶︎'}
				</button>

				<span className={styles.text}>
					<SidebarObjectText obj={props.obj} />
				</span>

				{props.highlighted ? (
					<CloseButton
						color="#000"
						label={'Delete ' + props.obj.obj}
						onClick={() => props.onObjectDelete(props.index)}
						size=".6em"
					/>
				) : null}
			</div>

			{props.expanded ? (
				<div className={styles.editor}>
					<pre>
						<code>{JSON.stringify(props.obj, null, 2)}</code>
					</pre>
				</div>
			) : null}
		</li>
	);
}

export default (memo<Props>(SidebarObjectItem): React$AbstractComponent<
	Props,
	mixed
>);
