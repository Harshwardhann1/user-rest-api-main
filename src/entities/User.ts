import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['email']) 
export class User {
    checkPassword(password: any) {
      throw new Error('Method not implemented.');
    }
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;
    
    @Column()
    contact: string;

    @Column()
    password: string;
}
