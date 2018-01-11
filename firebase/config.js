// Initialize Firebase
var config = {
    apiKey: "AIzaSyAAhKCuPWlHfseOvKlkpvKARtfPrb_j7Xg",
    authDomain: "expensemanager-3bbf7.firebaseapp.com",
    databaseURL: "https://expensemanager-3bbf7.firebaseio.com",
    projectId: "expensemanager-3bbf7",
    storageBucket: "expensemanager-3bbf7.appspot.com",
    messagingSenderId: "1057101953435"
};
firebase.initializeApp(config);

// const dbRef = firebase.database().reference();
// dbRef.once('value', snap => {
//     console.log(snap.val())
// })