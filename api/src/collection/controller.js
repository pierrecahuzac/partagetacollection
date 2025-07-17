const collectionService = require("./service");
const jwt = require("jsonwebtoken");
const imageService = require("../image/service");


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
          .json({ message: "title et description sont obligatoires" });
      }

      const userId = req.user.sub;
      if (!userId) {
        return res.status(401).json({ message: "Utilisateur non authentifié" });
      }
      const createCollection = await collectionService.create(
        createCollectionDto,
        userId
      );
      const imagesData = covers.map((file, index) => ({
        url: `/uploads/${file.filename.replace(/ /g, "_")}`,
        collectionId: createCollection.id,
        userId,
        isCover: index === 0,
      }));

      if (imagesData.length > 0) {
        await imageService.createMany(imagesData);
      }
      return res
        .status(201)
        .json({ message: "Collection créée avec succès", createCollection });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erreur interne du serveur" });
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
      // @ts-ignore

      return res.status(200).json({
        message: "Collection founded",
        result,
      });
    } catch (error) {
      console.log(error);
    }
  },

  async addItemsToCollection(
    collectionId,

    body,
    req,
    res
  ) {
    try {
      const userId = req.user.sub;
      if (!userId) {
        // @ts-ignore
        return res.status(401).json({ message: "Utilisateur non authentifié" });
      }
      // @ts-ignore
      const result = await collectionService.addItemsToCollection(
        collectionId,
        body,
        userId
      );
      // @ts-ignore
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

  async delete(req,res) {
    const collectionId = req.params.id
    const result = await collectionService.remove(collectionId);
    return result;
  },
};

module.exports = CollectionController;
