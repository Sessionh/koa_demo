import * as Koa from 'koa';
import { config } from './config';
import * as winston from 'winston';

export function logger(winstonInstance) {
    return async(ctx: Koa.Context, next: () => Promise<any>) => {

        const start = new Date().getMilliseconds();

        await next();

        const ms = new Date().getMilliseconds() - start;

        let logLevel: string;
        if (ctx.status >= 500) {
            logLevel = 'error';
        }
        if (ctx.status >= 400) {
            logLevel = 'warn';
        }
        if (ctx.status >= 100) {
            logLevel = 'info';
        }

        const msg: string = `${ctx.method} ${ctx.originalUrl} ${ctx.status} ${ms}ms`;          

        const formatter = winston.format.combine(
          winston.format.json(),
          winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          winston.format.printf(info => {
            // 输出格式
            // TODO message字段是Symbol对象，对于error级的日志，需要遍历message的Symbol拿到error对象
            const showInfo = { time: info.timestamp, pid: process.pid, level: info.level, message: info.message};
            return JSON.stringify(showInfo)
          })
        )

        winstonInstance.configure({
            level: config.debugLogging ? 'debug' : 'info',
            transports: [
                //
                // - Write all logs error (and below) to `error.log`.
                new winston.transports.File({ filename: 'error.log', level: 'error', format: formatter }),

                new winston.transports.Console({ format: formatter})
            ]
        });

        winstonInstance.log(logLevel, msg);
    };
}


// const winston = require('winston')
// const { format } = winston
// const { combine, timestamp, json } = format

// const _getToday = (now = new Date()) => `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`

// const rotateMap = {
//   'hourly': 'YYYY-MM-DD-HH',
//   'daily': 'YYYY-MM-DD',
//   'monthly': 'YYYY-MM'
// }

// module.exports = (dirPath = './', rotateMode = '') => {

//   if (!~Object.keys(rotateMap).indexOf(rotateMode)) rotateMode = ''

//   let accessTransport
//   let combineTransport

//   if (rotateMode) {
//     require('winston-daily-rotate-file')

//     const pid = process.pid

//     dirPath += '/pid_' + pid + '_' + _getToday() + '/'

//     const accessLogPath = dirPath + 'access-%DATE%.log'
//     const combineLogPath = dirPath + 'combine-%DATE%.log'

//     const datePattern = rotateMap[rotateMode] || 'YYYY-MM'

//     accessTransport = new (winston.transports.DailyRotateFile)({
//       filename: accessLogPath,
//       datePattern: datePattern,
//       zippedArchive: true,
//       maxSize: '1g',
//       maxFiles: '30d'
//     })

//     combineTransport = new (winston.transports.DailyRotateFile)({
//       filename: combineLogPath,
//       datePattern: datePattern,
//       zippedArchive: true,
//       maxSize: '500m',
//       maxFiles: '30d'
//     })
//   }

//   const options = {
//     // 我们在这里定义日志的等级
//     levels: { error: 0, warning: 1, notice: 2, info: 3, debug: 4 },
//     format: combine(
//       timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' })
//     ),
//     transports: rotateMode ? [
//       combineTransport
//     ] : []
//   }

//   // 开发环境，我们将日志也输出到终端，并设置上颜色
//   if (process.env.NODE_ENV === 'development') {
//     options.format = combine(
//       timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
//       winston.format.colorize(),
//       json()
//     )

//     // 输出到终端的信息，我们调整为 simple 格式，方便看到颜色；
//     // 并设置打印 debug 以上级别的日志（包含 debug）
//     options.transports.push(new winston.transports.Console({
//       format: format.simple(), level: 'debug'
//     }))
//   }

//   winston.loggers.add('access', {
//     levels: { access: 0 },
//     level: 'access',
//     format: combine(
//       timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
//       json()
//     ),
//     transports: rotateMode ? [
//       accessTransport
//     ] : []
//   })

//   const logger = winston.createLogger(options)

//   return {
//     logger: logger,
//     accessLogger: winston.loggers.get('access')
//   }
// }








// export function logger(winston) {

//   return async(ctx: Koa.Context, next: () => Promise<any>) => {

//     const start = new Date().getMilliseconds();

//       await next();

//       const ms = new Date().getMilliseconds() - start;

//       let logLevel: string;
//       if (ctx.status >= 500) {
//           logLevel = 'error';
//       }
//       if (ctx.status >= 400) {
//           logLevel = 'warn';
//       }
//       if (ctx.status >= 100) {
//           logLevel = 'info';
//       }

//       const msg: string = `${ctx.method} ${ctx.originalUrl} ${ctx.status} ${ms}ms`;  

//     // const winston = require('winston');
//     require('winston-daily-rotate-file')

//     // 错误信息日志
//     const ERROR_LOG_NAME = './logs/error.log';

//     // 所有运行日志
//     const APP_LOG_NAME = './logs/app-%DATE%.log'
//     // 保存天数
//     const SAVE_DAYS = '14d'

//     // 日志级别
//     const levels = {
//       error: 0,
//       warn: 1,
//       info: 2,
//       verbose: 3,
//       debug: 4,
//       silly: 5
//     }

//     // 格式化输出内容
//     const formatter = winston.format.combine(
//       winston.format.json(),
//       winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
//       winston.format.printf(info => {
//         // 输出格式
//         // TODO message字段是Symbol对象，对于error级的日志，需要遍历message的Symbol拿到error对象
//         const showInfo = { time: info.timestamp, pid: process.pid, level: info.level, message: info.message};
//         return JSON.stringify(showInfo)
//       })
//     )
//     winston.createLogger({
//       levels: levels,
//       format: formatter,
//       transports: [
//         // 'error'级别的日志处理
//         new winston.transports.File({ 
//           level: 'info',
//           filename: ERROR_LOG_NAME
//         }),
//         // '所有的日志处理, maxFiles是回滚时间，超时会删除旧文件，如果不设置，则不会删除'
//         new (winston.transports.DailyRotateFile)({
//           filename: APP_LOG_NAME,
//           zippedArchive: true,
//           maxFiles: SAVE_DAYS
//         }),
//         // 控制台输出
//         new winston.transports.Console({logLevel, msg})
//       ]
//     });

//     // winston.log(logLevel, msg);



//   }

  

// };




