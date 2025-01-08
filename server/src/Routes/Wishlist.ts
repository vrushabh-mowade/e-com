import { Hono } from "hono";
import { Prisma, PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

export const wishlistrouter = new Hono();

//one route remaining
//posting the wishlist
//check done 
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
                msg:"product add to wishlist",
                wishlistId :wishlist.id
            })
        }
        
    } catch (error) {
        console.error("Error adding product to wishlist", error);
        c.status(500);
        return c.json({ msg : "Error adding product to wishlist",
            error :error
        })
        
    }

})

//delete  single  wishlist   using userid and product id
//check done
//used for the wishlisttoggler
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
//done check
wishlistrouter.delete('/:id',async (c)=>{
    const prisma = new PrismaClient({
            //@ts-ignore
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());
    try {
        const userid = await c.req.param('id');
        const deletedallwishlist = await prisma.wishlist.deleteMany({
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

//for wishlist toggler 
wishlistrouter.get('/toggler/:userid/:productid', async (c) => {
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const userId = c.req.param('userid');
        const productId = c.req.param('productid');

        // Debug log
        console.log("UserID:", userId, "ProductID:", productId);

        const wishlistexists = await prisma.wishlist.findFirst({
            where: {
                productId: productId.trim(),
                userId: userId.trim(),
            },
        });

        // Debug log for query result
        console.log("Query Result:", wishlistexists);

        if (!wishlistexists) {
            return c.json({ msg: "No wishlist exists for the product", inwishlist: false });
        }

        c.status(200);
        return c.json({ inwishlist: true });

    } catch (error) {
        console.error("Error getting the wishlisted product", error);
        c.status(500);
        return c.json({ error: "Error getting the wishlisted product" });
    }
});

  
// wishlistrouter.get('/toggler/:userid/:productid',async (c)=>{
//     const prisma = new PrismaClient({
//             //@ts-ignore
//             datasourceUrl: c.env?.DATABASE_URL,
//         }).$extends(withAccelerate());
//     try {
//         const userId  =  c.req.param('userid');
//         const productId  =  c.req.param('productid');
//         const wishlistexists = await prisma.wishlist.findFirst({
//             where:{
//                 id:productId,
//                 userId:userId
//             }
//         });
//         if(!wishlistexists){
//             return c.json({msg : "no wishlist exists on the product" , inwishlist : false})
//         }

//         c.status(200)
//             return c.json({
//                 inwishlist :true
//             })
        
//     } catch (error) {
//         console.error("Error getting the wishlisted product", error);
//         c.status(500);
//         return c.json({ error: "Error getting the wishlisted product" })
        
//     }

// })


//get the product using userid and productid  
 //returns [] after deletion of product also
wishlistrouter.get('/:userid/:productid',async (c)=>{
    const prisma = new PrismaClient({
            //@ts-ignore
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());
    try {
        const userId  =  c.req.param('userid');
        const productId  =  c.req.param('productid');
        const wishlistexists = await prisma.wishlist.findUnique({
            where:{
                id:productId
            }
        });
        if(!wishlistexists){
            return c.json({msg : "no wishlist exists on the product" , inwishlist : false} ,{status :404})
        }
        const product = await prisma.wishlist.findUnique({
            where:{
                id : wishlistexists.id,
                userId :userId,
                productId :productId
            },
            include:{
                product : true
            }
            
        })
        
        if(!product){
            c.status(404)
            c.json({
                msg : "no wishlist found"
            })
        }
        c.status(200)
            return c.json({
                product :product,
                inwishlist :true
            })
        
    } catch (error) {
        console.error("Error getting the wishlisted product", error);
        c.status(500);
        return c.json({ error: "Error getting the wishlisted product" })
        
    }

})

// get all wishlist using userID
//check done
wishlistrouter.get('/:id',async (c)=>{
    const prisma = new PrismaClient({
            //@ts-ignore
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());
    try {
        const userid = await c.req.param('id');
        console.log("u",userid)
        const allwishlistofuserid = await prisma.wishlist.findMany({
            where:{
                userId:userid
            },
            include:{
                product:true
            }
        })
        console.log("u",allwishlistofuserid)
        if(!allwishlistofuserid){
            c.status(404)
            return c.json({
                msg : 'error getting the wishlist using userid'
            })
        }
        
        if(allwishlistofuserid){
            c.status(200)
            return c.json({
                msg : allwishlistofuserid
            })
        }
        
    } catch (error) {
        console.error("Error getting all the wishlist", error);
        c.status(500);
        return c.json({ error: "Error getting all the wishlist" })
        
    }

})

//get all the wishlist 
 //check done
wishlistrouter.get('/',async (c)=>{
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
