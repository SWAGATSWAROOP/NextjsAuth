import {connect} from '@/db/dbConfig'
import User from "@/models/userModel"
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/helpers/mailer'

import {NextRequest,NextResponse} from 'next/server'

connect()

export async function POST(request:NextRequest) {
    try {
        const reqBody = request.json();
        const {username,email,password}:any = reqBody
        // validation

        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error:"User already exist"},{status:400});
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save();
        console.log(savedUser);

        // send verification email
        await sendEmail({email,emailType:"Verify",userId:savedUser._id});

        return NextResponse.json({
            message: "User registered successfully",
            success: true,
            savedUser
        })

        

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}

