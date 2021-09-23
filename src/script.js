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

			// Add item to ragfair
			const ragfair_path = "db/assort/ragfair/items/snaccPack.json";
			const ragfair_item = JsonUtil.deserialize(VFS.readFile(`${modPath}/${ragfair_path}`));
			DatabaseServer.tables.traders.ragfair.assort.items.push(ragfair_item);

			const loyal_path = "db/assort/ragfair/loyal_level_items/snaccPack.json";
			DatabaseServer.tables.traders.ragfair.assort.loyal_level_items["snaccPack"] = JsonUtil.deserialize(VFS.readFile(`${modPath}/${loyal_path}`));

			const barter_path = "db/assort/ragfair/barter_scheme/snaccPack.json";
			DatabaseServer.tables.traders.ragfair.assort.barter_scheme["snaccPack"] = JsonUtil.deserialize(VFS.readFile(`${modPath}/${barter_path}`));

			// Add item to mr. Jaeger
			const trader_path = "db/assort/5c0647fdd443bc2504c2d371/items/snaccPack.json";
			const trader_item = JsonUtil.deserialize(VFS.readFile(`${modPath}/${trader_path}`));
			DatabaseServer.tables.traders["5c0647fdd443bc2504c2d371"].assort.items.push(trader_item);

			const trader_loyal_path = "db/assort/5c0647fdd443bc2504c2d371/loyal_level_items/snaccPack.json";
			DatabaseServer.tables.traders["5c0647fdd443bc2504c2d371"].assort.loyal_level_items["snaccPack"] = JsonUtil.deserialize(VFS.readFile(`${modPath}/${trader_loyal_path}`));

			const trader_barter_path = "db/assort/5c0647fdd443bc2504c2d371/barter_scheme/snaccPack.json";
			DatabaseServer.tables.traders["5c0647fdd443bc2504c2d371"].assort.barter_scheme["snaccPack"] = JsonUtil.deserialize(VFS.readFile(`${modPath}/${trader_barter_path}`));

			DatabaseServer.tables.templates.items["snaccPack"]._props.Grids[0]._props.cellsH = conf.snaccPack["internalHeight"];
			DatabaseServer.tables.templates.items["snaccPack"]._props.Grids[0]._props.cellsV = conf.snaccPack["internalWidth"];
		}
	}
}
module.exports.Mod = SnaccPack;