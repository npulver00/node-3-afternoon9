const swag = require("../models/swag");

module.exports = {
  search: (req, res, next) => {
    const { category } = req.query;
    console.log("cat1", category);
    if (!category) {
      res.status(200).json(swag);
    } else {
      const searchSwag = swag.filter(swag2 => {
        let lowerSwag = swag2.title.toLowerCase();
        return lowerSwag.includes(category.toLowerCase());
      });
      console.log("hunter", searchSwag);
      res.status(200).json(searchSwag);
    }
  }
};
