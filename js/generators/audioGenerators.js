export class sinewaves{
	constructor(seed,ctx){
		this.seed = seed
		this.ctx = ctx

		this.frequency = 60 + Math.floor(Math.random() * 360)

		this.generator = this.createGenerator()
		this.tracktitle = this.frequency + "hz"
	}
	createGenerator(){
		let osc = this.ctx.createOscillator()
		let gain = this.ctx.createGain()
		gain.gain.setValueAtTime(0.2, this.ctx.currentTime)
		osc.type = "sine";
		osc.frequency.setValueAtTime(this.frequency, this.ctx.currentTime)
		osc.start()
		osc.connect(gain)
		return gain
	}
}
export class discord{
	constructor(seed,ctx){
		this.seed = seed
		this.ctx = ctx

		this.frequency = 60 + Math.floor(Math.random() * 360)

		this.generator = this.createGenerator()
		this.tracktitle = this.frequency + "hz"
	}
	createGenerator(){
		let f = this.frequency
		let gain = this.ctx.createGain()
		gain.gain.setValueAtTime(0.1, this.ctx.currentTime)
		for(let i = 0; i < 5; i++){
			f = f * (1+Math.random()) 
			let osc = this.ctx.createOscillator()
			osc.type = "square";
			osc.frequency.setValueAtTime(f, this.ctx.currentTime)
			osc.start()
			osc.connect(gain)
		}
		return gain
	}
}
export class bells{
	constructor(seed,ctx){
		this.seed = seed
		this.ctx = ctx

		this.frequency = 60 + Math.floor(Math.random() * 360)

		this.generator = this.createGenerator()
		this.tracktitle = this.frequency + "hz"
	}
	createGenerator(){
		let f = this.frequency
		let gain = this.ctx.createGain()
		gain.gain.setValueAtTime(0.02, this.ctx.currentTime)
		for(let i = 0; i < 10; i++){
			f = f * (1+Math.random()*0.5) 
			let osc = this.ctx.createOscillator()
			osc.type = "sine";
			osc.frequency.setValueAtTime(f, this.ctx.currentTime)
			osc.start()
			osc.connect(gain)
		}
		return gain
	}
}
export class ikeda{
	constructor(seed,ctx){
		this.seed = seed
		this.ctx = ctx

		this.frequency = 60 + Math.floor(Math.random() * 60)
		this.lfo1 = 0.25 + Math.random() * 1.75
		this.lfo2 = this.lfo1 * (1 + Math.random())

		this.generator = this.createGenerator()
		this.tracktitle = "Test Pattern No. " + Math.floor(this.lfo1 * 100)
	}
	createGenerator(){
		let osc = this.ctx.createOscillator()
		let lfo1 = this.ctx.createOscillator()
		let lfo2 = this.ctx.createOscillator()
		let amp = this.ctx.createGain()
		let amt1 = this.ctx.createGain()
		let amt2 = this.ctx.createGain()
		// amp.gain.setValueAtTime(0.05, this.ctx.currentTime)
		osc.type = "sine"
		osc.frequency.setValueAtTime(this.frequency, this.ctx.currentTime)
		lfo1.type = "square"
		lfo1.frequency.setValueAtTime(this.lfo1, this.ctx.currentTime)
		lfo2.type = "square"
		lfo2.frequency.setValueAtTime(this.lfo2, this.ctx.currentTime)
		amt1.gain.setValueAtTime(1,this.ctx.currentTime)
		amt2.gain.setValueAtTime(1,this.ctx.currentTime)
		lfo1.connect(amt1).connect(amt2.gain)
		lfo2.connect(amt2).connect(amp.gain)
		osc.connect(amp)
		lfo1.start()
		lfo2.start()
  		osc.start()
		return amp
	}
}
// export class modulator{
// 	constructor(seed,ctx){
// 		this.seed = seed
// 		this.ctx = ctx

// 		this.frequency = 240
// 		this.repeat = 0.5 + Math.random() * 5

// 		this.generator = this.createGenerator()
// 		this.tracktitle = this.frequency + "hz"
// 	}
// 	createGenerator(){
// 		let osc = this.ctx.createOscillator()
// 		let lfo = this.ctx.createOscillator()
// 		let amp = this.ctx.createGain()
// 		let amt = this.ctx.createGain()
// 		// amp.gain.setValueAtTime(0.05, this.ctx.currentTime)
// 		osc.type = "sine"
// 		osc.frequency.setValueAtTime(this.frequency, this.ctx.currentTime)
// 		lfo.type = "ramp"
// 		lfo.frequency.setValueAtTime(this.repeat, this.ctx.currentTime)
// 		amt.gain.setValueAtTime(1,this.ctx.currentTime)
// 		lfo.connect(amt).connect(amp.gain)
// 		osc.connect(amp)
// 		lfo.start()
//   		osc.start()
// 		return amp
// 	}
// }
export class squarewaves{
	constructor(seed,ctx){
		this.seed = seed
		this.ctx = ctx

		this.frequency = 60 + Math.floor(Math.random() * 600)

		this.generator = this.createGenerator()
		this.tracktitle = this.frequency + "hz"
	}
	createGenerator(){
		let osc = this.ctx.createOscillator()
		let gain = this.ctx.createGain()
		gain.gain.setValueAtTime(0.05, this.ctx.currentTime)
		osc.type = "square";
		osc.frequency.setValueAtTime(this.frequency, this.ctx.currentTime)
		osc.start()
		osc.connect(gain)
		return gain
	}
}
export class noise{
	constructor(seed,ctx){
		this.seed = seed
		this.ctx = ctx
		

		this.gain = 0.1 + Math.random() * 0.1
		this.frequency = 40 + Math.floor(Math.random() * 4000)

		this.generator = this.createGenerator()
		this.tracktitle = this.frequency + "hz"
	}
	createGenerator(){
		const bufferSize = 2 * this.ctx.sampleRate
		const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
		const output = noiseBuffer.getChannelData(0)
		for (let i = 0; i < bufferSize; i++) {
			output[i] = Math.random() * 2 - 1
		}
		const whiteNoise = this.ctx.createBufferSource()
		whiteNoise.buffer = noiseBuffer
		whiteNoise.loop = true
		whiteNoise.start()
		let gain = this.ctx.createGain()
		gain.gain.setValueAtTime(this.gain, this.ctx.currentTime)
		const bandpass = new BiquadFilterNode(this.ctx, {
		  type: "bandpass",
		  frequency: this.frequency
		})
		whiteNoise.connect(bandpass).connect(gain)
		return gain
	}
}

export class notch{
	constructor(seed,ctx){
		this.seed = seed
		this.ctx = ctx
		

		this.gain = 0.1 + Math.random() * 0.1
		this.frequency = 40 + Math.floor(Math.random() * 4000)

		this.generator = this.createGenerator()
		this.tracktitle = this.frequency + "hz"
	}
	createGenerator(){
		const bufferSize = 2 * this.ctx.sampleRate
		const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
		const output = noiseBuffer.getChannelData(0)
		for (let i = 0; i < bufferSize; i++) {
			output[i] = Math.random() * 2 - 1
		}
		const whiteNoise = this.ctx.createBufferSource()
		whiteNoise.buffer = noiseBuffer
		whiteNoise.loop = true
		whiteNoise.start()
		let gain = this.ctx.createGain()
		gain.gain.setValueAtTime(this.gain, this.ctx.currentTime)
		const bandpass = new BiquadFilterNode(this.ctx, {
		  type: "notch",
		  frequency: this.frequency,
		  Q: 0.25
		})
		whiteNoise.connect(bandpass).connect(gain)
		return gain
	}
}