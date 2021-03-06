import { run } from "./App/index";
import registerServiceWorker from './registerServiceWorker';

// require all css files
function requireAll(r: any) {
    r.keys().forEach(r);
}

requireAll((require as any).context("./", true, /\.css$/));
registerServiceWorker();

run();