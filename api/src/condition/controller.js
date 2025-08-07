const conditionService = require("./service");

const conditionController = {
  async findAll(req, res) {
    try {
      const conditions = await conditionService.findAll();
      if (!conditions) {
        return res.status(404).json({ message: "Conditiosn  introuvables" });
      }
      return res.status(200).json({
        conditions,
      });
    } catch (error) {
      
    }
  },
};

module.exports = conditionController;
