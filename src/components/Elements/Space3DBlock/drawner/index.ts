import * as Phoria from 'ts-phoria';

import DrawnerBase from './Base';

export class SpaceDrawner {
    current: DrawnerBase | null;

    canvas: HTMLCanvasElement | null;

    scene: Phoria.Scene | null;

    renderer: Phoria.CanvasRenderer | null;

    clickable: boolean;

    constructor() {
        this.canvas = null;
        this.current = null;
        this.scene = null;
        this.renderer = null;
        this.clickable = false;
    }

    enableClicks() {
        this.clickable = true;
    }

    disableClicks() {
        this.clickable = false;
    }

    setCanvas(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.scene = new Phoria.Scene();
        this.scene.camera.position = Phoria.Vector3.fromValues(0, 5, -15);
        this.scene.perspective.aspect = canvas.width / canvas.height;
        this.scene.viewport.width = canvas.width;
        this.scene.viewport.height = canvas.height;

        this.renderer = new Phoria.CanvasRenderer(canvas);

        if (this.current != null) {
            this.current.end();
            this.current.initialize(this);
        }

        this.animate();
    }

    setCurrent(drawner: DrawnerBase | null) {
        if (this.current) {
            this.current.end();
        }
        this.current = drawner;
        if (!this.scene || !this.canvas) {
            return;
        }
        if (this.current) {
            this.current.initialize(this);
        }
    }

    animate() {
        const fnAnimate = () => {
            if (this.scene && this.renderer) {
                if (this.current) {
                    this.current.render();
                }

                this.scene.modelView();
                this.renderer.render(this.scene);
            }
            requestAnimationFrame(fnAnimate);
        };
        requestAnimationFrame(fnAnimate);
    }
}
