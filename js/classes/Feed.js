import Post from "./Post.js"
import env from "/data/env.js"

export default class Feed{
	constructor(node,algo,audio_ctx,user){
		this.ALGORITHM = algo
		this.AUDIO_CTX = audio_ctx
		this.USER = user
		// this.AD = document.createElement("li")
		// let ad = new Ad(this.AD,-1,this.ALGORITHM.requestAd(),user)

		this._lastScrollPosition = 0
		this.node = node,
		this.height = 0,
		this.posts = [],
		this.activePost = {
			index: -1,
			ref: null
		}
		this.userInteractions = {
			pointerDown: false,
			lastPointerTimestamp: performance.now()
		}
		this.SETTINGS = env.Feed
		this.buffer = this.SETTINGS.buffer


		this.init()
	}
	init(){
		let t = null
		let f = function(){
			if(t){clearTimeout(t)}
			this.events.scrollend.bind(this)()
		}
		this.node.addEventListener("scroll",(e) => {
			if(t){clearTimeout(t)}
			t = setTimeout(f.bind(this), 50)
		})
		this.node.addEventListener("mousedown",this.events.touchStart.bind(this))
		this.node.addEventListener("touchstart",this.events.touchStart.bind(this))
		this.node.addEventListener("mouseup",this.events.touchEnd.bind(this))
		this.node.addEventListener("touchend",this.events.touchEnd.bind(this))
		this.generate()
		this.activatePost(0)
	}
	events = {
		touchStart: function(e){
			this.userInteractions.pointerDown = true
			let t = performance.now()
			if(t - this.userInteractions.lastPointerTimestamp < this.SETTINGS.doubleClickTimeWindow){
				this.events.doubleClick.bind(this)()
			}
			this.userInteractions.lastPointerTimestamp = t
			setTimeout(this.events.checkForHold.bind(this), this.SETTINGS.holdTimeWindow)
		},
		checkForHold: function(){
			if(this.userInteractions.pointerDown){
				this.userInteractions.pointerHold = true
				this.node.classList.add("user--hold")
			}
		},
		touchEnd: function(e){
			this.userInteractions.pointerHold = false
			this.userInteractions.pointerDown = false
			this.node.classList.remove("user--hold")
		},
		doubleClick: function(){
			this.userInteractions.lastPointerTimestamp = 0
			this.likeCurrentPost()
		},
		scrollend: function(e){
			document.body.classList.remove("unscrolled")
			if(Math.abs(this.node.scrollTop - this._lastScrollPosition) > 10){
				this._lastScrollPosition = this.node.scrollTop
				let active = Math.floor((this.node.scrollTop + 0.5 * this.height) / this.height)
				if(this.activePost.index != active){
					this.posts[this.activePost.index].finish()
					if(this.activePost.ref){
						this.activePost.ref.node.classList.remove("active")
						if(this.activePost.ref.sound){
							for(let s of this.activePost.ref.sound){
								s.generator.disconnect()
							}
						}
					}
				}
				this.activatePost(active)
				this.preloadPost(active+1)
				if(this.activePost.index + this.buffer.size > this.posts.length){
					this.generate()
				}
				// while(this.posts.length > this.SETTINGS.deletePostsPast){
				// 	this.disableOldestPost()
				// 	// console.log("deleted oldest post")
				// }
			}
		}.bind(this)
	}
	likeCurrentPost(){
		console.log(this.activePost)
		this.activePost.ref.likeFromDoubleTap()
	}
	disableOldestPost(){
		// this._disablePost(0)
	}
	_disablePost(n){
		this.posts[n].node.innerHTML = ""
		this.posts.splice(n, 1)
	}
	preloadPost(index){
		if(this.posts[index]){
			this.posts[index].start()
		}
	}
	activatePost(index){
		this.activePost.index = index
		this.activePost.ref = this.posts[this.activePost.index]
		this.posts[this.activePost.index].activate()
		this.activePost.ref.node.classList.add("active")
		if(this.activePost.ref.sound){
			for(let s of this.activePost.ref.sound){
				s.generator.connect(this.AUDIO_CTX.destination)
			}	
			if(this.AUDIO_CTX.state == "suspended"){
				this.AUDIO_CTX.resume()
			}
		}
	}
	generate(){
		let n = this.buffer.generate
		// this.insertAd()
		for(let i = 0; i < n; i++){
			let content = this.ALGORITHM.requestContent(this.posts)
			this.generatePost(content)
		}
	}
	generatePost(content){
		let li = document.createElement("li")
		let id = this.posts.length
		let post = new Post(li,id,content,this.USER)
		this.posts.push(post)
		this.node.appendChild(li)
		post.initWebGL()
	}
}