import { Hono } from "hono";
import { Prisma, PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

export const customer_order_router = new Hono();

// everything done
customer_order_router.post('/', async (c) => {
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const body = await c.req.json();
        const customerorder = await prisma.customer_order.create({
            data: {
                name : body.name,
                lastname :body.lastname,
                phone :body.phone,
                email :body.email,
                company :body.company,
                address :body.address,
                apartment :body.apartment,
                postalCode :body.postalCode,
                status :body.status,
                city :body.city,
                country :body.country,
                orderNotice :body.orderNotice,
                total :body.total,
            },
        });
        if (!customerorder) {
            return c.json({msg : "error placeing customer order"} ,{status:500});
        }
        if (customerorder) {
            return c.json({
                customerorder:customerorder ,
                msg : "order placed successfully",
            },{status: 201});
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
        const body = await c.req.json();

        const existingOrder = await prisma.customer_order.findUnique({
            where: {
                id: id,
            },
        });

        if (!existingOrder) {
            return c.json({ error: "Order not found" },{status :404})
        }

        const updatedOrder = await prisma.customer_order.update({
            where: {
                id: existingOrder.id,
            },
            data: {
                name : body.name,
                lastname :body.lastname,
                phone :body.phone,
                email :body.email,
                company :body.company,
                address :body.address,
                apartment :body.apartment,
                postalCode :body.postalCode,
                status :body.status,
                city :body.city,
                country :body.country,
                orderNotice :body.orderNotice,
                total :body.total,
            },
        });
        if (!updatedOrder) {
            return c.json( {updatedOrder :updatedOrder ,
                msg : "order data updated", 
            },{status : 200})
        }

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
        await prisma.customer_order.deleteMany({
            where: {
                id: id,
            },
        });
        return c.json({msg : "order deleted"} ,{status :200});

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








