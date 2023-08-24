import createApiClient from "./config.service";

class brandService{
   
    constructor(baseUrl='http://localhost:3000/brand', headers={
        'Content-Type': 'multipart/form-data'
    }){
       
        this.api=createApiClient(baseUrl, headers)
    }
    async create(data){
        return await this.api.post('/create',data)
    }
    async getAll(){
        return await this.api.get('/')
    }
}

export default new brandService()