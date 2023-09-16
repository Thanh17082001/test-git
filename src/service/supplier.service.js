import createApiClient from "./config.service";

class supplierService{
    constructor(baseUrl='http://localhost:3000/supplier'){
        this.api=createApiClient(baseUrl)
    }
    async create(data){
        return await this.api.post('/create', data)
    }

    async getAll(pageNumber, pageSize){
        return pageNumber && pageSize 
            ? await this.api.get(`/?pageNumber=${pageNumber}&pageSize=${pageSize}`)
            : await this.api.get('/')
    }

    // async getById(id){
    //     return await this.api.get(`/entry-id/?id=${id}`)
    // }
}

export default new supplierService()