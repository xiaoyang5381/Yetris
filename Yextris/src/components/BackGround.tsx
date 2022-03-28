import { isNil, range } from "lodash";
import React, { useEffect } from "react";
import { MainScene } from "../game-logic/main-scene";

export function BackGround(props: React.Attributes & MainScene) {
    useEffect(effect, [])

    return <canvas
        id="background"
        style={{
            backgroundColor: `rgba(255,255,255,0)`,
            zIndex: 0,
            width: `${props.canvasBox.width}px`,
            height: `${props.canvasBox.height}px`
        }} ></canvas>
}

const effect = () => {
    return drawStars();
    
    function drawStars() {
        var canvas: HTMLCanvasElement | null = document.getElementById('background') as any;
        if (isNil(canvas)) { throw '' }

        const ctx = canvas.getContext('2d'),
            w = canvas.width = window.innerWidth,
            h = canvas.height = window.innerHeight;

        let stars: Array<typeof Star.prototype> = []; 
        let maxStars = 1000; 

        function startImage(hue: number) {
            
            
            var canvas2 = document.createElement('canvas');
            const ctx2 = canvas2.getContext('2d');
            if (isNil(ctx2)) { throw '' }
            canvas2.width = 5;
            canvas2.height = 5;
            
            
            var half = canvas2.width / 2,
                gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
         
            gradient2.addColorStop(0.07, '#FFFFFF');
            gradient2.addColorStop(0.2, 'hsl(' + hue + ', 99%, 95%)');
            gradient2.addColorStop(0.35, 'hsl(' + hue + ', 84%, 90%)');
            gradient2.addColorStop(0.5, 'hsl(' + hue + ', 64%, 80%)');
            gradient2.addColorStop(1, 'transparent');

            ctx2.fillStyle = gradient2;
            ctx2.beginPath();
            ctx2.arc(half, half, half, 0, Math.PI * 2);
            ctx2.fill();
            return canvas2;
        }
        
        function random(min: number, max?: number) {
            if (isNil(max)) {
                max = min;
                min = 0;
            }

            if (min > max) {
                var hold = max;
                max = min;
                min = hold;
            }

            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function maxOrbit(x: number, y: number) {
            var max = Math.max(x, y),
                diameter = Math.round(Math.sqrt(max * max + max * max));
            return diameter / 2;
        }

        class Star {
            orbitRadius: number;
            radius: number;
            orbitX: number;
            orbitY: number;
            timePassed: number;
            speed: number;
            alpha: number;
            img!: any

            constructor() {
                this.orbitRadius = random(maxOrbit(w, h));
                this.radius = this.orbitRadius / 100;
                this.orbitX = w / 2;
                this.orbitY = h / 2;
                
                this.timePassed = random(0, maxStars);
                this.speed = this.orbitRadius / 10;
                this.alpha = random(7, 10) / 10;
            }
            draw() {
                
                let x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
                    y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY;
                    
                if (isNil(ctx)) { throw '' }
                ctx.globalAlpha = this.alpha;
                ctx.drawImage(this.img, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
                const nextOrbit = (this.orbitRadius + this.speed);
                if(nextOrbit>canvasR){
                    this.orbitRadius =  random(maxOrbit(w,h))
                    this.speed = this.orbitRadius/10
                    this.radius = this.orbitRadius / 50;
                }
                else{
                    this.orbitRadius = (this.orbitRadius + this.speed);
                }
            }
        }
        const canvasR = Math.sqrt(w * w + h * h)
        const hues = Array.from({ length: 4 }).map((v, i) => Math.floor(i * (360 / 4) + 0))
        
        const randStartImages = hues.map(startImage);
        const randIndex = (length: number) => Math.floor(random(0, length - 1))
        const randStar = ((n) => () => randStartImages[randIndex(n)])(4)
        stars = range(0, maxStars).map(i => new Star())
        stars.forEach(star => star.img = randStar())
        
        
        let id: number;
        function animation() {

            if (isNil(ctx)) { throw '' }
            
            ctx.globalCompositeOperation = 'source-over';
            ctx.globalAlpha = 0.5; 
            ctx.fillStyle = 'hsla(' + 217 + ', 74%, 6%, 2)';
            ctx.fillRect(0, 0, w, h)
            
            ctx.globalCompositeOperation = 'lighter';
            for (var i = 1, l = stars.length; i < l; i++) {
                stars[i].draw();
            };
            
            id = window.requestAnimationFrame(animation);
        }

        animation();

        return () => cancelAnimationFrame(id);
    }
}

