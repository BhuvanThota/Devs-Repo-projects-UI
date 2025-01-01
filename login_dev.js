const devsLoginAPI = "http://127.0.0.1:8000/api/users/token/"

const login_form = document.getElementById('login_form');

login_form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    let formData = {
        'username' : login_form.username.value,
        'password' : login_form.password.value,
    }


    console.log('Form Data', formData);

    fetch(devsLoginAPI, {
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(res => res.json())
    .then(data => {
        // console.log(data)
        if (data.access){
            localStorage.setItem('access_token', data.access);
            window.location = 'http://127.0.0.1:5500/index.html';
        } else{
            alert('Username or Password is incorrect.');
        }
    });
})

