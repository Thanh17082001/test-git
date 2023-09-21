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
    async getProductsCustomer(pageNumber, pageSize, type, field){
        return this.api.get(`/?pageNumber=${pageNumber}&pageSize=${pageSize}&type=${type}&field=${field}`) 
    }
    // async filtersProducts(pageNumber, pageSize){
    //     return pageNumber && pageSize 
    //     ? this.api.get(`/?pageNumber=${pageNumber}&pageSize=${pageSize}`) 
    //     : this.api.get(`/`)
    // }
    async getProductById(id){
        return await this.api.get(`/get-id/?id=${id}`)
    }
    async update(id,data){
        return await this.api.post(`/update/?id=${id}`, data)
    }
    async getProductDetail(id){
        return (await this.api.get(`/product-detail/?id=${id}`)).data
    }
    async filterProduct(type, field, pageNumber, pageSize){
        return await this.api.get(`/filter/?type=${type}&field=${field}&pageNumber=${pageNumber}&pageSize=${pageSize}`)
    }
    async search(searchValue, pageNumber, pageSize){
        const headers=undefined
        const baseUrl= "http://localhost:3000/product"
        this.api=createApiClient(baseUrl,headers)
        const data={
            searchValue
        }
        return pageNumber && pageSize 
        ? this.api.post(`/search/?pageNumber=${pageNumber}&pageSize=${pageSize}`, data) 
        : this.api.post('/search',  data) 
    }
    async exportExcel(data){
        const headers=undefined
        const baseUrl= "http://localhost:3000/product"
        this.api=createApiClient(baseUrl,headers)
        return await this.api.post('/export-excel', data, { responseType: 'blob' })
    }

    async exportPDF(data, pageDirection){
        console.log(pageDirection);
        const headers=undefined
        const baseUrl= "http://localhost:3000/product"
        this.api=createApiClient(baseUrl,headers)
        return await this.api.post(`/export-pdf/?pageDirection=${pageDirection}`, data, { responseType: 'blob' })
    }

    async filterByDate(day,month,year,field,pageNumber,pageSize){
        return await this.api.get(`/filter-date/?pageNumber=${pageNumber}&pageSize=${pageSize}&field=${field}&month=${month}&day=${day}&year=${year}`)
    }
}

export default new productService()