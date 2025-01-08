import { Hono } from "hono"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from "hono/jwt"



type Bindings = {
    DATABASE_URL: string,
    JWT_SECRET: string
}


export const userrouter = new Hono<{ Bindings: Bindings }>();


userrouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        console.log('Environment variables:', c.env);
        console.log('Environment variables:', c.env?.JWT_SECRET);

        const body = await c.req.json();
        const user = await prisma.user.create({
            data: {
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                password: body.password,
            }
        });
        console.log('Created user:', user);
        console.log("secret is ",c.env.JWT_SECRET);


        const token = await sign({ id: user.id }, c.env.JWT_SECRET);
        console.log("token is ",token);//prod-check

        return c.json(token)
    } catch (error) {
        console.log("error in the signup", error);
        return c.json({
            msg: "sign up error"
        })
    }

});

userrouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
                password:body.password
            }
        });

        if (!user) {
            c.status(401)
            c.text("invalid email or user does not exists")
        }

        const token = await sign({id:user?.id},c.env.JWT_SECRET);
        return c.json(token)

    } catch (error) {
        console.log("sign in error is ", error);
        c.status(500);
        c.json({
            msg: "there is a error in the signin"
        });
    }

});




