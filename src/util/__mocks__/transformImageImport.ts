import path from 'node:path';

export default function transformImageImport(url: URL): string {
	// url will be something like `http://localhost:3000/src/dog/images/dog_animations/idle/sprDog_idle_A_0.png`

	// Get the current dirname in filesystem to figure out the path to root project folder
	// Then append the url pathname
	return path.resolve(import.meta.dirname, '../../../') + url.pathname;
}
