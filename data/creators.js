export default [
	{
		uid: "primaryColors",
		name: "Primary Colors",
		username: "primary_colors",
		dp_url: "primary_colors.png",
		type: "background",
		collaborators: {
			creators: ["singleWords","shadesOfGrey","mellowColors","repeatWords"],
			producers: ["sinewaves","squarewaves","noise"]
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
			producers: ["sinewaves","noise","squarewaves"]
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
			producers: ["sinewaves","noise","squarewaves"]
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
			producers: ["sinewaves","noise","squarewaves"]
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
			producers: ["noise","squarewaves","sinewaves"]
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
			producers: ["noise","squarewaves","sinewaves"]
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
			producers: ["noise","squarewaves","sinewaves"]
		}
	}
]