/* eslint-disable @eslint-react/dom/no-unsafe-target-blank */

import {Tooltip} from '@mantine/core';
import {IconChevronLeft} from '@tabler/icons-react';
import {Link} from 'react-router-dom';

import icon144 from '../icon144.png';

import styles from './AppHeader.module.css';
import DiscordIcon from './DiscordIcon';
import GitHubIcon from './GitHubIcon';

type Props = Readonly<{
	controls?: React.ReactNode;
	title: string;
	titleSideStuff?: React.ReactNode;
}>;

export default function AppHeader(props: Props) {
	return (
		<header className={styles.root}>
			<Tooltip label="Go to main tools list">
				<Link className={styles.backToHome} to="/">
					<IconChevronLeft className={styles.backToHomeArrow} stroke={2} />

					<img
						alt="Chicory: A Colorful Tale game logo"
						height={72}
						src={icon144}
						width={72}
					/>
				</Link>
			</Tooltip>

			<div className={styles.content}>
				<div className={styles.titleWrapper}>
					<h1 className={styles.title}>{props.title}</h1>

					<div className={styles.dataSelector}>{props.titleSideStuff}</div>

					<div className={styles.links}>
						<Tooltip label="Join the Chicory fan Discord" position="bottom">
							<a
								className={styles.websiteLink}
								href="https://discord.chicory.pizza"
								rel="noopener"
								target="_blank"
							>
								<DiscordIcon className={styles.discordIcon} />
							</a>
						</Tooltip>

						<Tooltip label="View this project on GitHub" position="bottom">
							<a
								className={styles.websiteLink}
								href="https://github.com/chicory-pizza/chicory-data"
								rel="noopener"
								target="_blank"
							>
								<GitHubIcon className={styles.githubIcon} />
							</a>
						</Tooltip>
					</div>
				</div>

				{props.controls}
			</div>
		</header>
	);
}
