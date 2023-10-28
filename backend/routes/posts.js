const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// for post method we use api.post same happens for other methods
router.post('',(req, res, next)=>{
    // const post = req.body;
    // connecting to mongoose server
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
    });
    console.log(post);
    post.save().then((newCreatedPost)=>{
        res.status(201).json({
            message: 'Post added Successfully!',
            postId: newCreatedPost._id
         });
    });
    });
    
    // for get method we use api.get same happens for other methods
    router.get('',(req,res,next)=>{
        // when using mongo to fetch data from DB
        Post.find().then((DBrows)=>{
            res.status(200).json({
                message:"Success",
                posts:DBrows
            });
        });
    });
    
    router.get('/:id',(req,res,next)=>{
        Post.findById(req.params.id).then((post)=>{
            if(post){
                res.status(200).json(post);
            } else {
                res.status(404).json({message:"post not found!"});
            }
        });
    });
    
    router.put('/:id',(req,res,next)=>{
        const post = new Post({
            _id:req.body.id,
            title:req.body.title,
            content:req.body.content
        })
        Post.updateOne({_id:req.params.id},post).then((post)=>{
            console.log(post);
            res.status(200).json({
                message:"post updated successfully!",
                post:post
            });
        });
    })
    
    // for delete method we use api.delete same happens for other methods
    router.delete('/:id',(req,res,next)=>{
    // console.log(req.params.id);
    Post.deleteOne({_id: req.params.id}).then((result)=>{
    console.log(result)
    res.status(200).json({message:"post deleted successfully!"});
        });
    });

module.exports = router;