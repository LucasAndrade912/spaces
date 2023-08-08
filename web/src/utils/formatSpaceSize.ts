export function formatSpaceSize(bytes: number): string {
	if (bytes === 0) return '0 Bytes';

	const k = 1024;
	const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

	let unitIndex = 0;
	while (bytes >= k && unitIndex < units.length - 1) {
		bytes /= k;
		unitIndex++;
	}

	const unit = units[unitIndex];

	return `${bytes} ${unit}`;
}
