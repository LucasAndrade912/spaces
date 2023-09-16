import { File } from 'buffer';

export interface StorageService {
	upload: (path: string, files: Array<File | Buffer>) => Promise<{ errors: string[] }>;
}
