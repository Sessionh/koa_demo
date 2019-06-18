/*
 * @Author: huyh
 * @Github: 
 * @Date: 2019-06-06 14:47:52
 * @LastEditors: huyh
 * @LastEditTime: 2019-06-17 09:24:52
 * @description: photo 控制层
 */
import {BaseContext } from 'koa';
import {getManager, Repository} from 'typeorm'
import {Photo} from '../entity/photo';

export default class photoController {
   
    /**
     * @description: 查询图片的数据
     * @param {type} BaseContext
     * @return: 
     */
    public static async getPhotoList(ctx: BaseContext) {
        const photoReq: Repository<Photo> = getManager().getRepository(Photo);
        const photos: Photo[] = await photoReq.find();
        ctx.status = 200;
        ctx.body = photos;
    }
}

