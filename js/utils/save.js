//cripto.js goes here:
var B="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",C=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,-1,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-1,-1,-1,-1,-1];function O(r){var t,i,e,n,o,h;for(e=r.length,i=0,t="";i<e;){if(n=255&r.charCodeAt(i++),i==e){t+=B.charAt(n>>2),t+=B.charAt((3&n)<<4),t+="==";break}if(o=r.charCodeAt(i++),i==e){t+=B.charAt(n>>2),t+=B.charAt((3&n)<<4|(240&o)>>4),t+=B.charAt((15&o)<<2),t+="=";break}h=r.charCodeAt(i++),t+=B.charAt(n>>2),t+=B.charAt((3&n)<<4|(240&o)>>4),t+=B.charAt((15&o)<<2|(192&h)>>6),t+=B.charAt(63&h)}return t}function R(r){var t,i,e,n,o,h,a,c;for(h=r.length,o=0,a="";o<h;){do{t=C[255&r.charCodeAt(o++)]}while(o<h&&-1==t);if(-1==t)break;do{i=C[255&r.charCodeAt(o++)]}while(o<h&&-1==i);if(-1==i)break;c=t<<2|(48&i)>>4,a+=String.fromCharCode(c);do{if(61==(e=255&r.charCodeAt(o++)))return a;e=C[e]}while(o<h&&-1==e);if(-1==e)break;c=(15&i)<<4|(60&e)>>2,a+=String.fromCharCode(c);do{if(61==(n=255&r.charCodeAt(o++)))return a;n=C[n]}while(o<h&&-1==n);if(-1==n)break;c=(3&e)<<6|n,a+=String.fromCharCode(c)}return a}function encode(r){let t;return O((t=genKey())+encrypt(r,t))}function decode(r){let t,i;return i=(r=R(r)).charCodeAt(0),t=r.substr(0,i+2),i=r.substr(i+2),decrypt(i,new key(t))}ED_lib=function(e){let n={};for(random=e.random=n.random=function(e){for(r=[],t=[],e>16384&&(r=random(e-16384).concat(random(16384)),e=0),e<16385&&(t=crypto.getRandomValues(new Uint8Array(e))),i=0;i<e;i++)r.push(t[i]);return r},z=[223,128,8,69,106,145,85,108,5,244,185,105,253,102,231,207,97,44,147,117,38,60,189,20,166,209,196,224,237,95,100,136,91,176,190,200,62,32,101,76,167,77,99,226,129,247,26,217,242,56,51,142,229,254,25,154,173,15,206,202,21,220,83,125,17,179,174,192,186,90,130,80,233,114,115,46,50,28,158,40,141,9,236,144,19,14,235,24,191,11,71,6,241,193,7,178,180,169,216,116,140,170,64,135,122,138,232,255,175,197,29,195,210,94,39,16,1,59,34,61,42,134,86,133,75,112,73,79,126,43,49,72,177,219,245,249,172,215,137,2,96,171,188,213,52,225,113,27,194,230,127,87,152,30,156,234,165,164,228,57,181,150,151,89,103,119,63,252,66,70,82,162,45,139,187,159,74,183,120,3,148,0,93,201,54,211,37,160,111,163,41,243,109,153,110,143,107,81,47,22,198,161,92,218,36,84,18,4,131,88,55,78,248,98,251,53,31,222,13,204,12,149,58,157,227,182,250,124,65,212,68,240,121,199,246,132,184,33,238,23,67,10,221,168,214,203,208,155,118,123,104,35,146,205,239,48],j={},i=0;i<256;i++)j[-z[i]]=i,j[i]=z[i];n.map=j;class o{constructor(r,t=0){if("string"==typeof r){try{let t=r.substr(2),e=r.charCodeAt(0),n=r.charCodeAt(1),o=[];for(i=0;i<t.length;i++)o.push(t.charCodeAt(i));return this.z=o,this.u=e,this.x=n,this}catch(r){throw"string is not a valid key"}if(this.u!=this.z.length)throw"sequence length isn't matched";return this}return this.z=r,this.u=r.length,this.x=t,this}toString(){let r=String.fromCharCode(this.u),t=String.fromCharCode(this.x);for(i=0;i<this.u;i++)t+=String.fromCharCode(this.z[i]);return r+t}}return genKey=e.genKey=n.genKey=function(r){return null==r&&(r=128+(127&random(1)[0])),new o(random(r),random(1)[0])},e.encrypt=n.encrypt=encrypt=function(r,t){if(null==t.z)throw"$ is not a key or string";let e=[],n="";for(i=0;i<r.length;i++)e.push(j[-r.charCodeAt(i)]^t.x);for(i=0;i<r.length;i++)e[i]=(i?e[i-1]:0)+e[i]&255;for(i=0;i<r.length;i++)e[i]=e[i]^255&t.z[i%t.u];for(i=0;i<r.length;i++)n+=String.fromCharCode(e[i]);return n},e.decrypt=n.decrypt=decrypt=function(r,t){if(null==t.z)throw"$ is not a key or string";let e=[],n=[];for(i=0;i<r.length;i++)n.push(r.charCodeAt(i)^255&t.z[i%t.u]);for(i=0;i<n.length;i++)e.push(n[i]-(i?n[i-1]:0)+256);for(i=0;i<e.length;i++)e[i]=e[i]+256&255;for(i=0;i<e.length;i++)e[i]=String.fromCharCode(j[e[i]^t.x]);return e.join("")},e.key=n.key=o,n}(this);
// ************ Save stuff ************
function save(force) {
	NaNcheck(player)
	if (NaNalert && !force) return
	localStorage.setItem(modInfo.id, encode(JSON.stringify(player)));
	localStorage.setItem(modInfo.id+"_options", encode(JSON.stringify(options)));

}
function startPlayerBase() {
	return {
		tab: layoutInfo.startTab,
		navTab: (layoutInfo.showTree ? layoutInfo.startNavTab : "none"),
		time: Date.now(),
		notify: {},
		versionType: modInfo.id,
		version: VERSION.num,
		beta: VERSION.beta,
		timePlayed: 0,
		keepGoing: false,
		hasNaN: false,

		points: modInfo.initialStartPoints,
		subtabs: {},
		lastSafeTab: (readData(layoutInfo.showTree) ? "none" : layoutInfo.startTab)
	};
}
function getStartPlayer() {
	playerdata = startPlayerBase();

	if (addedPlayerData) {
		extradata = addedPlayerData();
		for (thing in extradata)
			playerdata[thing] = extradata[thing];
	}

	playerdata.infoboxes = {};
	for (layer in layers) {
		playerdata[layer] = getStartLayerData(layer);

		if (layers[layer].tabFormat && !Array.isArray(layers[layer].tabFormat)) {
			playerdata.subtabs[layer] = {};
			playerdata.subtabs[layer].mainTabs = Object.keys(layers[layer].tabFormat)[0];
		}
		if (layers[layer].microtabs) {
			if (playerdata.subtabs[layer] == undefined)
				playerdata.subtabs[layer] = {};
			for (item in layers[layer].microtabs)
				playerdata.subtabs[layer][item] = Object.keys(layers[layer].microtabs[item])[0];
		}
		if (layers[layer].infoboxes) {
			if (playerdata.infoboxes[layer] == undefined)
				playerdata.infoboxes[layer] = {};
			for (item in layers[layer].infoboxes)
				playerdata.infoboxes[layer][item] = false;
		}

	}
	return playerdata;
}
function getStartLayerData(layer) {
	layerdata = {};
	if (layers[layer].startData)
		layerdata = layers[layer].startData();

	if (layerdata.unlocked === undefined)
		layerdata.unlocked = true;
	if (layerdata.total === undefined)
		layerdata.total = decimalZero;
	if (layerdata.best === undefined)
		layerdata.best = decimalZero;
	if (layerdata.resetTime === undefined)
		layerdata.resetTime = 0;
	if (layerdata.forceTooltip === undefined)
		layerdata.forceTooltip = false;

	layerdata.buyables = getStartBuyables(layer);
	if (layerdata.noRespecConfirm === undefined) layerdata.noRespecConfirm = false
	if (layerdata.clickables == undefined)
		layerdata.clickables = getStartClickables(layer);
	layerdata.spentOnBuyables = decimalZero;
	layerdata.upgrades = [];
	layerdata.milestones = [];
	layerdata.lastMilestone = null;
	layerdata.achievements = [];
	layerdata.challenges = getStartChallenges(layer);
	layerdata.grid = getStartGrid(layer);
	layerdata.prevTab = ""

	return layerdata;
}
function getStartBuyables(layer) {
	let data = {};
	if (layers[layer].buyables) {
		for (id in layers[layer].buyables)
			if (isPlainObject(layers[layer].buyables[id]))
				data[id] = decimalZero;
	}
	return data;
}
function getStartClickables(layer) {
	let data = {};
	if (layers[layer].clickables) {
		for (id in layers[layer].clickables)
			if (isPlainObject(layers[layer].clickables[id]))
				data[id] = "";
	}
	return data;
}
function getStartChallenges(layer) {
	let data = {};
	if (layers[layer].challenges) {
		for (id in layers[layer].challenges)
			if (isPlainObject(layers[layer].challenges[id]))
				data[id] = 0;
	}
	return data;
}
function getStartGrid(layer) {
	let data = {};
	if (! layers[layer].grid) return data
	if (layers[layer].grid.maxRows === undefined) layers[layer].grid.maxRows=layers[layer].grid.rows
	if (layers[layer].grid.maxCols === undefined) layers[layer].grid.maxCols=layers[layer].grid.cols

	for (let y = 1; y <= layers[layer].grid.maxRows; y++) {
		for (let x = 1; x <= layers[layer].grid.maxCols; x++) {
			data[100*y + x] = layers[layer].grid.getStartData(100*y + x)
		}
	}
	return data;
}

