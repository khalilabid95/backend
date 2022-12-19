const Item = require('../models/Item');
const itemValidator = require('../utilities/validator');

const createItem = async (req,res)=>{
    try {
        const validationResult = itemValidator.validate(req.body,{abortEarly:false})
        if(validationResult.error){
            res.status(400).json({validationResult})
        }
        else{
            const item = new Item({
                title: req.body.title,
                description: req.body.description,
                photos: req.body.photos,
                categorie: req.body.categorie,
                articles: req.body.articles,
                price: req.body.price,
                user: req.user._id
            })
            await item.save()
            res.status(201).json({message: "Item created successffully"})
        }
    } catch (error) {
        res.status(500).json({ error: error.message })

    }
}
const getAllnewestItems = async (req,res) =>{
    try {
        const items = await Item.find().sort({ createdAt: -1 });
        res.status(200).json(items)
        
    } catch (error) {
       res.status(500).json({error: error.message}) 
    }
}

const getAllItemsBytitle = async (req,res) =>{
    try {
        const items = Item.find().sort({ title: 1 })
        res.send(items);
    } catch (error) {
        res.status(500).json({error: error.message}) 
    }
    
    
        // Return the sorted items to the client
        
}

const getAllItems = async (req,res) =>{
    let randomInt = Math.floor(Math.random()  + 1);
    if(randomInt === 1)
    {
        getAllItemsBytitle(req,res)
    }
    else{
        getAllnewestItems(req,res)
    }
}
const getOneItem = async (req,res) =>{
    const itemId = req.params.id
    try {
        const item = await Item.findById(itemId)
        if(item)
        {
            res.status(200).json(item)
        }
        else
        {
            res.status(404).json({message: "Item not found"})
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getItemsByUserId = async (req,res) =>{
    const userId = req.params.id
    try {
        const items = await Item.find({ user: userId });
        res.status(200).json(items)
        
    } catch (error) {
       res.status(500).json({error: error.message}) 
    }
}

const updateItem = async (req,res)=>{
    try {
        const item = await Item.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, { $set: req.body })
        if(!item){
            res.status(404).json({message: "item not found"})
        }
        else{
            res.status(200).json({message: "item is updated"})
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteItem = async (req,res)=>{
    try {
        const item = await Item.findByIdAndDelete(req.params.id)
        if(item){
            res.status(201).json({message : "item deleted"})
        }
        else{
            res.status(404).json({message: "item not found"})
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    getItemsByUserId,
    getOneItem,
    getAllItemsBytitle,
    createItem,
    getAllnewestItems,
    deleteItem,
    updateItem,
    getAllItems
}