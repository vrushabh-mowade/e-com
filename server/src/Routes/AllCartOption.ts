import { Hono } from 'hono';
import { Prisma, PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'


export const allcartoptionrouter = new Hono();

allcartoptionrouter.onError((err, c) => {
    console.error(`${err}`)
    return c.text('the main category route error', 500)
});


// allcartoptionrouter.get('/:userId', async (c) => {
//     const prisma = new PrismaClient({
//          //@ts-ignore
//         datasourceUrl: c.env?.DATABASE_URL,
//     }).$extends(withAccelerate());

//     try {
//         const userId = c.req.param('userId');

//         if (!userId) {
//             return c.json({
//                 msg: "User ID is required",
//             }, 400);
//         }

//         const cartItems = await prisma.cart.findMany({
//             where: { userId },
//             include: { items : {
//                 include :{
//                     product :true
//                 }
//             }}, // Include related CartItems
//         });

//         return c.json({
//             msg: "Cart fetched successfully",
//             cartItems,
//         });
//     } catch (error : any) {
//         console.error("Error fetching cart items: ", error);
//         return c.json({
//             msg: "Error fetching cart items",
//             error: error.message || error,
//         }, 500);
//     } 
// });

// to get all the cartitems using userid
allcartoptionrouter.get('/:userId', async (c) => {
    const prisma = new PrismaClient({
         //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const userId = c.req.param('userId');
        if (!userId) {
            return c.json({
                msg: "User ID is required",
            }, 400);
        }
        const cart = await prisma.cart.findMany({
            where: { 
                userId
            }
        });
        const cartId = cart[0].id;
        const cartItems = await prisma.cartItem.findMany({
            where :{ 
                cartId : cartId
            },
            include :{
                product :true
            }
        })
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
    } 
});


// to get all the cartitems using customerorderId
allcartoptionrouter.get('/cartItem/:cartId', async (c) => {
    const prisma = new PrismaClient({
         //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const cartId = c.req.param('cartId');

        if (!cartId) {
            return c.json({
                msg: "cartId is required",
            }, 400);
        }

        const cartItems = await prisma.cartItem.findMany({
            where: {
                cartId : cartId
            }
        });

        return c.json({
            msg: "Cart items fetched successfully for uplading to  the customer ordered product ",
            cartItems,
        });
    } catch (error : any) {
        console.error("Error fetching cart items: ", error);
        return c.json({
            msg: "Error fetching cart items",
            error: error.message || error,
        }, 500);
    } 
});




// delete all the cart items using userid
allcartoptionrouter.delete('/clear/:userId', async (c) => {
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const userId = c.req.param('userId');

        await prisma.cartItem.deleteMany({
            where: { cart: { userId } },
        });

        return c.json({
            msg: "Cart cleared successfully",
        });
    } catch (error : any) {
        console.error("Error clearing cart: ", error);
        return c.json({
            msg: "Error clearing cart",
            error: error.message || error,
        }, 500);
    }
});


//to add the item to cart 
allcartoptionrouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();

        if (!body.productId || !body.cartId) {
            return c.json({
                msg: "Invalid input data",
                error: "productId and cartId are required."
            }, 400); 
        }
//Here add code if someone added the same product then one should noly exists and the questity should get increased 
        const cartItem = await prisma.cartItem.create({
            data: {
                productId: body.productId,
                cartId: body.cartId,
                quantity: body.quantity,
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
        }, 500); 
    } 
});




//delete a single cartitem of the cart 

allcartoptionrouter.delete('/:id', async (c) => {
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
    } 
});
;

allcartoptionrouter.put('/:cartitemId', async (c) => {
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        // Extract cartItemId from the URL parameter
        const cartItemId = c.req.param('cartitemId');
        // Parse request body
        const body = await c.req.json();
        
        // Validate the quantity field
        if (!body.quantity || typeof body.quantity !== 'number') {
            return c.json( {error: 'Invalid quantity provided'} , 400);
        }

        // Update the cart item in the database
        const updatedCartItem = await prisma.cartItem.update({
            where: { id: cartItemId },
            data: { quantity: body.quantity },
        });

        // Return the updated cart item as a response
        return c.json({ message: 'Cart item updated successfully', data: updatedCartItem });
    } catch (error: any) {
        // Handle errors gracefully
        console.error('Error updating cart item:', error);
        
        if (error.code === 'P2025') { // Prisma's "Record not found" error
            return c.json({ error: 'Cart item not found' }, 404);
        }
        

        
        // General error handler
        return c.json({
            msg :"Invalid quantity provided"
        },400);

    }
});




//  get the cartiem and add its data to the customerordered product.
allcartoptionrouter.post('/cartItemtoorderproduct', async (c) => {
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();

        if (!body?.cartId || !body?.customerorderId) {
            return c.json(
                {
                    msg: "cartId and customerorderId are required",
                },
                400
            );
        }

        // Fetch cart items
        const cartitemsData = await prisma.cartItem.findMany({
            where: {
                cartId: body.cartId,
            },
        });

        if (cartitemsData.length === 0) {
            return c.json({
                msg: "No items found for the provided cartId",
            });
        }

        // Create customer order products
        const results = await Promise.allSettled(
            cartitemsData.map((item) =>
                prisma.customer_order_product.create({
                    data: {
                        customerOrderId: body.customerorderId,
                        quantity: item.quantity,
                        productId: item.productId,
                    },
                })
            )
        );

        // Process results
        const successful = results.filter((result) => result.status === "fulfilled").length;
        const failed = results.filter((result) => result.status === "rejected");

        if (failed.length > 0) {
            console.error("Failed operations:", failed);
        }

        return c.json({
            msg: `${successful} items uploaded successfully. ${failed.length} failed.`,
            cartitemsData,
        });
    } catch (error: any) {
        console.error("Error processing cart items:", error);
        return c.json(
            {
                msg: "Error processing cart items",
                error: error.message || error,
            },
            500
        );
    }
});




//get the status weather a product is in the cart or not for toggle the cart btn

allcartoptionrouter.post('/check/:userId', async (c) => {
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const userId = c.req.param('userId');
        console.log("USER ID:", userId);

        const { productId } = await c.req.json(); // Extract productId from the request body

        if (!userId) {
            return c.json({
                msg: "User ID is required.",
                isincart: false,
            }, 400);
        }

        if (!productId) {
            return c.json({
                msg: "Product ID is required.",
                isincart: false,
            }, 400);
        }

        const cart = await prisma.cart.findUnique({
            where: { userId },
            include: {
                items: true, // Ensure the `items` relation is included
            },
        });

        if (!cart || !cart.items) {
            return c.json({
                isincart: false,
                msg: "No cart or items found for this user.",

            });
        }

        // Check if the product exists in the cart's items
        const cartItemExists = cart.items.some(item => item.productId === productId);

        return c.json({
            cartId : cart.id,
            isincart: cartItemExists,
            msg: cartItemExists
                ? "Product is in the cart."
                : "Product is not in the cart.",
        });
    } catch (error: any) {
        console.error("Error fetching cart items:", error);
        return c.json({
            msg: "An error occurred while fetching cart items.",
            error: error.message || error,
        }, 500);
    }
});


