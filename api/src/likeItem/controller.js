const likeItemService = require("./service");

const likeItemController = {
  async getAllUserFavoritesItems(req, res) {
    try {
      const userId = req.user.sub;
      const response = await likeItemService.getAllUserFavoritesItems(userId);

      return res.status(200).json(response);
    } catch (error) {
      console.error("Erreur dans getAllUserFavoritesItems:", error);
      throw error;
    }
  },
  async deleteItemFromFavorites (req,res) {
    try {
      const userId = req.user.sub;
      const itemId = req.params.itemId;
      const response = await likeItemService.deleteItemFromFavorites(itemId, userId);

      return res.status(200).json(response);
    } catch (error) {
      console.error("Erreur dans getAllUserFavoritesItems:", error);
      throw error;
    }
  }
};

module.exports = likeItemController;
