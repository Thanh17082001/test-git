import createApiClient from "./config.service";

class cartService{
   
    constructor(baseUrl='http://localhost:3000/cart',){
        this.api=createApiClient(baseUrl)
    }
    async create(data){
        return await this.api.post('/create',data)
    }
    async getAll(){
        return await this.api.get('/')
    }
    async getByUserId(userId){
        return await this.api.get(`/user/?userId=${userId}`)
    }
    async update(userId,data){
        return await this.api.post(`/update/?userId=${userId}`,data)
    }
}

export default new cartService()