var htmlFileName = window.location.pathname.split("/").pop();
var url = "http://localhost:3000/reviews";



if (htmlFileName === 'about.html') {
    document.getElementById('postData').addEventListener('submit', postData);
    document.getElementById('postData').addEventListener('keyup', function(e){
        if(e.keyCode === 13) {
            postData();
        }
    })

    var sectionReviewDOM = document.createElement("section");
        document.querySelector("body").appendChild(sectionReviewDOM);
        sectionReviewDOM.setAttribute('id', 'reviewSectionId');
    var sectionTitleDOM = document.createElement("h2");
        sectionTitleDOM.innerHTML = "Reviews: ";
        sectionReviewDOM.appendChild(sectionTitleDOM);

    var ulDOM = document.createElement("ul");
        sectionReviewDOM.appendChild(ulDOM);


    window.onload = function() {
        getJSON(true, 0);
    }
}

if(htmlFileName === 'admin.html') {

    var ulDOM = document.createElement("ul");
    document.querySelector("body").appendChild(ulDOM);
    document.getElementById('select').addEventListener('click', getID);
    document.getElementById('edit').addEventListener('click', putData);
    document.getElementById('delete').addEventListener('click', deleteData);
    window.onload = function() {
        getJSON(true, 0);
    }

}
var id = [];

function clearFormAbout() {
    document.getElementById("name").value = "";
    document.getElementById("review").value ="";
}

function getJSON(stat, id) {
    fetch(url).then((res) => res.json()).then((data) => {
        if(stat == true) {
            for(var i = 0; i < data.length; i++) {
                if(htmlFileName === "admin.html") {
                        var liDOM = document.createElement("li");
                            liDOM.innerHTML = "Id: " + data[i].id;
                            ulDOM.appendChild(liDOM);
                }
                var divDOM = document.createElement('div');
                    ulDOM.appendChild(divDOM);
                    
                    var liDOM = document.createElement("li");
                    liDOM.innerHTML = "Nume: " + data[i].name;
                    divDOM.appendChild(liDOM);
                var liDOM = document.createElement("li");
                    liDOM.innerHTML = data[i].review;
                    divDOM.appendChild(liDOM);
            }
        } else {
            for(var i = 0; i < data.length; i++) {
                var idJSON = parseInt(data[i].id);
                if(idJSON == id) {
                    document.getElementById('name').value = data[i].name;
                    document.getElementById('review').value = data[i].review;
                    break;
                }
                if (i == data.length - 1 && idJSON != id) {
                    alert('Nu exista acest id in JSON');
                    return;
                }
            }
        }
    })
}

function clearList() {
    document.querySelectorAll("li").forEach(function(element) {
        ulDOM.removeChild(element);
    })
}

function postData(event) {
    event.preventDefault();
    var formData = new FormData(), result = {};
        formData.append('name', document.getElementById('name').value);
        formData.append('review', document.getElementById('review').value);
    result = {};
    for(var entry of formData.entries()) {
        result[entry[0]] = entry[1];
    }
    result = JSON.stringify(result);
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:result
    }).then((res) => res.json())
      .then((data) => { 
                        clearList();
                        getJSON(true, 0);
                        if(htmlFileName === "about.html") {
                            clearFormAbout();
                            getJSON(true, 0);
                        }
                    })
      .catch((err) => console.log(err))
}

function putData() {
    var formData = new FormData(), result = {};
    formData.append('name', document.getElementById('name').value);
    formData.append('review', document.getElementById('review').value);
    result = {};
    for(var entry of formData.entries())  {
        result[entry[0]] = entry[1];
    }
    result = JSON.stringify(result);
    fetch(url + '/' + document.getElementById('id').value, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'	
        },
        body:result
    }).then((res) => res.json())
      .then((data) => {
          clearList();
          getJSON(true, 0);
      })
      .catch((err) => console.log(err))

}

function getID(){
    var id = document.getElementById('id').value;
    getJSON(false, id);
}

function deleteData() {
    var formData = new FormData(), result = {};
    formData.append('name', document.getElementById('name').value);
    formData.append('review', document.getElementById('review').value);
    result = {};
    for(var entry of formData.entries())  {
        result[entry[0]] = entry[1];
    }
    result = JSON.stringify(result);
    fetch(url + '/' + document.getElementById('id').value, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'	
        },
        body:result
    }).then((res) => res.json())
      .then((data) => {
        clearList();
        getJSON(true, 0);
      })
      .catch((err) => console.log(err))

}