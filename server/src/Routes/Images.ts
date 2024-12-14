import { Hono } from "hono";
import { Prisma, PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

export const imagerouter = new Hono();


imagerouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {

        const { productId, url, altText } = await c.req.json();
        const image = await prisma.image.create({
            data: {
                url: productId,
                productId: url,
                altText: altText

            }
        });

        if (image) {
            c.status(200);
            c.json({
                msg: "upload the product image"
            })
        }

    } catch (error) {
        console.error("Error is :", error);
        c.status(500);
        return c.json({ error: "Error uploading products image" })

    }
})


imagerouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const productId = c.req.param('id');
        const images = await prisma.image.findMany({
            where: {
                id: productId
            }
        });
        return c.json({
            images: images
        })

    } catch (error) {
        console.error("Error searching products:", error);
        c.status(500);
        return c.json({ error: "Error searching products" })

    }

})


imagerouter.put('/:id', async (c) => {
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const imageId = c.req.param('id');
        const body = await c.req.json();
        const updatedimageinfo: Prisma.ProductUpdateInput = {
            ...(body.url && { url: body.url }),
            ...(body.productId && { productId: body.productId }),
            ...(body.altText && { altText: body.altText })
        }
        const image = await prisma.image.update({
            where: {
                id: imageId
            },
            data: updatedimageinfo
        });
        return c.json({
            images: image
        })
    } catch (error) {
        console.error("Error updating image data:", error);
        c.status(500);
        return c.json({ error: "Error updating the image data" })
    }

})


imagerouter.delete('/:id', async (c) => {
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const id = c.req.param('id');
        const deletedimage = await prisma.image.delete({
            where: {
                id: id
            }
        });
        if (deletedimage) {
            c.status(200);
            c.json({
                msg: "image deleted successfully"
            })
        }

    } catch (error) {
        console.error("Error deleting the image data:", error);
        c.status(500);
        return c.json({ error: "Error deleting the image data" })

    }

})

