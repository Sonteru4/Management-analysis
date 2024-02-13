const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({

    senderName:{
        type:String
    },
    messageContent:{
        type:String
    }
})

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;