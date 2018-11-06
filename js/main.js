/**
 * Created by 宋大业 on 2018/10/16.
 */
var aDiv1 = document.getElementsByClassName('banmain');
var ban = document.getElementsByClassName('banner')[0];
var aA1 = document.querySelectorAll('.points .ban');
var prev = document.getElementsByClassName('prev')[0];
var next = document.getElementsByClassName('next')[0];
var arrcolor = ['#adc3d8','#ff68c1','black','#adc3d8','#ff68c1','black'];

var square=0;
var timer = null;
console.log(aDiv1);
console.log(aA1);
for (var i = 0; i < aA1.length; i++) {
    aA1[i].index = i;
    aA1[i].onmouseover = function () {
        for (var j = 0; j < aDiv1.length; j++) {
            aA1[j].classList.remove('active');
            aDiv1[j].classList.remove('active');
        }
        this.classList.add('active');
        aDiv1[this.index].classList.add('active');
        ban.style.background=arrcolor[this.index];
        square = this.index;
    };
}

ban.onmouseover = function(){
    clearInterval(timer);
};
ban.onmouseout = function(){
    timer = setInterval(playnext,2000);
};

next.onclick=function(){
    if(square < aA1.length - 1){
        square++;
    }else {square=0}
    for (var i = 0; i < aA1.length; i++) {
        aA1[i].classList.remove('active');
        aDiv1[i].classList.remove('active');
    }
    aA1[square].classList.add('active');
    aDiv1[square].classList.add('active');
    ban.style.background=arrcolor[square];
};

prev.onclick=function(){
    if(square>0){
        square--
    }else {
        square=aA1.length-1;
    }
    for (var i = 0; i < aA1.length; i++) {
        aA1[i].classList.remove('active');
        aDiv1[i].classList.remove('active');
    }
    aA1[square].classList.add('active');
    aDiv1[square].classList.add('active');
    ban.style.background=arrcolor[square];
};

timer = setInterval(playnext,2000);

function playnext(){
   next.onclick();
}

var right = document.getElementById('right');
var left = document.getElementById('left');
var oUl2 = document.getElementById('oUl2');
var target = 0;
var pic = 0;
right.onclick = function () {
    if (pic === 2) {
        oUl2.style.left = 0;
        pic = 0;
    }
    pic++;
    target = -pic * 645;
    animate1(oUl2, target);
};

left.onclick = function () {
    if (pic === 0) {
        oUl2.style.left = -1290+'px';
        pic = 2;
    }
    pic--;
    target = -pic * 645;
    animate1(oUl2, target);
};


var oUl = document.getElementById('oUl');

function ajax(url,fnSucc,fnFaild){
    try{
        var xml = new XMLHttpRequest();
    }catch (error){
        xml=new ActiveXObject("Mircrosoft.XMLHttp")
    }
    xml.open('GET',url,true);

    xml.send();

    xml.onreadystatechange=function(){
        if(xml.readyState===4&&xml.status===200){
            fnSucc(xml.responseText)
        }else {
            if(fnFaild){
                fnFaild();
            }

        }
    };
}

ajax("json/oUl1.json",function(strr) {
    var arr = eval(strr);
    let str = ``;
    for (var i = 0; i < arr.length; i++) {
            var{srcc,hot,text,classN}=arr[i];
            str+=`
         <li>
                                    <div class="img">
                                        <img src="${srcc}" alt="">
                                        <div class="img-layer clear">
                                            <i class="icon img-i1 fl"></i>
                                            <span>${hot}万</span>
                                            <i class="icon img-i2 fr"></i>
                                        </div>
                                    </div>
                                    <p>
                                        <i class="${classN}"></i>
                                        ${text}
                                    </p>
                                </li>
        `;
    }
    oUl.innerHTML = str;
},null);

ajax("json/oUl2.json",function(strr){
    var arr = eval(strr);
    let str = ``;
    for (var i = 0; i < arr.length; i++) {
        var{srcc,text,text2,srcc2}=arr[i];
        str+=`
    <li><img src="${srcc}" alt="">
    <p>${text}</p>
    <span>${text2}</span>
    <img src="${srcc2}" alt="" class="layer-li">
    </li>
     `
    }
    oUl2.innerHTML = str;
},null);








