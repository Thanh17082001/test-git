import createApiClient from "./config.service";

class companyService{
    constructor(baseUrl='http://localhost:3000/company', headers={
        'Content-Type': 'multipart/form-data'
    }){
       
        this.api=createApiClient(baseUrl, headers)
    }

    async get(){
        return await this.api.get('/')
    }

    async update(id, data){
        return await this.api.post(`/update/?id=${id}`, data)
    }
}

export default new companyService()