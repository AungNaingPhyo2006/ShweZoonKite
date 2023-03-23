import {Realm} from 'realm';

const MyRecipes = {
  name: 'MyRecipes',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    description: 'string',
  },
};

const Recipe_ingredients = {
  name: 'Recipe_ingredients',
  primaryKey: 'id',
  properties: {
    id: 'int',
    myRecipes: 'MyRecipes[]',
    measurement_units: 'Measurement_units[]',
    measurement_qty: 'Measurement_qty[]',
    ingredients: 'Ingredients[]',
    methods: 'Methods[]',
  },
};

const Measurement_units = {
  name: 'Measurement_units',
  primaryKey: 'id',
  properties: {
    id: 'int',
    measurement_description: 'string',
  },
};

const Measurement_qty = {
  name: 'Measurement_qty',
  primaryKey: 'id',
  properties: {
    id: 'int',
    qty_amount: 'string',
  },
};

const Ingredients = {
  name: 'Ingredients',
  primaryKey: 'id',
  properties: {
    id: 'int',
    ingredient_name: 'string',
  },
};

const Methods = {
  name: 'Methods',
  primaryKey: 'id',
  properties: {
    id: 'int',
    methods_description: 'string',
  },
};

const realm = new Realm({
  schema: [
    MyRecipes,
    Recipe_ingredients,
    Measurement_units,
    Measurement_qty,
    Ingredients,
    Methods,
  ],
});

export default realm;