function fixSave() {
	defaultData = getStartPlayer();
	fixData(defaultData, player);

	for (layer in layers) {
		if (player[layer].best !== undefined)
			player[layer].best = new Decimal(player[layer].best);
		if (player[layer].total !== undefined)
			player[layer].total = new Decimal(player[layer].total);

		if (layers[layer].tabFormat && !Array.isArray(layers[layer].tabFormat)) {

			if (!Object.keys(layers[layer].tabFormat).includes(player.subtabs[layer].mainTabs))
				player.subtabs[layer].mainTabs = Object.keys(layers[layer].tabFormat)[0];
		}
		if (layers[layer].microtabs) {
			for (item in layers[layer].microtabs)
				if (!Object.keys(layers[layer].microtabs[item]).includes(player.subtabs[layer][item]))
					player.subtabs[layer][item] = Object.keys(layers[layer].microtabs[item])[0];
		}
	}
}
function fixData(defaultData, newData) {
	for (item in defaultData) {
		if (defaultData[item] == null) {
			if (newData[item] === undefined)
				newData[item] = null;
		}
		else if (Array.isArray(defaultData[item])) {
			if (newData[item] === undefined)
				newData[item] = defaultData[item];

			else
				fixData(defaultData[item], newData[item]);
		}
		else if (defaultData[item] instanceof Decimal) { // Convert to Decimal
			if (newData[item] === undefined)
				newData[item] = defaultData[item];

			else
				newData[item] = new Decimal(newData[item]);
		}
		else if ((!!defaultData[item]) && (typeof defaultData[item] === "object")) {
			if (newData[item] === undefined || (typeof defaultData[item] !== "object"))
				newData[item] = defaultData[item];

			else
				fixData(defaultData[item], newData[item]);
		}
		else {
			if (newData[item] === undefined)
				newData[item] = defaultData[item];
		}
	}
}
function load() {
	let get = localStorage.getItem(modInfo.id);

	if (get === null || get === undefined) {
		player = getStartPlayer();
		options = getStartOptions();
	}
	else {
		player = Object.assign(getStartPlayer(), JSON.parse(decode(get)));
		fixSave();
		loadOptions();
	}

	if (options.offlineProd) {
		if (player.offTime === undefined)
			player.offTime = { remain: 0 };
		player.offTime.remain += (Date.now() - player.time) / 1000;
	}
	player.time = Date.now();
	versionCheck();
	changeTheme();
	changeTreeQuality();
	updateLayers();
	setupModInfo();

	setupTemp();
	updateTemp();
	updateTemp();
	updateTabFormats()
	loadVue();
}

