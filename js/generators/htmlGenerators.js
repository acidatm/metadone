import WORDS from "/data/dict/en.js"

export class visualPostPlaceholder{
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
		var letters = '0123456789ABCDEF';
		var color = '#';
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color
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
		var letters = '0123456789ABCDEF';
		var color = '#';
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color
	}
}
export class textPost{
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
		let content = WORDS[Math.floor(seed * WORDS.length)]
		let def = content.split("/")
		let word = def[0]
		return word
	}
}