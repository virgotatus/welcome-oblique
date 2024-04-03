-- CreateTable
CREATE TABLE "Liandanlu" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "locale" VARCHAR(32) NOT NULL DEFAULT 'zh',
    "city" VARCHAR(255) NOT NULL,
    "thing" VARCHAR(255) NOT NULL,
    "oblique" VARCHAR(255) NOT NULL,
    "style" VARCHAR(255) NOT NULL,
    "answer" TEXT,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Liandanlu_pkey" PRIMARY KEY ("id")
);
