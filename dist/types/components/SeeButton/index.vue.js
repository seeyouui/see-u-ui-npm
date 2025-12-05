/// <reference types="D:/seeyouui/SeeYouUINpm/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
var _a;
/**
 * Button 按钮
 * @description 此组件基于uniapp官方button，进行二次封装
 * @tutorial http://113.44.242.235:9000/components/button/
 *
 * @property {String}												title			标题
 * @property {"normal" | "large" | "small" | "mini"}				size			大小（默认normal）
 * @property {"info" | "primary" | "error" | "warning" | "success"}	type			按钮的预置样式，info，primary，error，warning，success (默认 'info' )
 * @property {Style}												color			按钮颜色(默认空，会覆盖type的颜色)
 * @property {Style}												textColor		标题颜色
 * @property {Boolean}												isRipple		是否启用水波纹（默认false）
 * @property {Number}												rippleTime		水波纹持续时间（默认500ms）
 * @property {Number}												maskTime		遮罩层持续时间（默认1000ms，建议为rippleTime的2倍）
 * @property {String}												rippleColor		水波纹颜色（默认rgba(0, 0, 0, .15)）
 * @property {Object}												rippleStyle		水波纹样式
 * @property {Object}												customStyle		按钮样式
 * @property {String | NULL}										hoverClass		点击按钮时样式
 * @property {1 | 0}												border			按钮边框（默认1，为0时无边框）
 * @property {Boolean}												isDisabled		是否禁用状态
 * @property {Number}												radius			圆角（默认4px）
 *
 * @example <SeeButton title="主要按钮" type="primary" isRipple />
 */
import { ref, computed, nextTick, getCurrentInstance } from "vue";
let globalId = 0;
const instance = getCurrentInstance();
const props = withDefaults(defineProps(), {
    title: "",
    size: "normal",
    type: "info",
    color: "",
    textColor: "",
    isRipple: false,
    rippleTime: 500,
    maskTime: 1000,
    isHollow: false,
    rippleColor: "rgba(0, 0, 0, .15)",
    rippleStyle: null,
    customStyle: null,
    hoverClass: "",
    border: 1,
    isDisabled: false,
    radius: 4,
});
const emit = defineEmits();
/** ---------- state ---------- */
globalId++;
const rippleTop = ref(0);
const rippleLeft = ref(0);
const active = ref(false);
const field = ref({});
const seeButtonId = "seeButton_" + globalId;
/** 水波动画队列 */
let rippleUniqueId = 0;
const rippleQueue = ref([]);
/** ---------- methods ---------- */
/**
 * @title 生成按钮 hoverClass
 * @description 根据按钮的多种配置动态计算最终的 hover class。
 *
 * @returns {string} 最终用于组件的 hover class 名称
 */
const getHoverClass = computed(() => {
    if (props.isRipple)
        return "none";
    if (props.hoverClass)
        return props.hoverClass;
    if (props.isHollow) {
        return `button-hover-${props.type}-hollow`;
    }
    return `button-hover-${props.type}`;
});
/**
 * @title 触摸开始事件（H5: click / App: touchstart）
 * @description 触发水波纹动画的入口函数。
 *
 * @param {Event} e 触摸或点击事件对象
 */
const onTouchstart = (e) => {
    active.value = false;
    nextTick(() => activeWaves(e));
};
/**
 * @title 启动水波纹效果
 * @description 根据触点坐标与按钮尺寸计算水波纹的位置与直径，然后启动动画。
 *
 * 平台兼容：
 * - 百度小程序：使用 changedTouches
 * - 支付宝小程序：使用 detail
 * - 其他平台：使用 touches
 *
 * @param {TouchEvent} e 触摸事件
 */
const activeWaves = (e) => {
    getClientRect().then((data) => {
        if (!(data === null || data === void 0 ? void 0 : data.height))
            return;
        data.finalWidth = data.height > data.width ? data.height : data.width;
        if (!data.finalWidth)
            return;
        field.value = data;
        let touchesX;
        let touchesY;
        // #ifdef MP-BAIDU
        touchesX = e.changedTouches[0].clientX;
        touchesY = e.changedTouches[0].clientY;
        // #endif
        // #ifdef MP-ALIPAY
        touchesX = e.detail.clientX;
        touchesY = e.detail.clientY;
        // #endif
        // #ifndef MP-BAIDU || MP-ALIPAY
        touchesX = e.touches[0].clientX;
        touchesY = e.touches[0].clientY;
        // #endif
        rippleTop.value = touchesY - data.top - data.finalWidth / 2;
        rippleLeft.value = touchesX - data.left - data.finalWidth / 2;
        nextTick(() => (active.value = true));
        rippleQueue.value.push({
            id: rippleUniqueId++,
            x: touchesX - data.left - data.finalWidth / 2,
            y: touchesY - data.top - data.finalWidth / 2,
            size: data.finalWidth,
        });
    });
};
// 新增：动画结束回调，替代 setTimeout
const removeRipple = (id) => {
    const index = rippleQueue.value.findIndex((item) => item.id === id);
    if (index > -1)
        rippleQueue.value.splice(index, 1);
};
/**
 * @title 获取按钮 DOM 位置与尺寸
 * @description Promise 包装的 uni.createSelectorQuery，用于获取按钮位置。
 *
 * @returns {Promise<ClientRectData>} 按钮的位置信息
 */
