import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const basePrisma = new PrismaClient()

// Middleware to automatically set expiresAt to 10 minutes from now when creating OTP
basePrisma.$use(async (params, next) => {
  if (params.model === 'OTP' && params.action === 'create') {
    // Set expiresAt to 10 minutes from now if not provided
    if (!params.args.data.expiresAt) {
      params.args.data.expiresAt = new Date(Date.now() + 10 * 60 * 1000)
    }
  }
  
  if (params.model === 'OTP' && params.action === 'createMany') {
    // Handle createMany case
    if (params.args.data && Array.isArray(params.args.data)) {
      params.args.data = params.args.data.map((item: any) => {
        if (!item.expiresAt) {
          item.expiresAt = new Date(Date.now() + 10 * 60 * 1000)
        }
        return item
      })
    } else if (params.args.data && !params.args.data.expiresAt) {
      params.args.data.expiresAt = new Date(Date.now() + 10 * 60 * 1000)
    }
  }

  return next(params)
})

// Apply extension after middleware
export const prisma = basePrisma.$extends(withAccelerate())