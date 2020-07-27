import * as Phoria from 'ts-phoria';
import DrawnerBase from './Base';
import { SpaceDrawner } from './index';

export default class CubeDrawner implements DrawnerBase {
    canvas: HTMLCanvasElement | null;

    scene: Phoria.Scene | null;

    drawner: SpaceDrawner | null;

    points: Phoria.Vector3[];

    mouseX: number;

    mouseY: number;

    rawPoints: Phoria.Vector3[];

    rawEdges: Phoria.Edge[];

    constructor() {
        this.canvas = null;
        this.scene = null;
        this.drawner = null;
        this.points = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.rawPoints = [];
        this.rawEdges = [];

        this.mouseClick = this.mouseClick.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
    }

    end() {
        if (this.canvas !== null) {
            this.canvas.removeEventListener('click', this.mouseClick);
            this.canvas.removeEventListener('mousemove', this.mouseMove);
        }
        this.canvas = null;
        this.scene = null;
        this.drawner = null;
    }

    initialize(sd: SpaceDrawner) {
        if (!sd || !sd.canvas || !sd.scene) {
            return;
        }
        this.canvas = sd.canvas;
        this.scene = sd.scene;
        this.drawner = sd;
        // drawing point 1
        this.scene.graph.push(Phoria.Entity.create({
            points: [Phoria.Vector3.fromValues(0, 0, 0)],
            disabled: true,
            style: {
                color: [255, 0, 0],
                drawmode: 'point',
                shademode: 'plain',
                linewidth: 5,
                linescale: 2
            }
        }));
        // drawing point 2
        this.scene.graph.push(Phoria.Entity.create({
            points: [Phoria.Vector3.fromValues(0, 0, 0)],
            disabled: true,
            style: {
                color: [0, 255, 0],
                drawmode: 'point',
                shademode: 'plain',
                linewidth: 5,
                linescale: 2
            }
        }));
        // drawing point 3
        this.scene.graph.push(Phoria.Entity.create({
            points: [Phoria.Vector3.fromValues(0, 0, 0)],
            disabled: true,
            style: {
                color: [0, 0, 255],
                drawmode: 'point',
                shademode: 'plain',
                linewidth: 5,
                linescale: 2
            }
        }));
        // drawing box
        const cube = Phoria.Entity.create({
            points: [],
            edges: [],
            polygons: [],
            style: {
                drawmode: 'wireframe',
                shademode: 'plain'
            }
        });
        this.scene.graph.push(cube);
        // light
        this.scene.graph.push(new Phoria.DistantLight());
        // add mouse events
        this.canvas.addEventListener('mousemove', this.mouseMove);
        this.canvas.addEventListener('click', this.mouseClick);
        // build cube
        if (this.points.length === 3) {
            const y = this.points[2][1];
            const extrude1 = this.rawPoints[0].clone();
            const extrude2 = this.rawPoints[1].clone();
            const extrude3 = this.rawPoints[2].clone();
            const extrude4 = this.rawPoints[3].clone();
            extrude1[1] = y;
            extrude2[1] = y;
            extrude3[1] = y;
            extrude4[1] = y;
            const points = [
                ...this.rawPoints,
                extrude1,
                extrude2,
                extrude3,
                extrude4
            ];
            cube.points = points;
            const edges = [
                ...this.rawEdges,
                { a: 4, b: 5, avz: 0 },
                { a: 5, b: 6, avz: 0 },
                { a: 6, b: 7, avz: 0 },
                { a: 7, b: 4, avz: 0 },

                { a: 0, b: 4, avz: 0 },
                { a: 1, b: 5, avz: 0 },
                { a: 2, b: 6, avz: 0 },
                { a: 3, b: 7, avz: 0 }
            ];
            cube.edges = edges;
        }
    }

    mouseMove(e: MouseEvent) {
        if (!this.canvas) {
            return;
        }
        const bounds = this.canvas.getBoundingClientRect();
        this.mouseX = e.pageX - bounds.left;
        this.mouseY = e.pageY - bounds.top;
    }

