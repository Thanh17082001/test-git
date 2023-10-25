class format{
     formatCurrency(price) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(price);
    }
    
    formatDateNoTime(dateString) {
        const date = new Date(dateString);
        const utcDate = new Date(date.toISOString('en-US', { timeZone: 'UTC',setZone:'Asia/Ho_Chi_Minh' }));
        return new Intl.DateTimeFormat('default', { dateStyle: 'medium' }).format(utcDate);
    }

    formatDate(dateString, config={ dateStyle: 'medium', timeStyle:'short'  }) {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('default', config).format(date);
    }
    formatHour(dateString){
        const date = new Date(dateString);
        const hour = date.getHours();
        const minute = date.getMinutes();
        const timeString = hour + ":" + (minute < 10 ? "0" : "") + minute;
        return timeString
    }

}

export default new format()

