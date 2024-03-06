const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({

    senderName:{
        type:String
    },
    messageContent:{
        type:String
    },
    senderId:{
        type : mongoose.Schema.Types.ObjectId,  
        ref:"User"
    },
    timeStamp:{
        type:Date, 
        default: Date.now()  
    }
})

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;