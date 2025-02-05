import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}



// Extender el objeto Request para incluir la información del usuario
declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload;
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // Obtenemos el token del encabezado Authorization
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // Si no hay token, retornamos un error
  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
  }

  try {
    // Verificamos el token usando la clave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    // Asignamos el usuario decodificado a req.user
    req.user = decoded;

    // Continuamos con la siguiente función de middleware o controlador
    next();
  } catch (err) {
    // Si el token no es válido o ha expirado
    return res.status(403).json({ message: 'Token no válido o expirado.' });
  }
};
