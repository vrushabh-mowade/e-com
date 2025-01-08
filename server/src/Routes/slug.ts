import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

export const slugrouter = new Hono();


//need to work on this
slugrouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const slug = c.req.param('id');
        const product = await prisma.product.findMany({
            where: {
                slug: slug,
            },
            include: {
                category: true
            },
        });

        const foundProduct = product[0]; // Assuming there's only one product with that slug
        if (!foundProduct) {
            c.status(404);
            return c.json({ error: "Product not found" })
        }
        c.status(200);
        return c.json(foundProduct)

    } catch (error) {
        console.error("Error deleting the image data:", error);
        c.status(404);
        return c.json({ error: "Product not found" })
    }

})





