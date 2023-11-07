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

const TaskSchema = new Schema(
  {
    projectId:{
      type: ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    creator: {
      type: MemberSchema,
      required: true,
    },
    members: {
      type: [MemberSchema],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["backlog", "in progress", "review code", "testing", "done"],
      default: "backlog",
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

export default mongoose.model("Task", TaskSchema);