-- CreateTable
CREATE TABLE "RealEstate" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "priceCzk" INTEGER,
    "imgSrc" VARCHAR(255) NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "locality" VARCHAR(255) NOT NULL,

    CONSTRAINT "RealEstate_pkey" PRIMARY KEY ("id")
);
