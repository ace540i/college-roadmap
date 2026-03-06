'use strict';

const mongoose = require('mongoose');

const StepSchema = new mongoose.Schema(
  { order: Number, text: String },
  { _id: false }
);

const TaskSchema = new mongoose.Schema(
  {
    taskId:      { type: String, required: true }, // e.g. "9-1-1"
    title:       { type: String, required: true },
    description: { type: String },
    order:       { type: Number },
    steps:       [StepSchema],
  },
  { _id: false }
);

const MilestoneCatalogSchema = new mongoose.Schema({
  grade:       { type: Number, required: true, index: true },
  title:       { type: String, required: true },
  description: { type: String },
  order:       { type: Number },
  tasks:       [TaskSchema],
});

// Cosmos DB requires an index on any field used in sort()
MilestoneCatalogSchema.index({ grade: 1, order: 1 });

module.exports = mongoose.model('MilestoneCatalog', MilestoneCatalogSchema);
