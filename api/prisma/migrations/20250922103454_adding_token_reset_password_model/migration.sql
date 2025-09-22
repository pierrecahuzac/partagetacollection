-- CreateTable
CREATE TABLE "TokenResetPassword" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TokenResetPassword_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TokenResetPassword_token_key" ON "TokenResetPassword"("token");

-- CreateIndex
CREATE INDEX "TokenResetPassword_userId_idx" ON "TokenResetPassword"("userId");

-- CreateIndex
CREATE INDEX "TokenResetPassword_token_idx" ON "TokenResetPassword"("token");

-- AddForeignKey
ALTER TABLE "TokenResetPassword" ADD CONSTRAINT "TokenResetPassword_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
