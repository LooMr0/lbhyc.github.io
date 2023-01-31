/***
 *对Date的扩展，将 Date 转化为指定格式的String
 *(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 *(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 * @param fmt
 * @returns {void | string}
 * @constructor
 */
Date.prototype.Format=function(fmt){var o={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),"S":this.getMilliseconds()};if(/(y+)/.test(fmt))fmt=fmt.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length));for(var k in o)if(new RegExp("("+k+")").test(fmt))fmt=fmt.replace(RegExp.$1,(RegExp.$1.length==1)?(o[k]):(("00"+o[k]).substr((""+o[k]).length)));return fmt}
/***
 * UTF转北京时间
 * @param timeUTC
 * @returns {string}
 * @constructor
 */
function UTC2BeiJing(timeUTC){var Y,MA,D,H,MI,S,time=new Date(timeUTC);Y=time.getFullYear();MA=time.getMonth()+1;D=time.getDate();H=time.getHours();MI=time.getMinutes();S=time.getSeconds();return Y+'-'+(MA<10?'0'+MA:MA)+'-'+(D<10?'0'+D:D)+' '+(H<10?'0'+H:H)+':'+(MI<10?'0'+MI:MI)+':'+(S<10?'0'+S:S)}

/**
 * currDay1to7(1) 周一
 * 获取当前日期的周一
 * @param dd
 * @param index
 * @returns {string}
 */
function currDay1to7(dd,index) {
    var week = dd.getDay(); //获取时间的星期数
    var minus = week ? week - 1 : 6;
    dd.setDate(dd.getDate() - minus); //获取minus天前的日期
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1; //获取月份
    var d = dd.getDate() + Number(index-1);
    return y + "-" + m + "-" + d;
}
/***
 * 数组对象 筛选特定值 time
 * @param arry
 * @param index
 * @param obj
 * @returns {*}
 */
function getParamDetail(arry, index, obj) {
    var newArr = arry.filter(function (arry) {
        return arry[obj].match(index)
    });
    return newArr
}
/**
 * getDateOne2Seven(currentTime,1) 周一
 * 获取当前日期的周一
 * @param currentTime
 * @param index
 * @returns {string}
 */
function getDateOne2Seven(currentTime,index) {
    if(!currentTime){
        currentTime = new Date().Format('yyyy-MM-dd')
    }
    var currentDate = new Date(currentTime);
    var timesStamp = currentDate.getTime();
    var currenDay = currentDate.getDay();
    var dates = [];
    for (var i = 0; i < 7; i++) {
        dates.push(new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7)).Format('yyyy-MM-dd'));
    }
    return dates[index] || dates
}

//页面跳转 非APICLOUD环境下采用路由跳转方式
function pageTo(param){
    if(window.api){
        api.openWin({
            name: param.name,
            url: param.url,
            pageParam: param,
            vScrollBarEnabled:false,
            hScrollBarEnabled:false,
            animation:{
                type:"push",                //动画类型（详见动画类型常量）
                subType:"from_right",       //动画子类型（详见动画子类型常量）
                duration:300                //动画过渡时间，默认300毫秒
            },
            progress:{
                type:"page",            //加载进度效果类型，默认值为 default，取值范围为 default|page，为 page 时，进度效果为仿浏览器类型，固定在页面的顶部
                title:"",               //type 为 default 时显示的加载框标题，字符串类型
                text:"",                //type 为 default 时显示的加载框内容，字符串类型
                color:"#45C01A",        //type 为 page 时进度条的颜色，默认值为 #45C01A，支持#FFF，#FFFFFF，rgb(255,255,255)，rgba(255,255,255,1.0)等格式
                height:3                //type 为 page 时进度条高度，默认值为3，数字类型
            }
        });
    }else{
        window.location.href = param.url
    }
}

// 返回上一个窗口
function closePage(){
    if(window.api){
        api.closeWin();
    }else{
        window.history.go(-1)
    }
}