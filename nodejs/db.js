import mongoose from 'mongoose';

export const dbConnection = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1/node-product", { useNewUrlParser: true })
        console.log("Database Connected");
    } catch (e) {
        console.log(e.message);
    }
}
