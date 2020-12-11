function calculateChristmasCountdown() {

  //Get today's date.
  var now = new Date();

  //Get the current month. Add a +1 because
  //getMonth starts at 0 for January.
  var currentMonth = (now.getMonth() + 1);

  //Get the current day of the month.
  var currentDay = now.getDate();

  //Work out the year that the next Christmas
  //day will occur on.
  var nextChristmasYear = now.getFullYear();
  if (currentMonth == 12 && currentDay > 25) {
    //This year's Christmas Day has already passed.
    nextChristmasYear = nextChristmasYear + 1;
  }

  var nextChristmasDate = nextChristmasYear + '-12-25T00:00:00.000Z';
  var christmasDay = new Date(nextChristmasDate);

  //Get the difference in seconds between the two days.
  var diffSeconds = Math.floor((christmasDay.getTime() - now.getTime()) / 1000);

  var days = 0;
  var hours = 0;
  var minutes = 0;
  var seconds = 0;

  //Don't calculate the time left if it is Christmas day.
  if (currentMonth != 12 || (currentMonth == 12 && currentDay != 25)) {
    //Convert these seconds into days, hours, minutes, seconds.
    days = Math.floor(diffSeconds / (3600 * 24));
    diffSeconds -= days * 3600 * 24;
    hours = Math.floor(diffSeconds / 3600);
    diffSeconds -= hours * 3600;
    minutes = Math.floor(diffSeconds / 60);
    diffSeconds -= minutes * 60;
    seconds = diffSeconds;
  }

  //Add our counts to their corresponding HTML elements.
  document.getElementById('days').innerHTML = days + ' Days';
  document.getElementById('hours').innerHTML = hours + ' Hours';
  document.getElementById('minutes').innerHTML = minutes + ' Minutes';
  document.getElementById('seconds').innerHTML = seconds + ' Seconds';

  //Recursive call after 1 second using setTimeout
  setTimeout(calculateChristmasCountdown, 1000);
}

calculateChristmasCountdown();