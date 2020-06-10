<template>
    <div class="cards">
        <h2>Current Page:  <input type="text" v-model="currentPage" @change="callCards"></h2>
        <h4>Find for name: <input type="text" v-model="findCards"></h4>
        <div loading v-if="loading">
            <div item-loading v-for="(item, index) in 10" :key="'load-' + index" ><span></span></div>
        </div>
        <div card-list v-if="!loading">
            <div card-item v-for="(card, index) in cardList" :key="'card-' + index">
                <h4>Name:{{ card.name }}</h4>
                <p>Collection: {{ card.set_name }}</p>
                <p>Lang: {{ card.lang }}</p>
                <img :src="(card.image_uris['normal']) ? card.image_uris['normal'] : '/images/default.jpg'" :alt="card.name">
                <!-- <CardPreview :data-image="(card.imageUrl) ? card.imageUrl : '/images/default.jpg'">
                    <h1 slot="header">{{ card.name }}</h1>
                    <p slot="content">{{ card.originalText }}</p>
                </CardPreview> -->
            </div>
        </div>
        <input type="text" v-model="currentPage" @change="callCards">
        
        <div pagination>
            <span>Max Page: {{ perPage }}</span>
            <span @click="prevPage">Prev</span>
            <span @click="nextPage">Next</span>
        </div>
    </div>
</template>

<script>
import CardPreview from '@/components/CardPreview.vue'

export default {
    name: 'CardsList',
    components: {
        CardPreview
    },
    data () {
        return {
            cardList: [],
            loading: true,
            pageCount: 20,
            perPage: 0,
            findCards: null,
            setSelected: 'Ikoria',

            currentPage: 1,
        }
    },
    props: {
        card: String
    },
    mounted () {
        this.callCards();
    },
    methods: {
        callCards() {
            const self = this;
            this.loading = true;

            this.$http.get(`https://api.scryfall.com/cards?page=${this.currentPage}`).then((response) => {
                this.perPage = parseInt(response.data['total_cards']);
                this.cardList = response.data.data;
                this.loading = false;
                console.log(response)
            }).catch(function (error) {
                console.log(error);
                self.loading = false;
            })
        },
        paginationAction(pageNum) {
            this.currentPage = pageNum;
            console.log(pageNum)
            this.callCards();
        },
        nextPage() {
            this.currentPage = (this.currentPage > this.perPage ? this.perPage : this.currentPage += 1);
            this.callCards();
        },
        prevPage() {
            this.currentPage = (this.currentPage <= 1 ? 1 : this.currentPage -= 1); 
            this.callCards();
        },
    }
}
</script>

<style scoped lang="scss">
    .cards{
        display: block;

        [card-list]{
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;

            [card-item]{
                width: 19.5%;
                padding:0 10px;
                box-sizing: border-box;
                transition:0.15s ease-in-out;

                img{
                    width:100%;
                    // &:hover{
                    //     transform: scale(1.3);
                    //     transition:0.3s ease-in-out;
                    //     z-index:100;
                    // }
                }
            }
        }
    }
    [loading]{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;

        [item-loading]{
            width: 19.5%;
            padding:0 10px;
            margin-bottom:20px;
            box-sizing: border-box;

            span{
                // background-image:url('/images/card_loading.gif');
                // background-position: center;
                // background-repeat: no-repeat;
                // background-size:cover;
                width: 100%;
                height: 0px;
                display:block;
                padding-top:141%;
                position: relative;
                border-radius: 15px;
                overflow: hidden;

                background: linear-gradient(-45deg, #f1f1f1, #cecece);
                background-size: 400% 400%;
                animation: gradient 15s ease infinite;
            }
        }

        @keyframes gradient {
            0% {
                background-position: 0% 50%;
            }
            50% {
                background-position: 100% 50%;
            }
            100% {
                background-position: 0% 50%;
            }
        }
    }
</style>