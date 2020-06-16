class Ps {
  static async compose(canvasDOM, imgSrc1, imgSrc2, canvasOptions = {
    width: 1000,
    height: 500,
    background: '#fff',
    padding: 20
  }) {
    /* 
    canvasDOM: canvas 标签 DOM 元素
    canvasOptions:
      - width: 画布宽度
      - height:画布高度
      - backgroud: 填充颜色
      - padding: 左右边距
    imgSrc1: 图片1的src
    imgSrc2: 图片2的src
    */

    // 画布高度确定，宽度动态改变，保持原图长宽比
    function onload2promise(obj){
      return new Promise((resolve, reject) => {
        obj.onload = () => resolve(obj);
        obj.onerror = reject;
      });
    }

    // 图片初始化
    const img1 = new Image();
    const img2 = new Image();

    img1.src = imgSrc1;
    img2.src = imgSrc2;

    const img1Promise = onload2promise(img1);
    const img2Promise = onload2promise(img2);

    await img1Promise;
    await img2Promise;

    // 画布初始化
    const canvas = canvasDOM;
    canvas.width = img1.width + img2.width + 3 * canvasOptions.padding;
    console.log(img1.width, img2.width, canvas.width);
    canvas.height = canvasOptions.height;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = canvasOptions.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(img1, canvasOptions.padding, (canvasOptions.height - img1.height) / 2, img1.width, img1.height);
    ctx.drawImage(img2, 2 * canvasOptions.padding + img1.width, (canvasOptions.height - img2.height) / 2, img2.width, img2.height);

    return canvas;

    // 画布大小固定，导致图片变形
    // const canvas = canvasDOM;
    // canvas.width = canvasOptions.width;
    // canvas.height = canvasOptions.height;

    // const ctx = canvas.getContext('2d');
    // ctx.fillStyle = canvasOptions.background;
    // ctx.fillRect(0, 0, canvas.width, canvas.height);

    // const img1 = new Image();
    // const img2 = new Image();

    // img1.src = imgSrc1;
    // img2.src = imgSrc2;

    // img1.onload = function () {
    //   // ctx.drawImage(img1, canvasOptions.padding, (canvasOptions.height - img1.height) / 2, img1.width, img1.height);
    //   ctx.drawImage(img1, canvasOptions.padding, canvasOptions.height / 2 - img1.height / 2, canvasOptions.width / 2 - 1.5 * canvasOptions.padding, img1.height);
    // }

    // img2.onload = function () {
    //   ctx.drawImage(img2, canvasOptions.padding, (canvasOptions.height - img2.height) / 2, img2.width, img2.height);
    //   ctx.drawImage(img2, canvasOptions.width / 2 + canvasOptions.padding / 2, canvasOptions.height / 2 - img2.height / 2, canvasOptions.width / 2 - 1.5 * canvasOptions.padding, img2.height)
    // }
    // return canvas;
  }

  static async changeSize(img, height) {
    await img.onload;
    const originHeight = img.height;
    const originWidth = img.width;
    const newWidth = originWidth * (height / originHeight); // 计算新的宽度（等比例缩放）

    const canvas = document.createElement('canvas');
    canvas.width = newWidth;
    canvas.height = height;

    const ctx = canvas.getContext('2d');

    ctx.drawImage(img, 0, 0, newWidth, height);
    const blob = await new Promise(resolve => canvas.toBlob(resolve));
    return blob;
  }
}

export default Ps;