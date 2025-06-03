import type {DecorationType} from './DecorationType';
import type {GameObjectType} from './GameObjectType';
import type {LevelTitleType} from './LevelTitleType';

/*

[...new Set(Object.values(window.levelsData).reduce((prev, current) => {
    return prev.concat(current.ambiance)
}, []))].sort()


Object.values(window.levelsData).reduce((prev, current) => {
	if (current.objects == null) {return prev;}

	return current.objects.reduce((prevB, currentB) => {
		if (prevB.includes(currentB.obj)) {return prevB;}

		return prevB.concat(currentB.obj);
	}, prev)
}, []).sort()


Object.values(window.levelsData).reduce((prev, current) => {
    if (current.objects == null) {return prev;}

    return current.objects.reduce((prevB, currentB) => {
        if (prevB[currentB.obj]) {return prevB;}

        const keys = Object.keys(currentB).filter(key => !['obj', 'x', 'y', 'id'].includes(key));
        if (keys.length === 0) {return prevB;}

        prevB[currentB.obj] = currentB;

        return prevB;
    }, prev)
}, {})

*/

export type LevelType = {
	ambiance: string;
	area: string;
	decos?: Array<DecorationType>;
	exits?: string;
	foley: string | number;
	geo: string;
	music: string;
	name: string;
	object_id: string | number;
	objects?: Array<GameObjectType>;
	palette: string;
	title?: LevelTitleType;
	transition: string | number;
};

const LEVEL_TYPE_KEYS = new Set([
	'ambiance',
	'area',
	'decos',
	'exits',
	'foley',
	'geo',
	'music',
	'name',
	'object_id',
	'objects',
	'palette',
	'title',
	'transition',
]) as ReadonlySet<keyof LevelType>;

export function isValidLevelTypeKey(key: string): key is keyof LevelType {
	return LEVEL_TYPE_KEYS.has(key);
}
