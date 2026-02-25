import Post from "./post.js"

export default class Feed{
	constructor(node,algo,audio_ctx){
		this.ALGORITHM = algo
		this.AUDIO_CTX = audio_ctx

		this._lastScrollPosition = 0
		this.node = node,
		this.height = 0,
		this.posts = [],
		this. activePost = {
			index: -1,
			ref: null
		},
		this.buffer ={
			size: 10,
			generate: 20
		}

		let f = function(){
			if(t){
				clearTimeout(t)
			}
			this.events.scrollend.bind(this)()
		}
		let t = null

		this.node.addEventListener("scroll",(e) => {
			if(t){
				clearTimeout(t)
			}
			t = setTimeout(f.bind(this), 50)
		})
	}
	events = {
		scrollend: function(e){
			if(Math.abs(this.node.scrollTop - this._lastScrollPosition) > 10){
				this._lastScrollPosition = this.node.scrollTop
				console.log("scrollend")
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

				this.activePost.index = active
				this.activePost.ref = this.posts[this.activePost.index]
				this.activePost.ref.node.classList.add("active")
				if(this.activePost.ref.sound){
					for(let s of this.activePost.ref.sound){
						s.generator.connect(this.AUDIO_CTX.destination)
					}	
					console.log(this.AUDIO_CTX.state)
					if(this.AUDIO_CTX.state == "suspended"){
						this.AUDIO_CTX.resume()
					}
					console.log(this.AUDIO_CTX.state)
					console.log(this.AUDIO_CTX)
				}

				if(this.activePost.index + this.buffer.size > this.posts.length){
					this.generate()
				}
			}
		}
	}
	generate(){
		let n = this.buffer.generate
		for(let i = 0; i < n; i++){
			let content = this.ALGORITHM.requestContent(this.posts)
			this.generatePost(content)
		}
	}
	generatePost(content){
		let li = document.createElement("li")
		let id = this.posts.length
		let post = new Post(li,id,content)
		this.posts.push(post)
		this.node.appendChild(li)
	}
}