import Project from "../models/Project.js";

export const createProject = async (req, res, next)=>{
    const newProject = new Project(req.body);
  try {
    const savedProject = await newProject.save();
    res.status(200).json(savedProject);
  } catch (err) {
        next(err)
    }
}
export const updateProject = async (req, res, next)=>{
    try {
        const updatedProject = await Project.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedProject);
      } catch (err) {
        next(err)
    }
}
export const deleteProject = async (req, res, next)=>{
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.status(200).json("Project đã được xóa");
      } catch (err) {
        next(err)
    }
}
export const getProject = async (req, res, next)=>{
    try {
        const project = await Project.findById(req.params.id);
        res.status(200).json(project);
      } catch (err) {
        next(err)
    }
}

export const getProjects = async (req, res, next) => {
  const { min, max, limit, offset, ...others } = req.query;
  // console.log(req.query);
  try {
    const projects = await Project.find().limit(limit).skip(offset);
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
};
