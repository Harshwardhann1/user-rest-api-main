import jwt, { JwtPayload } from 'jsonwebtoken';
function verifyToken(req: any, res: any, next: any) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: 'No Authorization header provided' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).send({ message: 'Invalid token' });
    }
}

export {verifyToken}