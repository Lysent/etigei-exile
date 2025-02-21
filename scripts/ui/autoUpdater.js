// It doesn't auto anything

const UpdateChecker = () => {
    let updateAvailable = false;
    let updateBuild;

    const init = () => {
        Vars.ui.menuGroup["fill(arc.func.Cons)"](c => {
            c.bottom().left();
            c.button(Icon.refresh, () => {
                Vars.ui.loadfrag.show();
                checkUpdate(result => {
                    Vars.ui.loadfrag.hide();
                    if (!result) {
                        Vars.ui.showInfo("@be.noupdates");
                    }
                });
            }).size(60, 60).padLeft(60);
        });
    };

    const checkUpdate = (done) => {
        Http.get("https://raw.githubusercontent.com/Lysent/etigei-exile/refs/heads/main/mod.json")
            .error(e => {
                done.get(false);
            })
            .submit(res => {

                const json = JSON.parse(res.getResultAsString());
                const version = json.tag_name;
                if (version) {
                    done(false);
                } else {
                    updateAvailable = true;
                    updateBuild = version;
                    showUpdateDialog();
                    done(true);2
                }
            });
    };

    const showUpdateDialog = () => {
        Vars.ui.showCustomConfirm(
            Core.bundle.format("etigeox.update", updateBuild), "@etigeox.update.description",
            "@ok", "@cancel",
            () => {
                Vars.ui.showCustomConfirm("", "AAAA", "@ok", "@cancel",
                    () => Core.app.exit(), () => { }
                );
                Vars.ui.mods.githubImportMod("Lysent/etigei-exile",false);
                updateAvailable = false;
            },
            () => { }
        );
    };

    return {
        init: init,
        checkUpdate: checkUpdate,
        showUpdateDialog: showUpdateDialog
    }
}

module.exports = UpdateChecker;