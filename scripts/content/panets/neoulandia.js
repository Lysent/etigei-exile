const neoulandia = new Planet("neoulandia", Planets.sun, 1, 3);

neoulandia.generator = extend(ErekirPlanetGenerator, {
    defaultLoadout: Schematics.readBase64("bXNjaAF4nGNgYWBhZmDJS8xNZeAoLE8tKkmvzGDgTkktTi7KLCjJzM9jYGBgy0lMSs0pZmCKjmVkEE4tyUxPza/QTc7Pyc+rBFJFqUA1jCAEJAB0qBS5")
});