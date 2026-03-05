'use strict';

const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  userId:      { type: String, required: true, unique: true, index: true },
  displayName: { type: String },
  email:       { type: String },
  grade:       { type: Number, default: 9, min: 9, max: 12 },
  createdAt:   { type: Date, default: Date.now },
  updatedAt:   { type: Date, default: Date.now },
});

module.exports = mongoose.model('Student', StudentSchema);
