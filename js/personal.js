window.onload = main()

function main (){
    skey = window.location.href.split('=')[1]
    getUserInfo(skey)
    changeUserNick(skey)
}

function getUserInfo(skey){//获取并渲染个人信息
    url = 'http://39.97.228.101:8080/kuro/user?skey='+skey
    fetch(url)//获取个人信息
    .then(res => res.json())
    .then(function(res){
        res = eval(res)
        console.log(res.data)
        id = res.data.id
        nick = res.data.nick
        emotionNum = res.data.emotionNum
        console.log(emotionNum)
    })
    .then(function(){//渲染个人信息
        nickBox = document.querySelector('#idbox h4')
        emotionNumBox = document.querySelector('#emobox h3')
        
        emotionNumBox.innerHTML = emotionNum
        nickBox.innerHTML = nick
    })
}

function changeUserNick(skey){
    nickName = document.querySelector('#idbox h4')
    changeName = document.getElementById('changeName')
    body = document.querySelector('body')

    changeName.addEventListener('click',function(e){
        e.stopPropagation()
        nickName.setAttribute("contenteditable","true")
        nickName.focus()
        body.addEventListener('click',function(e){
            
            nickName.setAttribute("contenteditable","false")
            let newNick = nickName.innerHTML
            data = {"nick":newNick}
            url = 'http://39.97.228.101:8080/kuro/user?skey='+skey+'&type=modify'
            fetch(url,{
                method:"POST",
                body:JSON.stringify(data)
            })
            .then(res => res.json())
            .then(function(res){
                res = eval(res)
                console.log(res)
            })
        })
    })
}




