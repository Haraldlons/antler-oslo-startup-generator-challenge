function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomDate() {
  var min = 645066548;
  var max = 1560215368;
  var randTS = getRandomArbitrary(min, max);
  var date = new Date(randTS * 1000);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = date.getFullYear();
  var month = months[date.getMonth()];
  var date = date.getDate();
  var formattedDate = year + "-" + month + "-" + date;

  return formattedDate;
}

function getRandomPrice() {
  var min = 3400000;
  var max = 9200000;
  var randPrice = getRandomArbitrary(min, max);
  return Math.floor(randPrice);
}

export { getRandomDate, getRandomPrice };
