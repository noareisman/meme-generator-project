'use strict';

var gKeywords = {'happy': 12,'funny puk': 1}

var gImgs = [{id: 1, url: 'img/1.jpg', keywords: ['happy']}];

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

var text = document.querySelector('input[name=text]').value;

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
    {
    txt: 'I never eat Falafel',
    size: 20,
    align: 'left',
    color: 'red'
    }
    ]
   }
   