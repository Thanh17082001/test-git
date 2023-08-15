import createApiClient from "./config.service";

class userService{
    constructor (baseUrl= "http://localhost:3000/user" ){
        this.api = createApiClient(baseUrl)
    }
}

export default new userService();