import { Hono } from "hono";
import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const imagerouter = new Hono();

//everthing done
imagerouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    //@ts-ignore
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const { productId, url, altText } = await c.req.json();
    const image = await prisma.image.create({
      data: {
        productId,
        url,
        altText,
      },
    });

    if (!image) {
      c.status(404);
      return c.json({
        msg: "error uploading image",
      });
    }

    c.status(200);
    return c.json({
      msg: "upload the product image",
    });
  } catch (error) {
    console.error("Error is :", error);
    c.status(500);
    return c.json({ error: "Error uploading products image" });
  }
});


imagerouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    // @ts-ignore
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const productId = c.req.param("id");

    // Validate productId
    if (!productId) {
      return c.json(
        {
          msg: "Invalid product ID",
        },
        { status: 400 }
      );
    }

    // Fetch images
    const images = await prisma.image.findMany({
      where: {
        productId: productId,
      },
    });

    // Check if no images found
    if (images.length === 0) {
      return c.json(
        {
          msg: "No images found for the given product ID",
        },
        { status: 404 }
      );
    }

    // Optional: Return a flat array of URLs instead of full objects
    const imageUrls = images.map((image) => image.url);

    return c.json({
      images: imageUrls, // Or `images` if you want the full objects
    });
  } catch (error) {
    console.error("Error fetching images:", error);
    return c.json(
      {
        error: "Internal Server Error",
      },
      { status: 500 }
    );
  }
});

//done
// imagerouter.get("/:id", async (c) => {
//   const prisma = new PrismaClient({
//     //@ts-ignore
//     datasourceUrl: c.env?.DATABASE_URL,
//   }).$extends(withAccelerate());
//   try {
//     const productId = c.req.param("id");

//     const images = await prisma.image.findMany({
//         where: {
//             productId: productId
//         }
//     });

//     if (!images) {
//       return c.json(
//         {
//           msg: "error getting the image using productid",
//         },
//         { status: 400 }
//       );
//     }
//     return c.json({
//       images,
//     });
//   } catch (error) {
//     console.error("Error searching products:", error);
//     c.status(500);
//     return c.json({ error: "Error searching products" });
//   }
// });

//done
imagerouter.put("/:id", async (c) => {
  const prisma = new PrismaClient({
    //@ts-ignore
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const productId = c.req.param("id");
    const body = await c.req.json();
    const updatedimageinfo: Prisma.ProductUpdateInput = {
      ...(body.url && { url: body.url }),
      ...(body.productId && { productId: body.productId }),
      ...(body.altText && { altText: body.altText }),
    };

    const existingimage = await prisma.image.findFirst({
      where: {
        productId: productId,
      },
    });
    if (!existingimage) {
      return c.json({ msg: "product image not found" }, { status: 400 });
    }
    const image = await prisma.image.update({
      where: {
        id: existingimage.id,
        productId: existingimage.productId,
      },
      data: updatedimageinfo,
    });
    return c.json({
      images: image,
    });
  } catch (error) {
    console.error("Error updating image data:", error);
    c.status(500);
    return c.json({ error: "Error updating the image data" });
  }
});

//done
imagerouter.delete("/:id", async (c) => {
  const prisma = new PrismaClient({
    //@ts-ignore
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const id = c.req.param("id");
    const deletedimage = await prisma.image.deleteMany({
      where: {
        productId: id,
      },
    });
    if (deletedimage) {
      c.status(200);
      c.json({
        msg: "image deleted successfully",
      });
    }
  } catch (error) {
    console.error("Error deleting the image data:", error);
    c.status(500);
    return c.json({ error: "Error deleting the image data" });
  }
});

// i thik one more route needed
