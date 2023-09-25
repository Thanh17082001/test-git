import createApiClient from "./config.service";

class typeAccService{
    constructor(baseUrl='http://localhost:3000/type-acc'){
        this.api=createApiClient(baseUrl)
    }

    async create(data){
        return await this.api.post('/create',data)
    }
    async getAll(){
        return await this.api.get('/')
    }
}

export default new typeAccService()