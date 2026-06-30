import Feed from "/js/classes/Feed.js"
import App from "/js/classes/App.js"
import Post from "/js/classes/Post.js"
import User from "/js/classes/User.js"
import AlmightyAlgorithm from "/js/classes/AlmightyAlgorithm.js"

const MAIN = document.getElementById("main")
const USER = new User()
let APP
let AUDIO = new AudioContext()
let FEED
const splash = document.getElementById("splashscreen")
let INIT = false

let ul

splash.addEventListener("mousedown",init)
splash.addEventListener("click",init)
splash.addEventListener("touchstart",init)

setTimeout(function() {
	splash.classList.add("login")
}, 750);
		
function init(){
	if(!INIT){
		INIT = true
		let audio = document.getElementById("preloadAudio")
		audio.play()
		setTimeout(function(){
			AUDIO.resume()
			splash.classList.add("hidden")
			setTimeout(function(){
				splash.parentNode.removeChild(splash)
			},1000)
		},200)
	}
}
function preload(){
	const AA = new AlmightyAlgorithm(USER,null,AUDIO)
	ul = document.createElement("ul")
	ul.id = "feed"
	MAIN.appendChild(ul)
	FEED = new Feed(ul,AA,AUDIO,USER)
	resize()
}	
function resize(){
	FEED.height = FEED.node.getBoundingClientRect().height
}	

window.addEventListener("DOMContentLoaded",preload)
// preload()






