import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validateEmail } from '../validation/emailValidator';
import { validatePassword } from '../validation/passwordValidator';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../entities/User';

export class UserController {
  /* static getAll = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    const users = await userRepository.find();
    res.send(users);
  }; */


  // http://localhost:3000/api/users?page=2&pageSize=10

  static getAll = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    try {
      const skip = (page - 1) * pageSize;
      const [users, total] = await userRepository.findAndCount({
        skip: skip,
        take: pageSize,
        select: ["id", "name", "email", "contact"]
      });
      res.send({
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
        users,
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).send({ message: 'Error fetching users' });
    }
  };

  static login = async (req: Request, res: Response) => {
    console.log('log in')
    
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
      where: { email: req.body.email , password: req.body.password},       
    });
    console.log(user);

   
    const [userResult] = await userRepository.find({
      select: ["id", "name", "email", "contact"],
    })
    console.log(userResult) 
    if (!user) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }
    
      const token = jwt.sign({email: userResult.email, id: userResult.id}, process.env.JWT_SECRET as string , { expiresIn: '1h' } );
      console.log(token)
      res.send({...userResult, token });
  }

  static create = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    const { name, email, contact, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required." });
      return;
  }
  if (!validateEmail(email)) {
      res.status(400).json({ error: "Invalid email address." });
      return;
  }
  if (!validatePassword(password)) {
      res.status(400).json({ error: "Password must be at least 8 characters long." });
      return;
  }
    const user = userRepository.create({ name, email, contact, password });   
    const result = await userRepository.save(user);
    res.send({ id: result.id, 
      name: result.name, 
      email: result.email, 
      contact: result.contact,
    })

  };

  static getUsersByName = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
  
    try {
      const name = req.params.name;
      const users = await userRepository.find({
        where: { name: name },
        select: ["id", "name", "email", "contact"],
      });
  
      if (users.length > 0) {
        res.send(users);
      } else {
        res.status(404).send({ message: 'No users found with that name' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  };

  static update = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
      where: { id: parseInt(req.params.id) },
    });
    const [userResult] = await userRepository.find({
      select: ["id", "name", "email", "contact"],
    })
    if (user) {
      userRepository.merge(user, req.body);
      const result = await userRepository.save(user);
      res.send(userResult);
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  };

  static delete = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
      where: { id: parseInt(req.params.id) },
    });
    if (user) {
      await userRepository.remove(user);
      res.send({ message: 'User deleted successfully' });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  };
}
