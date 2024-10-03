import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Crear usuarios
  const user1 = await prisma.user.upsert({
    where: { email: 'daniela@mail.com' },
    update: {},
    create: {
        email: "daniela@mail.com",
        password: "contraseña",
        first_name: "daniela",
        last_name: "soto",
        gender: "female",
        phone_number: "2615986267",
        is_superuser: true,
        birthdate: "1986-06-05T14:30:00Z",
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'javier@mail.com' },
    update: {},
    create: {
        email: "javier@mail.com",
        password: "contraseña",
        first_name: "javier",
        last_name: "brizuela",
        gender: "male",
        phone_number: "2615859635",
        is_superuser: true,
        birthdate: "1976-06-05T14:30:00Z",
    },
  });
}


main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });