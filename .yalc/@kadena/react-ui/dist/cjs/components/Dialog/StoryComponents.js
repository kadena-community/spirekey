"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalContent = void 0;
const Layout_1 = require("../Layout");
const Link_1 = require("../Link");
const Typography_1 = require("../Typography");
const react_1 = __importDefault(require("react"));
const ModalContent = () => {
    return (react_1.default.createElement(Layout_1.Stack, { direction: "column", gap: "$4" },
        react_1.default.createElement(Typography_1.Text, null, "When tabbing through links in a modal, the focus should stay in the modal and not go to the links on the page itself."),
        react_1.default.createElement("ul", null,
            react_1.default.createElement("li", null,
                react_1.default.createElement(Link_1.Link, { href: "#" }, "link 1")),
            react_1.default.createElement("li", null,
                react_1.default.createElement(Link_1.Link, { href: "#" }, "link 2")),
            react_1.default.createElement("li", null,
                react_1.default.createElement(Link_1.Link, { href: "#" }, "link 3"))),
        react_1.default.createElement(Typography_1.Text, null, "Dessert gummies pie biscuit chocolate bar cheesecake. Toffee chocolate bar ice cream cake jujubes pudding fruitcake marzipan. Donut sweet oat cake drag\u00E9e candy cupcake biscuit. Carrot cake sesame snaps marzipan gummies marshmallow topping cake apple pie pudding. Toffee sweet halvah cake liquorice chupa chups sugar plum. Tootsie roll marshmallow gummi bears apple pie cake jujubes pudding. Halvah apple pie tiramisu bear claw caramels cookie dessert cotton candy. Jelly-o sweet sugar plum topping topping jujubes powder shortbread lemon drops. Chupa chups muffin oat cake chupa chups cookie liquorice oat cake tootsie roll. Gingerbread dessert donut pastry muffin powder sugar plum. Chupa chups bonbon topping jelly beans pastry. Souffl\u00E9 chupa chups wafer fruitcake lollipop apple pie bonbon tart bonbon."),
        react_1.default.createElement(Typography_1.Text, null, "Dessert gummies pie biscuit chocolate bar cheesecake. Toffee chocolate bar ice cream cake jujubes pudding fruitcake marzipan. Donut sweet oat cake drag\u00E9e candy cupcake biscuit. Carrot cake sesame snaps marzipan gummies marshmallow topping cake apple pie pudding. Toffee sweet halvah cake liquorice chupa chups sugar plum. Tootsie roll marshmallow gummi bears apple pie cake jujubes pudding. Halvah apple pie tiramisu bear claw caramels cookie dessert cotton candy. Jelly-o sweet sugar plum topping topping jujubes powder shortbread lemon drops. Chupa chups muffin oat cake chupa chups cookie liquorice oat cake tootsie roll. Gingerbread dessert donut pastry muffin powder sugar plum. Chupa chups bonbon topping jelly beans pastry. Souffl\u00E9 chupa chups wafer fruitcake lollipop apple pie bonbon tart bonbon."),
        react_1.default.createElement(Typography_1.Text, null, "Dessert gummies pie biscuit chocolate bar cheesecake. Toffee chocolate bar ice cream cake jujubes pudding fruitcake marzipan. Donut sweet oat cake drag\u00E9e candy cupcake biscuit. Carrot cake sesame snaps marzipan gummies marshmallow topping cake apple pie pudding. Toffee sweet halvah cake liquorice chupa chups sugar plum. Tootsie roll marshmallow gummi bears apple pie cake jujubes pudding. Halvah apple pie tiramisu bear claw caramels cookie dessert cotton candy. Jelly-o sweet sugar plum topping topping jujubes powder shortbread lemon drops. Chupa chups muffin oat cake chupa chups cookie liquorice oat cake tootsie roll. Gingerbread dessert donut pastry muffin powder sugar plum. Chupa chups bonbon topping jelly beans pastry. Souffl\u00E9 chupa chups wafer fruitcake lollipop apple pie bonbon tart bonbon.")));
};
exports.ModalContent = ModalContent;
//# sourceMappingURL=StoryComponents.js.map