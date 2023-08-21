import createApiClient from "./config.service";

class userService{
    constructor (baseUrl= "http://localhost:3000/user" ){
        this.api = createApiClient(baseUrl)
    }
    async register(data){
        return await this.api.post('/register', data)
    }
    async login(data){
        return await this.api.post('/login',data)
    }
    async logout(){
        return await this.api.get('/logout')
    }
    async getInfo(){
        return await this.api.get('/info-user')
    }
    async forget(email){
        return await this.api.post('/forget', email)
    }
    async confirm(data){
        return await this.api.post('/confirm-pass', data)
    }
    async reset(data){
        return await this.api.post('/reset-pass',data)
    }
}

export default new userService();