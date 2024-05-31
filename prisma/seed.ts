import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  const todos = [];

  for (let i = 0; i < 1000; i++) {
    todos.push({
      title: faker.lorem.sentence(),
      completed: faker.datatype.boolean(),
    });
  }

  await prisma.todo.createMany({
    data: todos,
  });

  console.log("1000 todos have been created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
