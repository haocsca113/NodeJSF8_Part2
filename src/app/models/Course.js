const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
// const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    _id: { type: Number },
    name: { type: String, required: true },
    description: { type: String},
    image: { type: String},
    videoId: { type: String, required: true },
    level: { type: String },
    slug: { type: String, slug: 'name', unique: true },
  }, {
    _id: false,
    timestamps: true,
});

// Custom query helpers
courseSchema.query.sortable = function (req) {
  if(req.query.hasOwnProperty('_sort')) {
    const isValidtype = ['asc', 'desc'].includes(req.query.type);
    return this.sort({
        [req.query.column]: isValidtype ? req.query.type : 'desc',
    });
  }
  return this;
}

// Add plugin
mongoose.plugin(slug);

// courseSchema.plugin(AutoIncrement);
courseSchema.plugin(mongooseDelete, { 
  overrideMethods: 'all',
  deletedAt : true
});

module.exports = mongoose.model('Course', courseSchema); // (models name, Schema name)   