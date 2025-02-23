-- AlterTable
ALTER TABLE "Customer_order" ADD COLUMN     "cartId" TEXT,
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "Customer_order" ADD CONSTRAINT "Customer_order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
