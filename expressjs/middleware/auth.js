import jwt from 'jsonwebtoken';

export const auth = async (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json("Please login to access this resource");
    }
    const user = jwt.verify(token, process.env.JWT_KEY);
    req.user = user;
    next();
}
