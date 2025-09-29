import mongoose, { Document, Schema } from 'mongoose';

// Define the document interface for type safety
export interface ITutorApplication extends Document {
  name;
  email;
  phone;
  qualifications;
  bio;
  location;
  courses[];
  status: 'pending' | 'approved' | 'rejected';
}

const TutorApplicationSchema: Schema = new Schema(
  {
    name: { type, required: true },
    email: { type, required: true, unique: true },
    phone: { type, required: true },
    qualifications: { type, required: true },
    bio: { type, required: true },
    location: { type, required: true },
    courses: { type: [String], required: true },
    status: {
      type,
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
