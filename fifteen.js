var maxRandomMove = 100;
			var maxCellIndex = 3;
			var maxRowIndex = 3;
			var move = 0;
			var startTime;
			var endTime;
			function onCellClick(obj) {
				move++;
				document.getElementById("move").innerHTML= move;
				 
				//if clicked cell is empty cell do nothing
				if(obj.attributes["class"].value =="empty")
					return;
						
				var table = obj.parentNode.parentNode;
				
				var rowIndex = obj.parentNode.rowIndex;
				var cellIndex = obj.cellIndex;
				
				//check for right, left, top and bottom cell
				var rightCellIndex = cellIndex + 1;
				var leftCellIndex = cellIndex - 1;
				
				var topRowIndex = rowIndex - 1;
				var bottomRowIndex = rowIndex + 1;
				
				var rightCell, leftCell, topCell, bottomCell;
				// check if right cell exists
				if(cellIndex < maxCellIndex)
					rightCell = table.rows[rowIndex].cells[rightCellIndex];
					
				//check if left cell exists or not
				if(cellIndex > 0)
					leftCell = table.rows[rowIndex].cells[leftCellIndex];
					
				if(rowIndex > 0)
					topCell = table.rows[topRowIndex].cells[cellIndex];
				
				if(rowIndex < maxRowIndex)
					bottomCell = table.rows[bottomRowIndex].cells[cellIndex];
				
				//there are condition where no right , left, top and botton cell exists
				//process further only if the cells are valid
				
				var isValidMove = false;
				var cellToSwap = null;
				if(rightCell && rightCell.attributes["class"].value == "empty") {	
					isValidMove = true;
					cellToSwap = rightCell;
				}
				else if(leftCell && leftCell.attributes["class"].value == "empty") {
					isValidMove = true;
					cellToSwap = leftCell;
				}
				else if(topCell && topCell.attributes["class"].value == "empty") {
					isValidMove = true;
					cellToSwap = topCell;
				}
				else if(bottomCell && bottomCell.attributes["class"].value == "empty") {
					isValidMove = true;
					cellToSwap = bottomCell;
				}
				if(isValidMove) {
					//swap the cells
					var temp = cellToSwap.attributes["class"].value;
					var tempHtml = cellToSwap.innerHTML;
					
					var className = obj.attributes["class"].value;
					className = className.replace(" highlightTile","");
					
					cellToSwap.attributes["class"].value = className;
					cellToSwap.innerHTML = obj.innerHTML;
					
					
					obj.attributes["class"].value = temp;
					obj.innerHTML = tempHtml;
				}
				if(isArranged()) {
					 	var message = "Congratulations!!!";
						message = message+"\nYou finished with: "+move + " moves";
						var body = document.getElementsByTagName('body')[0];
						body.style.backgroundImage = "url('end.gif')" ;
						endTime = new Date();
						// time difference in ms
						var timeDiff = endTime - startTime;	
						timeDiff = timeDiff/1000;
						var seconds = Math.round(timeDiff % 60);
						message = message+"\nYour best time (sec): "+seconds;
						alert(message);
						document.getElementById("time").innerHTML= "\n\nTotal elapsed time(sec): " +seconds;
						document.getElementById("time").style.visibility = "visible";
						table.attributes["disabled"] = "disabled";
					 
					
				}
			}
			
			function isArranged() {
				var table= document.getElementById("puzzleTable");
				
				var lastCellClass = table.rows[maxRowIndex].cells[maxCellIndex].attributes["class"].value;
				
				if(lastCellClass != "empty")
					return false;
					
				//if last cell is empty then go ahead and check all the cells
				//whethere the are in arrange form or not.
				
				var counter = 1;
				var allArranged = true;
				for(var i = 0; i<= maxRowIndex;i++) {
					for(var j =0;j <= maxCellIndex ;j++) {
						//do not check last cell
						if(i != maxRowIndex || j != maxCellIndex) { 
							console.log("inner HTML = " + table.rows[i].cells[j].innerHTML);
							console.log("counter = " + counter);
							console.log("compare= " + table.rows[i].cells[j].innerHTML == counter);
							if(table.rows[i].cells[j].innerHTML != counter.toString()) {
								return false;
							}
						}
						counter++;
					}
				}
				// if we get here this means all test passed
				return true;
			}
			
			function getEmptyCell(table) {
				var emtpyCell;
				for(var i=0;i<table.rows.length;i++) {
					for(var j=0;j < table.rows[i].cells.length;j++) {
						if(table.rows[i].cells[j].attributes["class"].value=="empty") {
							emptyCell = table.rows[i].cells[j];
							break;
						}
					}
				}
				return emptyCell;
			}
			
			function getRandomMove(array) {
				var rand = array[Math.floor(Math.random() * array.length)];
				return rand;
			}
			function shuffle() {
				initialize();
				var table = document.getElementById("puzzleTable");
				for(var count = 0;count < maxRandomMove; count++) {
					var emptyCell = getEmptyCell(table);
					
					var emptyCellIndex = emptyCell.cellIndex;
					var emptyRowIndex = emptyCell.parentNode.rowIndex;
					
					var validMoves = [];
					
					//check for right, left, top and bottom cell
					var rightCellIndex = emptyCellIndex + 1;
					var leftCellIndex = emptyCellIndex - 1;
					
					var topRowIndex = emptyRowIndex - 1;
					var bottomRowIndex = emptyRowIndex + 1;
					
					var rightCell, leftCell, topCell, bottomCell;
					// check if right cell exists
					if(emptyCellIndex < maxCellIndex)
						validMoves.push(1);
						
					//check if left cell exists or not
					if(emptyCellIndex > 0)
						validMoves.push(3)
						
					if(emptyRowIndex > 0)
						validMoves.push(0)
					
					if(emptyRowIndex < maxRowIndex)
						validMoves.push(2);
					
					var randomMove = getRandomMove(validMoves);
					console.log(randomMove);
					//now move it
					var cellToMove ;
					if(randomMove == 0)
						cellToMove = table.rows[topRowIndex].cells[emptyCellIndex];
					else if(randomMove == 1 )
						cellToMove = table.rows[emptyRowIndex].cells[rightCellIndex];
					else if(randomMove == 2)
						cellToMove = table.rows[bottomRowIndex].cells[emptyCellIndex];
					else if(randomMove == 3)
						cellToMove = table.rows[emptyRowIndex].cells[leftCellIndex];
					
					
					var temp = emptyCell.attributes["class"].value;
					var tempHtml = emptyCell.innerHTML;
					emptyCell.attributes["class"].value = cellToMove.attributes["class"].value;
					emptyCell.innerHTML = cellToMove.innerHTML;
					
					cellToMove.attributes["class"].value = temp;
					cellToMove.innerHTML = tempHtml;
				}
				
			}
			
			function changeBackground(){
				var option = document.getElementById("changeBg");
				var val = option.options[option.selectedIndex].value;
				var body = document.getElementsByTagName('body')[0];
				if(val==0){
					window.location.href = "http://codd.cs.gsu.edu/~vhernandez1/Project3/Sports/fifteen.html";
				} 
				else if(val==1){
					window.location.href = "http://codd.cs.gsu.edu/~vhernandez1/Project3/Dance/fifteen.html";
				}
			
			}
			function initialize(){
			 	var body = document.getElementsByTagName('body')[0];
				body.style.backgroundImage = "url('background.jpg')" ;
				document.getElementById("move").innerHTML= "0";
				document.getElementById("time").style.visibility = "hidden";
				startTime = new Date();
			 
		 }
 