/**
 * Created by 宋大业 on 2018/9/28.
 */
function animate1(obj, target) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var leader = obj.offsetLeft;
        var step =(target-leader)/10;
        step = step > 0 ? Math.ceil(step):Math.floor(step);
        leader += step;
        //Math.abs(target - leader)  当前位置到目标的位置
        obj.style.left = leader + "px";
        if (target===leader) {
            clearInterval(obj.timer)
        }
},15)
}
