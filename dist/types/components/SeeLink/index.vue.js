/// <reference types="D:/seeyouui/SeeYouUINpm/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
/**
 * Link 链接
 * @description 此组件基于uniapp官方button，进行二次封装
 * @tutorial http://113.44.242.235:9000/components/link/
 *
 * @property {String | Number}										text			内容
 * @property {"info" | "primary" | "error" | "warning" | "success"}	type			文本的预置样式，info，primary，error，warning，success (默认 'info' )
 * @property {String}												color			自定义文本颜色（填写此值时，type失效。）
 * @property {String}												href			超链接
 * @property {Boolean}												isLine			是否添加下划线（默认false）
 * @property {String}												lineColor		下划线颜色（填写此字段后type失效）
 *
 * @example
 */
import { nextTick, computed } from "vue";
const props = withDefaults(defineProps(), {
    text: "",
    type: "info",
    color: "",
    href: "",
    isLine: false,
    lineColor: "",
});
const emit = defineEmits();
const getClass = computed(() => {
    const classes = [];
    // 当没有自定义颜色时，应用 type 类型 (primary/error/etc)
    if (!props.color) {
        classes.push(props.type);
    }
    // 是否添加下划线样式类
    if (props.isLine) {
        classes.push("href");
    }
    return classes.join(" ");
});
const getStyle = computed(() => {
    const style = {};
    if (props.color) {
        style.color = props.color;
    }
    // 如果有下划线且定义了下划线颜色，覆盖默认边框色
    if (props.isLine && props.lineColor) {
        style.borderBottomColor = props.lineColor;
    }
    return style;
});
const onClick = () => {
    var _a;
    emit("onClick");
    if ((_a = props.href) !== null && _a !== void 0 ? _a : "") {
        // #ifdef APP-PLUS
        plus.runtime.openURL(props.href);
        // #endif
        // #ifdef H5
        window.open(props.href);
        // #endif
        // #ifdef MP
        uni.setClipboardData({
            data: props.href,
            success: () => {
                uni.hideToast();
                nextTick(() => {
                    uni.showToast({
                        title: "链接已复制，请在浏览器打开",
                        icon: "none",
                    });
                });
            },
        });
        // #endif
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_defaults = {
    text: "",
    type: "info",
    color: "",
    href: "",
    isLine: false,
    lineColor: "",
};
const __VLS_ctx = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, {}), {}), {}), {}), {});
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.text, __VLS_intrinsics.text)(Object.assign(Object.assign({ onClick: (__VLS_ctx.onClick) }, { class: (__VLS_ctx.getClass) }), { style: (__VLS_ctx.getStyle) }));
// @ts-ignore
[onClick, getClass, getStyle,];
(props.text);
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};