function loadOptions() {
	let get2 = localStorage.getItem(modInfo.id+"_options");
	if (get2) 
		options = Object.assign(getStartOptions(), JSON.parse(decode(get2)));
	else 
		options = getStartOptions()
	if (themes.indexOf(options.theme) < 0) theme = "default"
	fixData(options, getStartOptions())

}

function setupModInfo() {
	modInfo.changelog = changelog;
	modInfo.winText = winText ? winText : `Congratulations! You have reached the end and beaten this game, but for now...`;

}
function fixNaNs() {
	NaNcheck(player);
}
function NaNcheck(data) {
	for (item in data) {
		if (data[item] == null) {
		}
		else if (Array.isArray(data[item])) {
			NaNcheck(data[item]);
		}
		else if (data[item] !== data[item] || checkDecimalNaN(data[item])) {
			if (!NaNalert) {
				clearInterval(interval);
				NaNalert = true;
				alert("Invalid value found in player, named '" + item + "'. Please let the creator of this mod know! You can refresh the page, and you will be un-NaNed.")
				return
			}
		}
		else if (data[item] instanceof Decimal) {
		}
		else if ((!!data[item]) && (data[item].constructor === Object)) {
			NaNcheck(data[item]);
		}
	}
}
function exportSave() {
	//if (NaNalert) return
	let str = encode(JSON.stringify(player));

	const el = document.createElement("textarea");
	el.value = str;
	document.body.appendChild(el);
	el.select();
	el.setSelectionRange(0, 99999);
	document.execCommand("copy");
	document.body.removeChild(el);
}
function importSave(imported = undefined, forced = false) {
	if (imported === undefined)
		imported = prompt("Paste your save here");
	try {
		tempPlr = Object.assign(getStartPlayer(), JSON.parse(decode(imported)));
		if (tempPlr.versionType != modInfo.id && !forced && !confirm("This save appears to be for a different mod! Are you sure you want to import?")) // Wrong save (use "Forced" to force it to accept.)
			return;
		player = tempPlr;
		player.versionType = modInfo.id;
		fixSave();
		versionCheck();
		NaNcheck(save)
		save();
		window.location.reload();
	} catch (e) {
		return;
	}
}
function versionCheck() {
	let setVersion = true;

	if (player.versionType === undefined || player.version === undefined) {
		player.versionType = modInfo.id;
		player.version = 0;
	}

	if (setVersion) {
		if (player.versionType == modInfo.id && VERSION.num > player.version) {
			player.keepGoing = false;
			if (fixOldSave)
				fixOldSave(player.version);
		}
		player.versionType = getStartPlayer().versionType;
		player.version = VERSION.num;
		player.beta = VERSION.beta;
	}
}
var saveInterval = setInterval(function () {
	if (player === undefined)
		return;
	if (tmp.gameEnded && !player.keepGoing)
		return;
	if (options.autosave)
		save();
}, 5000);

window.onbeforeunload = () => {
    if (player.autosave) {
        save();
    }
};