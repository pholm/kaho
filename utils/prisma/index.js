import { PrismaClient } from '@prisma/client';

/** @type {PrismaClient} */
let prisma;

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}

prisma.$connect();
export default prisma;
