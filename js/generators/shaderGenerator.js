export default class shaderGenerator{
	constructor(){
		this.layersN = Math.floor(1 + Math.random() * 5)
		this.data = this._generateLayers(this.layersN)
		this.shader = this.generate()
	}
	_generateLayers(n){
		let l = []
		for(let i = 0; i < n; i++){
			l.push({
				mode: Math.random(),
				opacity: Math.random(),
				channels: {
					r: Math.random(),
					g: Math.random(),
					b: Math.random()
				},
				oscilator: {
					shape: Math.random(),
					frequency: Math.random(),
					angle: Math.random(),
					offset: Math.random()
				}
			})
		}
		return l
	}
	_createLayer(mode,opacity,channels,oscilator){
		let p
		if(mode < 0.5){ //additive
			p = "+"
		}
		else if(mode < 0.75){ //substractive
			p = "-"
		}
		else if(mode < 0.82){ //multiply
			p = "*"
		}
		else{ //divide
			p = "/"
		}
		let osc = this._createOscilator(oscilator)
		return {
			r: p + " ((" + osc + " * " + opacity + ") * " + channels.r + ")",
			g: p + " ((" + osc + " * " + opacity + ") * " + channels.g + ")",
			b: p + " ((" + osc + " * " + opacity + ") * " + channels.b + ")"
		}
	}
	_createOscilator(o){
		let xR = o.angle
		let yR = 1 - xR
		let F = 0.01 + o.frequency * 100
		let O = -100 + o.offset * 200
		return "sin(" + F + " * (" + xR + " * X + " + yR + " * Y)) + (T * " + O + ")"
	}
	generate(){
		let rgb = {
			r: ["0.0"],
			g: ["0.0"],
			b: ["0.0"]
		}
		for(let l of this.data){
			let layer = this._createLayer(l.mode,l.opacity,l.channels,l.oscilator)
			rgb.r.push(layer.r)
			rgb.g.push(layer.g)
			rgb.b.push(layer.b)
		}
		let S = "float X = gl_FragCoord.x / resolution.x; float Y = gl_FragCoord.y / resolution.y; float T = time; float S = seed; float C = random; "
		let R = rgb.r.join(" ")
		let G = rgb.g.join(" ")
		let B = rgb.b.join(" ")
		S += "float R = mod(" + R + ",1.0);"
		S += "float G = mod(" + G + ",1.0);"
		S += "float B = mod(" + B + ",1.0);"
		S += "gl_FragColor = vec4(R,G,B,1.0);"
		return S
	}	

}