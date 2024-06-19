
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from
"https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL:"https://real-time-database-19d8c-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database= getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")


const inputFieldEL= document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl= document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
        let inputValue=inputFieldEL.value
            
        push(shoppingListInDB, inputValue)
                   
        clearInputFieldEL()
})

onValue(shoppingListInDB, function(snapshot){

    if(snapshot.exists()){ 
        let itemsArray= Object.entries(snapshot.val())

        clearShoppingListEl()
   
       for (let i =0; i < itemsArray.length; i++) {
           let currentItem = itemsArray[i]
           let  currentItemID = currentItem[0]
           let currentItemValue= currentItem[1]
           
           appendItemToShoppingListEl(currentItem)
          
       }   
       } else{
        shoppingListEl.innerHTML="No items"
       }
   
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML=  ""
}

function clearInputFieldEL() {
    inputFieldEL.value = ""  
}
 

function appendItemToShoppingListEl(item){
   let itemID = item[0]
   let itemValue = item[1]

    let newEl= document.createElement("li")

    newEl.textContent=itemValue

    newEl.addEventListener("click", function() {
       let exactLocationOfItemInDB = ref(database,`shoppingList/${itemID}`) 
     
       remove(exactLocationOfItemInDB)

    })

    shoppingListEl.append(newEl)
}