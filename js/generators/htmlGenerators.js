import EN from "/data/dict/en.js"
import DE from "/data/dict/de.js"
import RU from "/data/dict/ru.js"
import AR from "/data/dict/ar.js"

export class greyPost{
	constructor(data){
		this.seed = data.seed
		this.inputs = data.inputs
		this.html = this.init()
	}
	init(){
		let div = document.createElement("div")
		div.classList.add("post_content")
		div.style.background = this.content(this.seed)
		return div
	}
	content(seed){
		let shade = 20 + Math.floor(this.seed * 200)
		return "rgb(" + shade + "," + shade + "," + shade + ")" 
	}
}
export class primaryPost{
	constructor(data){
		this.seed = data.seed
		this.inputs = data.inputs
		this.html = this.init()
	}
	init(){
		let div = document.createElement("div")
		div.classList.add("post_content")
		div.style.background = this.content(this.seed)
		return div
	}
	content(seed){
		let colors = ["#ff0000","#00ff00","#0000ff","#ffff00","#ff00ff","#00ffff"]
		return colors[Math.floor(seed * colors.length)]
	}
}
export class colorPost{
	constructor(data){
		this.seed = data.seed
		this.inputs = data.inputs
		this.html = this.init()
	}
	init(){
		let div = document.createElement("div")
		div.classList.add("post_content")
		div.style.background = this.content(this.seed)
		return div
	}
	content(seed){
		return '#'+(seed*0xFFFFFF<<0).toString(16);
	}
}
export class visualPost{
	constructor(data){
		this.seed = data.seed
		this.inputs = data.inputs
		this.html = this.init()
	}
	init(){
		let div = document.createElement("canvas")
		div.classList.add("post_content")
		// div.style.background = this.content(this.seed)
		return div
	}
	content(seed){
	}
}
export class textPostEN{
	constructor(data){
		this.seed = data.seed
		this.list = data.list
		this.language = data.language
		this.html = this.init()
	}
	init(){
		let word = this.content(this.seed)
		let div = document.createElement("div")
		div.classList.add("post_content")
		let h1 = document.createElement("div")
		let size = 36 + (18 / word.length)
		h1.style = "font-size:"+size+"px;color:white;line-height:1em;font-family:sans-serif;font-weight:400;text-transform:uppercase;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width: 90%;word-break: break-all;text-align: center;"
		h1.innerText = word
		div.appendChild(h1)
		return div
	}
	content(seed){
		let content = EN[Math.floor(seed * EN.length)]
		let def = content.split("/")
		let word = def[0]
		return word
	}
}
export class textPostDE{
	constructor(data){
		this.seed = data.seed
		this.list = data.list
		this.language = data.language
		this.html = this.init()
	}
	init(){
		let word = this.content(this.seed)
		let div = document.createElement("div")
		div.classList.add("post_content")
		let h1 = document.createElement("div")
		let size = 24 + (24 / word.length)
		h1.style = "font-size:"+size+"px;color:white;line-height:1em;font-family:sans-serif;font-weight:400;text-transform:uppercase;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width: 90%;word-break: break-all;text-align: center;"
		h1.innerText = word
		div.appendChild(h1)
		return div
	}
	content(seed){
		let content = DE[Math.floor(seed * DE.length)]
		let def = content.split("/")
		let word = def[0]
		return word
	}
}
export class textPostAR{
	constructor(data){
		this.seed = data.seed
		this.list = data.list
		this.language = data.language
		this.html = this.init()
	}
	init(){
		let word = this.content(this.seed)
		let div = document.createElement("div")
		div.classList.add("post_content")
		let h1 = document.createElement("div")
		let size = 36 + (12 / word.length)
		h1.style = "font-size:"+size+"px;color:white;line-height:1em;font-family:sans-serif;font-weight:400;text-transform:uppercase;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width: 90%;word-break: break-all;text-align: center;"
		h1.innerText = word
		div.appendChild(h1)
		return div
	}
	content(seed){
		let content = AR[Math.floor(seed * AR.length)]
		let def = content.split("/")
		let word = def[0]
		return word
	}
}
export class textPostRU{
	constructor(data){
		this.seed = data.seed
		this.list = data.list
		this.language = data.language
		this.html = this.init()
	}
	init(){
		let word = this.content(this.seed)
		let div = document.createElement("div")
		div.classList.add("post_content")
		let h1 = document.createElement("div")
		let size = 30 + (18 / word.length)
		h1.style = "font-size:"+size+"px;color:white;line-height:1em;font-family:sans-serif;font-weight:400;text-transform:uppercase;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width: 90%;word-break: break-all;text-align: center;"
		h1.innerText = word
		div.appendChild(h1)
		return div
	}
	content(seed){
		let content = RU[Math.floor(seed * RU.length)]
		let def = content.split("/")
		let word = def[0]
		return word
	}
}