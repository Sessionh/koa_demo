import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, RelationId} from 'typeorm'
import {User} from './user'

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 80
    })
    imgUrl: string;

    @Column()
    title: string;
   
   
    @ManyToOne(type => User, author => author.photos)
    User: User;

    

}