import {IconCheck} from '@tabler/icons-react';

import styles from './MenuItemCheckedIcon.module.css';

type Props = Readonly<{
	show: boolean;
}>;

export default function MenuItemCheckedIcon({show}: Props) {
	return show ? <IconCheck size={16} /> : <div className={styles.blankIcon} />;
}
