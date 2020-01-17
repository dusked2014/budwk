(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{718:function(t,e,o){"use strict";o.r(e);o(68);var n={middleware:["authenticated","check_permissions"],data:function(){var t=this;return{loading:!0,btnLoading:!1,listLoading:!1,addDialogVisible:!1,updateDialogVisible:!1,sortDialogVisible:!1,tableData:[],tableKey:"",isAddFromSub:!1,options:[],sortMenuData:[],formData:{id:"",parentId:""},props:{lazy:!0,checkStrictly:!0,multiple:!1,emitPath:!1,lazyLoad:function(e,o){t.$axios.$get("/platform/sys/dict/tree",{params:{pid:e.value}}).then((function(t){0===t.code&&o(t.data)}))}},treeProps:{children:"children",label:"label"}}},computed:{formRules:function(){var t={name:[{required:!0,message:this.$t("sys.config.dict.form.name"),trigger:"blur"}],code:[{required:!0,message:this.$t("sys.config.dict.form.code"),trigger:"blur"}]};return t}},created:function(){this.loadData()},methods:{loadData:function(){var t=this;this.listLoading=!0,this.$axios.$get("/platform/sys/dict/child").then((function(e){t.listLoading=!1,0===e.code&&(t.tableData=e.data,t.tableKey=+new Date)}))},loadChild:function(t,e,o){this.$axios.$get("/platform/sys/dict/child",{params:{pid:t.id}}).then((function(t){0===t.code&&o(t.data)}))},openAdd:function(){this.formData={},this.options=[],this.addDialogVisible=!0},doAdd:function(){var t=this;this.$refs.addForm.validate((function(e){e&&(t.btnLoading=!0,t.$axios.$post("/platform/sys/dict/create",t.formData).then((function(e){t.btnLoading=!1,0===e.code&&(t.$message({message:e.msg,type:"success"}),t.loadData(),t.addDialogVisible=!1)})))}))},addSubRow:function(t){this.formData={id:"",parentId:t.id,parentName:t.name,disabled:!1},this.isAddFromSub=!0,this.$refs.addForm&&this.$refs.addForm.resetFields(),this.addDialogVisible=!0},updateRow:function(t){var e=this;this.$axios.$get("/platform/sys/dict/get/"+t.id).then((function(t){0===t.code&&(e.formData=t.data,e.updateDialogVisible=!0)}))},doUpdate:function(){var t=this;this.$refs.updateForm.validate((function(e){e&&(t.btnLoading=!0,t.$axios.$post("/platform/sys/dict/update",t.formData).then((function(e){t.btnLoading=!1,0===e.code&&(t.$message({message:e.msg,type:"success"}),t.loadData(),t.updateDialogVisible=!1)})))}))},deleteRow:function(t){var e=this;this.$confirm(this.$t("sys.config.dict.delete",{name:t.name}),this.$t("system.commons.txt.notice"),{confirmButtonText:this.$t("system.commons.button.ok"),cancelButtonText:this.$t("system.commons.button.cancel"),type:"warning"}).then((function(){e.$axios.$delete("/platform/sys/dict/delete/"+t.id).then((function(t){0===t.code&&(e.$message({message:t.msg,type:"success"}),e.loadData())}))}))},openSort:function(){var t=this;this.$axios.$get("/platform/sys/dict/get_sort_tree").then((function(e){0===e.code&&(t.sortMenuData=e.data)})),this.sortDialogVisible=!0},sortAllowDrop:function(t,e,o){if(t.data.parentId===e.data.parentId)return"prev"===o},getTreeIds:function(t,data){var e=this;data.forEach((function(o){t.push(o.id),o.children&&o.children.length>0&&e.getTreeIds(t,o.children)}))},disabledChange:function(t){var e=this;this.$axios.$post("/platform/sys/dict/disabled",t).then((function(o){0===o.code?e.$message({message:o.msg,type:"success"}):setTimeout((function(){t.disabled=!t.disabled}),300)}))},doSort:function(){var t=this;this.btnLoading=!0;var e=[];this.getTreeIds(e,this.sortMenuData),this.$axios.$post("/platform/sys/dict/sort",{ids:e.toString()}).then((function(e){t.btnLoading=!1,0===e.code&&(t.sortDialogVisible=!1,t.loadData())}))}}},l=o(11),component=Object(l.a)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"platform-content"},[o("h4",{staticClass:"platform-content-title"},[o("span",[t._v(t._s(t.$t("sys.config.dict")))]),t._v(" "),o("div",{staticClass:"platform-list-op"},[o("el-button",{directives:[{name:"permission",rawName:"v-permission",value:"sys.config.dict.create",expression:"'sys.config.dict.create'"}],attrs:{size:"small",type:"primary"},on:{click:t.openAdd}},[t._v("\n        "+t._s(t.$t("sys.config.dict.create"))+"\n      ")]),t._v(" "),o("el-button",{directives:[{name:"permission",rawName:"v-permission",value:"sys.config.dict.update",expression:"'sys.config.dict.update'"}],attrs:{size:"small"},on:{click:t.openSort}},[t._v("\n        "+t._s(t.$t("sys.config.dict.sort"))+"\n      ")])],1)]),t._v(" "),o("div",{staticClass:"platform-content-info"},[o("div",{staticClass:"platform-content-list"},[o("div",{staticClass:"platform-content-list-table"},[o("el-table",{key:t.tableKey,staticStyle:{width:"100%"},attrs:{data:t.tableData,size:"small","highlight-current-row":!0,"row-key":"id",lazy:"",load:t.loadChild}},[o("el-table-column",{attrs:{label:t.$t("sys.config.dict.form.name"),"header-align":"center",prop:"name",width:"230px","show-overflow-tooltip":!0,align:"left"}}),t._v(" "),o("el-table-column",{attrs:{label:t.$t("sys.config.dict.form.code"),"header-align":"left",prop:"code","show-overflow-tooltip":!0,align:"left"}}),t._v(" "),o("el-table-column",{attrs:{label:t.$t("sys.config.dict.form.disabled"),"header-align":"left",prop:"disabled",align:"left",width:"120px","show-overflow-tooltip":!0},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-switch",{attrs:{size:"small","active-value":!1,"inactive-value":!0,"active-color":"green","inactive-color":"red"},on:{change:function(o){return t.disabledChange(e.row)}},model:{value:e.row.disabled,callback:function(o){t.$set(e.row,"disabled",o)},expression:"scope.row.disabled"}})]}}])}),t._v(" "),o("el-table-column",{attrs:{label:t.$t("system.commons.txt.ext"),"header-align":"center","show-overflow-tooltip":!0,align:"right",width:"180px"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-button",{attrs:{type:"text",size:"small"},nativeOn:{click:function(o){return o.preventDefault(),t.addSubRow(e.row)}}},[t._v("\n                "+t._s(t.$t("system.commons.button.addsub.mini"))+"\n              ")]),t._v(" "),o("el-button",{attrs:{type:"text",size:"small"},nativeOn:{click:function(o){return o.preventDefault(),t.updateRow(e.row)}}},[t._v("\n                "+t._s(t.$t("system.commons.button.update.mini"))+"\n              ")]),t._v(" "),o("el-button",{staticClass:"button-delete-color",attrs:{type:"text",size:"small"},nativeOn:{click:function(o){return o.preventDefault(),t.deleteRow(e.row)}}},[t._v("\n                "+t._s(t.$t("system.commons.button.delete.mini"))+"\n              ")])]}}])})],1)],1)])]),t._v(" "),o("el-dialog",{attrs:{title:t.$t("sys.config.dict.create"),visible:t.addDialogVisible,"close-on-click-modal":!1,width:"40%"},on:{"update:visible":function(e){t.addDialogVisible=e}}},[o("el-form",{ref:"addForm",attrs:{model:t.formData,rules:t.formRules,size:"small","label-width":"100px"}},[o("el-form-item",{attrs:{prop:"parentId",label:t.$t("sys.config.dict.form.parentId")}},[t.isAddFromSub?t._e():o("el-cascader",{staticStyle:{width:"100%"},attrs:{props:t.props,options:t.options,placeholder:t.$t("sys.config.dict.form.parentRoot")},model:{value:t.formData.parentId,callback:function(e){t.$set(t.formData,"parentId",e)},expression:"formData.parentId"}}),t._v(" "),t.isAddFromSub?o("el-input",{attrs:{type:"text",disabled:!0},model:{value:t.formData.parentName,callback:function(e){t.$set(t.formData,"parentName",e)},expression:"formData.parentName"}}):t._e()],1),t._v(" "),o("el-form-item",{attrs:{prop:"name",label:t.$t("sys.config.dict.form.name")}},[o("el-input",{attrs:{maxlength:"100",placeholder:t.$t("sys.config.dict.form.name"),"auto-complete":"off",tabindex:"2",type:"text"},model:{value:t.formData.name,callback:function(e){t.$set(t.formData,"name",e)},expression:"formData.name"}})],1),t._v(" "),o("el-form-item",{attrs:{prop:"code",label:t.$t("sys.config.dict.form.code")}},[o("el-input",{attrs:{maxlength:"100",placeholder:t.$t("sys.config.dict.form.code"),"auto-complete":"off",tabindex:"3",type:"text"},model:{value:t.formData.code,callback:function(e){t.$set(t.formData,"code",e)},expression:"formData.code"}})],1),t._v(" "),o("el-form-item",{attrs:{prop:"disabled",label:t.$t("sys.config.dict.form.disabled")}},[o("el-switch",{attrs:{size:"small","active-value":!1,"inactive-value":!0,"active-color":"green","inactive-color":"red"},model:{value:t.formData.disabled,callback:function(e){t.$set(t.formData,"disabled",e)},expression:"formData.disabled"}})],1)],1),t._v(" "),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.addDialogVisible=!1}}},[t._v(t._s(t.$t("system.commons.button.cancel")))]),t._v(" "),o("el-button",{attrs:{loading:t.btnLoading,type:"primary"},on:{click:t.doAdd}},[t._v(t._s(t.$t("system.commons.button.ok")))])],1)],1),t._v(" "),o("el-dialog",{attrs:{title:t.$t("sys.config.dict.update"),visible:t.updateDialogVisible,"close-on-click-modal":!1,width:"40%"},on:{"update:visible":function(e){t.updateDialogVisible=e}}},[o("el-form",{ref:"updateForm",attrs:{model:t.formData,rules:t.formRules,size:"small","label-width":"100px"}},[o("el-form-item",{attrs:{prop:"name",label:t.$t("sys.config.dict.form.name")}},[o("el-input",{attrs:{maxlength:"100",placeholder:t.$t("sys.config.dict.form.name"),"auto-complete":"off",tabindex:"2",type:"text"},model:{value:t.formData.name,callback:function(e){t.$set(t.formData,"name",e)},expression:"formData.name"}})],1),t._v(" "),o("el-form-item",{attrs:{prop:"code",label:t.$t("sys.config.dict.form.code")}},[o("el-input",{attrs:{maxlength:"100",placeholder:t.$t("sys.config.dict.form.code"),"auto-complete":"off",tabindex:"3",type:"text"},model:{value:t.formData.code,callback:function(e){t.$set(t.formData,"code",e)},expression:"formData.code"}})],1),t._v(" "),o("el-form-item",{attrs:{prop:"disabled",label:t.$t("sys.config.dict.form.disabled")}},[o("el-switch",{attrs:{size:"small","active-value":!1,"inactive-value":!0,"active-color":"green","inactive-color":"red"},model:{value:t.formData.disabled,callback:function(e){t.$set(t.formData,"disabled",e)},expression:"formData.disabled"}})],1)],1),t._v(" "),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.updateDialogVisible=!1}}},[t._v(t._s(t.$t("system.commons.button.cancel")))]),t._v(" "),o("el-button",{attrs:{loading:t.btnLoading,type:"primary"},on:{click:t.doUpdate}},[t._v(t._s(t.$t("system.commons.button.ok")))])],1)],1),t._v(" "),o("el-dialog",{attrs:{title:t.$t("sys.manage.unit.sort"),visible:t.sortDialogVisible,width:"50%"},on:{"update:visible":function(e){t.sortDialogVisible=e}}},[o("el-tree",{ref:"sortMenuTree",attrs:{data:t.sortMenuData,draggable:"","allow-drop":t.sortAllowDrop,"node-key":"id",props:t.treeProps},scopedSlots:t._u([{key:"default",fn:function(e){return o("span",{staticClass:"custom-tree-node"},[o("span",[t._v(t._s(e.node.label))])])}}])}),t._v(" "),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.sortDialogVisible=!1}}},[t._v(t._s(t.$t("system.commons.button.cancel")))]),t._v(" "),o("el-button",{attrs:{type:"primary",loading:t.btnLoading},on:{click:t.doSort}},[t._v(t._s(t.$t("system.commons.button.ok")))])],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);