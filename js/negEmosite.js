window.onload = main()

function main (){
    let skey = window.location.href.split('=')[1]
    getUserInfo(skey)
}

function getUserInfo(skey){//获取并渲染个人信息
    url = 'http://39.97.228.101:8080/kuro/user?skey='+skey
    fetch(url)//获取个人信息
    .then(res => res.json())
    .then(function(res){
        res = eval(res)
        let badEmotionNum = res.data.badmoodNum
        drawText(badEmotionNum)
    })
}

function drawText(Num){
    let badNum = document.getElementById('h1')
    badNum.innerHTML = Num
}





