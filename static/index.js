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
        showBooks();
      }else{
        countBook = countBookLocalStorage;
        showBooks();
      }


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
        
      }
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
}