const { request } = require("express");
const express = require("express")
const router = express.Router()
const Task = require('./models/Task')

// List of tasks
router.get('/', (req, res) => {
    Task.find({}).exec((err, tasks) => {
        res.render('tasks',{tasks:tasks})
    })
});

// Create
router.get('/create', (req, res) => {
    res.render('create')
})

router.post('/create', (req, res) => {
    var task = new Task(req.body);
    task.save().then(item => {
    	res.redirect('/')
    })
})



// Update
router.get('/update/:id', (req, res) => {
    Task.find({ _id: req.params.id }).exec((err, task) => {
       res.render('update', {task:task})
    })
})



router.post('/update/:id', (req, res) => {
    console.log(req.body)
    Task.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, (err, task) =>{
        res.redirect('/')
    })
})


//Delete
router.get('/delete/:id', (req, res) => {
    Task.findOneAndDelete({ _id: req.params.id }).exec((err, task) => {
        res.redirect('/')
    })
})


module.exports = router