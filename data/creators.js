export default [
	{
		uid: "primaryColors",
		name: "Primary Colors",
		username: "primary_colors",
		dp_url: "primary_colors.png",
		type: "background",
		inputs: ["color"],
		collaborators: {
			creators: ["singleWords","shadesOfGrey","mellowColors","repeatWords"],
			producers: ["sinewaves","noise","squarewaves","bells","ikeda"]
		}
		
	},
	{
		uid: "mellowColors",
		name: "Mellow Colors",
		username: "mellow_colors",
		dp_url: "mellow.png",
		type: "background",
		collaborators: {
			creators: ["singleWords","shadesOfGrey","primaryColors","repeatWords"],
			producers: ["sinewaves","noise","squarewaves","bells","ikeda"]
		}
		
	},
	{
		uid: "gradients",
		name: "Gradients",
		username: "gradients",
		dp_url: "mellow.png",
		type: "background",
		cocreators: {
			color: ["mellowColors","primaryColors"]
		},
		collaborators: {
			creators: ["singleWords","repeatWords"],
			producers: ["sinewaves","noise","squarewaves","bells","ikeda"]
		}
		
	},
	{
		uid: "splits",
		name: "Colorfields",
		username: "wishrothko",
		dp_url: "rothko.png",
		type: "background",
		cocreators: {
			color: ["mellowColors","primaryColors"]
		},
		collaborators: {
			creators: ["singleWords","repeatWords","transWords"],
			producers: ["sinewaves","noise","squarewaves","bells","ikeda"]
		}
	},
	{
		uid: "shadesOfGrey",
		name: "50 Shades of Grey",
		username: "50shadesofgrey",
		dp_url: "shades_of_grey.png",
		type: "background",
		collaborators: {
			creators: ["singleWords","repeatWords","primaryColors","mellowColors"],
			producers: ["sinewaves","noise","squarewaves","bells","ikeda"]
		}
		
	},
	{
		uid: "colorType",
		name: "Colorful Typography",
		username: "colorful_typography",
		dp_url: "words.png",
		type: "text",
		cocreators: {
			color: ["mellowColors","primaryColors"],
			text: ["singleWords","repeatWords"]
		},
		collaborators: {
			creators: ["shadesOfGrey","mellowColors","primaryColors"],
			producers: ["sinewaves","noise","squarewaves","bells","ikeda"]
		}
	},
	{
		uid: "singleWords",
		name: "Big Words",
		username: "wordsonscreen",
		dp_url: "words.png",
		type: "text",
		collaborators: {
			creators: ["shadesOfGrey","mellowColors","primaryColors"],
			producers: ["sinewaves","noise","squarewaves","bells","ikeda"]
		}
	},
	{
		uid: "repeatWords",
		name: "Words Repeated",
		username: "yeahx10",
		dp_url: "words.png",
		type: "text",
		collaborators: {
			creators: ["shadesOfGrey","primaryColors","mellowColors"],
			producers: ["sinewaves","noise","squarewaves","bells","ikeda"]
		}
	},
	{
		uid: "transWords",
		name: "Words of the World",
		username: "worldwords",
		dp_url: "words.png",
		type: "text",
		collaborators: {
			creators: ["shadesOfGrey","primaryColors","mellowColors"],
			producers: ["sinewaves","noise","squarewaves","bells","ikeda"]
		}
	}
]