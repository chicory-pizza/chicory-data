import {type MatchImageSnapshotOptions} from 'jest-image-snapshot';
import 'vitest';

declare module 'vitest' {
	interface Matchers<R /*, T*/> {
		toMatchImageSnapshot(options?: MatchImageSnapshotOptions): R;
	}
}
