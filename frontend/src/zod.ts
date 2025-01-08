import { z } from 'zod';


const signupinput = z.object({

    email : z.string(),
    password : z.string().min(5),
    name : z.string().optional()
})

// type interference in zod 

const signininput = z.object({
    email : z.string(),
    password : z.string().min(5),
})




export type signuptype = z.infer< typeof signupinput>
export type signintype = z.infer< typeof signininput>

