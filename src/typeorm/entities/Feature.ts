import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'Blog Posts'})
export class Feature {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    createdAt: Date;

    @Column( {nullable: true})
    updatedAt: Date;


}