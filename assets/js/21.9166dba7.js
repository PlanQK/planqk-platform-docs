(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{288:function(t,e,n){},306:function(t,e,n){"use strict";n(288)},318:function(t,e,n){"use strict";n.r(e);var i={props:{id:{type:String,required:!0}},data:()=>({backend:null}),computed:{text:function(){const t=this.backend.status.toLowerCase();return t.charAt(0).toUpperCase()+t.slice(1)},type:function(){const t=this.backend.status;return"RETIRED"===t||"OFFLINE"===t?"error":"UNKNOWN"===t||"PAUSED"===t?"warning":"tip"},tooltipText:function(){const t=this.backend.status;return"ONLINE"===t?"Jobs can be submitted and will be executed":"PAUSED"===t?"Jobs can be submitted and will be executed once the backend is online again":"OFFLINE"===t?"Jobs cannot be submitted":"RETIRED"===t?"Backend is retired and cannot be used anymore":"UNKNOWN"===t?"Backend status is unknown":void 0}},mounted(){fetch(`https://34.90.225.20.nip.io/qiskit/backends/${this.id}/status`).then(t=>t.json()).then(t=>this.backend=t)}},s=(n(306),n(7)),a=Object(s.a)(i,(function(){var t=this._self._c;return t("div",[this.backend?t("VueCustomTooltip",{attrs:{label:this.tooltipText}},[t("Badge",{attrs:{text:this.text,type:this.type,vertical:"middle"}})],1):t("Badge",{attrs:{text:"Loading...",type:"plain",vertical:"middle"}})],1)}),[],!1,null,null,null);e.default=a.exports}}]);