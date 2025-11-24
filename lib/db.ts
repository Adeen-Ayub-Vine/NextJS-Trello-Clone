import { PrismaClient } from "@prisma/client";

declare global {
  // This ensures we reuse the client in development so that we don't create too many connections.

  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
