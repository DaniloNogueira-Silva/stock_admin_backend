import { Injectable } from '@nestjs/common';
import { FileDTO } from './uploads.dto';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class UploadService {
    async upload(file: FileDTO) {
        const supabaseURL = process.env.SUPABASE_URL;
        const supabaseKEY = process.env.SUPABASE_KEY;

        const supabase = createClient(supabaseURL, supabaseKEY, {
            auth: {
                persistSession: false,
            },
        });
        const { data, error } = await supabase.storage
            .from('photos')
            .upload(file.originalname, file.buffer, {
                upsert: true,
            });

        if (error) {
            throw new Error(`Upload failed: ${error.message}`);
        }

        if (data) {
            const url = supabase.storage
                .from('photos')
                .getPublicUrl(file.originalname);

            return { image: url.data.publicUrl };
        }

    }
}
