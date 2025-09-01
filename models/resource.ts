import mongoose, { Schema, models } from "mongoose";

const ResourceSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String },
    category: { type: String },
    type: { type: String, default: "document" },
    tags: { type: String },
    author: { type: String },
    language: { type: String },
    difficulty: { type: String },
    estimatedReadTime: { type: String },
    downloadUrl: { type: String },
    externalUrl: { type: String },
    coverUrl: { type: String }, // stored as /uploads/<filename>
    fileUrl: { type: String },  // stored as /uploads/<filename>
    status: { type: String, default: "Draft" },
    featured: { type: Boolean, default: false },
    allowDownload: { type: Boolean, default: true },
    requiresLogin: { type: Boolean, default: false },
    metaTitle: { type: String },
    metaDescription: { type: String },
    metaKeywords: { type: String },
  },
  { timestamps: true }
);

const Resource = models.Resource || mongoose.model("Resource", ResourceSchema);

export default Resource;
