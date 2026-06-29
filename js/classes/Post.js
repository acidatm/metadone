import music_svg from "/res/images/js_svg/music.js"
import share_svg from "/res/images/js_svg/share.js"
import save_svg from "/res/images/js_svg/save.js"
import saved_svg from "/res/images/js_svg/saved.js"
import like_svg from "/res/images/js_svg/like.js"
import liked_svg from "/res/images/js_svg/liked.js"

export default class Post{
	constructor(root,id,content,user,isAd){
		this.DEV = false

		this.node = root
		this.canvas = null
		this.gl = null
		this.id = id
		this.content = content
		this.sound = null
		this.sidebar = null
		this.user = user
		this.seed = Math.random()

		this.statistics = {
			container: null,
			views: 0,
			startTimestamp: 0,
			endTimestamp: 0,
			viewTime: 0
		}
		this.render()
	}
	likeFromDoubleTap(){
		this.events.like.bind(this)()
	}
	events = {
		like: function(){
			this.node.classList.add("liked")
			this.user.like(this)
		},
		unlike: function(){
			this.node.classList.remove("liked")
			this.user.unlike(this)
		},
		save: function(){
			this.node.classList.add("saved")
			this.user.save(this)
		},
		remove: function(){
			this.node.classList.remove("saved")
			this.user.remove(this)
		},
		share: async function(){
			const data = {
				seed: this.content.seed,
				creators: this.content.creators.map((c) => c.uid),
				producers: this.content.producers.map((p) => p.uid)
			}
			let dataString = "?seed=" + data.seed
			for(let i = 0; i < data.creators.length; i++){
				dataString = dataString + "&creator" + i + "=" + data.creators[i]
			}
			for(let i = 0; i < data.producers.length; i++){
				dataString = dataString + "&producer" + i + "=" + data.producers[i]
			}
			let url = window.location + dataString
			const shareData = {
			  title: "metad.one",
			  text: "I found this beautiful piece of content on metad.one",
			  url: url,
			}
			try {
			    await navigator.share(shareData);
			    console.log("shared successfull")
			  } catch (err) {
			  	console.log("share failed")
			  	console.log(err)
			  }
		}
	}
	preload(){
		return
	}
	renderAnimation(){
		if(this.running){
			this.renderWebGL()
			requestAnimationFrame(this.renderAnimation.bind(this))
		}
	}
	start(){
		this.running = true
		if(this.canvas){
			requestAnimationFrame(this.renderAnimation.bind(this))
		}
		
	}
	stop(){
		this.running = false
	}
	initWebGL(){
		if(this.canvas){
			this.gl = this.canvas.getContext("webgl")
			if(this.gl){
				let id = "fs_" + this.id
				let s = document.createElement("script")
				s.id = id
				s.type = "notjs"
				// float TRI(in float n){return abs(-1.0+n*2.0)};float SQR(in float n){if(n < 0.5){return 0.0;}else{return 1.0;}};float SQR(in float p, in float n){if(n < p){return 0.0;}else{return 1.0;}};
				s.innerHTML = `
					precision mediump float;
					uniform vec2 resolution;
					uniform float time;uniform float seed;
					uniform float random;
					float clamp(in float n){
						return mod(abs(sin(n * 3.141592653589793)),1.0);
					}
					float SIN(in float n){
						return sin(n * 3.141592653589793);
					}
					float TRI(in float n){
						return abs(-1.0+n*2.0);
					}
					float SQR(in float n){
						if(n < 0.5){
							return 0.0;
						}
						else{
							return 1.0;
						}
					}
					float SQR(in float p, in float n){
						if(n < p){
							return 0.0;
						}
						else{
							return 1.0;
						}
					}
					void main() {`
					+ this.content.shader + 
					"}"
				this.node.appendChild(s)
				
				this.programInfo = twgl.createProgramInfo(this.gl, ["vs", id]);
				const arrays = {
			    	position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
			  	}
			  	this.bufferInfo = twgl.createBufferInfoFromArrays(this.gl, arrays)
			  	this.gl.useProgram(this.programInfo.program);
				this.renderWebGL()
			}
		}
	}
	renderWebGL(){
		if(this.gl){
			twgl.resizeCanvasToDisplaySize(this.gl.canvas);
			this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
			const uniforms = {
			    time: performance.now() * 0.001,
			    seed: this.seed,
			    random: Math.random(),
			    resolution: [this.gl.canvas.width, this.gl.canvas.height],
			}
			twgl.setBuffersAndAttributes(this.gl, this.programInfo, this.bufferInfo);
			twgl.setUniforms(this.programInfo, uniforms);
			twgl.drawBufferInfo(this.gl, this.bufferInfo);
		}
	}
	activate(){
		if(this.statistics.views == 0){
			this.statistics.startTimestamp = performance.now()
		}
		this.statistics.views = this.statistics.views + 1
		this._updateStatistics()
		this.start()
		// this.preload()
	}
	finish(){
		if(this.statistics.views == 1){
			this.statistics.endTimestamp = performance.now()
			this.statistics.viewTime = this.statistics.endTimestamp - this.statistics.startTimestamp
			this.user.reviewPostViewTime(this)
		}
		this._updateStatistics()
		this.stop()
	}
	renderSidebar(){
		let sidebar = document.createElement("div")
		sidebar.classList.add("post_sidebar")
		let like = document.createElement("div")
		let liked = document.createElement("div")
		let likeText = document.createElement("div")
		like.classList.add("post_like")
		like.classList.add("post_sidebar-button")
		liked.classList.add("post_liked")
		liked.classList.add("post_sidebar-button")
		likeText.classList.add("post_sidebar-text")
		likeText.classList.add("post_like-text")
		like.innerHTML = like_svg
		liked.innerHTML = liked_svg
		likeText.innerText = "Like"
		let share = document.createElement("div")
		let shareText = document.createElement("div")
		share.classList.add("post_share")
		share.classList.add("post_sidebar-button")
		shareText.classList.add("post_sidebar-text")
		shareText.classList.add("post_share-text")
		share.innerHTML = share_svg
		shareText.innerText = "Share"
		let save = document.createElement("div")
		let saved = document.createElement("div")
		let saveText = document.createElement("div")
		save.classList.add("post_save")
		save.classList.add("post_sidebar-button")
		saved.classList.add("post_saved")
		saved.classList.add("post_sidebar-button")
		saveText.classList.add("post_sidebar-text")
		saveText.classList.add("post_save-text")
		save.innerHTML = save_svg
		saved.innerHTML = saved_svg
		saveText.innerText = "Save"

		save.addEventListener("click",this.events.save.bind(this))
		saved.addEventListener("click",this.events.remove.bind(this))
		like.addEventListener("click",this.events.like.bind(this))
		liked.addEventListener("click",this.events.unlike.bind(this))
		share.addEventListener("click",this.events.share.bind(this))

		sidebar.appendChild(like)
		sidebar.appendChild(liked)
		sidebar.appendChild(likeText)
		sidebar.appendChild(share)
		sidebar.appendChild(shareText)
		sidebar.appendChild(save)
		sidebar.appendChild(saved)
		sidebar.appendChild(saveText)
		this.node.appendChild(sidebar)
	}
	renderContent(){
		if(this.content.html[0] instanceof HTMLCanvasElement){
				this.canvas = this.content.html[0]
			}
		this.node.appendChild(this.content.html[0])
	}
	renderCreators(){
		let username = document.createElement("h2")
		username.classList.add("post_username")
		let desc = document.createElement("p")
		desc.classList.add("post_description")
		let id = document.createElement("time")
		id.classList.add("post_uid")
		id.innerText = ("" + this.id).padStart(8,"0")
		let gradient = document.createElement("div")
		gradient.classList.add("post_gradient")

		username.innerText = this.content.creator.username
		let dp = document.createElement("img")
		dp.classList.add("post_profilePicture")
		dp.src = "./res/images/profile_pictures/" + this.content.creator.dp_url
		this.node.appendChild(dp)
		desc.innerText = this.content.captions[0]
		this.node.appendChild(gradient)
		this.node.appendChild(username)
		this.node.appendChild(desc)
		this.node.appendChild(id)
	}
	renderProducers(){
		if(this.content.sound.length > 0){
			this.sound = this.content.sound
			let music = document.createElement("div")
			let producer = document.createElement("div")
			let inner = document.createElement("div")
			inner.classList.add("post_musicProducer-inner")
			music.classList.add("post_musicIcon")
			music.innerHTML = music_svg
			producer.classList.add("post_musicProducer")

			let text = ""
			if(this.content.sound.length == 1){
				text = this.content.producer1.name + " · " + this.content.sound[0].tracktitle
			}
			else{
				let prods = this.content.producer1.name + " feat. " + this.content.producer2.name

				let tracks = ""
				for(let i = 0; i < this.content.sound.length; i++){
					let track = this.content.sound[i]
					tracks = tracks + (track.tracktitle + (i < (this.content.sound.length-1) ? " / " : ""))

				}
				text = prods + " · " + tracks
			}

			inner.innerText = (text + "  ").repeat(Math.floor(800/text.length))

			this.node.appendChild(music)
			producer.appendChild(inner)
			this.node.appendChild(producer)
		}
	}
	render(){
		this.renderSidebar()
		this.renderContent()
		this.renderProducers()	
		this.renderCreators()	
		if(this.DEV){
			this._renderStatistics()
		}
		this.node.classList.add("post")
	}
	_renderStatistics(){
		this.statistics.container = document.createElement("div")
		this.statistics.container.classList.add("post_stats")
		this.node.appendChild(this.statistics.container)
	}
	_updateStatistics(){
		if(this.DEV){
			this.statistics.container.innerHTML = 
				"POST<br>views: " + this.statistics.views +
				"<br>start: " + this.statistics.startTimestamp +
				"<br>end: " + this.statistics.endTimestamp +
				"<br>viewtime: " + this.statistics.viewTime +
				"<br><br>USER<br>avgViewtime: " + this.user.statistics.averageViewTime
		}
	}
}