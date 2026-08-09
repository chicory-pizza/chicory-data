import type {WorldType} from '../../types/WorldType';

export default async function loadLevelData(): Promise<WorldType> {
	// @ts-expect-error validate properly
	return (await import('../../__mocks__/level_data.json')).default;
}
