import moment from "moment";

export const parseTime = (createdAt: string) => {
    const now = moment();
    const createdTime = moment(createdAt);

    if(createdTime.isSame(now, 'day')) {
        return 'Today'
    }

    if(createdTime.isSame(now.subtract(1, 'days'), 'day')) {
        return 'Yesterday'
    }

    if(createdTime.isAfter(moment().subtract(6, 'days'), 'day')) {
        return createdTime.fromNow()
    }

    return createdTime.format('DD-MM-YYYY');
}