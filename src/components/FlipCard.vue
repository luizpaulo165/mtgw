<template>
    <div class="flip-box" :fliped="flipCard" v-if="!loading">
        <div class="rotate-btn" @click="flipCard = !flipCard"></div>
        <div class="flip-box-inner">
            <div class="flip-box-front">
                <img :src="value[0].image_uris['normal']" :title="value[0].name" />
            </div>
            <div class="flip-box-back">
                <img :src="value[1].image_uris['normal']" :title="value[1].name" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FlipCard',
    props: {
        value: Array,
        front: String,
        back: String,
        loading: Boolean
    },
    data() {
        return {
            flipCard: false,
        }
    },
    methods: {
        flipCardThis() {
            //
        }
    }
}
</script>

<style scoped lang="scss">
    .flip-box {
        background-color: transparent;
        width:100%;
        height:0;
        padding-top:140%;
        display: inline-block;
        perspective: 1000px;
        position: relative;

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

        &[fliped]{
            .flip-box-inner {
                transform: rotateY(180deg);
            }
        }

        .flip-box-inner {
            text-align: center;
            width: 100%;
            position: absolute;
            top:0;
            left:0;
            transition: transform 0.8s;
            transform-style: preserve-3d;
        }
    }

    .flip-box-front,
    .flip-box-back {
        position: absolute;
        width: 100%;
        height: 100%;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;

        img{
            width:100%;
        }
    }

    .flip-box-front {
        color: black;
    }

    .flip-box-back {
        transform: rotateY(180deg);
    }
</style>