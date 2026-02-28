import COLORS from "/data/lists/colors.js"
import WORDS from "/data/lists/words.js"
import {languages as LANGUAGES} from "/data/lists/words.js"

export class gradients{
	constructor(data,cocreators){
		this.seed = data.seed
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
export class splits{
	constructor(data,cocreators){
		this.seed = data.seed
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
		let cB = this.cocreator.content((seed+0.4)%1)
		return "linear-gradient(0deg," + cA + " 50%," + cB + " 50%)"
	}
}
export class primaryColors{
	constructor(data){
		this.seed = data.seed
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
	constructor(data){
		this.seed = data.seed
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
	constructor(data){
		this.seed = data.seed
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
	constructor(data,cocreators){
		this.seed = data.seed
		this.list = data.list
		this.language = data.language
		this.text = cocreators.text
		this.color = cocreators.color
		this.html = this.init()
	}
	init(){
		let word = this.text.content(this.seed,this.list,this.language)
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
	constructor(data){
		this.seed = data.seed
		this.list = data.list
		this.language = data.language
		this.html = this.init()
	}
	init(){
		let word = this.content(this.seed,this.list,this.language)
		let div = document.createElement("div")
		div.classList.add("post_content")
		let h1 = document.createElement("div")
		let size = 36 + 12 / word.length
		h1.style = "font-size:"+size+"px;color:white;line-height:1em;font-family:sans-serif;font-weight:bold;text-transform:uppercase;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)"
		h1.innerText = word
		div.appendChild(h1)
		return div
	}
	content(seed,list,language){
		console.log(list,language)
		let word = WORDS[list][Math.floor(seed*WORDS.impactful.length)][language]
		return word
	}
}
export class repeatWords{
	constructor(data){
		this.seed = data.seed
		this.list = data.list
		this.language = data.language
		this.html = this.init()
	}
	init(){
		let word = this.content(this.seed,this.list,this.language)
		let div = document.createElement("div")
		div.classList.add("post_content")
		let h1 = document.createElement("div")
		let size = 24 + 12 / word.length
		h1.style = "font-size:"+size+"px;color:white;line-height:1em;font-family:sans-serif;font-weight:bold;text-transform:uppercase;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)"
		h1.innerText = word
		div.appendChild(h1)
		return div
	}
	content(seed,list,language){
		let word = (WORDS[list][Math.floor(seed*WORDS[list].length)][language] + "\n").repeat(10)
		return word
	}
}
export class transWords{
	constructor(data){
		this.seed = data.seed
		this.list = data.list
		this.language = data.language
		this.html = this.init()
	}
	init(){
		let word = this.content(this.seed,this.list,this.language)
		let div = document.createElement("div")
		div.classList.add("post_content")
		let h1 = document.createElement("div")
		h1.style = "font-size:48px;color:white;line-height:1em;font-family:sans-serif;font-weight:bold;text-transform:uppercase;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center"
		h1.innerText = word
		div.appendChild(h1)
		return div
	}
	content(seed,list,language){
		let word = ""
		for(let l of LANGUAGES){
			word += (WORDS[list][Math.floor(seed*WORDS[list].length)][l] + "\n")
		}
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