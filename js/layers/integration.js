addLayer("int", {
    name: "Int",
    symbol: "&#x222b;",
    position: 0,
    row: 2,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        value: new Decimal(0),
    }},
    nodeStyle() { return { "min-width": "200px", height: "200px", "font-size": "180px", "padding-left": "15px", "padding-right": "15px", "background-color": (colors[options.theme || "default"].background), "border-color": (colors[options.theme || "default"].background), color: (((tmp.timeSpeed||new Decimal(1)).gte(tmp[this.layer].requires)||player[this.layer].unlocked)?"white":"#8a2203"), "box-shadow": "none" }},
    color: "#909090",
    resource: "Integrations",
    baseResource: "Time Speed",
    baseAmount() { return tmp.timeSpeed||new Decimal(1) },
    type: "static",
    requires: new Decimal(1e7),
    base: ()=>new Decimal(10-3*hasAchievement('goals',86)-hasAchievement('goals',106)*2),
    exponent: new Decimal(1),
    layerShown() { return tmp.goals.unlocks>=6 },
    tooltipLocked() { return "Req: Time Speed ≥ "+formatWhole(tmp[this.layer].requires)+"x" },
    prestigeButtonText() {
        if (!player[this.layer].unlocked) return "Reset all previous variables to enter the realm of Integration"
        let text = "Reset for <b>"+formatWhole(tmp[this.layer].resetGain)+"</b> Integrations<br><br>";
        if (tmp[this.layer].canBuyMax) text += "Next: Time Speed ≥ "+format(tmp[this.layer].nextAtDisp)+"x"
        else text += "Req: Time Speed ≥ "+format(tmp[this.layer].nextAt)+"x"
        text += "<br>Req Base: "+format(tmp[this.layer].base)+"<br>Direct multiplier: "+format(tmp[this.layer].directMult)
        return text;
    },
    tabFormat: [
        "main-display",
        "prestige-button",
        "blank",
        ["display-text", function() { return "<h3>IP("+formatWhole(player[this.layer].points)+") = "+format(player[this.layer].value)+"</h3>" }],
        ["display-text", function() { return "IP(I) = "+tmp[this.layer].displayFormula }],
        "blank", "blank",
    ],
    update(diff) {
        player.int.value = tmp.int.calculateValue
    },
    calculateValue(I = player.int.points) {
        let IV=I.times(2).times(player.value.max(10).log10().log10().plus(1));
if(hasAchievement('goals',86))IV=new Decimal(2).mul(player.value.max(10).log10().log10().plus(1).pow(I.pow(0.6)));
if(hasAchievement('goals',106))IV=IV.mul(player.a.points.max(1).log(10).mul(player.b.points).mul(player.c.points).mul(player.d.points).add(1).pow(0.7))

if(inChallenge('d',11))IV=new Decimal(1);
return IV;
    },
    displayFormula() {
        let f = "2 × I × (log(log(n(t)) + 1)"
        if(hasAchievement('goals',86))f='2 × (log(log(n(t)) + 2)<sup>I<sup>0.6</sup></sup>'
if(hasAchievement('goals',106))f+=" × (log(A) × B × C × D + 1)<sup>0.7</sup>"
if(inChallenge('d',11))f='1';
        return f;
    },directMult:()=>(1+hasAchievement("goals", 94)/4)*(1+0.6*hasAchievement("goals", 116)),
autoPrestige:()=>hasAchievement("goals", 106),resetsNothing:()=>hasAchievement("goals", 115)
})