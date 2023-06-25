// toggle bg
function toggle_bg() {
    const bg = document.getElementById('page-mask');
    bg.classList.toggle('show');
}

// table 
const table_body = document.getElementById('table-body');

const request = new XMLHttpRequest();
request.open('GET', 'api/v1/podcast');
request.responseType = 'json';
request.send();
request.onload = function() {
    const data = request.response;
    populateData(data);
}

function populateData(data) {
    for (let i=0;i<data.data.length;i++){
        const row   = document.createElement("tr");
        for(let j in data.data[i]){
            let skip_list = ["directory","slug","series_id"];
            if (skip_list.includes(j)){
                continue;
            }
            const col = document.createElement("td");
            col.textContent= data.data[i][j];
            row.appendChild(col);
        }
        table_body.appendChild(row);
    }
}

// form
const form = document.querySelector('#pc-action');
const toast = new bootstrap.Toast(document.querySelector('.toast'));
const bg = document.querySelector('#page-mask');
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from submitting normally
    toast.show(); // Show the toast component
    bg.classList.toggle('show');

});

