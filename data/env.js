export default {
	global: {
		visualCreatorBufferCutoff: 64,
		audioProducerBufferCutoff: 128
	},
	User: {
		initialRandomNumbersAmount: 20,
		initialRandomParametersAmount: 20,
		negativeViewtimeCutoff: 0.8,
		positiveViewtimeCutoff: 1.2
	},
	AlmightyAlgorithm: {
		historyLength: 20,
		stepsSinceLastSurprise: 0,
		surpriseAfter: 30,
		surpriseShift: 2,
		mutation: 0.91
	}
}