export class sinewaves{
	constructor(inputs,ctx){
		this.ctx = ctx

		this.frequency = 60 + Math.floor(inputs[0] * 360)

		this.generator = this.createGenerator()
		this.tracktitle = this.frequency + "hz"
	}
	createGenerator(){
		let osc = this.ctx.createOscillator()
		let gain = this.ctx.createGain()
		let g = 0.1 + ((1 - (this.frequency - 60) / 360) * 0.1)
		gain.gain.setValueAtTime(g, this.ctx.currentTime)
		osc.type = "sine";
		osc.frequency.setValueAtTime(this.frequency, this.ctx.currentTime)
		osc.start()
		osc.connect(gain)
		return gain
	}
}

class MelodicGenerator{
	constructor(){
		this.NOTENAMES = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"]
		this.NOTES = [261.63,277.18,293.66,311.13,329.63,349.23,369.99,392,415.30,440,466.16,493.88]
		this.OCTAVES = [0.125,0.25,0.5,1,2,4,8]
		this.TONALITIES = {
			dur: [4,7],
			moll: [3,7]
		}
	}
	_transposeNote(note,octave){
		return this.NOTES[note] * this.OCTAVES[octave-1]
	}
	_createChord(note,octave,range,tonality){
		tonality = tonality || "moll"
		range = range || 0
		octave = octave || 4
		let base = this._transposeNote(note,octave)

		let firstNote = note + this.TONALITIES[tonality][0]
		let firstOctave = Math.floor(firstNote / 12) + octave + Math.round((range-1)/2)
		let first = this._transposeNote(firstNote % 12,firstOctave)

		let secondNote = note + this.TONALITIES[tonality][1]
		let secondOctave = Math.floor(secondNote / 12) + octave + Math.round((range)/2)
		let second = this._transposeNote(secondNote % 12,secondOctave)
		return [base,first,second]
	}
}

export class harmony extends MelodicGenerator{
	constructor(inputs,ctx){
		super(inputs,ctx)

		this.ctx = ctx
		this.base = Math.floor(inputs[0] * 4 * 12)
		this.range = Math.floor(inputs[1] * 3)
		this.note = this.base % 12
		this.octave = Math.floor(this.base / 12)

		this.generator = this.createGenerator()

		this.tracktitle = "" + this.NOTENAMES[this.note] + this.octave
	}
	createGenerator(){
		let freqs = this._createChord(this.note,this.octave,3)
		let gain = this.ctx.createGain()
		gain.gain.setValueAtTime(0.1, this.ctx.currentTime)
		for(let i = 0; i < 3; i++){
			let f = freqs[i]
			let osc = this.ctx.createOscillator()
			osc.type = "sine";
			osc.frequency.setValueAtTime(f, this.ctx.currentTime)
			osc.start()
			osc.connect(gain)
		}
		return gain
	}
}

export class discord{
	constructor(inputs,ctx){
		this.ctx = ctx

		this.frequency = 60 + Math.floor(inputs[0] * 360)

		this.generator = this.createGenerator()
		this.tracktitle = this.frequency + "hz"
	}
	createGenerator(){
		let f = this.frequency
		let gain = this.ctx.createGain()
		gain.gain.setValueAtTime(0.025, this.ctx.currentTime)
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
	constructor(inputs,ctx){
		this.ctx = ctx

		this.frequency = 60 + Math.floor(inputs[0] * 360)

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
	constructor(inputs,ctx){
		this.ctx = ctx

		this.frequency = 60 + Math.floor(inputs[0] * 60)
		this.lfo1 = 0.25 + inputs[1] * 1.75
		this.lfo2 = this.lfo1 * (1 + inputs[2])

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
export class squarewaves{
	constructor(inputs,ctx){
		this.ctx = ctx

		this.frequency = 60 + Math.floor(inputs[0] * 360)

		this.generator = this.createGenerator()
		this.tracktitle = this.frequency + "hz"
	}
	createGenerator(){
		let osc = this.ctx.createOscillator()
		let gain = this.ctx.createGain()
		let g = 0.025 + ((1 - (this.frequency - 60) / 360) * 0.02)
		gain.gain.setValueAtTime(g, this.ctx.currentTime)
		osc.type = "square";
		osc.frequency.setValueAtTime(this.frequency, this.ctx.currentTime)
		osc.start()
		osc.connect(gain)
		return gain
	}
}
export class noise{
	constructor(inputs,ctx){
		this.ctx = ctx
		

		this.gain = 0.1 + inputs[1] * 0.1
		this.frequency = 40 + Math.floor(inputs[0] * 4000)

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
	constructor(inputs,ctx){
		this.ctx = ctx
		

		this.gain = 0.1 + inputs[1] * 0.1
		this.frequency = 40 + Math.floor(inputs[0] * 4000)

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