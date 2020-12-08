import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import fs = require('fs');

@Injectable()
export class CronjobService {
    constructor(

    ){}

    @Cron(CronExpression.EVERY_DAY_AT_9AM)
    Run10pm(){
        try{
            fs.rmdirSync('../pdfs/propuestas', {recursive: true});
        }catch(err){
            console.error(err);
        }
        try {
            fs.mkdirSync('../pdfs/propuestas');
        } catch (error) {
            console.log(error);
        }
        try{
            fs.rmdirSync('../pdfs/quejas', {recursive: true});   
        }catch(err){
            console.error(err);
        }
        try {
            fs.mkdirSync('../pdfs/quejas');
        } catch (error) {
            console.log(error);
        }
        try{
            fs.rmdirSync('../pdfs/reportes', {recursive: true});   
        }catch(err){
            console.error(err);
        }
        try {
            fs.mkdirSync('../pdfs/reportes');
        } catch (error) {
            console.log(error);
        }
    }
}
