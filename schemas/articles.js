const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var Comment = new Schema();

Comment.add({
  title: {
    type: String,
    index: true
  },
  date: { type: Date, default: Date.now },
  body: String,
  comments: [Comment]
});

const articleSchema = new Schema({
  title: {
    type: String,
    index: true
  },
  author: String,
  body:   String,
  comments: [Comment],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: { type: Number, default: 0 },
    favs:  { type: Number, default: 0 }
  }
});

// search by id
articleSchema.statics.findById = function (id, cb) {
  return this.find({ _id: id }, {__v: 0}, cb); // exclude two fields: _id and __v
};
// search by title
articleSchema.statics.findByTitle = function (title, cb) {
  return this.find({ title: new RegExp(title, 'i') }, cb);
};

// date format
articleSchema.virtual('createDate').get(function () {
  return Date.parse(this.date.toLocaleString())
})

// setting toJSON and toObject
articleSchema.set('toJSON', { getters: true, virtuals: true });
articleSchema.set('toObject', { getters: true });

const Article = mongoose.model('Articles', articleSchema)

module.exports = Article