import Feed from "/js/classes/Feed.js"
import Post from "/js/classes/Post.js"
import User from "/js/classes/User.js"
import AlmightyAlgorithm from "/js/classes/AlmightyAlgorithm.js"

const MAIN = document.getElementById("main")
let AUDIO
let FEED
const enable = document.getElementById("enable")

enable.addEventListener("mousedown",init)
		

function init(){
	console.log("init")
	enable.parentNode.removeChild(enable)
	AUDIO = new AudioContext()
	console.log(AUDIO)
	console.log(AUDIO.state)
	const USER = new User()
	const AA = new AlmightyAlgorithm(USER,null,AUDIO)

	let ul = document.createElement("ul")
	ul.id = "feed"
	MAIN.appendChild(ul)

	FEED = new Feed(ul,AA,AUDIO)

	resize()
	FEED.generate()
	
}	
function resize(){
	FEED.height = FEED.node.getBoundingClientRect().height
}	