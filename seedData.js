const seedUser = [
    {name:"Steve", email:"steve@eve.com"},
    {name:"Gary", email:"gary@snail.com"},
    {name:"Rudolph", email:"rein@deer.com"},
    {name:"Dell", email:"big@bruh.co.uk"},
    {name:"Den", email:"dennis@menace.com"},
    {name:"Theo", email:"this.is@so.long"},
];
const seedBoard = [
    {type:"Aged", description:"Gouda, Sharp Cheddar, Gruyere", rating: 2},
    {type:"Soft and creamy", description:"Brie, Camembert, Epoisses, Burrata, Fresh Buffalo Mozzarella", rating: 3},
    {type:"Crumbly", description:"Goat and Feta Cheese", rating: 4},
    {type:"Firm", description:"Parmigiano Reggiano, Manchego, Gouda", rating: 5},
    {type:"Smoked", description:"Smoked Gouda, Provolone, and Cheddar", rating: 3},
    {type:"Blue cheese", description:"Gorgonzola, Stilton, Roquefort", rating: 4},
];
const seedCheese = [
    {title:"American", description:"American is a creamy, smooth cheese made from blending natural cheeses. It comes in several forms including individually wrapped cheese slices, small pre-sliced blocks and large blocks. It melts well."},
    {title:"Asiago", description:"Asiago, a nutty-flavored cheese, comes in two forms: fresh and mature. The fresh has an off-white color and is smoother and milder, while mature Asiago is yellowish and somewhat crumbly. Depending on its age, Asiago can be grated, melted or sliced."},
    {title:"Blue Cheese", description:"Blue is a general name for cheeses that were made with Penicillium cultures, which creates “blue” spots or veins. Blue cheese has a distinct smell and, what some consider, an acquired taste. Blue cheeses can be eaten crumbed or melted. Check our our Blue Cheese Deviled Eggs for a fun blue cheese recipe."},
    {title:"Bocconcini", description:"Meaning “little bites,” bocconcini are egg-sized balls of mozzarella cheese. The cheese is white, rindless, unripened, and elastic in texture with a sweet, buttery taste. Bocconcini can be enjoyed as they are or melted."},
    {title:"Brie", description:"Brie is a soft, white cheese. It comes in a wheel, sometimes in a small wooden box, and is considered a great dessert cheese. Experts recommend enjoying it at room temperature. Learn more about how to best enjoy and eat brie along with other cheeses that have a rind."},
    {title:"Burrata", description:"Burrata is a fresh cheese featuring a thin layer of cheese with a mixture of stringy curd and fresh cream on the inside. It has a rich flavor and goes well with salads, crusty bread and Italian dishes."},
    {title:"Camembert", description:"Fresh Camembert cheese is bland, hard and crumbly, but becomes smoother with a runny interior as it ages. It has a rich, buttery flavor with a rind that’s meant to be eaten."},
];

module.exports = { seedUser, seedBoard, seedCheese };