import createApiClient from "./config.service";

class newsService{
    constructor(baseUrl='http://localhost:3000/news', headers={
        'Content-Type': 'multipart/form-data'
    }){
       
        this.api=createApiClient(baseUrl, headers)
    }
    async create(data){
        return this.api.post('/create',data)
    }
    async getAll(pageNumber, pageSize){
        return pageNumber&&pageSize 
            ? await this.api.get(`/?pageNumber=${pageNumber}&pageSize=${pageSize}`)
            : await this.api.get('/')
    }
    async getById(id){
        return await this.api.get(`/find/?id=${id}`)
    }
    async update(id, data){
        return await this.api.post(`/update/?id=${id}`, data)
    }
    async filterByDate(day, month, year, field, pageNumber, pageSize) {
        return await this.api.get(`/filter-date/?pageNumber=${pageNumber}&pageSize=${pageSize}&field=${field}&month=${month}&day=${day}&year=${year}`);
    }

    async delete(id){
        return await this.api.get(`/delete/?id=${id}`)
    }
}

export default new newsService()