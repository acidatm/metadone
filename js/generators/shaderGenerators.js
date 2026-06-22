
export class movingGradients{
	constructor(inputs){
		this.inputs = inputs.map(a => a >= 1 ? 0.99999 : a <= 0 ? 0.00001 : a) //make sure to have no 1 or 0
		this.shader = this.generate(this.inputs)
		
	}
	generate(inputs){
		let S = "float X = gl_FragCoord.x / resolution.x; float Y = gl_FragCoord.y / resolution.y; float T = time*0.5;"
		S += "vec3 c1 = vec3(" + inputs[0] + "," + inputs[1] + "," + inputs[2] + ");"
		S += "vec3 c2 = vec3(" + inputs[3] + "," + inputs[4] + "," + inputs[5] + ");"
		S += "vec3 c3 = vec3(" + inputs[6] + "," + inputs[7] + "," + inputs[8] + ");"
		S += "vec3 c4 = vec3(" + inputs[9] + "," + inputs[10] + "," + inputs[11] + ");"
		S += "gl_FragColor = vec4(mix(mix(c1, c2, (Y+clamp(T * " + inputs[12] + ")*" + inputs[13] + ")),  mix(c3, c4, (Y+clamp(T * " + inputs[14] + ")*" + inputs[15] + ")), (X+clamp(T * " + inputs[16] + ")*" + inputs[17] + ")),1.0);"
		return S
	}	

}
//mix(mix(vec3(1.0,1.0,0.0), vec3(0.0,0.0,1.0), Y),  mix(vec3(1.0,0.0,1.0), vec3(0.0,0.0,1.0), Y), X)

export class colorfulVisuals{
	constructor(inputs){
		this.inputs = inputs.map(a => a >= 1 ? 0.99999 : a <= 0 ? 0.00001 : a) //make sure to have no 1 or 0
		this.parameters = {
			layersN: 5,
			frequencyScale: 4,
			frequencyMax: 100,
			opacityCutoff: 0.5,
			offsetMax: 5
		}
		let layers = 2 + Math.round((this.parameters.layersN - 2) * this.inputs[0])
		let i = this.inputs
		i.shift()
		this.data = this._generateLayers(layers,i)
		this.shader = this.generate()
		
	}
	_generateLayers(n,inputs){
		let l = []
		for(let i = 0; i < n; i++){
			l.push({
				index: i,
				mode: inputs[i*9+0],
				opacity: inputs[i*9+1],
				channels: {
					r: inputs[i*9+2],
					g: inputs[i*9+3],
					b: inputs[i*9+4]
				},
				oscilator: {
					shape: inputs[i*9+5],
					frequency: inputs[i*9+6],
					angle: inputs[i*9+7],
					offset: inputs[i*9+8]
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