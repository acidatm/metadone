import music_svg from "/res/images/js_svg/music.js"

export default class Post{
	constructor(root,id,content){
		this.node = root,
		this.id = id
		this.content = content
		this.sound = null
		this.render()
	}
	render(){
		this.node.classList.add("post")
		this.node.style.background = this.content.background

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
			desc.innerText = this.content.captions[0]
		}
		else{
			let d = ""
			for(let i = 0; i < this.content.captions.length; i++){
				let c = this.content.captions[i]
				d = d + c + (i < this.content.captions.length - 1 ? ". " : "")
			}
			desc.innerText = d
		}
		this.node.appendChild(username)
		this.node.appendChild(desc)
		this.node.appendChild(id)

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
}