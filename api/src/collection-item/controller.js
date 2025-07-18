const collectionItemService = require("./service");

const collectionItemController = {
  async create(req, res) {
    const userId = req.user.sub;

    const datas = { ...req.body, userId };

    try {
      const collectionItemAdded = await collectionItemService.create(datas);

      return res.status(200).json({
        collectionItemAdded,
      });
    } catch (error) {
      console.log(error);
    }
  },

  async findOne(req, res) {
    const itemId = req.params.id;
    try {
      const item = await collectionItemService.findOne(itemId);
      return res.status(200).json({
        message: "Item founded",
        item,
      });
    } catch (error) {
      console.log(error);
    }
  },

  async delete(req, res) {

    try {
      const userId = req.user.sub;
      const collectionItemId = req.params.id;
      const deletedItem = await collectionItemService.delete(
        collectionItemId,
        userId
      );

      
      return res
        .status(200)
        .json({ message: "element supprimé de la collection" });
    } catch (error) {}
  },
};

module.exports = collectionItemController;
