export default {
	global: {
		visualCreatorBufferCutoff: 64,
		audioProducerBufferCutoff: 128
	},
	User: {
		initialRandomNumbersAmount: 30,
		initialRandomParametersAmount: 100,
		negativeViewtimeCutoff: 0.8,
		positiveViewtimeCutoff: 1.2
	},
	AlmightyAlgorithm: {
		historyLength: 20,
		stepsSinceLastSurprise: 0,
		surpriseAfter: 30,
		surpriseShift: 2,
		mutation: 0.015
	},
	Feed: {
		buffer: {
			size: 5,
			generate: 10
		},
		deletePostsPast: 20,
		doubleClickTimeWindow: 500,
		holdTimeWindow: 300
	}
}