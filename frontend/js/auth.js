async function register(){

let r=
await fetch(

"http://localhost:5001/register",

{

method:"POST",

headers:{

"Content-Type":
"application/json"

},

body:
JSON.stringify({

name:
name.value,

email:
email.value,

password:
password.value,

department:
department.value

})

}

);

let d=
await r.json();

alert(
d.msg
);

location=
"login.html";

}



async function login(){

let r=
await fetch(

"http://localhost:5001/login",

{

method:"POST",

headers:{

"Content-Type":
"application/json"

},

body:
JSON.stringify({

email:
email.value,

password:
password.value

})

}

);

let d=
await r.json();

if(d.user){

localStorage.setItem(

"user",

JSON.stringify(
d.user
)

);

location=
"dashboard.html";

}

}