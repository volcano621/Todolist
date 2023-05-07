const input = document.querySelector("input");
const todobox = document.querySelector(".todobox");
const topbox = document.querySelector(".topbox");
let first = 0;
let allinput = new Array();
let done = new Array();
let undone = new Array();
let tmpdone = new Array();
let tmpundone = new Array();
let mod = 1;

let jsonn = localStorage.getItem("html");
let tmpdiv = document.createElement("div");
tmpdiv.innerHTML = JSON.parse(jsonn);

if (tmpdiv.children.length > 1) {
  if (tmpdiv.innerHTML !== "") {
    while (tmpdiv.firstChild) {
      if (tmpdiv.firstChild.classList.contains("inputbox")) {
        let check = tmpdiv.firstChild.firstChild;
        let content = tmpdiv.firstChild.children[1];
        let del = tmpdiv.firstChild.lastChild;
        del_popup(tmpdiv.firstChild, del);
        Delete(tmpdiv.firstChild, del);
        Edit(content);
        allinput.push(tmpdiv.firstChild);
        if (content.classList.contains("input_checked")) {
          done.push(tmpdiv.firstChild);
          check.checked = true;
        }
        Check(content, check, tmpdiv.firstChild);
      }

      todobox.appendChild(tmpdiv.firstChild);
      first++;
    }
    let all = document.querySelector(".all");
    changeAll(all);
    mode();
    if (done.length > 0) {
      right_popup();
    }
  }
}

input.addEventListener("keypress", function (event) {
  if (event.keyCode === 13 && input.value !== "") {
    first++;
    add();
    update();
    store();
  }
});

function add() {
  Add();

  if (first === 1) {
    addtickall();
    addBottom();
    mode();
  }

  let all = document.querySelector(".all");
  changeAll(all);
}

function Add() {
  let value = input.value;
  let added = document.createElement("div");
  let content = document.createElement("div");
  content.innerText = value;
  added.classList.add("inputbox");
  content.classList.add("content");
  let bottom = document.querySelector(".bottom");
  if (first === 1) {
    todobox.append(added);
  } else {
    todobox.insertBefore(added, bottom);
  }
  input.value = "";

  allinput.push(added);

  let check = document.createElement("input");
  let del = document.createElement("div");
  del.classList.add("del");
  check.type = "checkbox";
  check.id = "checkbox";
  added.appendChild(check);
  added.appendChild(content);
  added.appendChild(del);
  Edit(content);
  Check(content, check, added);
  del_popup(added, del);
  Delete(added, del);
}

function Edit(content) {
  content.addEventListener("dblclick", function () {
    content.classList.add("input_focus");
    content.contentEditable = true;
    content.focus();
    console.log("YES");
  });
  content.addEventListener("blur", function () {
    content.classList.remove("input_focus");
    content.contentEditable = false;
  });
  content.addEventListener("keydown", function () {
    if (event.keyCode === 13) {
      content.classList.remove("input_focus");
      content.contentEditable = false;
    }
  });
}

function Delete(added, del) {
  del.addEventListener("click", function () {
    if (added.children[0].checked === true) {
      done = done.filter(function (item) {
        return item != added;
      });
    }
    todobox.removeChild(added);
    allinput = allinput.filter(function (item) {
      return item != added;
    });

    update();
    if (allinput.length === 0) {
      del_bottom();
    }
    store();
  });

  del.addEventListener("mouseenter", function () {
    del.classList.add("hover");
  });
  del.addEventListener("mouseleave", function () {
    del.classList.remove("hover");
  });
}

function del_popup(added, del) {
  added.onmouseover = function () {
    del.style.display = "block";
  };
  added.onmouseout = function () {
    del.style.display = "none";
  };
}

function Check(content, check, added) {
  let cnt = 0;
  check.addEventListener("click", function () {
    cnt++;
    if (cnt % 2) {
      check.checked = true;
      content.classList.add("input_checked");
      done.push(added);
      if (mod === 2) {
        todobox.removeChild(added);
      }
    } else {
      check.checked = false;
      content.classList.remove("input_checked");
      done = done.filter(function (item) {
        return item != added;
      });
      if (mod === 3) {
        todobox.removeChild(added);
      }
    }

    if (done.length > 0) {
      right_popup();
    } else {
      right_hide();
    }
    update();
    let all = document.querySelector(".all");
    if (done.length === allinput.length) {
      all.classList.add("all_clicked");
    } else {
      all.classList.remove("all_clicked");
    }
    store();
  });
}

