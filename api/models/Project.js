import mongoose from "mongoose";

const { Schema, ObjectId } = mongoose;

const MemberSchema = new Schema({
  _id: {
    type: ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      default: '',
    },
    leader: {
      type: MemberSchema,
      required: true,
    },
    members: {
      type: [MemberSchema],
      default: [],
    },
    description: {
      type: String,
      required: true,
    },
    dateStart: {
      type: Date,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", ProjectSchema);