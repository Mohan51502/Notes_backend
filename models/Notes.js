const mongoose = require("mongoose");


const notesSchema = new mongoose.Schema(
    {
        heading:{
            type:String,
            required: true,
        },
        fname :{
            type: String,
            required : true,
        },
        userid:{
            type: mongoose.Schema.Types.ObjectId,
            required : true,
          },
    },
    {
        collection:"Notes"
    }
);

module.exports = mongoose.model("Notes",notesSchema);