function right_popup() {
  let right = document.querySelector(".right");
  right.innerText = "Clear completed";
  right.addEventListener("click", function () {
    for (let i = 0; i < done.length; i++) {
      todobox.removeChild(done[i]);
      allinput = allinput.filter(function (item) {
        return item != done[i];
      });
    }
    done.length = 0;
    if (allinput.length === 0) {
      del_bottom();
    }
    store();
  });
}

function del_bottom() {
  let bottom = document.querySelector(".bottom");
  let bottom2 = document.querySelector(".bottom2");
  let bottom3 = document.querySelector(".bottom3");
  todobox.removeChild(bottom);
  todobox.removeChild(bottom2);
  todobox.removeChild(bottom3);
  first = 0;
}

function right_hide() {
  let right = document.querySelector(".right");
  right.innerText = "";
}

function addtickall() {
  let all = document.createElement("div");
  all.classList.add("all");
  all.innerText = ">";
  todobox.appendChild(all);
}

function changeAll(all) {
  let i = 0;
  let len = allinput.length;
  all.addEventListener("click", function () {
    i++;
    for (let j = 0; j < len; j++) {
      if (i % 2) {
        all.classList.add("all_clicked");
        allinput[j].children[0].checked = true;
        allinput[j].classList.add("input_checked");
        if (done.includes(allinput[j]) === false) {
          done.push(allinput[j]);
        }
        right_popup();
      } else {
        all.classList.remove("all_clicked");
        allinput[j].children[0].checked = false;
        allinput[j].classList.remove("input_checked");
        done.length = 0;
        right_hide();
      }
    }
    update();
  });
}

function addBottom() {
  let bottom = `
        <div id="left">1 item left</div>
        <div class="middle">
            <div class="middle1 focused">All</div>
            <div class="middle2">Active</div>
            <div class="middle3">Completed</div>
        </div>
        <div class="right"></div>
    <div class="bottom2"></div>
    <div class="bottom3"></div>
  `;
  let div = document.createElement("div");
  div.classList.add("bottom");
  div.innerHTML = bottom;
  todobox.appendChild(div);
}

function mode() {
  let middle1 = document.querySelector(".middle1");
  let middle2 = document.querySelector(".middle2");
  let middle3 = document.querySelector(".middle3");
  middle3.addEventListener("click", function () {
    undone = allinput.filter(function (item) {
      return done.includes(item) === false;
    });
    changeMode(undone, done);
    changeborder(middle1, middle2, middle3);
    mod = 3;
  });
  middle2.addEventListener("click", function () {
    changeMode(done, undone);
    changeborder(middle1, middle3, middle2);
    mod = 2;
  });
  middle1.addEventListener("click", function () {
    let empty = new Array();
    changeMode(empty, allinput);
    changeborder(middle2, middle3, middle1);
    mod = 1;
  });
}

function changeMode(clearob, need) {
  for (let i = 0; i < clearob.length; i++) {
    todobox.removeChild(clearob[i]);
  }
  let bottom = document.querySelector(".bottom");
  for (let i = 0; i < need.length; i++) {
    todobox.insertBefore(need[i], bottom);
  }
}

function changeborder(a, b, c) {
  c.classList.add("focused");
  a.classList.remove("focused");
  b.classList.remove("focused");
}

function update() {
  let left = document.querySelector("#left");
  let len1 = allinput.length;
  let len2 = done.length;
  if (len1 - len2 === 1 || len1 - len2 === 0)
    left.innerText = len1 - len2 + " item left";
  else left.innerText = len1 - len2 + " items left";
}

function store() {
  let array = Array.from(todobox.children);
  let tmpparent = document.createElement("div");
  for (let i = 1; i < array.length; i++) {
    tmpparent.appendChild(array[i].cloneNode(true));
  }
  let json = JSON.stringify(tmpparent.innerHTML);
  localStorage.setItem("html", json);
}
