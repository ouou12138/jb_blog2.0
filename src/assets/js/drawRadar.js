export default function (options) {
  const canvas = document.getElementById(options.id)
  const bgCanvas = document.createElement('canvas')
  const offCanvas = document.createElement('canvas')

  const ctx = canvas.getContext('2d')
  const bgCtx = bgCanvas.getContext('2d')
  const offCtx = offCanvas.getContext('2d')

  // 移动端要根据ratio倍率来修复模糊问题
  const ratio = window.devicePixelRatio || window.webkitDevicePixelRatio || window.mozDevicePixelRatio || 1
  const w = canvas.width
  const h = canvas.height
  canvas.width = offCanvas.width = bgCanvas.width = w * ratio
  canvas.height = offCanvas.height = bgCanvas.height = h * ratio
  canvas.style.width = w + 'px'
  canvas.style.height = h + 10 + 'px' // 加10个上下padding
  // ctx.scale(ratio, ratio)
  const canvasW = canvas.width
  const canvasH = canvas.height
  // 重新映射 canvas的 (0, 0)，映射的结果是让canvas的坐标原点位于 canvas的中心位置
  // 主要是为了后续方便绘图
  bgCtx.translate(canvasW / 2, canvasH / 2)
  ctx.translate(canvasW / 2, canvasH / 2)
  offCtx.translate(canvasW / 2, canvasH / 2)

  const FULL_SCORE = options.fullScore || 100
  // 雷达图数据
  // const mData = [
  //   { label: ["爱心传递至"], score: 3 },
  //   { label: ["帮助了8人"], score: 5 },
  //   { label: [`收到5感谢`], score: 5 },
  //   { label: ["获得"], score: 15 },
  //   { label: [`可赠送10件闲置`], score: 10 }
  // ];
  const mData = options.data

  // 多边形的边数
  const mCount = mData.length
  // 最外层多边形边长
  const prismW = Math.min(canvasW, canvasH) / 2
  // 最外层多边形外接圆半径
  const mRadius = prismW / 2 / Math.cos((108 / 2 / 180) * Math.PI)
  // 多边形的内角角度
  const mAngle = (Math.PI * 2) / mCount
  // 需要多少个多边形线框
  const polygonCount = 5
  const sAngle = (90 / mCount / 180) * Math.PI

  // 需要旋转多少度，才能将多边形旋转到底边平行于 X轴，奇多边形才需要，偶多边形不需要旋转
  // 主要是为了方便计算坐标
  const rotateAngle =
    mCount % 2 === 0 ? 0 : sAngle * (mCount % 4 === 3 ? -1 : 1)
  bgCtx.rotate(-rotateAngle)
  offCtx.rotate(-rotateAngle)

  // 保存最外层多边形各个顶点的坐标
  const polygonPoints = []
  // 雷达区域顶点坐标
  const radarVertex = []
  // 多边形线颜色
  bgCtx.strokeStyle = '#fff'
  // 雷达区域边线 width
  offCtx.lineWidth = 3

  // 绘制多边形，包括多边形对角顶点之间的连线
  drawPolygon()
  // ctx.drawImage(bgCanvas, -canvasW / 2, -canvasH / 2, canvasW, canvasH)
  // 绘制多边形顶点处文案
  drawVertexTxt()
  // 绘制雷达区域
  drawRadar()

  // 绘制多边形
  function drawPolygon () {
    // #region 绘制多边形
    const r = mRadius / polygonCount
    let currentRadius = 0
    for (let i = 0; i < polygonCount; i++) {
      bgCtx.beginPath()
      currentRadius = r * (i + 1)
      for (let j = 0; j < mCount; j++) {
        const x = currentRadius * Math.cos(mAngle * j)
        const y = currentRadius * Math.sin(mAngle * j)
        // 记录最外层多边形各个顶点的坐标
        if (i === polygonCount - 1) {
          polygonPoints.push([x, y])
        }
        j === 0 ? bgCtx.moveTo(x, y) : bgCtx.lineTo(x, y)
      }
      bgCtx.closePath()
      bgCtx.stroke()
    }
    // #endregion

    // #region 绘制多边形对角连线
    for (let i = 0; i < polygonPoints.length; i++) {
      bgCtx.moveTo(0, 0)
      bgCtx.lineTo(polygonPoints[i][0], polygonPoints[i][1])
    }
    bgCtx.stroke()
    // #endregion
  }

  // 绘制多边形顶点处文案
  function drawVertexTxt () {
    bgCtx.font = "normal normal lighter 28px 'Microsoft Jhenghei'"
    bgCtx.fillStyle = '#000'
    // 奇数多边形，距离设备顶边最近的点（即最高点的那一点），需要专门设置一下 textAlign
    const topPointIndex = mCount - Math.round(mCount / 4)
    for (let i = 0; i < polygonPoints.length; i++) {
      bgCtx.save()
      bgCtx.translate(polygonPoints[i][0], polygonPoints[i][1])
      bgCtx.rotate(rotateAngle)
      let indentX = 0
      let indentY = 0
      if (i === topPointIndex) {
        // 最高点
        bgCtx.textAlign = 'center'
        indentY = -10
      } else {
        if (polygonPoints[i][0] > 0 && polygonPoints[i][1] >= 0) {
          bgCtx.textAlign = 'start'
          indentX = 15
        } else if (polygonPoints[i][0] < 0) {
          bgCtx.textAlign = 'end'
          indentX = -20
        }
      }
      // 如果是正四边形，则需要单独处理最低点
      if (mCount === 4 && i === 1) {
        bgCtx.textAlign = 'center'
        indentY = 10
      }
      // 开始绘制文案
      bgCtx.fillText(mData[i].label, indentX, indentY)
      bgCtx.restore()
    }
  }

  // 绘制雷达区域
  function drawRadar () {
    let score = null
    const xList = []
    const yList = []
    // 计算并存储雷达区域顶点坐标
    for (let i = 0; i < mCount; i++) {
      // score不能超过 FULL_SCORE
      score = Math.min(mData[i].score, FULL_SCORE)
      xList.push((Math.cos(mAngle * i) * score) / FULL_SCORE)
      yList.push((Math.sin(mAngle * i) * score) / FULL_SCORE)
      radarVertex.push([mRadius * xList[i], mRadius * yList[i]])
    }
    // 裁剪选区，比真实的雷达区域大一圈(indentV)，这是为了保证完全遮罩
    const indentV = 40
    offCtx.beginPath()
    for (let i = 0; i < mCount; i++) {
      score = Math.min(mData[i].score, FULL_SCORE)
      const x = (mRadius + indentV) * xList[i]
      const y = (mRadius + indentV) * yList[i]
      i === 0 ? offCtx.moveTo(x, y) : offCtx.lineTo(x, y)
    }
    offCtx.closePath()
    offCtx.clip()

    const toAngle = 2 * Math.PI
    const canvasMaxSize = Math.max(canvasW, canvasH)
    // 将离屏 canvas上的 雷达图区域画到主 canvas上，用圆来填充，产生视觉上的雷达图逐渐填充的效果
    const ltX = -canvasW / 2
    const ltY = -canvasH / 2
    const rqDraw = currentAngle => {
      ctx.clearRect(ltX, ltY, canvasW, canvasH)
      offCtx.clearRect(ltX, ltY, canvasW, canvasH)

      // #region 绘制雷达区域
      offCtx.beginPath()
      for (let i = 0; i < mCount; i++) {
        i === 0
          ? offCtx.moveTo(radarVertex[i][0], radarVertex[i][1])
          : offCtx.lineTo(radarVertex[i][0], radarVertex[i][1])
      }
      offCtx.fillStyle = '#64B2F030'
      offCtx.strokeStyle = '#3FA1F0'
      offCtx.closePath()
      offCtx.stroke()
      offCtx.fill()
      // #endregion

      // #region 绘制覆盖雷达区域的遮罩
      offCtx.save()
      offCtx.beginPath()
      offCtx.globalCompositeOperation = 'destination-in'
      offCtx.moveTo(0, 0)
      offCtx.arc(0, 0, canvasMaxSize, 0, currentAngle)
      offCtx.closePath()
      offCtx.fillStyle = 'blue'
      offCtx.fill()
      offCtx.restore()
      // #endregion

      ctx.drawImage(bgCanvas, ltX, ltY)
      ctx.drawImage(offCanvas, ltX, ltY)
      // 动态雷达图绘制完毕的标识
      if (currentAngle === toAngle) {
        return drawVertexDot()
      }
      let newAngle = currentAngle + 0.25
      if (newAngle > toAngle) newAngle = toAngle
      requestAnimationFrame(() => {
        rqDraw(newAngle)
      })
      // setTimeout(() => {
      //   rqDraw(newAngle);
      // }, 16);
    }
    rqDraw(0)
  }

  // 雷达图绘制结束后，在雷达区域的顶点处绘制小圆点
  function drawVertexDot () {
    ctx.rotate(-rotateAngle)
    ctx.fillStyle = '#64B2F0'
    const dotRadius = 6
    const len = radarVertex.length
    // 画点
    const rqDrawDox = currentDotRadius => {
      for (let i = 0; i < len; i++) {
        ctx.beginPath()
        ctx.arc(
          radarVertex[i][0],
          radarVertex[i][1],
          currentDotRadius,
          0,
          2 * Math.PI
        )
        ctx.fill()
      }
      if (currentDotRadius < dotRadius) {
        requestAnimationFrame(() => {
          rqDrawDox(currentDotRadius + 0.5)
        })
      }
    }
    rqDrawDox(1)
  }
}
