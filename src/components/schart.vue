<template>
    <div class="login">
        <div class="content">
            <canvas  id="canvas1" type="bar"  width="500" height="400"></canvas>
            <canvas  id="canvas2" type="line"  width="500" height="400" ></canvas>
            <canvas  id="canvas3" type="pie"   width="500" height="400" ></canvas>
            <canvas  id="canvas4" type="ring"  width="500" height="400" ></canvas>
        </div>
    </div>
</template>

<script>
    import sChart from 'schart.js';

    export default {
        data() {
            return {
                canvasId: 'myChart',
                width: 500,
                height: 400,
                data1:[
                    {name:'2012',value:1141},
                    {name:'2013',value:500},
                    {name:'2014',value:2260},
                    {name:'2015',value:1170},
                    {name:'2016',value:970},
                    {name:'2017',value:1450}
                ],
                data2:[
                    {name:'短袖',value:1200},
                    {name:'休闲裤',value:1200},
                    {name:'连衣裙',value:1283},
                    {name:'外套',value:1314},
                    {name:'羽绒服',value:2314}
                ],
                options1:{
                    title: '某商店近年营业总额',
                    autoWidth: false,   // 设置宽高自适应
                    showValue: false,
                    bgColor: '#F9EFCC',
                    fillColor: '#00887C',
                    contentColor: 'rgba(46,199,201,0.3)',
                    yEqual: 7
                },
                options2:{
                    title: '某商店近年营业总额',
                    bgColor: '#D5E4EB',
                    titleColor: '#00887C',
                    fillColor: 'red',
                    contentColor: 'rgba(46,199,201,0.3)'
                },
                options3:{
                    title: '某商店各商品年度销量',
                    bgColor: '#829dca',
                    titleColor: '#ffffff',
                    legendColor: '#ffffff',
                    radius: 120
                },
                options4:{
                    title: '某商店各商品年度销量',
                    bgColor: '#829daa',
                    titleColor: '#ffffff',
                    legendColor: '#ffffff',
                    radius: 120,
                    innerRadius:80
                }
            };
        },
        methods: {
            initSchart(canvasId, type, data, opt){
                new sChart(canvasId, type, data, opt);
            }

        },
        mounted(){
            this.initSchart('canvas1', 'bar', this.data1, this.options1);
            this.initSchart('canvas2', 'line', this.data1, this.options2);
            this.initSchart('canvas3', 'pie', this.data2, this.options3);
            this.initSchart('canvas4', 'ring', this.data2, this.options4);
        },
        components: {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
