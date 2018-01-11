let year = new Date().getFullYear();
let month = new Date().getMonth();
month += 1; // month returns the month (from 0-11)
month = appendZero(month);
let date = new Date().getDate();
date = appendZero(date);
let hour = new Date().getHours();
hour = appendZero(hour);
let minute = new Date().getMinutes();
minute = appendZero(minute);
let second = new Date().getSeconds();
second = appendZero(second);

(() => setTimeout(() => {
    firebase.database().ref(`users/${userId}/${year}${month}`).once("value", snap => {
        // let month = 
        snap.forEach(element => {
            let qDay = element.key.substr(0, 2)
            qDay = removeZero(qDay);
            $("#tbody").append(
                `<tr>
                <td><a href="#">×</a></td>
            <td contenteditable="true">${removeZero(month)}/${qDay}</td>
            <td contenteditable="true">${element.val().itemType}</td>
            <td contenteditable="true">${element.val().shopName}</td>
            <td contenteditable="true">${element.val().itemName}</td>
            <td contenteditable="true">${element.val().itemPrice}</td>
        </tr>`)
            console.log(element.val())
        })
    })
}, 2000))()