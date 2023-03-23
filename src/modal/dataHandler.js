import realm from './RealmDatabase';

const getPrimaryKeyId = model => {
  if (realm.objects(model).max('id')) {
    return realm.objects(model).max('id') + 1;
  }
  return 1;
};
export {getPrimaryKeyId};

// const insertQuery = () => {
// realm.write(() => {
// realm.create('MyRecipes', {
// id: getPrimaryKeyId('MyRecipes'),
// name: 'juice',
// description:'myanmar food',
// });
// });
// };

// export {getPrimaryKeyId, insertQuery};
