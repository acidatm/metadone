import DICT from "/data/dict/dict.js"


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

class textPost{
	constructor(data){
		this.seed = data.seed
		this.dict = data.dict
		this.caption = this.init()
	}
	init(){
		return this.content(this.seed,this.dict)
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
}
export class textPostDE extends textPost{
	constructor(data){
		super(data)
	}
}
export class textPostRU extends textPost{
	constructor(data){
		super(data)
	}
}
export class textPostAR extends textPost{
	constructor(data){
		super(data)
	}
}
export class textPostZH extends textPost{
	constructor(data){
		super(data)
	}
}
export class textPostHI extends textPost{
	constructor(data){
		super(data)
	}
}
export class textPostES extends textPost{
	constructor(data){
		super(data)
	}
}
export class textPostFR extends textPost{
	constructor(data){
		super(data)
	}
}
export class textPostHE extends textPost{
	constructor(data){
		super(data)
	}
}
export class textPostUK extends textPost{
	constructor(data){
		super(data)
	}
}