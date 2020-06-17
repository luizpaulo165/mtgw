<template>
    <div>     
        <div info-return-cards>
            <div info>
                <span>Page: <b>{{ $route.query.page }}</b> | <b>{{ cardShow.length }} {{ cardShow.length == 1 ? 'card' : 'cards' }}</b> where the name include <i>"{{ queryPage }}"</i></span>
            </div>
            <div info>
                <Pagination :value="arrayCards" :maxPerPage="maxPerPage" :search="queryPage" :loading="false" />
            </div>
        </div>
        <div content-page-cards>
            <div col-content>
                <div loading v-if="loading">
                    <div item-loading v-for="(item, index) in 10" :key="'load-' + index" ><span></span></div>
                </div>
                <div search-card-page v-if="!loading">
                    <div empty-card v-if="emptyCard">
                        No card found
                    </div>
                    <div card-list v-if="!emptyCard">
                        <draggable
                            class="dragArea list-group"
                            :list="arrayCards"
                            :group="{ name: 'people', pull: 'clone', put: false }"
                        >
                            <div v-for="(card, index) in arrayCards" :key="'card-' + index" card-item>    
                                <FlipCard v-if="card.card_faces" :linkTo="urlCard('/card/' + card.lang + '/' + card.set + '/' + card.collector_number + '/', card.name)" :value="card.card_faces" :sizeImage="'small'" :loading="loading"></FlipCard>
                                <router-link :to="urlCard('/card/' + card.lang + '/' + card.set + '/' + card.collector_number + '/', card.name)">
                                    <figure v-if="!card.card_faces || !card.card_faces[0].image_uris">
                                        <img :src="card.image_uris['small']" :title="card.name" :alt="card.name" />
                                    </figure>
                                </router-link>
                            </div>
                        </draggable>
                    </div>
                </div>
            </div>
            <DecklistBuilder :opening="true" :value="deckListBuilder"></DecklistBuilder>
        </div>
    </div>
</template>

<script>
import FlipCard from '@/components/FlipCard.vue';
import Pagination from '@/components/Pagination.vue';
import DecklistBuilder from '@/components/DecklistBuilder.vue'
import draggable from 'vuedraggable'

export default {
    name: 'Search',
    components: {
        FlipCard,
        Pagination,
        DecklistBuilder,
        draggable
    },
    data () {
        return {
            cardShow: [],
            queryPage: null,
            loading: false,
            emptyCard: false,
            flipImg: false,
            currentPage: 1,
            maxPerPage: 50,
            returnLengthPage: 0,
            deckListBuilder: []
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
    computed: {
        arrayCards() {
            this.currentPage = this.$route.query.page == undefined ? 1 : this.$route.query.page;

            let result = [];
            const limitItems = this.maxPerPage;
            let totalPage = Math.ceil( this.cardShow.length / limitItems );
            let count = ( this.currentPage * limitItems ) - limitItems;
            let delimiter = count + limitItems;
            
            if(this.currentPage <= totalPage){
                for(let i=count; i<delimiter; i++){
                    if(this.cardShow[i] != null){
                        result.push(this.cardShow[i]);
                    }
                    count++;
                }
            }

            return result;
        }
    },
    methods: {
        loadingContent() {
            const self = this;
            this.queryPage = this.$route.query.q;
            this.loading = true;

            this.$http.get(`https://api.scryfall.com/cards/search?page=1&q=${this.queryPage}`).then((response) => {
                self.emptyCard = false;
                self.cardShow = response.data.data;
                self.loading = false;

                if (this.cardShow.length == 1) {
                    const oneCard = self.cardShow[0];
                    
                    this.$router.push(this.urlCard('/card/' + oneCard.lang + '/' + oneCard.set + '/' + oneCard.collector_number + '/', oneCard.name));
                }
            }).catch(function (error) {
                self.loading = false;
                self.emptyCard = true;
                console.log(error);
            });
        }
    }
}
</script>

<style lang="scss">
    [content-page-cards]{
        display: flex;
        justify-content: space-between;
        align-items: flex-start;

        [col-content]{
            flex:1;
        }
    }
    [search-card-page]{
        .dragArea{
            width:100%;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-wrap: wrap;
            padding:20px 0;
            box-sizing: border-box;
        }
        [card-list]{
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-wrap: wrap;
            padding:20px 0;
            box-sizing: border-box;

            [card-item]{
                background-image:url('/images/card_loading.gif');
                background-position:center;
                background-size:42px;
                background-repeat: no-repeat;
                width: 25%;
                padding:0 10px;
                margin-bottom:20px;
                box-sizing: border-box;
                transition:0.15s ease-in-out;
                position: relative;

                figure{
                    width:100%;
                    height:0;
                    padding-top:141%;
                    position: relative;
                    z-index:0;

                    img{
                        width:100%;
                        position:absolute;
                        top:0;
                        left:0;
                        border-radius:12px;
                    }
                }
                .flip-box{
                    img{
                        border-radius:12px;
                    }
                }
                [flag-set]{
                    background-color:#9dff00;
                    width:32px;
                    height:32px;
                    display:flex;
                    align-items: center;
                    justify-content: center;
                    position:absolute;
                    bottom:-10px;
                    left:50%;
                    border-radius:50px;
                    transform:translateX(-50%);
                    z-index:999;
                    box-shadow:0 0 5px rgba(0, 0, 0, 0.1);

                    img{
                        height:26px;
                    }
                }
            }
        }
    }
    [info-return-cards]{
        background:#d8d0d8;
        height:36px;
        display:flex;
        align-items: center;
        justify-content: space-between;
        border-bottom:#dfdfdf;
        padding:0 1.5rem;
        box-sizing: border-box;

        [info]{
            span{
                font-size:14px;

                b{
                    font-weight:700;
                }
                i{
                    font-weight:700;
                    font-style: italic;
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
            width: 25%;
            padding:0 10px;
            margin-bottom:20px;
            box-sizing: border-box;

            span{
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
