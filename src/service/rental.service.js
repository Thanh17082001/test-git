import createApiClient from "./config.service";

class rentalService{
    constructor(baseUrl='http://localhost:3000/rental'){
        this.api=createApiClient(baseUrl)
    }

    async create(data){
        return await this.api.post('/create',data)
    }
    async getAll(pageNumber, pageSize){
        return pageNumber&&pageSize 
            ? await this.api.get(`/?pageNumber=${pageNumber}&pageSize=${pageSize}`)
            : await this.api.get('/')
    }
    async paymentVNPAY (url,data){
        return await this.api.post(`/create_payment_url/?url=${url}`,data)
    }
    async paymentMOMO (url,data){
        return await this.api.post(`/pay-momo/?url=${url}`,data)
    }
    async getById(id){
        return await this.api.get(`/find/?id=${id}`)
    }
    async updateByCod(id){
        return await this.api.get(`/update-cod/?id=${id}`)
    }
    async search(data){
        return await this.api.post(`/search/`,data)
    }
    async update(id,data){
        return this.api.post(`/update/?id=${id}`,data)
    }

    async filterByDate(day, month, year, field, pageNumber, pageSize) {
        return await this.api.get(`/filter-date/?pageNumber=${pageNumber}&pageSize=${pageSize}&field=${field}&month=${month}&day=${day}&year=${year}`);
    }
}

export default new rentalService()