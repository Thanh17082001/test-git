import createApiClient from "./config.service";

class entryReceiptService{
    constructor(baseUrl='http://localhost:3000/accessory'){
        this.api=createApiClient(baseUrl)
    }
    async create(data){
        const headers={
            'Content-Type': 'multipart/form-data'
        }
        const baseUrl= "http://localhost:3000/accessory"
        this.api=createApiClient(baseUrl,headers)
        return await this.api.post('/create', data)
    }

    async getAll(pageNumber, pageSize){
        return pageNumber && pageSize 
            ? await this.api.get(`/?pageNumber=${pageNumber}&pageSize=${pageSize}`)
            : await this.api.get('/')
    }

    async getById(id){
        return await this.api.get(`/find/?id=${id}`)
    }
    async update(id, data){
        const headers={
            'Content-Type': 'multipart/form-data'
        }
        const baseUrl= "http://localhost:3000/accessory"
        this.api=createApiClient(baseUrl,headers)
        return await this.api.post(`/update/?id=${id}`, data)
    }
    async filterByDate(day,month,year,field,pageNumber,pageSize){
        return await this.api.get(`/filter-date/?pageNumber=${pageNumber}&pageSize=${pageSize}&field=${field}&month=${month}&day=${day}&year=${year}`)
    }
}

export default new entryReceiptService()