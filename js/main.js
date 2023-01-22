/*
  Todolist v1.0
*/

const form = document.querySelector(".input-box");

window.addEventListener("DOMContentLoaded", () => {
  getWaktu();
  form.addEventListener("submit", event => {
    event.preventDefault();
    addTodo();
    editTodo();
  });
});

const getWaktu = () => {
  const viewWaktu = document.getElementById("waktu")
  const time = new Date();
  const hri = time.getDay();
  const tgl = time.getDate();
  const bln = time.getMonth();
  const thn = time.getFullYear();
  const hari = ["Minggu","Senin","Selasa","Rabu","Kamis","Jum'at","Sabtu"];
  const bulan = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Jul","Agu","Sep","Okt","Nov","Des"];
  
  viewWaktu.textContent = `${hari[hri]}, ${tgl} ${bulan[bln]} ${thn}`;
}

const generateID = () => {
  return + new Date();
}

const addTodo = () => {
  const inputTodo = document.getElementById("input-todo");
  const genID = generateID();
  const newTodo = `<li id="${genID}"><span class="todo" maxlength="50">${inputTodo.value}</span><span class="cta"><i class="fa-solid fa-pen edit"></i><i class="fa-solid fa-trash del" onclick="deleteTodo(this)"></i></span></li>`;
  
  const listTodo = document.querySelector(".todo-list");
  listTodo.insertAdjacentHTML("beforeend", newTodo);
  
  inputTodo.value = ""
}

const deleteTodo = del => {
  confir(del.parentElement.parentElement);
}

const editTodo = () => {
  const editBtn = document.querySelectorAll(".edit");
  const todoText = document.querySelectorAll(".todo");
  
  for(let edit of editBtn){
    edit.addEventListener("click", () => {
      edit.parentElement.previousSibling.contentEditable = true;
      edit.parentElement.previousSibling.focus();
    });
  }
  
  for(let todtex of todoText){
    todtex.addEventListener("blur", () => {
      todtex.contentEditable = false;
    });
  }
}

const confir = async el => {
  const kondisi = await confirmation();
  
  if(kondisi){
    el.remove();
  }
}

const confirmation = async () => {
  return new Promise(resolve => {
    const modal = document.querySelector(".modal");
    const trueBtn = document.getElementById("true");
    const falseBtn = document.getElementById("false");
    
    modal.classList.add("show");
    trueBtn.addEventListener("click", () => {
      modal.classList.remove("show");
      resolve(true);
    });
    falseBtn.addEventListener("click", () => {
      modal.classList.remove("show");
      resolve(false)
    })
  });
}