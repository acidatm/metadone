import EN from "/data/dict/en.js"
import DE from "/data/dict/de.js"
import RU from "/data/dict/ru.js"
import AR from "/data/dict/ar.js"


export class visualPost{
	constructor(data){
		this.seed = data.seed
		this.caption = this.init()
	}
	init(){
		return this.content(this.seed) + ""
	}
	content(seed){
		return Math.floor(1000000000 * seed)
	}
}

export class greyPost{
	constructor(data){
		this.seed = data.seed
		this.caption = this.init()
	}
	init(){
		return this.content(this.seed) + ""
	}
	content(seed){
		return "shade #" + Math.ceil(seed * 200)
	}
}

export class primaryPost{
	constructor(data){
		this.seed = data.seed
		this.caption = this.init()
	}
	init(){
		return this.content(this.seed) + ""
	}
	content(seed){
		let colors = ["RED","GREEN","BLUE","YELLOW","PINK","CYAN"]
		return colors[Math.floor(seed * colors.length)]
	}
}

export class colorPost{
	constructor(data){
		this.seed = data.seed
		this.caption = this.init()
	}
	init(){
		return this.content(this.seed) + ""
	}
	content(seed){
		return '#'+(seed*0xFFFFFF<<0).toString(16);
	}
}

export class textPostEN{
	constructor(data){
		this.seed = data.seed
		this.list = data.list
		this.language = data.language
		this.caption = this.init()
	}
	init(){
		return this.content(this.seed)
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
		this.caption = this.init()
	}
	init(){
		return this.content(this.seed)
	}
	content(seed){
		let content = DE[Math.floor(seed * DE.length)]
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
		this.caption = this.init()
	}
	init(){
		return this.content(this.seed)
	}
	content(seed){
		let content = RU[Math.floor(seed * RU.length)]
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
		this.caption = this.init()
	}
	init(){
		return this.content(this.seed)
	}
	content(seed){
		let content = AR[Math.floor(seed * AR.length)]
		let def = content.split("/")
		let word = def[0]
		return word
	}
}