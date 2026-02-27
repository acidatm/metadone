import COLORS from "/data/lists/colors.js"
import WORDS from "/data/lists/words.js"

export class gradients{
	constructor(seed,cocreators){
		this.seed = seed
		this.cocreator = cocreators.color
		this.html = this.init()
	}
	init(){
		let div = document.createElement("div")
		div.classList.add("post_content")
		div.style.background = this.content(this.seed)
		return div
	}
	content(seed){
		let cA = this.cocreator.content(seed)
		let cB = this.cocreator.content((seed+0.5)%1)
		return "linear-gradient(to top," + cA + "," + cB + ")"
	}
}
export class primaryColors{
	constructor(seed){
		this.seed = seed
		this.html = this.init()
	}
	init(){
		let div = document.createElement("div")
		div.classList.add("post_content")
		div.style.background = this.content(this.seed)
		return div
	}
	content(seed){
		return COLORS.primary[Math.floor(seed*COLORS.primary.length)].hex
	}
}
export class mellowColors{
	constructor(seed){
		this.seed = seed
		this.html = this.init()
	}
	init(){
		let div = document.createElement("div")
		div.classList.add("post_content")
		div.style.background = this.content(this.seed)
		return div
	}
	content(seed){
		return COLORS.mellow[Math.floor(seed*COLORS.mellow.length)].hex
	}
}
export class shadesOfGrey{
	constructor(seed){
		this.seed = seed
		this.html = this.init()
	}
	init(){
		let div = document.createElement("div")
		div.classList.add("post_content")

		let shade = 20 + Math.floor(this.seed * 200)
		div.style.background = "rgb(" + shade + "," + shade + "," + shade + ")" 
		return div
	}
}
export class colorType{
	constructor(seed,cocreators){
		this.seed = seed
		this.text = cocreators.text
		this.color = cocreators.color
		this.html = this.init()
	}
	init(){
		let word = this.text.content(this.seed)
		let color = this.color.content(this.seed)
		let div = document.createElement("div")
		div.classList.add("post_content")
		let h1 = document.createElement("div")
		let size = 36 + 12 / word.length
		h1.style = "font-size:"+size+"px;color:"+color+";line-height:1em;font-family:sans-serif;font-weight:bold;text-transform:uppercase;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)"
		h1.innerText = word
		div.appendChild(h1)
		return div
	}
	content(){
		return ""
	}
}
export class singleWords{
	constructor(seed){
		this.seed = seed
		this.html = this.init()
	}
	init(){
		let word = this.content(this.seed)
		let div = document.createElement("div")
		div.classList.add("post_content")
		let h1 = document.createElement("div")
		let size = 36 + 12 / word.length
		h1.style = "font-size:"+size+"px;color:white;line-height:1em;font-family:sans-serif;font-weight:bold;text-transform:uppercase;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)"
		h1.innerText = word
		div.appendChild(h1)
		return div
	}
	content(seed){
		let word = WORDS.impactful[Math.floor(seed*WORDS.impactful.length)]
		return word
	}
}
export class repeatWords{
	constructor(seed){
		this.seed = seed
		this.html = this.init()
	}
	init(){
		let word = this.content(this.seed)
		let div = document.createElement("div")
		div.classList.add("post_content")
		let h1 = document.createElement("div")
		let size = 24 + 12 / word.length
		h1.style = "font-size:"+size+"px;color:white;line-height:1em;font-family:sans-serif;font-weight:bold;text-transform:uppercase;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)"
		h1.innerText = word
		div.appendChild(h1)
		return div
	}
	content(seed){
		let word = (WORDS.impactful[Math.floor(seed*WORDS.impactful.length)] + "\n").repeat(10)
		return word
	}
}
export class nothing{
	constructor(){
		this.html = this.init()
	}
	init(){
		let div = document.createElement("div")
		div.classList.add("post_content")
		return div
	}
}