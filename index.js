'use strict';

const searchURL = 'https://api.github.com/repos/';


function formatQueryParams(params) {
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('/');
}

function displayResults(responseJson){
    console.log(responseJson);
    $('#results-list').empty();
    $('#results-list').append(
        `<h4><a href="${responseJson.html_url}">${responseJson.name}</a></h4>`
            
    );
    $('#results').removeClass('hidden');    
};

function getRepo(){    
    const owner= $('#js-search-term').val();
    const repo= $('#js-repo-name').val();
    const url = searchURL + owner + '/' + repo;
    console.log(url);

fetch(url)
    .then(response => {
        if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
        $('#js-error-message').text('something went wrong: ${err.message}');
    });
}

function watchForm(){
    $('form').submit(event => {
        event.preventDefault();
        getRepo();
    });
}

$(watchForm);