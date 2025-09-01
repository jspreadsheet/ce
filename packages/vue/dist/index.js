import { h, getCurrentInstance, camelize } from 'vue';
import jss from 'jspreadsheet-ce';

export const Worksheet = {
    name: 'Worksheet',
};

export const Spreadsheet = {
    inheritAttrs: false,
    mounted() {
        const { attrs, slots } = getCurrentInstance();

        let options = {};
        for (const key in attrs) {
            options[camelize(key)] = attrs[key];
        }

        if (slots && typeof slots.default === 'function') {
            options.worksheets = slots.default().reduce((acc, vnode) => {
                if (vnode.type.name === 'Worksheet') {
                    let worksheetProps = {};

                    for (const key in vnode.props) {
                        worksheetProps[camelize(key)] = vnode.props[key];
                    }

                    acc.push({
                        minDimensions: [4, 4],
                        ...worksheetProps,
                    });
                }
                return acc;
            }, []);
        } else {
            if (attrs.worksheets) {
                options.worksheets = attrs.worksheets;
            }
        }

        if (attrs.id) {
            this.$refs.container.id = attrs.id;
        }

        this.el = this.$refs.container;

        this.current = jss(this.$refs.container, options);
    },
    setup() {
        let containerProps = {
            ref: 'container',
        };
        return () => h('div', containerProps);
    },
};

export let jspreadsheet = jss;

export default { Worksheet, Spreadsheet, jspreadsheet: jss };
