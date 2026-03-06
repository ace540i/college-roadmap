import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IProgress extends Document {
  studentId:      Types.ObjectId;
  taskId:         string;
  grade?:         number;
  milestoneTitle?: string;
  taskTitle?:     string;
  completed:      boolean;
  completedAt?:   Date;
  notes?:         string;
}

const ProgressSchema = new Schema<IProgress>({
  studentId:      { type: Schema.Types.ObjectId, ref: 'Student', required: true, index: true },
  taskId:         { type: String, required: true },
  grade:          { type: Number },
  milestoneTitle: { type: String },
  taskTitle:      { type: String },
  completed:      { type: Boolean, default: false },
  completedAt:    { type: Date },
  notes:          { type: String },
});

ProgressSchema.index({ studentId: 1, taskId: 1 }, { unique: true });

const Progress: Model<IProgress> = mongoose.model<IProgress>('Progress', ProgressSchema);
export default Progress;
