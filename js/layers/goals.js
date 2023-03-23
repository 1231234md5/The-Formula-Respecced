addLayer("goals", {
    name: "goals",
    image: "resources/goal.png",
    row: "side",
    startData() { return {
        unlocked: true,
        achievements: [],
    }},
    tooltip() { return formatWhole(tmp[this.layer].achsCompleted)+" Goals completed" },
    color: "#cbff3b",
    tabFormat: [
        "blank",
        ["display-text", function() { return "<h3>You have completed <span style='color: "+tmp[this.layer].color+"; font-size: 25px;'>"+formatWhole(tmp[this.layer].achsCompleted)+"</span> Goals.</h3>" }],
        "blank", "buyables", 
        "blank", "blank", "blank",
        "achievements",
    ],
    goal36power() { 
        let power = new Decimal(hasAchievement("goals", 42)?2:1);
        if (hasAchievement("goals", 45) && tmp.b.batteriesUnl) power = power.times(gridEffect("b", 203));
        if (hasAchievement("goals", 54)) power = power.times(3)
        if (hasAchievement("goals", 71)) power = power.times(3.6)
        return power;
    },
    goal36decayrate() {
        let rate = new Decimal(hasAchievement("goals", 42)?(1/4):1);
        if (hasAchievement("goals", 54)) rate = rate.times(10)
        if (hasAchievement("goals", 71)) rate = rate.times(2)
        return rate.times(tmp.goals.goal36power)
    },
    goal36eff() {
        let pow = tmp.goals.goal36power
		let decay = tmp.goals.goal36decayrate
		let p = player.points.times(decay);
		if (p.gte(50)) p = p.div(2).plus(25);
		if (p.gte(65)) p = p.div(2).plus(32.5);
		if (p.gte(75)) p = p.times(5625).cbrt();
		return Decimal.sub(pow.times(5), p.max(10).sub(10).div(20).mul(1-21*hasAchievement("goals", 91))).max(1).pow(hasAchievement("goals", 91)+1).pow(1.005**(hasAchievement("goals", 94)*tmp.goals.achsCompleted));
    },
    achsCompleted() { return player[this.layer].achievements.length },
    unlocks() { return player[this.layer].buyables[11].toNumber() },
    buyables: {
        rows: 1,
        cols: 1,
        11: {
            unlockData: [
                {
                    desc: "Unlock Avolve.",
                    req: 3,
                },
                {
                    desc: "Unlock B-Power",
                    req: 7,
                },
                {
                    desc: "Unlock Batteries",
                    req: 12,
                },
                {
                    desc: "Unlock C-Power",
                    req: 19,
                },
                {
                    desc: "Unlock The Clock",
                    req: 27,
                },
                {
                    desc: "Unlock Integration",
                    req: 37,
                },{
                    desc: "Unlock D-power",
                    req: 54,
                },{
                    desc: "Unlock Discharger",
                    req: 61,
                },
            ],
            retrieveUnlockData() { return tmp[this.layer].buyables[11].unlockData[player[this.layer].buyables[11].toNumber()] },
            title() {
                let data = tmp[this.layer].buyables[11].retrieveUnlockData
                if (!data) return "???";
                else return data.desc;
            },
            display() { 
                let data = tmp[this.layer].buyables[11].retrieveUnlockData
                if (!data) return "???";
                else return "Req: "+formatWhole(data.req)+" Goals";
            },
            canAfford() { 
                let data = tmp[this.layer].buyables[11].retrieveUnlockData
                if (!data) return false;
                return tmp[this.layer].achsCompleted>=data.req
            },
            buy() {
                if (!tmp[this.layer].buyables[11].retrieveUnlockData) return;
                player[this.layer].buyables[11] = player[this.layer].buyables[11].plus(1)
            },
        },
    },
    achievements: {
        11: {
            name: "The Formula is Useful Now!",
            done() { return player.a.points.gte(1) },
            tooltip: "Get 1 A-Power.",
            unlocked() { return true },
        },
        12: {
            name: "Fake Timewall",
            done() { return player.value.gte(50) },
            tooltip: "Make n(t) ≥ 50.",
            unlocked() { return hasAchievement(this.layer, 11) }
        },
        13: {
            name: "Speedy Recovery",
            done() { return player.a.points.gte(10) },
            tooltip: "Reach 10 A-Power. Reward: Increase <span style='font-size: 17.5px;'>a</span> by 0.5.",
            unlocked() { return hasAchievement(this.layer, 11) }
        },
        14: {
            name: "Faster Avolution",
            done() { return tmp.a.bars.Avolve.reqDiv.gt(1) },
            tooltip: "Reduce the Avolve requirement. Reward: The A-Power requirement is divided by 1.5.",
            unlocked() { return tmp[this.layer].unlocks>=1 },
        },
        15: {
            name: "A To the Extreme",
            done() { return player.a.value.gte(100) },
            tooltip: "Make a(A) ≥ 100. Reward: Completed Goals multiply <span style='font-size: 17.5px;'>n(t)</span>.",
            unlocked() { return tmp[this.layer].unlocks>=1 },
        },
        16: {
            name: "What is even the point anymore?",
            done() { return tmp.a.bars.Avolve.reqDiv.gte(5) },
            tooltip: "Divide the Avolve requirement by 5. Reward: The Avolve Requirement reduction upgrade's effect exponent is increased by 1.",
            unlocked() { return tmp[this.layer].unlocks>=1 },
        },
        21: {
            name: "Into the next Generation",
            done() { return player.a.avolve.gte(7) },
            tooltip: "Reach Avolve Level 7. Reward: You can buy max A-Power.",
            unlocked() { return hasAchievement("goals", 14) },
        },
        22: {
            name: "I Feel Strong",
            done() { return player.a.points.gte(40) },
            tooltip: "Reach 40 A-Power. Reward: The A-Power requirement base is decreased by 0.1.",
            unlocked() { return hasAchievement("goals", 15) }
        },
        23: {
            name: "Billionaire!",
            done() { return player.value.gte(1e9) },
            tooltip: "Make n(t) ≥ 1e9. Reward: <span style='font-size: 17.5px;'>b</span> boosts <span style='font-size: 17.5px;'>a</span> at a reduced rate.",
            unlocked() { return tmp[this.layer].unlocks>=2 },
        },
        24: {
            name: "Seriously this upgrade sucks!",
            done() { return tmp.a.bars.Avolve.reqDiv.gte(50) },
            tooltip: "Divide the Avolve requirement by 50. Reward: The Avolve requirement reduction upgrade's effect exponent is increased by 1.",
            unlocked() { return hasAchievement("goals", 16) },
        },
        25: {
            name: "Nice",
            done() { return player.a.points.gte(69) && player.value.gte(6e9) },
            tooltip: "Reach 69 A-Power & make n(t) ≥ 6e9. Reward: B-Power adds to effective A-Power.",
            unlocked() { return tmp[this.layer].unlocks>=2 },
        },
        26: {
            name: "Darwin had it right",
            done() { return player.a.avolve.gte(20) },
            tooltip: "Reach Avolve Level 20. Reward: Getting A-Power resets nothing.",
            unlocked() { return hasAchievement("goals", 21) },
        },
        31: {
            name: "Coursing Through My Veins!",
            done() { return player.b.points.gte(5) },
            tooltip: "Reach 5 B-Power. Reward: The A-Power requirement base is decreased by 0.1.",
            unlocked() { return hasAchievement("goals", 22) && hasAchievement("goals", 23) },
        },
        32: {
            name: "Further Existence",
            done() { return player.a.avolve.gte(30) },
            tooltip: "Reach Avolve Level 30. Reward: Avolve's boost to <span style='font-size: 17.5px;'>a</span> is squared.",
            unlocked() { return hasAchievement("goals", 26) },
        },
        33: {
            name: "A To the More Extreme",
            done() { return player.a.value.gte(1.5e6) },
            tooltip: "Make a(A) ≥ 1,500,000. Reward: Completed Goals boost <span style='font-size: 17.5px;'>a</span>.",
            unlocked() { return tmp[this.layer].unlocks>=3 },
        },
        34: {
            name: "Oct? Non? I don't remember...",
            done() { return player.value.gte(1e27) },
            tooltip: "Make n(t) ≥ 1e27. Reward: Unlock a new set of Batteries, and you can have 2 more active at once.",
            unlocked() { return hasAchievement("goals", 31)&&tmp[this.layer].unlocks>=3 },
        },
        35: {
            name: "Am I Strong?",
            done() { return player.a.points.gte(300) },
            tooltip: "Reach 300 A-Power. Reward: The B-Power base is halved.",
            unlocked() { return hasAchievement("goals", 31) }
        },
        36: {
            name: "Definitely a Bee Joke",
            done() { return player.b.points.gte(10) },
            tooltip() { 
                return "Reach 10 B-Power. Reward: Time goes by "+format(tmp.goals.goal36power.times(5))+"x faster, but this slows down after "+format(Decimal.div(10, tmp.goals.goal36decayrate))+" seconds.<br>Currently: "+format(tmp.goals.goal36eff)+"x" 
            },
            unlocked() { return hasAchievement("goals", 31) },
        },
        41: {
            name: "The Sub-Infinite Sum",
            done() { return player.value.gte(1e40) && player.a.value.gte(6.98e8) },
            tooltip: "Make n(t) ≥ 1e40 & a(A) ≥ 698,000,000. Reward: The A-Power requirement base is decreased by 0.05.",
            unlocked() { return hasAchievement("goals", 34) }
        },
        42: {
            name: "Cue That Bee Movie Reference",
            done() { return player.b.points.gte(15) },
            tooltip: 'Reach 15 B-Power. Reward: The reward of "Definitely a Bee Joke" is twice as strong & takes 4x as long to decay.',
            unlocked() { return hasAchievement("goals", 36) },
        },
        43: {
            name: "Chargeless",
            done() { return player.value.gte(1e75) && tmp.b.usedBatteries==0 },
            tooltip: "Make n(t) ≥ 1e75 without any Used Batteries. Reward: You can have 1 more active battery at a time.",
            unlocked() { return hasAchievement("goals", 35) && hasAchievement("goals", 36) && tmp[this.layer].unlocks>=3 },
        },
        44: {
            name: "I Feel Like Gambling",
            done() { return player.a.points.gte(888) },
            tooltip: "Reach 888 A-Power. Reward: B-Power's boost to effective A-Power multiplies instead of adding.",
            unlocked() { return hasAchievement("goals", 41) },
        },
        45: {
            name: "If only Googology was a Feature...",
            done() { return player.value.gte(1e100) },
            tooltip: "Make n(t) ≥ 1e100. Reward: The second row of Batteries have their own rewards.",
            unlocked() { return hasAchievement("goals", 43) },
        },
        46: {
            name: "Ah I see",
            done() { return player.c.points.gte(4) },
            tooltip: "Reach 4 C-Power. Reward: Triple <span style='font-size: 17.5px;'>c</span>'s coefficient in n(t).",
            unlocked() { return hasAchievement("goals", 44) && tmp[this.layer].unlocks>=4 },
        },
        51: {
            name: "This is STILL USELESS",
            done() { return tmp.a.bars.Avolve.reqDiv.gte(3e5) },
            tooltip: "Divide the Avolve requirement by 300,000. Reward: The Avolve requirement reduction upgrade's effect exponent is increased by your completed Goals.",
            unlocked() { return hasAchievement("goals", 24) && hasAchievement("goals", 36) },
        },
        52: {
            name: "Woah that's a lotta Damage!",
            done() { return player.a.points.gte(2e3) },
            tooltip: "Reach 2,000 A-Power. Reward: You can automatically gain A-Power, and decrease its requirement base by 0.05.",
            unlocked() { return hasAchievement("goals", 44) }
        },
        53: {
            name: "20% to Absolution",
            done() { return player.value.gte(Math.pow(Number.MAX_VALUE, 0.8)) },
            tooltip() { return "Make n(t) ≥ "+format(Math.pow(Number.MAX_VALUE, 0.8))+". Reward: You can have 1 more active Battery at a time, and third row Batteries have their own rewards." },
            unlocked() { return hasAchievement("goals", 45) },
        },
        54: {
            name: "Insani-B",
            done() { return player.a.value.gte(1.5e17) },
            tooltip: 'Make a(A) ≥ 1.5e17. Reward: Avolve requirement scaling starts 25 levels later, and the reward of "Definitely a Bee Joke" is 3x as strong, but decays 10x faster.',
            unlocked() { return hasAchievement("goals", 42) && hasAchievement("goals", 51) },
        },
        55: {
            name: "Buzz Lightyear was a Visionary",
            done() { return player.value.gte(Number.MAX_VALUE) },
            tooltip: "Make n(t) ≥ "+format(Number.MAX_VALUE)+".",
            unlocked() { return hasAchievement("goals", 53) },
        },
        56: {
            name: "The True Day",
            done() { return tmp.c.clockRatio.times(tmp.c.hoursPerDay).gte(24) },
            tooltip: "Get The Clock to display at least 24:00:00. Reward: The length of 1 Day is halved.",
            unlocked() { return hasAchievement("goals", 54) && tmp.goals.unlocks>=5}
        },
        61: {
            name: "Out of Order?",
            done() { return player.b.points.gte(30) && player.c.points.gte(7) },
            tooltip: 'Reach 30 B-Power & 7 C-Power. Reward: Increase the effect of Days Passed by 0.1 for every Day Passed (does not decay over time).',
            unlocked() { return hasAchievement("goals", 52) && tmp.goals.unlocks>=5}
        },
        62: {
            name: "Going back for that other Goal?",
            done() { return player.a.avolve.gte(308) },
            tooltip: "Reach Avolve Level 308. Reward: Time goes by twice as fast, and the log of <span style='font-size: 17.5px;'>a</span> adds to <span style='font-size: 17.5px;'>t</span>'s exponent in n(t).",
            unlocked() { return hasAchievement("goals", 61) },
        },
        63: {
            name: "Solar Clocks",
            done() { return layers.c.clockRatio().times(tmp.c.hoursPerDay).gte(2) && tmp.b.usedBatteries==0 },
            tooltip: "Get The Clock to display at least 2:00:00 without any Active Batteries. Reward: The length of 1 Day is halved, Days Passed do not decay, and when a Day Passes, The Clock does not reset.",
            unlocked() { return hasAchievement("goals", 56) },
        },
        64: {
            name: "Canadian Eh?",
            done() { return player.a.points.gte(105e3) },
            tooltip: "Reach 105,000 A-Power. Reward: <span style='font-size: 17.5px;'>c</span> adds to b(B).",
            unlocked() { return hasAchievement("goals", 62) && tmp.goals.unlocks>=4 },
        },
        65: {
            name: "I guess this isn't useless now...",
            done() { return tmp.a.bars.Avolve.reqDiv.gte(1e55) },
            tooltip: "Divide the Avolve requirement by 1e55. Reward: The Avolve requirement reduction upgrade's effect exponent is increased by its level, A-Power boosts a(A) with a stronger function, and double Timespeed.",
            unlocked() { return hasAchievement("goals", 56) && hasAchievement("goals", 62) },
        },
        66: {
            name: "The True Year",
            done() { return tmp.c.clockRatio.times(tmp.c.hoursPerDay).gte(8765.76) },
            tooltip: "Get The Clock to display at least 8,765:45:36. Reward: Goals multiply Timespeed, but divide Timespeed by 4. Also, the length of 1 Day is halved again.",
            unlocked() { return hasAchievement("goals", 56)}
        },
        71: {
            name: "The Leetest Function",
            done() { return player.value.gte("1e1337") },
            tooltip: "Make n(t) ≥ "+format("1e1337")+'. Reward: The reward of "Definitely a Bee Joke" is 3.6x as strong but decays twice as fast.',
            unlocked() { return hasAchievement("goals", 55) && hasAchievement("goals", 64) },
        },
        72: {
            name: "New Society",
            done() { return player.int.value.gte(8) },
            tooltip: "Reach 8 IP. Reward: IP multiplies Time Speed.",
            unlocked() { return hasAchievement("goals", 61) && player.int.unlocked },
        },
        73: {
            name: "The Useless Quality of Life",
            done() { return tmp.a.bars.Avolve.reqDiv.gte(1e100) },
            tooltip: "Divide the Avolve requirement by 1e100. Reward: The Avolve requirement reduction upgrade can be automated and bought in bulk. Also, its effect exponent is increased by your IP.",
            unlocked() { return hasAchievement("goals", 65) && player.int.unlocked },
        },
        74: {
            name: "Intense Absolution",
            done() { return player.int.points.gte(2) },
            tooltip: "Reach 2 Integrations. Reward: You can buy max B-Power, and the B-Power requirement exponent increase is 20% weaker.",
            unlocked() { return hasAchievement("goals", 71) && player.int.unlocked },
        },
        75: {
            name: "Cue That Sea Movie Reference",
            done() { return player.c.points.gte(15) },
            tooltip: "Reach 15 C-Power. Reward: Days can be gotten in bulk, and the length of a Day is divided by your Integrations.",
            unlocked() { return hasAchievement("goals", 66) && player.int.unlocked },
        }, 
        76: {
            name: "A Salt and Battery",
            done() { return gridEffect("b", 102).gte(4795) },
            tooltip: "Get B<sub>102</sub>'s effect to at least 4,795. Reward: You can use 3 more Batteries at a time, and square the leftmost column of Batteries.",
            unlocked() { return hasAchievement("goals", 72) },
        },
        81: {
            name: "How Nice of You!",
            done() { return player.b.value.gte(69) },
            tooltip: "Make b(B) ≥ 69. Reward: Scaled Avolve Level scaling is 50% weaker, IP adds to b, and each Day passed increases its effect by 0.25%.",
            unlocked() { return hasAchievement("goals", 73) },
        },
        82: {
            name: "Out of Order II",
            done() { return player.value.gte("1e3000") },
            tooltip: 'Make n(t) ≥ 1e3000. Reward: C-Power requirement scaling starts 1 later for each Goal in this row, and Avolve levels can be gotten in bulk.',
            unlocked() { return hasAchievement("goals", 55) && hasAchievement("goals", 64) },
        },
        83: {
            name: "Is this Infinity?",
            done() { return player.int.value.gte(27.5) },
            tooltip: "Reach 27.5 IP. Reward: Integrations multiply b.",
            unlocked() { return hasAchievement("goals", 72) },
        },
        84: {
            name: "Nice Goal #420",
            done() { return player.value.gte("1e6969") },
            tooltip: "Make n(t) ≥ 1e6969. Reward: Double the bottom row of Batteries.",
            unlocked() { return hasAchievement("goals", 76) },
        },
        85: {
            name: "Live Life to the Fullest I Guess?",
            done() { return tmp.c.clockRatio.times(tmp.c.hoursPerDay).gte(1e9) },
            tooltip: "Get The Clock to display at least 1e9:00:00. Reward: B-power resets nothing, C-power reset nothing and can be gotten in bulk.",
            unlocked() { return hasAchievement("goals", 81) },
        },86: {
            name: "IP goes brrrrrrr",
            done() { return player.int.value.gte(56.5) },
            tooltip: "reach 56.5 IP. Reward: intergrations have a stronger effect, requirement base is reduced.",
            unlocked() { return hasAchievement("goals", 81) },
        },91: {
            name: "Out of order III",
            done() { return getTimeSpeed().gte(9.9e11) },
            tooltip: "Reach a x990,000,000,000 time speed. Reward: \"Definitely a Bee Joke\" increases at 20x rate instead of decreases, then it is squared.",
            unlocked() { return hasAchievement("goals", 85) },
        },92: {
            name: "I can't play with this f**king formula",
            done() { return player.value.gte('e1.5e10') },
            tooltip: ()=>"Make n(t)≥"+format('e1.5e10')+". Reward: add c by (days passed)<sup>0.15</sup><br>Currently: +"+format(tmp.c.calcLoops.pow(0.15))+'.',
            unlocked() { return hasAchievement("goals", 85) },
        },93: {
            name: "This is really gambling",
            done() { return player.int.value.gte(488888) },
            tooltip:"Make I≥"+format(488888)+". Reward: raise a to the power of goals.",
            unlocked() { return hasAchievement("goals", 85) },
        },94: {
            name: "the nicest one",
            done() { return player.value.gte('e34206942069') },
            tooltip:"Make n(t)≥"+format('e34206942069')+". Reward: gain x1.25 more intergrations, \"Definitely a bee joke\" is ^1.005 for each goal.",
            unlocked() { return hasAchievement("goals", 81) },
        },95: {
            name: "I can't live without batteries",
            done() { return tmp.c.clockRatio.times(tmp.c.hoursPerDay).gte(1e19)&& tmp.b.usedBatteries==0  },
            tooltip:"reach 1e19:00:00 without batteries. Reward: A-power base -0.1 and multiply timespeed by c.",
            unlocked() { return hasAchievement("goals", 94) },
        },96: {
            name: "tetrational scaling?",
            done() { return player.c.loops.gte(684) },
            tooltip:"gain 684 days. Reward: day length is divided by 5 for each intergration, square the middle column of batteries.",
            unlocked() { return hasAchievement("goals", 93) },
        },101: {
            name: "max safe integer",
            done() { return player.b.value.gte(Number.MAX_SAFE_INTEGER) },
            tooltip:"reach "+format(Number.MAX_SAFE_INTEGER)+" b. Reward: d base is ^0.99 for each goal, d boost time speed.",
            unlocked() { return hasAchievement("goals", 94) },
        },102: {
            name: "72 months later......",
            done() { return player.c.loops.gte(2170) },
            tooltip:"reach 2,170 days. Reward: base of the prevoius achievement is -0.00008 for each goal.",
            unlocked() { return hasAchievement("goals", 93) },
        },103: {
            name: "2248",
            done() { return player.c.loops.gte(2248) },
            tooltip:"reach "+format(2248)+" days. Reward: raise a to the power of goals again, and Avolve boost d.",
            unlocked() { return hasAchievement("goals", 93) },
        },104: {
            name: "pentational growth???",
            done() { return player.a.points.gte(2.5e30) },
            tooltip:"reach "+format(2.5e30)+" A-power. Reward: n(t) reduces d base.",
            unlocked() { return hasAchievement("goals", 93) },
        },105: {
            name: "be overloaded with power",
            done() { return player.b.points.gte(512) },
            tooltip:"reach 512 B-power. Reward: B-power boost b.",
            unlocked() { return hasAchievement("goals", 93) },
        },106: {
            name: "IP is infinity points",
            done() { return player.int.points.gte(64)},
            tooltip:"reach 64 Intergrations. Reward: powers boost IP, Intergration base -2, A-power base is -0.05, & automate B-power , C-power & Intergrations.",
            unlocked() { return hasAchievement("goals", 94) },
        },111: {
            name: "Intergration++",
            done() { return player.int.points.gte(120)},
            tooltip:"reach 120 Intergrations.",
            unlocked() { return hasAchievement("goals", 103) },
        },112: {
            name: "beyond infinite",
            done() { return player.value.gte('e8e5')&&inChallenge('d',11)},
            tooltip:()=>"make n(t)≥"+format('e8e5')+" in the discharger. Reward: in the discharger, C-power base is ^"+format(player.c.points.div(100).add(1).pow(2.8).sub(1).min(.6-1e-5).sub(.6).mul(-1))+" and n(t) is x1e2,000,000.",
            unlocked() { return hasAchievement("goals", 111) },
        },113: {
            name: "I see how the discharger works",
            done() { return player.c.points.gte(16)&&inChallenge('d',11)},
            tooltip:()=>"reach 16 C-power in the discharger. Reward: in the discharger, C-power base is ^"+format(player.b.points.div(600).add(1).pow(1.5).sub(1).min(.6-1e-5).sub(.6).mul(-1))+" and timespeed is ^0.1 instead of doing nothing. Also a boost timespeed.",
            unlocked() { return hasAchievement("goals", 111) },
        },114: {
            name: "too high n(t)",
            done() { return player.value.gte('e4e55')},
            tooltip:()=>"make n(t)≥"+format('e4e55')+". Reward: volts gained are ^1.1, & the base of the buyable that increase volt gain is +2.",
            unlocked() { return hasAchievement("goals", 102) },
        },115: {
            name: "out of power",
            done() { return player.d.dcp.gte('123456789'.repeat(32)+'0')},
            tooltip:()=>"gain "+format('123456789'.repeat(32)+'0')+" volts. Reward: the base of the buyable that increase volt gain is +0.03 for each goal, intergration resets nothing, & volt effect also applies out of the discharger.",
            unlocked() { return hasAchievement("goals", 113) },
        },116: {
            name: "1 big bang at a time",
            done() { return getTimeSpeed().gte(1e156);},
            tooltip:()=>"reach a "+format(1e156)+"x time speed. Reward: gain 1.6x more intergrations.",
            unlocked() { return hasAchievement("goals", 93) },
        },121: {
            name: "f**king Intergrations",
            done() { return player.int.points.gte(666);},
            tooltip:()=>"get 666 intergrations. Reward: volt gain ^"+format(1+1/7)+" & you buy max the volt buyable, its base is raised to the 1.25th power.",
            unlocked() { return hasAchievement("goals", 93) },
        },122: {
            name: "\"superscaled\" volts",
            done() { return player.d.dcp.gte('e3500');},
            tooltip:()=>"get "+format('e3500')+" volts. Reward: B-power & C-power scaling is 80% weaker.",
            unlocked() { return hasAchievement("goals", 93) },
        },123: {
            name: "not a luck related goal",
            done() { return player.value.gte('e77777777777')&&inChallenge('d',11);},
            tooltip:()=>"make n(t)≥"+format('e77777777777')+" in the discharger. Reward: unlock modifiers for the discharger and c boost IP.",
            unlocked() { return hasAchievement("goals", 93) },
        },124: {
            name: "nice++",
            done() { return tmp.goals.achsCompleted>=69;},
            tooltip:()=>"reach 69 goals.",
            unlocked() { return hasAchievement("goals", 93) },
        },125: {
            name: "Out Of Order IV",
            done() { return player.b.points.gte(40)&&player.c.points.gte(50)&&inChallenge('d',11)&&player.d.modifiers[0]&&player.d.modifiers[1];},
            tooltip:()=>"reach 40 B-power & 50 C-power in the discharger while both modifiers are active. Reward: volt gain ^1.3, you can avolve in the discharger, & intergration base -1.",
            unlocked() { return hasAchievement("goals", 123) },
        },126: {
            name: "truly power outage",
            done() { return player.d.dcp.gte('e11111.111111111111111111111')},
            tooltip:()=>"reach "+format('e11111.111111111111111111111')+" volts. Reward: intergration base is ^0.75 and IP boost volt gain",
            unlocked() { return hasAchievement("goals", 93) },
        },131: {
            name: "I'm (somewhat) very strong",
            done() { return player.d.points.gte(2498)&&player.b.value.gte(1e9)&&inChallenge('d',11)},
            tooltip:()=>"reach 2498 D-power and "+format(1e9)+" b in the discharger. Reward: n(t) boost time speed.",
            unlocked() { return hasAchievement("goals", 124) },
        }
    },
    nodeStyle: { width: "50px", height: "50px", "min-width": "50px" },
    componentStyles: {
        achievement: {
            "border-radius": "5%",
        },
        buyable: {
            "min-width": "100px",
            height: "75px",
            "border-radius": "5%",
        },
    },
})