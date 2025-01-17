-- AlterTable
ALTER TABLE "Customer_order" ADD COLUMN     "paymentStatus" TEXT NOT NULL DEFAULT 'unpaid',
ALTER COLUMN "status" SET DEFAULT 'pending';
