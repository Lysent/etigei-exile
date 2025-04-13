// Tech tree node attacher ripped off from the ContentParser

const chainNode = (parent, research) => {
    const node = new TechTree.TechNode(null, research.unlock, research.requirements || ItemStack.empty);

    if (research.objectives) {
        for (let i = 0; i < research.objectives.length; i++) {
            const objective = research.objectives[i];
            node.objectives.add(objective);
        }
    }

    if (research.planet) node.planet = Vars.content.getByName(ContentType.planet, research.planet);

    if (!parent.children.contains(node)) {
        parent.children.add(node);
    }

    //reparent the node
    node.parent = parent;

    return node;
};

const addTechNode = (research) => {
    const parent = TechTree.all.find(t => t !== undefined && t.content == research.parent && (t.planet !== null ? t.planet == research.planet : true));

    const node = chainNode(parent, research);

    return node;
};

Events.on(ContentInitEvent, () => {
    // Serpulo
    addTechNode({
        parent: Vars.content.item("etigeox-refined-etigeum"),
        unlock: Vars.content.item("etigeox-smart-compound"),
        requirements: ItemStack.with(
            Items.silicon, 100,
            Items.surgeAlloy, 75
        ),
        planet: "serpulo"
    });
    addTechNode({
        parent: Vars.content.item("etigeox-refined-etigeum"),
        unlock: Vars.content.item("etigeox-uu-matter"),
        requirements: ItemStack.with(
            Items.silicon, 5000
        ),
        planet: "serpulo"
    });

    // Rubiginosus
    // Nothing :/

    // Neoulandia
    const neoulandia_timber = addTechNode({
        parent: Vars.content.block("etigeox-colony-core"),
        objectives: [new Objectives.Produce(Vars.content.item("etigeox-tin"))],
        unlock: Vars.content.item("edt-timber"),
        planet: "etigeox-Neoulandia"
    });

    const neoulandia_raw_ore = chainNode(neoulandia_timber, {
        unlock: Vars.content.item("etigeox-raw-ore"),
        objectives: [new Objectives.Produce(Vars.content.item("etigeox-raw-ore"))],
        planet: "etigeox-Neoulandia"
    });

    const neoulandia_greater_ore = chainNode(neoulandia_raw_ore, {
        unlock: Vars.content.item("etigeox-greater-ore"),
        objectives: [new Objectives.Produce(Vars.content.item("etigeox-greater-ore"))],
        planet: "etigeox-Neoulandia"
    });

    const neoulandia_coal = addTechNode({
        parent: Vars.content.item("etigeox-raw-ore"),
        objectives: [new Objectives.Produce(Items.coal)],
        unlock: Items.coal,
        planet: "etigeox-Neoulandia"
    });

    // const neoulandia_sand = addTechNode({
    //     parent: Vars.content.item("etigeox-timber"),
    //     objectives: [new Objectives.Produce(Items.sand)],
    //     unlock: Items.sand,
    //     planet: "etigeox-Neoulandia"
    // });

    const neoulandia_silicon = chainNode(neoulandia_coal, {
        objectives: [new Objectives.Produce(Items.silicon)],
        unlock: Items.silicon,
        planet: "etigeox-Neoulandia"
    });


    const neoulandia_tin = chainNode(neoulandia_raw_ore, {
        unlock: Vars.content.item("etigeox-tin"),
        objectives: [new Objectives.Produce(Vars.content.item("etigeox-tin"))],
        planet: "etigeox-Neoulandia"
    });
    const neoulandia_alumin = chainNode(neoulandia_tin, {
        unlock: Vars.content.item("etigeox-alumin"),
        objectives: [new Objectives.Produce(Vars.content.item("etigeox-alumin"))],
        planet: "etigeox-Neoulandia"
    });
    chainNode(neoulandia_alumin, {
        unlock: Vars.content.item("etigeox-silver"),
        objectives: [new Objectives.Produce(Vars.content.item("etigeox-silver"))],
        planet: "etigeox-Neoulandia"
    });

    const neoulandia_m = chainNode(neoulandia_tin, {
        unlock: Vars.content.item("etigeox-m-part"),
        objectives: [new Objectives.Produce(Vars.content.item("etigeox-m-part"))],
        planet: "etigeox-Neoulandia"
    });
    const neoulandia_t = chainNode(neoulandia_m, {
        unlock: Vars.content.item("etigeox-t-part"),
        objectives: [new Objectives.Produce(Vars.content.item("etigeox-t-part"))],
        planet: "etigeox-Neoulandia"
    });
    chainNode(neoulandia_t, {
        unlock: Vars.content.item("etigeox-smart-compound"),
        objectives: [new Objectives.Produce(Vars.content.item("etigeox-smart-compound"))],
        planet: "etigeox-Neoulandia"
    });
    chainNode(neoulandia_m, {
        unlock: Vars.content.item("etigeox-d-part"),
        objectives: [new Objectives.Produce(Vars.content.item("etigeox-d-part"))],
        planet: "etigeox-Neoulandia"
    });

    chainNode(neoulandia_greater_ore, {
        unlock: Vars.content.item("etigeox-nickel"),
        objectives: [new Objectives.Produce(Vars.content.item("etigeox-nickel"))],
        planet: "etigeox-Neoulandia"
    });
    chainNode(neoulandia_greater_ore, {
        unlock: Vars.content.item("etigeox-platinum"),
        objectives: [new Objectives.Produce(Vars.content.item("etigeox-platinum"))],
        planet: "etigeox-Neoulandia"
    });

    const neoulandia_research1 = chainNode(neoulandia_timber, {
        unlock: Vars.content.item("etigeox-research-materia1"),
        objectives: [new Objectives.Produce(Vars.content.item("etigeox-silver"))],
        planet: "etigeox-Neoulandia"
    });

    chainNode(neoulandia_research1, {
        unlock: Vars.content.item("etigeox-research-materia2"),
        objectives: [new Objectives.Produce(Vars.content.item("etigeox-platinum"))],
        planet: "etigeox-Neoulandia"
    });


    const neoulandia_water = addTechNode({
        parent: Vars.content.item("edt-timber"),
        objectives: [new Objectives.Produce(Liquids.water)],
        unlock: Liquids.water,
        planet: "etigeox-Neoulandia"
    });
    chainNode(neoulandia_water, {
        unlock: Vars.content.item("etigeox-canned-water"),
        planet: "etigeox-Neoulandia"
    });
    const neoulandia_oil = chainNode(neoulandia_water, {
        unlock: Liquids.oil,
        objectives: [new Objectives.Produce(Liquids.oil)],
        planet: "etigeox-Neoulandia"
    });
    chainNode(neoulandia_oil, {
        unlock: Liquids.slag,
        objectives: [new Objectives.Produce(Liquids.slag)],
        planet: "etigeox-Neoulandia"
    });
    // chainNode(neoulandia_oil, {
    //     unlock: Vars.content.liquid("etigeox-natural-gas"),
    //     objectives: [new Objectives.Produce(Vars.content.liquid("etigeox-natural-gas"))],
    //     planet: "etigeox-Neoulandia"
    // });
});