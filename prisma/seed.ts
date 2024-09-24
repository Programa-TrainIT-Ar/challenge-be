import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Crear usuarios
  const user = await prisma.user.upsert({
    where: { email: 'javier@mail.com' },
    update: {},
    create: {
        email: "javier@mail.com",
        password: "contraseña",
        first_name: "javier",
        last_name: "brizuela",
        gender: "male",
        phone_number: "2615575553",
        is_superuser: true,
        birthdate: "1976-06-05T14:30:00Z",
    },
  });

  console.log({ user });
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