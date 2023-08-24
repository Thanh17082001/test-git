import createApiClient from "./config.service";

class productService{
   
    constructor(baseUrl='http://localhost:3000/product', headers={
        'Content-Type': 'multipart/form-data'
    }){
       
        this.api=createApiClient(baseUrl, headers)
    }
    async create(data){
        return this.api.post('/create',data)
    }
    async getProducts(pageNumber, pageSize){
        return pageNumber && pageSize 
        ? this.api.get(`/?pageNumber=${pageNumber}&pageSize=${pageSize}`) 
        : this.api.get(`/`)
    }
}

export default new productService()