const getClientRect = () => {
    return new Promise((resolve) => {
        const query = uni.createSelectorQuery().in(instance);
        const id = "#" + seeButtonId;
        query
            .select(id)
            .boundingClientRect((data) => {
            resolve(data);
        })
            .exec();
    });
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_defaults = {
    title: "",
    size: "normal",
    type: "info",
    color: "",
    textColor: "",
    isRipple: false,
    rippleTime: 500,
    maskTime: 1000,
    isHollow: false,
    rippleColor: "rgba(0, 0, 0, .15)",
    rippleStyle: null,
    customStyle: null,
    hoverClass: "",
    border: 1,
    isDisabled: false,
    radius: 4,
};
const __VLS_ctx = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, {}), {}), {}), {}), {});
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['hollow-info']} */ ;
/** @type {__VLS_StyleScopedClasses['hollow-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['hollow-error']} */ ;
/** @type {__VLS_StyleScopedClasses['hollow-warning']} */ ;
/** @type {__VLS_StyleScopedClasses['hollow-success']} */ ;
/** @type {__VLS_StyleScopedClasses['hollow-info']} */ ;
/** @type {__VLS_StyleScopedClasses['hollow-info']} */ ;
/** @type {__VLS_StyleScopedClasses['hollow-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['hollow-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['hollow-error']} */ ;
/** @type {__VLS_StyleScopedClasses['hollow-error']} */ ;
/** @type {__VLS_StyleScopedClasses['hollow-warning']} */ ;
/** @type {__VLS_StyleScopedClasses['hollow-warning']} */ ;
/** @type {__VLS_StyleScopedClasses['hollow-success']} */ ;
/** @type {__VLS_StyleScopedClasses['hollow-success']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.view, __VLS_intrinsics.view)(Object.assign(Object.assign(Object.assign(Object.assign({ onClick: (...[$event]) => {
        __VLS_ctx.onTouchstart($event);
        // @ts-ignore
        [onTouchstart,];
    } }, { id: (__VLS_ctx.seeButtonId) }), { style: (Object.assign(Object.assign({}, props.customStyle), { borderRadius: props.radius + 'px' })) }), { class: "see-button" }), { class: ([props.size]) }));
// @ts-ignore
[seeButtonId,];
__VLS_asFunctionalElement(__VLS_intrinsics.view, __VLS_intrinsics.view)(Object.assign(Object.assign(Object.assign(Object.assign({ onTouchstart: (...[$event]) => {
        __VLS_ctx.onTouchstart($event);
        // @ts-ignore
        [onTouchstart,];
    } }, { id: (__VLS_ctx.seeButtonId) }), { style: (Object.assign(Object.assign({}, props.customStyle), { borderRadius: props.radius + 'px' })) }), { class: "see-button" }), { class: ([props.size]) }));
// @ts-ignore
[seeButtonId,];
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(Object.assign(Object.assign(Object.assign({ style: (Object.assign(Object.assign({}, props.customStyle), { borderRadius: props.radius + 'px', background: props.color })) }, { class: "see-botton-class" }), { class: ([
        props.size,
        props.isDisabled && `disabled-${props.type}`,
        props.isHollow ? `hollow-${props.type}` : props.type,
        `border-${props.type}-${(_a = props.border) !== null && _a !== void 0 ? _a : 1}`,
    ]) }), { 'hover-class': (__VLS_ctx.getHoverClass), disabled: (props.isDisabled) }));
// @ts-ignore
[getHoverClass,];
__VLS_asFunctionalElement(__VLS_intrinsics.text, __VLS_intrinsics.text)(Object.assign({ style: ({ color: props.textColor }) }, { class: "title" }));
(props.title);
var __VLS_0 = {};
if (props.isRipple) {
    __VLS_asFunctionalElement(__VLS_intrinsics.view, __VLS_intrinsics.view)(Object.assign(Object.assign({ class: "see-button-ripple" }, { class: ({ active: __VLS_ctx.active }) }), { style: (Object.assign(Object.assign({}, props.rippleStyle), { top: __VLS_ctx.rippleTop + 'px', left: __VLS_ctx.rippleLeft + 'px', width: __VLS_ctx.field.finalWidth + 'px', height: __VLS_ctx.field.finalWidth + 'px', 'background-color': __VLS_ctx.rippleColor, '--ripple-time': props.rippleTime + 'ms', '--mask-time': props.maskTime + 'ms' })) }));
    // @ts-ignore
    [active, rippleTop, rippleLeft, field, field, rippleColor,];
}
/** @type {__VLS_StyleScopedClasses['see-button']} */ ;
/** @type {__VLS_StyleScopedClasses['see-button']} */ ;
/** @type {__VLS_StyleScopedClasses['see-botton-class']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['see-button-ripple']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
// @ts-ignore
var __VLS_1 = __VLS_0;
const __VLS_base = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
