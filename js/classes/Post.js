import music_svg from "/res/images/js_svg/music.js"
import share_svg from "/res/images/js_svg/share.js"
import save_svg from "/res/images/js_svg/save.js"
import saved_svg from "/res/images/js_svg/saved.js"
import like_svg from "/res/images/js_svg/like.js"
import liked_svg from "/res/images/js_svg/liked.js"

export default class Post{
	constructor(root,id,content,user,isAd){
		this.node = root
		this.id = id
		this.content = content
		this.sound = null
		this.sidebar = null
		this.user = user
		this.isAd = isAd
		this.statistics = {
			views: 0
		}
		this.render()
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
			  title: "Infinite Doom Scrolling",
			  text: "I found this beautiful piece of content on infinitedoomscroll",
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
	activate(){
		this.statistics.startTimestamp = performance.now()
		this.statistics.view += 1
	}
	finish(){
		this.statistics.endTimestamp = performance.now()
		this.statistics.viewTime = this.statistics.endTimestamp - this.statistics.startTimestamp
		this.user.reviewPostViewTime(this)
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
		let backgrounds = []
		let texts = []
		for(let i = 0; i < this.content.creators.length; i++){
			let c = this.content.creators[i]
			switch(c.type){
				case "background":
					backgrounds.push(this.content.html[i])
					break
				case "text":
					texts.push(this.content.html[i])
					break
			}
		}
		for(let b of backgrounds){
			if(backgrounds.length > 1){
				b.style.opacity = "0.5"
			}
			this.node.appendChild(b)
		}
		for(let t of texts){
			this.node.appendChild(t)
		}
	}
	renderCreators(){
		if(this.content.creators.length > 1){
			this.node.classList.add("collaborative")
		}


		
		let username = document.createElement("h2")
		username.classList.add("post_username")
		let desc = document.createElement("p")
		desc.classList.add("post_description")
		let id = document.createElement("time")
		id.classList.add("post_uid")
		id.innerText = ("" + this.id).padStart(8,"0")
		let gradient = document.createElement("div")
		gradient.classList.add("post_gradient")

		if(this.content.creators.length == 1){
			username.innerText = this.content.creators[0].username
		}
		else{
			let u = ""
			for(let i = 0; i < this.content.creators.length; i++){
				let c = this.content.creators[i]
				u = u + c.username + (i < this.content.creators.length - 1 ? " <span style='font-weight:400'>and</span> " : "")
			}
			username.innerHTML = u
		}
		if(this.content.creators.length == 1){
			let dp = document.createElement("img")
			dp.classList.add("post_profilePicture")
			dp.src = "./res/images/profile_pictures/" + this.content.creators[0].dp_url
			this.node.appendChild(dp)
		}
		else{
			for(let i = 0; i < this.content.creators.length; i++){
				let c = this.content.creators[i]
				let dp = document.createElement("img")
				dp.classList.add("post_profilePicture")
				dp.classList.add("post_profilePicture-collaborator_" + (i+1))
				dp.src = "./res/images/profile_pictures/" + c.dp_url
				this.node.appendChild(dp)
			}
		}
		if(this.content.creators.length == 1){
			desc.innerText = this.content.captions[0].toLowerCase()
		}
		else{
			let d = ""
			for(let i = 0; i < this.content.captions.length; i++){
				let c = this.content.captions[i]
				d = d + c + (i < this.content.captions.length - 1 ? "" : "")
			}
			desc.innerText = d.toLowerCase()
		}
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
				text = this.content.producers[0].name + " · " + this.content.sound[0].tracktitle
			}
			else{
				let prods = ""
				for(let i = 0; i < this.content.producers.length; i++){
					let prod = this.content.producers[i]
					prods = prods + (prod.name + (i < (this.content.producers.length-1) ? " feat. " : ""))

				}
				let tracks = ""
				for(let i = 0; i < this.content.sound.length; i++){
					let track = this.content.sound[i]
					tracks = tracks + (track.tracktitle + (i < (this.content.producers.length-1) ? " / " : ""))

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
		if(!this.isAd){
			this.renderSidebar()
			this.renderContent()
			this.renderProducers()
			
		}
		this.renderCreators()
		this.node.classList.add("post")
	}
}