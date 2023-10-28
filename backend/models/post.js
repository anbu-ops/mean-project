const mongoose = require('mongoose');
// we use mongoose to use schema in mongoDB
const postSchema = mongoose.Schema({
    title: {type: 'string',required: true},
    content: {type: 'string',required: true},
    // author: {type:'string',required: true},
    // date: {type: 'date',required: true},
});

module.exports = mongoose.model('Post', postSchema);