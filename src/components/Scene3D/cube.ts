import Phoria from 'ts-phoria';

export default class CubeDrawner {
    scene: Phoria.Scene | null;

    renderer: Phoria.CanvasRenderer | null;

    mouse: Phoria.MouseTrackingInstance | null;

    points: Phoria.Vector3[];

    mouseX: number;

    mouseY: number;

    rawPoints: Phoria.Vector3[];

    rawEdges: Phoria.Edge[];

    constructor(canvas: HTMLCanvasElement) {
        this.scene = new Phoria.Scene();
        this.scene.camera.position = Phoria.Vector3.fromValues(0, 5, -20);
        this.scene.perspective.aspect = canvas.clientWidth / canvas.clientHeight;
        this.scene.viewport.width = canvas.clientWidth;
        this.scene.viewport.height = canvas.clientHeight;

        this.renderer = new Phoria.CanvasRenderer(canvas);

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

        this.scene.graph.push(Phoria.Entity.create({
            points: [],
            edges: [],
            polygons: [],
            style: {
                drawmode: 'wireframe',
                shademode: 'plain'
            }
        }));

        const plane = Phoria.MeshFactory.generateTesselatedPlane(8, 8, 0, 20, false);
        this.scene.graph.push(Phoria.Entity.create({
            points: plane.points,
            edges: plane.edges,
            polygons: plane.polygons,
            style: {
                drawmode: 'wireframe',
                shademode: 'plain',
                linewidth: 0.5,
                objectsortmode: 'back'
            }
        }));

        this.scene.graph.push(new Phoria.DistantLight());

        this.mouse = Phoria.View.addMouseEvents(canvas, (e) => this.mouseClick(e));
        canvas.addEventListener('mousemove', (e) => {
            this.mouseX = e.pageX;
            this.mouseY = e.pageY;
        });

        this.points = [];

        this.mouseX = 0;
        this.mouseY = 0;
        this.rawPoints = [];
        this.rawEdges = [];
    }

    mouseClick(e: MouseEvent): void {
        if (!this.mouse || !this.scene) {
            return;
        }
        if (this.points.length <= 1) {
            const vec = this.getHorizontalClickPoint(e.pageX, e.pageY);
            const p0 = this.scene.graph[this.points.length];
            if (p0 instanceof Phoria.Entity) {
                p0.disabled = false;
                p0.points[0].set(vec[0], vec[1], vec[2]);
            }
            this.points.push(vec);
        } else if (this.points.length === 2) {
            const vec = this.getVerticalClickPoint(e.pageX, e.pageY, this.points[1]);
            const p0 = this.scene.graph[2];
            if (p0 instanceof Phoria.Entity) {
                p0.disabled = false;
                p0.points[0].set(this.points[1][0], vec[1], vec[2]);
            }
            this.points.push(vec);
        }
    }

    getHorizontalClickPoint(x: number, y: number): Phoria.Vector3 {
        if (!this.scene) {
            return new Phoria.Vector3();
        }
        const clickLine = Phoria.View.calculateClickPointAndVector(this.scene, x, y);
        const planePos = Phoria.Vector3.fromValues(0, 0, 0);
        const planeNormal = Phoria.Vector3.fromValues(0, 1, 0);
        const vec = Phoria.Util.planeLineIntersection(
            planeNormal,
            planePos,
            clickLine.clickVector,
            clickLine.clickPoint
        );
        return vec;
    };

    getVerticalClickPoint(x: number, y: number, planePos: Phoria.Vector3): Phoria.Vector3 {
        if (!this.scene) {
            return planePos;
        }
        const clickLine = Phoria.View.calculateClickPointAndVector(this.scene, x, y);
        const planeNormal = Phoria.Vector3.fromValues(0, 0, 1);
        const vec = Phoria.Util.planeLineIntersection(
            planeNormal,
            planePos,
            clickLine.clickVector,
            clickLine.clickPoint
        );
        return vec;
    };

    beginRender(): void {
        const fnRender = () => {
            if (!this.scene || !this.renderer) {
                return;
            }
            if (this.mouse) {
                if (this.points.length === 1) {
                    const newPoint = this.getHorizontalClickPoint(
                        this.mouseX,
                        this.mouseY
                    );
                    const p0 = this.scene.graph[1];
                    if (p0 instanceof Phoria.Entity) {
                        p0.disabled = false;
                        p0.points[0].set(newPoint[0], newPoint[1], newPoint[2]);
                    }
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
                    const p0 = this.scene.graph[2];
                    if (p0 instanceof Phoria.Entity) {
                        p0.disabled = false;
                        p0.points[0].set(this.points[1][0], newPoint[1], newPoint[2]);
                    }
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
            // render
            this.scene.modelView();
            this.renderer.render(this.scene);
            // request new frame
            requestAnimationFrame(fnRender);
        };
        requestAnimationFrame(fnRender);
    }
}
