import { Prisma } from '@prisma/client';

export const taskWithTagsAndCategories =
  Prisma.validator<Prisma.TaskDefaultArgs>()({
    include: {
      user: {
        select: {
          email: true,
        },
      },
      tags: {
        omit: {
          createdAt: true,
        },
      },
      categories: {
        select: {
          name: true,
          description: true,
        },
      },
    },
  });

export const taskWithSelectedFields =
  Prisma.validator<Prisma.TaskDefaultArgs>()({
    include: {
      categories: {
        select: {
          name: true,
        },
      },
      tags: {
        select: {
          name: true,
          color: true,
        },
      },
      user: {
        select: {
          email: true,
        },
      },
    },
  });
