import createApiClient from "./config.service";

class roleService{
    constructor(baseUrl='http://localhost:3000/role'){
        this.api=createApiClient(baseUrl)
    }

    async create(data){
        return await this.api.post('/create',data)
    }
    async getAll(){
        return await this.api.get('/')
    }
}

export default new roleService()