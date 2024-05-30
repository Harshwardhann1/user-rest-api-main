import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validateEmail } from "../validation/emailValidator";
import { validatePassword } from "../validation/passwordValidator";
import { validateContact } from "../validation/contactValidator";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";

export class UserController {
  static listing = async (req: Request, res: Response) => {
    try {
      let { filter, range, sort } = req.body;
      const userRepository = getRepository(User);

      let query = userRepository.createQueryBuilder("user");

      // this code is performing a search based on the filter
      query.where(
        "user.name LIKE :keyword OR user.contact LIKE :keyword OR user.email LIKE :keyword",
        {
          keyword: `%${filter.search}%`, // Using filter.search as the keyword
        }
      );

      const page = range?.page ?? 1;
      const pageSize = range?.pageSize ?? 100;
      const skip = (page - 1) * pageSize;
      query.skip(skip).take(pageSize);

      // Handle sorting
      const orderBy = sort?.orderBy ?? "id";
      const order = sort?.order ?? "desc";
      query.orderBy(`user.${orderBy}`, order);

      const users = await query.getMany();

      const formattedUsers = users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        contact: user.contact,
      }));
      res.send(formattedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).send({ message: "Error fetching users" });
    }
  };

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
      res
        .status(400)
        .json({ error: "Password must be at least 8 characters long." });
      return;
    }
    if (!validateContact(contact)) {
      res.status(400).json({ error: "Invalid contact number." });
      return;
    }

    const user = userRepository.create({ name, email, contact, password });
    const result = await userRepository.save(user);
    res.send({
      id: result.id,
      name: result.name,
      email: result.email,
      contact: result.contact,
    });
  };

  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      return res.status(401).send({ message: "Invalid email or password" });
    }
    if(password === user.password) {
      const token = jwt.sign(
        { email: user.email, id: user.id },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );
      console.log(token)
      
      res.send({
        id: user.id,
        name: user.name,
        email: user.email,
        contact: user.contact,
        token
      });
      
    }
    // Compare passwords
    // const isPasswordValid = await bcrypt.compare(password, user.password); 
    // if (!isPasswordValid) {
    //   return res.status(401).send({ message: "Invalid email or password" });
    // }
    // Generate token
    // Send response with minimal user info and token
  };

  static update = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    const userId = req.body.id;
    const user = await userRepository.findOne({
      where: { id: userId },
    });
    if (user) {
      userRepository.merge(user, req.body);
      const result = await userRepository.save(user);
      res.send({id : result.id, name: result.name, email: result.email, contact: result.contact});
    } else {
      res.status(404).send({ message: "User not found" });
    }
  };

  static delete = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    const { id } = req.body;
    if (!id) {
      res.status(400).json({ error: "User ID is required." });
      return;
    }
    const user = await userRepository.findOne({
      where: { id: parseInt(id) },
    });
    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }
    const deleteUser = await userRepository.remove(user);
    res.send({ message: "User deleted successfully" });
  };
}
