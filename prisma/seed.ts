import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create default admin user
  const hashedPassword = await bcrypt.hash("admin123", 12);

  await prisma.user.upsert({
    where: { email: "admin@pdm.org.pk" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@pdm.org.pk",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  // Seed team members
  const teamMembers = [
    {
      name: "Zertashia Jamal",
      designation: "Executive Chief Officer (ECO)",
      description:
        "Zertashia Jamal leads Pak Development Mission with a visionary approach to social development and community empowerment. With extensive experience in NGO management, she drives PDM's mission to uplift marginalized communities across Khyber Pakhtunkhwa.",
      order: 1,
    },
    {
      name: "Muhammad Faisal",
      designation: "Program Director",
      description:
        "Muhammad Faisal oversees all programmatic activities at PDM, ensuring quality implementation across health, education, livelihood, and emergency relief programs. His expertise spans community development and project management.",
      order: 2,
    },
    {
      name: "Ayesha Noor",
      designation: "Gender & Women Empowerment Lead",
      description:
        "Ayesha Noor champions gender equality and women's empowerment initiatives at PDM. She designs and implements programs that support women's rights, vocational training, and economic independence across KPK.",
      order: 3,
    },
    {
      name: "Imran Khan Afridi",
      designation: "Field Operations Manager",
      description:
        "Imran Khan Afridi manages PDM's field operations across Khyber Pakhtunkhwa and Newly Merged Districts. He coordinates volunteer networks and ensures effective delivery of relief and development programs.",
      order: 4,
    },
    {
      name: "Sana Gul",
      designation: "Monitoring & Evaluation Officer",
      description:
        "Sana Gul leads PDM's M&E department, developing monitoring frameworks and conducting evaluations to measure program impact. Her work ensures accountability and continuous improvement across all projects.",
      order: 5,
    },
    {
      name: "Tariq Mahmood",
      designation: "Finance Manager",
      description:
        "Tariq Mahmood manages PDM's financial systems with full transparency and adherence to international standards. He oversees budgeting, audits, and financial reporting to maintain donor trust and organizational integrity.",
      order: 6,
    },
  ];

  for (const member of teamMembers) {
    await prisma.teamMember.upsert({
      where: { id: member.name.replace(/\s+/g, "-").toLowerCase() },
      update: {},
      create: {
        id: member.name.replace(/\s+/g, "-").toLowerCase(),
        ...member,
      },
    });
  }

  // Seed events
  const events = [
    {
      title: "NFI Distribution for Kurram IDPs",
      description:
        "Non-Food Items distribution for internally displaced persons in Kurram District. PDM in collaboration with Quick Action Foundation KP and APWA KP will distribute clothes, medicines, and blankets to displaced families.",
      date: new Date("2026-05-15"),
      location: "Kurram District, Khyber Pakhtunkhwa",
      published: true,
    },
    {
      title: "Volunteer Training Workshop",
      description:
        "A comprehensive training workshop for our 200+ volunteer team members. Topics include emergency response, community mobilization, and field reporting techniques.",
      date: new Date("2026-05-25"),
      location: "Chamkani Tower, Peshawar",
      published: true,
    },
    {
      title: "Financial Literacy Program – Batch 2026",
      description:
        "Continuing our successful National Financial Literacy Program in collaboration with Zufash Consultants. Sessions will cover financial management, entrepreneurship, and banking basics for youth and community members.",
      date: new Date("2026-06-10"),
      location: "Multiple venues, Khyber Pakhtunkhwa",
      published: true,
    },
    {
      title: "Women Leadership Summit",
      description:
        "PDM's annual women leadership summit bringing together women entrepreneurs, professionals, and community leaders for networking, skill development, and mentorship opportunities.",
      date: new Date("2026-06-20"),
      location: "Abasyn University, Peshawar",
      published: true,
    },
    {
      title: "Khyber Excellence Awards 2026",
      description:
        "Celebrating outstanding youth achievements in Khyber Pakhtunkhwa. Applications open for young individuals in education, entrepreneurship, social work, arts, and innovation.",
      date: new Date("2026-07-05"),
      location: "Peshawar, Khyber Pakhtunkhwa",
      published: true,
    },
    {
      title: "Ramzan Relief Package Distribution",
      description:
        "Annual Ramzan food package distribution providing essential items including flour, cooking oil, pulses, rice, sugar to widows, orphans, and most needy families in Peshawar.",
      date: new Date("2026-03-01"),
      location: "District Peshawar",
      published: true,
    },
  ];

  for (const event of events) {
    await prisma.event.create({ data: event });
  }

  console.log("✅ Database seeded successfully!");
  console.log("👤 Admin credentials: admin@pdm.org.pk / admin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
