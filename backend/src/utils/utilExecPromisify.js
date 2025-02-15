import util from "util";
import child_process from "child_process";
const execPromisified = util.promisify(child_process.exec);
export default execPromisified;