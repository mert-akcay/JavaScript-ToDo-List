const inputDOM = document.querySelector("#eventText")
const spaceDOM = document.querySelector("#empty-space")
const itemDOM = document.querySelector('#item')
const textDOM = document.getElementById('text-object')
const submitButton = document.querySelector("#submit")

let emptyList = []
let i = 0


window.addEventListener("load",onStart)

function onStart() {
    let existingItems = localStorage.getItem('items')
    let existingArray = existingItems.split(',')
    existingArray.forEach(element => {
        if(element){
            startItems(element)
            emptyList.push(element)
        }
    });
}

function startItems(text) {
    
    textDOM.innerHTML = text
    let a = itemDOM.cloneNode(true)
    let newLi = document.createElement('li')
    a.classList.replace("d-none","d-xs")
    spaceDOM.appendChild(newLi).appendChild(a)
    a.id += i
    let b = document.getElementById(`item${i}`).childNodes[5]
    b.id += i
    let c = document.getElementById(`item${i}`).childNodes[3]
    c.id += i
    document.getElementById(`deletef${i}`).addEventListener("click",deleteF)
    document.getElementById(`text-object${i}`).addEventListener("click",getHighlight)
    let d = document.getElementById(`item${i}`).childNodes[1]
    d.id += i
    if (text.slice(-2)=="--"){
        console.log(c)
        highlighter(c)
        
    }
    i++

        }


function highlighter(text) {
    text.parentNode.classList.replace("bg-danger","bg-primary")
    text.style.textDecorationLine  = "line-through"
    text.style.textDecorationColor  = "black"
    text.style.fontStyle  = "italic"
    text.parentNode.childNodes[1].classList.replace("d-none","d-xs")
    text.parentNode.childNodes[5].style.marginLeft = "7.3%"    
}



function toDo(event) {
    if (inputDOM.value){
        if (inputDOM.value.length > 90){
            $('#exampleModal1').modal();
        }
        else{
            event.preventDefault()
            textDOM.innerHTML = inputDOM.value
            emptyList.push(inputDOM.value)
            localStorage.setItem('items',emptyList)
            inputDOM.value=""
            let a = itemDOM.cloneNode(true)
            let newLi = document.createElement('li')
            a.classList.replace("d-none","d-xs")
            spaceDOM.appendChild(newLi).appendChild(a)
            a.id += i
            /* document.getElementById(`item${i}`).addEventListener("click",deleteF) */
            let b = document.getElementById(`item${i}`).childNodes[5]
            b.id += i
            let c = document.getElementById(`item${i}`).childNodes[3]
            c.id += i
            document.getElementById(`deletef${i}`).addEventListener("click",deleteF)
            document.getElementById(`text-object${i}`).addEventListener("click",getHighlight)
            let d = document.getElementById(`item${i}`).childNodes[1]
            d.id += i
            i++
        }
    }
    else {
        $('#exampleModal').modal();
    }
    
}

function deleteF(event) {
    this.parentNode.remove()
    let index = emptyList.indexOf(`${this.parentNode.childNodes[3].innerHTML}`)
    emptyList.splice(index,1)
    localStorage.setItem('items',emptyList)
}


function getHighlight(event) {
    let context = this.parentNode.childNodes[3]

    if (this.parentNode.classList[1] == "bg-danger") {
        this.parentNode.classList.replace("bg-danger","bg-primary")
        this.style.textDecorationLine  = "line-through"
        this.style.textDecorationColor  = "black"
        this.style.fontStyle  = "italic"
        this.parentNode.childNodes[1].classList.replace("d-none","d-xs")
        this.parentNode.childNodes[5].style.marginLeft = "7.3%"
        if (!(this.innerHTML.slice(-2) == "--")){
            emptyList[emptyList.indexOf(`${this.innerHTML}`)] = this.innerHTML + "--"
            localStorage.setItem('items',emptyList)
            this.innerHTML += "--"
        }
    }

    else {
        this.parentNode.classList.replace("bg-primary","bg-danger")
        this.style.textDecorationLine  = "none"
        this.style.fontStyle  = "normal"
        this.parentNode.childNodes[1].classList.replace("d-xs","d-none")
        this.parentNode.childNodes[5].style.marginLeft = "10.8%"
        if (this.innerHTML.slice(-2) == "--"){
            emptyList[emptyList.indexOf(`${this.innerHTML}`)] = this.innerHTML.slice(0,-2)
            localStorage.setItem('items',emptyList)
            this.innerHTML = this.innerHTML.slice(0,-2)
        } 
    }
    
}


submitButton.addEventListener("click",toDo)
inputDOM.addEventListener("keypress", function(event){
    if (event.keyCode == "13"){
        submitButton.click()
    }
})






