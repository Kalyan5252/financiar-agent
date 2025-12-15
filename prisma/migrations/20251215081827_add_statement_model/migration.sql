/*
  Warnings:

  - You are about to drop the column `date` on the `Transaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[provider,providerTxnId]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `direction` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionDate` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransactionDirection" AS ENUM ('INCOME', 'EXPENSE');

-- CreateEnum
CREATE TYPE "TransactionProvider" AS ENUM ('PHONEPE', 'GPAY', 'PAYTM', 'BANK', 'MANUAL');

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "date",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'INR',
ADD COLUMN     "direction" "TransactionDirection" NOT NULL,
ADD COLUMN     "provider" "TransactionProvider" NOT NULL,
ADD COLUMN     "providerTxnId" TEXT,
ADD COLUMN     "transactionDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "utr" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_provider_providerTxnId_key" ON "Transaction"("provider", "providerTxnId");
