addLayer("d", {
    name: "D",
    symbol() { return player[this.layer].unlocked?("d = "+format(player[this.layer].value)):"D" },
    position: 3,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),dcp:new Decimal(0)
    }},
    nodeStyle: { "min-width": "60px", height: "60px", "font-size": "30px", "padding-left": "15px", "padding-right": "15px" },
    color: "#a4b309",
    resource: "D-Power", 
    baseResource: "n", 
    baseAmount() {return player.value}, 
    type: "custom",
    requires() { return new Decimal('e7.25e16') },
    reqDiv() { 
        let div = new Decimal(1);
        return div;
    },
    base() {
        let base = new Decimal('ee16.2');
if(hasAchievement('goals',101))base=base.pow((0.99-8e-5*hasAchievement('goals',102)*tmp.goals.achsCompleted)**tmp.goals.achsCompleted);
if(hasAchievement('goals',104))base=base.root(new Decimal(2).pow(player.value.add(10).log(10).log(10).add(1).pow(3.5).log(2).div(10).pow(1.4)))
        return base;
    },
    exponent: new Decimal(3),
    costScalingStart() {
        let start = new Decimal(3)
        return start;
    },
    costScalingInc: new Decimal(.5),
    autoPrestige() { return false },
    resetsNothing() { return false },
    tooltipLocked() { return "Req: n(t) ≥ "+formatWhole(tmp[this.layer].requires) },
    canReset() { return tmp[this.layer].getResetGain.gte(1) },
    getResetGain() { 
        let gain = tmp[this.layer].baseAmount.times(tmp[this.layer].reqDiv).div(tmp[this.layer].requires).max(1).log(tmp[this.layer].base).root(tmp[this.layer].exponent)
        if (gain.gte(tmp[this.layer].costScalingStart)) gain = gain.pow(tmp[this.layer].exponent).log(tmp[this.layer].costScalingStart).sub(tmp[this.layer].exponent).div(tmp[this.layer].costScalingInc).plus(tmp[this.layer].costScalingStart).plus(1).floor().sub(player[this.layer].points).max(0)
        else gain = gain.plus(1).floor().sub(player[this.layer].points).max(0)
        if (!tmp[this.layer].canBuyMax) gain = gain.min(1);
        if (tmp[this.layer].baseAmount.times(tmp[this.layer].reqDiv).lt(tmp[this.layer].requires)) return new Decimal(0);
        return gain;
    },
    getNextAt(canBuyMax=false) {
        let amt = player[this.layer].points.plus((canBuyMax&&tmp[this.layer].baseAmount.gte(tmp[this.layer].nextAt))?tmp[this.layer].getResetGain:0)
        if (amt.gte(tmp[this.layer].costScalingStart)) return Decimal.pow(tmp[this.layer].base, tmp[this.layer].costScalingStart.pow(tmp[this.layer].exponent.plus(amt.sub(tmp[this.layer].costScalingStart).times(tmp[this.layer].costScalingInc)))).times(tmp[this.layer].requires).div(tmp[this.layer].reqDiv)
        else return Decimal.pow(tmp[this.layer].base, amt.pow(tmp[this.layer].exponent)).times(tmp[this.layer].requires).div(tmp[this.layer].reqDiv)
    },
    prestigeButtonText() {
        let text = "Reset for <b>"+formatWhole(tmp[this.layer].resetGain)+"</b> D-Power<br><br>";
        if (tmp[this.layer].canBuyMax) text += "Next: n(t) ≥ "+format(tmp[this.layer].nextAtDisp)
        else text += "Req: n(t) ≥ "+format(tmp[this.layer].getNextAt)
        text += "<br>Req Base: "+format(tmp[this.layer].base)
        text += "<br>Req Exponent: "+format(tmp[this.layer].exponent.plus(tmp[this.layer].costScalingInc.times(player[this.layer].points.sub(tmp[this.layer].costScalingStart)).max(0)))
        return text;
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "d", description: "D: Reset for D-Power", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown() { return tmp.goals.unlocks>=7 },
    tabFormat: [
        "main-display",
        "prestige-button",
        ["display-text", function() { return (player[this.layer].points.gte(tmp[this.layer].costScalingStart))?("After "+formatWhole(tmp[this.layer].costScalingStart)+" D-Power, each D-Power increases its requirement exponent by "+format(tmp[this.layer].costScalingInc)):"" }],
        "blank",
        ["display-text", function() { return "<h3>d("+formatWhole(player[this.layer].points)+") = "+format(player[this.layer].value)+"</h3>" }],
        ["display-text", function() { return "d(D) = "+tmp[this.layer].displayFormula }],
        "blank", "blank",['challenge',11],['raw-html',()=>(tmp.goals.unlocks<8?'':`You have <h2 style="color:rgb(200,200,0);text-shadow: rgb(200,200,0) 0px 0px 10px;">${formatWhole(player.d.dcp)}</h2> volts<br>they're gained in the discharger, based on n(t), time speed, & B-power<br>they're providing a ×${format(softcap(player.d.dcp.add(1).pow(0.1),new Decimal(1000),0.6))} boost to timespeed while discharged, unaffected by the ^0.1 ${player.d.dcp.add(1).pow(0.1).gte(1000)?'<b style="color:rgb(135,135,46);">(softcapped)</b>':''}`)],'buyables'
    ],update(diff){
        player[this.layer].value = tmp[this.layer].calculateValue
if(inChallenge('d',11))player.d.dcp=player.d.dcp.max(calculateValue(player.points.times(getTimeSpeed())).add(10).log(10).sub(5e6).max(0).div(2.5).add(getTimeSpeed().pow(2.2).sub(100**2.2).max(0)).div(1.6e5).add(1).pow(1.5).mul(player.b.points.add(1).pow(1/5.8).sub(1)).pow(8/3).sub(1).mul(tmp.d.buyables[11].effect).pow(hasAchievement("goals", 114)/10+1))
        },
    displayFormula() {
        let f = "D";
if(hasAchievement('goals',103))f+=' + log(Avolve + 1)'
if(inChallenge('d',11))f='1'
        return f;
    },
    calculateValue(D=player[this.layer].points) {
        let val = D;
if(hasAchievement('goals',103))val=val.add(player.a.avolve.add(1).log(10))
if(inChallenge('d',11))val=new Decimal(1);
        return val;
    },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > tmp[this.layer].row) layerDataReset(this.layer, [])
        else if (layers[resettingLayer].row == tmp[this.layer].row) {
            
        }
    },buyables: {
        rows: 1,
        cols: 1,
        11: {
            title() { return "volt gain<br>×"+format(tmp[this.layer].buyables[this.id].effect) +(tmp[this.layer].buyables[this.id].effect.gte(1e50)?'<b> (softcapped)</b>':'')},
            effBase() {
                let exp = new Decimal(3);
                if (hasAchievement("goals", 114)) exp = exp.mul(5/3);
if(hasAchievement("goals", 115))exp=exp.add(tmp.goals.achsCompleted*.03);
                return exp;
            },
            effect() { 
                let eff =tmp[this.layer].buyables[this.id].effBase.pow(player[this.layer].buyables[this.id]);
                return softcap(eff,new Decimal(1e50),0.42069);
            },
            cost(x=player[this.layer].buyables[this.id]) { return Decimal.pow(10, x.mul(1.5**.5)).times(1e9).ceil() },
            target(r=player[this.layer].dcp) { return r.div(1e9).max(1).log(10).div(1.5**.5).plus(1).floor() },
            display() { return "Level: "+formatWhole(player[this.layer].buyables[this.id])+"<br>Req: "+formatWhole(tmp[this.layer].buyables[this.id].cost)+" volts" },
            canAfford() { return player[this.layer].dcp.gte(layers[this.layer].buyables[this.id].cost()) },
            buy() { 
                if (hasAchievement("goals", 199)) {
                    layers[this.layer].buyables[this.id].buyMax();
                    return;
                }
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].plus(1);
            },
            buyMax() {
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(tmp[this.layer].buyables[this.id].target)
            },
            unlocked() { return player.d.unlocked },style:{
            width: "140px",
            height: "100px",
            "border-radius": "5%",
            "z-index": "1",
        }
        },  
    },canBuyMax:true,challenges:{11:{name:'the discharger',fullDisplay:'B-power and C-power scaling start 3x earlier and is 7x stronger, A-power is a constant 100, time speed, Avolve and batteries does nothing, buying max is disabled, & your intergrations & D-power does nothing (IP & d is fixed at 1).<br>entering will reset A-power, B-power, & C-power.',canComplete:false,unlocked:()=>tmp.goals.unlocks>=8,
onEnter(){player.a.points=new Decimal(100);player.b.points=player.c.points=player.a.avolve=new Decimal(0)},style:{height:'225px'}}}
})