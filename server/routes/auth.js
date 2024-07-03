const zod = require('zod');
const Router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const User = require("../models/user");


// zod verification
const registrationBody = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    email: zod.string().email(),
    password: zod.string(),
    profileImage: zod.string().nonempty("profile image is required")
})

// configuration of multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/') // Store uploaded files in the 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)  // save the same file name in the folder 
    },
});

const upload = multer({ storage })  // create the reference of the diskStorage

// Register the user
Router.post('/register', upload.single("profileImage"), async (req, res) => {
    // create an object to validate
    if (!req.file) {
        res.status(400).send('No file was uploaded.');
        return;
    }
    // rest of your code

    const dataToValidate = {
        ...req.body,
        profileImage: req.file.path,
    };

    // validate the data
    const result = registrationBody.safeParse(dataToValidate);

    if (!result.success) {
        // handle validation error
        res.status(400).json({ error: result.error });
        return;
    }
    try {
        const { firstName, lastName, email, password, profileImage } = result.data;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists!" });
        }

        // hass the password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        // create new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            profileImage
        })

        // save the new user in database 
        await newUser.save();

        /* Send a successful message */
        res
            .status(200)
            .json({ message: "User registered successfully!", user: newUser });
    } catch (err) {
        console.log(err);
        res
            .status(500)
            .json({ message: "Registration failed!", error: err.message });
    }
})

// zod verification
const logInBody = zod.object({
    email: zod.string().email(),
    password: zod.string(),
})

Router.post('/login',async(req,res)=>{
try{
    console.log(req.body);
    const result = logInBody.safeParse(req.body);
    if(!result.success){
        res.status(400).json({ error: result.error });
        return;
    }

    const {email,password}=result.data;

    const userExist = await User.findOne({email});
    if(!userExist){
        return res.status(409).json({ message: "User doesn't exist!" });
    }

    // compare the password with the hasshed password
    const isMatch = await bcrypt.compare(password, userExist.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials!"})
    }

    // genrate jwt token
    const token = jwt.sign({id:userExist._id},process.env.JWT_SECRET);
    
    res.status(200).json({ token, userExist })
}catch(err){
    console.log(err)
    res.status(500).json({ error: err.message })
}
})

module.exports = Router;