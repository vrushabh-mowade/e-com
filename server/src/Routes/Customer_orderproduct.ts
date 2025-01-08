import { Hono } from "hono";
import { Prisma, PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

export const customer_orderproduct_router = new Hono();


//done last route pending 
customer_orderproduct_router.post('/', async (c) => {
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const { customerOrderId, productId, quantity } = await c.req.json();
        const corder = await prisma.customer_order_product.create({
            data: { customerOrderId, productId, quantity }
        });
        return c.json(corder, 201);
    } catch (error) {
        console.error("Error creating product order:", error);
        return c.json({ error: "Error creating product order" }, 500);
    }
});

customer_orderproduct_router.put('/:id', async (c) => {
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const { id } = c.req.param();
        const { customerOrderId, productId, quantity } = await c.req.json();

        const existingOrder = await prisma.customer_order_product.findUnique({
            where: { id }
        });

        if (!existingOrder) {
            return c.json({ error: "Order not found" }, 404);
        }

        const updatedOrder = await prisma.customer_order_product.update({
            where: { id },
            data: { customerOrderId, productId, quantity }
        });

        return c.json({updatedOrder :updatedOrder , msg : "updated product details"} ,{status : 200});
    } catch (error) {
        console.error("Error updating order:", error);
        return c.json({ error: "Error updating order" }, 500);
    }
});


customer_orderproduct_router.delete('/:id', async (c) => {
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const { id } = c.req.param();
        const deletedproduct = await prisma.customer_order_product.deleteMany({
            where: { customerOrderId : id }
        });
        if(!deletedproduct){
            return c.json( {msg :"error deleted the order"},500);
        }
        return c.json( {msg :"deleted the order"},200);
    } catch (error) {
        console.error("Error deleting product orders:", error);
        return c.json({ error: "Error deleting product orders" }, 500);
    }
});

customer_orderproduct_router.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const { id } = c.req.param();
        const order = await prisma.customer_order_product.findMany({
            where: { customerOrderId: id },
            include: { product: true }
        });

        if (!order.length) {
            return c.json({ error: "Order not found" }, 404);
        }

        return c.json(order);
    } catch (error) {
        console.error("Error fetching product order:", error);
        return c.json({ error: "Error fetching product order" }, 500);
    }
});


customer_orderproduct_router.get('/', async (c) => {
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    
    try {
        const productOrders = await prisma.customer_order_product.findMany({
            select: {
                productId: true,
                quantity: true,
                customerOrder: {
                    select: {
                        id: true,
                        name: true,
                        lastname: true,
                        phone: true,
                        email: true,
                        company: true,
                        address: true,
                        apartment: true,
                        postalCode: true,
                        dateTime: true,
                        status: true,
                        total: true
                    }
                }
            }
        });

        const ordersMap = new Map();

        for (const order of productOrders) {
            const { customerOrder, productId, quantity } = order;
            const { id, ...orderDetails } = customerOrder;

            const product = await prisma.product.findUnique({
                where: { id: productId },
                select: {
                    id: true,
                    title: true,
                    mainImage: true,
                    price: true,
                    slug: true
                }
            });

            if (ordersMap.has(id)) {
                ordersMap.get(id).products.push({ ...product, quantity });
            } else {
                ordersMap.set(id, {
                    customerOrderId: id,
                    customerOrder: orderDetails,
                    products: [{ ...product, quantity }]
                });
            }
        }

        const groupedOrders = Array.from(ordersMap.values());

        return c.json(groupedOrders);
    } catch (error) {
        console.error('Error fetching all product orders:', error);
        return c.json({ error: "Error fetching all product orders" }, 500);
    }
});
