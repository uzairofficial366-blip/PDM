const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 12);

  await prisma.user.upsert({
    where: { email: "admin@pdm.org.pk" },
    update: { password: hashedPassword },
    create: {
      name: "Admin",
      email: "admin@pdm.org.pk",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("✅ Admin user created: admin@pdm.org.pk / admin123");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
