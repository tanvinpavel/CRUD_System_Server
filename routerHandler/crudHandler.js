const express = require('express');
const mongoose = require('mongoose');

const route = express.Router();
const userSchema = require('../schema/userSchema');

const Users = new mongoose.model('user', userSchema);

route.get('/', (req, res) => {
    Users.find({}, '-__v').exec((err, data) => {
        if(err){
            res.status(500).json({
                error: "Server side error",
            });
        }else{
            res.status(200).json({
                result: data,
            })
        }
    })
});

route.get('/:id', (req, res) => {
    Users.findById(req.params.id, '-__v').exec((err, data) => {
        if(err){
            res.status(500).json({
                error: "Server side error",
            });
        }else{
            res.status(200).json({
                result: data,
            })
        }
    })
})

route.post('/', async (req, res) => {
    try{
        const newUser = new Users(req.body);

        await newUser.save();

        res.status(200).json({
            message: "User added successfully",
        })
    }catch{
        res.status(500).json({
            error: "Server side error",
        });
    }
});

route.put('/:id', (req, res) => {
    const {name, email, gender, status} = req.body;

    let verifiedPayload = {};

    if(name.length > 0 && typeof(name) === 'string'){
        verifiedPayload.name = name;
    }
    if(email.length > 0 && typeof(email) === 'string'){
        verifiedPayload.email = email;
    }
    if(gender.length > 0 && typeof(gender) === 'string' && ['male', "female"].includes(gender)){
        verifiedPayload.gender = gender;
    }
    if(status !== null && typeof(status) === 'string' && ['active', 'inactive'].includes(status)){
        verifiedPayload.status = status;
    }

    if(Object.keys(verifiedPayload).length > 0){
        Users.updateOne({ _id: req.params.id}, verifiedPayload, (err, data) => {
            if(err){
                res.status(500).json({
                    error: "Server side error",
                });
            }else{
                res.status(200).json(data)
            }
        })
    }else{
        res.status(200).json({
            object: 'empty'
        })
    }
})

route.delete('/:id', (req, res) => {
    console.log('delete')
    Users.deleteOne({_id: req.params.id}, (err) => {
        if(err){
            res.status(500).json({
                error: "Server side error",
            });
        }else{
            res.status(200).json({
                message: "User delete successfully",
            })
        }
    })
});


module.exports = route;