export class Container {
    constructor() {
        this._x = 0;
        this._y = 0;
        this._width = 1;
        this._height = 1;
        this.globalX = 0;
        this.globalY = 0;
        this._visible = true;
        this._renderer = null;
        this.children = [];
        this.parent = null;
    }

    get visible() {
        return this._visible;
    }

    set visible(value) {
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
        this.updateTransform(this.parent);
    }

    get renderer() {
        return this._renderer;
    }

    set renderer(renderer) {
        this._renderer = renderer;
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].renderer = this.renderer;
        }
    }

    get width() {
        for (let i = 0; i < this.children.length; i++) {
            if (this.children[i].width > this._width)
                this._width = this.children[i].width;
        }
        return this._width;
    }

    get height() {
        for (let i = 0; i < this.children.length; i++) {
            if (this.children[i].height > this._height)
                this._height = this.children[i].height;
        }
        return this._height;
    }

    update() {
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].update();
        }
    }

    updateTransform(parent) {
        this.globalX = parent.globalX + this.x;
        this.globalY = parent.globalY + this.y;
    }

    addChild(child) {
        child.renderer = this.renderer;
        child._zIndex = this.children.length;
        child.parent = this;
        this.children.push(child);
        child.updateTransform(this);
    }

    addChildAt(child, index) {
        //add
        child._zIndex = index;
        child.renderer = this.renderer;
        child.parent = this;
        this.children.splice(child._zIndex, 0, child);
        child.updateTransform(this);

        //update z-index for the another elements
        for (let i = child._zIndex + 1; i < this.children.length; i++) {
            this.children[i]._zIndex++;
        }
    }

    removeChild(child) {
        //remove
        this.children.splice(child._zIndex, 1);
        child.parent = null;
        //update z-index for the another elements
        for (let i = child._zIndex; i < this.children.length; i++) {
            this.children[i]._zIndex--;
        }
    }

    removeChildren() {
        for (let i = 0; i < this.children.length; i++) {
            this.children[i]._zIndex = null;
            this.children[i].parent = null;
        }
        this.children.splice(0, this.children.length);
    }

    render() {
        this.updateTransform(this.parent);
        for (let i = 0; i < this.children.length; i++) {
            if (this.children[i].visible)
                this.children[i].render();
        }
    }

}