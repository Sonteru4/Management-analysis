const jwt = require("jsonwebtoken");
const uuid = require("uuid")
const bcrypt = require("bcryptjs");
const User = require("../model/user"); // Assuming you have a User model

exports.register = async (req, res) => {
  console.log("Registering new user...")
  try {
    // Extract data from request body
    const { username, email, password, firstName, lastName, role, dateOfBirth } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ // Set userId using uuid4
      username:username,//
      email:email,//
      password: hashedPassword,
      firstName:firstName,//
      lastName:lastName,//
      role:role,//
      dateOfBirth:dateOfBirth,//
      loginStatus: false, // Assuming the user is not logged in initially
      allTasks: [],
      completedTasks: [],
      pendingTasks: [],
      myProjects: [],
      involvedProjects: [],
      profilePictureURL:"",
      bio:"",
    });
    await newUser.save();

    // Respond with success
    res.status(201).json({ message: "User registered successfully" ,success:true});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" ,success:false});
  }
};

exports.login = async (req, res) => {
  try {
    // Extract data from request body
    const {username, password } = req.body;
    if (!(username && password)) {
      res.status(400).send("All input is required");
    }

    // Check if the user exists
    const userLog = await User.findOne({username});

    if (!userLog) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, userLog.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if((userLog&&passwordMatch)){
      // Generate a JWT token
      const token = jwt.sign({ _id: userLog._id },
        "your-secret-key", 
        { expiresIn: "2h" });

      userLog.token = token;
      userLog.loginStatus = true
        res.status(200).json({
            loginStatus:true,
            token: token,
            message:"Login Successful"
        });

    }
    // Respond with the token
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
