import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://endorsement-app-c7210-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsement-list")

const inputEl = document.getElementById("input-el")
const publishBtn = document.getElementById("publish-btn")
const endorsementList = document.getElementById("endorsement-list")

publishBtn.addEventListener("click", function() {
    let inputValue = inputEl.value
    
    push(endorsementsInDB, inputValue)

    clearInputText()
})

onValue(endorsementsInDB, function(snapshot) {
    if (snapshot.exists()) {
        let endorsementsArray = Object.entries(snapshot.val())
        
        clearEndorsements()
        for (let i = 0; i < endorsementsArray.length; i++) {
            let currentItem = endorsementsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]

            appendInputToEndorsementList(currentItemValue)
        }
    }

})

function clearInputText() {
    inputEl.value = ""
}

function clearEndorsements() {
    endorsementList.innerHTML = ""
}

function appendInputToEndorsementList(input) {
    let newEl = document.createElement("li")

    newEl.textContent = input
    if (input === "") {
        console.log("Need to type something!")
    } else {
        endorsementList.append(newEl)
    }
}