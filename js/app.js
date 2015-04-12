var datepicker = $('.js-datepicker');

datepicker.datepicker({
	format: "yyyy年mm月dd日",
    weekStart: 0,
    startDate: "-120d",
    endDate: "-1d",
    language: "zh-TW",
    keyboardNavigation: false,
    daysOfWeekDisabled: "0,6"
});

// On initialize
today = new Date();
if (today.getDay() == 0 || today.getDay() == 1) {
	$('.playlist-container').hide();
} else {
	$('.na').hide();
	datepicker.datepicker('update', '-1d');
	updatePlaylist();
}

// On change of dates
datepicker.datepicker().on('changeDate', function(e) {
	// updatePlaylist();
	$('.na').hide();
	$('.playlist-container').fadeOut(function() {
		updatePlaylist();
	}).fadeIn();
});

// Update playlist
function updatePlaylist() {
	tomorrow = getTomorrow();
	url = setURL(tomorrow);
	today = datepicker.datepicker('getFormattedDate');
	$('.date').html(today)
	$('.playlist li a').each(function(index) {
		$(this).attr("href", url[index]);
	});
	$('.playlist .player').each(function(index) {
		$(this).attr("src", url[index]);
	});
}

// Generate mp3 links
function setURL(tomorrow) {
	date = tomorrow.year + tomorrow.month + tomorrow.day;
	url = 
	[
		'http://testmp3.http.akamai-trials.com/997/' + date + '/997_' + date + '0000.mp3',
		'http://testmp3.http.akamai-trials.com/997/' + date + '/997_' + date + '0030.mp3',
		'http://testmp3.http.akamai-trials.com/997/' + date + '/997_' + date + '0100.mp3',
		'http://testmp3.http.akamai-trials.com/997/' + date + '/997_' + date + '0130.mp3'
	];
	return url;
}

// Calculate tomorrows date in yyyymmdd format
function getTomorrow() {
	date = datepicker.datepicker('getDate');
	date.setDate(date.getDate()+1);
	day = date.getDate()<10? '0'+date.getDate() : date.getDate();
	month = (date.getMonth()+1)<10? '0'+(date.getMonth()+1) : (date.getMonth()+1);
	year = date.getFullYear();
	tomorrow = 
	{ 
		year: String(year),
		month: String(month),
		day: String(day)
	};
	return tomorrow;
}

// Auto play next part
$('audio').on('ended', function() {
    $(this).closest('li').next().find('.player').trigger('play');
});
