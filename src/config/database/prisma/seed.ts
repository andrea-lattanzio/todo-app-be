import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create Categories
  const categories = await prisma.category.createMany({
    data: [
      { id: 'cat-1', name: 'Work', description: 'Tasks related to work' },
      {
        id: 'cat-2',
        name: 'Personal',
        description: 'Personal to-dos and goals',
      },
      {
        id: 'cat-3',
        name: 'Fitness',
        description: 'Health and fitness-related tasks',
      },
    ],
  });

  console.log('Categories created:', categories);

  // Create Tags
  const tags = await prisma.tag.createMany({
    data: [
      { id: 'tag-1', name: 'Urgent', color: '#FF0000' },
      { id: 'tag-2', name: 'Important', color: '#FFA500' },
      { id: 'tag-3', name: 'Optional', color: '#008000' },
    ],
  });

  console.log('Tags created:', tags);

  // Create Users
  const user1 = await prisma.user.create({
    data: {
      id: 'user-1',
      email: 'user1@example.com',
      username: 'user1',
      password: 'password123',
      authProviders: 'local',
      tasks: {
        create: [
          {
            id: 'task-1',
            name: 'Complete project report',
            description: 'Write and submit the quarterly report',
            dueDate: new Date('2025-02-01T12:00:00Z'),
            priority: 'HIGH',
            status: 'IN_PROGRESS',
            categories: {
              connect: [{ id: 'cat-1' }],
            },
            tags: {
              connect: [{ id: 'tag-1' }],
            },
          },
          {
            id: 'task-2',
            name: 'Buy groceries',
            description: 'Buy milk, bread, and vegetables',
            dueDate: new Date('2025-01-28T18:00:00Z'),
            priority: 'MEDIUM',
            status: 'PENDING',
            categories: {
              connect: [{ id: 'cat-2' }],
            },
            tags: {
              connect: [{ id: 'tag-3' }],
            },
          },
        ],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      id: 'user-2',
      email: 'user2@example.com',
      username: 'user2',
      password: 'securepassword456',
      authProviders: 'local',
      tasks: {
        create: [
          {
            id: 'task-3',
            name: 'Morning run',
            description: 'Run 5km in the morning',
            dueDate: new Date('2025-01-30T06:00:00Z'),
            priority: 'CRITICAL',
            status: 'PENDING',
            categories: {
              connect: [{ id: 'cat-3' }],
            },
            tags: {
              connect: [{ id: 'tag-2' }],
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
