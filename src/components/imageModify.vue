<template>
    <div class="image">
        <canvas id="canvas" @click="mosaicImage"
                data-src="https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=2844908530,3679402489&fm=85&s=E2731ED0626A6D0D70ABEC40030060FB"
                width="800" height="600"></canvas>
    </div>
</template>

<script>
    export default {
        name: 'imageModify',
        props: {
            mosaicSize: {
                default: 8
            }
        },
        data() {
            return {
                canvas: null,
                src: ''
            }
        },
        computed: {},
        methods: {
            mosaicImage() {

            }
        },
        mounted() {
            /**
             * div对象, 及马赛克大小
             */
            mosaicImage('canvas', 8);
        }
    }


    const mosaicImage = (target, mosaicSize = 20) => {

        let canvas = document.getElementById(target),
            _canvas = document.createElement('canvas');

        if (!canvas || !canvas.getContext) {

            return false;

        }

        /**
         * 根据图片填充马赛克块
         */
        const createMosaic = (context, width, height, size, data) => {

            for (let y = 0; y < height; y += size) {

                for (let x = 0; x < width; x += size) {

                    /**
                     * 取出像素的r,g,b,a值
                     */
                    let cR = data.data[(y * width + x) * 4],
                        cG = data.data[(y * width + x) * 4 + 1],
                        cB = data.data[(y * width + x) * 4 + 2];

                    context.fillStyle = `rgb(${cR},${cG},${cB})`;
                    context.fillRect(x, y, x + size, y + size);

                }

            }

        };

        /**
         * 将数据画到canvas
         */
        const draw = (_context, imageData, context) => {

            createMosaic(_context, _canvas.width, _canvas.height, mosaicSize, imageData);
            context.drawImage(_canvas, 0, 0);

        };


        const init = () => {

            let context = canvas.getContext('2d');

            /**
             * 设置图片来源
             */
            let img = new Image();

            img.crossOrigin = "anonymous";
            img.src = canvas.getAttribute('data-src');
            /**
             * 加载图片
             */
            img.onload = () => {

                let _context = _canvas.getContext('2d'),
                    imageData;

                /**
                 * 图片大小与canvas匹配
                 */
                _canvas.width = img.width;
                _canvas.height = img.height;

                /**
                 * 重置canvas画布大小
                 */
                canvas.width = img.width;
                canvas.height = img.height;

                _context.drawImage(img, 0, 0);

                /**
                 * 获取canvas各像素的颜色信息
                 * 像素的颜色信息从左到右,r, g, b, a 值排列
                 */
                imageData = _context.getImageData(0, 0, _canvas.width, _canvas.height);

                draw(_context, imageData, context);

            };

        };
        init();

    };


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
</style>
