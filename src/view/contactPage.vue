<template>
    <div class="mb-5 mt-3">
        <h3 class=" text-uppercase text-primary mb-5">Liên hệ với chúng tôi</h3>
        <div class="container">
            <h2 class="text-uppercase fw-bold">{{company.name}}</h2>
            <div class="row text-start mt-3 contact">
                <div class="col">
                    <i class="fa-solid fa-phone"></i>
                    <span class="ms-2">{{ company.phone }}</span>
                    |
                </div>
                <div class="col-auto">
                    <i class="fa-solid fa-envelope"></i>
                    <span class="ms-2">{{ company.email  }}</span>
                    |
                </div>
                <div class="col-auto">
                    <i class="fa-solid fa-location-dot"></i>
                    <span class="ms-2">{{ company.address }}</span>
                    |
                </div>
                <div class="col">
                    <i class="fa-solid fa-clock"></i>
                    <span class="ms-2">7h-21h</span>
                </div>
            </div>
            <div class="map">
                <h3 class="mt-2 mb-3 text-uppercase">Vị trí công ty trên bản đồ</h3>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.025809211959!2d105.7566691746508!3d10.01472667278193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a08835780c108d%3A0x22d8a937e0a58ff3!2zNzEgxJAuIDMgVGjDoW5nIDIsIEjGsG5nIEzhu6NpLCBOaW5oIEtp4buBdSwgQ-G6p24gVGjGoSA5MDAwMCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1699004034070!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    </div>
</template>

<script>
import companyService from '@/service/company.service';
export default {
    data(){
        return {
            company:{}
        }
    }, methods:{
        async getCompany(){
            try {
                const response = await companyService.get()
                this.company=response.data[0]
            } catch (error) {
                console.log(error);
            }
        }
    }, 
    mounted(){
        this.getCompany()
    }
}
</script>

<style scoped>
.contact{
    font-size: 20px;
}
.contact i{
    color:#0e8388;
}
.map iframe{
    width: 100%;
    height: 500px;
}
</style>