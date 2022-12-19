const express = require('express')
const { getAllItems, getOneItem, createItem, updateItem, deleteItem } = require('../controllers/Item')





router.get('/', getAllItems)
router.get('/:id', getOneItem)
router.post('/', checkAuth, createItem)
router.put('/:id',checkAuth, updateItem)
router.delete('/:id',checkAuth, deleteItem)