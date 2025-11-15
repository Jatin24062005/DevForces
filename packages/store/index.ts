// prisma-client.ts
import { PrismaClient } from './generated/prisma' // prefer official types
import { withAccelerate } from '@prisma/extension-accelerate'

// Bun automatically loads .env files, so no need for dotenv.config()
// If using Node.js, you'll need to load dotenv before importing this file

const prisma = new PrismaClient().$extends(withAccelerate())

export default prisma