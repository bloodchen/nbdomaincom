(self["webpackChunknbdomaincom"]=self["webpackChunknbdomaincom"]||[]).push([[787],{2162:(e,a,t)=>{"use strict";t.d(a,{Z:()=>k});var o=t(9835),l=t(6970),s=t(499),n=t(5391),i=t(9991);const c={class:"text-h6 text-weight-bold text-left text-uppercase"},d=(0,o._)("div",{id:"pay",style:{height:"230px"}},null,-1),r={key:0},m={class:"text-positive"},u={props:{note:String},emits:["closePayForm"],setup(e,{emit:a}){const{t}=(0,i.QT)();let u=null,g=(0,s.iH)(!1),p=n.r.getKV("paycmd");console.log(p);const f=n.r.opay,w="sign"==p.cmd?"Verification":t("message.payment");async function v(){const e=p;if(f.setUI({border:"0px",background:"white",close:!1}),f.changeContainer("pay"),console.log("cmd=",p),"key"==e.cmd||"user"==e.cmd){const a=await n.r.nblib.getDomain(e.domain);if(a){const t="key"==e.cmd?await a.updateKey2({kv:e.kv}):await a.updateUser(e.kv);console.log("key cmd result:",t),b(t)}}if("sell"==e.cmd){const a=await n.r.nblib.getDomain(e.domain);if(a){const t=await a.sell(e.sell_info);console.log("key cmd result:",t),b(t)}}if("buy"==e.cmd){const a=e.option,t=await n.r.nblib.getDomain(e.domain);if(t){const e=await t.buy(a);console.log("buy cmd result:",e),b(e)}}if("reg"==e.cmd){const a=await n.r.nblib.registerDomain(e.domain);b(a)}if("pay"==e.cmd&&f.request({pay_request:{data:e}},(e=>(b(e),!1))),"makePublic"==e.cmd){const a=await n.r.nblib.getDomain(e.domain);if(a){const t=await a.makePublic(e.domain);console.log("makePublic result:",t),b(t)}else console.error("Failed to get domain:",e.domain)}if("sign"==e.cmd){const a={data_hash:e.data_hash,signer:e.signer,app_data:e.app_data};f.request({sign_request:{data:a}},(e=>(b(e),{code:0,id:e.id})))}}function y(){console.log("oncancel payCmd:",p),p&&p.callback&&p.callback({code:-1,message:"Cancelled"}),f&&f.close()}function b(e){console.log("in handleReply");console.log(e),console.log(p),g=!1,u=0==e.code?"transaction Succeeded":JSON.stringify(e),p&&p.callback&&p.callback(e),S()}function S(){a("closePayForm")}return(0,o.bv)((()=>{v()})),(a,t)=>{const n=(0,o.up)("q-space"),i=(0,o.up)("q-btn"),g=(0,o.up)("q-card-section"),p=(0,o.up)("q-separator"),f=(0,o.up)("q-card"),v=(0,o.Q2)("close-popup");return(0,o.wg)(),(0,o.j4)(f,{style:{"min-width":"400px"}},{default:(0,o.w5)((()=>[(0,o.Wm)(g,{class:"row items-center q-pb-none q-my-sm"},{default:(0,o.w5)((()=>[(0,o._)("div",c,(0,l.zw)((0,s.SU)(w)),1),(0,o.Wm)(n),(0,o.wy)((0,o.Wm)(i,{icon:"close",flat:"",round:"",dense:"",onClick:y},null,512),[[v]])])),_:1}),(0,o.Wm)(p,{inset:""}),(0,o.Wm)(g,null,{default:(0,o.w5)((()=>[d,e.note?((0,o.wg)(),(0,o.iD)("div",r,(0,l.zw)(e.note),1)):(0,o.kq)("",!0),(0,o._)("div",m,(0,l.zw)((0,s.SU)(u)),1)])),_:1})])),_:1})}}};var g=t(4458),p=t(3190),f=t(136),w=t(8879),v=t(926),y=t(2146),b=t(9984),S=t.n(b);const A=u,k=A;S()(u,"components",{QCard:g.Z,QCardSection:p.Z,QSpace:f.Z,QBtn:w.Z,QSeparator:v.Z}),S()(u,"directives",{ClosePopup:y.Z})},5032:(e,a,t)=>{"use strict";t.d(a,{Z:()=>g});var o=t(9835),l=t(8171),s=t.n(l);const n={class:"row justify-center no-wrap bg-white",style:{width:"100%"}},i=(0,o.uE)('<div class="col-10 text-center font-t24 no-wrap q-gutter-lg" style="margin-top:80px;" data-v-654078a0><div class="row justify-between font-t14" data-v-654078a0><div class="col-12 col-sm-auto text-left q-my-md" data-v-654078a0><div data-v-654078a0><img src="'+s()+'" data-v-654078a0></div></div><div class="col-12 col-sm-8 row justify-evenly" data-v-654078a0><div class="col-6 column q-gutter-y-lg text-left" data-v-654078a0><a class="text-weight-bold" data-v-654078a0>Links</a><a href="#/search" data-v-654078a0>Register Domain</a><a href="#/free" data-v-654078a0>Free Domain</a><a href="#/detail" data-v-654078a0>My Domain</a></div><div class="col-6 column q-gutter-y-lg text-left" data-v-654078a0><a class="text-weight-bold" data-v-654078a0>Support</a><a href="https://doc.nbdomain.com" target="_blank" data-v-654078a0>Developer Docs</a><a href="https://forum.nbdomain.com" target="_blank" data-v-654078a0>Forum</a><a href="https://doc.nbdomain.com" target="_blank" data-v-654078a0>Product FAQs</a></div></div></div></div>',1),c=[i];function d(e,a){return(0,o.wg)(),(0,o.iD)("div",n,c)}var r=t(1639);const m={},u=(0,r.Z)(m,[["render",d],["__scopeId","data-v-654078a0"]]),g=u},6787:(e,a,t)=>{"use strict";t.r(a),t.d(a,{default:()=>le});t(702);var o=t(9835),l=t(6970),s=t(499),n=t(5391),i=t(9302),c=t(9991),d=t(8910),r=t(2162);const m={class:"row justify-center no-wrap"},u={class:"col-11 col-sm-11 col-md-8 justify-center",style:{"margin-top":"30px"}},g=(0,o.Uk)(" Domains For Sale "),p={class:"col-9 font-t16 text-primary"},f={class:"row justify-start"},w={class:"col-1"},v=["src"],y={class:"col"},b={class:"font-t16"},S={class:"font-t12 text-grey-6"},A={setup(e){const{t:a}=(0,c.QT)(),t=(0,i.Z)(),d=(0,s.iH)([]),A=(0,s.iH)(!1);let k=(0,s.iH)("");async function q(){console.log("start...")}function H(e){const a=e.domain,t=a.split(".");return e.sell_info.price/1e8+("a"===t[1]?" AR":" BSV")}function h(e){const a=e.split(".");return"a"==a[1]?"./icons/ar_48.png":"./icons/bsv_48.png"}async function D(e){const o=async function(o){console.log("Register result:",o),0===o.code?t.dialog({title:a("message.congrat"),message:e.domain+": "+a("message.regSucess")}):t.dialog({title:a("message.error"),message:e.domain+": "+o.message})},l=n.r.getKV("CurDomain");l?l.domain!=e.domain?(console.log(l.domain,e.domain),n.r.setKV("paycmd",{cmd:"buy",price:e.sell_info.price,domain:l.domain,option:{domain:e.domain},callback:o}),A.value=!0):alert("You can not buy yourself"):alert("You must login to an existing NBdomain first")}function C(){A.value=!1}return q(),n.r.get_onSale().then((e=>{d.value=e})),(e,t)=>{const n=(0,o.up)("q-card-section"),i=(0,o.up)("q-btn"),c=(0,o.up)("q-card"),q=(0,o.up)("q-dialog");return(0,o.wg)(),(0,o.iD)("div",m,[(0,o._)("div",u,[(0,o.Wm)(c,{class:"my-card q-pa-md",flat:"",bordered:""},{default:(0,o.w5)((()=>[(0,o.Wm)(n,{class:"text-weight-bold font-t16"},{default:(0,o.w5)((()=>[g])),_:1}),((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(d.value,(e=>((0,o.wg)(),(0,o.iD)("div",{key:e,class:"row justify-between q-mt-md"},[(0,o._)("div",p,[(0,o._)("div",f,[(0,o._)("div",w,[(0,o._)("img",{src:h(e.domain),style:{width:"16px"}},null,8,v)]),(0,o._)("div",y,[(0,o._)("div",b,(0,l.zw)(e.domain),1),(0,o._)("div",S,(0,l.zw)(e.sell_info.note),1)]),(0,o._)("div",null,(0,l.zw)(H(e)),1)])]),(0,o._)("div",null,[(0,o.Wm)(i,{label:(0,s.SU)(a)("message.buy"),outline:"",color:"primary",class:"q-px-lg",size:"md",onClick:a=>D(e),"no-caps":""},null,8,["label","onClick"])])])))),128))])),_:1})]),(0,o.Wm)(q,{modelValue:A.value,"onUpdate:modelValue":t[0]||(t[0]=e=>A.value=e),persistent:""},{default:(0,o.w5)((()=>[(0,o.Wm)(r.Z,{note:(0,s.SU)(k),onClosePayForm:C},null,8,["note"])])),_:1},8,["modelValue"])])}}};var k=t(4458),q=t(3190),H=t(8879),h=t(2074),D=t(9984),C=t.n(D);const x=A,Z=x;C()(A,"components",{QCard:k.Z,QCardSection:q.Z,QBtn:H.Z,QDialog:h.Z});var Q=t(5032);const U={class:"row justify-center no-wrap",style:{width:"100%"}},W={class:"colum col-11 col-sm-11 col-md-8 justify-center",style:{"margin-top":"100px"}},P={class:"text-weight-bold font-t32"},z={key:0,class:"result row justify-center no-wrap",style:{width:"100%"}},V={class:"colum col-11 col-sm-11 col-md-8 justify-center",style:{"margin-top":"30px"}},j={class:"row justify-between q-gutter-md items-center q-my-sm"},B={class:"col-12 col-sm-auto"},L=["src"],M={class:"font-t30 q-mx-md"},O={key:0,class:"col-7 row justify-end items-center"},R={class:"col column q-mx-lg text-right"},F={class:"text-primary font-t24"},I={href:"https://www.nbdomain.com/files/Domain Registration and Issue Agreement.pdf"},Y={class:"col-2"},N={key:1,class:"text-primary font-t24"},E={key:2,class:"text-primary font-t24"},T={setup(e){const{t:a}=(0,c.QT)(),t=(0,i.Z)(),m=t.platform.is.mobile,u=(0,d.yj)();let g=(0,s.iH)("ar"),p=[],f=[],w=(0,s.iH)([]),v=(0,s.iH)(""),y=(0,s.iH)(!1),b=(0,s.iH)(u.query.nid?u.query.nid:null),S=(new Set,(0,s.iH)(!1)),A=(0,s.iH)(!1);async function k(){}function q(e){const a=e.domain,t=a.split(".");return e.price/1e8+("a"===t[1]?" AR":" BSV")}async function H(e){e=e.split(".")[0],A.value=!0,S.value=!0;const a=await n.r.search_domain(e);console.log(a),p=a.ar.map((e=>(e.agree=(0,s.iH)(!1),e))),f=a.bsv.map((e=>(e.agree=(0,s.iH)(!1),e))),w.value=[{name:"ar",title:"AR chain",items:p,icon:"./icons/ar_48.png"},{name:"bsv",title:"BSV chain",items:f,icon:"./icons/bsv_48.png"}],A.value=!1}function h(){H(b.value)}function D(e){const o=async function(o){console.log("Register result:",o),0===o.code?t.dialog({title:a("message.congrat"),message:e.domain+": "+a("message.regSucess")}):t.dialog({title:a("message.error"),message:e.domain+": "+o.message})};console.log(e),n.r.setKV("paycmd",{cmd:"reg",price:e.price,domain:e.domain,callback:o}),y.value=!0}function C(){y.value=!1}return k(),null!=b.value&&h(),(e,t)=>{const n=(0,o.up)("q-btn"),i=(0,o.up)("q-input"),c=(0,o.up)("q-form"),d=(0,o.up)("q-tab"),u=(0,o.up)("q-tabs"),p=(0,o.up)("q-checkbox"),f=(0,o.up)("q-separator"),S=(0,o.up)("q-tab-panel"),k=(0,o.up)("q-tab-panels"),H=(0,o.up)("q-dialog"),x=(0,o.up)("q-page");return(0,o.wg)(),(0,o.j4)(x,null,{default:(0,o.w5)((()=>[(0,o._)("div",U,[(0,o._)("div",W,[(0,o._)("div",P,(0,l.zw)((0,s.SU)(a)("message.titleSearch")),1),(0,o._)("div",null,[(0,o.Wm)(c,{onSubmit:h,style:(0,l.j5)({marginTop:(0,s.SU)(m)?"32px":"20px"})},{default:(0,o.w5)((()=>[(0,o.Wm)(i,{outlined:"",modelValue:(0,s.SU)(b),"onUpdate:modelValue":t[0]||(t[0]=e=>(0,s.dq)(b)?b.value=e:b=e),"hide-bottom-space":"",placeholder:"Domain Name","bg-color":"white","input-style":"font-size:20px;"},{after:(0,o.w5)((()=>[(0,o.Wm)(n,{icon:"search",class:"bg-primary tc-2",size:"lg",onClick:h,loading:(0,s.SU)(A),"no-caps":""},null,8,["loading"])])),_:1},8,["modelValue"])])),_:1},8,["style"])])])]),(0,s.SU)(w).length>0?((0,o.wg)(),(0,o.iD)("div",z,[(0,o._)("div",V,[(0,o.Wm)(u,{modelValue:(0,s.SU)(g),"onUpdate:modelValue":t[1]||(t[1]=e=>(0,s.dq)(g)?g.value=e:g=e),class:"text-black",align:"left","no-caps":"","indicator-color":"primary"},{default:(0,o.w5)((()=>[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)((0,s.SU)(w),(e=>((0,o.wg)(),(0,o.j4)(d,{name:e.name,label:e.title,key:e.name},null,8,["name","label"])))),128))])),_:1},8,["modelValue"]),(0,o.Wm)(k,{modelValue:(0,s.SU)(g),"onUpdate:modelValue":t[2]||(t[2]=e=>(0,s.dq)(g)?g.value=e:g=e),animated:""},{default:(0,o.w5)((()=>[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)((0,s.SU)(w),(e=>((0,o.wg)(),(0,o.j4)(S,{name:e.name,key:e.title},{default:(0,o.w5)((()=>[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(e.items,(t=>((0,o.wg)(),(0,o.iD)("div",{key:t},[(0,o._)("div",j,[(0,o._)("div",B,[(0,o._)("img",{src:e.icon,style:{"vertical-align":"middle"}},null,8,L),(0,o._)("span",M,(0,l.zw)(t.domain),1)]),100==t.code&&t.price?((0,o.wg)(),(0,o.iD)("div",O,[(0,o._)("div",R,[(0,o._)("div",F,(0,l.zw)(q(t)),1),(0,o._)("div",null,[(0,o.Wm)(p,{modelValue:t.agree,"onUpdate:modelValue":e=>t.agree=e,class:"font-t16 text-grey-7"},{default:(0,o.w5)((()=>[(0,o.Uk)((0,l.zw)((0,s.SU)(a)("message.agree1")),1)])),_:2},1032,["modelValue","onUpdate:modelValue"]),(0,o._)("a",I," "+(0,l.zw)((0,s.SU)(a)("message.agreement")),1)])]),(0,o._)("div",Y,[(0,o.Wm)(n,{disable:!t.agree,label:"Register",class:"bg-primary tc-2 text-weight-bold",size:"md",onClick:e=>D(t),"no-caps":""},null,8,["disable","onClick"])])])):(0,o.kq)("",!0),100!=t.code||t.price?(0,o.kq)("",!0):((0,o.wg)(),(0,o.iD)("div",N,(0,l.zw)((0,s.SU)(a)("message.notOpen")),1)),0==t.code?((0,o.wg)(),(0,o.iD)("div",E,(0,l.zw)((0,s.SU)(a)("message.registered")),1)):(0,o.kq)("",!0)]),(0,o.Wm)(f)])))),128))])),_:2},1032,["name"])))),128))])),_:1},8,["modelValue"])])])):(0,o.kq)("",!0),(0,o.Wm)(Z),(0,o.Wm)(H,{modelValue:(0,s.SU)(y),"onUpdate:modelValue":t[3]||(t[3]=e=>(0,s.dq)(y)?y.value=e:y=e),persistent:""},{default:(0,o.w5)((()=>[(0,o.Wm)(r.Z,{note:(0,s.SU)(v),onClosePayForm:C},null,8,["note"])])),_:1},8,["modelValue"]),(0,o.Wm)(Q.Z)])),_:1})}}};var K=t(9885),X=t(8326),J=t(6611),_=t(7817),G=t(900),$=t(9800),ee=t(4106),ae=t(1221),te=t(926);const oe=T,le=oe;C()(T,"components",{QPage:K.Z,QForm:X.Z,QInput:J.Z,QBtn:H.Z,QTabs:_.Z,QTab:G.Z,QTabPanels:$.Z,QTabPanel:ee.Z,QCheckbox:ae.Z,QSeparator:te.Z,QDialog:h.Z})},8171:e=>{e.exports="data:image/png;base64,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"}}]);