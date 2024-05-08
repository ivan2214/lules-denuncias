import {PrismaClient} from "@prisma/client";

import {createManyComplaints} from "./createManyComplaints";

const prismaDb = new PrismaClient();

async function main() {
  await createManyComplaints();
}

main()
  .then(async () => {
    await prismaDb.$disconnect();
  })
  .catch(async (e: unknown) => {
    console.error(e);
    await prismaDb.$disconnect();
    process.exit(1);
  });
