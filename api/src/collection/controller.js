const collectionService = require("./service");
const imageService = require("../image/service");
const cloudinaryUtils = require("../cloudinary");
const fs = require("fs").promises;
const CollectionController = {
  //   async create(req, res) {
  //     try {
  //       const newCollection = req.body.newCollection;
  //       const covers = req.files && req.files.files ? req.files.files : [];
  // console.log("covers", covers);

  //       if (!newCollection) {
  //         throw new Error("no data for create new collection");
  //       }
  //       const createCollectionDto = JSON.parse(newCollection);
  //       if (!createCollectionDto.title) {
  //         return res
  //           .status(400)
  //           .json({ message: "title et description sont obligatoires" });
  //       }

  //       const userId = req.user.sub;
  //       if (!userId) {
  //         return res.status(401).json({ message: "Utilisateur non authentifié" });
  //       }
  //       const createCollection = await collectionService.create(
  //         createCollectionDto,
  //         userId
  //       );
  //       const imagesData = covers.map((file, index) => ({
  //         url: `/uploads/${file.filename.replace(/ /g, "_")}`,
  //         collectionId: createCollection.id,
  //         userId,
  //         isCover: index === 0,
  //       }));

  //       for (const file of covers) {
  //         try {
  //             // 1. Lire le contenu du fichier depuis son chemin
  //             const fileBuffer = await fs.readFile(file.path); // file.path contient le chemin local

  //             // 2. Récupérer le mimetype
  //             const mimetype = file.mimetype;

  //             // 3. Appeler la fonction d'upload avec le buffer et le mimetype
  //             const uploadResult = await cloudinaryUtils.uploadToCloudinaryDirect(fileBuffer, mimetype);

  //             // Si l'upload réussit, vous pouvez utiliser uploadResult.url (URL publique de l'image sur Cloudinary)
  //             // et mettre à jour votre `imagesData` ou votre base de données si nécessaire.
  //             console.log(`Fichier ${file.originalname} uploadé avec succès sur Cloudinary:`, uploadResult.url);

  //             // Optionnel: Supprimer le fichier local après l'upload si vous ne le gardez pas
  //             // await fs.unlink(file.path);

  //         } catch (error) {
  //             console.error(`Erreur lors de l'upload de ${file.originalname} :`, error);
  //             // Gérer l'erreur, par exemple, ne pas continuer si un upload échoue
  //         }
  //     }

  //       if (imagesData.length > 0) {
  //         await imageService.createMany(imagesData);
  //       }
  //       return res
  //         .status(201)
  //         .json({ message: "Collection créée avec succès", createCollection });
  //     } catch (error) {
  //       console.log(error);
  //       return res.status(500).json({ message: "Erreur interne du serveur" });
  //     }
  //   },

  async create(req, res) {
    try {
      const newCollection = req.body.newCollection;
      const covers = req.files && req.files.files ? req.files.files : [];
      console.log("covers", covers);

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

      // 1. Créez la collection en premier
      const createCollection = await collectionService.create(
        createCollectionDto,
        userId
      );

      // 2. Initialisez un tableau pour stocker les données d'image pour la base de données
      const imagesToSaveInDb = [];

      // 3. Bouclez sur les fichiers pour l'upload et la collecte des données
      for (const file of covers) {
        try {
          const fileBuffer = await fs.readFile(file.path);
          const mimetype = file.mimetype;

          const uploadResult = await cloudinaryUtils.uploadToCloudinaryDirect(
            fileBuffer,
            mimetype
          );

          // Vérifiez si l'upload Cloudinary a réussi et contient les données nécessaires
          if (
            uploadResult &&
            uploadResult.secure_url &&
            uploadResult.public_id
          ) {
            console.log(
              `Fichier ${file.originalname} uploadé avec succès sur Cloudinary:`,
              uploadResult.secure_url
            );

            // Ajoutez les informations de l'image Cloudinary au tableau pour la DB
            imagesToSaveInDb.push({
              url: uploadResult.secure_url, // L'URL HTTPS de l'image sur Cloudinary
              publicId: uploadResult.public_id, // L'identifiant unique Cloudinary pour la gestion future
              collectionId: createCollection.id, // L'ID de la collection nouvellement créée
              userId: userId,
              isCover: covers.indexOf(file) === 0, // Indique si c'est l'image de couverture (la première du tableau `covers`)
            });

            // Supprimez le fichier temporaire local après un upload réussi
            await fs.unlink(file.path);
          } else {
            console.error(
              `L'upload de ${file.originalname} vers Cloudinary a échoué ou n'a pas retourné les données attendues.`
            );
            // Vous pouvez choisir de relancer une erreur ici ou de continuer sans cette image
          }
        } catch (error) {
          console.error(
            `Erreur lors du traitement de l'upload pour ${file.originalname} :`,
            error
          );
          // Cette erreur peut provenir de fs.readFile ou d'une erreur inattendue de cloudinaryUtils
        }
      }

      // 4. Une fois tous les uploads tentés, enregistrez les images réussies dans la base de données
      if (imagesToSaveInDb.length > 0) {
        await imageService.createMany(imagesToSaveInDb);
      }

      // 5. Retournez la réponse finale
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
      // Gérer les différents types d'erreurs ici, par exemple:
      // if (error.message === "no data for create new collection") { /* ... */ }
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
      // @ts-ignore

      return res.status(200).json({
        message: "Collection founded",
        result,
      });
    } catch (error) {
      console.log(error);
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
