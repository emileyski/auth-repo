const { Schema, model } = require('mongoose');

const TokenSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    refreshToken: { type: String, required: true }
})

module.exports = model('Token', TokenSchema);