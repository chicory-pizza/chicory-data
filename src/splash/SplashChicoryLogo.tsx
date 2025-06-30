import {useDocumentVisibility, useReducedMotion} from '@mantine/hooks';
import {useEffect, useState} from 'react';
import {useInterval} from 'react-use';

import logoImg from './logo_sprite.png';
import styles from './SplashChicoryLogo.module.css';

const FRAME_HEIGHT = 394 / 2;

export default function SplashChicoryLogo() {
	const [loaded, setLoaded] = useState(false);
	const [animationIndex, setAnimationIndex] = useState(0);
	const [fallback, setFallback] = useState(false);
	const isReducedMotion = useReducedMotion();

	const postAnimate = !fallback && !(animationIndex < 15);

	useEffect(() => {
		const img = new Image();

		img.onload = () => {
			setLoaded(true);
		};

		img.onerror = () => {
			setFallback(true);
		};

		img.src = logoImg;
	}, []);

	const pageVisibility = useDocumentVisibility();
	useInterval(
		() => {
			setAnimationIndex(animationIndex + 1);
		},
		loaded &&
			!fallback &&
			!postAnimate &&
			!isReducedMotion &&
			pageVisibility === 'visible'
			? 1000 / (60 / 5)
			: null
	);

	return (
		<div
			aria-label="Chicory logo"
			className={
				styles.logo +
				' ' +
				(fallback ? styles.logoFallback : '') +
				' ' +
				(postAnimate ? styles.postAnimate : '')
			}
			style={{
				backgroundPosition:
					loaded && !postAnimate && !isReducedMotion
						? '0 ' + (-FRAME_HEIGHT * animationIndex).toString() + 'px'
						: '',
			}}
		/>
	);
}
