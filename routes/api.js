const router = require("express").Router();
const Workout = require("../models/Workout");

//get all workouts
router.get("/api/workouts", (req, res) => {
    Workout.find()
        .sort({ day: -1 })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
})

//Creating a new workout
router.post("/api/workouts", ({ req }, res) => {
    Workout.create({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
})

//add exercises to most recent workout plan
router.put("/api/workouts/:id", (req, res) => {
    Workout.find()
        .sort({ day: -1 }).limit(1)
        .then(dbWorkout => {
            // console.log(dbWorkout[0]._id)
            Workout.findByIdAndUpdate(
                { _id: dbWorkout[0]._id },
                { $push: { exercises: req.body } }
            )
                .then(dbWorkoutTwo => {
                    res.json(dbWorkoutTwo);
                })
            console.log(req.body)
        })
        .catch(err => {
            res.status(400).json(err);
        });
})

//DELETE
router.delete("/api/workouts", (req, res) => {
    console.log("HERE", req.body)
    Workout.findByIdAndDelete(req.body.id)
        .then(deleteWorkout => {
            res.json(deleteWorkout)
        })
        .catch(err => {
            res.status(400).json(err);
        })
})

// Add new exercises to a new workout plan. POST
// router.post("/api/workouts", async (req, res) => {
//     console.log(req.body.exercises)
//     try {
//         let newWorkout = await Workout.create({})
// console.log(newWorkout._id)
// Workout.findByIdAndUpdate(
//     { _id: newWorkout._id },
//     { $push: { exercises: { $each: req.body.exercises } } },
//     { upsert: true, useFindAndModify: false },
//     updatedWorkout => {
// res.json(newWorkout)

// )
// console.log(newWorkout)
// newWorkout.exercises.$push(req.body.exercises)
//     } catch (err) {
//         res.status(400).json(err)
//     }
// })
//

//View the combined weight of multiple exercises from the past seven workouts on the stats page. GET

//View the total duration of each workout from the past seven workouts on the stats page. GET

module.exports = router;