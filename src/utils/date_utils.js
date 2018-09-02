/**
 * Took the basic function from https://gist.github.com/miguelmota/7905510
 * and modified for my needs.
 **/
// Returns an array of dates between the two dates
export const getDates = function(startDate, endDate) {
  let dates = [],
    currentDate = startDate,
    addDays = function(days) {
      const date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    },
    // pad single digits days/months to 01 rather than 1
    pad = function(int) {
      return int < 10 ? `0${int}` : int;
    },
    // Grabbing the dates we need in the format that the
    // Weather API expects
    parseDate = function() {
      const date = new Date(this.valueOf());
      // Months start at 0, so add one.
      const month = pad.call(currentDate, date.getMonth() + 1);
      const day = pad.call(currentDate, date.getDate());
      return `${date.getFullYear()}-${month}-${day}`;
    };
  while (currentDate <= endDate) {
    dates.push(parseDate.call(currentDate));
    currentDate = addDays.call(currentDate, 1);
  }
  return dates;
};

export const oneWeekAgo = () => {
  const today = new Date();
  const prev = today.setDate(today.getDate() - 6);
  // prev will be UTC seconds from epoch
  // passing it to a new date returns a human readable version
  return new Date(prev);
};
