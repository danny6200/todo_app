const TaskModel = require("../db/models/tasks.Model");
const Mongoose = require("mongoose");

const ObjectId = Mongoose.Types.ObjectId;


const GetTasks = async (req, res) => {
    try {
        const query = req.query;
        const user = req.user;
        const tasks = await TaskModel.find({creator: user._id, deleted: false})
        const tasks_string = JSON.stringify(tasks)
        let tasks_duplicate = tasks
        
        if (query.state){
            tasks_duplicate = tasks_duplicate.filter((task) => task.state.includes(query.state))

        }


        if (query.limit){
            tasks_duplicate = tasks_duplicate.slice(0, query.limit)
        }
        
        return res.status(200).json({
                message: "Successful",
                data: tasks_duplicate,
                error: "null"
        })

    } catch (error) {
         return res.status(500).json({
            message: "Unsuccessful",
            data: "null",
            error: error.message
        })
    }
}



const CreateTask = async (req, res) => {
    try {
        const user = req.user;
        const taskFromRequest = req.body;

        const newTask = await TaskModel.create({
            title: taskFromRequest.title,
            description: taskFromRequest.description,
            creator: user._id
        })

        return res.status(201).json({
            message: "Task Created successfully",
            data: newTask,
            error: "null"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Unsuccessful.",
            data: "null",
            error: error.message
        })
    }
}

const UpdateTask = async (req, res) => {
    try {
        const _id = new ObjectId(req.params.id);

        const toBeUpdated = await TaskModel.findById(_id)
        if (!toBeUpdated){
            return res.status(404).json({
                message: "Unsuccessful.",
                data: "null",
                error: "Task not found"
            })
        }
        
        if (toBeUpdated.state === "deleted"){
            return res.status(204).json({
                message: "Unsuccessful.",
                data: "null",
                error: "No content"
            })
        }

        update = {}

        if (req.body.title) update.title = req.body.title;
        if (req.body.description) update.description = req.body.description;
        if (req.body.state) update.state = req.body.state;

        const updatedTask = await TaskModel.findById(_id, update, {new: true});

        return res.status(200).json({
            message: "Successful",
            data: updatedTask,
            error: "null"
        })

    } catch (error) {
        return res.status(500).json({
            message: "Unsuccessful.",
            data: "null",
            error: error.message
        })   
    }

}



const DeleteTask = async (req, res) => {
    try {
        const _id = ObjectId(req.params.id)

        const toBeDeleted = await TaskModel.findById(_id)

        if (!toBeDeleted){
            return res.status(404).json({
                message: "Unsuccessful",
                data: "null",
                error: "Not found"
            })
        }

        if (toBeDeleted.state === "deleted"){
            return res.status(204).json({
                message: "Unsuccessful.",
                data: "null",
                error: "No content"
            })
        }

        await TaskModel.findByIdAndUpdate(_id, {state: "deleted", deleted: true}, {upsert: true})
        return res.status(204).redirect("/tasks")
    } catch (error) {
        return res.status(500).json({
            message: "Unsuccesful.",
            data: "null",
            error: error.message
        })
    }
}


module.exports = {
    GetTasks,
    CreateTask,
    UpdateTask,
    DeleteTask
}