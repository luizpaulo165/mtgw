<template>
    <div header-default>
        <div logo>
            <router-link to="/">
                <img src="/images/logo.png" alt="Logo">
            </router-link>
        </div>
        <SearchCardBar />
        <div id="nav">
            <router-link to="/set">Sets</router-link>
        </div>
    </div>
</template>

<script>
import SearchCardBar from '@/components/SearchCardBar.vue'

export default {
    name: 'HeaderDefault',
    components: {
        SearchCardBar
    },
    data: () => ({
        //
    }),
    computed: {
        //
    },
    methods: {
        //
    }
}
</script>

<style scoped lang="scss">
    [header-default]{
        background:#19181a;
        height:60px;
        display:flex;
        align-items: center;
        justify-content: space-between;
        padding:0 1.5rem;

        [logo]{
            img{
                height:45px;
            }
        }

        #nav {
            display:flex;
            align-items: center;
            justify-content: center;

            a {
                font-size: 1.2rem;
                color: #fff;

                &.router-link-exact-active {
                    color: #42b983;
                }
            }
        }
    }
</style>