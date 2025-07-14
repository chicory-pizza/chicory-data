import {useCallback, useRef} from 'react';

import styles from './PanelResizer.module.css';

type Props = Readonly<{
	children: React.ReactNode;
}>;

export default function PanelResizer(props: Props) {
	const containerRef = useRef<HTMLDivElement>(null);
	const grabberRef = useRef<HTMLButtonElement>(null);

	const uncappedHeight = useRef(0);
	const prevMouseY = useRef(0);

	const onPointerMove = useCallback((ev: PointerEvent) => {
		if (!containerRef.current) {
			return;
		}

		uncappedHeight.current =
			uncappedHeight.current - (ev.clientY - prevMouseY.current);
		prevMouseY.current = ev.clientY;

		containerRef.current.style.height =
			Math.max(
				50,
				Math.min(window.innerHeight, Math.round(uncappedHeight.current))
			).toString() + 'px';
	}, []);

	const onPointerUp = useCallback(() => {
		grabberRef.current?.removeEventListener('pointermove', onPointerMove);
	}, [onPointerMove]);

	const onPointerDown = useCallback(
		(ev: React.PointerEvent) => {
			if (!grabberRef.current || !containerRef.current || ev.buttons !== 1) {
				return;
			}

			grabberRef.current.setPointerCapture(ev.pointerId);
			grabberRef.current.addEventListener('pointermove', onPointerMove);

			uncappedHeight.current =
				containerRef.current.getBoundingClientRect().height;
			prevMouseY.current = ev.clientY;
		},
		[onPointerMove]
	);

	return (
		<div className={styles.root} ref={containerRef}>
			<button
				className={styles.grabber}
				onPointerDown={onPointerDown}
				onPointerUp={onPointerUp}
				ref={grabberRef}
				type="button"
			/>

			{props.children}
		</div>
	);
}
