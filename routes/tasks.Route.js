const router = require("express").Router();
const middleware = require("../middlewares/tasks.Middleware");
const authmiddleware = require("../middlewares/auth.Middleware")
const controller = require("../controllers/tasks.Controller");

router.use(authmiddleware.bearerTokenAuth);

router.get("/", controller.GetTasks)

router.get("/create", (req, res) => {
    res.status(200).render("createTask")
})

router.post("/", middleware.ValidateTaskCreation, controller.CreateTask)

// Edit Task
router.get("/:id/edit", controller.EditTask)

// Update Task
router.patch("/:id", middleware.ValidateUpdateDetails, controller.UpdateTask)

//Delete Task
router.delete("/:id", controller.DeleteTask)

module.exports = router;