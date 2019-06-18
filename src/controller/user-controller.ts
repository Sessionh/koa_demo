/*
 * @Author: huyh
 * @Github: 
 * @Date: 2019-05-31 18:04:58
 * @LastEditors: huyh
 * @LastEditTime: 2019-06-14 19:56:23
 * @description: user表 controller
 */
import { BaseContext } from 'koa';
import { getManager, Repository, Not, Equal } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { User } from '../entity/user';

export default class UserController {
    
    /**
     * @description: 查询 user表 数据
     * @param {type} 
     * @return: 
     */
    public static async getUsers (ctx: BaseContext) {

        const userRepository: Repository<User> = getManager().getRepository(User);
        const users: User[] = await userRepository.find({relations: ['photos']});

        ctx.status = 200;
        ctx.body = users;
    }

  }
