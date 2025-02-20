import mongoose from "mongoose"

const connectDB = async ()    =>

    {

    try {

        await mongoose.connect(process.env.dbUrl)
        console.log('connected to the database ')
        
        
    } catch (error) {

 console.log    ("could not connect db " )
    }
}

export default connectDB;