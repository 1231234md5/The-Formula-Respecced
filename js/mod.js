let modInfo = {
	name: "The Formula",
	id: "formula_tree_game",
	author: "Jacorb90",
	pointsName: "time",
	modFiles: ["layers/a.js", "layers/b.js", "layers/c.js", "layers/goals.js", "layers/integration.js", "tree.js","layers/d.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal(0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

function displayFormula() {
	let f = "t"
	let expData = [player.b.unlocked, player.c.unlocked, hasAchievement("goals", 62)]
	if (expData.some(x => x)) {
		f += "<sup>";
		if (expData[0]) {
			let extraExp = "1"
			if (expData[2]) extraExp = "log(a + 1) + 1"
			f += "(b + "
			if (expData[1]) f += formatWhole(tmp.c.coefficientInMainFormula)+" × c + "+extraExp+")"
			else f += extraExp+")"
		} else if (expData[1]) f += "(2 × c + "+(expData[2]?"log(a + 1) + 1":"1")+")"
		else f = "(log(a + 1) + 1)"
if(player.d.unocked)f+='× (d + 1)'
		f += "</sup>";
	}

	f += " × a";
	if (hasAchievement("goals", 45) && tmp.b.batteriesUnl) f += " × B<sub>201</sub>";
	if (hasAchievement("goals", 15)) f += " × Goals";
if (hasAchievement("goals", 112)&&inChallenge('d',11))f+=' × 1e2,000,000';
	return f;
}

function displayIntFormula() {
	let f = "t"
	let exp = ""
	let expData = [player.b.unlocked, player.c.unlocked, hasAchievement("goals", 62)]
	if (expData.some(x => x)) {
		if (expData[0]) {
			let extraExp = "IP + 2"
			if (expData[2]) extraExp = "log(a + 1) + IP + 2"
			exp += "(b + "
			if (expData[1]) exp += formatWhole(tmp.c.coefficientInMainFormula)+" × c + "+extraExp+")"
			else exp += extraExp+")"
		} else if (expData[1]) exp += "(2 × c + "+(expData[2]?"log(a + 1) + 2":"2")+")"
		else exp = "(log(a + 1) + 2)"
if(player.d.unlocked)exp+=' × (d + 1)';
	}
	f += "<sup>"+exp+"</sup>"

	f += " × a";
	if (hasAchievement("goals", 45) && tmp.b.batteriesUnl) f += " × B<sub>201</sub>";
	if (hasAchievement("goals", 15)) f += " × Goals";
	f += " ÷ (IP - 1)!"
if (hasAchievement("goals", 112)&&inChallenge('d',11))f+=' × 1e2,000,000';
	return f;
}

function calculateValue(t) {
	if (player.int.unlocked && player.int.value.gt(0)) {
		let val = t.pow(player.int.value).div(player.int.value.sub(1).factorial())

		let extraExp = hasAchievement("goals", 62)?player.a.value.plus(1).log10().plus(2):new Decimal(2)
		let exp = (player.b.unlocked?player.b.value.plus(extraExp):extraExp).plus(player.c.unlocked?player.c.value.times(tmp.c.coefficientInMainFormula):0).mul(new Decimal(player.d.value).add(1))
		if (hasAchievement("goals", 62)||player.b.unlocked||player.c.unlocked) t = t.pow((player.b.unlocked||player.c.unlocked)?exp:extraExp).div((player.b.unlocked||player.c.unlocked)?exp:extraExp)

		val = val.times(player.a.value).times(t);
		if (hasAchievement("goals", 45) && tmp.b.batteriesUnl) val = val.times(gridEffect("b", 201));
		if (hasAchievement("goals", 15)) val = val.times(tmp.goals.achsCompleted);
if (hasAchievement("goals", 112)&&inChallenge('d',11))val=val.mul('e2e6');
if(player.d.modifiers[0]&&inChallenge('d',11))val=val.add(1).log(10).pow(.5).layeradd10(1).sub(1);
if(player.d.modifiers[1]&&inChallenge('d',11))val=val.add(1).log(10).pow(.8).layeradd10(1).sub(1);
		return val;
	} else {
		let extraExp = hasAchievement("goals", 62)?player.a.value.plus(1).log10().plus(1):new Decimal(1)
		let exp = (player.b.unlocked?player.b.value.plus(extraExp):extraExp).plus(player.c.unlocked?player.c.value.times(tmp.c.coefficientInMainFormula):0).mul(new Decimal(player.d.value).add(1))
		if (hasAchievement("goals", 62)||player.b.unlocked||player.c.unlocked) t = t.pow((player.b.unlocked||player.c.unlocked)?exp:extraExp)

		let val = player.a.value.times(t);
		if (hasAchievement("goals", 45) && tmp.b.batteriesUnl) val = val.times(gridEffect("b", 201));
		if (hasAchievement("goals", 15)) val = val.times(tmp.goals.achsCompleted);
if (hasAchievement("goals", 112)&&inChallenge('d',11))val=val.mul('e2e6');
if(player.d.modifiers[0]&&inChallenge('d',11))val=val.add(1).log(10).pow(.5).layeradd10(1).sub(1);
if(player.d.modifiers[1]&&inChallenge('d',11))val=val.add(1).log(10).pow(.8).layeradd10(1).sub(1);
		return val;
	}
}

function updateValue() {
	player.value = calculateValue(player.points.times(tmp.timeSpeed));
}

// Set your version in num and name
let VERSION = {
	num: "0.1.3",
	name: "even more letters",
}

let changelog = `<h1>Changelog:</h1><br><br>\
<h3>v0.1.3 - even more letters</h3><br>
- Implemented D-power, the discharger & volts<br>
- Balanced up to ??? goals coompleted<br><br><br>
	<h3>v0.1.2 - Integrate and Weep</h3><br>
		- Implemented Integration<br>
		- Balanced up to 47 Goals completed<br>
	<br><br>
	<h3>v0.1.1 - More Letters, More Fun</h3><br>
		- Implemented C-Power & The Clock<br>
		- Balanced up to 36 Goals completed<br>
	<br><br>
	<h3>v0.1 - Learning Our Letters</h3><br>
		- Set up basic stuff.<br>
		- Implemented A-Power & Avolve<br>
		- Implemented Goals<br>
		- Implemented B-Power & Batteries<br>
		- Balanced up to 19 Goals completed<br>`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = [ "fullClockUpdate", "buyMax"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

function getTimeSpeed() {
if(inChallenge('d',11)&&(!hasAchievement('goals',113)||player.d.modifiers[1]))return new Decimal(1);
	let spd = new Decimal(1);
	if (hasAchievement("goals", 36)) spd = spd.times(tmp.goals.goal36eff);
	if (hasAchievement("goals", 53) && tmp.b.batteriesUnl) spd = spd.times(gridEffect("b", 302))
	if (tmp.c.clockUnl) spd = spd.times(tmp.c.clockMult);
	if (hasAchievement("goals", 66)) spd = spd.times(tmp.goals.achsCompleted)
	else {
		if (hasAchievement("goals", 62)) spd = spd.times(2);
		if (hasAchievement("goals", 65)) spd = spd.times(2);
	}
	if (hasAchievement("goals", 72)) spd = spd.times(player.int.value.max(1))
	if (hasAchievement("goals", 95)) spd = spd.times(player.c.value.add(1))
	if (hasAchievement("goals", 101)&&player.d.value instanceof Decimal) spd = spd.times(player.d.value.pow(2.5).mul(player.d.points.pow(3)).add(1))
if (hasAchievement("goals", 113))spd=spd.mul(player.a.value.max(10).log(10).pow(.55))
if(inChallenge('d',11)||hasAchievement("goals", 115))spd=spd.pow(1-.9*inChallenge('d',11)).mul(softcap(player.d.dcp.add(1).pow(0.1),new Decimal(1000),0.6))
if(player.d.modifiers[0]&&inChallenge('d',11))spd=spd.add(1).log(10).pow(.5).layeradd10(1).sub(1);
if(hasAchievement("goals", 131))spd=spd.mul(player.value.add(10).log(10).pow(2.5))
	return spd;
}

function getTimeSpeedFormula() {
	let f = ""
	if (hasAchievement("goals", 36)) f = '"Definitely a Bee Joke"'
	if (hasAchievement("goals", 53)) f += " × B<sub>302</sub>"
	if (tmp.c.clockUnl) f += (f.length>0?" × ":"")+"Days Effect"
	if (hasAchievement("goals", 66)) f += (f.length>0?" × ":"")+"Goals"
	else if (hasAchievement("goals", 62)) f += (f.length>0?" × ":"")+(hasAchievement("goals", 65)?"4":"2")
	if (hasAchievement("goals", 72)) f += (f.length>0?" × ":"")+"IP"
	if (hasAchievement("goals", 95))f+=' × (c + 1)'
if (hasAchievement("goals", 101))f+=' × (D<sup>3</sup> × d<sup>2.5</sup> + 1)'
if (hasAchievement("goals", 113))f+=' × log(a)<sup>0.55</sup>'
if(inChallenge('d',11))f='('+f+')<sup>0.1</sup>'
if(inChallenge('d',11)||hasAchievement("goals", 115))f+=' × volt effect'
if(hasAchievement("goals", 131))f+=' × log(n(t))<sup>2.5</sup>'
	return f;
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	return gain
}

function gainPoints(diff) {
	player.points = player.points.add(tmp.pointGen.times(diff)).max(0)
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
	value: new Decimal(0),
}}

// Display extra things at the top of the page
var displayThings = [
	function() {
		if (tmp.timeSpeed.eq(1)) return;
		else return "timespeed = "+getTimeSpeedFormula();
	}
]

// Determines when the game "ends"
function isEndgame() {
	return false
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}