const Product = require("../model/ProductSchema");
module.exports.POST_Products = async (req, res) => {
  const { title, price, desc, imgurl, imgName } = req.body;
  try {
    new Product({
      title,
      desc,
      price,
      imgurl,
      imgName,
    }).save((er, doc) => {
      console.log(doc);
    });
  } catch (err) {
    console.log(err);
  }
  res.send("done");
};
module.exports.GET_product = async (req, res) => {
  const products = await Product.find();

  res.send(products);
};
module.exports.Delete_Products = async (req, res) => {
  const { id } = req.body;

  await Product.deleteOne({ _id: id }, (err, doc) => {
    if (err) return res.state(404).send(false);
    res.status(201).send("success");
    console.log(doc);
  });
};
