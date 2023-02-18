const { User } = require("./Models/User");
const { Board } = require("./Models/Board");
const { Cheese } = require("./Models/Cheese");

// Users < - > Boards
Board.belongsTo(User);
User.hasMany(Board);

// Boards < - > Cheeses
Board.belongsToMany(Cheese, { through: "cheese_boards" });
Cheese.belongsToMany(Board, { through: "cheese_boards" });

module.exports = { User, Board, Cheese };