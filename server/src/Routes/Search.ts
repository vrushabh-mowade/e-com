import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

type Bindings = {
    DATABASE_URL: string,
    JWT_SECRET: string
}


export const searchrouter = new Hono<{ Bindings: Bindings }>();


//need to work on this
searchrouter.get('/',async (c)=>{
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const { query } = c.req.query();
        if (!query) {
            c.status(400);
            return c.json({ error: "Query parameter is required" })
        }

        const products = await prisma.product.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: query
                        }
                    },
                    {
                        description: {
                            contains: query
                        }
                    }
                ]
            }
        });

        return c.json(products);
    } catch (error) {
        console.error("Error searching products:", error);
        c.status(500);
        return c.json({ error: "Error searching products" })
    }

})

// async function searchProducts(c:any) {

// }

