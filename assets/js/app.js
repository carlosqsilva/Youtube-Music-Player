const { remote } = require('electron')
const Dexie = require('dexie')
Dexie.debug = true

const modalBtn = document.querySelector("#modal-btn")
const closeModalBtn = document.querySelector(".modal-close")
const cancelBtn = document.querySelector("#cancel-btn")
const saveBtn = document.querySelector("#save-btn")

const closeBtn = document.getElementById("close")
const minBtn = document.getElementById("minimize")

const url = document.getElementById("url")
const name = document.getElementById("name")
const lista = document.getElementById("list")

const player = videojs('player')

let db = new Dexie('musicas')
db.version(2).stores( {musicas: '++id,nome,url' })

db.open()
	.then(refreshList())
	.catch(err => console.log('Failed to Open db: ' + (err.stack || err)))

function onSave() {

	db.musicas.add({
		nome: name.value,
		url: url.value
	})
	.then(refreshList())
	.then(toggleModal())
	.then(() => {
		nome.value = ""
		url.value = ""
	})
}

function refreshList() {
	return db.musicas.toArray().then(renderAll)
}

function renderAll(musicas) {
	let html = ""
	musicas.forEach(musica => {
		html += musicaHTML(musica)
	})
	lista.innerHTML = html
}

function musicaHTML(musica) {
	return `<tr>
    		<td>
    			<a class="button is-white" onclick="play(${musica.id})">
    				<span class="icon is-small">
      					<i class="icon-play"></i>
    				</span>
  				</a>
    		</td>
    		<td>
    			${musica.nome}
    		</td>
    		<td>
    			<a class="button is-white" onclick="remove(${musica.id}, this)">
    				<span class="icon is-small">
      					<i class="icon-trash-empty"></i>
    				</span>
  				</a>
    		</td>`
}

function toggleModal () {
	let modal = document.getElementById("myModal")
	modal.classList.toggle("is-active")
}

function play(num) {
	let id = Number(num)

	db.musicas.get(id).then(item => {
		player.src({"src": item.url, "type": "video/youtube"})
	})
}

function remove(num, elem) {
	let id = Number(num)
	db.musicas.delete(id)
	.then(refreshList())
}

function minimize_window(){
    let win = remote.getCurrentWindow();
    win.hide();  
}

function close_window(){
    let win = remote.getCurrentWindow();
    win.close();  
}

saveBtn.addEventListener("click", onSave)
modalBtn.addEventListener("click", toggleModal)
closeModalBtn.addEventListener("click", toggleModal)
cancelBtn.addEventListener("click", toggleModal)
closeBtn.addEventListener("click", close_window)
minBtn.addEventListener("click", minimize_window)
