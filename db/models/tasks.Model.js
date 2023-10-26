const mongoose = require("mongoose");
// const ShortUniqueId = require('short-unique-id');

// const uid = new ShortUniqueId({ length: 10 });

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const taskSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  creator: {type: ObjectId, ref: 'User'},
  state: {type: String, enum: ['pending', 'completed', 'deleted'], default: 'pending'},
  deleted: {type: Boolean, default: false},
  timestamp: {type: Date, default: Date.now}
});

const TaskModel = mongoose.model('Task', taskSchema);


module.exports = TaskModel;