// lib/prisma.ts
import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

function createPrismaClient() {
  if (process.env.DATABASE_URL?.includes('turso')) {
    const adapter = new PrismaLibSql({
      url: process.env.DATABASE_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
    return new PrismaClient({ adapter });
  }
  return new PrismaClient();
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();
export const db = prisma;  // ← Ajouter alias

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}