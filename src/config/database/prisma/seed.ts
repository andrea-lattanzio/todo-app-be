import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create Categories
  const categories = await prisma.category.createMany({
    data: [
      {
        id: 'f4b78945-c1d3-4d60-b1b2-3d53c4dfb708',
        name: 'Work',
        description: 'Tasks related to work',
      },
      {
        id: 'c1e36dbf-8f0a-4f63-880f-d8c3a4a1e5e5',
        name: 'Personal',
        description: 'Personal to-dos and goals',
      },
      {
        id: 'c998ea20-8672-4c58-9461-1ad6b5938c63',
        name: 'Fitness',
        description: 'Health and fitness-related tasks',
      },
    ],
  });

  console.log('Categories created:', categories);

  // Create Tags
  const tags = await prisma.tag.createMany({
    data: [
      {
        id: '9d0f3c7f-a5b2-4c77-993e-f71c4f50c8e7',
        name: 'Urgent',
        color: '#FF0000',
      },
      {
        id: '11b3d12a-04e4-48f8-8f8f-23154b7d9cd2',
        name: 'Important',
        color: '#FFA500',
      },
      {
        id: '3e6ab9a9-e86d-42d0-80fc-9b9d0477e6d3',
        name: 'Optional',
        color: '#008000',
      },
    ],
  });

  console.log('Tags created:', tags);

  // Create Users
  const user1 = await prisma.user.create({
    data: {
      id: 'da7a8a1f-0d2a-4f29-9c4f-f935c2af2f6f',
      email: 'user1@example.com',
      username: 'user1',
      password: 'password123',
      authProviders: 'local',
      tasks: {
        create: [
          {
            id: 'cfb86b2b-6f78-40d1-95f5-07df8d81a5d2',
            name: 'Complete project report',
            description: 'Write and submit the quarterly report',
            dueDate: new Date('2025-02-01T12:00:00Z'),
            priority: 'HIGH',
            status: 'IN_PROGRESS',
            categories: {
              connect: [{ id: 'f4b78945-c1d3-4d60-b1b2-3d53c4dfb708' }],
            },
            tags: {
              connect: [{ id: '9d0f3c7f-a5b2-4c77-993e-f71c4f50c8e7' }],
            },
          },
          {
            id: '1f98e3a9-593c-42f7-a924-ea2364f51c9e',
            name: 'Buy groceries',
            description: 'Buy milk, bread, and vegetables',
            dueDate: new Date('2025-01-28T18:00:00Z'),
            priority: 'MEDIUM',
            status: 'PENDING',
            categories: {
              connect: [{ id: 'c1e36dbf-8f0a-4f63-880f-d8c3a4a1e5e5' }],
            },
            tags: {
              connect: [{ id: '3e6ab9a9-e86d-42d0-80fc-9b9d0477e6d3' }],
            },
          },
        ],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      id: '9e7b42c1-6a96-40b5-a574-632fcb92d273',
      email: 'user2@example.com',
      username: 'user2',
      password: 'securepassword456',
      authProviders: 'local',
      tasks: {
        create: [
          {
            id: '2b4a5a2e-4c60-4f2b-885e-d8cfa7e79c1d',
            name: 'Morning run',
            description: 'Run 5km in the morning',
            dueDate: new Date('2025-01-30T06:00:00Z'),
            priority: 'CRITICAL',
            status: 'PENDING',
            categories: {
              connect: [{ id: 'c998ea20-8672-4c58-9461-1ad6b5938c63' }],
            },
            tags: {
              connect: [{ id: '11b3d12a-04e4-48f8-8f8f-23154b7d9cd2' }],
            },
          },
        ],
      },
    },
  });

  console.log('Users and their tasks created:', { user1, user2 });

  console.log('Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
