<template>
    <div deck-list-builder>
        <div list-cards>
             <draggable
                class="dragArea list-group"
                :list="value"
                group="people"
            >
                <div
                    class="list-group-item"
                    v-for="(item, index) in value"
                    :key="item.name+'-'+index"
                >
                    <div div-card>
                        {{ item.id }}
                        <img :src="item.image_uris['small']" alt="">
                        {{ item.name }}
                    </div>
                </div>
            </draggable>
        </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
    name: 'DecklistBuilder',
    components: {
        draggable
    },
    data () {
        return {
            //
        }
    },
    props: {
        value: Array,
        opening: Boolean
    },
    methods: {
        //
    }
}
</script>

<style scoped lang="scss">
    [deck-list-builder]{
        width:350px;
        height:100%;
        position:relative;
        display:flex;
        align-items: flex-start;
        justify-content: flex-start;
        position: sticky;
        z-index: 100;

        [list-cards]{
            background:#ccc;
            width:350px;
            height:85%;
            display:flex;
            align-items: flex-start;
            justify-content: flex-start;
            flex-direction:column;
            position: fixed;
            top:15%;
            right:0;
            border-radius:20px 20px 0 0;
            padding:10px;
            overflow-y:auto;
            box-sizing:border-box;
        }

        .dragArea{
            width:100%;
            height:100%;
        }
    }
</style>