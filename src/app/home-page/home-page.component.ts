import {Component, OnInit} from '@angular/core';
import {Echarts} from '../shared/model/echarts.model';
import {HomePageService} from './home-page.service';
import {forkJoin} from 'rxjs';

@Component({
    selector: 'mysite-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {


    // 宽高自适应
    width: number;
    height: number;

    options: any;

    private echarts: Echarts;

    constructor(private $homePageSrv: HomePageService) {
    }

    ngOnInit() {
        this.options = {
            backgroundColor: '#000',
            globe: {
                baseTexture: 'http://www.echartsjs.com/examples/data-gl/asset/world.topo.bathy.200401.jpg',
                heightTexture: 'http://www.echartsjs.com/examples/data-gl/asset/world.topo.bathy.200401.jpg',
                displacementScale: 0.04,
                shading: 'realistic',
                environment: 'http://www.echartsjs.com/examples/data-gl/asset/starfield.jpg',
                realisticMaterial: {
                    roughness: 0.9
                },
                postEffect: {
                    enable: true
                },
                light: {
                    main: {
                        intensity: 5,
                        shadow: true
                    },
                    ambientCubemap: {
                        texture: 'http://www.echartsjs.com/examples/data-gl/asset/pisa.hdr',
                        diffuseIntensity: 0.2
                    }
                }
            }
        };

        const res1 = this.$homePageSrv.get1();
        const res2 = this.$homePageSrv.get2();
        const res3 = this.$homePageSrv.get3();
        const res4 = this.$homePageSrv.get4();

        const res = forkJoin([res1, res2, res3, res4]);

        res.subscribe(data => {
            console.log('start');
            console.log(data);
            console.log('end');
        });

        // const letters = of('a', 'b', 'c');
        // const result = letters.pipe(
        //     mergeMap(x => interval(1000).pipe(map(i => x + i))),
        // );
        // result.subscribe(x => console.log(x));

        // const clicks = fromEvent(document, 'click');
        // const result = clicks.pipe(switchMap((ev) => interval(1000)));
        // result.subscribe(x => console.log(x));
    }

    initComplete(echarts: Echarts) {
        this.echarts = echarts;
    }

}
