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

// scathen't
const extendifier = (target, fn) => fn.apply(target);
const shittyMissileScathe = extendifier(new BulletType(0, 0), function () {
    const nerf = 0.6;

    this.shootEffect = Fx.shootBig;
    this.smokeEffect = Fx.shootSmokeMissileColor;
    this.hitColor = Color.valueOf("ffd37f");
    this.ammoMultiplier = 3;
    this.reloadMultiplier = 0.8;

    this.spawnUnit = extendifier(new MissileUnitType("scathe-missile-bad"), function () {

        this.speed = 4;
        this.maxRange = 6 * nerf;
        this.lifetime = 60 * 6.1 * nerf;
        this.outlineColor = Pal.darkOutline;
        this.engineColor = this.trailColor = Color.valueOf("ffd37f");
        this.engineLayer = Layer.effect;
        this.engineSize = 3.1;
        this.engineOffset = 10;
        this.rotateSpeed = 0.2;
        this.trailLength = 18;
        this.missileAccelTime = 50;
        this.lowAltitude = true;
        this.loopSound = Sounds.missileTrail;
        this.loopSoundVolume = 0.6;
        this.deathSound = Sounds.largeExplosion;
        this.targetAir = false;
        this.targetUnderBlocks = false;

        this.fogRadius = 6;

        this.health = 500;

        this.weapons.add(extendifier(new Weapon(), function () {
            this.shootCone = 360;
            this.mirror = false;
            this.reload = 1;
            this.deathExplosionEffect = Fx.massiveExplosion;
            this.shootOnDeath = true;
            this.shake = 10;
            this.bullet = extendifier(new ExplosionBulletType(400, 120), function () {

                //stats must be mirrored to the bullet that the unit uses
                this.reloadMultiplier = 0.8;
                this.ammoMultiplier = 3;
                this.hitColor = this.engineColor;
                this.shootEffect = new MultiEffect(Fx.massiveExplosion, Fx.scatheExplosion, Fx.scatheLight, extendifer(new WaveEffect(), function () {
                    this.lifetime = 10;
                    this.strokeFrom = 4;
                    this.sizeTo = 130;
                }));

                this.collidesAir = false;
                this.buildingDamageMultiplier = 0.1;

                this.fragLifeMin = 0.1;
                this.fragBullets = 7;
                this.fragBullet = extendifier(new ArtilleryBulletType(3.4, 32), function () {

                    this.buildingDamageMultiplier = 0.2;
                    this.drag = 0.02;
                    this.hitEffect = Fx.massiveExplosion;
                    this.despawnEffect = Fx.scatheSlash;
                    this.knockback = 0.8;
                    this.lifetime = 23;
                    this.width = this.height = 18;
                    this.collidesTiles = false;
                    this.splashDamageRadius = 56;
                    this.splashDamage = 164;
                    this.backColor = this.trailColor =this. hitColor = this.engineColor;
                    this.frontColor = Color.white;
                    this.smokeEffect = Fx.shootBigSmoke2;
                    this.despawnShake = 7;
                    this.lightRadius = 30;
                    this.lightColor = this.engineColor;
                    this.lightOpacity = 0.5;

                    this.trailLength = 20;
                    this.trailWidth = 3.5;
                    this.trailEffect = Fx.none;
                });
            });
        }));

        this.abilities.add(extendifier(new MoveEffectAbility(), function () {
            this.effect = Fx.missileTrailSmoke;
            this.rotation = 180;
            this.y = -9;
            this.color = Color.grays(0.6).lerp(Pal.redLight, 0.5).a(0.4);
            this.interval = 7;
        }));
    });
});

Blocks.scathe.ammoTypes.put(Vars.content.item("oxide"), shittyMissileScathe);