import WORDS from "/data/dict/en.js"


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

export class textPost{
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
		let content = WORDS[Math.floor(seed * WORDS.length)]
		let def = content.split("/")
		let word = def[0]
		return word
	}
}