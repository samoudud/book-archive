const searchInput = document.getElementById('search-input');
const spinner = document.getElementById('spinner');
const errorMsg = document.getElementById('error-msg');
const totalResult = document.getElementById('total-result');
const results = document.getElementById('search-result');
const resultBg = document.getElementById('result-container');

const loadData = () => {
    spinner.classList.remove('d-none');
    // clear page 
    totalResult.textContent = "";
    results.textContent = "";
    errorMsg.innerText = "";
    resultBg.classList.remove('restultStyle');

    const searchText = searchInput.value;
    if (searchText == "") {
        spinner.classList.add('d-none');
        errorMsg.innerHTML = `<p class="fs-3 text-center text-danger fw-bolder" id="error-msg">Search field is empty! Enter a book name to get results</p>`
        return
    }
    else {
        const url = `https://openlibrary.org/search.json?q=${searchText}`;

        // get data
        fetch(url)
            .then(res => res.json())
            .then(data => showResults(data))
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                searchInput.value = "";
            })
    }
};



const showResults = (books) => {
    spinner.classList.add('d-none');
    if (books.numFound === 0) {
        errorMsg.innerHTML = `<h2 class="fs-3 text-center text-danger fw-bolder" id="error-msg">No result Found!!!</h2>`;
        return;
    }
    resultBg.classList.add('restultStyle');
    // adding search result to website 
    addResult(books);
};



const addResult = (books) => {
    const bookArray = books.docs;
    // display total search result founnd
    totalResult.innerHTML = `
                <h2 class="py-2 my-2 text-center fw-bolder">Total books found: ${books.numFound}</h2>
                `;

    // loop through bookArray and add them to website
    bookArray.forEach(element => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card result-bg mb-3">
        <div class="row align-items-center g-1">
          <div class="col-md-4">
            <img src="https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg" alt="...">
          </div>
          <div class="col-md-8">
                              <h5>Book Name: <span class="fw-bloder fs-4">${element.title}</span></h5>
                              <h5>Author Name: <span class="fw-bloder fs-4">${element.author_name ? element.author_name[0] : 'N/A'}</span></h5>
                              <h5>Publisher Name: <span class="fw-bloder fs-4">${element.publisher ? element.publisher[0] : 'N/A'}</span></h5>
                              <h5>First Publish: <span class="fw-bloder fs-4">${element.first_publish_year ? element.first_publish_year : 'N/A'}</span></h5>
      
            </div>
          </div>
        </div>
      </div>
        `;
        results.appendChild(div);
    });
};
