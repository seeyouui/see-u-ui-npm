/// <reference types="D:/seeyouui/SeeYouUINpm/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
/**
 * Text 文本
 * @description 此组件基于uniapp官方button，进行二次封装
 * @tutorial http://113.44.242.235:9000/components/text/
 *
 * @property {String | Number}														text			内容
 * @property {"text" | "link" | "phone" | "date" | "timeago" | "price"}		mode			文本处理的匹配模式text-普通文本，price-价格，phone-手机号，name-姓名，date-日期，link-链接（默认 'text'）
 * @property {"info" | "primary" | "error" | "warning" | "success"}			type			文本的预置样式，info，primary，error，warning，success (默认 'info' )
 * @property {String}														color			自定义文本颜色（填写此值时，type失效。）
 * @property {String}														href			超链接
 * @property {String}														phoneNumber		手机号
 * @property {String | Number | Date}										date			日期（时间戳格式）
 * @property {String}														dateFormat		日期格式（默认'YYYY-MM-DD'）
 *
 * @example
 */
import { computed } from "vue";
import SeeLink from "../SeeLink/index.vue";
import { formatDate } from "@/utils/hooks/useDateFormat";
import { formatTimeAgo } from "@/utils/hooks/useTimeAgo";
import { formatCurrency } from "@/utils/hooks/useCurrencyFormat";
const props = withDefaults(defineProps(), {
    text: "",
    type: "info",
    mode: "text",
    color: "",
    href: "",
    phoneNumber: "",
    date: "",
    dateFormat: "YYYY-MM-DD",
});
const emit = defineEmits();
const getClass = computed(() => {
    return props.color ? "" : props.type;
});
const getStyle = computed(() => {
    return {
        color: props.color,
    };
});
const onClick = () => {
    emit("onClick");
    if (props.mode === "phone") {
        // #ifndef H5
        uni.makePhoneCall({
            phoneNumber: props.phoneNumber,
        });
        // #endif
        // #ifdef H5
        uni.showToast({
            title: "H5不支持，请使用小程序或APP点击",
            icon: "none",
        });
        // #endif
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_defaults = {
    text: "",
    type: "info",
    mode: "text",
    color: "",
    href: "",
    phoneNumber: "",
    date: "",
    dateFormat: "YYYY-MM-DD",
};
const __VLS_ctx = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, {}), {}), {}), {}), {});
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.view, __VLS_intrinsics.view)(Object.assign({ onClick: (__VLS_ctx.onClick) }, { class: "see-text" }));
// @ts-ignore
[onClick,];
if (props.mode === 'text') {
    __VLS_asFunctionalElement(__VLS_intrinsics.text, __VLS_intrinsics.text)(Object.assign({ class: (__VLS_ctx.getClass) }, { style: (__VLS_ctx.getStyle) }));
    // @ts-ignore
    [getClass, getStyle,];
    (props.text);
}
if (props.mode === 'link') {
    /** @type {[typeof SeeLink, typeof SeeLink, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(SeeLink, new SeeLink({
        text: (props.text),
        type: (props.type),
        href: (props.href),
    }));
    const __VLS_1 = __VLS_0({
        text: (props.text),
        type: (props.type),
        href: (props.href),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
}
if (props.mode === 'phone') {
    __VLS_asFunctionalElement(__VLS_intrinsics.text, __VLS_intrinsics.text)(Object.assign({ class: (__VLS_ctx.getClass) }, { style: (__VLS_ctx.getStyle) }));
    // @ts-ignore
    [getClass, getStyle,];
    (props.text);
}
if (props.mode === 'price') {
    __VLS_asFunctionalElement(__VLS_intrinsics.text, __VLS_intrinsics.text)(Object.assign({ class: (__VLS_ctx.getClass) }, { style: (__VLS_ctx.getStyle) }));
    // @ts-ignore
    [getClass, getStyle,];
    (__VLS_ctx.formatCurrency(props.text));
    // @ts-ignore
    [formatCurrency,];
}
if (props.mode === 'date') {
    __VLS_asFunctionalElement(__VLS_intrinsics.text, __VLS_intrinsics.text)(Object.assign({ class: (__VLS_ctx.getClass) }, { style: (__VLS_ctx.getStyle) }));
    // @ts-ignore
    [getClass, getStyle,];
    (__VLS_ctx.formatDate(props.date, props.dateFormat));
    // @ts-ignore
    [formatDate,];
}
if (props.mode === 'timeago') {
    __VLS_asFunctionalElement(__VLS_intrinsics.text, __VLS_intrinsics.text)(Object.assign({ class: (__VLS_ctx.getClass) }, { style: (__VLS_ctx.getStyle) }));
    // @ts-ignore
    [getClass, getStyle,];
    (__VLS_ctx.formatTimeAgo(props.date));
    // @ts-ignore
    [formatTimeAgo,];
}
/** @type {__VLS_StyleScopedClasses['see-text']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};
