import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CronjobService {
    constructor(

    ){}

    @Cron(CronExpression.EVERY_DAY_AT_10PM)
    Run10pm(){
        console.log('Ejecucion de Cronjob');
        

    }
}
