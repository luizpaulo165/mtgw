<template>
    <div search-card-page>
        <div loading v-if="loading && !emptyCard">
            <div item-loading v-for="(item, index) in 10" :key="'load-' + index" ><span></span></div>
        </div>
        <div empty-card v-if="emptyCard">
            No card found
        </div>
        <div info-return-cards v-if="!loading">
            <div info>
                <span>We finded <b>{{ cardShow.length }} {{ cardShow.length == 1 ? 'card' : 'cards' }}</b> where the name include {{ queryPage }}</span>
            </div>
        </div>
        <div card-list v-if="!emptyCard">
            <div card-item v-for="(card, index) in cardShow" :key="'card-' + index">
                <FlipCard v-if="card.card_faces" :value="card.card_faces"></FlipCard>
                <figure v-for="(item, e) in card.image_uris" :key="'img-' + e">
                    <img v-if="e == 'normal'" :src="item" alt="">
                </figure>
            </div>
        </div>
    </div>
</template>

<script>
import FlipCard from '@/components/FlipCard.vue'

export default {
    name: 'Search',
    components: {
        FlipCard
    },
    data () {
        return {
            cardShow: [],
            queryPage: null,
            loading: false,
            emptyCard: false,
            flipImg: false
        }
    },
    watch:{
        $route (to, from){
            this.loadingContent();
        }
    },
    mounted() {
        this.loadingContent();
    },
    methods: {
        loadingContent() {
            const self = this;
            this.queryPage = this.$route.query.q;
            this.loading = true;

            this.$http.get(`https://api.scryfall.com/cards/search?q=${this.queryPage}`).then((response) => {
                this.perPage = parseInt(response.data['total_cards']);
                this.cardShow = response.data.data;
                this.loading = false;
                self.emptyCard = false;
                console.log(this.cardShow)
            }).catch(function (error) {
                self.emptyCard = true;
                console.log(error);
            })
        }
    }
}
</script>

<style lang="scss">
    [search-card-page]{
        [card-list]{
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-wrap: wrap;
            padding:20px 0;
            box-sizing: border-box;

            [card-item]{
                width: 19.5%;
                padding:0 10px;
                margin-bottom:20px;
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
    [info-return-cards]{
        [info]{
            background:#d8d0d8;
            height:36px;
            display:flex;
            align-items: center;
            justify-content: flex-start;
            border-bottom:#dfdfdf;
            padding:0 1.5rem;
            box-sizing: border-box;

            span{
                font-size:14px;

                b{
                    font-weight:700;
                }
            }
        }
    }
    [loading]{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        padding:20px 0;

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
