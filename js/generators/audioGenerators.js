export class sinewaves{
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
		gain.gain.setValueAtTime(0.2, this.ctx.currentTime)
		osc.type = "sine";
		osc.frequency.setValueAtTime(this.frequency, this.ctx.currentTime)
		osc.start()
		osc.connect(gain)
		return gain
	}
}
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
		gain.gain.setValueAtTime(0.1, this.ctx.currentTime)
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
		this.tracktitle = "noise at " + this.frequency + "hz"
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