import prisma from '../db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const getAll = async () => {
    return await prisma.user.findMany({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            password: false
        }
    })
}

export const create = async (user) => {
    const count = await prisma.user.count({
        where: {
            email: user.email
        }
    })
    if (count > 0) throw new Error('Email already exists')

    const encryptedPassword = bcrypt.hashSync(user.password, parseInt(process.env.BCRYPT_SALT_ROUNDS))

    return await prisma.user.create({
        data: {
            ...user,
            password: encryptedPassword
        },
        select: {
            id: true,
            email: true
        }
    })
}

export const login = async (email, password) => {
    const user = await prisma.user.findFirst({
        where: {
            email
        }
    })

    if (!user) throw new Error('User not found')

    // Not safe to returns this to end user
    if (!bcrypt.compareSync(password, user.password)) throw new Error('Invalid password')

    // Generate a token here
    return jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    })
}
