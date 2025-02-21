const linkButton = url => () => {
	if (!Core.app.openURI(url)) {
		Vars.ui.showErrorMessage("@linkfail");
		Core.app.setClipboardText(url);
	}
};

const UpdateChecker = require("./autoUpdater")

const NewsDialog = () => {
	let dialog;

	const mod = Vars.mods.getMod("etigeox");

	const
		urlNews = "https://raw.githubusercontent.com/Lysent/etigei-exile/refs/heads/main/news/" + Core.bundle.get("etigeox.news.file"),
		urlDiscord = "https://discord.com/invite/TJKZgr6UDg",
		urlWiki = "",
		urlGithub = "https://github.com/Lysent/etigei-exile";

	const load = () => {
		dialog = new BaseDialog(Core.bundle.format("etigeox.news.title", mod.meta.version));

		dialog.addCloseListener();

		const news = getNews();
		const checker = UpdateChecker();
		checker.init();
		MainMenu();

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
				t.button("@etigeox.news.update", Icon.download, linkButton()).row();
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

Events.on(ClientLoadEvent, () => {
	const newsInstance = NewsDialog();
	newsInstance.load();
});