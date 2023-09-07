const inputEl = document.getElementById("input-el")
const publishBtn = document.getElementById("publish-btn")
const endorsementList = document.getElementById("endorsement-list")

publishBtn.addEventListener("click", function() {
    appendInputToEndorsementList(inputEl.value)

    clearInputText()
})

function clearInputText() {
    inputEl.value = ""
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