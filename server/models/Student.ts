import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IStudent extends Document {
  userId:      string;
  displayName?: string;
  email?:      string;
  firstName?:  string;
  middleName?: string;
  lastName?:   string;
  state?:      string;
  grade:       number;
  createdAt:   Date;
  updatedAt:   Date;
}

const StudentSchema = new Schema<IStudent>({
  userId:      { type: String, required: true, unique: true, index: true },
  displayName: { type: String },
  email:       { type: String },
  firstName:   { type: String },
  middleName:  { type: String },
  lastName:    { type: String },
  state:       { type: String },
  grade:       { type: Number, default: 9, min: 9, max: 12 },
  createdAt:   { type: Date, default: Date.now },
  updatedAt:   { type: Date, default: Date.now },
});

const Student: Model<IStudent> = mongoose.model<IStudent>('Student', StudentSchema);
export default Student;
