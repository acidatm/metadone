import Feed from "/js/classes/Feed.js"
import Post from "/js/classes/Post.js"
import User from "/js/classes/User.js"
import AlmightyAlgorithm from "/js/classes/AlmightyAlgorithm.js"

const MAIN = document.getElementById("main")
let AUDIO



window.addEventListener("DOMContentLoaded",function(){
	const MAIN = document.getElementById("main")
	

	document.getElementById("enable").addEventListener("click",(e) => {
		AUDIO = new AudioContext()
		e.target.parentNode.removeChild(e.target)
		init()
	})
	document.addEventListener('touchend', () => {
		AUDIO.resume()
	})

	function init(){
		
		const USER = new User()
		const AA = new AlmightyAlgorithm(USER,null,AUDIO)

		let ul = document.createElement("ul")
		ul.id = "feed"
		MAIN.appendChild(ul)

		const FEED = new Feed(ul,AA,AUDIO)

		resize()
		FEED.generate()
		function resize(){
			FEED.height = FEED.node.getBoundingClientRect().height
		}
	}	
	
})
