import createApiClient from "./config.service";
 class specificationsService{
    constructor(baseUrl='http://localhost:3000/spacification'){
        this.api=createApiClient(baseUrl)
    }

    async findByIdProduct(idProduct){
        return await this.api.get(`/product/?idProduct=${idProduct}`)
    }

    async create(data){
        return await this.api.post('/create', data)
    }
    async update(id, data){
        return await this.api.post(`/update/?id=${id}`, data)
    }
 }

 export default new specificationsService()