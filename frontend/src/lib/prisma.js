const prisma = {
  product: {
    findMany: async () => [],
    findUnique: async () => null,
  },
  chatSession: {
    findUnique: async () => null,
    findFirst: async () => null,
    findMany: async () => [],
    create: async () => ({}),
    update: async () => ({}),
  },
  chatMessage: {
    create: async () => ({}),
  },
  medicine: {
    findMany: async () => [],
  }
};

export default prisma;
export { prisma };
