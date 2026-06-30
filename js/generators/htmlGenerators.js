import DICT from "/data/dict/dict_loader.js"

export class greyPost{
	constructor(data){
		this.seed = data.inputs[0]
		this.html = this.init()
	}
	init(){
		let div = document.createElement("div")
		div.classList.add("post_content")
		div.style.background = this.content(this.seed)
		return div
	}
	content(seed){
		let shade = 20 + Math.floor(seed * 200)
		return "rgb(" + shade + "," + shade + "," + shade + ")" 
	}
}
export class primaryPost{
	constructor(data){
		this.seed = data.inputs[0]
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
		this.seed = data.inputs[0]
		this.html = this.init()
	}
	init(){
		let div = document.createElement("div")
		div.classList.add("post_content")
		div.style.background = this.content(this.seed)
		return div
	}
	content(seed){
		return '#'+(seed*0xFFFFFF<<0).toString(16).padStart(6, "f")
	}

}
export class gradientPost{
	constructor(data){
		this.inputs = data.inputs
		this.html = this.init()
	}
	init(){
		let div = document.createElement("div")
		div.classList.add("post_content")
		div.style.background = this.content(this.inputs)
		return div
	}
	content(inputs){
		let cA = '#'+(inputs[0]*0xFFFFFF<<0).toString(16).padStart(6, "f")
		let cB = '#'+(inputs[1]*0xFFFFFF<<0).toString(16).padStart(6, "f")
		if(inputs[2] < 0.5){
			return "linear-gradient(to top," + cA + "," + cB + ")"
		}
		else{
			return "radial-gradient(circle," + cA + " 0%, " + cB + " 100%)"
		}
	}
}

export class splitPost{
	constructor(data){
		this.inputs = data.inputs
		this.html = this.init()
	}
	init(){
		let div = document.createElement("div")
		div.classList.add("post_content")
		div.classList.add("post--rothko")
		div.style = this.content(this.inputs)
		return div
	}
	content(inputs){
		let cA = '#'+(inputs[0]*0xFFFFFF<<0).toString(16).padStart(6, "f")
		let cB = '#'+(inputs[1]*0xFFFFFF<<0).toString(16).padStart(6, "f")
		let cC = '#'+(inputs[2]*0xFFFFFF<<0).toString(16).padStart(6, "f")
		let _s1 = Math.round(inputs[3]*100)
		let _s2 = Math.round(inputs[4]*100)
		let s1 = Math.min(_s1,_s2)
		let s2 = Math.max(_s1,_s2)
		let b = Math.round(2 + 20 * inputs[5])
		return "filter: blur("+ b + "px); background: linear-gradient(0deg," + cA + " " + s1 + "%," + cB + " " + s1 + "%," + cB + " " + s2 + "%," + cC + " " + s2 + "%);"
	}
}
class shaderPost{
	constructor(data){
		this.seed = data.seed
		this.inputs = data.inputs
		this.html = this.init()
	}
	init(){
		let div = document.createElement("canvas")
		div.classList.add("post_content")
		return div
	}
}
export class colorfulVisuals extends shaderPost{
	constructor(data){
		super(data)
	}
}
export class movingGradients extends shaderPost{
	constructor(data){
		super(data)
	}
}
class textPost{
	constructor(data){
		this.seed = data.inputs[0]
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
		return "font-size:"+size+"px;color:white;line-height:1em;font-family:'Arial',sans-serif;font-weight:400;text-transform:uppercase;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width: 90%;word-break: break-all;text-align: center;"
	}
	content(seed,dict){
		let content = DICT[dict][Math.floor(seed * DICT[dict].length)]
		let def = content.split("/")
		let word = def[0]
		return word
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
		return 24 + (24 / word.length)
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
	_style(size){
		return "font-size:"+size+"px;color:white;line-height:1em;font-family:sans-serif;font-weight:400;text-transform:uppercase;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width: auto;word-break: break-all;text-align: center;"
	}
}
export class textPostRU extends textPost{
	constructor(data){
		super(data)
	}
	_fontsize(word){
		return 24 + (24 / word.length)
	}
}
export class textPostZH extends textPost{
	constructor(data){
		super(data)
	}
	_fontsize(word){
		return 20 + (70 / word.length)
	}
	_style(size){
		return "font-size:"+size+"px;color:white;line-height:1em;font-family:'Arial',sans-serif;font-weight:400;text-transform:uppercase;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);writing-mode: vertical-lr;width: auto;word-break: break-all;text-align: center;"
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
		return "font-size:"+size+"px;color:white;line-height:1em;font-family:'Arial',sans-serif;font-weight:400;text-transform:uppercase;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);writing-mode: rtl;width: auto;word-break: break-all;text-align: center;"
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
		return 24 + (24 / word.length)
	}
}

