const express = require('express');
const router = new express.Router();
const ExpressError = require('../expressErrors');
const items = require('../fakeDb')

// Get the list
router.get('/', function (req, res) {
  res.json({ items })
})

// Add a new item 
router.post('/', function (req, res, next) {
  try {
    if(!req.body.name) throw new ExpressError('Name is required', 400)
    const { name, price } = req.body;
    const newItem = { name, price };
    items.push(newItem);
    return res.status(201).json({ added: newItem });
  } catch (e) {
    return next(e)
  }
})

// DIsplay a single item
router.get('/:name', function (req, res) {
  const foundItem = items.find(item => item.name === req.params.name)
  if (!foundItem) {
    throw new ExpressError('Item not found', 404)
  }
  res.json({ items: foundItem })
})

// Update an Item 
router.patch('/:name', function (req, res) {
  const foundItem = items.find(item => item.name === req.params.name)
  if (!foundItem) {
    throw new ExpressError('Item not found', 404)
  }
  foundItem.name = req.body.name || foundItem.name
  foundItem.price = req.body.price || foundItem.price
  res.json({ items: foundItem })
})

// Delete an Item
router.delete('/:name', function (req, res) {
  const foundItem = items.findIndex(item => item.name === req.params.name)
  if (foundItem === -1) {
    throw new ExpressError('Item not found', 404)
  }
  items.splice(foundItem, 1)
  res.json({ message: 'Deleted'})
})

module.exports = router;






















