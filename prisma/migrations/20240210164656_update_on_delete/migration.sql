-- DropForeignKey
ALTER TABLE "votes" DROP CONSTRAINT "votes_pollOptionId_fkey";

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_pollOptionId_fkey" FOREIGN KEY ("pollOptionId") REFERENCES "poll_options"("id") ON DELETE CASCADE ON UPDATE CASCADE;
