const { Router } = require('express')
// const config = require('config')
const moment = require('moment')
const shortid = require('shortid')
const CategoryDate = require('../models/CategoryDate')
const auth = require('../middleware/auth.middleware')
const router = Router()

// add new category data

router.post('/add', auth, async (req, res) => {
    try {
        const { date, time, bet, coef, plus, sum, categoryId } = req.body

        const code = shortid.generate()

        const categoryDate = new CategoryDate({
            date, time, bet, coef, plus, sum, owner: req.user.userId, categoryId, code
        })

        await categoryDate.save()

        res.status(201).json({ categoryDate })
    } catch (e) {
        res.status(500).json({ message: 'Что то пошло не так, попробуйте снова' })
    }
})

router.get('/all', auth, async (req, res) => {
    try {
        const categoryesData = await CategoryDate.find({ owner: req.user.userId })
        res.json(categoryesData)
    } catch (e) {
        res.status(500).json({ message: 'Что то пошло не так, попробуйте снова' })
    }
})

router.get(`/all/filter`, auth, async (req, res) => {
    try {

        const dayFilter = req.query.filter

        if (!dayFilter) {
            return res.json({ name: dayFilter })
        }

        const startDayFilter = moment().startOf('day', dayFilter).format("MMM Do YY")

        const categoryesData = await CategoryDate.find({ owner: req.user.userId })

        const categoryesDataFilter = categoryesData.filter((item) => {
            let today = item.date

            if ( startDayFilter === moment(today).format("MMM Do YY") ) {
                return item
            }
        })

        const sortedDate = categoryesDataFilter.sort((a, b) => b.date > a.date ? 1 : -1)

        res.json(sortedDate)
    } catch (e) {
        res.status(500).json({ message: 'Что то пошло не так, попробуйте снова' })
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {

        const _id = req.params.id

        const existing = await CategoryDate.findOne({ _id })

        if (!existing) {
            return res.json({ name: _id })
        }

        const categoryDate = await CategoryDate.deleteOne({ _id })

        res.status(201).json({ categoryDate })
    } catch (e) {
        res.status(500).json({ message: 'Что то пошло не так, попробуйте снова' })
    }
})

router.put('/edit', auth, async (req, res) => {
    try {
        const { date, time, bet, coef, plus, sum, _id } = req.body

        console.log('1111', date, time, bet, coef, plus, sum, _id)

        const existing = await CategoryDate.findOne({ _id })

        if (!existing) {
            return res.json({ name: _id })
        }

        const updateDate = await existing.updateOne({
            date, time, bet, coef, plus, sum
        })

        res.status(201).json({ updateDate })
    } catch (e) {
        res.status(500).json({ message: 'Что то пошло не так, попробуйте снова' })
    }
})

module.exports = router