var d = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
var year = d.getFullYear();
var month = d.getMonth() + 1;
if (month<10) {
  month = "0"+month;
};
var today_date = d.getDate();
if (today_date<10) {
  today_date = "0"+today_date;
};
var currentDate = new Date();
  var tomorrow_date = currentDate.getDate();
var tomorrow_month = currentDate.getMonth() + 1
  if (tomorrow_month<10) {
    tomorrow_month = "0"+tomorrow_month;
  };
var tomorrow_year = currentDate.getFullYear()
if (tomorrow_date<10) {
  tomorrow_date = "0"+tomorrow_date;
};
var tomorrow = String(tomorrow_year)+String(tomorrow_month)+String(tomorrow_date);
var today = String(year)+String(month)+String(today_date);
var weekday = new Array(7);
  weekday[0]=  "星期日";
  weekday[1] = "星期一";
  weekday[2] = "星期二";
  weekday[3] = "星期三";
  weekday[4] = "星期四";
  weekday[5] = "星期五";
  weekday[6] = "星期六";
var today_day = weekday[d.getDay()];
if (d.getDay()==6||d.getDay()==0) {
  $('.today-list').css("display","none");
  $('.na').css("display","block");
}

$('#yesterday').html(today_day+" "+year+"年"+month+"月"+today_date+"日");
$('#part-1').html("<h4><a href='http://testmp3.http.akamai-trials.com/997/"+tomorrow+"/997_"+tomorrow+"0000.mp3'>第一節 (00:00 - 00:30)</a></h4><audio controls='controls' preload='none' class='player'><source src='http://testmp3.http.akamai-trials.com/997/"+tomorrow+"/997_"+tomorrow+"0000.mp3' type='audio/mpeg'>你的瀏覽器不支援此播放功能</audio>");
$('#part-2').html("<h4><a href='http://testmp3.http.akamai-trials.com/997/"+tomorrow+"/997_"+tomorrow+"0030.mp3'>第二節 (00:30 - 01:00)</a></h4><audio controls='controls' preload='none' class='player'><source src='http://testmp3.http.akamai-trials.com/997/"+tomorrow+"/997_"+tomorrow+"0030.mp3' type='audio/mpeg'></audio>");
$('#part-3').html("<h4><a href='http://testmp3.http.akamai-trials.com/997/"+tomorrow+"/997_"+tomorrow+"0100.mp3'>第三節 (01:00 - 01:30)</a></h4><audio controls='controls' preload='none' class='player'><source src='http://testmp3.http.akamai-trials.com/997/"+tomorrow+"/997_"+tomorrow+"0100.mp3' type='audio/mpeg'></audio>");
$('#part-4').html("<h4><a href='http://testmp3.http.akamai-trials.com/997/"+tomorrow+"/997_"+tomorrow+"0130.mp3'>第四節 (01:30 - 02:00)</a></h4><audio controls='controls' preload='none' class='player'><source src='http://testmp3.http.akamai-trials.com/997/"+tomorrow+"/997_"+tomorrow+"0130.mp3' type='audio/mpeg'></audio>");

$(function() {
  $.datepicker.setDefaults({dateFormat: 'yy年mm月dd日'});
  $( "#datepicker" ).datepicker({
    maxDate: year + "年" + month + "月" + today_date + "日",
    beforeShowDay: disableSpecificWeekDays,
    onSelect: function(date) {
      var minDate = $(this).datepicker('getDate');
            if (minDate) {
                minDate.setDate(minDate.getDate() + 1);
            }
      var dd = String(minDate.getDate());
      var ddd = minDate.getDate()-1;
      if (dd<10) {
        dd = "0"+dd;
      };
      var mm = String(minDate.getMonth() + 1);
      if (mm<10) {
        mm = "0"+mm;
      };
      var yy = String(minDate.getFullYear());
      var selectedDate = yy+mm+dd;
      var selected_day = weekday[minDate.getDay()-1];
      $("#list").fadeOut(function() {
        $("#list").html("<p align='center'><strong>自選："+selected_day+" "+date+"</strong><br>（可右鍵另存方便日後收聽）</p><ul class='list-group today-list'><li class='list-group-item'><h4><a href='http://testmp3.http.akamai-trials.com/997/"+selectedDate+"/997_"+selectedDate+"0000.mp3'>第一節 (00:00 - 00:30)</a></h4><audio class='player' controls='controls' preload='none'><source src='http://testmp3.http.akamai-trials.com/997/"+selectedDate+"/997_"+selectedDate+"0000.mp3' type='audio/mpeg'>你的瀏覽器不支援此播放功能</audio></li><li class='list-group-item'><h4><a href='http://testmp3.http.akamai-trials.com/997/"+selectedDate+"/997_"+selectedDate+"0030.mp3'>第二節 (00:30 - 01:00)</a></h4><audio class='player' controls='controls' preload='none'><source src='http://testmp3.http.akamai-trials.com/997/"+selectedDate+"/997_"+selectedDate+"0030.mp3' type='audio/mpeg'></audio></li><li class='list-group-item'><h4><a href='http://testmp3.http.akamai-trials.com/997/"+selectedDate+"/997_"+selectedDate+"0100.mp3'>第三節 (01:30 - 02:00)</a></h4><audio class='player' controls='controls' preload='none'><source src='http://testmp3.http.akamai-trials.com/997/"+selectedDate+"/997_"+selectedDate+"0100.mp3' type='audio/mpeg'></audio></li><li class='list-group-item'><h4><a href='http://testmp3.http.akamai-trials.com/997/"+selectedDate+"/997_"+selectedDate+"0130.mp3'>第四節 (01:30 - 02:00)</a></h4><audio class='player' controls='controls' preload='none'><source src='http://testmp3.http.akamai-trials.com/997/"+selectedDate+"/997_"+selectedDate+"0130.mp3' type='audio/mpeg'></audio></li></ul>").fadeIn(function() {
            $('audio').on('ended', function() {
              $(this).closest('li').next().find('.player').trigger('play');
            });
        });
      });
    }
  });
});
function disableSpecificWeekDays(date) {
    if(date.getDay()==0||date.getDay()==6){
        return [false];
    }else{
        return [true];
    }
}

$('audio').on('ended', function() {
  $(this).closest('li').next().find('.player').trigger('play');
});
