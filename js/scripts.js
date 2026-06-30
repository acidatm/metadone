import Feed from "/js/classes/Feed.js"
import App from "/js/classes/App.js"
import Post from "/js/classes/Post.js"
import User from "/js/classes/User.js"
import AlmightyAlgorithm from "/js/classes/AlmightyAlgorithm.js"
import {RNG} from "/js/tools/tools.js"

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
	let loc = window.location.href
	let params = loc.split("/?")[1]
	let sharedPost = false
	if(params){
		let parts = params.split("-")
		if(parts.length == 3){
			let creatorData = RNG.stringToArray(parts[0])
			let producer1Data = RNG.stringToArray(parts[1])
			let producer2Data = RNG.stringToArray(parts[2])
			let creator = creatorData[0]
			let creatorIndex = RNG.base36ToInt(creator)
			let creatorObj = USER.getCreatorFromIndex(creatorIndex)
			let producer1 = producer1Data[0]
			let producer1Index = RNG.base36ToInt(producer1)
			let producer1Obj = USER.getCreatorFromIndex(producer1Index)
			let producer2 = producer2Data[0]
			let producer2Index = RNG.base36ToInt(producer2)
			let producer2Obj = USER.getCreatorFromIndex(producer2Index)
			let parameters = {}
			creatorData.splice(0,1)
			producer1Data.splice(0,1)
			producer2Data.splice(0,1)
			parameters[creatorObj.uid] = creatorData
			parameters[producer1Obj.uid] = producer1Data
			parameters[producer2Obj.uid] = producer2Data
			sharedPost = {
				creator:creatorObj,
				producer1:producer1Obj,
				producer2:producer2Obj,
				parameters: {
					creator: creator,
					producer1: producer1,
					producer2: producer2,
					parameters: parameters
				}
			}
		}
	}
	console.log(sharedPost)
	const AA = new AlmightyAlgorithm(USER,null,AUDIO,sharedPost)
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






