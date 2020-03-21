$(document).ready(function(){
    skey = window.location.href.split('=')[1]
    showMenu()
    buttonBoxAninmate()
    emoCatch(skey)
})
function emoCatch(skey){//打捞效果
    let catchBtn = $('#catchbtn')
    
    catchBtn.off('click')
    catchBtn.click(function(){
        getRandomEmotion(skey) 
    })
    
}

function getRandomEmotion(skey){
    console.log(skey)
    if (document.getElementById('randomCatch').checked == true){
        randomNum = Math.floor(Math.random())
        var url = "http://39.97.228.101:8080/kuro/emotion?skey="+skey+"&type=random&etype="+randomNum
    }else if(document.getElementById('emoNumCatch').checked == true){
        var url = "http://39.97.228.101:8080/kuro/emotion?skey="+skey+"&type=random&etype=0"
    }else if(document.getElementById('emoNumCatchRes').checked == true){
        var url = "http://39.97.228.101:8080/kuro/emotion?skey="+skey+"&type=random&etype=1"
    }
    console.log("http://39.97.228.101:8080/kuro/emotion?skey="+skey+"&type=random&etype=0")
    fetch(url)
    .then(res => res.json())
    .then(function (res){
        res = eval(res)
        data = res.data

        console.log(data)
        theSkey = skey
        emoID = data.id
        starNum = data.stars
        emoType = data.type
        emoTime = data.createdAt
        emoText = data.text
        emoVoiceAndAccept = data.content
        emoPhotoNum = data.photoNum
        emoDate = data.createdAt
        drawStar(starNum)
        drawText(emoText)
        emoVoice(emoVoiceAndAccept,emoID)
        emoPhoto(emoPhotoNum,emoID)

        catchAnimate(emoType)
        function catchAnimate(typeNo){
            //按钮动画
            borderSide = $('#borderside')
            catchBtn = $('#catchbtn')
            emoCard = $('#emoCard')
            buttonBox = $('#buttonbox')
            deleteBox = $('#deletebox')
            cardClose = $('#cardClose')
            tagBad = $('#tag1')
            tagGood = $('#tag2')

            borderSide.animate({
                'width':'35vw',
                'height':'35vw',
                'border-radius':'20vw',
            },200)
            
            catchBtn.hide(500)
            borderSide.hide(500)
            emoCard.fadeIn(1000)
            if (typeNo === 0){
                buttonBox.hide()
                deleteBox.show()
                cardClose.click(function (){
                    initAll ()
                })
            }else {
                buttonBox.show()
                deleteBox.hide()
                cardClose.click(function (){
                    initAll ()
                })
            }
            
            if (typeNo == 0){//模拟为好心情
                emoCard.css({
                    'background-color':'#F0DBDB'
                })
                tagGood.animate({
                    'margin-top':'0px'
                })
                buttonBox.toggleClass('hide',true)
                deleteBox.toggleClass('hide',false)
                console.log('good')
            }else{//模拟坏心情
                tagBad.animate({
                    'margin-top':'0px'
                })
                emoCard.css({
                    'background-color':'#BDCFD6'
                })
                buttonBox.toggleClass('hide',false)
                deleteBox.toggleClass('hide',true)
                console.log('bad')
            }
        }
        
    })
}


function showMenu(){//显示右侧菜单
    let menuButton = $('#menuButton')
    let leftMenu = $('#leftmenu')
    let closeLeftMenu = $('#closeLeftMenu')

    menuButton.click(function(){
        $('#leftmenu').show(500)
        event.stopPropagation()
    })

    closeLeftMenu.click(function(){
        $('#leftmenu').hide(500)
    })

    
}
function emoPhoto(Num,emoID){
    textImg = document.getElementById('textImg')
    if (Num > 0 ){
        for (let i =0 ; i < Num ; i++ ){
            textImg.setAttribute('src','http://39.97.228.101:8080/kuro/src/photo/'+emoID+'/'+'1?skey='+window.location.href.split('=')[1]+'&filetype=')
            // textImg.setAttribute('src','http://39.97.228.101:8080/kuro/src/photo/219/1?skey=1')
        }

        
    }else{ 
        textImg.setAttribute('style','display:none')
        
    }
}

function emoVoice(emoVoiceAndAccept,skey,emoID){
    console.log(emoVoiceAndAccept)
    if (emoVoiceAndAccept == 0){
        $('#voice').css({
            'display':'none'
        })
    }else{
        // $('#audio').attr('src','http://39.97.228.101:8080/kuro/src/voice/'+emoID+'&skey='+skey)
    }
}

function drawText(emoText){
    textBox = document.getElementById('emoText')
    textBox.innerHTML = emoText
}

function drawStar(starNum){
    starBox = document.getElementById('star')
    starBox.innerHTML = ''
    for (let i = 0 ; i < starNum ; i++){
        fillStar = document.createElement('i')
        fillStar.setAttribute('class','fa fa-star')
        starBox.appendChild(fillStar)
    }
    for (let i = 0 ; i < 5 - starNum ; i++){
        strokeStar = document.createElement('i')
        strokeStar.setAttribute('class','far fa-star')
        starBox.appendChild(strokeStar)
    }
}



function initAll (){//复原
    let catchBtn = $('#catchbtn')
    let borderSide = $('#borderside')
    let emoCard = $('#emoCard')
    let tagAll = $('#tag div')
    let starBox = document.getElementById('star')

    borderSide.css({
        'width': '29vw',
        'height': '29vw',
        'border-radius': '20vw',
    })
    catchBtn.fadeIn(1000)
    borderSide.fadeIn(1000)
    emoCard.hide(1000);
    tagAll.animate({
        'margin-top':'-5vh'
    },'slow')
}


function buttonBoxAninmate(){//四个按钮的动画
    yn();
    fs();
    pl();
    del();
}

function yn (id,skey){//悦纳动画
    let ynBtn = $('#yn')
    let emoCard = $('#emoCard')

    ynBtn.click(function(){
        emoCard.css({
            'background-color':'#F0DBDB'
        })
        emoCard.fadeOut(1000)
        initAll()
        fetch("http://39.97.228.101:8080/kuro/emotion/"+id+"?skey="+skey+"&type=accept",{
            method :"POST",
        })
    })
}
function fs () {//粉碎动画
    let fsBtn = $('#fs')
    let emoCard = $('#emoCard')

    fsBtn.click(function(){
        emoCard.slideUp(1000)
        initAll()
    })
}
function pl (){//漂流动画
    let plBtn = $('#pl')
    let emoCard = $('#emoCard')

    plBtn.click(function(){
        emoCard.hide(500)
        initAll()
    })
}
function del (){//删除动画
    let deleteBtn = $('#deletebox')
    let emoCard = $('#emoCard')

    deleteBtn.click(function(){
        emoCard.slideUp(1000)
        initAll()
    })
}
