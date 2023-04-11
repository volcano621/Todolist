const input = document.querySelector('input');
const todobox = document.querySelector('.todobox');
const topbox = document.querySelector('.topbox');
let first = 0;

input.addEventListener("keypress", function(event){
    if(event.keyCode==13 && input.value!=""){
        first ++;
        add();
    }
})

let bottom = document.createElement('div');

function add(){


    //把输入的东西放到下面一行
    let value = input.value;
    let check = document.createElement('input');
    let del = document.createElement('div');
    del.classList.add('del');
    check.type = "checkbox";
    check.id = "checkbox";
    check.classList.add("checkbefore");
    let added = document.createElement("div");
    added.innerHTML = value;
    added.classList.add("inputbox");
    if(first != 1){
        todobox.insertBefore(added, bottom);
    }
    else{
        todobox.appendChild(added);
    }
    added.appendChild(check);
    added.appendChild(del);
    input.value = "";
    let all = document.createElement('div');
    all.classList.add('all');
    all.innerHTML = ">";
    todobox.appendChild(all);

    //叉号
    added.onmouseover = function(){
        del.style.display = "block";
    }
    added.onmouseout = function(){
        del.style.display = "none";
    }

    //点击打勾
    let cnt = 0;
    check.addEventListener("click", function(){
        cnt ++;
        if(cnt % 2){
            check.checked = true;
            added.style.textDecoration = "line-through";
            added.style.color = "rgba(0,0,0,0.3)";
        }
        else{
            check.checked = false;
            added.style.textDecoration = "none";
            added.style.color = "rgba(0,0,0,1)";
        }
    })

    //点击叉号删除
    del.addEventListener("click", function(){
        todobox.removeChild(added);
    })

    del.addEventListener("mouseenter",function(){
        del.classList.add("hover");
    }) 
    del.addEventListener("mouseleave",function(){
        del.classList.remove("hover");
    })

    //全选删除或重现
    let i = 0;
    let checklist = document.querySelectorAll('#checkbox');
    let inputlist = document.querySelectorAll('.inputbox');
    let len = checklist.length;
    all.addEventListener("click", function(){
        i ++;
        for(let j = 0; j < len; j ++){
            if(i%2){
                checklist[j].checked = true;
                inputlist[j + 1].style.textDecoration = "line-through";
                inputlist[j + 1].style.color = "rgba(0,0,0,0.3)";
            }
            else{
                checklist[j].checked = false;
                checklist[j].classList.add("checkbefore");
                inputlist[j + 1].style.textDecoration = "none";
                inputlist[j + 1].style.color = "rgba(0,0,0,1)";
            }
        }
    })
    if(first != 1){
        let left = document.querySelector("#left");
        let undonelist = document.querySelectorAll("#checkbox");
        let undonelistlen = undonelist.length;
        let undonecnt = 0;
        for(let i = 0; i < undonelistlen; i ++){
            if(undonelist[i].checked == false){
                undonecnt ++;
            }
        }
        if(undonecnt == 1){
            left.innerHTML = "1 items left";
        }
        else{
            left.innerHTML = undonecnt + " items left";
        }
        
    }
    

    if(first == 1){
        let left = document.createElement('div');
        let bottom2 = document.createElement('div');
        let bottom3 = document.createElement('div');
        let right = document.createElement('div');
        let middle = document.createElement('div');
        let middle1 = document.createElement('div');
        let middle2 = document.createElement('div');
        let middle3 = document.createElement('div');
        
        middle1.innerHTML = "All";
        middle2.innerHTML = "Active";
        middle3.innerHTML = "Completed";
        left.textContent = "1 item left";

        bottom.classList.add("bottom");
        left.id = "left";
        bottom2.classList.add("bottom2");
        bottom3.classList.add("bottom3");
        middle.classList.add("middle");
        right.classList.add("right");
        middle1.classList.add("middle1");
        middle2.classList.add("middle2");
        middle3.classList.add("middle3");

        middle1.style.border = "rgba(200, 12,12, 0.3) solid";

        todobox.appendChild(bottom);
        todobox.appendChild(bottom2);
        todobox.appendChild(bottom3);
        bottom.appendChild(left);
        bottom.appendChild(middle);
        middle.appendChild(middle1);
        middle.appendChild(middle2);
        middle.appendChild(middle3);
        bottom.appendChild(right);

    }
    
}

window.addEventListener("click", function(){
    let donelist = document.querySelectorAll('#checkbox');
    let right = document.querySelector(".right");
    let donelistlen = donelist.length;
    let left = document.querySelector("#left");
    let fg = 0;
    let cnt = 0;
    for(let i = 0; i < donelistlen; i ++){
        if(donelist[i].checked == true){
            right.innerHTML = "Clear completed";
            fg = 1;
            cnt ++;
        }
    }
    if(!fg){
        right.innerHTML = "";
    }
    if(cnt == donelistlen && cnt != donelistlen){
        left.innerHTML = "1 item left";
    }
    else {

        left.innerHTML = (donelistlen - cnt) + " items left";
    }

})



