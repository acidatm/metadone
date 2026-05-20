export default class shaderGenerator{
	constructor(){
		// this.layersN = Math.floor(1 + Math.random() * 5)
		this.parameters = {
			layersN: 10,
			frequencyScale: 4,
			frequencyMax: 100,
			opacityCutoff: 0.5,
			offsetMax: 5
		}
		let layers = 2 + Math.round((this.parameters.layersN - 2) * Math.random())
		this.data = this._generateLayers(layers)
		this.shader = this.generate()
		
	}
	_generateLayers(n){
		let l = []
		for(let i = 0; i < n; i++){
			l.push({
				index: i,
				mode: Math.random(),
				opacity: Math.random(),
				channels: {
					r: Math.random() * (1/this.parameters.layersN),
					g: Math.random() * (1/this.parameters.layersN),
					b: Math.random() * (1/this.parameters.layersN)
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
	_createLayer(index,mode,opacity,channels,oscilator){
		if(index > 1){
			if(opacity < this.parameters.opacityCutoff){
				return {
					r: "",
					g: "",
					b: ""
				}
			}
			else{
				opacity = opacity * (1 / this.parameters.opacityCutoff) - (1 / this.parameters.opacityCutoff * 0.5)
			}
		}
		
		if(opacity == 1){
			opacity = "1.0"
		}
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
		let F = 0.01 + Math.pow(o.frequency,this.parameters.frequencyScale) * this.parameters.frequencyMax
		let O = -this.parameters.offsetMax + o.offset * (this.parameters.offsetMax * 2)
		let s = ""
		if(o.shape < 0.2){ // sine
			s = "SIN("
		}
		else if(o.shape < 0.4){ //square
			s = "SQR("
		}
		else if(o.shape < 0.6){ //pulse
			let pulseWidth = o.shape - 0.4 * 5 // 0-1
			s = "SQR(" + pulseWidth + ","
		}
		else if(o.shape < 0.8){ //triangle
			s = "TRI("
		}
		else{ //noise plasma
			s = "SIN("
		}
		return s + F + " * (" + xR + " * X + " + yR + " * Y)) + (T * " + O + ")"
	}
	generate(){
		let rgb = {
			r: ["0.0"],
			g: ["0.0"],
			b: ["0.0"]
		}
		for(let l of this.data){
			let layer = this._createLayer(l.index,l.mode,l.opacity,l.channels,l.oscilator)
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