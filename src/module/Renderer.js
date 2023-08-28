import EventEmitter from "events";
import { Container } from "../../../2d-rendering/lib/display/Container";

export class App extends EventEmitter {

    constructor() {
        this._paused = false;
        this._lastTime = performance.now();
        this.view = document.createElement("canvas");
        this.stage = new Node();
    }

    render() {
        this.renderer.render(this.stage);
    }

}