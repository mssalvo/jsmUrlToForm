/* 
 * To change this license header, choose License Headers in Project Properties.
 * @author Mariniello Salvatore
 * salvo.mariniello@gmail.com
 * All Rights Reserved.
 * https://github.com/mssalvo/jsmUrlToForm
 * Converts links to get and post forms
 */
var jsmUrlToForm = jsmUrlToForm || false;
(function (d) {
    !jsmUrlToForm ? jsmUrlToForm = {
        settyng: {
            formName: 'jsmToForm', 
            formMethod: 'get',
            tokenName: 'token',
            tokenVal:'default',
            esclude:['###'],
            escludeDef:/(javascript:|^#|document?\.|void?\()/i,
            escludeExt:['.jpg','.jpeg','.png','.gif','.bmp','.svg','.pict','.webp','.tiff','.pcx','.pds','.cdp','.jpd','.rar','.zip','.7z','.iso','.mdf','.jar','.toast','.sitx','.zim','.csv','.doc','.docx','.odt','.ods','.odg','.odp','.pdf','.pps','.txt','.tex','.ltx','.rtf','.xls','.xlsx','.css','.json']}, 
        toFormGet: function () {
            return {form: d.forms[jsmUrlToForm.settyng.formName], token: d.forms[jsmUrlToForm.settyng.formName].elements[jsmUrlToForm.settyng.tokenName] != undefined ? d.forms[jsmUrlToForm.settyng.formName].elements[jsmUrlToForm.settyng.tokenName].value : '', clear: function () {
                    var el = d.forms[jsmUrlToForm.settyng.formName].elements;
                    for (i = 0; i < el.length; i++) {
                        if (el[i].name != jsmUrlToForm.settyng.tokenName)
                            el[i].parentNode.removeChild(el[i])
                    }
                }}
        },
        extend:function ( def, opt ) {
            var nowObj = {};
            for (var prop in def) {
                if (Object.prototype.hasOwnProperty.call(def, prop)) {
                    nowObj[prop] = def[prop];
                }
            }
            for (var prop in opt) {
                if (Object.prototype.hasOwnProperty.call(opt, prop)) {
                    nowObj[prop] = opt[prop];
                }
            }
            return nowObj;
        },  
        init: function (o) {
        this.settyng=this.extend(this.settyng,o||{}); 
       
        
        if (undefined == d.forms[jsmUrlToForm.settyng.formName]) {
                jsmUrlToForm.createObj("<form>", {name: jsmUrlToForm.settyng.formName, action: "#", method: "post", style: "display:none"}, d.body)
                        .putObj("<input>", {type: "hidden", name: jsmUrlToForm.settyng.tokenName, id: jsmUrlToForm.settyng.tokenName, value: jsmUrlToForm.settyng.tokenVal})
                        .putObj("<input>", {type: "submit", value: "go!", style: "display:none"})

            }
            this.scanner();
        },
        scanner: function () {
            Array.prototype.slice.call(d.querySelectorAll("a")).forEach(function (el, i) {
                if (!jsmUrlToForm.settyng.escludeDef.test(el.getAttribute("href")) && !new RegExp("(\\b"+jsmUrlToForm.settyng.escludeExt.join("\\b|\\b")+"\\b)","i").test(el.getAttribute("href")) && !new RegExp("(\\b"+jsmUrlToForm.settyng.esclude.join("\\b|\\b")+"\\b)","i").test(el.getAttribute("href")))
                    el.setAttribute("href", "javascript:{jsmUrlToForm.attachForm('" + el.getAttribute("href") + "')}");
            })
        },
        ctx: false,
        token: false,
        get: function () {
            return this.ctx
        },
        setContext: function (o) {
            this.ctx = o;
            return this
        },
        setToken: function (o) {
            this.token = o;
            return this
        },
        getToken: function () {
            if (!this.token)
                this.token = this.toFormGet().token;
            return this.token;
        },
        verifyToken: function (url) {

            if (url.split("?").length > 1) {
                for (var i = unescape(url.split("?")[1]), s = i.split("&"), e = 0; e < s.length; e++)
                    if (pos = s[e].indexOf("="), pos > 0 && toForm.settyng.tokenName == s[e].substring(0, pos))
                        return url;
            } else {
                return  url += "?" + toForm.settyng.tokenName + "=" + this.getToken();
            }
            return url += "&" + toForm.settyng.tokenName + "=" + this.getToken();
        },
        createObj: function (e, o, a) {
            var now = d.createElement(/^<(\w+)\s*\/?>(?:<\/\1>|)$/.exec(e)[1])
            if (o) {
                for (var i in o)
                    (function (i, o) {
                        now[i] = o[i]
                    })(i, o)
            }
            if (a)
                a.appendChild(now)
            this.ctx = now;
            return this;
        },
        putObj: function (e, o, a) {
            if (!this.ctx && (undefined != document.forms[toForm.settyng.formName]))
                this.ctx = this.toFormGet().form;
            var now = d.createElement(/^<(\w+)\s*\/?>(?:<\/\1>|)$/.exec(e)[1])
            if (o) {
                for (var i in o)
                    (function (i, o) {
                        now[i] = o[i]
                    })(i, o)
            }
            if (a)
                a.appendChild(now)
            else
                this.ctx.appendChild(now)

            return this;
        },
        attachForm: function (url, type) {
            var typeUpper = type || this.settyng.formMethod;
            typeUpper = typeUpper.toUpperCase();

            this.toFormGet().form.action = url.split("?")[0];
            switch (typeUpper) {
                case"GET":
                    this.toFormGet().form.method = "get";
                    break;
                case "POST":
                    this.toFormGet().form.method = "post";
                    break;
                default:
                    this.toFormGet().form.method = this.settyng.formMethod;
            }

            this.toFormGet().clear();
            this.setContext(this.toFormGet().form);

            if (url.split("?").length > 1)
                for (var i = unescape(url.split("?")[1]), s = i.split("&"), e = 0; e < s.length; e++) {
                    if (pos = s[e].indexOf("="), pos > 0) {
                        this.putObj("<input>", {type: "hidden", name: s[e].substring(0, pos), id: s[e].substring(0, pos), value: s[e].substring(pos + 1)})
                    }
                }

            this.putObj("<input>", {type: "submit", value: "go!", style: "display:none"})
                    .get().submit();
 
        },
        attachUrl: function (url, token) {
            if (token)
                this.setToken(token);
            location.href = this.verifyToken(url);
        }
    } : jsmUrlToForm;

 
})(document)
 
