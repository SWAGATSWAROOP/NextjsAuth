import mongoose from "mongoose";

export async function connect(){
    try {
        // ! give gurantees that it MONGO_URI will be there typescript
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected',()=>{
            console.log("MongoDB connected");
            
        })

        connection.on('error',(err)=>{
            console.log("MongoDB connection error,please make sure DB is connected" + err);
            process.exit();
        })
    } catch (error) {
        console.log("Something went wrong");
    }
}