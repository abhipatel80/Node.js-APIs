import mongoose from 'mongoose';

const databaseConnection = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1/user", {
            useNewUrlParser: true
        })
        console.log("Database connected");
    } catch (e) {
        console.log(e.message);
    }
}

export default databaseConnection;
