'use strict';

var gKeywords = {'happy': 12,'funny puk': 1}

var gImgs = [
    {id: 1, url: 'img/1.jpg', keywords: ['funny']},
    {id: 2, url: 'img/2.jpg', keywords: ['animal']}
];

// var gMeme = {
//  selectedImgId: 1,
//  selectedLineIdx: 0,
//  lines: [
//  {
//  txt: 'I never eat Falafel',
//  size: 20,
//  align: 'left',
//  color: 'red'
//  }
//  ]
// }

// var gCurrImgIdx;

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
    {
    txt: 'I never eat Falafel',
    size: 20,
    align: 'left',
    color: 'red',
    strokeColor:'white',
    font:'impact',
    }
    ]
   }
   
   function drawText(text, x, y) {
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'red';
    gCtx.fillStyle = 'white';
    gCtx.font = '40px impact';
    gCtx.textAlign = 'center';
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}


function updateTxt(){
    gMeme.lines[gMeme.selectedLineIdx].txt= document.querySelector('input[name=text]').value;
    drawMeme(gMeme.selectedImgId);
}
//    function getImgIdxById(imgId) {
//     var imgIdx = gImgs.findIndex(function (currImg) {
//         return (currImg.id.toString() === imgId);
//     });
//     gCurrImgIdx=imgIdx;
//     return imgIdx;
// }

function drawMeme(imgId) {
    const img = new Image()
    img.src = `./img/${imgId}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height) //img,x,y,xend,yend
        var txt = gMeme.lines[0].txt;
        drawText(txt, 250, 50);
    }
}