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
}

export default new userService();