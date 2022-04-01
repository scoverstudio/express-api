import React from "react";
import { Button, Progress, Alert } from "reactstrap";
import io from "socket.io-client";

import "./SeatChooser.scss";

class SeatChooser extends React.Component {
  componentDidMount() {
    const { loadSeats, loadSeatsData } = this.props;
    const IS_PROD = process.env.NODE_ENV === "production";
    const URL = IS_PROD
      ? "wss://order-tickets-express-scv.herokuapp.com/order-a-ticket"
      : "http://localhost:8000";
    this.socket = io(URL);
    this.socket.on("seatsUpdated", (seats) => loadSeatsData(seats));

    loadSeats();
  }

  isTaken = (seatId) => {
    const { seats, chosenDay } = this.props;

    return seats.some((item) => item.seat === seatId && item.day === chosenDay);
  };

  prepareSeat = (seatId) => {
    const { chosenSeat, updateSeat } = this.props;
    const { isTaken } = this;

    if (seatId === chosenSeat)
      return (
        <Button key={seatId} className="seats__seat" color="primary">
          {seatId}
        </Button>
      );
    else if (isTaken(seatId))
      return (
        <Button key={seatId} className="seats__seat" disabled color="secondary">
          {seatId}
        </Button>
      );
    else
      return (
        <Button
          key={seatId}
          color="primary"
          className="seats__seat"
          outline
          onClick={(e) => updateSeat(e, seatId)}
        >
          {seatId}
        </Button>
      );
  };

  showFreeSeats = () => {
    const { seats, chosenDay } = this.props;
    const seatsByDay = seats.filter((seat) => seat.day === chosenDay);

    if (chosenDay) {
      return `Free seats: ${seatsByDay.length}/50`;
    }
  };

  render() {
    const { prepareSeat, showFreeSeats } = this;
    const { requests } = this.props;

    return (
      <div>
        <h3>Pick a seat</h3>
        <small id="pickHelp" className="form-text text-muted ml-2">
          <Button color="secondary" /> – seat is already taken
        </small>
        <small id="pickHelpTwo" className="form-text text-muted ml-2 mb-4">
          <Button outline color="primary" /> – it's empty
        </small>
        {requests["LOAD_SEATS"] && requests["LOAD_SEATS"].success && (
          <div className="seats">
            {[...Array(50)].map((x, i) => prepareSeat(i + 1))}
          </div>
        )}
        {requests["LOAD_SEATS"] && requests["LOAD_SEATS"].pending && (
          <Progress animated color="primary" value={50} />
        )}
        {requests["LOAD_SEATS"] && requests["LOAD_SEATS"].error && (
          <Alert color="warning">Couldn't load seats...</Alert>
        )}
        <div>{showFreeSeats()}</div>
      </div>
    );
  }
}

export default SeatChooser;
