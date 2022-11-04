document.getElementById("sign-up").onclick= async function(){
    try{
        console.log(document.getElementById("user-id").value)

    const user = await axios.post("/api/user/regist",{
        id: document.getElementById("user-id").value,
        pw: document.getElementById("user-pw").value,
        name:document.getElementById("user-name").value,
    })  
}
    catch(error){
        console.error(error.response.data.message)
    } 
}
document.getElementById("sign-in").onclick = async function (){
    try{
        const result = await axios.post('/api/user/login',{
            id: document.getElementById("user-id").value,
        pw: document.getElementById("user-pw").value,
        })
        console.log(result);
        console.log(result.data);
        
        const login = document.createElement("div");
        login.innerText = `${result.data.name}님 어서오세요!`;
        document.getElementById("loginDisplay").append(login)
        
    }catch(error){
        console.error(err)
    }
}

const login = async function(){
if(document.cookie){
    try{
        const result = await axios.post('/api/user/cookie',{
            cookie:document.cookie,
        })
        
        console.log(result.data.name);
        const login = document.createElement("div");
        login.innerText = `${result.data.name}님 어서오세요!`;
        document.getElementById("loginDisplay").append(login)
    }catch(error){
        console.error(err)
    }
}}
login();
const loginDisplay =document.getElementById("loginDisplay");

document.getElementById("sign-out").onclick =async function(){
    try{
        const result = await axios.post("/api/user/logout")
        loginDisplay.removeChild(loginDisplay.firstChild);
    }catch(err){
        console.error(err);
    }
}