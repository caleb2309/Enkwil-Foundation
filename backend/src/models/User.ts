import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

// Define the document interface for type safety
export interface IUser extends Document {
  name;
  email;
  password?;
  role: 'student' | 'tutor' | 'admin';
  tutorProfile?: Schema.Types.ObjectId;
}

const UserSchema: Schema = new Schema(
  {
    name: { type, required: true },
    email: { type, required: true, unique: true },
    password: { type, required: true },
    role: {
      type,
      enum: ['student', 'tutor', 'admin'],
      required: true,
    },
    // This field links a 'tutor' user to their detailed profile data in the TutorApplication collection
    tutorProfile: {
      type: Schema.Types.ObjectId,
      ref: 'TutorApplication',
      required: function (this: IUser) {
        return this.role === 'tutor';
      },
    },
  },
  {
    timestamps: true,
  },
);

// Mongoose pre-save hook to hash the password before saving
UserSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified or is new
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password! as string, salt);
  next();
});

export const User = mongoose.model<IUser>('User', UserSchema);
