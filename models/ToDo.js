import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema(
  {
    text: {
      type:String,
      required: true,
      trim: true,
      maxlength: 200
    },
    done: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

// Nice-to-have indexing for sorting/filtering
todoSchema.index({ done: 1, createdAt: -1 });

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
