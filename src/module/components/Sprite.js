export class Sprite {
    constructor(url) {
        this._x = 0;
        this._y = 0;
        this._width = 0;
        this._height = 0;
        this.globalX = 0;
        this.globalY = 0;

        this._visible = true;
        this._parent = null;
        this._renderer = null;
        this.renderable = false;

        if(url){
            var image = new Image();
            this.texture = image;
            image.src = url;
            image.onload = this.updateTexture.bind(this);
        }
    }

    get visible(){
        return this._visible;
    }

    set visible(value){
        this._visible = value;
    }

    get x() {
        return this._x;
    }

    set x(x) {
        this._x = x;
    }

    get y() {
        return this._y;
    }

    set y(y) {
        this._y = y;
    }

    get width() {
        return this._width;
    }

    set width(w) {
        this._width = w;
        this.update();
    }

    get height() {
        return this._height;
    }

    set height(h) {
        this._height = h;
        this.update();
    }

    get parent(){
        return this._parent;
    }

    set parent(value){
        this._parent = value;
    }

    get renderer(){
        return this._renderer;
    }

    set renderer(renderer){
        this._renderer = renderer;
    }

    update(callback) {
        if (typeof callback === "function") callback();
    }

    updateTransform(parent){
        this.globalX = parent.globalX + this.x;
        this.globalY = parent.globalY + this.y;
    }

    updateTexture() {
        this.width = this._width === 0 ? this.texture.naturalWidth : this._width;
        this.height = this._height === 0 ? this.texture.naturalHeight : this._height;
        this.renderable = true;
    }

    render() {
        this.updateTransform(this.parent);
        if (this.renderable)
            this.renderer.context2d.drawImage(this.texture, this.globalX, this.globalY, this.width, this.height);
    }

}