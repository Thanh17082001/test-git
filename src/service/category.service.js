import createApiClient from "./config.service";

class categoryService{
    constructor(baseUrl='http://localhost:3000/category'){
        this.api=createApiClient(baseUrl)
    }

    async create(data){
        return await this.api.post('/create',data)
    }
    async getAll(){
        return await this.api.get('/')
    }
}

export default new categoryService()