import createApiClient from "./config.service";

class newsService{
    constructor(baseUrl='http://localhost:3000/task'){
       
        this.api=createApiClient(baseUrl)
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
    async changeTime(id, data){
        return await this.api.post(`/change-time/?id=${id}`, data)
    }
    async filterByDate(day, month, year, field, pageNumber, pageSize) {
        if(pageNumber && pageSize){
            return await this.api.get(`/filter-date/?pageNumber=${pageNumber}&pageSize=${pageSize}&field=${field}&month=${month}&day=${day}&year=${year}`);
        }
        else{
        return await this.api.get(`/filter-date/?field=${field}&month=${month}&day=${day}&year=${year}`);

        }
    }
    async updateStatus(id, data){
        return this.api.post(`/update-status/?id=${id}`, data)
    }
    async delete(id){
        return await this.api.get(`/delete/?id=${id}`)
    }
    async report(id, data){
        const baseUrl='http://localhost:3000/task'
        const headers={
        'Content-Type': 'multipart/form-data'
        }
        this.api=createApiClient(baseUrl,headers)

        return await this.api.post(`/report/?id=${id}`, data)
    }
}

export default new newsService()