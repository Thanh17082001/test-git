import createApiClient from "./config.service";

class statisticalService{
    constructor(baseUrl = 'http://localhost:3000/site') {
        this.api = createApiClient(baseUrl);
    }

    async revenueYear(year){
        return await this.api.get(`/revenue-year/?year=${year}`)
    }

    async revenuemonth(month,year){
        return await this.api.get(`/revenue-month/?year=${year}&month=${month}`)
    }

    async expenseYear(year){
        return await this.api.get(`/expense-year/?year=${year}`)
    }

    async expensemonth(month,year){
        return await this.api.get(`/expense-month/?year=${year}&month=${month}`)
    }
}

export default new statisticalService()