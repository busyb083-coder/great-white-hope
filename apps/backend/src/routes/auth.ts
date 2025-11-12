import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const router = express.Router()

// Mock admin user (in production, query from database)
const ADMIN_USER = {
  id: 1,
  email: 'admin@greatwhitehope.com',
  password: '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/1Ou', // Admin@123456
  name: 'Admin User',
  role: 'admin',
}

// Login endpoint
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    // Check if user exists
    if (email !== ADMIN_USER.email) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, ADMIN_USER.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: ADMIN_USER.id,
        email: ADMIN_USER.email,
        role: ADMIN_USER.role,
      },
      process.env.JWT_SECRET || 'your-secret-key-change-this',
      { expiresIn: '24h' }
    )

    // Return token and user info
    res.json({
      token,
      user: {
        id: ADMIN_USER.id,
        email: ADMIN_USER.email,
        name: ADMIN_USER.name,
        role: ADMIN_USER.role,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Verify token endpoint
router.post('/verify', (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
      return res.status(401).json({ message: 'No token provided' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-this')
    res.json({ valid: true, user: decoded })
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' })
  }
})

export default router
