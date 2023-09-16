import { File } from 'buffer';

import { supabase } from '@/lib/supabase';
import { StorageService } from '@/contracts/storageService';

export class SupabaseStorageService implements StorageService {
	async upload(path: string, files: Array<File | Buffer>): Promise<{ errors: string[] }> {
		const promises = files.map(file => supabase.storage.from('space-files').upload(path, file));
		const results = await Promise.all(promises);

		const errors = results.filter(result => !!result.error).map(({ error }) => error!.message);

		return { errors };
	}
}
