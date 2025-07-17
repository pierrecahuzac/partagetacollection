const collectionItemService = require("./service");

const collectionItemController = {
  async create(req, res) {
    const userId = req.user.sub;
 
    
    console.log('req.body', req.body);
    
    
   const  datas = { ...req.body, userId };
    
    try {
      const collectionItemAdded = await collectionItemService.create(datas);
      
      
      return res.status(200).json({
        collectionItemAdded,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = collectionItemController;
