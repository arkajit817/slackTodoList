const express = require('express');
const router = express.Router();
const _ = require('lodash');
const async = require('async');
const Todo = require('../models/todo');





// Register new task
router.post('/new', (req, res) => {
    // console.log(req, "ttt", req.query);
    
    try {
        let newTodo = new Todo({
            channel_id: req.body.channel_id,
            taskName: req.body.text,
            // taskDescription : req.body.text,
            user_name: req.body.user_name,
            user_id: req.body.user_id,
            team_id: req.body.team_id,
            team_domain: req.body.team_domain
        })
        newTodo.save()
            .then((saved) => {
                console.log('saved');
                let responseObj = {
                    "response_type": "in_channel",
                    "text": `Added todo for ${req.body.text}`
                }
                res.status(200).json(responseObj)

            })
            .catch(err => {
                console.log(err);
                let responseObj = {
                    "response_type": "in_channel",
                    "text": "Not saved"
                }
                res.status(400).json(responseObj)
            })
    } catch (err) {
        console.log(err);
        res.status(400).json('Error occurred')
    }



});







router.post('/marktask', async (req, res) => {
    try {
        console.log(req, "req")
        let queryObj = {};
        if (req.body.channel_id && req.body.text) {
            queryObj.channel_id = req.body.channel_id;
            queryObj.taskName = req.body.text;
            queryObj.isActive = true;
        }
        let findTask = await Todo.findOne({ $and: [queryObj] });
        // console.log(findTask,"task")
        if (findTask != null) {
            let updateTask = await Todo.findByIdAndUpdate(findTask._id, { $set: { isActive: false } });
            res.status(200).json('Deleted');
        } else {
            let responseObj = {
                "response_type": "ephemeral",
                "text": "'No task found with the name'"
            }
            res.status(200).json(responseObj);
        }

    } catch (e) {
        console.log(e);
        let responseObj = {
            "response_type": "ephemeral",
            "text": "Internal server error"
        }
        res.status(200).json(responseObj);
    }


})


//get all the tasks for a particular team/channel
router.post('/allTask', async (req, res) => {
    // console.log(req.body)
    try {
        let tasks = await Todo.find({ $and: [{ channel_id: req.body.channel_id }, { isActive: true },{team_id : req.body.team_id}] });
        console.log(tasks,"tt")
        if (tasks.length !=0) {
            let text = ``;
            tasks.forEach(task => {
                text += `•${task.taskName} \n`
            })
            let responseObj = {
                "blocks": [
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": text
                        }
                    }
                ]
            }
            res.status(200).json(responseObj);
        } else {
            let responseObj = {
                "response_type": "ephemeral",
                "text": "No todos"
            }
            res.status(200).json(responseObj);
        }

    } catch (e) {
        console.log(e);
        let responseObj = {
            "response_type": "ephemeral",
            "text": "Error fetching the data"
        }
        res.status(200).json(responseObj);
    }
})




module.exports = router;
