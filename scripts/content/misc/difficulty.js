Events.on(ClientLoadEvent, () => {
    Object.assign(Difficulty.casual, {
        enemyHealthMultiplier: 0.75,
        enemySpawnMultiplier: 0.5,
        waveTimeMultiplier: 0.6
    });
    
    Object.assign(Difficulty.easy, {
        enemyHealthMultiplier: 1,
        enemySpawnMultiplier: 1,
        waveTimeMultiplier: 1
    });
    
    Object.assign(Difficulty.normal, {
        enemyHealthMultiplier: 1.25,
        enemySpawnMultiplier: 1.5,
        waveTimeMultiplier: 0.8
    });
    
    Object.assign(Difficulty.hard, {
        enemyHealthMultiplier: 1.5,
        enemySpawnMultiplier: 2,
        waveTimeMultiplier: 0.6,
        //buildSpeedMultiplier: 0.75
    });
    
    Object.assign(Difficulty.eradication, {
        enemyHealthMultiplier: 1.5,
        enemySpawnMultiplier: 3,
        waveTimeMultiplier: 0.5,
        //buildSpeedMultiplier: 0.5
    });
});