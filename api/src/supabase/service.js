// services/SupabaseService.js

const { createClient } = require("@supabase/supabase-js");
const { v4: uuidv4 } = require("uuid");
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const supabaseService = {
  uploadImage: async (file, userId) => {    
    
    
    const bucketName = process.env.SUPABASE_BUCKETNAME;
    const fileName = `cover-${uuidv4()}`;
    const filePath = `${userId}/${fileName}`;

    try {
     // const fileBuffer = await fs.readFile(file.path);
      const { error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        throw new Error(
          `Erreur lors de l'upload de ${file.originalname}: ${error.message}`
        );
      }

      const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);

      if (!data) {
        throw new Error(
          "Impossible de récupérer l'URL publique après l'upload."
        );
      }
 
      return {
        publicUrl: data.publicUrl,
        filePath: filePath,
      };
    } catch (error) {
      console.error(`Erreur dans SupabaseService.uploadImage:`, error);
      throw error;
    }
  },
};
module.exports = supabaseService;
