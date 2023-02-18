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
    user1 = await User.create(seedUser[0]);
    board1 = await Board.create(seedBoard[0]);
    board2 = await Board.create(seedBoard[1]);
    board3 = await Board.create(seedBoard[2]);
    cheese1 = await Cheese.create(seedCheese[0]);
    cheese2 = await Cheese.create(seedCheese[1]);
    cheese3 = await Cheese.create(seedCheese[2]);
    cheese4 = await Cheese.create(seedCheese[3]);
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
    await user1.addBoard(board1);
    await user1.addBoard(board2);
    await user1.addBoard(board3);
    const userFound = await User.findByPk(1);
    const userFoundBoards = await userFound.getBoards();
    let boards = [board1, board2, board3];
    for (let i = 0; i < userFoundBoards.length; i++) {
      expect(userFoundBoards[i].id).toEqual(boards[i].id);
      expect(userFoundBoards[i].type).toEqual(boards[i].type);
      expect(userFoundBoards[i].description).toEqual(boards[i].description);
      expect(userFoundBoards[i].rating).toEqual(boards[i].rating);
    }
  });

  it("checks a Board can have many Cheeses", async () => {
    let cheeses = [cheese1, cheese2, cheese3, cheese4];
    for (let i = 0; i < cheeses.length; i++) {
      await board1.addCheese(cheeses[i]);
    }
    const boardFound = await Board.findByPk(1);
    const boardFoundCheese = await boardFound.getCheeses();
    for (let i = 0; i < boardFoundCheese.length; i++) {
      expect(boardFoundCheese[i].id).toBe(cheeses[i].id);
      expect(boardFoundCheese[i].title).toBe(cheeses[i].title);
      expect(boardFoundCheese[i].description).toBe(cheeses[i].description);
    }
  });

  it("checks a Cheese can be on many Boards", async () => {
    await board1.addCheese(cheese1);
    await board2.addCheese(cheese1);
    await board3.addCheese(cheese1);
    board1Cheese = await board1.getCheeses();
    board2Cheese = await board2.getCheeses();
    board3Cheese = await board3.getCheeses();
    let boardCheeses = [board1Cheese, board2Cheese, board3Cheese];
    for (let i = 0; i < boardCheeses.length; i++) {
      expect(boardCheeses[i][0].id).toBe(cheese1.id);
      expect(boardCheeses[i][0].title).toBe(cheese1.title);
      expect(boardCheeses[i][0].description).toBe(cheese1.description);
    }
  });
});

describe("Eager Loading Tests", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  beforeEach(async () => {
    user1 = await User.create(seedUser[0]);
    user2 = await User.create(seedUser[1]);
    user3 = await User.create(seedUser[2]);
    board1 = await Board.create(seedBoard[0]);
    board2 = await Board.create(seedBoard[1]);
    board3 = await Board.create(seedBoard[2]);
    cheese1 = await Cheese.create(seedCheese[0]);
    cheese2 = await Cheese.create(seedCheese[1]);
    cheese3 = await Cheese.create(seedCheese[2]);
    cheese4 = await Cheese.create(seedCheese[3]);
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
    let cheeses = [cheese1, cheese2, cheese3, cheese4];
    for (let i = 0; i < cheeses.length; i++) {
      await board1.addCheese(cheeses[i]);
    }
    const boardFoundCheese = await Board.findAll({
      include: [{ model: Cheese, as: "cheeses" }],
    });
    expect(boardFoundCheese[0].cheeses.length).toBe(4);
    expect(boardFoundCheese[1].cheeses.length).toBe(0);
  });

  it("checks user can be loaded with its boards", async () => {
    await user1.addBoard(board1);
    await user1.addBoard(board2);
    await user2.addBoard(board3);
    const userFoundBoards = await User.findAll({
      include: [{ model: Board, as: "boards" }],
    });
    expect(userFoundBoards[0].boards.length).toBe(2);
    expect(userFoundBoards[1].boards.length).toBe(1);
    expect(userFoundBoards[2].boards.length).toBe(0);
  });

  it("checks cheese can be loaded with its board data", async () => {
    await cheese1.addBoard(board1);
    await cheese1.addBoard(board2);
    await cheese2.addBoard(board3);
    const cheeseFoundBoards = await Cheese.findAll({
      include: [{ model: Board, as: "boards" }],
    });
    expect(cheeseFoundBoards[0].boards.length).toBe(2);
    expect(cheeseFoundBoards[1].boards.length).toBe(1);
    expect(cheeseFoundBoards[2].boards.length).toBe(0);
  });
});
