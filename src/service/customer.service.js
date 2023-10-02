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
}

export default new customerService()