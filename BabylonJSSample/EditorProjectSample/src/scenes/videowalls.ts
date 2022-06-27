import {
    StandardMaterial, VideoTexture, Color3, Vector3, Mesh,
} from '@babylonjs/core';

// import { visibleInInspector } from "./decorators";

export default class VideoWalls extends Mesh {

    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init
    protected constructor() { }

    /**
     * Called on the node is being initialized.
     * This function is called immediatly after the constructor has been called.
     */
    public onInitialize(): void {
        // ...
    }

    /**
     * Called on the scene starts.
     */
    public onStart(): void {
        this._children.forEach((el: Mesh) => {
            const VideoMat: StandardMaterial = new StandardMaterial(`v_mat_${el.name}`, this._scene);
            let VideoSource: string = `_streamingAssets/${el.name.replace('s_', '')}.mp4`;

            const VideoTex: VideoTexture = new VideoTexture(
                `v_tex_${el.name}`,
                VideoSource,
                this._scene
            );

            VideoTex.wAng = 90 * (Math.PI / 180);
            VideoMat.diffuseTexture = VideoTex;
            VideoMat.roughness = 1;
            VideoMat.emissiveColor = Color3.White();
            VideoMat.backFaceCulling = false;

            el.overrideMaterialSideOrientation = Mesh.DOUBLESIDE;
            el.material = VideoMat;
            el.checkCollisions = true;
            el.ellipsoid = new Vector3(0.5, 1.0, 0.5);
            el.ellipsoidOffset = new Vector3(0, 0, 0);

            VideoTex.video.play();
        });
    }

    /**
     * Called each frame.
     */
    public onUpdate(): void {
        // ...
    }

    /**
     * Called on the object has been disposed.
     * Object can be disposed manually or when the editor stops running the scene.
     */
    public onStop(): void {
        // ...
    }
}
