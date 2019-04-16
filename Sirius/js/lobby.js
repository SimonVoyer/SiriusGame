let toggleStatus;

window.onload = () => {
	let musicManager = new MusicManager();
	musicManager.playFallen();
	setTimeout(()=>gameListManager(),2000);
	setHeaderListeners();
	setTimeout(activateStatus, 2000);
	toggleStatus = toggleStatusBlock;
	let sheikahEye = new SheikahEye();
	sheikahEye.tick();
}

const parseUserInfo = userInfo => {
	console.log("in parse user info "+ userInfo);

	let container = document.getElementById("userInfoDiv");
	clearChildren(container);

	let userName = "Name: " + userInfo.name;
	let textNodeName = document.createTextNode(userName);
	let nameNode = document.createElement("div");
	nameNode.setAttribute("class", "userInfoValue");
	nameNode.appendChild(textNodeName);
	container.appendChild(nameNode);

	let userType = "Type: "+ userInfo.type;
	let textNodeType = document.createTextNode(userType);
	let typeNode = document.createElement("div");
	typeNode.setAttribute("class", "userInfoValue");
	typeNode.appendChild(textNodeType);
	container.appendChild(typeNode);

	let userLevel = "Magic Power Level: " + userInfo.level;
	let textNodeLevel = document.createTextNode(userLevel);
	let levelNode = document.createElement("div");
	levelNode.setAttribute("class", "userInfoValue");
	levelNode.appendChild(textNodeLevel);
	container.appendChild(levelNode);

	let userEnergy = "Arcane Energy Level: " + userInfo.char_energy;
	let textNodeEnergy = document.createTextNode(userEnergy);
	let energyNode = document.createElement("div");
	energyNode.setAttribute("class", "userInfoValue");
	energyNode.appendChild(textNodeEnergy);
	container.appendChild(energyNode);

	let nbOfVictory = "Number of Victories: " + userInfo.victories;
	let textNodeVictory = document.createTextNode(nbOfVictory);
	let victoryNode = document.createElement("div");
	victoryNode.setAttribute("class", "userInfoValue");
	victoryNode.appendChild(textNodeVictory);
	container.appendChild(victoryNode);

	let welcomeText = "Battlechant: " + userInfo.welcome_text;
	let textNodeWelcome = document.createTextNode(welcomeText);
	let welcomeNode = document.createElement("div");
	welcomeNode.setAttribute("class", "userInfoValue");
	welcomeNode.appendChild(textNodeWelcome);
	container.appendChild(welcomeNode);
}


const fetchUserInfo = () => {
	fetch("phpProcessing/userInfo.php", {
		credentials: 'include'})
	  .then(response => response.json())
	  .then(data => {
		console.log("data before parse= "+data);
		parseUserInfo(data);
		deactivateStatus();
	});
	toggleStatus();
}

const deactivateStatus = () => {
	setTimeout(() => activateStatus(), 2000);
	document.getElementById("status").removeEventListener("click", fetchUserInfo);
}

const activateStatus = () => {
	document.getElementById("status").addEventListener("click", fetchUserInfo);
}

const toggleStatusNone = () => {
	document.getElementById("statusDiv").style.display = "none";
	toggleStatus = toggleStatusBlock;
}

const toggleStatusBlock = () => {
	document.getElementById("statusDiv").style.display = "block";
	toggleStatus = toggleStatusNone;
}


const setClickListener = (node,id) => {
	node.onclick = () => {
		let formData = new FormData();
		formData.append("id", id);
		fetch("phpProcessing/joinGame.php", {
			method: "POST",
			credentials: 'include',
			body: formData
		}).then(response => response.json())
		.then(data => {
			if (data === "GAME_ENTERED") {
				window.location.href = "game.php";
			}
		})
	}
}

const gameListManager = () => {
	fetch("phpProcessing/availableGamesList.php", {
		credentials: 'include'})
	  .then(response => response.json())
	  .then(data => {
		  console.log(data);
		  let container = document.getElementById("gamesListContainer");
		  clearChildren(container);
		  data.forEach(gameJSON => {
			  let node = document.createElement("div");
			  node.setAttribute("class", "availableGame");
			  let nameDiv = document.createElement("div");
			  nameDiv.setAttribute("class", "content");
			  let hpDiv = document.createElement("div");
			  hpDiv.setAttribute("class", "content");
			  let typeDiv = document.createElement("div");
			  typeDiv.setAttribute("class", "content");
			  let countDiv = document.createElement("div");
			  countDiv.setAttribute("class", "content");
			  let expDiv = document.createElement("div");
			  expDiv.setAttribute("class", "content");
			  setClickListener(node,gameJSON.id);
			  let textNodeName = document.createTextNode(gameJSON.name);
			  let textNodeHP = document.createTextNode(gameJSON.hp);
			  let textNodeType = document.createTextNode(gameJSON.type);
			  let playerCount = gameJSON.nb + "  on  " + gameJSON.max_users;
			  let textNodeNB = document.createTextNode(playerCount);
			  let expCount  = "Experience: "+ gameJSON.exp;
			  let textNodeEXP = document.createTextNode(expCount);
			  nameDiv.appendChild(textNodeName);
			  hpDiv.appendChild(textNodeHP);
			  typeDiv.appendChild(textNodeType);
			  countDiv.appendChild(textNodeNB);
			  expDiv.appendChild(textNodeEXP);
			  node.append(nameDiv);
			  node.append(hpDiv);
			  node.appendChild(typeDiv);
			  node.appendChild(countDiv);
			  node.appendChild(expDiv);
			  container.appendChild(node);
		 });
		 setTimeout(()=>gameListManager(),2000);
	});
}
