import * as moment from 'moment'
import { environment } from '../../environments/environment';
export namespace Engine {
    export const momentToDateFormat = (momentObj: moment.Moment, format: string) => {
        if (!moment.isMoment(momentObj) || !format) {
            return
        }
        switch (format.toLowerCase()) {
            case 'mm/dd/yyyy':
                return momentObj.format('MM/DD/YYYY')
            case 'dd/mm/yyyy':
                return momentObj.format('DD/MM/YYYY')
            case 'yyyy/mm/dd':
                return momentObj.format('YYYY/MM/DD')
            case 'mm-dd-yyyy':
                return momentObj.format('MM-DD-YYYY')
            case 'dd-mm-yyyy':
                return momentObj.format('DD-MM-YYYY')
            case 'yyyy-mm-dd':
                return momentObj.format('YYYY-MM-DD')
            case 'MM/YYYY':
                return momentObj.format('MM/YYYY')
            default:
                return momentObj.format('YYYY/MM/DD')
        }
    }

    export const convertTime = (time, fromFormat, toFormat) => {
        switch (toFormat.toLowerCase()) {
            case 'mm/dd/yyyy':
                return moment(time, fromFormat).format('MM/DD/YYYY')
            case 'dd/mm/yyyy':
                return moment(time, fromFormat).format('DD/MM/YYYY')
            case 'yyyy/mm/dd':
                return moment(time, fromFormat).format('YYYY/MM/DD')
            case 'mm-dd-yyyy':
                return moment(time, fromFormat).format('MM-DD-YYYY')
            case 'dd-mm-yyyy':
                return moment(time, fromFormat).format('DD-MM-YYYY')
            case 'yyyy-mm-dd':
                return moment(time, fromFormat).format('YYYY-MM-DD')
            case 'mm/yyyy':
                return moment(time, fromFormat).format('MM/YYYY')
            default:
                return moment(time, fromFormat).format('YYYY/MM/DD')
        }
    }

    export const stringToMoment = (time: string, format: string): moment.Moment => {
        return moment(time, format)
    }

    export const clearUserData = () => {
        localStorage.removeItem(environment.authenTokenKey);
        localStorage.removeItem(environment.authenUserKey);
    };

    export const clearInterval = () => {
      for(let i=0; i<10000; i++) {
        window.clearInterval(i);
      }
    };


}
