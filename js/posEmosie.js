window.onload = main()

function main (){
    let skey = window.location.href.split('=')[1]
    getPostiveEmotionList(skey)
    searchEmotion(skey)
}

function getPostiveEmotionList(skey){
    fetch("http://39.97.228.101:8080/kuro/emotions?skey="+skey+"&type=0&content=&page=&rank=1&search=&full=")
    .then(res => res.json())
    .then(function(res){
        res = eval(res)
        drawEmotion(res.data)
    })
}
function searchEmotion(skey){
    let searchInput = document.getElementById('searchText')
    let searchBtn = document.getElementById('searchBtn')
    
    let emo = document.getElementById('emo')
    searchBtn.addEventListener('click',function(){
        let text = searchInput.value
        console.log(text)
        fetch("http://39.97.228.101:8080/kuro/emotions?skey="+skey+"&type=&content="+text+"&page=&rank=1&search="+"&full=")
        .then(res => res.json())
        .then(function(res){
        res = eval(res)
        emo.innerHTML = ''
        console.log(res)
        drawEmotion(res.data)
    })
    })
    
}
// function searchEmotion(skey){
//     fetch("http://39.97.228.101:8080/kuro/emotions?skey="+skey+"&type=&content=&page=&rank=1&search="+"&full=")
//     .then(res => res.json())
//     .then(function(res){
//         res = eval(res)
//         console.log(res)
//         drawEmotion(res)
        
//     })
// }
function drawEmotion(res){
    posEmoNum = res.num
    
    emo = document.getElementById('emo')
    for(let i = 0 ; i < posEmoNum;i++){
        
        emoId = res.emotionList[i].id
        starNum = res.emotionList[i].stars
        brief = res.emotionList[i].brief
        photoNum = res.emotionList[i].photoNum
        voice = res.emotionList[i].content
        time = res.emotionList[i].stringCreatedAt
        
        text = res.emotionList[i].text
        let skey = window.location.href.split('=')[1]
        drawEmoBox(emo,time,emoId,voice,text,photoNum,starNum,skey)
    }
}

function drawEmoBox(div,time,No,voice,text,photoNum,starNum,skey){
    
    emoBox = document.createElement('div')
    emoBox.setAttribute('id','emoBox')
    drawTimeBox(emoBox,time,No)
    drawRightBox(emoBox,voice,text,photoNum,starNum,No,skey)
    div.appendChild(emoBox)
}

function drawTimeBox(div,time,No){
    
    timeBox = document.createElement('div')
    timeBox.setAttribute('id','time')
    NoBox = document.createElement('h3')
    p1 = document.createElement('p')
    p2 = document.createElement('p')
    NoBox.innerText = No
    time = time.split("")
    dayString = time[5]+time[6]+time[7]+time[8]+time[9]
    timeString = time[11]+time[12]+time[13]+time[14]+time[15]
    p1.innerText = dayString
    p2.innerText = timeString
    timeBox.appendChild(NoBox)
    timeBox.appendChild(p1)
    timeBox.appendChild(p2)
    div.appendChild(timeBox)
    
}

function drawRightBox(div,voice,text,photoNum,starNum,No){
    rightBox = document.createElement('div')
    rightBox.setAttribute('id','rightBox')
    drawEmoContentBox(rightBox,voice,text,photoNum,No)
    drawEmoStar(rightBox,starNum)
    div.appendChild(rightBox)
}

function drawEmoContentBox(div,voice,text,photoNum,No){
    emoContentBox = document.createElement('div')
    emoContentBox.setAttribute('id','emoContent')
    voiceBox = document.createElement('img')
    voiceBox.setAttribute('id','voice')
    
    if (voice == 0 ){
        voiceBox.setAttribute('style','display:none')
    }else{
        voiceBox.setAttribute('src','./Design/huatong@3x.png')
    }
    p = document.createElement('p')
    p.setAttribute('id','text')
    p.setAttribute('maxlength','10')
    p.setAttribute('style','display:block')
    p.innerText = text

    imgBox = document.createElement('img')
    imgBox.setAttribute('id','image')
    
    if (photoNum == 0){
        imgBox.setAttribute('style','display:none')
    }else{
        imgBox.setAttribute('src','http://39.97.228.101:8080/kuro/src/photo/'+No+'/'+'1?skey='+window.location.href.split('=')[1]+'&filetype=')
        console.log('http://39.97.228.101:8080/kuro/src/photo/'+No+'/'+'1?skey='+window.location.href.split('=')[1]+'&filetype=')
    }
    emoContentBox.appendChild(voiceBox)
    emoContentBox.appendChild(p)
    emoContentBox.appendChild(imgBox)
    div.appendChild(emoContentBox)
}

function drawEmoStar(div,starNum){
    starBox = document.createElement('div')
    starBox.setAttribute('id','emoStar')
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
    div.appendChild(starBox)
}




