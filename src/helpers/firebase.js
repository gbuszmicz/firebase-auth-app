import Firebase from 'firebase';
const FirebaseBaseUrl = 'https://<YOUR_ACCOUNT_HERE>.firebaseio.com';

// Ref.: https://www.firebase.com/docs/web/api/firebase/authwithcustomtoken.html
export function authWithCustomToken(authToken, callback) {
  const ref = new Firebase(FirebaseBaseUrl);
  return ref.authWithCustomToken(authToken, callback);
}

// Ref.: https://www.firebase.com/docs/web/api/firebase/authwithpassword.html
export function authWithPassword(email, password, callback) {
  const ref = new Firebase(FirebaseBaseUrl);
  ref.authWithPassword({
    email, // => email: email,
    password
  }, callback)
}

// Ref.: https://www.firebase.com/docs/web/api/firebase/createuser.html
export function createUser(email, password, callback) {
  const ref = new Firebase(FirebaseBaseUrl);
  ref.createUser({
    email,
    password
  }, callback)
}

// Ref.: https://www.firebase.com/docs/web/api/firebase/push.html
//       https://www.firebase.com/docs/web/api/firebase/set.html
export function addUserProfile(uid, profile, callback) {
  const ref = new Firebase(FirebaseBaseUrl);
  const userRef = ref.child(`users/${uid}`)
  userRef.push();
  userRef.set(profile, function(error) {
    if(error) {
      callback(error, null)
    } else {
      callback(null, 'User profile created successfully')
    }
  })
}

// Ref.: https://www.firebase.com/docs/web/api/query/once.html
export function getUserProfile(uid, callback) {
  const ref = new Firebase(FirebaseBaseUrl);
  const userRef = ref.child(`users/${uid}`)
  userRef.once('value', function(snapshot) {
    if(!snapshot.val()) callback('nothing found', null)
    callback(null, snapshot.val());
  });
}

// Ref.: https://www.firebase.com/docs/web/api/firebase/removeuser.html
export function removeUser(email, password, callback) {
  const ref = new Firebase(FirebaseBaseUrl);
  ref.removeUser({
    email,
    password
  }, callback)
}

// Ref.: https://www.firebase.com/docs/web/api/firebase/remove.html
export function remove(uid, callback) {
  const ref = new Firebase(FirebaseBaseUrl)
  const userRef = ref.child(`users/${uid}`)
  userRef.remove(callback)
}

