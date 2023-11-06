import createApiClient from "./config.service";
 class commentService{
    constructor(baseUrl='http://localhost:3000/comment', header={
        'Content-Type': 'multipart/form-data'
    }){
        this.api=createApiClient(baseUrl, header)
    }

    async getAll(pageNumber, pageSize){
        const headers=undefined
        const baseUrl= "http://localhost:3000/comment"
        this.api=createApiClient(baseUrl,headers)
        return pageNumber&&pageSize 
            ? await this.api.get(`/?pageNumber=${pageNumber}&pageSize=${pageSize}`)
            : await this.api.get('/')
    }
    async filterByDate(day, month, year, field, pageNumber, pageSize) {
        return await this.api.get(`/filter-date/?pageNumber=${pageNumber}&pageSize=${pageSize}&field=${field}&month=${month}&day=${day}&year=${year}`);
    }
    async findByIdProduct(data){
        const headers=undefined
        const baseUrl= "http://localhost:3000/comment"
        this.api=createApiClient(baseUrl,headers)
        return this.api.post(`/product-id`, data)
    }

    async create(data){
        const headers={
            'Content-Type': 'multipart/form-data'
        }
        const baseUrl= "http://localhost:3000/comment"
        this.api=createApiClient(baseUrl,headers)
        return await this.api.post('/create', data)
    }
    async update(id, data){
        return await this.api.post(`/update/?id=${id}`, data)
    }
    async getById(id){
        return await this.api.get(`/find/?id=${id}`)
    }
 }

 export default new commentService()