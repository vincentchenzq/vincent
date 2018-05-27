<template>
    <div class="image">
        <canvas ref="canvas"
                @mousedown="mouseDownHandler"
                @mousemove="mouseMoveHandler"
                @mouseup="mouseUpHandler"
                @mouseout="mouseOutHandler"
                width="600"
                height="600"></canvas>

        <!--各种按钮-->
        <div class="mt50">

            <el-button-group>
                <el-button size="medium" :type="status=='paint'? 'primary':''" round @click="changeStatus('paint')">涂抹</el-button>
                <el-button :type="status=='mosaic'? 'primary':''" size="medium" round @click="changeStatus('mosaic')">马赛克</el-button>
            </el-button-group>

            <span class="mt10 ml20">画笔大小：</span>
            <el-button-group>
                <el-button :type="button_groups[0]" size="medium" round @click="changeLineWidth(10)">大</el-button>
                <el-button :type="button_groups[1]" size="medium" round @click="changeLineWidth(5)">中</el-button>
                <el-button :type="button_groups[2]" size="medium" round @click="changeLineWidth(3)">小</el-button>
            </el-button-group>

            <span class="mt10 ml20">画笔颜色：</span>
            <el-button-group>
                <el-button :type="strokeStyle=='red'? 'primary':''" size="medium" round @click="changeStrokeStyle('red')"><i class="color-block back-red"></i></el-button>
                <el-button :type="strokeStyle=='black'? 'primary':''" size="medium" round @click="changeStrokeStyle('black')"><i class="color-block back-black"></i></el-button>
            </el-button-group>
        </div>

        <!--完成和撤销按钮-->
        <div class="mt20 text-center">
            <el-button-group>
                <el-button size="medium" type="primary" round @click="save">完成</el-button>
                <el-button size="medium" type="danger" round @click="init">撤销</el-button>
            </el-button-group>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                canvas: null,
                context: null,
                src: null,
                CANVAS_WIDTH: 800,
                line_width: 5,
                strokeStyle:'red',
                status:'paint',//paint 表示涂抹  mosaic表示马赛克
                button_groups:['','primary',''],
                isClick:false, //表明当前是否点击在canvas上
                lastPoint:null,
                mosaicSize:20//马赛克大小
            }
        },
        methods: {
            init() {
                let _context = this.context;
                let _canvas = this.canvas;

                //将Image 放到canvas上
                let img = new Image();
                img.src = this.src;

                //解决 getImageData跨域问题
                img.crossOrigin = "Anonymous";

                img.onload = () => {
                    //重新计算比例重置image 的高度和宽度
                    let _width = img.width;
                    let _height = img.height;

                    let width, height;

                    if (_width > _height) {
                        width = this.CANVAS_WIDTH;
                        height = Math.floor(_height * this.CANVAS_WIDTH / _width);
                    } else {
                        height = this.CANVAS_WIDTH;
                        width = Math.floor(_width * this.CANVAS_WIDTH / _height);
                    }

                    _canvas.width = width;
                    _canvas.height = height;

                    _context.drawImage(img, 0, 0, width, height);
                }


            },
            //鼠标点击
            mouseDownHandler(event){
                this.isClick = true;
                this.lastPoint = {
                    x:event.offsetX,
                    y:event.offsetY
                };
                this.context.beginPath();
                this.context.moveTo(event.offsetX,event.offsetY);
            },
            //鼠标移动
            mouseMoveHandler(event){
                let x,y,context,canvas;
                if(this.isClick){
                    context = this.context;
                    canvas = this.canvas;
                    context.lineWidth = this.line_width;
                    context.strokeStyle=this.strokeStyle;

                    x = event.offsetX;
                    y = event.offsetY;

                    if(this.status==='paint'){//划线
                        this.drawLine(context, x, y);
                    }else{//打马赛克
                        this.drawMosaic(context, x, y);
                    }
                }
            },
            //鼠标放开
            mouseUpHandler(event){
                this.isClick = false;
                this.lastPoint = null;
            },
            //鼠标移出
            mouseOutHandler(event){
                this.isClick = false;
                this.lastPoint = null;
            },
            //划线
            drawLine(context,x,y){
                context.lineTo(x,y);
                context.stroke();
            },
            //画马赛克
            drawMosaic(context, x, y){
                let width = this.canvas.width;
                let height = this.canvas.height;
                let size = this.mosaicSize;
                let data = context.getImageData(0, 0, width, height);

                /**
                 * 取出像素的r,g,b,a值
                 */
                let cR = data.data[(y * width + x) * 4],
                    cG = data.data[(y * width + x) * 4 + 1],
                    cB = data.data[(y * width + x) * 4 + 2];

                context.fillStyle = `rgb(${cR},${cG},${cB})`;

                x = Math.floor(x / size) * size;
                y = Math.floor(y / size) * size;

                context.fillRect(x, y ,size, size);

            },
            //涂抹  马赛克
            changeStatus(status) {
                this.status = status;
            },
            //改变线条宽度
            changeLineWidth(width) {
                this.line_width = width;
                switch(width){
                    case 3:
                        this.button_groups = ['','','primary'];
                        break;
                    case 5:
                        this.button_groups = ['','primary',''];
                        break;
                    case 10:
                        this.button_groups = ['primary','',''];
                        break;
                }
            },
            //改变 划线颜色
            changeStrokeStyle(color){
                this.strokeStyle = color;
            },
            //完成方法
            save(){
                let image = new Image();
                let dataUrl =this.canvas.toDataURL("image/png");
                image.src = dataUrl;
//                console.log(image);
//                console.log(this.dataURLtoBlob(dataUrl));
                return image;
            },
            dataURLtoBlob(dataurl) {
                let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
                while(n--){
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new Blob([u8arr], {type:mime});
            }

        },
        mounted() {
            this.canvas = this.$refs.canvas;
            this.context = this.canvas.getContext("2d");
            this.src = "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=508457786,263732129&fm=27&gp=0.jpg";
            this.init();
        }
    }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    .color-block {
        display: inline-block;
        border-radius: 50%;
        width: 12px;
        height: 12px
    }

    .back-red {
        background: red;
    }

    .back-black {
        background: black;
    }

    canvas {
        cursor: pointer;
    }
</style>
