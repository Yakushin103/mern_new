const { Router } = require('express')
// const config = require('config')
const shortid = require('shortid')
const Category = require('../models/Category')
const auth = require('../middleware/auth.middleware')
const router = Router()

// add new category

router.post('/add', auth, async (req, res) => {
    try {
        const { name } = req.body

        const code = shortid.generate()

        const existing = await Category.findOne({ name })

        if (existing) {
            return res.json({ name: existing })
        }

        const category = new Category({
            code, name, owner: req.user.userId
        })

        await category.save()

        res.status(201).json({ category })
    } catch (e) {
        res.status(500).json({ message: 'Что то пошло не так, попробуйте снова' })
    }
})

router.get('/all', auth, async (req, res) => {
    try {
        const categoryes = await Category.find({ owner: req.user.userId })
        res.json(categoryes)
    } catch (e) {
        console.log('2222')
        res.status(500).json({ message: 'Что то пошло не так, попробуйте снова' })
    }
})

module.exports = router