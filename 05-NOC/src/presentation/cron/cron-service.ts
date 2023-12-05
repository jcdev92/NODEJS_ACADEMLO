import { CronJob } from 'cron';

type CronTime = string | Date;
type OnTick = () => void;

export class CronService {
    static createJob(cronTime: CronTime, onTick: OnTick): CronJob {
        
        const job = new CronJob(cronTime, onTick);
        job.start() //? is optional when the fourth parameter set to true.
        return job;
    }
}