const itemService = require("./service");
const imageService = require("../image/service");
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

      const imagesData = covers.map((file, index) => ({
        url: `/uploads/${file.filename.replace(/ /g, "_")}`,
        itemId: createItem.id,
        userId,
        isCover: index === 0,
      }));


      if (imagesData.length > 0) {
        await imageService.createMany(imagesData);
      }
      return res
        .status(201)
        .json({ message: "Item créé avec succès", createItem });
    } catch (error) {
      console.log(error);
    }
  },

  async getAllItems(req, res) {
    const response = await itemService.findAll();

    return res.status(200).json(response);
  },
  async findAllCreatedItemsByUser(res, req) {
    const userId = req.user.sub;
    const response = await itemService.findAllCreatedItemsByUser(userId);
    return res.json(response);
  },

  async findOne(req, res) {
    const itemId = req.params.id;
    try {
      const item = await itemService.findOne(itemId);
      return res.status(200).json({ item });
    } catch (error) {}
  },
  async delete(req, res) {
    try {
        const userId = req.user.sub;
        const itemId = req.params.id;

        const result = await itemService.delete(itemId, userId);

        
        if (typeof result === 'string') {
            return res.status(400).json({ message: result });
        }
        return res.status(200).json({ message: "Objet supprimé avec succès." });

    } catch (error) {
     
        console.error("Erreur dans le contrôleur delete :", error);
       
        return res.status(500).json({ message: error.message || "Une erreur serveur est survenue lors de la suppression." });
    }
}
};

module.exports = ItemController;
