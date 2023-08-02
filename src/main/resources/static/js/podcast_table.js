//global Flag
let modifying = false;


// toggle bg
function toggle_bg() {
    const bg = document.getElementById('page-mask');
    bg.classList.toggle('show');
}

// table 
const table_body = document.getElementById('table-body');

// form
const form = document.querySelector('#pc-action');
const toast = new bootstrap.Toast(document.querySelector('.toast'));
const bg = document.querySelector('#page-mask');
form.addEventListener('submit', (event) => {
    toast.show(); // Show the toast component
    bg.classList.toggle('show');
});

//pagination

// row html
const htmlRowPodcast = (podcast) =>{
    return `<tr>
        <td class="editable-text">${podcast.id}</td>
        <td class="editable-text">${podcast.title}></td>
        <td class="editable-text">${podcast.authors}</td>
        <td class="editable-text">${podcast.description}</td>
        <td class="editable-text">${podcast.page}</td>
        <td class="action">
            <button class="btn btn-primary modify-btn collapse show">Modify</button>
            <buttun class="btn btn-dark cancel-btn collapse">Cancel</buttun>
            <button class="btn btn-success save-btn">Save</button>
            <button class="btn btn-danger delete-btn" >Delete</button>
        </td>
    </tr>`
}
const tableBody = document.querySelector("#table-body")
const pagin = document.querySelectorAll(".page")

pagin.forEach((page)=>{
    page.addEventListener("click", (e)=>{
        e.preventDefault()
        tableBody.innerHTML = ''
        let href = page.href
        fetch(href)
            .then(response => {
                if (!response.ok){
                    throw new Error("Cannot get podcast")
                }
                else {
                    return response.json()
                }
            })
            .then(data => {
                const podcastList = data._embedded.podcasts
                podcastList.forEach((podcast)=> {
                    tableBody.insertAdjacentHTML("beforeend", htmlRowPodcast(podcast))
                })
                console.log("456")
                modifyBtnsHandler()
                saveBtnsHandler()
                deleteBtnHandler()
                window.scrollTo({
                    top: 0
                });

                }
            )
            .catch(error => {
                console.error('Fetch Error', error)
            });


    })
})
let table  = document.querySelector(".table-head")
let editingFlag = false
let modifyBtn
let cancelBtn
modifyBtnsHandler()
function modifyBtnsHandler(){
    modifyBtn = document.querySelectorAll(".modify-btn")
    modifyBtn.forEach((each) => {
        each.addEventListener('click',() => {
            console.log("123")
            const row = each.parentNode.parentNode
            let editableTexts = row.querySelectorAll(".editable-text")
            let cancelBtn = each.nextElementSibling
            toggleModifyBtn(each, cancelBtn)
            rowEditableOn(editableTexts,cancelBtn)
        })
    })
}


function rowEditableOn(editableTexts, cancelBtn){
    editableTexts.forEach((text) => {
        text.addEventListener("click", () => {
            if (modifying == true) {
                if (editingFlag == false){
                    editingFlag = true
                    let textInput = document.createElement("textarea");
                    textInput.value = text.textContent;
                    textInput.style.width = "100%"
                    textInput.style.height =  text.offsetHeight + 'px'
                    textInput.style.resize = "none"
                    textInput.classList.add("changes")
                    localStorage.setItem("old-text", text.textContent)
                    text.textContent  = ''
                    text.appendChild(textInput)
                    textInput.addEventListener('change',() => {
                        const id = text.parentElement.cells[0].textContent;
                        localStorage.setItem("changes-id", id)
                        const field  = table.rows[0].cells[text.cellIndex].textContent.toLowerCase();
                        localStorage.setItem("changes-field", field)
                        localStorage.setItem("changes-content", textInput.value)
                    })

                    cancelBtn.addEventListener('click', cancelBtnHandler)

                    function cancelBtnHandler (){
                        editingFlag = false
                        modifying = false
                        try {
                            text.removeChild(textInput)
                        }
                        catch (err){

                        }
                        text.textContent = localStorage.getItem("old-text")
                        cancelBtn.removeEventListener('click',cancelBtnHandler)
                        console.log("eddit flag" +  editingFlag)
                    }
                }
            }
        })
    })
    cancelBtn.addEventListener('click', ()=>{
        if (editingFlag == false) {
            modifying = false
        }
    })
}

function toggleModifyBtn (modifyBtn, cancelBtn) {
    if (modifying == false) {
        modifying = true
        modifyBtn.classList.remove("show")
        cancelBtn.classList.add("show")
    }
    else {
        throw new Error("modifying should be false")
    }

    cancelBtn.addEventListener('click', ()=> {
        cancelBtn.classList.remove('show')
        modifyBtn.classList.add('show')
    })
}


let saveBtns
saveBtnsHandler()
function saveBtnsHandler(){
    saveBtns = document.querySelectorAll(".save-btn")
    saveBtns.forEach((saveBtn)=>{
        saveBtn.addEventListener("click", () => {
            if(localStorage.getItem('changes-id') != null){
                saveNewUpdate()
                //    remove textarea eventlistener
                //    clear changes
                localStorage.removeItem('changes-id')
                localStorage.removeItem('changes-field')
                localStorage.removeItem('changes-content')
            }
        })
    })
}


//Post request to change content


function saveNewUpdate(){
    if (localStorage.getItem('changes-id') == null){
        return
    }
    let putData = {}
    putData["id"] = localStorage.getItem('changes-id')
    putData[localStorage.getItem('changes-field')] = localStorage.getItem('changes-content');

    const modifyRequestOption = {
        method : 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + getCookie('JSESSIONID')
        },
        body: JSON.stringify(putData)
    }
    console.log(putData)
    fetch('/podcasts/' + putData.id, modifyRequestOption)
        .then((res) => {
            if (!res.ok){
                throw new Error("Cannot change requested")
            }
            else {
                return res.json()
            }
        } )
        .then((res) => {
            location.reload()
        })
        .catch((err)=>{
            console.error('Fetch Error for Post Request', error)
        })
}



function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

//delete podcast handler
let deleteBtns
deleteBtnHandler()
function deleteBtnHandler(){
    let deleteBtns = document.querySelectorAll(".delete-btn")
    deleteBtns.forEach((each) => {
        each.addEventListener('click',() => {
            const row = each.parentNode.parentNode
            const id = row.firstElementChild.innerHTML
            deleteUrl = "/podcasts/" + id
            const deleteRequestOption = {
                method : "DELETE",
                headers : {
                    'Content-Type' : "application/json",
                    'Authorization' : "Bearer " + getCookie("JSESSIONID")
                }
            }

            fetch(deleteUrl, deleteRequestOption)
                .then((res) => {
                    if (!res.ok){
                        throw new Error("Cannot delete this episode " + id)
                    }
                    else{
                        location.reload()
                    }
                })
        })
    })

}


function submitFormData(event){
    event.preventDefault()
    let form = document.querySelector("#pc-action")
    let submitter = document.querySelector(".submit-btn")
    let formData = new FormData(form,submitter)
    let requestOption= {
        method: "POST",
        headers: {

            'Authorization' : 'Bearer ' + getCookie('JSESSIONID')
        },
        body: formData
    }
    fetch("/podcasts", requestOption)
        .then((res) => {
            if (!res.ok){
                throw new Error("Network error");
            }
            else {
                return res.text;
            }
        })
        .catch((err) => {
            console.log(err)
        })
    toast.show(); // Show the toast component
    bg.classList.toggle('show');
}

