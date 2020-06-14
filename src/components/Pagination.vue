<template>
    <div pagination v-if="!loading">
        <button @click="prevPage" :disabled="$route.query.page <= 1" >prev</button>
        <button @click="nextPage" :disabled="value.length < maxPerPage">next</button>
    </div>
</template>

<script>
export default {
    name: 'Pagination',
    data () {
        return {
            count: 1
        }
    },
    props: {
        value: Array,
        search: String,
        loading: Boolean,
        maxPerPage: Number
    },
    mounted(){
        //
    },
    methods: {
        nextPage() {
            let cont = parseInt(this.$route.query.page) + 1;

            if (cont <= this.maxPerPage){
                this.$router.push({path: 'search', query: { page: cont, q: this.search }})
            }
        },
        prevPage() {
            let cont = parseInt(this.$route.query.page) - 1;

            if (cont >= 1) {
                this.count =- 1;
                this.$router.push({path: 'search', query: { page: cont, q: this.search }})
            }
        }
    }
}
</script>

<style scoped lang="scss">
    [pagination]{
        width:200px;
        display:flex;
        justify-content: flex-start;
        align-items:center;
    }
</style>