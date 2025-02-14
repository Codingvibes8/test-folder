import mongoose, { Schema } from "mongoose"




// Create the schema
const ProductSchema = new Schema(
  {
    name: { type: String, required: true, index: true },
    description: { type: String, required: true },
    category: { type: String, required: true, index: true },
    price: { type: Number, required: true, index: true },
    image: { type: String, required: true },
    inStock: { type: Boolean, default: true },
    tags: [{ type: String, index: true }],
  },
  {
    timestamps: true, 
  },
)

// Create and export the model
export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema)

