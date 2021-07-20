let items = require("../Items");
const { v4: uuid } = require("uuid");

const getItems = (req, reply) => {
  reply.send(items);
};

const getItem = (req, reply) => {
  const { id } = req.params; // destructure pull out ID from Items
  const item = items.find((item) => item.id === id);
  reply.send(item);
};

const addItem = (req, reply) => {
  const { name } = req.body;
  const item = {
    id: uuid(),
    name,
  };
  items = [...items, item];

  reply.code(201).send(item);
};

const deleteItem = (req, reply) => {
  const { id } = req.params;
  try {
    if (items.find((item) => item.id === id)) {
      items = items.filter((item) => item.id !== id);

      reply.send({ message: `Item ${id} has been deleted` });
    } else {
      reply.send({ message: "sorry pal, no item found" });
    }
    return;
  } catch (e) {
    reply.send({ message: "error 😭 check console" });
    console.log("ERROR!", e);
  }
};

const updateItem = (req, reply) => {
  const { id } = req.params;
  const { name } = req.body;

  items = items.map((item) => (item.id === id ? { id, name } : item));

  item = items.find((item) => item.id === id);

  reply.send({ item, message: "nice" });
};

module.exports = {
  getItem,
  getItems,
  addItem,
  deleteItem,
  updateItem,
};
