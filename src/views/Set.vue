<template>
    <div set-page>
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
                <figure v-if="!card.card_faces">
                    <img :src="card.image_uris['normal']" :title="card.name" :alt="card.name" />
                </figure>
                <router-link flag-set :to="'/set/' + card.set">
                    <img :src="'https://img.scryfall.com/sets/' + card.set + '.svg'" :alt="card.set_name" />
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import FlipCard from '@/components/FlipCard.vue'

export default {
    name: 'Set',
    data () {
        return {
            setShow: [],
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
                this.cardShow = response.data.data;
                this.loading = false;
                self.emptyCard = false;
            }).catch(function (error) {
                self.emptyCard = true;
                console.log(error);
            })
        }
    }
}
</script>

<style lang="scss">
    //
</style>
