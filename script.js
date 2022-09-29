function saveToLocalStorage(event){
    const name=event.target.username.value
    const email= event.target.email.value
    const phonenumber= event.target.phonenumber.value
    let obj={
        name,email,phonenumber
    } 

   //POST User data
    event.preventDefault() 
    axios.post('https://crudcrud.com/api/747f690774fc4a94844f525fc7cc0824/AppointmentData',obj)
        .then((response) => {
            showNewUserOnScreen(response.data)
            console.log(response)
        })
        .catch((err) => {
            console.log(err)
        });
   
}

//DOM content loaded when refresh the page will not go back
window.addEventListener("DOMContentLoaded", () => {
        axios.get('https://crudcrud.com/api/747f690774fc4a94844f525fc7cc0824/AppointmentData')
            .then((response)=>{
                for (var i = 0; i < response.data.length; i++) {
                    showNewUserOnScreen(response.data[i])
                }
            })
            .catch((err)=> {
                console.log(err)
            })
        
        
    }) 

// User data convert to inner HTML

function showNewUserOnScreen(user){
    event.preventDefault()
    document.getElementById("email").value=""
    document.getElementById("username").value=""
    document.getElementById("phonenumber").value=""
    if(localStorage.getItem(user.email)!==null){
        removeUserFromScreen(user.email)
    }
    const parentNode =  document.getElementById("listOfUsers")
    const childHTML = `<li id=${user._id}>${user.name}-${user.email} 
        <button onclick=deleteUser('${user._id}')>DeleteUser </button>
        <button onclick=editUserDetails('${user.email}','${user.name}','${user.phonenumber}','${user._id}')> Edit User </button>
        </li> `
    parentNode.innerHTML= parentNode.innerHTML + childHTML
   
 }

// EDIT 

 function editUserDetails(emailId,name,phonenumber,userId){
        document.getElementById('email').value = emailId;
        document.getElementById('username').value = name;
        document.getElementById('phonenumber').value =phonenumber;
        deleteUser(userId)
}

//DELETE

function deleteUser(userId){
    axios.delete(`https://crudcrud.com/api/747f690774fc4a94844f525fc7cc0824/AppointmentData/${userId}`)
        .then((response)=>{
            removeUserFromScreen(userId)
        
        })
        .catch((err)=>{
            console.log(err)
        })
}

function removeUserFromScreen(userlId){
    const parentNode=document.getElementById("listOfUsers")
    const childNodeToBeDeleted=document.getElementById(userlId)
    if(childNodeToBeDeleted){
    parentNode.removeChild(childNodeToBeDeleted);
    }
}
