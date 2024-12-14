import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'


export const categoryrouter = new Hono();

categoryrouter.onError((err, c) => {
    console.error(`${err}`)
    return c.text('the main category route error', 500)
})

categoryrouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();
        const { name } = body.name;
        const category = await prisma.category.create({
            data: {
                name: name || body.name,
                description: body.description,
            }
        });

        if (!category) {
            console.log("error creating category ", Error)
            return c.json({
                msg: "error creating the category"
            })
        } else {
            return c.json({
                msg: "category created successfully"
            })
        }

    } catch (error) {
        console.log("error is ", error)
        return c.json({
            msg: "error creating the category",
            error: error
        })


    }
});

categoryrouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const id = c.req.param('id');
        const category = await prisma.category.findUnique({
            where: {
                id: id,
            }
        });
        if (!category) {
            c.status(404)
            return c.json({
                msg: "category not found",
            })
        }
        c.status(200)
        return c.json({
            msg: `category is ${category}`
        })
    } catch (error) {
        console.log("error is ", error)
        return c.json({
            msg: "error finding the category using id",
            error: error
        })

    }
})

categoryrouter.get('/', async (c) => {
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const categories = await prisma.category.findMany();
        return c.json({ categories });
    } catch (error) {
        console.error("Error fetching categories:", error);
        c.status(500);
        return c.json({
            msg: "Error finding all categories",
            error: error
        });
    }
});


categoryrouter.delete('/:id', async (c) => {
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const id = c.req.param('id');
        const deletedcategory = await prisma.category.delete({
            where: {
                id: id
            }
        });

        const categorystillexists = await prisma.category.findUnique({
            where: {
                id: id
            }
        });
        if (categorystillexists) {
            console.log("Category still exists after delete operation. Retrying...");
            throw new Error("Category still exists after deletion.");
        }

        c.status(202)
        return c.json({
            msg: "successfully deleted the category"
        })
    } catch (error) {
        console.log("error is ", error)
        return c.json({
            msg: "error deleting the category",
            error: error
        })

    }
})


categoryrouter.put('/:id', async (c) => {
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const id = c.req.param('id');
        const { name, description } = await c.req.json();

        const productexists = await prisma.category.findUnique({
            where: {
                id: id
            }
        })

        if (!productexists) {
            c.status(404)
            c.json({
                msg: "category not found"
            })
        }

        const updatedproduct = await prisma.category.update({
            where: {
                id: productexists?.id,
            },
            data: {
                //@ts-ignore
                name,
                description,
            }
        });

        c.status(200)
        return c.json({
            msg: "category updated succesfully"
        })


    } catch (error) {
        console.log("error is ", error)
        return c.json({
            msg: "error deleting the category",
            error: error
        })

    }
})