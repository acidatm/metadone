import Post from "./Post.js"
import Ad from "./Ad.js"

export default class Feed{
	constructor(node,algo,audio_ctx,user){
		this.ALGORITHM = algo
		this.AUDIO_CTX = audio_ctx
		this.USER = user
		this.AD = document.createElement("li")
		let ad = new Ad(this.AD,-1,this.ALGORITHM.requestAd(),user)

		this._lastScrollPosition = 0
		this.node = node,
		this.height = 0,
		this.posts = [],
		this. activePost = {
			index: -1,
			ref: null
		},
		this.buffer ={
			size: 5,
			generate: 10
		}

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
		// this.events.scrollend()
		this.generate()
		this.activatePost(0)
	}
	events = {
		scrollend: function(e){
			if(Math.abs(this.node.scrollTop - this._lastScrollPosition) > 10){
				this._lastScrollPosition = this.node.scrollTop
				let active = Math.floor((this.node.scrollTop + 0.5 * this.height) / this.height)
				if(this.activePost.index != active){
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

				if(this.activePost.index + this.buffer.size > this.posts.length){
					this.generate()
				}
			}
		}.bind(this)
	}
	activatePost(index){
		this.activePost.index = index
		this.activePost.ref = this.posts[this.activePost.index]
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
		if(this.AD.parentNode){
			this.AD.parentNode.removeChild(this.AD)
		}
		this.node.appendChild(this.AD)
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
	}
}