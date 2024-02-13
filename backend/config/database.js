// define the database connections
const mongoose = require("mongoose")

const  connectToDatabase = async () => {
const dbName = "TMS"
const dbUsername = "aravind"
const dbPassword = "araMoNg0932"
mongoose.connect(`mongodb+srv://${dbUsername}:${dbPassword}@cluster0.myusfay.mongodb.net/${dbName}?retryWrites=true&w=majority`,
// {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }
)}
module.exports = { connectToDatabase };
