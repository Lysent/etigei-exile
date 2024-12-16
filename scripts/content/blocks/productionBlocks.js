// QM Refinery
const qm = extend(GenericCrafter, "mini-refinery", {
    configurations: ObjectMap.of(
        Item,
        extend(Cons2, {
            get: (b, s) => b.setSoutItem(s)
        }),

        java.lang.Integer,
        extend(Cons2, {
            get: (b, s) => b.setSoutQuant(s)
        })
    )
});
qm.buildType = () => extend(GenericCrafter.GenericCrafterBuild, qm, {
    buildConfiguration(table) {
        let button = (item, qtty) => {
            const vitem = Vars.content.item(item);

            const btn = table.button(new TextureRegionDrawable(vitem.uiIcon), Styles.clearNoneTogglei, () => {
                //log("EATING PANTS ", vitem);
                log(Object.keys(vitem));
                this.sout.item = vitem;
                this.sout.amount = qtty;
                this.configure(this.sout.item);
                this.configure(this.sout.amount);
            });

            //btn.update(() => btn.checked = this.sout.item == vitem);
        };
        button("etigeox-tin", 3);
        button("etigeox-alumin", 3);
        button("etigeox-silver", 3);
    },
    write(write) {
        this.super$write(write);

        // soutid is the item's id.
        write.str(this.sout.item.name);
        // soutamount is the item's amount.
        write.i(this.sout.amount);
    },
    read(read, revision) {
        this.super$read(read, revision);

        this.sout.item = Vars.content.item(read.str());
        this.sout.amount = read.i();
    },
    getItem() {
        return new ItemStack(this.sout.item, this.sout.amount);
    },
    setSoutItem(s) {
        this.sout.item = s;
    },
    setSoutQuant(s) {
        this.sout.amount = s;
    },

    sout: {
        item: Vars.content.item("etigeox-alumin"),
        amount: 1
    },
    craft() {
        this.consume();

        if (this.getItem() != null) {
            for (let i = 0; i < this.getItem().amount; i++) {
                this.offload(this.getItem().item);
            }
        }

        if (this.wasVisible) this.block.craftEffect.at(this.x, this.y);

        this.progress %= 1;
    }
});

// Middle Refinery

const mm = extend(HeatCrafter, "refinery", {
    configurations: ObjectMap.of(
        Item,
        extend(Cons2, {
            get: (b, s) => b.setSoutItem(s)
        }),

        java.lang.Integer,
        extend(Cons2, {
            get: (b, s) => b.setSoutQuant(s)
        })
    )
});
mm.buildType = () => extend(HeatCrafter.HeatCrafterBuild, mm, {
    buildConfiguration(table) {
        let button = (item, qtty) => {
            const vitem = Vars.content.item(item);

            const btn = table.button(new TextureRegionDrawable(vitem.uiIcon), Styles.clearNoneTogglei, () => {
                //log("EATING PANTS ", vitem);
                log(Object.keys(vitem));
                this.sout.item = vitem;
                this.sout.amount = qtty;
                this.configure(this.sout.item);
                this.configure(this.sout.amount);
            });

            //btn.update(() => btn.checked = this.sout.item == vitem);
        };
        button("etigeox-tin", 7);
        button("etigeox-alumin", 7);
        button("etigeox-silver", 7);
    },
    write(write) {
        this.super$write(write);

        // soutid is the item's id.
        write.str(this.sout.item.name);
        // soutamount is the item's amount.
        write.i(this.sout.amount);
    },
    read(read, revision) {
        this.super$read(read, revision);

        this.sout.item = Vars.content.item(read.str());
        this.sout.amount = read.i();
    },
    getItem() {
        return new ItemStack(this.sout.item, this.sout.amount);
    },
    setSoutItem(s) {
        this.sout.item = s;
    },
    setSoutQuant(s) {
        this.sout.amount = s;
    },

    sout: {
        item: Vars.content.item("etigeox-alumin"),
        amount: 3
    },
    craft() {
        this.consume();

        if (this.getItem() != null) {
            for (let i = 0; i < this.getItem().amount; i++) {
                this.offload(this.getItem().item);
            }
        }

        if (this.wasVisible) this.block.craftEffect.at(this.x, this.y);

        this.progress %= 1;
    }
});