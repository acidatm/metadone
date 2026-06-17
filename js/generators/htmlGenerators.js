import DICT from "/data/dict/dict.js"

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
class textPost{
	constructor(data){
		this.seed = data.seed
		this.dict = data.dict
		this.html = this.init()
	}
	init(){
		let word = this.content(this.seed,this.dict)
		let div = document.createElement("div")
		div.classList.add("post_content")
		let h1 = document.createElement("div")
		let size = this._fontsize(word)
		h1.style = this._style(size)
		h1.innerText = word
		div.appendChild(h1)
		return div
	}
	_fontsize(word){
		return 6
	}
	_style(size){
		return "font-size:"+size+"px;color:white;line-height:1em;font-family:sans-serif;font-weight:400;text-transform:uppercase;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width: 90%;word-break: break-all;text-align: center;"
	}
	content(seed,dict){
		let content = DICT[dict][Math.floor(seed * DICT[dict].length)]
		let def = content.split("/")
		let word = def[0]
		return word
	}
}
export class textPostEN extends textPost{
	constructor(data){
		super(data)
	}
	_fontsize(word){
		return 36 + (18 / word.length)
	}
}
export class textPostDE extends textPost{
	constructor(data){
		super(data)
	}
	_fontsize(word){
		return 24 + (24 / word.length)
	}
}
export class textPostAR extends textPost{
	constructor(data){
		super(data)
	}
	_fontsize(word){
		return 36 + (12 / word.length)
	}
}
export class textPostRU extends textPost{
	constructor(data){
		super(data)
	}
	_fontsize(word){
		return 30 + (18 / word.length)
	}
}
export class textPostZH extends textPost{
	constructor(data){
		super(data)
	}
	_fontsize(word){
		return 30 + (60 / word.length)
	}
	_style(size){
		return "font-size:"+size+"px;color:white;line-height:1em;font-family:serif;font-weight:400;text-transform:uppercase;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);writing-mode: vertical-lr;width: auto;word-break: break-all;text-align: center;"
	}
}
export class textPostHI extends textPost{
	constructor(data){
		super(data)
	}
	_fontsize(word){
		return 36 + (18 / word.length)
	}
}
export class textPostUK extends textPost{
	constructor(data){
		super(data)
	}
	_fontsize(word){
		return 30 + (18 / word.length)
	}
}
export class textPostHE extends textPost{
	constructor(data){
		super(data)
	}
	_fontsize(word){
		return 36 + (18 / word.length)
	}
	_style(size){
		return "font-size:"+size+"px;color:white;line-height:1em;font-family:sans-serif;font-weight:400;text-transform:uppercase;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);writing-mode: rtl;width: auto;word-break: break-all;text-align: center;"
	}
}
export class textPostFR extends textPost{
	constructor(data){
		super(data)
	}
	_fontsize(word){
		return 36 + (18 / word.length)
	}
}
export class textPostES extends textPost{
	constructor(data){
		super(data)
	}
	_fontsize(word){
		return 36 + (18 / word.length)
	}
}

