// 引入components
import { SeeButton } from "./components/SeeButton/index";
import { SeeText } from "./components/SeeText/index";
import { SeeLink } from "./components/SeeLink/index";

// app.use 安装
const components = [SeeButton, SeeText, SeeLink];
const install = (app: any) => {
  components.forEach((component) => {
    if (component.name) {
      app.component(component.name, component);
    }
  });
};

// 支持按需引入
export { SeeButton, SeeText, SeeLink };

// 支持默认全量引入
export default {
  install,
  SeeButton,
  SeeText,
  SeeLink,
};
