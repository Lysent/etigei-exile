// Vanilla Bullet Changes
const scrapBulletSalvo = extend(BasicBulletType, {
    speed: 3,
    lifetime: 25,
    damage: 4,
    splashDamage: 0,
    splashDamageRadius: 0,
    shootEffect: Fx.shootSmall,
    ammoMultiplier: 5,
    reloadMultiplier: 0.5,
    fragBullet: extend(BasicBulletType, {
        speed: 2.5,
        damage: 1,
        sprite: "bullet",
        width: 2,
        height: 2,
        shrinkY: 1,
        lifetime: 20,
        despawnEffect: Fx.none,
        buildingDamageMultiplier: 0.75,
    }),
});

const graphiteBulletSalvo = extend(BasicBulletType, {
    speed: 3,
    lifetime: 50,
    damage: 20,
    shootEffect: Fx.shootSmall,
    ammoMultiplier: 4,
    reloadMultiplier: 0.65, // Vanilla Graphite in Salvo being -39% and not -40% really triggered me but it's actually a bug so I set it to 35%
    splashDamage: 0,
    splashDamageRadius: 0,
});

Blocks.salvo.ammoTypes.put(Vars.content.item("scrap"), scrapBulletSalvo);
Blocks.salvo.ammoTypes.put(Vars.content.item("graphite"), graphiteBulletSalvo);