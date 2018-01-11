
// auth.createUserWithEmailAndPasswor(email, pass);

// 每次驗證狀態改變，將觸發以下回呼函數
// auth.onAuthStateChanged(firebaseUser => { })

// Get element
const txtEmail = $("#txtEmail");
const txtPassword = $("#txtPassword");
const btnLogin = $("#btnLogin");
const btnSignUp = $("#btnSignUp");
const btnLogout = $("#btnLogout");

btnLogin.click(e => {
    const auth = firebase.auth();
    const email = txtEmail.val()
    const pass = txtPassword.val()
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message))
    console.log('login')
    // window.location.assign('../index.html')
})

btnSignUp.click(e => {
    const auth = firebase.auth();
    const email = txtEmail.val();
    const pass = txtPassword.val();
    // TODO : check for real email
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise
        .catch(e => console.log(e.message));
})

btnLogout.click(e => {
    firebase.auth().signOut();
    console.log('logout')
    // window.location.assign('./auth/login.html')
})

// Add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        // console.log(firebaseUser);
        // console.log(firebaseUser.email)
        // console.log(firebaseUser.uid)
        btnLogin.addClass('hide')
        btnLogout.removeClass('hide')
        userId = firebase.auth().currentUser.uid;
        console.log(userId)
        console.log('logged in')
        // window.location.assign('../index.html')
    } else {
        btnLogout.addClass('hide')
        btnLogin.removeClass('hide')
        console.log('not logged in');
    }
})

// console.log(auth);