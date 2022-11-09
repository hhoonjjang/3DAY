
const signInBtn = document.getElementById("sign-in");
const signOutBtn = document.getElementById("sign-out");
const signUpBtn =document.getElementById("sign-up");
const chattingBtn =document.getElementById("chatting");
const itemUpload = document.getElementById("item-upload");
const userInfo = document.getElementById("user-info");
const reverseBtn = document.getElementById("reverse");
const reverseImg = [...document.getElementsByClassName("reverse")];
const reverseBgc = [...document.getElementsByClassName("bgc")];
const loginDisplay =document.getElementById("loginDisplay");
console.log(reverseImg);
signUpBtn.onclick= async function(){
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
signInBtn.onclick = async function (){
    try{
        const result = await axios.post('/api/user/login',{
            id: document.getElementById("user-id").value,
        pw: document.getElementById("user-pw").value,
        })
        console.log(result);
        console.log(result.data);
        signOutBtn.classList.add("on");
        chattingBtn.classList.add("on");
        itemUpload.classList.add("on");
        userInfo.classList.add("on");
        const login = document.createElement("div");
        login.innerText = `${result.data.name}님 어서오세요!`;
        document.getElementById("loginDisplay").append(login)
        loginDisplay.style.display="block";

        signInBtn.classList.add("off");
        signUpBtn.classList.add("off");
        
    }catch(error){
        console.error(err)
        alert("아이디나 비밀번호가 올바르지않습니다");
    }
}

const login = async function(){
if(document.cookie){
    try{
        const result = await axios.post('/api/user/cookie',{
            cookie:document.cookie,
        })
        signOutBtn.classList.add("on");
        chattingBtn.classList.add("on");
        itemUpload.classList.add("on");
        userInfo.classList.add("on");
        console.log(result.data.name);
        const login = document.createElement("div");
        login.innerText = `${result.data.name}님 어서오세요!`;
        loginDisplay.style.display="block";
        document.getElementById("loginDisplay").append(login)
        signInBtn.classList.add("off");
        signUpBtn.classList.add("off");
    }catch(error){
        console.error(err)
    }
}}
login();


signOutBtn.onclick =async function(){
    try{
        const result = await axios.post("/api/user/logout")

        loginDisplay.removeChild(loginDisplay.firstChild);
        signOutBtn.classList.remove("on");
        chattingBtn.classList.remove("on");
        itemUpload.classList.remove("on");
        userInfo.classList.remove("on");
        loginDisplay.style.display="none";

        signInBtn.classList.remove("off");
        signUpBtn.classList.remove("off");
        
}

    catch(err){
        console.error(err);
    }
}

reverseBtn.ondblclick = function(){
    document.body.classList.toggle("start");
    for(let i =0;i<reverseImg.length;i++){
        // console.log("reverseImg[i]")
        reverseImg[i].classList.toggle("start");
    }
    for(let i =0;i<reverseImg.length;i++){
        // console.log("reverseImg[i]")
        reverseBgc[i].classList.toggle("start");
    }

    // document.getElementsByClassName("reverse").classList.add("start");
}