    mouseClick(e: MouseEvent) {
        if (!this.drawner || !this.drawner.clickable) {
            return;
        }
        if (!this.canvas) {
            return;
        }
        const bounds = this.canvas.getBoundingClientRect();
        if (this.points.length <= 1) {
            const vec = this.getHorizontalClickPoint(e.pageX - bounds.left, e.pageY - bounds.top);
            this.points.push(vec);
        } else if (this.points.length === 2) {
            const vec = this.getVerticalClickPoint(e.pageX - bounds.left, e.pageY - bounds.top, this.points[1]);
            this.points.push(vec);
        }
    }

    getVerticalClickPoint(x: number, y: number, planePos: Phoria.Vector3): Phoria.Vector3 {
        if (!this.scene) {
            return planePos;
        }
        const clickLine = Phoria.View.calculateClickPointAndVector(this.scene, x, y);
        const planeNormal = Phoria.Vector3.fromValues(0, 0, 1);
        const vec = Phoria.Utils.planeLineIntersection(
            planeNormal,
            planePos,
            clickLine.clickVector,
            clickLine.clickPoint
        );
        return vec || planePos;
    }

    getHorizontalClickPoint(x: number, y: number): Phoria.Vector3 {
        if (!this.scene) {
            return new Phoria.Vector3();
        }
        const clickLine = Phoria.View.calculateClickPointAndVector(this.scene, x, y);
        const planePos = Phoria.Vector3.fromValues(0, 0, 0);
        const planeNormal = Phoria.Vector3.fromValues(0, 1, 0);
        const vec = Phoria.Utils.planeLineIntersection(
            planeNormal,
            planePos,
            clickLine.clickVector,
            clickLine.clickPoint
        );
        return vec || new Phoria.Vector3();
    }

    render() {
        if (!this.scene) {
            return;
        }
        if (this.points.length === 1) {
            const newPoint = this.getHorizontalClickPoint(
                this.mouseX,
                this.mouseY
            );
            let minx = newPoint[0];
            let minz = newPoint[2];
            let maxx = newPoint[0];
            let maxz = newPoint[2];
            if (this.points[0][0] < minx) {
                minx = this.points[0][0];
            }
            if (this.points[0][2] < minz) {
                minz = this.points[0][2];
            }
            if (this.points[0][0] > maxx) {
                maxx = this.points[0][0];
            }
            if (this.points[0][2] > maxz) {
                maxz = this.points[0][2];
            }
            const cube = this.scene.graph[3];
            if (cube instanceof Phoria.Entity) {
                cube.disabled = false;
                const y = newPoint[1];
                this.rawPoints = [
                    Phoria.Vector3.fromValues(minx, y, minz),
                    Phoria.Vector3.fromValues(maxx, y, minz),
                    Phoria.Vector3.fromValues(maxx, y, maxz),
                    Phoria.Vector3.fromValues(minx, y, maxz)
                ];
                cube.points = this.rawPoints;
                this.rawEdges = [
                    { a: 0, b: 1, avz: 0 },
                    { a: 1, b: 2, avz: 0 },
                    { a: 2, b: 3, avz: 0 },
                    { a: 3, b: 0, avz: 0 }
                ];
                cube.edges = this.rawEdges;
            }
        } else if (this.points.length === 2) {
            const newPoint = this.getVerticalClickPoint(
                this.mouseX,
                this.mouseY,
                this.points[1]
            );
            const cube = this.scene.graph[3];
            if (cube instanceof Phoria.Entity) {
                const y = newPoint[1];
                const extrude1 = this.rawPoints[0].clone();
                const extrude2 = this.rawPoints[1].clone();
                const extrude3 = this.rawPoints[2].clone();
                const extrude4 = this.rawPoints[3].clone();
                extrude1[1] = y;
                extrude2[1] = y;
                extrude3[1] = y;
                extrude4[1] = y;
                const points = [
                    ...this.rawPoints,
                    extrude1,
                    extrude2,
                    extrude3,
                    extrude4
                ];
                cube.points = points;
                const edges = [
                    ...this.rawEdges,
                    { a: 4, b: 5, avz: 0 },
                    { a: 5, b: 6, avz: 0 },
                    { a: 6, b: 7, avz: 0 },
                    { a: 7, b: 4, avz: 0 },

                    { a: 0, b: 4, avz: 0 },
                    { a: 1, b: 5, avz: 0 },
                    { a: 2, b: 6, avz: 0 },
                    { a: 3, b: 7, avz: 0 }
                ];
                cube.edges = edges;
            }
        }
    }
}
