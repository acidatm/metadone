import DICT from "/data/dict/dict.js"
import * as HTML_GENERATORS from "/js/generators/htmlGenerators.js"
import {RNG} from "/js/tools/tools.js"

export class colorfulVisuals{
	constructor(data){
		this.inputs = data.inputs
		this.caption = this.init()
	}
	init(){
		return this.content(this.inputs) + ""
	}
	content(inputs){
		let i = inputs.map(a => RNG.floatToBase36(a))
		return i.join("").slice(0,32)
	}
}
export class movingGradients{
	constructor(data){
		this.inputs = data.inputs
		this.caption = this.init()
	}
	init(){
		return this.content(this.inputs) + ""
	}
	content(inputs){
		let i = inputs.map(a => RNG.floatToBase36(a))
		return i.join("").slice(0,32)
	}
}

export class greyPost{
	constructor(data){
		this.seed = data.inputs[0]
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
		this.seed = data.inputs[0]
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
		this.seed = data.inputs[0]
		this.caption = this.init()
	}
	init(){
		return this.content(this.seed) + ""
	}
	content(seed){
		return '#'+(seed*0xFFFFFF<<0).toString(16);
	}
}

export class gradientPost{
	constructor(data){
		this.inputs = data.inputs
		this.caption = this.init()
	}
	init(){
		return this.content(this.inputs) + ""
	}
	content(inputs){
		let cA = '#'+(inputs[0]*0xFFFFFF<<0).toString(16).padStart(6, "f")
		let cB = '#'+(inputs[1]*0xFFFFFF<<0).toString(16).padStart(6, "f")
		return "from " + cA + " to " + cB
	}
}

export class splitPost{
	constructor(data){
		this.inputs = data.inputs
		this.caption = this.init()
	}
	init(){
		return this.content(this.inputs[0]) + ""
	}
	content(seed){
		return "No. " + Math.floor(seed *1000000)
	}
}

class textPost{
	constructor(data){
		this.seed = data.inputs[0]
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
export class emojiPost extends textPost{
	constructor(data){
		super(data)
	}
	content(seed){
		return DICT["emojis"][Math.floor(seed * DICT["emojis"].length)][3]
	}
}
export class futurePost extends textPost{
	constructor(data){
		super(data)
	}
	content(seed){
		let d = new Date()
		let t = d.getTime()
		let r = new Date(t + Math.floor(seed * 2522880000000))
		let j = r.getFullYear() - d.getFullYear()
		return j == 1 ? "in " + j + " year..." : "in " + j + " years..."
	}
}
export class datePost extends textPost{
	constructor(data){
		super(data)
	}
	content(seed){
		let d = new Date()
		let t = d.getTime()
		let r = new Date(Math.floor(seed * t))
		let j = d.getFullYear() - r.getFullYear()
		return j == 1 ?  j + " year ago..." : j + " years ago..." 
	}
}
export class numberPost extends textPost{
	constructor(data){
		super(data)
	}
	content(seed){
		let g = new HTML_GENERATORS.numberPost({inputs:[seed]})
		return g.content(seed)
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