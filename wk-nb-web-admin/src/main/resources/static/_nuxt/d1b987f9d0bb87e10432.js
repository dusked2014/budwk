(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{722:function(t,e,o){"use strict";o.r(e);var n={middleware:["authenticated","check_permissions"],data:function(){return{loading:!0,btnLoading:!1,listLoading:!1,addDialogVisible:!1,updateDialogVisible:!1,listData:[],pageData:{pageNo:1,pageSize:10,totalCount:0,pageOrderName:"createdAt",pageOrderBy:"descending"},formData:{lang_value:{}}}},computed:{formRules:function(){var t={configKey:[{required:!0,message:this.$t("sys.manage.param.form.configKey"),trigger:"blur"}],configValue:[{required:!0,message:this.$t("sys.manage.param.form.configValue"),trigger:"blur"}]};return t}},created:function(){this.listPage()},methods:{openAdd:function(){this.formData={},this.addDialogVisible=!0},doAdd:function(){var t=this;this.$refs.addForm.validate((function(e){e&&(t.btnLoading=!0,t.$axios.$post("/platform/sys/param/create",t.formData).then((function(e){t.btnLoading=!1,0===e.code&&(t.$message({message:e.msg,type:"success"}),t.addDialogVisible=!1,t.listPage())})))}))},openUpdate:function(t){var e=this;this.$axios.$get("/platform/sys/param/get/"+t.configKey).then((function(t){0===t.code&&(e.formData=t.data,e.updateDialogVisible=!0)}))},doUpdate:function(){var t=this;this.$refs.editForm.validate((function(e){e&&(t.btnLoading=!0,t.$axios.$post("/platform/sys/param/update",t.formData).then((function(e){t.btnLoading=!1,0===e.code&&(t.$message({message:e.msg,type:"success"}),t.updateDialogVisible=!1,t.listPage())})))}))},deleteRow:function(t){var e=this;this.$confirm(this.$t("sys.manage.param.delete",{name:t.configKey}),this.$t("system.commons.txt.notice"),{confirmButtonText:this.$t("system.commons.button.ok"),cancelButtonText:this.$t("system.commons.button.cancel"),type:"warning"}).then((function(){e.btnLoading=!0,e.$axios.$delete("/platform/sys/param/delete/"+t.configKey).then((function(t){e.btnLoading=!1,0===t.code&&(e.$message({message:t.msg,type:"success"}),e.listPage())}))}))},doChangePage:function(t){this.pageData.pageNo=t,this.listPage()},doSizeChange:function(t){this.pageData.pageSize=t,this.listPage()},doPageSort:function(t){this.pageData.pageOrderName=t.prop,this.pageData.pageOrderBy=t.order,this.listPage()},listPage:function(){var t=this;this.listLoading=!0,this.$axios.$post("/platform/sys/param/list",this.pageData).then((function(e){t.listLoading=!1,0===e.code&&(t.listData=e.data.list,t.pageData.totalCount=e.data.totalCount)}))},doSearch:function(){this.pageData.pageNo=1,this.listPage()}}},l=o(11),component=Object(l.a)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"platform-content"},[o("h4",{staticClass:"platform-content-title"},[o("span",[t._v(t._s(t.$t("sys.manage.param")))]),t._v(" "),o("div",{staticClass:"platform-list-op"},[o("el-button",{directives:[{name:"permission",rawName:"v-permission",value:"sys.manage.param.create",expression:"'sys.manage.param.create'"}],attrs:{size:"small",type:"primary"},on:{click:t.openAdd}},[t._v("\n        "+t._s(t.$t("sys.manage.param.create"))+"\n      ")])],1)]),t._v(" "),o("div",{staticClass:"platform-content-info"},[o("div",{staticClass:"platform-content-list"},[o("div",{staticClass:"platform-content-list-table"},[o("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],attrs:{data:t.listData,stripe:""},on:{"sort-change":t.doPageSort}},[o("el-table-column",{attrs:{prop:"configKey",label:t.$t("sys.manage.param.form.configKey"),sortable:""}}),t._v(" "),o("el-table-column",{attrs:{prop:"configValue",label:t.$t("sys.manage.param.form.configValue"),sortable:""}}),t._v(" "),o("el-table-column",{attrs:{prop:"note",label:t.$t("sys.manage.param.form.note")}}),t._v(" "),o("el-table-column",{attrs:{fixed:"right","header-align":"center",align:"center",label:t.$t("system.commons.txt.ext"),width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-button",{directives:[{name:"permission",rawName:"v-permission",value:"sys.manage.param.update",expression:"'sys.manage.param.update'"}],attrs:{type:"text",size:"small"},nativeOn:{click:function(o){return o.preventDefault(),t.openUpdate(e.row)}}},[t._v("\n                "+t._s(t.$t("system.commons.button.update.mini"))+"\n              ")]),t._v(" "),o("el-button",{directives:[{name:"permission",rawName:"v-permission",value:"sys.manage.param.delete",expression:"'sys.manage.param.delete'"}],staticClass:"button-delete-color",attrs:{type:"text",size:"small",disabled:0===e.row.configKey.indexOf("App")},nativeOn:{click:function(o){return o.preventDefault(),t.deleteRow(e.row)}}},[t._v("\n                "+t._s(t.$t("system.commons.button.delete.mini"))+"\n              ")])]}}])})],1)],1),t._v(" "),o("div",{staticClass:"platform-content-list-pagination"},[o("el-pagination",{staticClass:"platform-pagenation",attrs:{"current-page":t.pageData.pageNo,"page-size":t.pageData.pageSize,total:t.pageData.totalCount,background:"","page-sizes":[10,20,30,50],layout:"sizes, prev, pager, next"},on:{"current-change":t.doChangePage,"size-change":t.doSizeChange}})],1)])]),t._v(" "),o("el-dialog",{attrs:{title:t.$t("sys.manage.param.create"),visible:t.addDialogVisible,"close-on-click-modal":!1,width:"50%"},on:{"update:visible":function(e){t.addDialogVisible=e}}},[o("el-form",{ref:"addForm",attrs:{model:t.formData,rules:t.formRules,size:"small","label-width":"120px"}},[o("el-form-item",{attrs:{prop:"configKey",label:t.$t("sys.manage.param.form.configKey")}},[o("el-input",{attrs:{maxlength:"100",placeholder:t.$t("sys.manage.param.form.configKey"),"auto-complete":"off",tabindex:"2",type:"text"},model:{value:t.formData.configKey,callback:function(e){t.$set(t.formData,"configKey",e)},expression:"formData.configKey"}})],1),t._v(" "),o("el-form-item",{attrs:{prop:"configValue",label:t.$t("sys.manage.param.form.configValue")}},[o("el-input",{attrs:{maxlength:"100",placeholder:t.$t("sys.manage.param.form.configValue"),"auto-complete":"off",tabindex:"2",type:"text"},model:{value:t.formData.configValue,callback:function(e){t.$set(t.formData,"configValue",e)},expression:"formData.configValue"}})],1),t._v(" "),o("el-form-item",{attrs:{prop:"note",label:t.$t("sys.manage.param.form.note")}},[o("el-input",{attrs:{type:"textarea"},model:{value:t.formData.note,callback:function(e){t.$set(t.formData,"note",e)},expression:"formData.note"}})],1)],1),t._v(" "),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.addDialogVisible=!1}}},[t._v(t._s(t.$t("system.commons.button.cancel")))]),t._v(" "),o("el-button",{attrs:{type:"primary",loading:t.btnLoading},on:{click:t.doAdd}},[t._v(t._s(t.$t("system.commons.button.ok")))])],1)],1),t._v(" "),o("el-dialog",{attrs:{title:t.$t("sys.manage.param.update"),visible:t.updateDialogVisible,"close-on-click-modal":!1,width:"50%"},on:{"update:visible":function(e){t.updateDialogVisible=e}}},[o("el-form",{ref:"editForm",attrs:{model:t.formData,rules:t.formRules,size:"small","label-width":"120px"}},[o("el-form-item",{attrs:{prop:"configKey",label:t.$t("sys.manage.param.form.configKey")}},[o("el-input",{attrs:{maxlength:"100",placeholder:t.$t("sys.manage.param.form.configKey"),disabled:!0,"auto-complete":"off",tabindex:"2",type:"text"},model:{value:t.formData.configKey,callback:function(e){t.$set(t.formData,"configKey",e)},expression:"formData.configKey"}})],1),t._v(" "),o("el-form-item",{attrs:{prop:"configValue",label:t.$t("sys.manage.param.form.configValue")}},[o("el-input",{attrs:{maxlength:"100",placeholder:t.$t("sys.manage.param.form.configValue"),"auto-complete":"off",tabindex:"2",type:"text"},model:{value:t.formData.configValue,callback:function(e){t.$set(t.formData,"configValue",e)},expression:"formData.configValue"}})],1),t._v(" "),o("el-form-item",{attrs:{prop:"note",label:t.$t("sys.manage.param.form.note")}},[o("el-input",{attrs:{type:"textarea"},model:{value:t.formData.note,callback:function(e){t.$set(t.formData,"note",e)},expression:"formData.note"}})],1)],1),t._v(" "),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.updateDialogVisible=!1}}},[t._v(t._s(t.$t("system.commons.button.cancel")))]),t._v(" "),o("el-button",{attrs:{type:"primary",loading:t.btnLoading},on:{click:t.doUpdate}},[t._v(t._s(t.$t("system.commons.button.ok")))])],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);