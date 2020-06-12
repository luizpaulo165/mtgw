<template>
    <div cards-view-page v-if="!loading">
       <div col>
            <div wrap-image-preview>
                <CardPreview :data-image="card.image_uris['large']"></CardPreview>
            </div>
       </div>
       <div col></div>
    </div>
</template>

<script>
import FlipCard from '@/components/FlipCard.vue';
import CardPreview from '@/components/CardPreview.vue';

export default {
    name: 'cardView',
    components: {
        CardPreview,
        FlipCard
    },
    data () {
        return {
            card: {},
            loading: true,
            emptyCard: true
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
                this.isLoaded = true;
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
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: row;
        
        [col]{
            [wrap-image-preview]{
                width: 350px;
                padding:0 10px;
                box-sizing: border-box;
                transition:0.15s ease-in-out;

                img{
                    width:100%;
                }
            }
        }
    }
</style>
