import _ from 'lodash';

export const createKeyedObjectFromArray = (arr, objKey) => {
  let obj = {};
  _.forEach(arr, item => {
    obj[item[objKey]] = item;
  });
  return obj;
};
