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
    //
</style>
