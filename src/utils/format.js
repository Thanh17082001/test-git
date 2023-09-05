class format{
     formatCurrency(price) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(price);
    }
    
    formatDateNoTime(dateString) {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('default', { dateStyle: 'medium'  }).format(date);
    }

    formatDate(dateString, config={ dateStyle: 'medium', timeStyle:'short'  }) {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('default', config).format(date);
    }

}

export default new format()

