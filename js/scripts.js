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
const enable = document.getElementById("enable")

enable.addEventListener("mousedown",init)
		

function init(){
	enable.parentNode.removeChild(enable)
	AUDIO = new AudioContext()
	const USER = new User()
	const AA = new AlmightyAlgorithm(USER,null,AUDIO)

	let ul = document.createElement("ul")
	ul.id = "feed"
	MAIN.appendChild(ul)

	FEED = new Feed(ul,AA,AUDIO,USER)
	// APP = new App(MAIN,FEED)

	resize()
	// FEED.generate()
	
}	
function resize(){
	FEED.height = FEED.node.getBoundingClientRect().height
}	

// window.addEventListener("DOMContentLoaded",init)