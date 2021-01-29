const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    categoryId: { type: Types.ObjectId, ref: 'Category' },
    date: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    totalBets: { type: Number, required: true },
    totalPos: { type: Number, required: true },
    totalNeg: { type: Number, required: true },
    totalSmo: { type: Number, required: true },
    owner: { type: Types.ObjectId, ref: 'User' }
})

module.exports = model('StaticForDay', schema)