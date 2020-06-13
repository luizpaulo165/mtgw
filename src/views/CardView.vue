<template>
    <div cards-view-page v-if="!loading">
       <div col>
           <div wrap-image-preview :active="activePage">
                <div center-card :active="!activePage">
                    <FlipCard v-if="card.card_faces" :value="card.card_faces" :sizeImage="'normal'" :loading="loading"></FlipCard>
                    <figure v-if="!card.card_faces">
                        <img :src="card.image_uris['normal']" :title="card.name" :alt="card.name" />
                    </figure>
                </div>
           </div>
       </div>
       <div col></div>
    </div>
</template>

<script>
import FlipCard from '@/components/FlipCard.vue';

export default {
    name: 'cardView',
    components: {
        FlipCard
    },
    data () {
        return {
            card: [],
            loading: true,
            emptyCard: true,
            activePage: false
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
            this.queryPage = this.$route.params.name;
            this.loading = true;

            this.$http.get(`https://api.scryfall.com/cards/named?fuzzy=${this.queryPage}`).then((response) => {
                self.card = response.data;
                self.loading = false;
                self.emptyCard = false;
                self.isLoaded = true;
                
                setTimeout(() => {
                    self.activePage = true;
                }, 320)
            }).catch(function (error) {
                self.emptyCard = true;
                console.log(error);
            })
        }
    }
}
</script>

<style lang="scss">
    .rotate-btn{
        background-color:#9dff00;
        background-image:url('/images/rotate.svg');
        background-size:50%;
        background-position: center;
        background-repeat: no-repeat;
        width:32px;
        height:32px;
        display:block;
        position: absolute;
        top: 3rem;
        right: 1.7rem;
        border-radius:50px;
        z-index:100;
        box-shadow: 0 0px 10px rgba(0, 0, 0, 0.1);
        cursor:pointer;
    }
    
    [cards-view-page]{
        width:1080px;
        max-width:100%;
        min-height:100vh;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-direction: row;
        margin:0 auto;
        padding:20px 0;
        
        [col]{
            [wrap-image-preview]{
                width: 400px;
                padding:0 10px;
                box-sizing: border-box;
                transition:0.15s ease-in-out;
                position: relative;

                &[active='true']{
                    &:before{
                        bottom:10px;
                        left:-20%;
                        transform:rotate(-20deg) scale(0.85);
                        transition:0.5s all ease-in-out;
                    }
                    &:after{
                        bottom:10px;
                        right:-20%;
                        transform:rotate(20deg) scale(0.85);
                        transition:0.5s all ease-in-out;
                    }
                }

                img{
                    width:100%;
                    border-radius:22px;
                }

                [center-card]{
                    width:inherit;
                    height:0;
                    padding-top:146%;
                    position:relative;
                    z-index:10;
                    border-radius:22px;

                    &[active="true"]{
                        background-image:url('/images/card_loading.gif');
                        background-color:#000;
                        background-position:center;
                        background-size:42px;
                        background-repeat: no-repeat;
                    }

                    figure,
                    .flip-box{
                        position:absolute;
                        top:0;
                        left:0;
                    }
                }

                &:before,
                &:after{
                    background-image:url('/images/mtg-card-back.png');
                    background-position:center;
                    background-size:contain;
                    background-repeat: no-repeat;
                    content:'';
                    width: inherit;
                    height:0;
                    display:block;
                    padding-top:138%;
                    position: absolute;
                    bottom:5px;
                    border-radius:22px;
                    z-index: 0;
                }
                &:before{
                    left:0;
                    transform:rotate(0) scale(0.85);
                    transition:0.1s all ease-in-out;
                }
                &:after{
                    right:0%;
                    transform:rotate(0) scale(0.85);
                    transition:0.1s all ease-in-out;
                }
            }
        }
    }
</style>
