import _ from 'lodash';

export const createObjectFromArrayOfObjects = (arr, key) => {
  let obj = {};
  _.forEach(arr, item => {
    obj[item[key]] = item;
  });
  return obj;
};
