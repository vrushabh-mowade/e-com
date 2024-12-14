import { Hono } from "hono";
import { Prisma, PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

export const wishlistrouter = new Hono();



//posting the wishlist
wishlistrouter.post('/',async (c)=>{
    const prisma = new PrismaClient({
            //@ts-ignore
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());
    try {

        const body = await c.req.json();
        const wishlist = await prisma.wishlist.create({
            data:{
                productId:body.productId,
                userId:body.userId,
            }
        })
        if(wishlist){
            c.status(200)
            return c.json({
                msg:"product add to wishlist"
            })
        }
        
    } catch (error) {
        console.error("Error adding product to wishlist", error);
        c.status(500);
        return c.json({ error: "Error adding product to wishlist" })
        
    }

})

//delete wishlist single it  using userid and product id
wishlistrouter.delete('/:userid/:productid',async (c)=>{
    const prisma = new PrismaClient({
            //@ts-ignore
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());
    try {
        const userId =  c.req.param('userid');
        const productId =  c.req.param('productid');
        const deletedwishlistitem = await prisma.wishlist.deleteMany({
            where:{
                userId : userId,
                productId : productId
            }
        })
        
        if(deletedwishlistitem){
            c.status(200)
            return c.json({
                msg:"product removed from wislist"
            })

        }
    } catch (error) {
        console.error("Error removing from wishlist", error);
        c.status(500);
        return c.json({ error: "Error removing from wishlist" })
        
    }

})

//delete all wishlist using userid
wishlistrouter.delete('/:id',async (c)=>{
    const prisma = new PrismaClient({
            //@ts-ignore
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());
    try {
        const userid = await c.req.param('id');
        const deletedallwishlist = await prisma.wishlist.findMany({
            where:{
                id:userid
            }
        })
        
        if(deletedallwishlist){
            c.status(200)
            return c.json({
                msg:"product removed from wislist"
            })

        }
    } catch (error) {
        console.error("Error removing all from wishlist", error);
        c.status(500);
        return c.json({ error: "Error removing all from wishlist" })
        
    }

})


//get the product using userid and productid
wishlistrouter.get('/:userid/:productid',async (c)=>{
    const prisma = new PrismaClient({
            //@ts-ignore
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());
    try {
        const productId  = await c.req.param('productid');
        const userId  = await c.req.param('userid');
        const product = await prisma.wishlist.findMany({
            where:{
                userId :userId,
                productId :productId
            },
            include:{
                product : true
            }
            
        })
        
        if(product){
            c.status(200)
            return c.json({
                product :product
            })

        }
        
    } catch (error) {
        console.error("Error getting the wishlisted product", error);
        c.status(500);
        return c.json({ error: "Error getting the wishlisted product" })
        
    }

})

// get all wishlist using userID
wishlistrouter.get('/:id',async (c)=>{
    const prisma = new PrismaClient({
            //@ts-ignore
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());
    try {
        const userid = await c.req.param('id');
        const allwishlistofuserid = await prisma.wishlist.findMany({
            where:{
                id:userid
            },
            include:{
                product:true
            }
        })
        
        if(allwishlistofuserid){
            c.status(200)
            return c.json({
                msg:"product removed from wislist"
            })

        }
        
    } catch (error) {
        console.error("Error getting all the wishlist", error);
        c.status(500);
        return c.json({ error: "Error getting all the wishlist" })
        
    }

})

//get all the wishlist 
wishlistrouter.get('/:id',async (c)=>{
    const prisma = new PrismaClient({
            //@ts-ignore
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());
    try {
        const allwishlist = await prisma.wishlist.findMany({
            include:{
                product:true
            }
            
        })
        
        if(allwishlist){
            c.status(200)
            return c.json({
                wishlists : allwishlist
            })

        }
        
    } catch (error) {
        console.error("Error getting all the wishlist", error);
        c.status(500);
        return c.json({ error: "Error getting all the wishlist" })
        
    }

})
