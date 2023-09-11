import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://endorsement-app-c7210-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsement-list")

const textAreaEl = document.getElementById("textarea-el")
const publishBtn = document.getElementById("publish-btn")
const endorsementList = document.getElementById("endorsement-list")
const senderEl = document.getElementById("input-from")
const receiverEl = document.getElementById("input-to")

publishBtn.addEventListener("click", function() {
    let inputValue = textAreaEl.value
    let fromValue = senderEl.value
    let toValue = receiverEl.value
    
    if (inputValue === "") {
        console.log("Need to type something!")
    } else {
        push(endorsementsInDB, {
            input: inputValue,
            from: fromValue,
            to: toValue
        })
    }

    clearInputText()
})

onValue(endorsementsInDB, function(snapshot) {
    if (snapshot.exists()) {
        let endorsementsObject = snapshot.val()
        let endorsementsArray = Object.entries(endorsementsObject)
        
        clearEndorsements()
        for (let i = 0; i < endorsementsArray.length; i++) {
            let currentItem = endorsementsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]

            appendInputToEndorsementList(currentItemValue.input, currentItemValue.from, currentItemValue.to)
        }
    }

})

function clearInputText() {
    textAreaEl.value = ""
    senderEl.value = ""
    receiverEl.value = ""
}

function clearEndorsements() {
    endorsementList.innerHTML = ""
}

function appendInputToEndorsementList(input, from, to) {
    let newListEl = document.createElement("li")

    newListEl.innerHTML = `<strong>To ${to}</strong><br><br>
                        ${input} <br><br>
                        <strong>From ${from}</strong>`;
    if (input === "") {
        null;
    } else {
        endorsementList.append(newListEl)
    }
}