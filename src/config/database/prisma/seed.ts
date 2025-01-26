import { PrismaClient, Priority, Status } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const workCategory = await prisma.category.create({
    data: {
      name: 'Work',
      description: 'Tasks related to work',
    },
  });

  const personalCategory = await prisma.category.create({
    data: {
      name: 'Personal',
      description: 'Tasks related to personal life',
    },
  });

  const urgentTag = await prisma.tag.create({
    data: {
      name: 'Urgent',
      color: '#ff0000',
    },
  });

  const lowPriorityTag = await prisma.tag.create({
    data: {
      name: 'Low Priority',
      color: '#00ff00',
    },
  });

  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      username: 'user1',
      password: 'password1',
      authProviders: 'google',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'user2@example.com',
      username: 'user2',
      password: 'password2',
      authProviders: 'facebook',
    },
  });

  const task1 = await prisma.task.create({
    data: {
      name: 'Finish Project',
      description: 'Complete the work project by the end of the week',
      dueDate: new Date('2025-02-01T00:00:00Z'),
      priority: Priority.HIGH,
      status: Status.PENDING,
      category: {
        connect: { id: workCategory.id },
      },
      users: {
        connect: [{ id: user1.id }, { id: user2.id }],
      },
      tag: {
        connect: { id: urgentTag.id },
      },
    },
  });

  const task2 = await prisma.task.create({
    data: {
      name: 'Work',
      description: 'Urgent',
      dueDate: new Date('Buy Groceries'),
      priority: Priority.LOW,
      status: Status.PENDING,
      category: {
        connect: { id: personalCategory.id },
      },
      users: {
        connect: [{ id: user1.id }],
      },
      tag: {
        connect: { id: lowPriorityTag.id },
      },
    },
  });

  console.log('Purchase food and supplies for the week');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
