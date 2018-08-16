<template>
    <div class="login">
        <div class="content">
            <div  id="canvas1" style="width:500px;height:500px;"></div>
        </div>
    </div>
</template>

<script>
    import echart from 'echarts'



    export default {
        data() {
            return {
                echart:null,
                option:{
                    tooltip: {
                        triggerOn: 'none',
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                    },
                    series: [
                        {
                            name:'访问来源1',
                            type:'pie',
                            tooltip: {
                                triggerOn: 'none',
                                formatter: "访问来源1",
                                alwaysShowContent:true
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            radius: ['10%', '20%'],
                            center : ['25%', '50%'],
                            avoidLabelOverlap: false,
                            data:[
                                {value:3351, name:'直接访问'},
                                {value:3101, name:'邮件营销'},
                                {value:2341, name:'联盟广告'},
                                {value:1351, name:'视频广告'},
                                {value:15481, name:'搜索引擎'}
                            ]
                        },
                        {
                            name:'访问来源2',
                            type:'pie',
                            tooltip: {
                                triggerOn: 'none',
                                formatter: "访问来源2",
                                alwaysShowContent:true
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            radius: ['10%', '20%'],
                            center : ['75%', '50%'],
                            avoidLabelOverlap: false,
                            data:[
                                {value:335, name:'直接访问'},
                                {value:310, name:'邮件营销'},
                                {value:234, name:'联盟广告'},
                                {value:135, name:'视频广告'},
                                {value:1548, name:'搜索引擎'}
                            ]
                        }
                    ]
                }
            };
        },
        methods: {

        },
        mounted(){
            this.echart = echart.init(document.getElementById('canvas1'))


            // 模拟数据
            setTimeout( () => {
                this.echart.setOption(this.option)
            },1000)

            setTimeout(() => {
                this.echart.dispatchAction({
                    type: 'showTip',
                    seriesIndex:0,
                    dataIndex:0,
                    position: ['25%', '75%']
                });
            },1000);
            setTimeout(() => {
                this.echart.dispatchAction({
                    type: 'showTip',
                    seriesIndex:1,
                    dataIndex:0,
                    position: ['70%', '75%']
                });
            },2000)
        },
        components: {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
