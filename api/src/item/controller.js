const itemService = require("./service");
const imageService = require("../image/service");
const supabaseService = require("../supabase/service");

const ItemController = {
  async create(req, res) {
    const { newItem } = req.body;
    const covers = req.files && req.files.files ? req.files.files : [];
    const userId = req.user.sub;
    try {
      const createItemDto = JSON.parse(newItem);
      const createItem = await itemService.create(createItemDto, userId);
      if (!createItem) {
        return res.status(400).json({ message: "Pas d'item à créer" });
      }
      const imgsToSaveInDB = [];
      if (covers.length > 0) {
        for (const file of covers) {
          try {
            if (!file.buffer) {
              throw new Error(
                "File buffer is missing. Please check your Multer configuration."
              );
            }
            const result = await supabaseService.uploadImage(file, userId);
            imgsToSaveInDB.push({
              itemId: createItem.id,
              url: result.publicUrl,
              publicId: result.filePath,
              userId,
              isCover: covers.indexOf(file) === 0,
            });
          } catch (error) {
            console.log(error);
            throw error;
          }
        }

        if (imgsToSaveInDB.length > 0) {
          await imageService.createMany(imgsToSaveInDB);
        }
        return res
          .status(201)
          .json({ message: "Item créé avec succès", createItem });
      }
    } catch (error) {
      console.error("Erreur dans create:", error);
      return res
        .status(500)
        .json({ message: "Erreur lors de la création de l'item" });
    }
  },

  async getAllItems(req, res) {
    console.log("coucou");
    
    try {
      const response = await itemService.findAll();
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Erreur lors de la récupération des items" });
    }
  },

  async findAllCreatedItemsByUser(req, res) {
    try {
      const userId = req.user.sub;
      const response = await itemService.findAllCreatedItemsByUser(userId);
      return res.json(response);
    } catch (error) {
      console.error("Erreur dans findAllCreatedItemsByUser:", error);
      return res.status(500).json({
        message: "Erreur lors de la récupération des items de l'utilisateur",
      });
    }
  },

  async findOne(req, res) {
    const itemId = req.params.id;
    try {
      const item = await itemService.findOne(itemId);
      return res.status(200).json({ item });
    } catch (error) {
      console.error("Erreur dans findOne:", error);
      return res
        .status(500)
        .json({ message: "Erreur lors de la récupération de l'item" });
    }
  },

  async update(req, res) {
    try {
      console.log(req.body);

      const userId = req.user.sub;
      const itemId = req.params.id;
      const result = await itemService.update(itemId, userId, req.body);
      if (typeof result === "string") {
        return res.status(400).json({ message: result });
      }
      return res.status(200).json({ message: "Objet modifié avec succès." });
    } catch (error) {
      console.error("Erreur dans le contrôleur update :", error);

      return res.status(500).json({
        message:
          error.message ||
          "Une erreur serveur est survenue lors de la modification.",
      });
    }
  },
  async delete(req, res) {
    try {
      const userId = req.user.sub;
      const itemId = req.params.id;

      const result = await itemService.delete(itemId, userId);

      if (typeof result === "string") {
        return res.status(400).json({ message: result });
      }
      return res.status(200).json({ message: "Objet supprimé avec succès." });
    } catch (error) {
      console.error("Erreur dans le contrôleur delete :", error);

      return res.status(500).json({
        message:
          error.message ||
          "Une erreur serveur est survenue lors de la suppression.",
      });
    }
  },
};

module.exports = ItemController;
