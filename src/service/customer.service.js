import createApiClient from "./config.service";

class customerService{
    constructor(baseUrl='http://localhost:3000/customer'){
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

    async getById(id){
        return this.api.get(`/find/?id=${id}`)
    }

    async update(id, data){
        return this.api.post(`/update/?id=${id}`,data)
    }
}

export default new customerService()