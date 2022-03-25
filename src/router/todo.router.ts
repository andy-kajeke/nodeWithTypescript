import express, { Request, Response, NextFunction } from 'express';
import { TodoInstance } from '../model/todo.model';
const todoRoute = express.Router();
const cors = require('cors');
const crypto = require("crypto");

todoRoute.use(cors());

/////////////////////create todo task/////////////////
todoRoute.post('/create', (req: Request, res: Response) => {
    var date = new Date();
    let today = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    var realHour = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? 0 + minutes : minutes;
    seconds = seconds < 10 ? 0 + seconds : seconds;
    var currentTime = realHour + ':' + minutes + ':' + seconds + ' ' + ampm;

    const todo_id = crypto.randomBytes(25).toString('hex');

    let todoData = {
        id: todo_id,
        title: req.body.title,
        completed: req.body.completed,
        createdAt: today + ' ' + currentTime,
        updatedAt: today + ' ' + currentTime,
    }

    TodoInstance.findOne(
        {
            where: {
                title: req.body.title,
            }
        }
    ).then((activity) => {
        if(!activity){
            TodoInstance.create(todoData)
            .then(() => {
                res.json({message: 'Activity created successfully..!'});
            })
            .catch((err) => {
                res.json({message: err});
            });
        }
        else{
            res.json({message: 'Activity already exists'});
        }
    })
    .catch((err) => {
        res.json({message: err});
    });
});

//////////////////////////////Get all todos////////////////////////
todoRoute.get('/', async(req: Request, res: Response) => {
    try {
        const records = await TodoInstance.findAll();
        return res.json(records);
    } catch (error) {
        return res.json(error);
    }
});

//////////////////////////////Get todo by id////////////////////////
todoRoute.get('/:id', async(req: Request, res: Response) => {
    try {
        await TodoInstance.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((record) => {
            if(record){
                res.json(record)
            }
            else{
                res.json({message: 'Record not found'});
            }
        })
    } catch (error) {
        return res.json(error);
    }
});

//////////////////////////////Update todo task///////////////////////
todoRoute.put('/update/:id', async(req: Request, res: Response) => {
    var date = new Date();
    let today = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    var realHour = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? 0 + minutes : minutes;
    seconds = seconds < 10 ? 0 + seconds : seconds;
    var currentTime = realHour + ':' + minutes + ':' + seconds + ' ' + ampm;

    const todo_id = crypto.randomBytes(25).toString('hex');

    let todoData = {
        completed: req.body.completed,
        updatedAt: today + ' ' + currentTime,
    }

    try {
        await TodoInstance.findOne(
            {
                where: {
                    id: req.params.id,
                }
            }
        ).then((record) => {
            if(record){
                TodoInstance.update(todoData, {
                    where: { id: req.params.id}
                })
                .then(() => {
                    res.json({
                        status: 'OK',
                        message: 'Record updated successfully..!'
                    });
                })
                .catch((err) => {
                    res.json({message: err});
                });
            }
            else{
                res.json({
                    status: 'FAILED',
                    message: 'Record not found'
                });
            }
        })
        .catch((err) => {
            res.json({message: err});
        });
    } catch (error) {
        res.json({
            status: 'ERROR',
            message: error
        });
    }
});

/////////////////////////////////////////Delete todo///////////////////////////////////////////
todoRoute.delete('/delete/:id', async(req: Request, res: Response) => {
    try {
        await TodoInstance.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(record => {
            if(record === 1){
                res.json({
                    status: 'OK', 
                    message: 'Record Deleted Successfully..!'
                });
            }else{
                res.json({
                    status: 'FAILED', 
                    message: 'Recode not found'
                });
            }
        })
        .catch((error) => {
            res.json(error);
        });
    } catch (error) {
        res.json({
            status: 'ERROR',
            message: error
        });
    }
});

module.exports = todoRoute;