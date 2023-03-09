function fetcher(){

    let title = document.getElementById('title').value;
    let year = document.getElementById('year').value;
    let errorMsg = document.getElementById('error');
    let content = document.getElementById('content');
    addButton.innerText = '+ Add to watchlist!'

    if (title == ''){
        errorMsg.innerHTML = '<h2>Type in the name of the movie or series in the search bar to get its details! For additional accuracy, enter the year in which it was released in the second box.</h2>'
        content.style.visibility = 'hidden';
    } else{
    const getAPI = async () => {
        const response = await fetch(`https://www.omdbapi.com/?t=${title}&y=${year}&plot=full&apikey=f9cf2495`);
        console.log(response.status)
        const data = await response.json();
        return data;
    }
    
    let poster = document.getElementById('poster');
    let movieTitle = document.getElementById('movieTitle');
    let genInfo = document.getElementById('genInfo');
    let plot = document.getElementById('plot');
    let reception = document.getElementById('reception');

    getAPI()
    .then(data => {
        console.log('all good da', data);
        if (data.Response == 'False'){
            content.style.visibility = 'hidden';
            errorMsg.innerHTML = '<h2>Whoops! Looks like we could not find the movie you requested. Maybe check the spelling, spacing and/or punctuation?</h2><br><img src=https://thumbs.gfycat.com/LinearSlightIchidna-max-1mb.gif style = "width : 80%">'
        } else {
            content.style.visibility = 'visible';

            errorMsg.innerHTML = '<br>';
            reception.innerHTML = '';
            const addButtonText = document.getElementById('addToWatchlist');
            
            poster.innerHTML = `<img src = ${data.Poster}>`;
            movieTitle.innerHTML = `<h2>Title: ${data.Title}</h2><hr>`;
            genInfo.innerHTML = 
                `<h4>Overview & details:</h4>
                <li>Released : ${data.Released}</li>
                <li>Genre : ${data.Genre}</li>
                <li>Director : ${data.Director}</li>
                <li>Writer : ${data.Writer}</li>
                <li>Starring : ${data.Actors}</li>
                <li>Language : ${data.Language}</li>
                <li>Runtime : ${data.Runtime}</li>
                <li>Rated : ${data.Rated}</li><hr>`;
            plot.innerHTML = `<h4>Synopsis:</h4><p>${data.Plot}</p><hr>`;
    
            if (data.Type == 'movie'){
                reception.innerHTML = 
                `<h4>Commercial reception:</h4>
                Box office : ${data.BoxOffice}<br><br>`
            }
                
            reception.innerHTML += `<h4>Critical reception:</h4>`
            let ratingsArray = data.Ratings;
            for(let i = 0; i < ratingsArray.length; i++){
                let ratingsObject = ratingsArray[i];
                reception.innerHTML += `<li>${ratingsObject.Source} - ${ratingsObject.Value}</li>`;
            }
            reception.innerHTML += '<hr>'

        }
    })
    .catch(error => {
        console.log('idiot u did something wrong', error);
    })
    }
    return false;

}

const addButton = document.querySelector('#addToWatchlist');
console.log(addButton)
addButton.addEventListener('click', () =>{

        let watchlist = document.getElementById('myDropdown');
        let movieTitle = document.getElementById('movieTitle');
        console.log(typeof watchlist.innerHTML,watchlist.innerHTML, watchlist.innerHTML == '<p>Search up a film or series which you like and add them to this watchlist!</p>')
        if (watchlist.innerHTML == '<p>Search up a film or series which you like and add them to this watchlist!</p>'){
            watchlist.innerHTML = ''
        }
        console.log(watchlist.innerHTML,movieTitle.innerText, watchlist.innerHTML.includes(movieTitle.innerText))
        if (watchlist.innerHTML.includes(movieTitle.innerText) == false){
            addButton.innerText = '✓ Added'
            watchlist.innerHTML += `<li>${movieTitle.innerText}</li>`//`<button type="button" id = 'remove'>✕</button><hr>```
        } else {
            addButton.innerText = 'Already added!'
        }        
})

/*const removeButton = document.querySelector('#remove');
removeButton.addEventListener('click', () =>{
    
})*/

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");

  }

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

