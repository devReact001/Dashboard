import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// ✅ ADD THESE
import { ModuleRegistry, AllCommunityModule } from "ag-charts-community";

ModuleRegistry.registerModules([AllCommunityModule]);

createApp(App).use(router).mount("#app");