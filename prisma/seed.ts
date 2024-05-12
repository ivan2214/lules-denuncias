import {PrismaClient} from "@prisma/client";

import {createManyComplaints} from "./createManyComplaints";
import {createManyUsers} from "./createManyUsers";
import {createManyCategories} from "./createManyCategories";

const prismaDb = new PrismaClient();

async function main() {
  const users = await createManyUsers();
  const categories = await createManyCategories();

  await createManyComplaints(users, categories);
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
