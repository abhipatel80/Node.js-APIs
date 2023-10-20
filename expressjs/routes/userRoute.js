import express from 'express';
const router = express();
import userModel from '../models/userModel.js';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { jsontoken } from '../utils/jwt.js';

// register new user
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(401).json("Please fill all data");
        }

        const validate = validator.isEmail(email);
        if (!validate) {
            return res.status(401).json("Please enter valid email");
        }

        const bcrpass = await bcrypt.hash(password, 10);
        const data = await userModel.create({ name, email, password: bcrpass });
        res.status(201).json(data);
    } catch (e) {
        console.log(e);
    }
});

// login user
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json("Please fill all data");
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json("Email or Password are Incorrect");
        }

        const checkpass = await bcrypt.compare(password, user.password);
        if (!checkpass) {
            return res.status(401).json("Email or Password are Incorrect");
        }

        const token = await jsontoken(user.id);
        return res.status(200).json({ token, user });

    } catch (e) {
        console.log(e);
    }
});

// get all users
router.get("/", async (req, res) => {
    try {
        const data = await userModel.find();
        res.status(201).json(data);
    } catch (e) {
        console.log(e);
    }
});

// get single user
router.get("/:id", async (req, res) => {
    try {
        const data = await userModel.findById(req.params.id);
        res.status(201).json(data);
    } catch (e) {
        console.log(e);
    }
});

// update user
router.put("/edit/:id", async (req, res) => {
    try {
        const data = await userModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(201).json(data);
    } catch (e) {
        console.log(e);
    }
});

// delete user
router.delete("/delete/:id", async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
        res.status(201).json("User deleted");
    } catch (e) {
        console.log(e);
    }
});

export default router;
