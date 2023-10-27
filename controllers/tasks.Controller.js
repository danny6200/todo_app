const TaskModel = require("../db/models/tasks.Model");
const Mongoose = require("mongoose");

const ObjectId = Mongoose.Types.ObjectId;


const GetTasks = async (req, res) => {
    try {
        const user = res.locals.user;
        const tasks = await TaskModel.find({creator: user._id})
        const tasks_string = JSON.stringify(tasks)
        let tasks_duplicate = tasks
        
        if (req.query && req.query.state){
            tasks_duplicate = tasks_duplicate.filter((task) => task.state.includes(req.query.state))

        }


        if (req.query && req.query.limit){
            tasks_duplicate = tasks_duplicate.slice(0, req.query.limit)
        }

        return res.status(200).render("viewTask", {tasks: tasks_duplicate})

    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
}



const CreateTask = async (req, res) => {
    try {
        const user = res.locals.user;
        const taskFromRequest = req.body;

        await TaskModel.create({
            title: taskFromRequest.title,
            description: taskFromRequest.description,
            creator: user._id
        })
        return res.status(201).redirect("/tasks")

    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }
}


const EditTask = async (req, res) => {
    // const _id = new ObjectId(req.params.id);
    const task = await TaskModel.findById(req.params.id)
    res.status(200).render("editState", {task: task, message:""})
}


const UpdateTask = async (req, res) => {
    try {
        // const _id = new ObjectId(req.params.id);
        const task = await TaskModel.findById(req.params.id)

        if (!task){
            return res.status(404).render("404")
        }

        // if (task.state === "deleted"){
        //     return res.status(204).render("404")
        // }

        const state = req.body.state
        if (!state){
            message="State cannot be empty"
            return res.status(400).render("editState", {task: task, message: message})
        }
        await TaskModel.findByIdAndUpdate(req.params.id, {state: state});

        return res.status(200).redirect("/tasks")

    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }

}



const DeleteTask = async (req, res) => {
    try {
        await TaskModel.findByIdAndRemove(req.params.id)
        return res.status(200).redirect("/tasks")
    
    } catch (error) {
        return res.status(500).send({error: error.message})
    }
}


module.exports = {
    GetTasks,
    CreateTask,
    EditTask,
    UpdateTask,
    DeleteTask
}