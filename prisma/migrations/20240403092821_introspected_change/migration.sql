/*
  Warnings:

  - You are about to drop the `Liandanlu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/

ALTER TABLE IF EXISTS "Liandanlu" RENAME TO "Ideaplayer";
ALTER TABLE IF EXISTS "Post" RENAME TO "Ling";
