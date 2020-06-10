<template>
    <div>
        <div card-list>
            <div card-item v-for="(card, index) in cardShow" :key="'card-' + index">
                <h4>Name:{{ card.name }}</h4>
                <p>Collection: {{ card.set_name }}</p>
                <p>Lang: {{ card.lang }}</p>
                <div v-if="card.card_faces">
                    <div class="flip-box">
                        <div class="flip-box-inner">
                            <div class="flip-box-front">
                                <img :src="card.card_faces[0].image_uris['normal']">
                            </div>
                            <div class="flip-box-back">
                                <img :src="card.card_faces[1].image_uris['normal']">
                            </div>
                        </div>
                    </div>
                </div>
                <figure v-for="(item, e) in card.image_uris" :key="'img-' + e">
                    <img v-if="e == 'normal'" :src="item" alt="">
                </figure>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Search',
    data () {
        return {
            cardShow: [],
            queryPage: null
        }
    },
    mounted() {
        this.queryPage = this.$route.query.q;
        console.log(`https://api.scryfall.com/cards/search?q=${this.queryPage}`)
         this.$http.get(`https://api.scryfall.com/cards/search?q=${this.queryPage}`).then((response) => {
            this.perPage = parseInt(response.data['total_cards']);
            this.cardShow = response.data.data;
            console.log(response)
        }).catch(function (error) {
            console.log(error);
        })
    }
}
</script>

<style lang="scss">
    .flip-box {
        background-color: transparent;
        width:500px;
        height:600px;
        display: inline-block;
        perspective: 1000px;
    }

    .flip-box-inner {
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
        transition: transform 0.8s;
        transform-style: preserve-3d;
    }

    .flip-box:hover .flip-box-inner {
        transform: rotateY(180deg);
    }

    .flip-box-front, .flip-box-back {
        position: absolute;
        width: 100%;
        height: 100%;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
    }

    .flip-box-front {
        background-color: #bbb;
        color: black;
    }

    .flip-box-back {
        background-color: #555;
        color: white;
        transform: rotateY(180deg);
    }
</style>
