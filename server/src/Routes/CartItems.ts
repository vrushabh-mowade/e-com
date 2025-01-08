import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'


export const cartitemsrouter = new Hono();

cartitemsrouter.onError((err, c) => {
    console.error(`${err}`)
    return c.text('the main category route error', 500)
})

cartitemsrouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();

        // Validate required fields
        if (!body.productId || !body.cartId) {
            return c.json({
                msg: "Invalid input data",
                error: "productId and cartId are required."
            }, 400); // Send a 400 Bad Request response
        }

        // Default quantity to 1 if not provided
        const quantity = typeof body.quantity === 'number' ? body.quantity : 1;        
//Here add code if someone added the same product then one should noly exists and the questity should get increased 
        const cartItem = await prisma.cartItem.create({
            data: {
                productId: body.productId,
                cartId: body.cartId,
                quantity, // Use the default or provided quantity
            },
        });

        return c.json({
            msg: "CartItem created successfully",
            cartItem, // Include the created cart item in the response
        }, 201); // Send a 201 Created response

    } catch (error: any) {
        console.error("Error creating CartItem: ", error);

        return c.json({
            msg: "Error creating CartItem",
            error: error.message || error,
        }, 500); // Send a 500 Internal Server Error response
    } finally {
        await prisma.$disconnect(); // Ensure the Prisma client disconnects
    }
});


cartitemsrouter.delete('/:id', async (c) => {
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const id = c.req.param('id');

        if (!id) {
            return c.json({
                msg: "CartItem ID is required",
            }, 400); 
        }

        const deletedCartItem = await prisma.cartItem.delete({
            where: {
                id: id,
            },
        });

        return c.json({
            msg: "CartItem deleted successfully",
            deletedCartItem, 
        }, 200); 

    } catch (error : any) {
        // Handle specific errors
        if (error.code === 'P2025') {
            return c.json({
                msg: "CartItem not found",
            }, 404); 
        }

        console.error("Error deleting CartItem: ", error);
        return c.json({
            msg: "Error deleting CartItem",
            error: error.message || error,
        }, 500); // Send a 500 Internal Server Error response
    } finally {
        await prisma.$disconnect(); // Ensure the Prisma client disconnects
    }
});


cartitemsrouter.get('/:userId', async (c) => {
    const prisma = new PrismaClient().$extends(withAccelerate());

    try {
        const userId = c.req.param('userId');

        if (!userId) {
            return c.json({
                msg: "User ID is required",
            }, 400);
        }

        const cartItems = await prisma.cart.findMany({
            where: { userId },
            include: { items: true }, // Include related CartItems
        });

        return c.json({
            msg: "Cart items fetched successfully",
            cartItems,
        });
    } catch (error : any) {
        console.error("Error fetching cart items: ", error);
        return c.json({
            msg: "Error fetching cart items",
            error: error.message || error,
        }, 500);
    } finally {
        await prisma.$disconnect();
    }
});