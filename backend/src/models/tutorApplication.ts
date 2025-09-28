import mongoose, { Document, Schema } from 'mongoose';

// Define the document interface for type safety
export interface ITutorApplication extends Document {
  name: string;
  email: string;
  phone: string;
  qualifications: string;
  bio: string;
  location: string;
  courses: string[];
  status: 'pending' | 'approved' | 'rejected';
}

const TutorApplicationSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    qualifications: { type: String, required: true },
    bio: { type: String, required: true },
    location: { type: String, required: true },
    courses: { type: [String], required: true },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true, // This adds createdAt and updatedAt fields
  },
);

export const TutorApplication = mongoose.model<ITutorApplication>(
  'TutorApplication',
  TutorApplicationSchema,
);
