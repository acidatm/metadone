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
export class gradientPost{
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
		let cA = '#'+(seed*0xFFFFFF<<0).toString(16)
		let cB = '#'+(Math.abs(Math.sin(seed*10000))*0xFFFFFF<<0).toString(16)
		if(Math.sin(seed*10000) < 0){
			return "linear-gradient(to top," + cA + "," + cB + ")"
		}
		else{
			return "radial-gradient(circle," + cA + " 0%, " + cB + " 100%)"
		}
	}
}

export class splitPost{
	constructor(data){
		this.seed = data.seed
		this.inputs = data.inputs
		this.html = this.init()
	}
	init(){
		let div = document.createElement("div")
		div.classList.add("post_content")
		div.classList.add("post--rothko")
		div.style = this.content(this.seed)
		return div
	}
	content(seed){
		let cA = '#'+(seed*0xFFFFFF<<0).toString(16).padStart(6, "0")
		let cB = '#'+(Math.abs(Math.sin(seed*60748))*0xFFFFFF<<0).toString(16).padStart(6, "0")
		let cC = '#'+(Math.abs(Math.sin(seed*34659))*0xFFFFFF<<0).toString(16).padStart(6, "0")
		let _s1 = Math.round(Math.abs(Math.sin(seed*74297))*100)
		let _s2 = Math.round(Math.abs(Math.sin(seed*53975))*100)
		let s1 = Math.min(_s1,_s2)
		let s2 = Math.max(_s1,_s2)
		let b = Math.round(2 + 20 * Math.abs(Math.sin(seed*96475)))
		return "filter: blur("+ b + "px); background: linear-gradient(0deg," + cA + " " + s1 + "%," + cB + " " + s1 + "%," + cB + " " + s2 + "%," + cC + " " + s2 + "%);"
		// linear-gradient(0deg,#f0f 50%,#000fff 50%, #000fff 75%, aliceblue 75%)
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
		div.classList.add(...this._classes())
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
	_classes(){
		return ["post_content"]
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
export class emojiPost extends textPost{
	constructor(data){
		super(data)
	}
	_classes(){
		return ["post_content","post--emoji"]
	}
	_fontsize(word){
		return 200
	}
	content(seed){
		return DICT["emojis"][Math.floor(seed * DICT["emojis"].length)][2]
	}
}
export class datePost extends textPost{
	constructor(data){
		super(data)
	}
	_fontsize(word){
		return 48
	}
	content(seed){
		let d = new Date().getTime()
		let r = new Date(Math.floor(seed * d))
		return String(r.getDate()).padStart(2,"0") + "." + String(r.getMonth()).padStart(2,"0") + "." + String(r.getFullYear())
	}
}
export class futurePost extends textPost{
	constructor(data){
		super(data)
	}
	_fontsize(word){
		return 48
	}
	content(seed){
		let d = new Date().getTime()
		let r = new Date(d + Math.floor(seed * 2522880000000))
		return String(r.getDate()).padStart(2,"0") + "." + String(r.getMonth()).padStart(2,"0") + "." + String(r.getFullYear())
	}
}
export class numberPost extends textPost{
	constructor(data){
		super(data)
	}
	_fontsize(word){
		console.log(word.length)
		return 50 + (200 / word.length)
	}
	content(seed){
		let n
		if(seed < 0.5){
			n = Math.floor((seed * 2) * 99)
		}
		else if(seed < 0.75){
			n = Math.floor(((seed - 0.5) * 4) * 999)
		}
		else{
			n = Math.floor(((seed - 0.75) * 4) * 999999)
		}
		return ("" + n).replace(/\B(?=(\d{3})+(?!\d))/g, ".")
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
		return 16 + (32 / word.length)
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
		return 24 + (24 / word.length)
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
		return 24 + (24 / word.length)
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

