const express = require("express");
const notes = require("../models/Notes");
const router = express.Router();

////////////create crud
router.post("/create", async (req, res) => {

    const {heading, fname,userid} = req.body;
  
    if (!heading || !fname ||!userid ) {
        res.status(422).json({ error: "fill all the details" })
    }
  
    try {
        console.log(heading,fname,userid)
  
      const finalleave = new notes({
       heading, fname,userid     });
  
    // here password hasing
  
    const storeData = await finalleave.save();

  
    // console.log(storeData);
    res.status(200).json({ status: 200, storeData })
  
    } catch (error) {
        //res.status(400).json(error);
        console.log("crud catch block error",error);
    }
  
  });


  ////////get user crud only


  router.get("/getUsercrudOnly/:_id", async function (req, res, next) {
    try {
        console.log(req.params._id)
  
  
      const response = await notes.find({userid:req.params._id});
     // if (response.length > 0) {
        res.status(200).json({
          message: "User Fetched Successfully!!!",
          data: response,
          success: true,
        });
    //   } else {
    //     res.status(200).json({
    //       message: "No Users!!!",
    //       success: false,
    //     });
    //   }
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error,
        success: false,
      });
    }
  });


  ////////////////////


  router.get("/getUser/:_id", async function (req, res, next) {
    try {
        console.log(req.params._id)
      //  console.log("findone",_id)
  
  
      const response = await notes.findOne({_id:req.params._id});
      
     // if (response.length > 0) {
        res.status(200).json({
          message: "Notes Fetched Successfully!!!",
          data: response,
          success: true,
        });
    //   } else {
    //     res.status(200).json({
    //       message: "No Users!!!",
    //       success: false,
    //     });
    //   }
    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: "Internal server error",
        error: error,
        success: false,
      });
    }
  });




  router.put("/:_id", async (req, res) => {
    try {
      
      const post = await notes.findByIdAndUpdate(
        req.params._id,
        {heading:req.body.heading, fname: req.body.fname},
       
        { new: true }
        
      );
      console.log(req.params._id)
  
      if (!post) return res.status(404).send("Post not found");
      res.send(post);
    } catch (error) {
      res.status(500).send(error);
    }
  });


  // Deleting a post by id
router.delete("/:_id", async (req, res) => {
    try {
      console.log("delete",req.params._id)
      const post = await notes.findByIdAndDelete(req.params._id);
      console.log(post);
      if (!post) return res.status(404).send("Post not found");
      res.json(post);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });


  module.exports = router;