// New Banana Club
moment.locale('zh-TW');

// Get today's date - as New Banana Club starts at 00:00
var today = moment().format('YYYYMMDD');
var yesterday_day = moment().subtract(1, 'days').format('dddd');
var yesterday_calendar = moment().subtract(1, 'days').format('L');

// If yesterday is Sat or Sun, hide list and show message
if (moment().subtract(1, 'days').format('d') == 6 || moment().subtract(1, 'days').format('d') == 0) {
    $('.today-list').css("display", "none");
    $('.na').css("display", "block");
}

// Insert link with given date
function init(date) {
    $('#part-1').html("<h4><a href='http://testmp3.http.akamai-trials.com/997/" + date + "/997_" + date + "0000.mp3'>第一節 (00:00 - 00:30)</a></h4><audio controls='controls' preload='none' class='player'><source src='http://testmp3.http.akamai-trials.com/997/" + date + "/997_" + date + "0000.mp3' type='audio/mpeg'>你的瀏覽器不支援此播放功能</audio>");
    $('#part-2').html("<h4><a href='http://testmp3.http.akamai-trials.com/997/" + date + "/997_" + date + "0030.mp3'>第二節 (00:30 - 01:00)</a></h4><audio controls='controls' preload='none' class='player'><source src='http://testmp3.http.akamai-trials.com/997/" + date + "/997_" + date + "0030.mp3' type='audio/mpeg'>你的瀏覽器不支援此播放功能</audio>");
    $('#part-3').html("<h4><a href='http://testmp3.http.akamai-trials.com/997/" + date + "/997_" + date + "0100.mp3'>第三節 (01:00 - 01:30)</a></h4><audio controls='controls' preload='none' class='player'><source src='http://testmp3.http.akamai-trials.com/997/" + date + "/997_" + date + "0100.mp3' type='audio/mpeg'>你的瀏覽器不支援此播放功能</audio>");
    $('#part-4').html("<h4><a href='http://testmp3.http.akamai-trials.com/997/" + date + "/997_" + date + "0130.mp3'>第四節 (01:30 - 02:00)</a></h4><audio controls='controls' preload='none' class='player'><source src='http://testmp3.http.akamai-trials.com/997/" + date + "/997_" + date + "0130.mp3' type='audio/mpeg'>你的瀏覽器不支援此播放功能</audio>");
    $('audio').on('play', function() {
	    $('audio').not(this).trigger('pause');
	});
}

// When user pick a date, update list
$(function() {
    $("#datepicker").datepicker({
    	defaultDate: -1,
        maxDate: '-1d',
        minDate: '-90d',
        beforeShowDay: disableSpecificWeekDays,
        onSelect: function(date) {
            var selectedDate = moment($(this).datepicker('getDate')).add(1, 'days').format('YYYYMMDD');
            var selectedDay = moment($(this).datepicker('getDate')).format('dddd');
            var selectedCalendar = moment($(this).datepicker('getDate')).format('L');
            $("#list").fadeOut(function() {
                $('#date').html("自選：" + selectedDay + " " + selectedCalendar);
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

$('#date').html("昨天：" + yesterday_day + ' ' + yesterday_calendar);

init(today);

// Auto play next part
$('audio').on('ended', function() {
    $(this).closest('li').next().find('.player').trigger('play');
});
