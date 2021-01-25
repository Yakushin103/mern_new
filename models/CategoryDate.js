const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    categoryId: { type: Types.ObjectId, ref: 'Category' },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    bet: { type: Number, required: true },
    coef: { type: Number, required: true },
    plus: { type: String, required: true },
    sum: { type: Number, required: true },
    owner: { type: Types.ObjectId, ref: 'User' }
})

module.exports = model('CategoryDate', schema)