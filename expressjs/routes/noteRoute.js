import express from 'express';
const router = express();
import noteModel from '../models/noteModel.js';
import { auth } from '../middleware/auth.js';

// create new note
router.post("/add", auth, async (req, res) => {
    try {
        const data = await noteModel.create(req.body);
        res.status(201).json(data);
    } catch (e) {
        console.log(e);
    }
});

// get all notes
router.get("/get", auth, async (req, res) => {
    try {
        const data = await noteModel.find();
        res.status(201).json(data);
    } catch (e) {
        console.log(e);
    }
});

// get single note
router.get("/get/:id", auth, async (req, res) => {
    try {
        const data = await noteModel.findById(req.params.id);
        res.status(201).json(data);
    } catch (e) {
        console.log(e);
    }
});

// update note
router.put("/edit/:id", auth, async (req, res) => {
    try {
        const data = await noteModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(201).json(data);
    } catch (e) {
        console.log(e);
    }
});

// delete note
router.delete("/delete/:id", auth, async (req, res) => {
    try {
        await noteModel.findByIdAndDelete(req.params.id);
        res.status(201).json("Note deleted successfully");
    } catch (e) {
        console.log(e);
    }
});

export default router;
