import createApiClient from "./config.service";

class userService{
    constructor (baseUrl= "http://localhost:3000/user",headers={
        'Content-Type': 'multipart/form-data'
    } ){
        this.api = createApiClient(baseUrl, headers)
    }
    
    async register(data){
        const headers=undefined
        const baseUrl= "http://localhost:3000/user"
        this.api=createApiClient(baseUrl,headers)
        return await this.api.post('/register', data)
    }
    async login(data){
        const headers=undefined
        const baseUrl= "http://localhost:3000/user"
        this.api=createApiClient(baseUrl,headers)
        return await this.api.post('/login',data)
    }
    async logout(){
        return await this.api.get('/logout')
    }
    async getInfo(){
        return await this.api.get('/info-user')
    }
    async forget(email){
        const headers=undefined
        const baseUrl= "http://localhost:3000/user"
        this.api=createApiClient(baseUrl,headers)
        return await this.api.post('/forget', email)
    }
    async confirm(data){
        const headers=undefined
        const baseUrl= "http://localhost:3000/user"
        this.api=createApiClient(baseUrl,headers)
        return await this.api.post('/confirm-pass', data)
    }
    async reset(data){
        const headers=undefined
        const baseUrl= "http://localhost:3000/user"
        this.api=createApiClient(baseUrl,headers)
        return await this.api.post('/reset-pass',data)
    }
    async getAll(data,pageNumber, pageSize){
        const headers=undefined
        const baseUrl= "http://localhost:3000/user"
        this.api=createApiClient(baseUrl,headers)
        return pageNumber&&pageSize 
            ? this.api.post(`/?pageNumber=${pageNumber}&pageSize=${pageSize}`, data)
            : this.api.post('/', data)
    }
    async filterByDate(day,month,year,field,pageNumber,pageSize){
        return await this.api.get(`/filter-date/?pageNumber=${pageNumber}&pageSize=${pageSize}&field=${field}&month=${month}&day=${day}&year=${year}`)
    }

    async updateUser(id, data){
        return await this.api.post(`/disable/${id}`,data)
    }

    async updateRole(id,data){
        return await this.api.post(`/update-role/?id=${id}`,data)
    }

    async changeInfo(data){
        const headers={
            'Content-Type': 'multipart/form-data'
        }
        const baseUrl= "http://localhost:3000/user"
        this.api=createApiClient(baseUrl,headers)
        return await this.api.post('/update', data)
    }
    async changePass(data){
        const headers=undefined
        const baseUrl= "http://localhost:3000/user"
        this.api=createApiClient(baseUrl,headers)
        return await this.api.post('change-pass',data)
    }
}

export default new userService();