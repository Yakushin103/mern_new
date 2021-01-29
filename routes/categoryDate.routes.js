const { Router } = require('express')
// const config = require('config')
const moment = require('moment')
const shortid = require('shortid')
const CategoryDate = require('../models/CategoryDate')
const StaticForDay = require('../models/StaticForDay')
const auth = require('../middleware/auth.middleware')
const router = Router()

// add new category data

const sumAllData = (name, arr) => {
    return arr.length ? arr.reduce((acc, item) => acc + item[name], 0) : 0
}

const sumAllPlus = (name, arr) => {
    return arr.filter(item => item.plus === name)
}

router.post('/add', auth, async (req, res) => {
    try {
        const { date, time, bet, coef, plus, sum, categoryId } = req.body

        const code = shortid.generate()

        const categoryDate = new CategoryDate({
            date, time, bet, coef, plus, sum, owner: req.user.userId, categoryId, code
        })

        await categoryDate.save()

        // =========

        // const categoryesData = await CategoryDate.find({ owner: req.user.userId })

        // const dayFilter = moment().startOf('day', date).format("MMM Do YY")

        // const categoryesDataFilter = categoryesData.filter((item) => {
        //     let today = item.date

        //     if (dayFilter === moment(today).format("MMM Do YY")) {
        //         return item
        //     }
        // })

        // const codeStatic = shortid.generate()
        // const totalAmount = sumAllData('sum', categoryesDataFilter)
        // const totalPos = sumAllPlus('Pos', categoryesDataFilter).length
        // const totalNeg = sumAllPlus('Neg', categoryesDataFilter).length
        // const totalSmo = sumAllPlus('Smo', categoryesDataFilter).length
        // const totalBets = categoryesDataFilter.length

        // const existing = await StaticForDay.findOne({ date: dayFilter })

        // if (existing) {
        //     console.log('1111', existing)
        //     const updateDate = await existing.updateMany({
        //         totalPos, totalNeg, totalSmo, totalBets
        //     })
        // } else {
        //     const staticForDay = new StaticForDay({
        //         codeStatic, owner: req.user.userId, categoryId, totalAmount, date: dayFilter, totalPos, totalNeg, totalSmo, totalBets
        //     })

        //     await staticForDay.save()
        // }

        // console.log('staticForDay', staticForDay)

        // ========

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

            if (startDayFilter === moment(today).format("MMM Do YY")) {
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