var dbRef = firebase.database().ref()

dbRef.on('value', snap => {
    console.log(snap.val())
})