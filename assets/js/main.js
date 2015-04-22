// New Banana Club

// Array to convert getDate() to Chinese
var weekday = new Array(7);
weekday[0] = "星期日";
weekday[1] = "星期一";
weekday[2] = "星期二";
weekday[3] = "星期三";
weekday[4] = "星期四";
weekday[5] = "星期五";
weekday[6] = "星期六";

// Get yesterday's date
var yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
var yesterday_year = yesterday.getFullYear();
var yesterday_month = yesterday.getMonth() + 1;
var yesterday_date = yesterday.getDate();

// Get today's date - as New Banana Club starts at 00:00
var currentDate = new Date();
var today_year = currentDate.getFullYear()
var today_month = currentDate.getMonth() + 1
var today_date = currentDate.getDate();
var today = String(today_year) + ("0" + String(today_month)).slice(-2) + ("0" + String(today_date)).slice(-2);

// Convert today's day to Chinese
var yesterday_day = weekday[yesterday.getDay()];

// If yesterday is Sat or Sun, hide list and show message
if (yesterday.getDay() == 6 || yesterday.getDay() == 0) {
    $('.today-list').css("display", "none");
    $('.na').css("display", "block");
}

// Insert link with given date
function init(date) {
    $('#part-1').html("<h4><a href='http://testmp3.http.akamai-trials.com/997/" + date + "/997_" + date + "0000.mp3'>第一節 (00:00 - 00:30)</a></h4><audio controls='controls' preload='none' class='player'><source src='http://testmp3.http.akamai-trials.com/997/" + date + "/997_" + date + "0000.mp3' type='audio/mpeg'>你的瀏覽器不支援此播放功能</audio>");
    $('#part-2').html("<h4><a href='http://testmp3.http.akamai-trials.com/997/" + date + "/997_" + date + "0030.mp3'>第二節 (00:30 - 01:00)</a></h4><audio controls='controls' preload='none' class='player'><source src='http://testmp3.http.akamai-trials.com/997/" + date + "/997_" + date + "0030.mp3' type='audio/mpeg'>你的瀏覽器不支援此播放功能</audio>");
    $('#part-3').html("<h4><a href='http://testmp3.http.akamai-trials.com/997/" + date + "/997_" + date + "0100.mp3'>第三節 (01:00 - 01:30)</a></h4><audio controls='controls' preload='none' class='player'><source src='http://testmp3.http.akamai-trials.com/997/" + date + "/997_" + date + "0100.mp3' type='audio/mpeg'>你的瀏覽器不支援此播放功能</audio>");
    $('#part-4').html("<h4><a href='http://testmp3.http.akamai-trials.com/997/" + date + "/997_" + date + "0130.mp3'>第四節 (01:30 - 02:00)</a></h4><audio controls='controls' preload='none' class='player'><source src='http://testmp3.http.akamai-trials.com/997/" + date + "/997_" + date + "0130.mp3' type='audio/mpeg'>你的瀏覽器不支援此播放功能</audio>");
}

// When user pick a date, update list
$(function() {
    $.datepicker.setDefaults({
        dateFormat: 'yy年mm月dd日'
    });
    $("#datepicker").datepicker({
        maxDate: yesterday_year + "年" + yesterday_month + "月" + yesterday_date + "日",
        beforeShowDay: disableSpecificWeekDays,
        onSelect: function(date) {
            var minDate = $(this).datepicker('getDate');
            if (minDate) {
                minDate.setDate(minDate.getDate() + 1);
            }
            var dd = String(minDate.getDate());
            var ddd = minDate.getDate() - 1;
            var mm = String(minDate.getMonth() + 1);
            var yy = String(minDate.getFullYear());
            var selectedDate = yy + ("0" + mm).slice(-2) + ("0" + dd).slice(-2);
            var selected_day = weekday[minDate.getDay() - 1];
            $("#list").fadeOut(function() {
                $('#date').html("自選：" + selected_day + " " + date);
                init(selectedDate);
                $('.today-list').css("display", "block");
                $('.na').css("display", "none");
                $("#list").fadeIn(function() {
                    $('audio').on('ended', function() {
                        $(this).closest('li').next().find('.player').trigger('play');
                    });
                });
            });
        }
    });
});

// Disable weekends on datepicker
function disableSpecificWeekDays(date) {
    if (date.getDay() == 0 || date.getDay() == 6) {
        return [false];
    } else {
        return [true];
    }
}

$('#date').html("昨天：" + yesterday_day + " " + yesterday_year + "年" + ("0" + yesterday_month).slice(-2) + "月" + ("0" + yesterday_date).slice(-2) + "日");

init(today);

// Auto play next part
$('audio').on('ended', function() {
    $(this).closest('li').next().find('.player').trigger('play');
});
