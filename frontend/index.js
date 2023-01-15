
const baseURL = "https://troubled-blue-firefly.cyclic.app/"
// -------------------------------------------------------------------------
const register = async () => {
    // e.preventDefault(); // it is not a form 

    let name = document.querySelector("#name").value;
    let email = document.querySelector("#email").value;
    let pass = document.querySelector("#password").value;
    let age = document.querySelector("#age").value;

    const payload = {
        email,
        pass,
        name,
        age
    }

    await fetch(`${baseURL}/user/register`, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
    })
        // const data = await fetchData.json();
        .then((result) => {
            if (result.ok) {
                alert("Registration successful");
                window.location.href = "login.html"
            }
        }).catch((err) => {
            console.log(err);
            alert(err)
        });
}

// -------------------------------------------------------------------------
const login = async () => {

    const email = document.querySelector("#email").value;
    let pass = document.querySelector("#password").value;

    const payload = {
        email,
        pass
    }

    const fetchedData = await fetch(`${baseURL}/user/login`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
    })

    const data = await fetchedData.json();
    if (fetchedData.ok) {
        window.location.href = "Note.html"
    }
    sessionStorage.setItem("token", data.token);
}

// -------------------------------------------------------------------------

const createNote = async () => {

    document.querySelector("#box").innerHTML = `

    <div>
    
        <h2>Create Note</h2>

        <lable for="Title"> Title </lable>
        <input id="title" type="text" placeholder="Title">

        <lable for="Note"> Note </lable>
        <input id="note" type="text" placeholder="Note">

        <lable for="Category"> Category </lable>
        <input id="category" type="text" placeholder="Category"> <br>

        <button onclick="post()"> Add Note</button> <br>
        <button onclick="createNote()">clear</button>

    </div>
    
    `
}

function post() {
    const title = document.querySelector("#title").value;
    const note = document.querySelector("#note").value;
    const category = document.querySelector("#category").value;

    const payload = {
        title,
        note,
        category
    }

    fetch(`${baseURL}/notes/create`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": sessionStorage.getItem("token")
        },
        body: JSON.stringify(payload)
    })
        .then(result => {
            result.json()
            if (result.ok) { alert("Note has been posted") }
        })
        .then(data => {
            // console.log(data)
        })
        .catch(err => {
            console.log(err);
        })

    show();
}

// -------------------------------------------------------------------------
const show = async () => {

    fetch(`${baseURL}/notes`, {
        headers: {
            "Authorization": sessionStorage.getItem("token")
        }
    }).then(result => result.json()).then(data => {
        output(data);
        // console.log(data);
    })
        .catch(err => {
            console.log(err);
        })

}

function output(data) {
    document.querySelector("#show").innerHTML = "";

    if (data.length != 0) {

        data.forEach(element => {

            let div = document.createElement("div");

            let title = document.createElement("h3");
            title.innerText = `Title : ${element.title}`

            let Author = document.createElement("h5");
            Author.innerText = `Author : ${element.name}`;

            let Notes = document.createElement("p");
            Notes.innerText = `Notes : ${element.note}`;

            let Category = document.createElement("p");
            Category.innerText = `Category : ${element.category}`;

            let edit = document.createElement("button");
            edit.innerText = `Edit`;
            edit.addEventListener("click", () => {
                update(element._id);
            })

            let btn = document.createElement("button");
            btn.innerText = `Delete`;

            btn.addEventListener("click", () => {
                deleteNote(element._id);
            });

            div.append(title, Author, Notes, Category, edit, btn);

            document.querySelector("#show").append(div);

        });
        // let div = data.map(item => {

        //     return `

        //             <div>
        //                 <h3>Title : ${item.title}</h3>
        //                 <h5>Author : ${item.name}</h>
        //                 <p>Notes : ${item.note}</p>
        //                 <p>Category : ${item.category}</p>
        //                 <button onclick="update(${item._id})">Edit</button>
        //                 <button onclick="deleteNote()">Delete</button>
        //             </div>
        //         `
        // })
        // document.querySelector("#show").innerHTML = div.join("")

    } else {
        document.querySelector("#show").innerHTML = `<h2>No Notes</h2>`
    }
}

//-------------------------------------------------------------------------------

const deleteNote = async (id) => {

    await fetch(`${baseURL}/notes/delete/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": sessionStorage.getItem("token")
        }
    }).then(result => {
        result.json();
        if (result.ok) {
            console.log();
            alert("Note has beem deleted")
        }
    }).catch(err => {
        console.log(err);
    })
    show();
}

const update = async (id) => {

//     const title = document.querySelector("#title").value;
//     const note = document.querySelector("#note").value;
//     const category = document.querySelector("#category").value;

//     const payload = {
//         title,
//         note,
//         category
//     }
//     await fetch(`${baseURL}/notes/update/${id}`, {
//         method: "PATCH",
//         headers: {
//             "Authorization": sessionStorage.getItem("token")
//         },
//         body : JSON.stringify(payload)
//     }).then(result => {
//         result.json();
//         if (result.ok) {
//             console.log(result);
//             alert("Note has beem updated")
//         }
//     }).catch(err => {
//         console.log(err);
//     })
//     show();
}
