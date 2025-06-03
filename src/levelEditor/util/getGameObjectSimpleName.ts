export default function getGameObjectSimpleName(name: string): string {
	if (!name.startsWith('obj')) {
		return name;
	}

	return name.slice('obj'.length);
}
