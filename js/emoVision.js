window.onload = main()



function main () {
    var arr1 = [1,32,4,55,2,12,78,1,22,1]
    var arr2 = [1,3,41,5,22,12,8,12,2,11]
    drawGra(arr1,document.querySelector('#emoDayGra'))
    drawGra(arr2,document.querySelector('#emoMonGra'))
    
    swipeDown()
    hideWiki()
}

function drawGra(arr,canvasObject){
    let data = arr
    let canvas = canvasObject
    let ctx = canvas.getContext('2d')
    canvasWidth = canvas.width
    canvasHeight = canvas.height
    avgWidth = canvasWidth / data.length 
    avgHeight = canvasHeight / (Math.max(...data) + 20)
    ctx.beginPath()
    ctx.moveTo(300,150)
    ctx.lineTo(290,140)
    ctx.moveTo(0,0)
    ctx.lineTo(10,10)
    ctx.font = "22px serif";
    ctx.moveTo(0,canvas.height - data[0] * avgHeight)
    for (let x = 0 ;x < data.length ; x++){
        pos_x = x * avgWidth
        pos_y = canvas.height - data[x] * avgHeight
        ctx.lineTo(pos_x,pos_y)
        
        ctx.fillText(data[x],pos_x,pos_y-10)
    }
    ctx.stroke()
    console.log('finish')
}


function swipeDown(){//滑动触摸事件
    content = $("#contentBox")
    wiki = $('#wiki')
    content.on("touchstart", function(e) {
        e.preventDefault();
        startX = e.originalEvent.changedTouches[0].pageX,
        startY = e.originalEvent.changedTouches[0].pageY;
        });
    content.on("touchmove", function(e) {
        e.preventDefault();
        moveEndX = e.originalEvent.changedTouches[0].pageX,
        moveEndY = e.originalEvent.changedTouches[0].pageY,
        X = moveEndX - startX,
        Y = moveEndY - startY;
        content.css({
            'margin-top':Y 
        })
    content.on('touchend',function(e){
        console.log(content.css('margin-top'))
        if (Y > 200){
            content.css({
                'margin-top':'100vh'
            },400);
            wiki.fadeIn(300)
            wiki.css({
                'display':'flex'
            })
            
        }else{
            content.css({
                'margin-top':0
            },200)
        }
    })
　　});
}
function hideWiki(){
    content = $("#contentBox")
    wiki = $('#wiki')
    backBtn = $('#back')
    backBtn.click(function(){
        wiki.fadeOut(300)
        content.css({
            'margin-top':0
        })
        
    })
}
