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
    
}