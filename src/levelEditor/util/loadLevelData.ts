import type {WorldType} from '../types/WorldType';

// This is split to another file for easier mocking
export default async function loadLevelData(): Promise<WorldType> {
	// @ts-expect-error validate properly
	return (await import('../level_data.json')).default;
}
