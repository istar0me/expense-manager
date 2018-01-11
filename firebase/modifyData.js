var itemType, shopName, itemName, itemPrice
var dbRef = firebase.database().ref()

// dbRef.on('value', snap => {
//     console.log(snap.val());
// })

let appendZero = (val => {
    if (val < 10) return `0${val}`;
    else return val;
})

let removeZero = (val => {
    return Number(val)
})

function clearData() {
    // clear the value
    itemType = undefined
    shopName = undefined
    itemName = undefined
    itemPrice = undefined

    // clear the input field
    $("#fillShopName").val(null)
    $("#fillItemName").val(null)
    $("#fillItemPrice").val(null)
}

function writeUserData() {
    // (() => {

    // }))()

    // 如果不是點擊按鈕，而是直接填寫，則套用填寫的值
    if ($("#fillShopName").val()) {
        shopName = $("#fillShopName").val()
    }
    console.log("fillShopName" + $("#fillShopName").val())

    if ($("#fillItemName").val()) {
        itemName = $("#fillItemName").val()
    }

    if ($("#fillItemPrice").val()) {
        itemPrice = $("#fillItemPrice").val()
    }

    // 提示尚未填寫的部分
    var tag = [itemType, shopName, itemName, itemPrice]
    var tagzh = ["品項", "商家", "品名", "價格"]
    var tagtemp = []
    var isAllFilled = true;
    for (i = 0; i < tag.length; i++) {
        if (tag[i] == undefined) {
            tagtemp.push(tagzh[i])
        }

        if (tag[i] != undefined) var isFilled = true
        else var isFilled = false
        isAllFilled = isFilled && isAllFilled
    }
    console.log("isAllFilled : " + isAllFilled)

    var output = tagtemp.join("、")
    if (output) alert(`${output}尚未填寫`)

    if (isAllFilled) {

        // 時間
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

        console.log(userId)
        console.log(year)
        console.log(month)
        console.log(date)
        console.log(hour)
        console.log(minute)
        console.log(second)
        firebase.database().ref(`users/${userId}/${year}${month}/${date}${hour}${minute}${second}`).set({
            itemType: itemType,
            shopName: shopName,
            itemName: itemName,
            itemPrice: itemPrice
        })

        firebase.database().ref(`shop/${itemType}/${shopName}`).push({
            itemName: itemName,
            itemPrice: itemPrice
        })

        var itemNameId = firebase.database().ref(`shop/${itemType}/${shopName}`).push().key
        console.log(itemNameId)

        // firebase.database().ref(`users/${userId}/${year}${month}`).once("value", snap => {
        //     // let month = 
        //     snap.forEach(element => {
        //         let qDay = element.key.substr(0, 2)
        //         qDay = removeZero(qDay);
        //         $("#tbody").append(
        //             `<tr>
        //         <td contenteditable="true">${qDay}</td>
        //         <td contenteditable="true">${element.val().itemType}</td>
        //         <td contenteditable="true">${element.val().shopName}</td>
        //         <td contenteditable="true">${element.val().itemName}</td>
        //         <td contenteditable="true">${element.val().itemPrice}</td>
        //     </tr>`)
        //         console.log(element.val())
        //     })
        // })
        $("#tbody").append(
            `<tr>
            <td><a href="#">×</a></td>
        <td contenteditable="true">${removeZero(month)}/${date}</td>
        <td contenteditable="true">${itemType}</td>
        <td contenteditable="true">${shopName}</td>
        <td contenteditable="true">${itemName}</td>
        <td contenteditable="true">${itemPrice}</td>
    </tr>`)
        console.log('write successful')

        // 隱藏輸入品名與價格面板，顯示選擇品項面板
        $("#allItem").removeClass("collapse")
        $("#allItem").addClass("collapse")
        $("#allType").removeClass("collapse")

        // all data were filled, ready to submit
        if (itemType && shopName) {
            alert(`資料填寫完成。
品項 : ${itemType}
商家 : ${shopName}
品名 : ${itemName}
價格 : ${itemPrice}`)
        }
        clearData()
    }
}

function submitData() {
    //     // 如果不是點擊按鈕，而是直接填寫，則套用填寫的值
    //     if ($("#fillShopName").val()) {
    //         shopName = $("#fillShopName").val()
    //     }

    //     if ($("#fillItemName").val()) {
    //         itemName = $("#fillItemName").val()
    //     }

    //     // 提示尚未填寫的部分
    //     var tag = [itemType, shopName]
    //     var tagzh = ["品項", "商家", "品名", "價格"]
    //     var tagtemp = []
    //     for (i = 0; i < tag.length; i++) {
    //         if (tag[i] == undefined) {
    //             tagtemp.push(tagzh[i])
    //         }
    //     }
    //     var output = tagtemp.join("、")
    //     if (output) alert(`${output}尚未填寫`)

    //     // all data were filled, ready to submit
    //     if (itemType && shopName) {
    //         alert(`資料填寫完成。
    // 品項 : ${itemType}
    // 商家 : ${shopName}`)
    //     }
    //     cleardata()
}

function itemTypeButton(id, value) {
    $("#allType").removeClass("collapse in")

    $("#allType").addClass("collapse")
    // $("#allItem").addClass("collapse")

    $("#allShop").removeClass("collapse")

    $("#fillShopName").focus()
    itemType = value
}

function shopNameButton(id) {
    $("#allShop").removeClass("collapse")

    $("#allShop").addClass("collapse")

    $("#allItem").removeClass("collapse")
    $("#fillItemName").focus()
    shopName = id
}

function itemNameButton(id) {
    $("#fillItemPrice").focus()
    itemName = id
}


// logout test (之後要移到auth.js)
function logout() {
    firebase.auth().signOut();
    console.log('logout')
    window.location.assign('./auth/login.html')
}