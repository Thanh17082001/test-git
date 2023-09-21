import createApiClient from './config.service';

class staffService {
    constructor(baseUrl = 'http://localhost:3000/staff') {
        this.api = createApiClient(baseUrl);
    }

    async create(data) {
        const headers={
            'Content-Type': 'multipart/form-data'
        }
        const baseUrl= "http://localhost:3000/staff"
        this.api=createApiClient(baseUrl,headers)
        return await this.api.post('/create', data);
    }

    async getAll(pageNumber, pageSize) {
        return pageNumber && pageSize
            ? await this.api.get(`/?pageNummber=${pageNumber}&pageSize=${pageSize}`)
            : await this.api.get('/');
    }

    async update(id, data) {
        const headers={
            'Content-Type': 'multipart/form-data'
        }
        const baseUrl= "http://localhost:3000/staff"
        this.api=createApiClient(baseUrl,headers)
        return await this.api.post(`/update/?id=${id}`, data);
    }

    async filterByDate(day, month, year, field, pageNumber, pageSize) {
        return await this.api.get(`/filter-date/?pageNumber=${pageNumber}&pageSize=${pageSize}&field=${field}&month=${month}&day=${day}&year=${year}`);
    }
    async findById(id){
        return await this.api.get(`/find/?id=${id}`)
    }
}

export default new staffService();
