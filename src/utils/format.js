class format{
     formatCurrency(price) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(price);
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('default', { dateStyle: 'short' }).format(date);
    }

}

export default new format()

