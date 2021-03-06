fetch("./static/data.json").then(response => {
    (response.ok) ? response.json().then(json => { 
        let books = json; 
        booksManadger(books);
      })
    : console.log('Network request for data.json failed with response ' + response.status + ': ' + response.statusText);
  });
  
  booksManadger = (books) =>{
    let myBooks = books,
        countBook = 0,
        left = document.querySelector('.left'),
        right = document.querySelector('.right'),
        countBookLocalStorage = +localStorage.getItem("countBook");
  
    createNode = (element) => document.createElement(element);
    append = (parent, el) => parent.appendChild(el);
    searchInput();
  
    if(countBookLocalStorage == 0) {
      for(var key in myBooks) {
        if(myBooks.hasOwnProperty(key)) {
            myBooks[key].id = key;
            countBook = countBook+1;
            myBooks[key].side = "left";
            localStorage.setItem(myBooks[key].id, JSON.stringify(myBooks[key]));
         }
      }
      localStorage.setItem("countBook", countBook);
      createdBlockCount();
      showBooks();
    }else{
      countBook = countBookLocalStorage;
      createdBlockCount();
      showBooks();
    }

    /**
     * Main fanction. This function creted DOM Elements
     */

    function showBooks (){
      left.innerHTML = "";
      right.innerHTML = "";
      
      for(let i = 1; i <= countBook; i++){
        let newBook = JSON.parse(localStorage.getItem(i)),
            div = createNode('div'),
            elementDOM = `
              <div class="pic"><span><img src="${newBook.img}"></span></div>
              <div class="title">
                <span><b>Название:</b> "${newBook.name}"</span>
                <span><b>Автор:</b> ${newBook.author}</span>
              </div>`;
  
        div.className = "item";  
        div.innerHTML = elementDOM;
        div.dataset.id = newBook.id;
  
        if(newBook.side == "left"){
          div.insertAdjacentHTML("beforeEnd", `<div class="after"></div>`);
          newBook.side = "left";
          localStorage.setItem(newBook.id, JSON.stringify(newBook));
          append(left, div);
        }else if(newBook.side == "right"){
          div.insertAdjacentHTML("beforeEnd", `<div class="before" onclick="moveToLeft(`+newBook.id+`)"></div>`);
          newBook.side = "right";
          localStorage.setItem(newBook.id, JSON.stringify(newBook));
          append(right, div);
        }
      }
      let buttonAfter = document.querySelectorAll('.after');
      buttonAfter.forEach((itemAfter) => itemAfter.addEventListener('click', moveToRight));
      counterBook(); 
    }

    /*
     * moveToLeft => зробив щоб показати що можна було ще через onclick (але вбільшості роблю через addEventListener)
     */

    moveToLeft=(indexBook)=>{
      let findBook = JSON.parse(localStorage.getItem(indexBook));
      (findBook.side == "right") ? findBook.side = "left" : findBook.side == "right";
      localStorage.setItem(findBook.id, JSON.stringify(findBook));
      showBooks();
    }
    
    function moveToRight(e){
      let findBook = JSON.parse(localStorage.getItem(e.target.parentNode.dataset.id));
      (findBook.side == "left") ? findBook.side = "right" : findBook.side == "left";
      localStorage.setItem(findBook.id, JSON.stringify(findBook));
      showBooks();
    }
  
    function createdBlockCount(){
      let content = document.querySelector('.content');
      content.insertAdjacentHTML('beforeBegin', `<div class="counter"></div>`)
    };
  
    function counterBook(){
      let buttonAfter = document.querySelectorAll('.after').length;
      let buttonBefore = document.querySelectorAll('.before').length;
      let counter = document.querySelector('.counter');
      counter.innerHTML = "";
      counter.innerHTML = `<span style="color: green; font-size: 1.5em; margin: 0 15px 0 15px;">Quantity of books (left side): ${buttonAfter} </span>
                           <span style="color: red; font-size: 1.5em; margin: 0 15px 0 15px;">Quantity of books (right side): ${buttonBefore} </span>` 
    }
    
    function searchInput(){
      let input = document.querySelector('input[type="text"]');
      input.addEventListener("keyup", inputHandler);
      function inputHandler(){
        let valueInput, books, author;
        valueInput = input.value.toUpperCase();
        books = document.querySelectorAll('.item');
        for (let i = 0; i < books.length; i++) {
          author = books[i].children[1].children[1].childNodes[1].nodeValue;
          if (author.toUpperCase().indexOf(valueInput) > -1) {
              books[i].style.display = "";
              quantityBook();
          } else {
              books[i].style.display = "none";
              quantityBook();
          }   
        }
      }
    }
  
    function quantityBook(){
      let books = document.querySelectorAll('.item');
      let bookSize = 0;
      for(let i =0; i<books.length; i++){
        if(books[i].style.display != 'none'){
            bookSize = bookSize + 1;
        }
      }
      document.querySelector('.counter').innerHTML = `<span style="color: green; font-size: 1.5em;">Find books: ${bookSize}</span>`
    }
    
}