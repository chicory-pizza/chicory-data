// node --experimental-strip-types extract_object_types_from_level_data.ts | pbcopy

import fs from 'node:fs/promises';

const json = JSON.parse(
	await fs.readFile('../src/levelEditor/level_data.json', 'utf-8')
);

type PropertyInfo = {
	type: Set<'STRING' | 'NUMBER'>;
	samples: Set<string | number>;
	count: number;
};

type ObjectInfo = {
	count: number;
	properties: Map<string, PropertyInfo>;
};

const schema = new Map<
	string, // `obj.obj` main name
	ObjectInfo
>();

function isNumber(text: string) {
	return text.match(/^-?[0-9]*(\.[0-9]+)?$/);
}

for (const key in json) {
	const levelObjects = json[key].objects;
	if (levelObjects == null) {
		continue;
	}

	levelObjects.forEach((obj) => {
		// every object should have obj, x, y
		const valid =
			typeof obj.obj === 'string' &&
			typeof obj.x === 'number' &&
			typeof obj.y === 'number' &&
			(obj.id == null || typeof obj.id === 'number');
		if (!valid) {
			throw new Error(`Malformed object ${JSON.stringify(obj)}`);
		}

		const objectInfo: ObjectInfo = schema.get(obj.obj) ?? {
			count: 0,
			properties: new Map(),
		};

		for (const propKey in obj) {
			if (
				propKey === 'obj' ||
				propKey === 'x' ||
				propKey === 'y' ||
				propKey === 'id'
			) {
				continue;
			}

			const propType: PropertyInfo = objectInfo.properties.get(propKey) ?? {
				type: new Set(),
				samples: new Set(),
				count: 0,
			};

			switch (typeof obj[propKey]) {
				case 'string':
					propType.type.add('STRING');
					break;

				case 'number':
					propType.type.add('NUMBER');
					break;

				default:
					throw new Error(`Unknown typeof ${propKey}`);
			}
			propType.samples.add(obj[propKey]);
			propType.count += 1;

			objectInfo.properties.set(propKey, propType);
		}

		objectInfo.count += 1;
		schema.set(obj.obj, objectInfo);
	});
}

const templates: string[] = [];
const objectsToExcludeFromGeneralType: string[] = [];

const keys = Array.from(schema.keys()).sort();
for (const objName of keys) {
	const obj = schema.get(objName);
	if (obj == null) {
		throw new Error();
	}

	if (obj.properties.size === 0) {
		continue;
	}

	objectsToExcludeFromGeneralType.push(objName);

	let template = '| {\n';
	template += `\tobj: '${objName}';\n`;
	template += `\tx: number;\n`;
	template += `\ty: number;\n`;
	template += `\tid?: number;\n`;
	template += `\n`;

	const propertyKeys = Array.from(obj.properties.keys()).sort();
	for (const propKey of propertyKeys) {
		const prop = obj.properties.get(propKey);
		if (prop == null) {
			throw new Error();
		}

		template += '\t';
		template += propKey;
		template += prop.count !== obj.count ? '?' : '';
		template += ': ';

		const types: Array<string | number> = [];
		if (prop.samples.size > 1) {
			if (prop.type.has('STRING')) {
				// Examine all the string samples and see if they are actually just numbers
				const isFakeNumberAsString = [...prop.samples].every((sample) => {
					if (typeof sample !== 'string' || sample === '') {
						// failsafe
						return false;
					}

					return isNumber(sample);
				});

				if (isFakeNumberAsString) {
					types.push('StringThatShouldBeNumber');
				} else {
					types.push('string');
				}
			}

			if (prop.type.has('NUMBER')) {
				types.push('number');
			}
		}

		[...prop.samples]
			.sort((a, b) => {
				let compareA = a;
				let compareB = b;

				if (typeof a === 'string' && typeof b === 'string') {
					if (isNumber(a) && isNumber(b)) {
						compareA = parseFloat(a);
						compareB = parseFloat(b);
					} else {
						compareA = a.toLowerCase();
						compareB = b.toLowerCase();
					}
				}

				if (compareA < compareB) {
					return -1;
				} else if (compareA > compareB) {
					return 1;
				}
				return 0;
			})
			.forEach((sample) => {
				types.push(JSON.stringify(sample));
			});
		template += types.join(' | ');
		template += ';';

		// Add comments here
		if (objName === 'objPortal') {
			switch (propKey) {
				case 'ID':
					template += ' // why greg';
					break;

				case 'interactable':
					template += ' // only on [1, -1, -1]';
					break;

				case 'trans':
					template += ' // undefined on 1_-1_-1';
					break;

				default:
					break;
			}
		}
		template += '\n';
	}
	// template += '\t[key: string]: string | number | undefined;\n';
	template += '}';

	templates.push(template);
}

console.log(`export type GameObjectType =
| {
	obj: Exclude<
		GameObjectEntityType,
		'${objectsToExcludeFromGeneralType.join(`' | '`)}' | CustomGameObjectNames
	>;
	x: number;
	y: number;
	id?: number;

	// [key: string]: string | number | undefined;
}`);
console.log(templates.join('\n'));
console.log('| CustomGameObjectTypes;');
