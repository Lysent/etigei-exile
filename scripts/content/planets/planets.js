const neoulandia = new Planet("Neoulandia", Planets.sun, 1, 3);
const rubiginosus = new Planet("Rubiginosus", Planets.sun, 1, 1);

neoulandia.meshLoader = () => new NoiseMesh(neoulandia, 776636, 5, 0.9, 3, 1, 1, 1.2, Color.valueOf("07f2f2"), Color.valueOf("7dbfe3"), 7, 0.5, 0.5, 0.5),
rubiginosus.meshLoader = () => new NoiseMesh(rubiginosus, 776636, 5, 0.9, 2, 1, 0.5, 1.7, Color.valueOf("4a280e"), Color.valueOf("bd9a4f"), 6, 0.5, 0.5, 0.5),

// Neoulandia

Object.assign(neoulandia, {
    "iconColor": Color.valueOf("07f2f2"),

    "orbitRadius": 37,
    "hasAtmosphere": true,
    "updateLighting": true,
    "atmosphereRadIn": 0.1,
    "atmosphereRadOut": 0.3,
    "atmosphereColor": Color.valueOf("7dbfe3"),

    "drawOrbit": true,
    "accessible": true,
    "alwaysUnlocked": true,
    "sectorSeed": 3737,
    "startSector": 1,

    "clearSectorOnLose": true,
    "allowSectorInvasion": true,
    "allowLaunchToNumbered": false,
    "allowLaunchLoadout": true, // I want this to be true >:(
    "allowLaunchSchematics": false,

    campaignRuleDefaults: (() => {
        const rules = new CampaignRules();
        rules.fog = true;
    })(),

    ruleSetter(r) {
        r.waveTeam = Team.crux;
        r.placeRangeCheck = false;
        r.showSpawns = true;
        r.fog = true;
        r.staticFog = true;
        r.lighting = true;
        r.coreDestroyClear = true;
        r.onlyDepositCore = false;
    }
});

neoulandia.generator = extend(ErekirPlanetGenerator, {
    defaultCore: Vars.content.block("colony-core"),
    //defaultLoadout: Schematics.read(Vars.tree.get("schematics/colony-core.msch")),
    // defaultLoadout: Schematics.readBase64("bXNjaAF4nGNgYWBhZmDJS8xNZeAoLE8tKkmvzGDgTkktTi7KLCjJzM9jYGBgy0lMSs0pZmCKjmVkEE4tyUxPza/QTc7Pyc+rBFJFqUA1jCAEJAB0qBS5"),

    // campaignRuleDefaults: (() => {
    //     const rules = new CampaignRules();
    //     rules.fog = true;
    // })(),
});

// Rubiginosus

Object.assign(rubiginosus, {
    "iconColor": Color.valueOf("4a280e"),

    "orbitRadius": 39,
    "hasAtmosphere": true,
    "updateLighting": true,
    "atmosphereRadIn": 0.1,
    "atmosphereRadOut": 0.3,
    "atmosphereColor": Color.valueOf("4a280e"),

    "drawOrbit": true,
    "accessible": true,
    "alwaysUnlocked": true,
    "sectorSeed": 3737,
    "startSector": 1,

    "allowLaunchToNumbered": false,
    "clearSectorOnLose": true,
    "allowSectorInvasion": false,
    "allowLaunchLoadout": false,
    "allowLaunchSchematics": false,
    "allowWaveSimulation": true,

    ruleSetter(r) {
        r.waveTeam = Team.crux;
        r.placeRangeCheck = false;
        r.showSpawns = false;
        r.fog = true;
        r.staticFog = true;
        r.lighting = true;
        r.coreDestroyClear = true;
        r.onlyDepositCore = false;
    },

    campaignRuleDefaults: (() => {
        const rules = new CampaignRules();
        rules.fog = true;
        return rules;
    })(),

    campaignRules: (() => {
        const rules = new CampaignRules();
        rules.fog = true;
        return rules;
    })()
});

rubiginosus.generator = extend(ErekirPlanetGenerator);