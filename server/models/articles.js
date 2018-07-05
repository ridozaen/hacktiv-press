const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = Schema({
    title: {type: String, required: true},
    imageUrl: {type: String},
    content: {type: String, required: true},
    category: {type: String, required: true},
    userId : {type: Schema.Types.ObjectId, ref: 'User'}
},{
    timestamps : true
});

module.exports = mongoose.model('Article', articleSchema);