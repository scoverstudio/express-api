const { default: mongoose } = require("mongoose");
const Concert = require("../concert.model");
const expect = require("chai").expect;

describe("Concert", () => {
  it("should throw an error if no args", () => {
    const concert = new Concert({});

    concert.validate((err) => {
      expect(err).to.exist;
    });
  });
  it("should throw an error if no 'performer' arg", () => {
    const concert = new Concert({});

    concert.validate((err) => {
      expect(err.errors.performer).to.exist;
    });
  });

  it("should throw an error if no 'genre' arg", () => {
    const concert = new Concert({});

    concert.validate((err) => {
      expect(err.errors.genre).to.exist;
    });
  });

  it("should throw an error if no 'price' arg", () => {
    const concert = new Concert({});

    concert.validate((err) => {
      expect(err.errors.price).to.exist;
    });
  });

  it("should throw an error if no 'day' arg", () => {
    const concert = new Concert({});

    concert.validate((err) => {
      expect(err.errors.day).to.exist;
    });
  });

  it("should throw an error if no 'image' arg", () => {
    const concert = new Concert({});

    concert.validate((err) => {
      expect(err.errors.image).to.exist;
    });
  });

  it("should throw an error if no 'tickets' arg", () => {
    const concert = new Concert({});

    concert.validate((err) => {
      expect(err.errors.tickets).to.exist;
    });
  });

  it("should throw an error if no 'performer' arg is not a String", () => {
    const cases = [{}, []];

    for (let performer of cases) {
      const concert = new Concert({ performer });

      concert.validate((err) => {
        expect(err.errors.performer).to.exist;
      });
    }
  });
  it("should throw an error if no 'genre' arg is not a String", () => {
    const cases = [{}, []];

    for (let genre of cases) {
      const concert = new Concert({ genre });

      concert.validate((err) => {
        expect(err.errors.genre).to.exist;
      });
    }
  });

  it("should throw an error if no 'image' arg is not a String", () => {
    const cases = [{}, []];

    for (let image of cases) {
      const concert = new Concert({ image });

      concert.validate((err) => {
        expect(err.errors.image).to.exist;
      });
    }
  });

  it("should throw an error if no 'price' arg is not a Number", () => {
    const cases = [{}, []];

    for (let price of cases) {
      const concert = new Concert({ price });

      concert.validate((err) => {
        expect(err.errors.price).to.exist;
      });
    }
  });
  it("should throw an error if no 'day' arg is not a Number", () => {
    const cases = [{}, []];

    for (let day of cases) {
      const concert = new Concert({ day });

      concert.validate((err) => {
        expect(err.errors.day).to.exist;
      });
    }
  });

  it("should throw an error if no 'tickets' arg is not a Number", () => {
    const cases = [{}, []];

    for (let tickets of cases) {
      const concert = new Concert({ tickets });

      concert.validate((err) => {
        expect(err.errors.tickets).to.exist;
      });
    }
  });

  after(() => {
    mongoose.models = {};
  });
});
