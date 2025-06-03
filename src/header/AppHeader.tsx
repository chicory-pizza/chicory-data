/* eslint-disable @eslint-react/dom/no-unsafe-target-blank */

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
			<Link className={styles.backToHome} title="Go to main tools list" to="/">
				{/* https://icons.getbootstrap.com/icons/chevron-left/ */}
				<svg
					className={styles.backToHomeArrow}
					fill="currentColor"
					height="16"
					viewBox="0 0 16 16"
					width="16"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
						fillRule="evenodd"
					/>
				</svg>

				<img
					alt="Chicory: A Colorful Tale game logo"
					height={72}
					src={icon144}
					width={72}
				/>
			</Link>

			<div className={styles.content}>
				<div className={styles.titleWrapper}>
					<h1 className={styles.title}>{props.title}</h1>

					<div className={styles.dataSelector}>{props.titleSideStuff}</div>

					<div className={styles.links}>
						<a
							className={styles.websiteLink}
							href="https://discord.chicory.pizza"
							rel="noopener"
							target="_blank"
							title="Join the Chicory fan Discord"
						>
							<DiscordIcon className={styles.discordIcon} />
						</a>

						<a
							className={styles.websiteLink}
							href="https://github.com/chicory-pizza/chicory-data"
							rel="noopener"
							target="_blank"
							title="View this project on GitHub"
						>
							<GitHubIcon className={styles.githubIcon} />
						</a>
					</div>
				</div>

				{props.controls}
			</div>
		</header>
	);
}
