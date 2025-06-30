import type {LevelType} from './LevelType';

export type WorldType = {
	// undefined is added because noUncheckedIndexedAccess is off
	// luckily the game itself doesn't have null levels...
	[levelId: string]: LevelType | undefined;
};
