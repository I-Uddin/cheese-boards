const { sequelize } = require("./db");
const { User, Board, Cheese } = require("./index");
const { seedUser, seedBoard, seedCheese } = require("./seedData");

describe("Model Tests", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  beforeEach(async () => {
    const user1 = await User.create(seedUser[0]);
    const board1 = await Board.create(seedBoard[0]);
    const cheese1 = await Cheese.create(seedCheese[0]);
  });

  afterEach(async () => {
    await User.sync({ force: true });
    await Board.sync({ force: true });
    await Cheese.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.drop();
  });

  it("can create a User", async () => {
    const userFound = await User.findByPk(1);
    expect(userFound.id).toBe(1);
    expect(userFound.name).toBe(seedUser[0].name);
    expect(userFound.email).toBe(seedUser[0].email);
  });

  it("can create a Board", async () => {
    const boardFound = await Board.findByPk(1);
    expect(boardFound.id).toBe(1);
    expect(boardFound.type).toBe(seedBoard[0].type);
    expect(boardFound.description).toBe(seedBoard[0].description);
    expect(boardFound.rating).toBe(seedBoard[0].rating);
  });

  it("can create a Cheese", async () => {
    const cheeseFound = await Cheese.findByPk(1);
    expect(cheeseFound.id).toBe(1);
    expect(cheeseFound.title).toBe(seedCheese[0].title);
    expect(cheeseFound.description).toBe(seedCheese[0].description);
  });
});

describe("Association Tests", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  beforeEach(async () => {
    const user1 = await User.create(seedUser[0]);
    const board1 = await Board.create(seedBoard[0]);
    const cheese1 = await Cheese.create(seedCheese[0]);
  });

  afterEach(async () => {
    await User.sync({ force: true });
    await Board.sync({ force: true });
    await Cheese.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.drop();
  });

  it("check multiple Boards can be added to a User.", async () => {

  });

  it("checks a Board can have many Cheeses", async () => {

  });

  it("checks a Cheese can be on many Boards", async () => {

  });
});

describe("Eager Loading Tests", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  beforeEach(async () => {
    const user1 = await User.create(seedUser[0]);
    const board1 = await Board.create(seedBoard[0]);
    const cheese1 = await Cheese.create(seedCheese[0]);
  });

  afterEach(async () => {
    await User.sync({ force: true });
    await Board.sync({ force: true });
    await Cheese.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.drop();
  });

  it("checks board can be loaded with its cheeses", async () => {

  });

  it("checks user can be loaded with its boards", async () => {

  });

  it("checks cheese can be loaded with its board data", async () => {

  });
});
