'use strict';

var gKeywords = { 'happy': 12, 'funny puk': 1 }

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny'] },
    { id: 2, url: 'img/2.jpg', keywords: ['animal'] }
];

var gTextPositions = [
    { x: 250, y: 50 },
    { x: 250, y: 250 },
    { x: 250, y: 450 }
]

var gCurrLine = 0;

function addLine() {
    gCurrLine++;
    var newLine = gMeme.lines.slice(gMeme.lines.length - 1, 1)[0];
    console.log(newLine);
    newLine.txt = '';
    gMeme.lines.push(newLine);
}

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 50,
            align: 'left',
            color: 'red',
            strokeColor: 'white',
            font: 'impact',
        }
    ]
}


function drawText(text, x, y) {
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'red';
    gCtx.fillStyle = 'white';
    gCtx.font = `${gMeme.lines[gCurrLine].size}px impact`;
    gCtx.textAlign = 'center';
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}


//    function getImgIdxById(imgId) {
//     var imgIdx = gImgs.findIndex(function (currImg) {
//         return (currImg.id.toString() === imgId);
//     });
//     gCurrImgIdx=imgIdx;
//     return imgIdx;
// }
function changeFontSize(sign){
    var newFontSize=(sign===1)? gMeme.lines[gCurrLine].size+5 : gMeme.lines[0].size+5;
    gMeme.lines[gCurrLine].size=newFontSize;

}

function drawMeme(imgId) {
    const img = new Image()
    img.src = `./img/${imgId}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height) //img,x,y,xend,yend
        drawText(gMeme.lines[0].txt, gTextPositions[0].x, gTextPositions[0].y);
        if (gMeme.lines.length === 2) drawText(gMeme.lines[1].txt, gTextPositions[1].x, gTextPositions[1].y);
        if (gMeme.lines.length === 3) drawText(gMeme.lines[2].txt, gTextPositions[2].x, gTextPositions[2].y);
    }
}