import PRIMARY_COLORS from "/data/lists/primaryColors.js"
import MELLOW_COLORS from "/data/lists/mellowColors.js"
import IMPACT_WORDS from "/data/lists/impactWords.js"

export class primaryColors{
	constructor(seed){
		this.seed = seed
		return this.init()
	}
	init(){
		let div = document.createElement("div")
		div.classList.add("post_content")
		div.style.background = PRIMARY_COLORS[Math.floor(this.seed*PRIMARY_COLORS.length)].hex
		return div
	}
}
export class mellowColors{
	constructor(seed){
		this.seed = seed
		return this.init()
	}
	init(){
		let div = document.createElement("div")
		div.classList.add("post_content")
		div.style.background = MELLOW_COLORS[Math.floor(this.seed*MELLOW_COLORS.length)].hex
		return div
	}
}
export class shadesOfGrey{
	constructor(seed){
		this.seed = seed
		return this.init()
	}
	init(){
		let div = document.createElement("div")
		div.classList.add("post_content")

		let shade = 20 + Math.floor(this.seed * 200)
		div.style.background = "rgb(" + shade + "," + shade + "," + shade + ")" 
		return div
	}
}
export class singleImpactWords{
	constructor(seed){
		this.seed = seed
		return this.init()
	}
	init(){
		let word = IMPACT_WORDS[Math.floor(this.seed*IMPACT_WORDS.length)]
		let div = document.createElement("div")
		div.classList.add("post_content")
		let h1 = document.createElement("div")
		let size = 36 + 12 / word.length
		h1.style = "font-size:"+size+"px;color:white;line-height:1em;font-family:sans-serif;font-weight:bold;text-transform:uppercase;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)"
		h1.innerText = word
		div.appendChild(h1)
		return div
	}
}
export class repeatWords{
	constructor(seed){
		this.seed = seed
		return this.init()
	}
	init(){
		let word = IMPACT_WORDS[Math.floor(this.seed*IMPACT_WORDS.length)]
		let div = document.createElement("div")
		div.classList.add("post_content")
		let h1 = document.createElement("div")
		let size = 24 + 12 / word.length
		h1.style = "font-size:"+size+"px;color:white;line-height:1em;font-family:sans-serif;font-weight:bold;text-transform:uppercase;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)"
		h1.innerText = (word + "\n").repeat(10)
		div.appendChild(h1)
		return div
	}
}
export class nothing{
	constructor(){
		return this.init()
	}
	init(){
		let div = document.createElement("div")
		div.classList.add("post_content")
		return div
	}
}