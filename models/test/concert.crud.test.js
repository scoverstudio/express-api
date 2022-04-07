const { default: mongoose } = require("mongoose");
const Concert = require("../concert.model");
const expect = require("chai").expect;

describe("Concert", () => {
  before(async () => {
    try {
      await mongoose.connect("mongodb://localhost:27017/concertApp", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.error(err);
    }
  });

  describe("Reading data", () => {
    before(async () => {
      const testConOne = new Concert({
        performer: "John",
        genre: "pop",
        price: 25,
        day: 1,
        image: "./img.jpg",
        tickets: 25,
      });
      await testConOne.save();

      const testConTwo = new Concert({
        performer: "Jessie",
        genre: "rap",
        price: 50,
        day: 2,
        image: "./img2.jpg",
        tickets: 35,
      });
      await testConTwo.save();
    });

    it('should return all the data with "find" method', async () => {
      const concerts = await Concert.find();
      const expectedLength = 2;
      expect(concerts.length).to.be.equal(expectedLength);
    });

    it('should return a proper document by "perfmormer" with "findOne" method', async () => {
      const concert = await Concert.findOne({ performer: "John" });
      const expectedName = "John";
      expect(concert.performer).to.be.equal(expectedName);
    });

    after(async () => {
      await Concert.deleteMany();
    });
  });

  describe("Creating data", () => {
    it('should insert new document with "insertOne" method', async () => {
      const concert = new Concert({
        performer: "Krystian",
        genre: "Rock",
        price: 100,
        day: 1,
        image: "./img23.jpg",
        tickets: 2,
      });
      await concert.save();
      expect(concert.isNew).to.be.false;
    });

    after(async () => {
      await Concert.deleteMany();
    });
  });

  describe("Updating data", () => {
    beforeEach(async () => {
      const testConOne = new Concert({
        performer: "John",
        genre: "pop",
        price: 25,
        day: 1,
        image: "./img.jpg",
        tickets: 25,
      });
      await testConOne.save();

      const testConTwo = new Concert({
        performer: "Jessie",
        genre: "rap",
        price: 50,
        day: 2,
        image: "./img2.jpg",
        tickets: 35,
      });
      await testConTwo.save();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Concert.updateOne(
        { performer: "John" },
        { $set: { name: "=John=" } }
      );
      const updatedConcert = await Concert.findOne({
        name: "=John=",
      });
      expect(updatedConcert).to.not.be.null;
    });

    it('should properly update one document with "save" method', async () => {
      const concert = await Concert.findOne({ performer: "John" });
      concert.performer = "=John=";
      await concert.save();

      const updatedConcert = await Concert.findOne({
        name: "=John=",
      });
      expect(updatedConcert).to.not.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
      await Concert.updateMany({}, { $set: { performer: "Updated!" } });
      const concerts = await Concert.find({ performer: "Updated!" });
      expect(concerts.length).to.be.equal(2);
    });

    afterEach(async () => {
      await Concert.deleteMany();
    });
  });

  describe("Removing data", () => {
    beforeEach(async () => {
      const testConOne = new Concert({
        performer: "John",
        genre: "pop",
        price: 25,
        day: 1,
        image: "./img.jpg",
        tickets: 25,
      });
      await testConOne.save();

      const testConTwo = new Concert({
        performer: "Jessie",
        genre: "rap",
        price: 50,
        day: 2,
        image: "./img2.jpg",
        tickets: 35,
      });
      await testConTwo.save();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Concert.deleteOne({
        performer: "John",
      });

      const removedConcert = await Concert.findOne({
        performer: "John",
      });
      expect(removedConcert).to.be.null;
    });

    it('should properly remove one document with "remove" method', async () => {
      const concert = await Concert.findOne({ performer: "John" });
      await concert.remove();
      const removedConcert = await Concert.findOne({
        performer: "John",
      });
      expect(removedConcert).to.be.null;
    });

    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Concert.deleteMany();
      const concerts = await Concert.find();
      expect(concerts.length).to.be.equal(0);
    });

    afterEach(async () => {
      await Concert.deleteMany();
    });
  });

  after(() => {
    mongoose.models = {};
  });
});
