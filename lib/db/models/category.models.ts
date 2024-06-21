import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICategory extends Document {
  name: string;
}

const CategorySchema: Schema<ICategory> = new Schema({
  name: { type: String, required: true, unique: true },
});

const Category: Model<ICategory> = mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);

export default Category;
