<template>
    <div class="w-list-cards">
        <input type="text" v-model="search" @change="searchPage">
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
