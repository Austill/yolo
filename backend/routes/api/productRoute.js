const express = require('express');
const router = express.Router();
const Product = require('../../models/Products');

// @route GET /products
// @desc Get ALL products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route POST /products
// @desc Create a product
router.post('/', async (req, res) => {
  try {
    const newProduct = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error saving product:', error);
    res.status(400).json({ error: 'Bad request' });
  }
});

// @route PUT /products/:id
// @desc Update a product
router.put('/:id', async (req, res) => {
  try {
    const update = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
      photo: req.body.photo
    };

    const result = await Product.updateOne({ _id: req.params.id }, update, { upsert: true });
    res.json({ success: true, result });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(400).json({ success: false, error: 'Update failed' });
  }
});

// @route DELETE /products/:id
// @desc Delete a product
router.delete('/:id', async (req, res) => {
  try {
    await Product.deleteOne({ _id: req.params.id });
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(400).json({ success: false });
  }
});

module.exports = router;
