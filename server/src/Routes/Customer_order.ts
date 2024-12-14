import { Hono } from "hono";
import { Prisma, PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

export const customer_order_router = new Hono();



customer_order_router.post('/:id', async (c) => {
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const {
            name,
            lastname,
            phone,
            email,
            company,
            address,
            apartment,
            postalCode,
            status,
            city,
            country,
            orderNotice,
            total,
        } = await c.req.json();
        const customerorder = await prisma.customer_order.create({
            data: {
                name,
                lastname,
                phone,
                email,
                company,
                address,
                apartment,
                postalCode,
                status,
                city,
                country,
                orderNotice,
                total,
            },
        });
        if (customerorder) {
            c.status(201);
            c.json(customerorder);
        }
    } catch (error) {
        console.error("Error creating the customer order:", error);
        c.status(404);
        return c.json({ error: "Error creating the customer order" })
    }
})


customer_order_router.put('/:id', async (c) => {
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    try {

        const id = c.req.param('id');
        const {
            name,
            lastname,
            phone,
            email,
            company,
            address,
            apartment,
            postalCode,
            dateTime,
            status,
            city,
            country,
            orderNotice,
            total,
        } = await c.req.json();

        const existingOrder = await prisma.customer_order.findUnique({
            where: {
                id: id,
            },
        });

        if (!existingOrder) {
            c.status(404);
            return c.json({ error: "Order not found" })
        }

        const updatedOrder = await prisma.customer_order.update({
            where: {
                id: existingOrder.id,
            },
            data: {
                name,
                lastname,
                phone,
                email,
                company,
                address,
                apartment,
                postalCode,
                dateTime,
                status,
                city,
                country,
                orderNotice,
                total,
            },
        });

        if (updatedOrder) {
            c.status(200);
            return c.json(updatedOrder)
        }
    } catch (error) {
        console.error("Error creating the customer order:", error);
        c.status(404);
        return c.json({ error: "Error creating the customer order" })
    }
})


customer_order_router.delete('/:id', async (c) => {
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const id = c.req.param('id');
        await prisma.customer_order.delete({
            where: {
                id: id,
            },
        });
        return c.status(204);

    } catch (error) {
        console.error("Error deleting order", error);
        c.status(404);
        return c.json({ error: "Error deleteing the customer order" })
    }
});

customer_order_router.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const id = c.req.param('id');
        const order = await prisma.customer_order.findUnique({
            where: {
                id: id,
            },
        });
        if (order) {
            c.status(200);
            return c.json({
                order: order
            })
        } {
            c.status(404);
            return c.json({ error: "Order not found" })
        }

    } catch (error) {
        console.error("error while finding the prodect", error);
        c.status(404);
        return c.json({ error: "error while finding the prodect" })
    }
});



customer_order_router.get('/', async (c) => {
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const orders = await prisma.customer_order.findMany({});
        return c.json({
            orders: orders
        });

    } catch (error) {
        console.error("error while finding all product", error);
        c.status(404);
        return c.json({ error: "error while finding all product" })
    }
});








