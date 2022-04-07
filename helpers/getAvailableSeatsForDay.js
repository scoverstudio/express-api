const maxSeats = 50;
module.exports.getAvailableSeatsForDay = (concertDay, allSeats) => {
  return maxSeats - allSeats.filter((seat) => seat.day === concertDay).length;
};
