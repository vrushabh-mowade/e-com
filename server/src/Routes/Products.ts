import { Hono } from 'hono';
import { Prisma, PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'


type Bindings = {
    DATABASE_URL: string,
    JWT_SECRET: string
}

export const productsrouter = new Hono<{ Bindings: Bindings }>();

// Uploading product image and data
productsrouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();
        const product = await prisma.product.create({
            data: {
                slug: body.slug,
                title: body.title,
                mainImage: body.mainImage,
                price: body.price,
                rating: body.rating,
                description: body.description,
                manufacturer: body.manufacturer,
                inStock: body.inStock,
                categoryId: body.categoryId
            }
        });
        c.status(200);
        return c.json({
            msg: "product added successfully",
        })
    } catch (error) {
        console.log("error creating the product");
        return c.json({
            msg: "error creating the product",
            error: error
        })

    }

});

// Updating product data or images
productsrouter.put('/:id', async (c) => {
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const id = c.req.param('id');
        const body = await c.req.json();

        const updatedData: Prisma.ProductUpdateInput = {
            ...(body.slug && { slug: body.slug }),
            ...(body.title && { title: body.title }),
            ...(body.mainImage && { mainImage: body.mainImage }),
            ...(body.price !== undefined && { price: body.price }),
            ...(body.rating !== undefined && { rating: body.rating }),
            ...(body.description && { description: body.description }),
            ...(body.manufacturer && { manufacturer: body.manufacturer }),
            ...(body.inStock !== undefined && { inStock: body.inStock }),
            ...(body.categoryId && { categoryId: body.categoryId }),
        };

        const updatedproduct = await prisma.product.update({
            where: {
                id: id
            },
            data: updatedData
        })

        if (updatedproduct) {
            c.status(200)
            return c.json({
                msg: "product details updated successfully",
            })
        }
    } catch (error) {
        c.status(404)
        return c.json({
            msg: "error updating the product",
            error: error
        })
    }

});


// Fetch product details by ID
productsrouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const id = c.req.param('id');
        const product = await prisma.product.findUnique({
            where: {
                id: id
            }
        });

        return c.json({
            product: product,
            msg: "product fetched successfully"
        })
    } catch (error) {
        c.status(404)
        return c.json({
            msg: "error getting the product",
            error: error
        })

    }
});

// Deleting a product
productsrouter.delete('/:id', async (c) => {
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const id = c.req.param('id');
        const deletedproduct = await prisma.product.delete({
            where: {
                id: id
            }
        });
        if(deletedproduct){
            c.status(200)
        return c.json({
            msg: "product deleted successfully",
        })
        }
    } catch (error) {
        c.status(404)
        return c.json({
            msg: "error deleting the product",
            error: error
        })
    }

});

// Get all products
productsrouter.get('/', async (c) => {
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const mode = c.req.query || "";
        if(!mode){
            try {
            
            } catch (error) {
                
            }
        }else{
            

        }
         
     

    } catch (error) {
        c.status(404)
        return c.json({
            msg: "error fetching all  the product",
            error: error
        })

    }

}); 



// seaching a product
productsrouter.get('/', async (c) => {
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const {query} = c.req.query();
        
        const products = await prisma.product.findMany({
            where:{
                OR:[
                    {
                        title:{
                            contains : query
                        },
                        description:{
                            contains :query
                        }
                    }
                    
                ]
            }
        });

        if(products){
            c.status(200)
            return c.json({
                msg:"query successfull",
                products :products
            })
        }

    } catch (error) {
        c.status(404)
        return c.json({
            msg: "error search the product",
            error: error
        })

    }

}); 
