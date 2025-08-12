const collectionService = require("./service");
require("dotenv").config();
const imageService = require("../image/service");
const supabaseService = require("../supabase/service");

const CollectionController = {
  async create(req, res) {
    try {
      const newCollection = req.body.newCollection;
      const covers = req.files && req.files.files ? req.files.files : [];

      if (!newCollection) {
        throw new Error("no data for create new collection");
      }
      const createCollectionDto = JSON.parse(newCollection);
      if (!createCollectionDto.title) {
        return res
          .status(400)
          .json({ message: "Le titre et la description sont obligatoires." });
      }

      const userId = req.user.sub;
      if (!userId) {
        return res
          .status(401)
          .json({ message: "Utilisateur non authentifié." });
      }

      const createCollection = await collectionService.create(
        createCollectionDto,
        userId
      );

      const imagesToSaveInDb = [];
      if (covers.length > 0) {
        for (const file of covers) {
          try {
            if (!file.buffer) {
              throw new Error(
                "File buffer is missing. Please check your Multer configuration."
              );
            }

            const result = await supabaseService.uploadImage(file, userId);
            
            imagesToSaveInDb.push({
              url: result.publicUrl,
              publicId: result.filePath,
              collectionId: createCollection.id,
              userId: userId,
              isCover: covers.indexOf(file) === 0,
            });
          } catch (error) {
            console.log(error);
            throw error;
          }
        }
      }
      if (imagesToSaveInDb.length > 0) {
        await imageService.createMany(imagesToSaveInDb);
      }
      return res.status(201).json({
        message: "Collection créée avec succès",
        collection: createCollection,
        images: imagesToSaveInDb.map((img) => ({
          url: img.url,
          publicId: img.publicId,
        })),
      });
    } catch (error) {
      console.error(
        "Erreur interne du serveur lors de la création de la collection:",
        error
      );

      return res.status(500).json({ message: "Erreur interne du serveur." });
    }
  },

  async findAll(req, res) {
    if (!req.user) {
      const result = await collectionService.findAll();
      // @ts-ignore
      return res.json({ message: "Collections publiques récupérées", result });
    }
    const userId = req.user.sub;
    const result = await collectionService.findAllUserCollection(userId);

    // @ts-ignore
    return res.json({ message: "Collection founded", result });
  },

  async findAllUserCollection(req, res) {
    const userId = req.user.sub;

    const result = await collectionService.findAllUserCollection(userId);

    return res.status(200).json({ message: "User collection founded", result });
  },

  async findOne(req, res) {
    try {
      const collectionId = req.params.id;

      const result = await collectionService.findOne(collectionId);

      console.log(result);

      if (!result) {
        return res.status(404).json({ message: "Collection non trouvée." });
      }

      return res.status(200).json({
        message: "Collection founded",
        result,
      });
    } catch (error) {
      console.error("Erreur dans findOne:", error);
      return res.status(500).json({ message: "Erreur lors de la récupération de la collection" });
    }
  },

  async addItemsToCollection(req, res) {
    const collectionId = req.params.id;
    const data = req.body;
    try {
      const userId = req.user.sub;
      if (!userId) {
        return res.status(401).json({ message: "Utilisateur non authentifié" });
      }
      const result = await collectionService.addItemsToCollection(
        collectionId,
        data,
        userId
      );
      return res
        .status(200)
        .json({ message: "Items ajoutés avec succès", result });
    } catch (error) {
      console.error(error);
      // @ts-ignore
      return res
        .status(500)
        .json({ message: "Erreur lors de l'ajout des items" });
    }
  },

  async delete(req, res) {
    const collectionId = req.params.id;
    const result = await collectionService.remove(collectionId);
    return result;
  },
};

module.exports = CollectionController;
