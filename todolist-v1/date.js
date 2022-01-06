//jshint esversion:6

module.exports.getDate = function() {
  const today = new Date();

  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  };

  let day = today.toLocaleDateString("en-US", options);

  return day;
};


module.exports.getDayName = function() {
  const today = new Date();

  const options = {
    weekday: 'long'
  };

  let day = today.toLocaleDateString("en-US", options);

  return day;
};
