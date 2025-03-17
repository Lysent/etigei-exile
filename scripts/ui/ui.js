const linkButton = url => () => {
	if (!Core.app.openURI(url)) {
		Vars.ui.showErrorMessage("@linkfail");
		Core.app.setClipboardText(url);
	}
};

// Updater

const UpdateChecker = () => {
	let updateAvailable = false;
	let updateBuild;

	const init = additionalUpdateButton => {
		checkUpdate(() => {
			Vars.ui.menuGroup["fill(arc.func.Cons)"](c => {
				c.bottom().left();
				const updateButton = c.button(Icon.refresh, () => checkUpdateGUI())
					.size(60, 60)
					.padLeft(60);

				paintButton(updateButton);
			});
		});
	};

	const paintButton = btn => {
		if(updateAvailable) btn.get().setColor(255, 0, 0, 1);
		return btn;
	}

	const checkUpdate = res => {
		Vars.ui.loadfrag.show();
		Http.get("https://raw.githubusercontent.com/Lysent/etigei-exile/refs/heads/main/mod.json")
			.error(e => {
				Vars.ui.loadfrag.hide();
				res(false);
			})
			.submit(res => {
				Vars.ui.loadfrag.hide();

				const json = JSON.parse(res.getResultAsString());
				const version = json.version;
				if (version === Vars.mods.getMod("etigeox").meta.version) {
					res(false);
				} else {
					updateAvailable = true;
					updateBuild = version;
					res(true);
				}
			});
	};

	const checkUpdateGUI = () => {
		if (!updateAvailable) {
			Vars.ui.showInfo("@be.noupdates");
		} else {
			showUpdateDialog();
		}
	};

	const showUpdateDialog = () => {
		Vars.ui.showCustomConfirm(
			Core.bundle.format("etigeox.update", updateBuild), "@etigeox.update.description",
			"@ok", "@cancel",
			() => {
				Vars.ui.showCustomConfirm("", "AAAA", "@ok", "@cancel",
					() => Core.app.exit(), () => { }
				);
				Vars.ui.mods.githubImportMod("Lysent/etigei-exile", false);
				updateAvailable = false;
			},
			() => { }
		);
	};

	return {
		init: init,
		paintButton: paintButton,
		checkUpdate: checkUpdate,
		showUpdateDialog: showUpdateDialog
	}
}

// Startup UI

