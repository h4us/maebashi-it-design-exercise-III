import {
    TransformNode,
} from "@babylonjs/core";

import * as octions from '@primer/octicons';
import { h, render } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import htm from 'htm';
const html: any = htm.bind(h);

import Room from './scenes/room';

function TextButton(props: any) {
    const handleClick = (e: MouseEvent, command: string) => {
        const r: Room = props.scene.getMeshByName('__root__') as Room
        if (r) {
            if (command == 'confirm') {
                r.confirm();
            } else if (command == 'cancel') {
                r.cancel();
            }
        }
        e.preventDefault();
    }

    useEffect(() => {
    }, []);
    return html`<a class="text-orange-800 bg-white/90 rounded-md px-6 py-2" href="#" onClick=${(e) => handleClick(e, props.command) }>${props.btnText}</a>`;
}

function HelpButton(props: any) {
    const [t, setT] = useState<boolean>(props.showHelp);
    const onRef = useRef<HTMLElement | null>(null);
    const offRef = useRef<HTMLElement | null>(null);
    const hRef= useRef<HTMLElement | null>(document.querySelector('#help'));

    const setTProxy = () => {
        setT((v) => !v);
    }

    useEffect(() => {
        if (hRef.current) {
            if (t) {
                hRef.current.classList.add('hidden');
            } else {
                hRef.current.classList.remove('hidden');
            }

        }
    }, [t]);

    useEffect(() => {
        if (onRef.current) {
            onRef.current.innerHTML = octions['question'].toSVG({
                class: 'inline-block',
                width: 42,
                'aria-label': 'show help'
            });
        }

        if (offRef.current) {
            offRef.current.innerHTML = octions['x-circle'].toSVG({
                class: 'inline-block',
                width: 42,
                'aria-label': 'close help'
            });
        }

        if (hRef.current) {
            hRef.current.addEventListener('click', setTProxy);
        }

        return () => {
            hRef.current.removeEventListener('click', setTProxy);
        }
    }, []);
    return html`<a class="text-white fill-white bg-zinc-700/75 rounded-md p-2 mb-2" href="#" onClick=${(e) => { setT((v) => !v); e.preventDefault(); }}>
<span class=${t ? 'hidden' : 'inline-block'} ref=${offRef}></span>
<span class=${t ? 'inline-block' : 'hidden'} ref=${onRef}></span>
</a>`;
}

function ViewButton(props: any) {
    const [t, setT] = useState<boolean>(true);
    const onRef = useRef<HTMLElement | null>(null);
    const offRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const r: Room = props.scene.getMeshByName('__root__') as Room
        r.switchCamera(t);
    }, [t]);

    useEffect(() => {
        if (onRef.current) {
            onRef.current.innerHTML = octions['device-camera-video'].toSVG({
                class: 'inline-block',
                width: 42,
                'aria-label': 'switch view mode'
            });
        }
        if (offRef.current) {
            offRef.current.innerHTML = octions['eye'].toSVG({
                class: 'inline-block',
                width: 42,
                'aria-label': 'switch view mode'
            });
        }

    }, []);
    return html`<a class="text-white fill-white fill-white bg-zinc-700/75 rounded-md p-2 mb-2" href="#" onClick=${(e) => { setT((v) => !v); e.preventDefault(); }}>
<span class=${t ? 'hidden' : 'inline-block'} ref=${offRef}></span>
<span class=${t ? 'inline-block' : 'hidden'} ref=${onRef}></span>
</a>`;
}

export class CMCGui extends TransformNode {
    public blank(): void {
        render(
            html`
<section>
</section>`,
            document.getElementById('gui')
        );
    }

    public build(withHelp: boolean = false): void {
        if (document.querySelector('#babylonjsLoadingDiv')) {
            document.querySelector('#babylonjsLoadingDiv').remove();
        }

        render(
            html`
<section class="flex w-0 flex-wrap justify-items-center p-4">
<${HelpButton} scene=${this._scene} showHelp=${withHelp}/>
<${ViewButton} scene=${this._scene} />
</section>`,
            document.getElementById('gui')
        );
    }

    public outro(): void {
        render(
            html`
<section class="h-screen w-full bg-zinc-700/75 flex flex-col justify-center items-center p-4">
<h2 class="text-white text-xl mb-4 font-bold">Exit?</h2>
<div class="flex justify-around w-[12rem]">
<${TextButton} scene=${this._scene} btnText="Yes" command="confirm" />
<${TextButton} scene=${this._scene} btnText="No" command="cancel" />
</div>
</section>`,
            document.getElementById('gui')
        );
    }

    public intro(): void {
        render(
            html`
<section class="h-screen w-full bg-zinc-700/30 flex flex-col justify-center items-center p-4">
<h2 class="text-white text-xl mb-4 font-bold">Click / Tap to Start</h2>
</section>`,
            document.getElementById('gui')
        );
    }
}
