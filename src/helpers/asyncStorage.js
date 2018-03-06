import { AsyncStorage } from 'react-native';

let parseJson = json => JSON.parse(json);

export function getUserToken() {
  return AsyncStorage
    .getItem('user')
    .then(parseJson);
}

export function saveUserToken(token) {
  return new Promise((resolve) => {
    let user = {token};
    let userString = JSON.stringify(user);

    AsyncStorage.setItem('user', userString);
    resolve(user);
  });
}

export function removeUserToken() {
  return AsyncStorage.removeItem('user');
}
