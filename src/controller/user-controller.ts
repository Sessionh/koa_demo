/*
 * @Author: huyh
 * @Github: 
 * @Date: 2019-05-31 18:04:58
 * @LastEditors: huyh
 * @LastEditTime: 2019-06-25 15:22:48
 * @description: user表 controller
 */
import { BaseContext } from 'koa';
import { getManager, Repository, getConnection } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { User } from '../entity/user';
// import {logger} from '../lib/logging'
// const { logger, accessLogger } = require('../lib/logging')('./', 'hourly')

export default class UserController {
    
    /**
     * @description: 查询 user表 数据
     * @param {type} 
     * @return: 
     */
    public static async getUsers (ctx: BaseContext) {

        // const userRepository: Repository<User> = getManager().getRepository(User);
        // const users: User[] = await userRepository.find({relations: ['photos']});

        let res = await ctx.query;
        console.log(res)
        let pageNumer = 1;
        let pageSize = 5;
       
        if (res.pageNumber) {
            pageNumer = res.pageNumber
        }
        if (res.pageSize) {
            pageSize = parseInt(res.pageSize) 
        }
        
        //页数
        let num = (Number(pageNumer) - 1)*pageSize;

        const users: User[] = await getManager().getRepository(User)
                .createQueryBuilder("user")
                .leftJoinAndSelect("user.photos", "photo")
                .skip(num)
                .take(pageSize)
                
                .getMany();
       
        ctx.status = 200;
        ctx.body = users;
    }

    public static async saveUsers(ctx: BaseContext) {
     
       
        let userRepository = getConnection().getRepository(User)
        let user = userRepository.create({ id: 7, name: "TimberTT1", email: "@SawTT1" })
        // let result = await userRepository.save(user)
        let result1 = await userRepository.update({id: 20},{name:'serve2'})
    
        ctx.body = result1
       

    }


  }
