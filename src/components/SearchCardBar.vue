<template>
    <div searchbar>
        <input type="text" id="searcBarCard" ref="searcbarcard" v-model="search" @change="searchPage" placeholder="Search card">
    </div>
</template>

<script>
export default {
    name: 'SearchCardBar',
    data () {
        return {
            search: null
        }
    },
    props: {
        card: String
    },
    watch:{
        $route (to, from){
            if (this.$route.name != 'Search') {
                document.getElementById('searcBarCard').value = '';
            }
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

<style scoped lang="scss">
    [searchbar]{
        width:50%;

        input{
            font-weight:700;
            text-align: center;
            font-size:14px;
            color:#19181a;
            background:#fff;
            width:100%;
            height:35px;
            border:0;
            padding:0 1rem;
            border-radius:50px;
            transition:0.2s all ease-in-out;
            box-sizing: border-box;

            &::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
                color: #888;
            }

            &:-ms-input-placeholder { /* Internet Explorer 10-11 */
                color: #888;
            }

            &::-ms-input-placeholder { /* Microsoft Edge */
                color: #888;
            }
        }
    }
</style>