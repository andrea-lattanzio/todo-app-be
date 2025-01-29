import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.category.createMany({
    data: [
      { name: 'Work', description: 'Tasks related to work' },
      { name: 'Personal', description: 'Personal tasks and errands' },
      { name: 'Hobbies', description: 'Hobby-related tasks' },
    ],
    skipDuplicates: true,
  });

  await prisma.tag.createMany({
    data: [
      { name: 'Urgent', color: '#FF0000' },
      { name: 'Important', color: '#FFA500' },
      { name: 'Optional', color: '#008000' },
    ],
    skipDuplicates: true,
  });

  const user1 = await prisma.user.create({
    data: {
      email: 'johndoe@example.com',
      password: 'password123',
      authProviders: 'email',
      tasks: {
        create: [
          {
            name: 'Finish Report',
            description: 'Complete the Q1 financial report',
            dueDate: new Date('2025-02-10'),
            priority: 'HIGH',
            status: 'IN_PROGRESS',
            categories: {
              connect: [{ name: 'Work' }],
            },
            tags: {
              connect: [{ name: 'Urgent' }],
            },
          },
          {
            name: 'Grocery Shopping',
            description: 'Buy fruits, vegetables, and snacks',
            dueDate: new Date('2025-01-30'),
            priority: 'MEDIUM',
            status: 'PENDING',
            categories: {
              connect: [{ name: 'Personal' }],
            },
            tags: {
              connect: [{ name: 'Optional' }],
            },
          },
        ],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'janedoe@example.com',
      password: 'securepassword',
      authProviders: 'email',
      tasks: {
        create: [
          {
            name: 'Learn Guitar',
            description: 'Practice guitar chords and a new song',
            dueDate: new Date('2025-02-05'),
            priority: 'LOW',
            status: 'PENDING',
            categories: {
              connect: [{ name: 'Hobbies' }],
            },
            tags: {
              connect: [{ name: 'Optional' }],
            },
          },
        ],
      },
    },
  });

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
