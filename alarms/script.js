const alarms = [
	{
		grade: "6th Grade",
		year: "2022-2023",
		items: [
			{
				title: "The Adventure Begins",
				time: "7:45 AM",
				description: "This is 'The Adventure Begins' (The Union Proclaimed) by Philip Ayers. I found it watching a rekrap2 video he used when stealing 500 anvils?, I think.",
				file: "audio/The_Adventure_Begins.m4a"
			}
		]
	},
	{
		grade: "7th Grade",
		year: "2023-3024",
		items: [
			{
				title: "Anticipation & Excitement",
				time: "8:00 AM",
				description: "This is 'Anticipation & Excitement' by Thomas Bergersen. I, most likely, also found it from a YouTube video (Hermitcraft series member) but don't exactly know. Please let me know if anyone finds out!",
				file: "audio/Anticipation_Excitement.m4a"
			}
		]
	},
	{
		grade: "8th Grade",
		year: "2024-2025",
		items: [
			{
				title: "Tiger Tracks",
				time: "8:00 AM",
				description: "Now we have 'Tiger Tracks' by Lexica. They mostly create video game style music and found this from a video by rekrap2, once again! He uses good music!",
				file: "audio/Tiger_Tracks.m4a"
			}
		]
	},
	{
		grade: "9th Grade",
		year: "2025-PRESENT",
		items: [
			{
				title: "Arcadewave",
				time: "6:30 AM",
				description: "The alarm as of making this website is 'Arcadewave' by Lupus Nocte. I might watch too much YouTube but ImpulseSV used to use it, Grian uses it for HC11 timelapses, and Jimmy during livestreams.",
				file: "audio/Arcadewave.m4a"
			}
		]
	}
];

const archive = document.getElementById("archive");

alarms.forEach(section => {
	const gradeDiv = document.createElement("div");
	gradeDiv.className = "grade";

	gradeDiv.innerHTML = `
		<h2>
			${section.grade}
			<span style="font-size:0.8em;color:#94a3b8">
				(${section.year})
			</span>
		</h2>
	`;

	section.items.forEach(alarm => {
		const alarmDiv = document.createElement("div");
		alarmDiv.className = "alarm";

		alarmDiv.innerHTML = `
			<h3>${alarm.title}</h3>
			<div class="meta">${alarm.time}</div>
			<p>${alarm.description}</p>
			<audio controls src="${alarm.file}"></audio>
		`;

		gradeDiv.appendChild(alarmDiv);
	});

	archive.appendChild(gradeDiv);
});
