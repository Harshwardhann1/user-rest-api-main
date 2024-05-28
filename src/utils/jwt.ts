// // import jwt, { JwtPayload } from 'jsonwebtoken';
// // import dotenv from 'dotenv';
// // dotenv.config();

// // import { Request, Response, NextFunction } from 'express';

// // interface User {
// //   email: string;
// //   id: number;
// // }

// // // Define a custom interface that extends the existing Request interface
// // interface AuthenticatedRequest extends Request {
// //   user?: JwtPayload;
// // }

// // function generateAccessToken(user: User): string {
// //   const payload = {
// //     email: user.email,
// //     id: user.id
// //   };

// //   const secret = process.env.JWT_SECRET as string;
// //   console.log(secret)
// //   const options: jwt.SignOptions = { expiresIn: '1h' };
// //   const token = jwt.sign(payload, secret, options);
// //   return token;
// // }


// // function verifyAccessToken(token: string): { success: boolean; data?: JwtPayload; error?: string } {
// //   const secret = process.env.JWT_SECRET as string;

// //   try {
// //     const decoded = jwt.verify(token, secret) as JwtPayload;
// //     return { success: true, data: decoded };
// //   } catch (error) {  
// //     return { success: false, error: 'Invalid token' };
// //   }
// // }




// // export {
// //   generateAccessToken,
// //   verifyAccessToken,
// // };


// import jwt, { JwtPayload } from 'jsonwebtoken';
// import dotenv from 'dotenv';
// import { User } from '../entities/User';
// dotenv.config();



// function generateAccessToken(email: string, id: number): string {
    
//     const secret = process.env.JWT_SECRET as string;
//     const options: jwt.SignOptions = { expiresIn: '1h' };
  
//     return token;
//   }


//   function verifyAccessToken(token: string): { success: boolean; data?: JwtPayload; error?: string } {
//     const secret = process.env.JWT_SECRET as string;
  
//     try {
//       const decoded = jwt.verify(token, secret) as JwtPayload;
//       return { success: true, data: decoded };
//     } catch (error) {   
//       return { success: false, error: 'Invalid token' };
//     }
//   }

//   export {
//     generateAccessToken,
//     verifyAccessToken,
//   };