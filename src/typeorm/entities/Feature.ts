import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn } from 'typeorm';

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

    @Column( {nullable: true} )  // This is here because of the initial null error since this isn't filled unless the post has been updated.
    updatedAt: Date;

    // @Column( {nullable: true} ) // Todo fix the softdelete functionality
    // DeleteDate: false;

    @DeleteDateColumn({name: 'deletedAt', nullable: true})  // Implementation for soft delete
    deletedAt?: Date;
}