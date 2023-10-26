const router = require("express").Router();
const middleware = require("../middlewares/tasks.Middleware");
const authmiddleware = require("../middlewares/auth.Middleware")
const controller = require("../controllers/tasks.Controller");

router.use(authmiddleware.bearerTokenAuth);

router.get("/", controller.GetTasks)
router.post("/", middleware.ValidateTaskCreation, controller.CreateTask)

// Update Task
router.post("/:id", middleware.ValidateUpdateDetails, controller.UpdateTask)

//Delete Task



module.exports = router;