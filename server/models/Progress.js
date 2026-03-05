'use strict';

const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  studentId:      { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true, index: true },
  taskId:         { type: String, required: true },
  grade:          { type: Number },
  milestoneTitle: { type: String },
  taskTitle:      { type: String },
  completed:      { type: Boolean, default: false },
  completedAt:    { type: Date },
  notes:          { type: String },
});

ProgressSchema.index({ studentId: 1, taskId: 1 }, { unique: true });

module.exports = mongoose.model('Progress', ProgressSchema);
