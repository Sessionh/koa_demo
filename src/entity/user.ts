/*
 * @Author: huyh
 * @Github: 
 * @Date: 2019-05-31 18:04:58
 * @LastEditors: huyh
 * @LastEditTime: 2019-06-14 17:03:01
 * @description: user表 实体类
 */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, RelationId } from 'typeorm';
import { Length, IsEmail } from 'class-validator';
import {Photo} from './photo'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 80
    })
    @Length(10, 80)
    name: string;

    @Column({
        length: 100
    })
    @Length(10, 100)
    @IsEmail()
    email: string;

   
    @OneToMany(type => Photo, photo => photo.User) // 备注：下面会为Photo创建author属性
    photos: Photo[];


    @RelationId((user: User) => user.photos)
    platId: number;


}