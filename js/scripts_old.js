import Feed from "/js/classes/Feed.js"
import App from "/js/classes/App.js"
import Post from "/js/classes/Post.js"
import User from "/js/classes/User.js"
import AlmightyAlgorithm from "/js/classes/AlmightyAlgorithm.js"

const MAIN = document.getElementById("main")
const USER = new User()
let APP
let AUDIO
let FEED
const preload = document.getElementById("preload")
let INIT = false

let ul

preload.addEventListener("mousedown",init)
preload.addEventListener("click",init)
preload.addEventListener("touchstart",init)

setTimeout(function() {
	preload.classList.add("login")
}, 750);
		

function init(){
	if(!INIT){
		INIT = true
		let audio = document.getElementById("preloadAudio")
		audio.play()
		setTimeout(function(){
			preload.classList.add("hidden")
			setTimeout(function(){
				preload.parentNode.removeChild(preload)
			},1000)
			AUDIO = new AudioContext()
			const AA = new AlmightyAlgorithm(USER,null,AUDIO)

			ul = document.createElement("ul")
			ul.id = "feed"
			MAIN.appendChild(ul)

			FEED = new Feed(ul,AA,AUDIO,USER)
			// APP = new App(MAIN,FEED)

			resize()
			// FEED.generate()
		},200)
	}
}	
function resize(){
	FEED.height = FEED.node.getBoundingClientRect().height
}	
// window.addEventListener("DOMContentLoaded",init)