const NewsDialog = () => {
	let dialog, news, checker;

	const mod = Vars.mods.getMod("etigeox");

	const
		urlNews = "https://raw.githubusercontent.com/Lysent/etigei-exile/refs/heads/main/news/" + Core.bundle.get("etigeox.news.file"),
		urlDiscord = "https://discord.com/invite/TJKZgr6UDg",
		urlWiki = "",
		urlGithub = "https://github.com/Lysent/etigei-exile";

	const load = () => {
		dialog = new BaseDialog(Core.bundle.format("etigeox.news.title", mod.meta.version));

		dialog.addCloseListener();

		news = getNews();
		checker = UpdateChecker();
		checker.init();
		MainMenu();
		MapButton();

		onResize(() => {
			dialog.cont.clear();
			loadBody(news);
			loadStar();
			loadButtons();
		});

		dialog.show();
	};

	const MainMenu = () => {
		Vars.ui.menuGroup["fill(arc.func.Cons)"](c => {
			c.bottom().left();
			c.button(Icon.list, () => {
				dialog.show();
			}).size(60, 60);
		});
	};

	const loadBody = (news) => {
		dialog.cont.image(Core.atlas.find("etigeox-banner", Core.atlas.find("clear")))
			.height(Vars.mobile ? 144 : 185).width(Vars.mobile ? 480 : 620).pad(3).center()
			.row();

		dialog.cont.pane(news).width(Vars.mobile ? 480 : 600)
			.maxWidth(Vars.mobile ? 480 : 600).pad(4);
	};

	const loadStar = () => {
		dialog.cont.row();
		dialog.cont["table(arc.func.Cons)"](t => {
			t.defaults().size(152 * 4, 42).pad(3);
			t.button("Please star the mod on GitHub if you've enjoyed", Icon.star, linkButton(urlGithub));
		}).center().fillX();
	};

	const loadButtons = () => {
		//Check if not on mobile Landscape mode
		if (!(Vars.mobile && !Core.graphics.isPortrait())) {
			dialog.cont.row();

			dialog.cont["table(arc.func.Cons)"](t => {
				t.defaults().size(148, 64).pad(3);

				t.button("Discord", Icon.discord, linkButton(urlDiscord));
				t.button("Wiki", Icon.book, linkButton(urlWiki));
				t.button("GitHub", Icon.githubSquare, linkButton(urlGithub));
				checker.paintButton(t.button("@etigeox.news.update", Icon.download, linkButton())).row();
			}).center().fillX().row();
			dialog.cont["table(arc.func.Cons)"](t => {
				t.defaults().size(128 * 4, 64).pad(3);
				t.button("@close", Icon.cancel, () => dialog.hide());
			}).center().fillX();
		} else { // If on landscape mobile

		}
	};

	const getNews = () => {
		const table = new Table();
		Log.info("[etigeox][lightgray] Fetching news...");

		Http.get(urlNews).error(err => {
			table.add("[red][ERROR] FAILED TO GET NEWS.").center();
			Log.err("[red][Etigeox][lightgray] " + err.getMessage());
		}).block(res => {
			table.add(res.getResultAsString()).left().growX().wrap().labelAlign(Align.left);
		});

		return table;
	};

	const onResize = cb => {
		Events.on(ResizeEvent, event => {
			if (dialog.isShown() && Core.scene.getDialog() == dialog) {
				cb();
				dialog.updateScrollFocus();
			}
		});
	};

	return {
		load: load
	};
};

// Map UI

const MapButton = () => {
	Vars.ui.menuGroup["fill(arc.func.Cons)"](c => {
		c.bottom().left();
		c.button(Icon.terrain, () => {
			MapDialog();
		}).size(60, 60).padBottom(60);
	});
}

const MapDialog = (mapname, dim) => {
	const SectorDialog = new BaseDialog(Core.bundle.format("etigeox.map.title"));
	let map = mapname || "etigeox-regions";
	let dim = dim || {
		height: 625,
		width: 500,
		mHeight: 625,
		mWidth: 500,
	};

	SectorDialog.addCloseListener();

	SectorDialog.cont["table(arc.func.Cons)"](t => {
		t.defaults().size(64 * 4, 64).pad(3);
		t.button(Core.bundle.format("etigeox.map.tab1"), Icon.terrain, () => {
			SectorDialog.hide();
			MapDialog("etigeox-regions", {
				height: 625,
				width: 500,
				mHeight: 625,
				mWidth: 500,
			});
		});
		t.button(Core.bundle.format("etigeox.map.tab2"), Icon.terrain, () => {
			SectorDialog.hide();
			MapDialog("etigeox-map-neoulandia", {
				height: 560,
				width: 1000,
				mHeight: 350,
				mWidth: 640,
			});
		});
	}).center().fillX().row();

	SectorDialog.cont.image(Core.atlas.find(map, Core.atlas.find("clear")))
		.height(Vars.mobile ? dim.mHeight : dim.height).width(Vars.mobile ? dim.mWidth : dim.width).pad(3).center()
		.row();

	SectorDialog.cont["table(arc.func.Cons)"](t => {
		t.defaults().size(128 * 4, 64).pad(3);
		t.button("@close", Icon.cancel, () => SectorDialog.hide());
	}).center().fillX();

	SectorDialog.show();
};

// Startup

Events.on(ClientLoadEvent, () => {
	const newsInstance = NewsDialog();
	newsInstance.load();
});