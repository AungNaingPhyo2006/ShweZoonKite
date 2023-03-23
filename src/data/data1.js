const data = [
  {
    id: 1,
    name: 'Juice',
    description: 'Myanmar Traditional Food',
    ingredients: 'apple, orange, banana',
    method: 'first: cut, second: blend, third: drink',
    photo: require('../assets/images/cookBook.png'),
    prep: '20 m',
    cook: '30 m',
    ready: '15 m',
  },
  {
    id: 2,
    name: 'Tea Mix',
    description: 'Kachin Traditional Food',
    ingredients: 'sugar, milk, coffee',
    method: 'first: mix, second: stir, third: drink',
    photo: require('../assets/images/cookBook.png'),
    prep: '24 m',
    cook: '10 m',
    ready: '15 m',
  },
  {
    id: 3,
    name: 'fry fish',
    description: 'Shan Traditional Food',
    ingredients: 'fish, oil, pan',
    photo: require('../assets/images/cookBook.png'),
    method: 'first: cut, second: fry, third: take a bite',
    prep: '10 m',
    cook: '30 m',
    ready: '15 m',
  },
];

let nextId = data.reduce((maxId, item) => Math.max(maxId, item.id), 0) + 1;

const newData = [
  {
    id: nextId++,
    name: 'Soup',
    description: 'Chinese Traditional Food',
    ingredients: 'chicken, vegetables, water',
    method: 'first: chop, second: boil, third: serve',
    photo: require('../assets/images/cookBook.png'),
    prep: '15 m',
    cook: '45 m',
    ready: '20 m',
  },
  {
    id: nextId++,
    name: 'Curry',
    description: 'Indian Traditional Food',
    ingredients: 'chicken, onion, tomato, curry powder',
    method: 'first: saute, second: simmer, third: eat',
    photo: require('../assets/images/cookBook.png'),
    prep: '30 m',
    cook: '60 m',
    ready: '20 m',
  },
  {
    id: nextId++,
    name: 'Mont Hin Gar',
    description: 'Myanmar Traditional Food',
    ingredients: 'chicken, onion, tomato, curry powder',
    method: 'first: saute, second: simmer, third: eat',
    photo: require('../assets/images/cookBook.png'),
    prep: '20 m',
    cook: '60 m',
    ready: '15 m',
  },
];

const updatedData = [...data, ...newData];

export default updatedData;

// export default data;
