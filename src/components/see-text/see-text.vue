<template>
	<view class="see-text" @click="onClick">
		<!-- 普通文本 -->
		<text v-if="props.mode === 'text' && !props.isCountUp" :class="getClass" :style="getStyle">
			{{ props.text }}
		</text>

		<!-- 数字滚动 -->
		<view v-if="props.mode === 'text' && props.isCountUp" class="countup">
			<view
				v-for="(item, index) in renderList"
				:key="index"
				class="digit"
				:style="getStyle"
			>
				<!-- 非数字字符 -->
				<text v-if="item.type === 'char'" class="char">
					{{ item.value }}
				</text>

				<!-- 数字滚动 -->
				<view v-else class="digit-box">
					<view
						class="digit-inner"
						:class="{ animate: item.animate }"
						:style="{
							transform: `translateY(-${item.value}em)`,
							transitionDuration: props.countUp.duration + 'ms'
						}"
					>
						<text v-for="n in 10" :key="n" class="num">
							{{ n - 1 }}
						</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 链接 -->
		<see-link v-if="props.mode === 'link'" :text="props.text" :type="props.type" :href="props.href" :size="props.size"></see-link>

		<!-- 电话 -->
		<text v-if="props.mode === 'phone'" :class="getClass" :style="getStyle">
			{{ props.text }}
		</text>

		<!-- 金额 -->
		<text v-if="props.mode === 'price' && !props.isCountUp" :class="getClass" :style="getStyle">
			{{ formatCurrency(props.text) }}
		</text>

		<!-- 金额 + 数字滚动 -->
		<view v-if="props.mode === 'price' && props.isCountUp" class="countup">
			<view
				v-for="(item, index) in renderList"
				:key="index"
				class="digit"
				:style="getStyle"
			>
				<!-- 非数字字符 -->
				<text v-if="item.type === 'char'" class="char">
					{{ item.value }}
				</text>

				<!-- 数字滚动 -->
				<view v-else class="digit-box">
					<view
						class="digit-inner"
						:class="{ animate: item.animate }"
						:style="{
							transform: `translateY(-${item.value}em)`,
							transitionDuration: props.countUp.duration + 'ms'
						}"
					>
						<text v-for="n in 10" :key="n" class="num">
							{{ n - 1 }}
						</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 日期 -->
		<text v-if="props.mode === 'date'" :class="getClass" :style="getStyle">
			{{ formatDate(props.date, props.dateFormat) }}
		</text>

		<!-- 时间距今 -->
		<text v-if="props.mode === 'timeago'" :class="getClass" :style="getStyle">
			{{ formatTimeAgo(props.date) }}
		</text>
	</view>
</template>

<script lang="ts">
/**
 * Text 文本
 * @description 文本组件，此组件集成了文本类在项目中的常用功能，包括设置主题，拨打电话，格式化日期，显示金额，超链接...等功能。 您大可不必在使用特殊文本时自己定义，text 组件几乎涵盖您能使用的大部分场景。
 * @tutorial https://www.seeuui.cn/components/text/
 *
 * @property {String | Number}												text			内容
 * @property {"text" | "link" | "phone" | "date" | "timeago" | "price"}		mode			文本处理的匹配模式text-普通文本，price-价格，phone-手机号，name-姓名，date-日期，link-链接（默认 'text'）
 * @property {"info" | "primary" | "error" | "warning" | "success"}			type			文本的预置样式，info，primary，error，warning，success (默认 'info' )
 * @property {String}														color			自定义文本颜色（填写此值时，type失效。）
 * @property {String}														href			超链接
 * @property {String}														phoneNumber		手机号
 * @property {String | Number | Date}										date			日期（时间戳格式）
 * @property {String}														dateFormat		日期格式（默认'YYYY-MM-DD'）
 * @property {String | Number}												size			字体大小（px），默认16
 * @property {Number}														isCountUp		是否开启数字滚动
 * @property {Object}														countUp			数字滚动配置
 * @example
 */
export default {
	name: 'SeeText'
};
</script>

<script lang="ts" setup>
import { computed, ref, watch, onBeforeUnmount } from 'vue';
import SeeLink from '../see-link/see-link.vue';
import { formatDate } from '../../utils/hooks/useDateFormat';
import { formatTimeAgo } from '../../utils/hooks/useTimeAgo';
import { formatCurrency } from '../../utils/hooks/useCurrencyFormat';

