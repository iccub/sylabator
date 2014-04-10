function countSyllabes()
{
	var table = document.getElementById("countInputsTable");

	while(table.hasChildNodes()) {
		table.removeChild(table.firstChild);
	}

	var notepadText = document.getElementById("notes");
	var arrayOfLines = notepadText.value.split("\n");

	for (var i = 0; i < arrayOfLines.length; i++) {
		var row = table.insertRow(i);
		var cell1 = row.insertCell(0);



		cell1.innerHTML = countLineSyllabes(arrayOfLines[i]);
		setCounterColor(cell1);

	}

}

function setCounterColor(cell) {
	var number = 0;
	number = cell.innerHTML;
	var diffBetweenTargetCount = Math.abs(document.getElementById('slider').value - number);
	
	var g = 255 - diffBetweenTargetCount * 40;
	var r = 0 + diffBetweenTargetCount * 40;
	var color = "rgb(" + r +"," + g +" ,100)";

	cell.style.color = color; 
}

function countLineSyllabes (lineOfText) {
	var temp = 0;

	//slowo
	var word = lineOfText.match(/\S+/g);
	if (word != null) {
		for(var i = 0; i < word.length; i++) {			
			var vowelCount = word[i].match(/[aeiouyąęó]/gi);

			if (vowelCount != null) {
				temp += vowelCount.length;
			};

			/*Samogloski po 'i' nie sa wyodrebniane jako nowe sylaby
			* np. 'Ziemia' ma 2 sylaby, a 4 samogloski
			*
			*/

			var count_of_i = word[i].toLowerCase().split(/[i]/g);
			if (count_of_i != null && count_of_i.length > 1) {
				for (var j = 1; j < count_of_i.length; j++) {
					var nextLetter = count_of_i[j][0];
					if (nextLetter != null) {
						if(nextLetter.match(/[aeiouąęó]/gi) != null) 
							temp--;						
					};
				};
			};
		}
	}

	if (temp != 0) 
		return temp;
	else
		return "-";
}

function updateSyllabeCount() {
	document.getElementById('syllabeCounter').innerHTML= document.getElementById('slider').value; 
}

function save()
{
	var content = document.getElementById("notes").value;
	var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
	saveAs(blob, "tekst.txt");
}