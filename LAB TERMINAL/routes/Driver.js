const express = require('express');
var Driver = require('../models/driver');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let data = await Driver.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    let id = req.params.id;
    let item = await Driver.findById(id);
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch' });
  }
});

router.post('/', async (req, res) => {
  try {
    let newItem = req.body;
    let driver = new Driver(newItem);
    let savedItem = await driver.save();
  } catch (error) {
    res.status(500).json({ error: 'Failed to create' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    let id = req.params.id;
    let updatedItem = req.body;
    let updatedDriver = await Driver.findByIdAndUpdate(id, updatedItem, { new: true });
    res.json(updatedDriver);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    let id = req.params.id;
    let result = await Driver.findByIdAndDelete(id);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete' });
  }
});

module.exports = router;
