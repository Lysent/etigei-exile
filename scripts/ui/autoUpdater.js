// const UpdateChecker = () => {
//     let updateAvailable = false;
//     let updateBuild;

//     const init = () => {
//         Vars.ui.menuGroup["fill(arc.func.Cons)"](c => {
//             c.bottom().left();
//             c.button("Update", Icon.refresh, () => {
//                 Vars.ui.loadfrag.show();
//                 checkUpdate(result => {
//                     Vars.ui.loadfrag.hide();
//                     if (!result) {
//                         Vars.ui.showInfo("@be.noupdates");
//                     }
//                 });
//             }).size(200, 60).update(t => {
//                 t.getLabel().setColor(updateAvailable ? Tmp.c1.set(Color.white).lerp(Pal.accent, Mathf.absin(5, 1)) : Color.white);
//             });
//         });
//     };

//     const checkUpdate = (done) => {
//         Http.get("https://raw.githubusercontent.com/Lysent/etigei-exile/refs/heads/main/mod.json")
//             .error(e => {
//                 done.get(false);
//             })
//             .submit(res => {

//                 const json = JSON.parse(res.getResultAsString());
//                 const version = json.tag_name;
//                 if (version) {
//                     done(false);
//                 } else {
//                     updateAvailable = true;
//                     updateBuild = version;
//                     showUpdateDialog();
//                     done(true);
//                 }
//             });
//     };

//     const showUpdateDialog = () => {
//         Vars.ui.showCustomConfirm(
//             Core.bundle.format("etigeox.update", updateBuild), "@be.update.confirm",
//             "@ok", "@be.ignore",
//             () => {
//                 Vars.ui.showCustomConfirm("", "@informatis.update-reloadexit", "@ok", "@be.ignore",
//                     () => Core.app.exit(), () => { }
//                 );
//                 Vars.ui.mods.githubImportMod("Lysent/etigei-exile",false);
//                 updateAvailable = false;
//             },
//             () => { }
//         );
//     };

//     return {
//         init: init,
//         checkUpdate: checkUpdate,
//         showUpdateDialog: showUpdateDialog
//     }
// }

// module.exports = UpdateChecker;