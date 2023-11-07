import Task from "../models/Task.js";

export const createTask = async (req, res, next)=>{
    const newTask = new Task(req.body);
  try {
    const savedTask = await newTask.save();
    res.status(200).json(savedTask);
  } catch (err) {
        next(err)
    }
}
export const updateTask = async (req, res, next)=>{
    try {
        const updatedTask = await Task.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedTask);
      } catch (err) {
        next(err)
    }
}
export const deleteTask = async (req, res, next)=>{
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json("Task đã được xóa");
      } catch (err) {
        next(err)
    }
}
export const getTask = async (req, res, next)=>{
    try {
        const task = await Task.findById(req.params.id);
        res.status(200).json(task);
      } catch (err) {
        next(err)
    }
}

export const getTasks = async (req, res, next) => {
  const { min, max, limit, offset, ...others } = req.query;
  // console.log(req.query);
  try {
    const tasks = await Task.find(others).limit(limit).skip(offset);
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};
