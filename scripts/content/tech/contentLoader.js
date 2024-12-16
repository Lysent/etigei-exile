// What have I done

const ContentParser = Packages.mindustry.mod.ContentParser;
const Locale = Packages.java.util.Locale;

const loadedMod = Vars.mods.getMod("etigeox");
const contentRoot = loadedMod.root.child("content");
const bootlegparser = new ContentParser();

const preload = (type, filename) => {
	const lower = type.name().toLowerCase(Locale.ROOT);
	const folder = contentRoot.child(lower + (lower.endsWith("s") ? "" : "s"));
	const files = folder.findAll(l => l.nameWithoutExtension() == filename);

	files.forEach(file => bootlegparser.parse(loadedMod, file.nameWithoutExtension(), file.readString("UTF-8"), file, type));
};


Events.on(ContentInitEvent, () => {
	log("etigeox", "tried loading content in the most hacky way")
	preload(ContentType.item, "hautite");
	preload(ContentType.item, "refined-etigeum");

	bootlegparser.finishParsing();
});