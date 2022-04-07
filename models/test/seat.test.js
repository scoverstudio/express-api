const { default: mongoose } = require("mongoose");
const Seat = require("../seat.model");
const expect = require("chai").expect;

describe("Seat", () => {
  it("should throw an error if no 'client' arg", () => {
    const seat = new Seat({});

    seat.validate((err) => {
      expect(err.errors.client).to.exist;
    });
  });

  it("should throw an error if no 'email' arg", () => {
    const seat = new Seat({});

    seat.validate((err) => {
      expect(err.errors.email).to.exist;
    });
  });

  it("should throw an error if no 'seat' arg", () => {
    const seat = new Seat({});

    seat.validate((err) => {
      expect(err.errors.seat).to.exist;
    });
  });

  it("should throw an error if no 'day' arg", () => {
    const seat = new Seat({});

    seat.validate((err) => {
      expect(err.errors.day).to.exist;
    });
  });

  it('should throw an error if "client" is not a string', () => {
    const cases = [{}, []];
    for (let client of cases) {
      const seat = new Seat({ client });

      seat.validate((err) => {
        expect(err.errors.client).to.exist;
      });
    }
  });

  it('should throw an error if "email" is not a string', () => {
    const cases = [{}, []];
    for (let email of cases) {
      const seat = new Seat({ email });

      seat.validate((err) => {
        expect(err.errors.email).to.exist;
      });
    }
  });

  it('should throw an error if "seat" is not a Number', () => {
    const cases = [{}, []];
    for (let email of cases) {
      const seat = new Seat({ email });

      seat.validate((err) => {
        expect(err.errors.email).to.exist;
      });
    }
  });

  it('should throw an error if "day" is not a string', () => {
    const cases = [{}, []];
    for (let day of cases) {
      const seat = new Seat({ day });

      seat.validate((err) => {
        expect(err.errors.day).to.exist;
      });
    }
  });

  after(() => {
    mongoose.models = {};
  });
});
