// Tech tree node attacher ripped off from the ContentParser

const chainNode = (parent, research) => {
    const node = new TechTree.TechNode(null, research.unlock, research.requirements || ItemStack.empty);
    for(const objective of (research.objectives || [])){
        node.objectives.add(objective);
    }

    log("etigeox", "created tech node");

    if (research.planet) node.planet = Vars.content.getByName(ContentType.planet, research.planet);

    log("etigeox", "updated planet");

    if (!parent.children.contains(node)) {
        parent.children.add(node);
    }

    log("etigeox", "childed node");

    //reparent the node
    node.parent = parent;

    log("etigeox", "reparented node");

    return node;
};

const addTechNode = (research) => {
    const parent = TechTree.all.find(t => t.content == research.parent && (t.planet !== null ? t.planet == node.planet : true));

    log("etigeox", "(potentially) found parent");

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
    const neoulandia_coal = addTechNode({
        parent: Vars.content.item("etigeox-raw-ore"),
        requirements: ItemStack.with(
            Items.coal, 1
        ),
        unlock: Items.coal,
        planet: "etigeox-Neoulandia"
    });
    // const neoulandia_sand = addTechNode({
    //     parent: Vars.content.item("etigeox-timber"),
    //     requirements: new Objectives.Produce(Items.sand),
    //     unlock: Items.sand,
    //     planet: "etigeox-Neoulandia"
    // });
    // const neoulandia_silicon = chainNode(neoulandia_coal, {
    //     requirements: new Objectives.Produce(Items.silicon),
    //     unlock: Items.silicon,
    //     planet: "etigeox-Neoulandia"
    // });

    const neoulandia_water = addTechNode({
        parent: Vars.content.item("etigeox-timber"),
        objectives: [new Objectives.Produce(Liquids.water)],
        unlock: Liquids.water,
        planet: "etigeox-Neoulandia"
    });
    // chainNode(neoulandia_water, {
    //     unlock: Vars.content.item("etigeox-canned-water"),
    //     planet: "etigeox-Neoulandia"
    // });
    const neoulandia_oil = chainNode(neoulandia_water, {
        unlock: Liquids.oil,
        objectives: [new Objectives.Produce(Liquids.oil)],
        planet: "etigeox-Neoulandia"
    });
    // chainNode(neoulandia_oil, {
    //     unlock: Liquids.slag,
    //     requirements: new Objectives.Produce(Liquids.slag),
    //     planet: "etigeox-Neoulandia"
    // });
    chainNode(neoulandia_oil, {
        unlock: Vars.content.liquid("etigeox-natural-gas"),
        objectives: [new Objectives.Produce(Vars.content.liquid("etigeox-natural-gas"))],
        planet: "etigeox-Neoulandia"
    });
});