<template>
    <div home-page>
        Home
    </div>
</template>

<script>
export default {
    name: 'Home',
    data() {
        return {
            search: null
        }
    },
    mounted() {
        //
    },
    methods: {
        searchPage() {
            const searchText = this.search.replace(' ','+');

            this.$router.push(`/search?q=${searchText}`);
        }
    }
}
</script>

<style lang="scss">
    
</style>
