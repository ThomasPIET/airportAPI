import jwt from 'jsonwebtoken'

export default (req, res, next) => {
    let token = req.headers?.authorization // Get the token from the headers

    if (!token) {
        return res.status(401).json({ message: 'No token provided' }) // Return 401 if no token is provided
    }

    token = token.replace('Bearer ', '') // Remove the Bearer part from the token (it's a convention)

    try {
        // Verify the token using the secret key, if it's invalid it will throw an error
        // Add the user to the request object, to be used in the next controller
        req.user = jwt.verify(token, process.env.JWT_SECRET)
    } catch {
        return res.status(401).json({ message: 'Invalid token' }) // Return 401 if the token is invalid
    }

    next()
}
