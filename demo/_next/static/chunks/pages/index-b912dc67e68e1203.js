(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t(5041)}])},5041:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return b}});var a,r,i=t(5893),s=t(7294),u=t(5908);function l(e,n,t){return(e-n.min)/(n.max-n.min)*(t.max-t.min)+t.min}function c(e){return u.ZP.float(e.min,e.max)}function o(e,n){return e<n.min?n.min:e>n.max?n.max:e}(a=r||(r={})).BLACK="black",a.BLUE="blue",a.BROWN="brown",a.CYAN="cyan",a.GREEN="green",a.GREY="grey",a.PINK="pink",a.PURPLE="purple",a.RED="red",a.WHITE="white",a.YELLOW="yellow";let m=e=>{switch(e){case r.BLACK:return"#181620";case r.BLUE:return"#3498db";case r.BROWN:return"#5d3c25";case r.CYAN:return"#00d2d3";case r.GREEN:return"#2ecc71";case r.GREY:return"#8395a7";case r.PINK:return"#f368e0";case r.PURPLE:return"#9b59b6";case r.RED:return"#e74c3c";case r.YELLOW:return"#f1c40f";case r.WHITE:return"#f0f0f0";default:return"#ffffff"}};function f(e){let n=(0,s.useRef)(null),[t,a]=(0,s.useState)({width:0,height:0});return!function(e,n){let t=(0,s.useRef)(),a=(0,s.useRef)();function r(n){a.current&&e(n-a.current),a.current=n,t.current=requestAnimationFrame(r)}(0,s.useEffect)(()=>(n&&(t.current=requestAnimationFrame(r)),()=>cancelAnimationFrame(t.current||0)),[n])}(e.onUpdate,e.running),(0,s.useEffect)(()=>{console.log("Adding event listeners for resize");let e=n.current;if(!e){console.error("Couldn't get canvas");return}let t=new ResizeObserver(()=>{e.width=e.clientWidth,e.height=e.clientHeight,a({width:e.clientWidth,height:e.clientHeight})});return t.observe(e),()=>t.unobserve(e)},[]),(0,s.useEffect)(()=>{let a=n.current,i=null==a?void 0:a.getContext("2d");if(!i){console.error("Couldn't get graphics context");return}i.clearRect(0,0,t.width,t.height),e.world.particles.forEach(n=>{(function(n,a){var i,s;let u=r.BLUE,c={x:{min:0,max:t.width},y:{min:0,max:t.height}},o=(i=a.position,s=e.world.bounds,{x:l(i.x,s.x,c.x),y:l(i.y,s.y,c.y)});n.beginPath(),n.arc(o.x,o.y,1,0,2*Math.PI),n.fillStyle=m(u),n.fill()})(i,n)})},[e.world,t]),(0,i.jsx)("div",{className:"w-full mx-8 h-96 md:mx-0 md:w-1/2 md:h-96 mb-10",children:(0,i.jsx)("canvas",{className:"w-full h-full block bg-gradient-to-tr from-zinc-800 to-zinc-700 shadow-[-10px_10px_60px_15px_rgba(0,0,0,0.5)]",ref:n})})}var d=t(3833),h=t(4452),x=t.n(h);function p(e){return(0,i.jsx)(d.Z,{className:x().slider,step:e.stepSize,min:e.range.min,max:e.range.max,defaultValue:e.defaultValue,onAfterChange:n=>e.onChange(n)})}function g(e){return(0,i.jsxs)("div",{className:"w-64 md:w-48 pl-12",children:[(0,i.jsx)(w,{range:e.ranges.a,v:e.params.a,param:"a",onChange:e.onUpdate}),(0,i.jsx)(w,{range:e.ranges.b,v:e.params.b,param:"b",onChange:e.onUpdate}),(0,i.jsx)(w,{range:e.ranges.n,v:e.params.n,param:"n",onChange:e.onUpdate}),(0,i.jsx)(w,{range:e.ranges.m,v:e.params.m,param:"m",onChange:e.onUpdate}),(0,i.jsx)(w,{range:e.ranges.z,v:e.params.z,param:"z",onChange:e.onUpdate,stepSize:.001}),(0,i.jsx)(w,{range:e.ranges.o,v:e.params.o,param:"o",onChange:e.onUpdate})]})}function w(e){let{range:n,v:t,param:a,stepSize:r,onChange:s}=e;return(0,i.jsxs)("div",{className:"flex items-center",children:[(0,i.jsx)("div",{className:"align-middle pr-3",children:a}),(0,i.jsx)("div",{className:"align-middle w-64 md:w-32",children:(0,i.jsx)(p,{range:n,defaultValue:t,onChange:e=>s(a,e),stepSize:r})})]})}function E(e){let[n,t]=(0,s.useState)(function(){let e={x:{min:-100,max:100},y:{min:-100,max:100}},n=[];for(let t=0;t<6e3;t++){let a={position:{x:c(e.x),y:c(e.y)}};n.push(a)}return{particles:n,bounds:e}}()),a=(0,s.useRef)({a:1,b:-1,n:5,m:2,z:.01,o:1});return(0,i.jsxs)("div",{className:"flex flex-wrap justify-center w-full h-full",children:[(0,i.jsx)(f,{running:e.running,onUpdate:function(e){t(n=>({...n,particles:n.particles.map(t=>(function(e,n,t){var r;let{n:i,m:s,a:l,b:c,z:m,o:f}=a.current,{x:d,y:h}=e.position,x={min:.1,max:1},p=f?o(Math.abs(l*Math.sin(Math.PI*i*d*m)*Math.sin(Math.PI*s*h*m)+c*Math.sin(Math.PI*s*d*m)*Math.sin(Math.PI*i*h*m))*t*.1,x):x.max,g=u.ZP.float(0,2*Math.PI),w={x:o((r={x:d+p*Math.cos(g),y:h+p*Math.sin(g)}).x,n.x),y:o(r.y,n.y)};return{...e,position:w}})(t,n.bounds,e))}))},world:n}),(0,i.jsx)(g,{params:a.current,ranges:{a:{min:-3,max:3},b:{min:-3,max:3},n:{min:1,max:10},m:{min:1,max:10},z:{min:.001,max:.02},o:{min:0,max:1}},onUpdate:function(e,n){a.current={...a.current,[e]:n}}})]})}function b(){let[e,n]=(0,s.useState)(!1);return(0,s.useEffect)(()=>(n(!0),()=>n(!1)),[]),(0,i.jsxs)("div",{className:"w-full h-full",children:[(0,i.jsx)("div",{className:"pt-8 pb-16 text-center",children:(0,i.jsx)("a",{className:"",href:"https://en.wikipedia.org/wiki/Ernst_Chladni#Chladni_figures",target:"_blank",children:(0,i.jsx)("div",{className:"py-2 px-4 text-2xl",children:"chladni"})})}),(0,i.jsx)(E,{running:e,setRunning:n})]})}p.defaultProps={stepSize:1}},4452:function(e){e.exports={slider:"Slider_slider__02OxH"}},5042:function(){}},function(e){e.O(0,[5,774,888,179],function(){return e(e.s=8312)}),_N_E=e.O()}]);