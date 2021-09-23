/*
HONK
*/

"use strict";

const conf = require("../config/config.json")
const modPath = ModLoader.getModPath("ducc-SnaccPack");

class SnaccPack {
	constructor() {
		this.mod = "ducc-SnaccPack";
		Logger.info("Loading: SnaccPack");
		ModLoader.onLoad[this.mod] = this.load.bind(this);
	}

	load() {
		if (conf.snaccPack["enabled"]) {

			// Items are added
			const item_path = "db/items/snaccPack.json";
			const item_object = JsonUtil.deserialize(VFS.readFile(`${modPath}/${item_path}`));
			DatabaseServer.tables.templates.items[item_object._id] = item_object;

			// Handbook entries are added
			const handbook_path = "db/templates/handbook/snaccPack.json";
			const handbook_item = JsonUtil.deserialize(VFS.readFile(`${modPath}/${handbook_path}`));
			DatabaseServer.tables.templates.handbook.Items.push(handbook_item)

			// Locale is fixed
			const locale_path = "db/locales/en/templates/snaccPack.json";
			DatabaseServer.tables.locales.global.en.templates["snaccPack"] = JsonUtil.deserialize(VFS.readFile(`${modPath}/${locale_path}`));

			// Add item to traders
			const ragfair_path = "db/assort/ragfair/items/snaccPack.json";
			const ragfair_item = JsonUtil.deserialize(VFS.readFile(`${modPath}/${ragfair_path}`));
			DatabaseServer.tables.traders.ragfair.assort.items.push(ragfair_item);

			const loyal_path = "db/assort/ragfair/loyal_level_items/snaccPack.json";
			DatabaseServer.tables.traders.ragfair.assort.loyal_level_items["snaccPack"] = JsonUtil.deserialize(VFS.readFile(`${modPath}/${loyal_path}`));

			const barter_path = "db/assort/ragfair/barter_scheme/snaccPack.json";
			DatabaseServer.tables.traders.ragfair.assort.barter_scheme["snaccPack"] = JsonUtil.deserialize(VFS.readFile(`${modPath}/${barter_path}`));


			DatabaseServer.tables.templates.items["snaccPack"]._props.Grids[0]._props.cellsH = conf.snaccPack["internalHeight"];
			DatabaseServer.tables.templates.items["snaccPack"]._props.Grids[0]._props.cellsV = conf.snaccPack["internalWidth"];
		}
	}
}
module.exports.Mod = SnaccPack;