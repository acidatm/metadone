import Feed from "/js/classes/Feed.js"
import Post from "/js/classes/Post.js"
import User from "/js/classes/User.js"
import AlmightyAlgorithm from "/js/classes/AlmightyAlgorithm.js"

const MAIN = document.getElementById("main")
let AUDIO



window.addEventListener("DOMContentLoaded",function(){
	const MAIN = document.getElementById("main")
	

	document.getElementById("enable").addEventListener("click",(e) => {
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
			if (window.AudioContext) {
				window.audioContext = new window.AudioContext();
			}
			var fixAudioContext = function (e) {
				if (window.audioContext) {
					window.audioContext.resume()
					// Create empty buffer
					var buffer = window.audioContext.createBuffer(1, 1, 22050);
					var source = window.audioContext.createBufferSource();
					source.buffer = buffer;
					// Connect to output (speakers)
					source.connect(window.audioContext.destination);
					// Play sound
					if (source.start) {
						source.start(0);
					} else if (source.play) {
						source.play(0);
					} else if (source.noteOn) {
						source.noteOn(0);
					}
				}
				// Remove events
				document.removeEventListener('touchstart', fixAudioContext);
				document.removeEventListener('touchend', fixAudioContext);
			};
			// iOS 6-8
			document.addEventListener('touchstart', fixAudioContext);
			// iOS 9
			document.addEventListener('touchend', fixAudioContext);
		e.target.parentNode.removeChild(e.target)
		setTimeout(init, 100)
	})

	function init(){
		AUDIO = window.audioContext
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
