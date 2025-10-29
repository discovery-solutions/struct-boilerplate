import { db, Schema } from "@/lib/mongoose";
import { FileInterface } from "@/models/file";

export * from "@/models/file";

const fileSchema = new Schema<FileInterface>({
  name: { type: String, required: true },
  openai: { type: String },
  text: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, required: false, default: null },
});

export const File = db?.models?.File || db.model<FileInterface>("File", fileSchema);
