import { dbConnect } from "utils/mongoose";
import Task from "models/Task";

dbConnect();

export default async (req, res) => {
  const {
    method,
    body,
    query: { id },
  } = req;
  switch (method) {
    case "GET":
      try {
        const task = await Task.findById(id);
        if (!task) {
          return res.status(404).json({ message: "Task not found" });
        }
        return res.status(200).json(task);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }

    case "DELETE":
      try {
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        return res.status(204).json({ message : "Task deleted" });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    case "PUT":
        try{
            const task = await Task.findByIdAndUpdate(id, body, { new : true });
            if(!task) return res.status(404).json({message: "Task not found"});
            return res.status(200).json(task);
        }catch(error){
            return res.status(500).json({ error: error.message });
        }
    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }
};
