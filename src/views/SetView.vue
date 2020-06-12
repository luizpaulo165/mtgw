<template>
    <div set-view-page>
       <pre>
           {{ setViewContent }}
       </pre>
    </div>
</template>

<script>
import FlipCard from '@/components/FlipCard.vue'

export default {
    name: 'SetView',
    data () {
        return {
            setViewContent: {},
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
            this.queryPage = this.$route.params.code;
            this.loading = true;

            this.$http.get(`https://api.scryfall.com/sets/${this.queryPage}`).then((response) => {
                this.setViewContent = response.data;
                this.loading = false;
                this.emptyCard = false;
                console.log(response)
            }).catch(function (error) {
                this.emptyCard = true;
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
