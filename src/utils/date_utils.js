/**
 * Took the basic function from https://gist.github.com/miguelmota/7905510
 * and modified for my needs.
 **/
// Returns an array of dates between the two dates
const getDates = function(startDate, endDate) {
  let dates = [],
    currentDate = startDate,
    addDays = function(days) {
      const date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    },
    // Grabbing the dates we need in the format that the
    // Weather API expects
    parseDate = function() {
      const date = new Date(this.valueOf());
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    };
  while (currentDate <= endDate) {
    dates.push(parseDate.call(currentDate));
    currentDate = addDays.call(currentDate, 1);
  }
  return dates;
};

// Usage
const dates = getDates(new Date(2018, 7, 22), new Date(2018, 7, 31));
dates.forEach(function(date) {
  console.log(date);
});
