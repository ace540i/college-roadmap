import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IStep {
  order: number;
  text:  string;
}

export interface ITask {
  taskId:      string;
  title:       string;
  description?: string;
  order?:      number;
  steps:       IStep[];
}

export interface IMilestoneCatalog extends Document {
  grade:       number;
  title:       string;
  description?: string;
  order?:      number;
  tasks:       ITask[];
}

const StepSchema = new Schema<IStep>(
  { order: Number, text: String },
  { _id: false }
);

const TaskSchema = new Schema<ITask>(
  {
    taskId:      { type: String, required: true },
    title:       { type: String, required: true },
    description: { type: String },
    order:       { type: Number },
    steps:       [StepSchema],
  },
  { _id: false }
);

const MilestoneCatalogSchema = new Schema<IMilestoneCatalog>({
  grade:       { type: Number, required: true, index: true },
  title:       { type: String, required: true },
  description: { type: String },
  order:       { type: Number },
  tasks:       [TaskSchema],
});

// Cosmos DB requires an index on any field used in sort()
MilestoneCatalogSchema.index({ grade: 1, order: 1 });

const MilestoneCatalog: Model<IMilestoneCatalog> = mongoose.model<IMilestoneCatalog>(
  'MilestoneCatalog',
  MilestoneCatalogSchema
);
export default MilestoneCatalog;