/** ---------- props ---------- */
const props = withDefaults(
	defineProps<{
		text?: string | number;
		type?: 'info' | 'primary' | 'error' | 'warning' | 'success';
		mode?: 'text' | 'link' | 'phone' | 'date' | 'timeago' | 'price';
		color?: string;
		href?: string;
		phoneNumber?: string;
		date?: string | number | Date;
		dateFormat?: string;
		size: string | number;
		isCountUp?: boolean;
		countUp?: {
			duration?: number;
			animateDuration?: number;
			decimals?: number;
			thousand?: boolean;
		};
	}>(),
	{
		text: '',
		type: 'info',
		mode: 'text',
		color: '',
		href: '',
		phoneNumber: '',
		date: '',
		dateFormat: 'YYYY-MM-DD',
		size: 16,
		isCountUp: false,
		countUp: () => ({
			duration: 300,
			animateDuration: 1000,
			decimals: 2,
			thousand: true
		})
	}
);

/** ---------- emits ---------- */
const emit = defineEmits<{
	(e: 'onClick'): void;
}>();

/** ---------- CountUp 相关 ---------- */
const currentValue = ref(0);
const renderList = ref<Array<{ type: string; value: number | string; animate: boolean }>>([]);
const timer = ref<any>(null);

const getClass = computed(() => {
	return props.color ? '' : props.type;
});

const getStyle = computed(() => {
	return {
		color: props.color,
		fontSize: typeof props.size === 'number' ? `${props.size}px` : props.size
	};
});

/** 启动递增动画 */
const startCount = (target: number) => {
	if (timer.value) {
		clearInterval(timer.value);
	}

	const start = currentValue.value || 0;
	const end = target;
	const frameTime = 16;
	const steps = Math.max(1, Math.floor(props.countUp.animateDuration / frameTime));
	const stepValue = (end - start) / steps;

	let current = start;
	let count = 0;

	timer.value = setInterval(() => {
		count++;
		current += stepValue;

		if (count >= steps) {
			current = end;
			clearInterval(timer.value);
		}

		currentValue.value = current;
		updateRender(current);
	}, frameTime);
};

/** 只更新变化的位 */
const updateRender = (val: number) => {
	let numStr = '';
	
	if (props.mode === 'price') {
		numStr = formatCurrency(val);
	} else {
		numStr = Number(val).toFixed(props.countUp.decimals);
		
		if (props.countUp.thousand) {
			const [intPart, decPart] = numStr.split('.');
			numStr = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (decPart ? '.' + decPart : '');
		}
	}

	const chars = numStr.split('');
	const newList: Array<{ type: string; value: number | string; animate: boolean }> = [];

	chars.forEach((ch, index) => {
		const oldItem = renderList.value[index];

		// 数字
		if (/\d/.test(ch)) {
			const newVal = Number(ch);

			if (oldItem && oldItem.type === 'num' && oldItem.value === newVal) {
				// 没变化：不动画
				newList.push({
					...oldItem,
					animate: false
				});
			} else {
				// 变化：才滚动
				newList.push({
					type: 'num',
					value: newVal,
					animate: true
				});
			}
		} else {
			// 非数字
			newList.push({
				type: 'char',
				value: ch,
				animate: false
			});
		}
	});

	renderList.value = newList;
};

/** 监听 text 变化 */
watch(
	() => props.text,
	(val) => {
		if (props.isCountUp && (props.mode === 'text' || props.mode === 'price')) {
			startCount(Number(val));
		}
	},
	{ immediate: true }
);

onBeforeUnmount(() => {
	if (timer.value) {
		clearInterval(timer.value);
	}
});

const onClick = () => {
	emit('onClick');
	if (props.mode === 'phone') {
		// #ifndef H5
		uni.makePhoneCall({
			phoneNumber: props.phoneNumber
		});
		// #endif

		// #ifdef H5
		uni.showToast({
			title: 'H5不支持，请使用小程序或APP点击',
			icon: 'none'
		});
		// #endif
	}
};
</script>

<style lang="scss" scoped>
.see-text {
	display: inline-block;
}

.info {
}
.primary {
	color: $see-primary;
}
.error {
	color: $see-error;
}
.warning {
	color: $see-warning;
}
.success {
	color: $see-success;
}

.href {
	border-bottom: 1px $see-primary solid;
}

/* CountUp 样式 */
.countup {
	display: inline-flex;
	align-items: center;
	white-space: nowrap;
}

.digit {
	display: inline-flex;
	align-items: center;
	line-height: 1em;
}

.char {
	line-height: 1em;
}

.digit-box {
	height: 1em;
	overflow: hidden;
}

.digit-inner {
	display: flex;
	flex-direction: column;
	transform: translateY(0);
}

.digit-inner.animate {
	transition-property: transform;
	transition-timing-function: ease-out;
}

.num {
	height: 1em;
	line-height: 1em;
	text-align: center;
}
</style>