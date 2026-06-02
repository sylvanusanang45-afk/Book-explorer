let books=[]

let favourites=JSON.parse(localStorage.getItem("favourites"))||[]

const input=document.getElementById("search");
const addbtn=document.getElementById("addbtn");
const resultList=document.getElementById("result");
const favouriteList=document.getElementById("favourite");
const sortbtn=document.getElementById("sort")
const filtbtn=document.getElementById("filter")

function saveFavourite(){
  localStorage.setItem("favourites",JSON.stringify(favourites))
}

function searchBook(){
let query=input.value.toLowerCase()

fetch(`https://openlibrary.org/search.json?q=${query}`)
.then(res => res.json())
.then(data => {

books=data.docs
console.log(data)
renderResult(books)
})

}

function addFavourite(book){
let exists=favourites.find(t => t.key === book.key)

if(!exists){

book.important=false

favourites.push(book)

saveFavourite()
renderFavourite()
}}

function delFavourite(id){
favourites=favourites.filter(t => t.key !== id)

saveFavourite()
renderFavourite()
}

function toggFavourite(id){
let favourite=favourites.find(t => t.key === id)

favourite.important=!favourite.important

saveFavourite()
renderFavourite()
}

function createResultItem(book){
let li=document.createElement("li")

let savebtn=document.createElement("button")
savebtn.innerText="Save"

savebtn.addEventListener("click",() => {
  addFavourite(book)
})

let title=document.createElement("h3")
title.innerText=book.title

let published=document.createElement("p")
published.innerText=`Date published: ${book.first_publish_year}`

let author=document.createElement("p")
author.innerText=`Author: ${book.author_name}`

let ebook=document.createElement("p")
ebook.innerText=`Ebook: ${book.ebook_access}`

let language=document.createElement("p")
language.innerText=`Language: ${book.language?[0] : "N/A"}`

li.appendChild(savebtn)
li.appendChild(title)
li.appendChild(published)
li.appendChild(author)
li.appendChild(ebook)
li.appendChild(language)

return li

}

function createFavouriteItem(favourite){
let li=document.createElement("li")

let delbtn=document.createElement("button")
delbtn.innerText="Delete"

delbtn.addEventListener("click",() => {
  delFavourite(favourite.key)
})

let toggbtn=document.createElement("button")
toggbtn.innerText="Fav"

toggbtn.addEventListener("click",() => {
  toggFavourite(favourite.key)
})

let title=document.createElement("h3")
title.innerText=favourite.title

let published=document.createElement("p")
published.innerText=`Date published: ${favourite.first_publish_year}`

let author=document.createElement("p")
author.innerText=`Author: ${favourite.author_name}`

let ebook=document.createElement("p")
ebook.innerText=`Ebook: ${favourite.ebook_access}`

let language=document.createElement("p")
language.innerText=`Language: ${favourite.language?[0] : "N/A"}`

li.appendChild(delbtn)
li.appendChild(toggbtn)
li.appendChild(title)
li.appendChild(published)
li.appendChild(author)
li.appendChild(ebook)
li.appendChild(language)

return li

}

function renderResult(array){
resultList.innerHTML=""

for(let i=0; i< array.length; i++){
let li=createResultItem(array[i])
  resultList.appendChild(li)
}
}

function renderFavourite(){
favouriteList.innerHTML=""

for(let i=0; i< favourites.length; i++){
let li=createFavouriteItem(favourites[i])
  favouriteList.appendChild(li)
}
}

function sortList(){
books.sort((a,b)=>a.title[0].localeCompare(b.title[0]) )

renderResult(books)
}

function filterList(){
let expense=books.filter(t => t.first_publish_year > 2000)

renderResult(expense)
}


addbtn.addEventListener("click", searchBook)

sortbtn.addEventListener("click", sortList)

filtbtn.addEventListener("click", filterList)