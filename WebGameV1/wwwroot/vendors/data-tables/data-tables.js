﻿/*! DataTables 2.1.4
 * © SpryMedia Ltd - datatables.net/license
 */
!function (n) {
    "use strict";
    var a;
    "function" == typeof define && define.amd ? define(["jquery"], function (e) {
        return n(e, window, document)
    }) : "object" == typeof exports ? (a = require("jquery"),
        "undefined" == typeof window ? module.exports = function (e, t) {
            return e = e || window,
                t = t || a(e),
                n(t, e, e.document)
        }
            : module.exports = n(a, window, window.document)) : window.DataTable = n(jQuery, window, document)
}(function (H, W, _) {
    "use strict";
    function f(e) {
        var t = parseInt(e, 10);
        return !isNaN(t) && isFinite(e) ? t : null
    }
    function s(e, t, n, a) {
        var r = typeof e
            , o = "string" == r;
        return "number" == r || "bigint" == r || !(!a || !T(e)) || (t && o && (e = E(e, t)),
            n && o && (e = e.replace(P, "")),
            !isNaN(parseFloat(e)) && isFinite(e))
    }
    function c(e, t, n, a) {
        var r;
        return !(!a || !T(e)) || ("string" != typeof e || !e.match(/<(input|select)/i)) && (T(r = e) || "string" == typeof r) && !!s(L(e), t, n, a) || null
    }
    function b(e, t, n, a) {
        var r = []
            , o = 0
            , i = t.length;
        if (void 0 !== a)
            for (; o < i; o++)
                e[t[o]][n] && r.push(e[t[o]][n][a]);
        else
            for (; o < i; o++)
                e[t[o]] && r.push(e[t[o]][n]);
        return r
    }
    function h(e, t) {
        var n, a = [];
        void 0 === t ? (t = 0,
            n = e) : (n = t,
                t = e);
        for (var r = t; r < n; r++)
            a.push(r);
        return a
    }
    function A(e) {
        for (var t = [], n = 0, a = e.length; n < a; n++)
            e[n] && t.push(e[n]);
        return t
    }
    var C, X, t, e, V = function (e, P) {
        var E, k, M;
        return V.factory(e, P) ? V : this instanceof V ? H(e).DataTable(P) : (k = void 0 === (P = e),
            M = (E = this).length,
            k && (P = {}),
            this.api = function () {
                return new X(this)
            }
            ,
            this.each(function () {
                var e = 1 < M ? et({}, P, !0) : P
                    , t = 0
                    , n = this.getAttribute("id")
                    , a = V.defaults
                    , r = H(this);
                if ("table" != this.nodeName.toLowerCase())
                    $(null, 0, "Non-table node initialisation (" + this.nodeName + ")", 2);
                else {
                    H(this).trigger("options.dt", e),
                        Q(a),
                        K(a.column),
                        q(a, a, !0),
                        q(a.column, a.column, !0),
                        q(a, H.extend(e, r.data()), !0);
                    var o = V.settings;
                    for (t = 0,
                        R = o.length; t < R; t++) {
                        var i = o[t];
                        if (i.nTable == this || i.nTHead && i.nTHead.parentNode == this || i.nTFoot && i.nTFoot.parentNode == this) {
                            var l = (void 0 !== e.bRetrieve ? e : a).bRetrieve
                                , s = (void 0 !== e.bDestroy ? e : a).bDestroy;
                            if (k || l)
                                return i.oInstance;
                            if (s) {
                                new V.Api(i).destroy();
                                break
                            }
                            return void $(i, 0, "Cannot reinitialise DataTable", 3)
                        }
                        if (i.sTableId == this.id) {
                            o.splice(t, 1);
                            break
                        }
                    }
                    null !== n && "" !== n || (n = "DataTables_Table_" + V.ext._unique++,
                        this.id = n);
                    var u, c = H.extend(!0, {}, V.models.oSettings, {
                        sDestroyWidth: r[0].style.width,
                        sInstance: n,
                        sTableId: n,
                        colgroup: H("<colgroup>").prependTo(this),
                        fastData: function (e, t, n) {
                            return B(c, e, t, n)
                        }
                    }), n = (c.nTable = this,
                        c.oInit = e,
                        o.push(c),
                        c.api = new X(c),
                        c.oInstance = 1 === E.length ? E : r.dataTable(),
                        Q(e),
                        e.aLengthMenu && !e.iDisplayLength && (e.iDisplayLength = Array.isArray(e.aLengthMenu[0]) ? e.aLengthMenu[0][0] : H.isPlainObject(e.aLengthMenu[0]) ? e.aLengthMenu[0].value : e.aLengthMenu[0]),
                        e = et(H.extend(!0, {}, a), e),
                        z(c.oFeatures, e, ["bPaginate", "bLengthChange", "bFilter", "bSort", "bSortMulti", "bInfo", "bProcessing", "bAutoWidth", "bSortClasses", "bServerSide", "bDeferRender"]),
                        z(c, e, ["ajax", "fnFormatNumber", "sServerMethod", "aaSorting", "aaSortingFixed", "aLengthMenu", "sPaginationType", "iStateDuration", "bSortCellsTop", "iTabIndex", "sDom", "fnStateLoadCallback", "fnStateSaveCallback", "renderer", "searchDelay", "rowId", "caption", "layout", "orderDescReverse", ["iCookieDuration", "iStateDuration"], ["oSearch", "oPreviousSearch"], ["aoSearchCols", "aoPreSearchCols"], ["iDisplayLength", "_iDisplayLength"]]),
                        z(c.oScroll, e, [["sScrollX", "sX"], ["sScrollXInner", "sXInner"], ["sScrollY", "sY"], ["bScrollCollapse", "bCollapse"]]),
                        z(c.oLanguage, e, "fnInfoCallback"),
                        Y(c, "aoDrawCallback", e.fnDrawCallback),
                        Y(c, "aoStateSaveParams", e.fnStateSaveParams),
                        Y(c, "aoStateLoadParams", e.fnStateLoadParams),
                        Y(c, "aoStateLoaded", e.fnStateLoaded),
                        Y(c, "aoRowCallback", e.fnRowCallback),
                        Y(c, "aoRowCreatedCallback", e.fnCreatedRow),
                        Y(c, "aoHeaderCallback", e.fnHeaderCallback),
                        Y(c, "aoFooterCallback", e.fnFooterCallback),
                        Y(c, "aoInitComplete", e.fnInitComplete),
                        Y(c, "aoPreDrawCallback", e.fnPreDrawCallback),
                        c.rowIdFn = U(e.rowId),
                        c), d = (V.__browser || (f = {},
                            V.__browser = f,
                            p = H("<div/>").css({
                                position: "fixed",
                                top: 0,
                                left: -1 * W.pageXOffset,
                                height: 1,
                                width: 1,
                                overflow: "hidden"
                            }).append(H("<div/>").css({
                                position: "absolute",
                                top: 1,
                                left: 1,
                                width: 100,
                                overflow: "scroll"
                            }).append(H("<div/>").css({
                                width: "100%",
                                height: 10
                            }))).appendTo("body"),
                            d = p.children(),
                            u = d.children(),
                            f.barWidth = d[0].offsetWidth - d[0].clientWidth,
                            f.bScrollbarLeft = 1 !== Math.round(u.offset().left),
                            p.remove()),
                            H.extend(n.oBrowser, V.__browser),
                            n.oScroll.iBarWidth = V.__browser.barWidth,
                            c.oClasses), f = (H.extend(d, V.ext.classes, e.oClasses),
                                r.addClass(d.table),
                                c.oFeatures.bPaginate || (e.iDisplayStart = 0),
                                void 0 === c.iInitDisplayStart && (c.iInitDisplayStart = e.iDisplayStart,
                                    c._iDisplayStart = e.iDisplayStart),
                                e.iDeferLoading), h = (null !== f && (c.deferLoading = !0,
                                    u = Array.isArray(f),
                                    c._iRecordsDisplay = u ? f[0] : f,
                                    c._iRecordsTotal = u ? f[1] : f),
                                    []), p = this.getElementsByTagName("thead"), n = Ae(c, p[0]);
                    if (e.aoColumns)
                        h = e.aoColumns;
                    else if (n.length)
                        for (R = n[t = 0].length; t < R; t++)
                            h.push(null);
                    for (t = 0,
                        R = h.length; t < R; t++)
                        ee(c);
                    var g, v, m, b, y, D, x, S = c, w = e.aoColumnDefs, T = h, _ = n, C = function (e, t) {
                        te(c, e, t)
                    }, L = S.aoColumns;
                    if (T)
                        for (g = 0,
                            v = T.length; g < v; g++)
                            T[g] && T[g].name && (L[g].sName = T[g].name);
                    if (w)
                        for (g = w.length - 1; 0 <= g; g--) {
                            var I = void 0 !== (x = w[g]).target ? x.target : void 0 !== x.targets ? x.targets : x.aTargets;
                            for (Array.isArray(I) || (I = [I]),
                                m = 0,
                                b = I.length; m < b; m++) {
                                var A = I[m];
                                if ("number" == typeof A && 0 <= A) {
                                    for (; L.length <= A;)
                                        ee(S);
                                    C(A, x)
                                } else if ("number" == typeof A && A < 0)
                                    C(L.length + A, x);
                                else if ("string" == typeof A)
                                    for (y = 0,
                                        D = L.length; y < D; y++)
                                        "_all" === A ? C(y, x) : -1 !== A.indexOf(":name") ? L[y].sName === A.replace(":name", "") && C(y, x) : _.forEach(function (e) {
                                            e[y] && (e = H(e[y].cell),
                                                A.match(/^[a-z][\w-]*$/i) && (A = "." + A),
                                                e.is(A)) && C(y, x)
                                        })
                            }
                        }
                    if (T)
                        for (g = 0,
                            v = T.length; g < v; g++)
                            C(g, T[g]);
                    var F, n = r.children("tbody").find("tr").eq(0), N = (n.length && (F = function (e, t) {
                        return null !== e.getAttribute("data-" + t) ? t : null
                    }
                        ,
                        H(n[0]).children("th, td").each(function (e, t) {
                            var n, a = c.aoColumns[e];
                            a || $(c, 0, "Incorrect column count", 18),
                                a.mData === e && (n = F(t, "sort") || F(t, "order"),
                                    t = F(t, "filter") || F(t, "search"),
                                    null === n && null === t || (a.mData = {
                                        _: e + ".display",
                                        sort: null !== n ? e + ".@data-" + n : void 0,
                                        type: null !== n ? e + ".@data-" + n : void 0,
                                        filter: null !== t ? e + ".@data-" + t : void 0
                                    },
                                        a._isArrayHost = !0,
                                        te(c, e)))
                        })),
                        Y(c, "aoDrawCallback", Qe),
                        c.oFeatures);
                    if (e.bStateSave && (N.bStateSave = !0),
                        void 0 === e.aaSorting)
                        for (var j = c.aaSorting, t = 0, R = j.length; t < R; t++)
                            j[t][1] = c.aoColumns[t].asSorting[0];
                    Ze(c),
                        Y(c, "aoDrawCallback", function () {
                            (c.bSorted || "ssp" === J(c) || N.bDeferRender) && Ze(c)
                        });
                    var n = r.children("caption")
                        , n = (c.caption && (n = 0 === n.length ? H("<caption/>").appendTo(r) : n).html(c.caption),
                            n.length && (n[0]._captionSide = n.css("caption-side"),
                                c.captionNode = n[0]),
                            0 === p.length && (p = H("<thead/>").appendTo(r)),
                            c.nTHead = p[0],
                            H("tr", p).addClass(d.thead.row),
                            r.children("tbody"))
                        , n = (0 === n.length && (n = H("<tbody/>").insertAfter(p)),
                            c.nTBody = n[0],
                            r.children("tfoot"))
                        , O = (0 === n.length && (n = H("<tfoot/>").appendTo(r)),
                            c.nTFoot = n[0],
                            H("tr", n).addClass(d.tfoot.row),
                            c.aiDisplay = c.aiDisplayMaster.slice(),
                            c.bInitialised = !0,
                            c.oLanguage);
                    H.extend(!0, O, e.oLanguage),
                        O.sUrl ? H.ajax({
                            dataType: "json",
                            url: O.sUrl,
                            success: function (e) {
                                q(a.oLanguage, e),
                                    H.extend(!0, O, e, c.oInit.oLanguage),
                                    G(c, null, "i18n", [c], !0),
                                    Me(c)
                            },
                            error: function () {
                                $(c, 0, "i18n file loading error", 21),
                                    Me(c)
                            }
                        }) : (G(c, null, "i18n", [c]),
                            Me(c))
                }
            }),
            E = null,
            this)
    }, g = (V.ext = C = {
        buttons: {},
        classes: {},
        builder: "-source-",
        errMode: "alert",
        feature: [],
        features: {},
        search: [],
        selector: {
            cell: [],
            column: [],
            row: []
        },
        legacy: {
            ajax: null
        },
        pager: {},
        renderer: {
            pageButton: {},
            header: {}
        },
        order: {},
        type: {
            className: {},
            detect: [],
            render: {},
            search: {},
            order: {}
        },
        _unique: 0,
        fnVersionCheck: V.fnVersionCheck,
        iApiIndex: 0,
        sVersion: V.version
    },
        H.extend(C, {
            afnFiltering: C.search,
            aTypes: C.type.detect,
            ofnSearch: C.type.search,
            oSort: C.type.order,
            afnSortData: C.order,
            aoFeatures: C.feature,
            oStdClasses: C.classes,
            oPagination: C.pager
        }),
        H.extend(V.ext.classes, {
            container: "dt-container",
            empty: {
                row: "dt-empty"
            },
            info: {
                container: "dt-info"
            },
            layout: {
                row: "dt-layout-row",
                cell: "dt-layout-cell",
                tableRow: "dt-layout-table",
                tableCell: "",
                start: "dt-layout-start",
                end: "dt-layout-end",
                full: "dt-layout-full"
            },
            length: {
                container: "dt-length",
                select: "dt-input"
            },
            order: {
                canAsc: "dt-orderable-asc",
                canDesc: "dt-orderable-desc",
                isAsc: "dt-ordering-asc",
                isDesc: "dt-ordering-desc",
                none: "dt-orderable-none",
                position: "sorting_"
            },
            processing: {
                container: "dt-processing"
            },
            scrolling: {
                body: "dt-scroll-body",
                container: "dt-scroll",
                footer: {
                    self: "dt-scroll-foot",
                    inner: "dt-scroll-footInner"
                },
                header: {
                    self: "dt-scroll-head",
                    inner: "dt-scroll-headInner"
                }
            },
            search: {
                container: "dt-search",
                input: "dt-input"
            },
            table: "dataTable",
            tbody: {
                cell: "",
                row: ""
            },
            thead: {
                cell: "",
                row: ""
            },
            tfoot: {
                cell: "",
                row: ""
            },
            paging: {
                active: "current",
                button: "dt-paging-button",
                container: "dt-paging",
                disabled: "disabled"
            }
        }),
        {}), F = /[\r\n\u2028]/g, N = /<([^>]*>)/g, j = Math.pow(2, 28), R = /^\d{2,4}[./-]\d{1,2}[./-]\d{1,2}([T ]{1}\d{1,2}[:.]\d{2}([.:]\d{2})?)?$/, O = new RegExp("(\\" + ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^", "-"].join("|\\") + ")", "g"), P = /['\u00A0,$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfkɃΞ]/gi, T = function (e) {
            return !e || !0 === e || "-" === e
        }, E = function (e, t) {
            return g[t] || (g[t] = new RegExp(Pe(t), "g")),
                "string" == typeof e && "." !== t ? e.replace(/\./g, "").replace(g[t], ".") : e
        }, m = function (e, t, n) {
            var a = []
                , r = 0
                , o = e.length;
            if (void 0 !== n)
                for (; r < o; r++)
                    e[r] && e[r][t] && a.push(e[r][t][n]);
            else
                for (; r < o; r++)
                    e[r] && a.push(e[r][t]);
            return a
        }, L = function (e) {
            if (!e || "string" != typeof e)
                return e;
            if (e.length > j)
                throw new Error("Exceeded max str len");
            var t;
            for (e = e.replace(N, ""); (e = (t = e).replace(/<script/i, "")) !== t;)
                ;
            return t
        }, u = function (e) {
            return "string" == typeof (e = Array.isArray(e) ? e.join(",") : e) ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;") : e
        }, k = function (e, t) {
            var n;
            return "string" != typeof e ? e : (n = e.normalize("NFD")).length !== e.length ? (!0 === t ? e + " " : "") + n.replace(/[\u0300-\u036f]/g, "") : n
        }, x = function (e) {
            if (Array.from && Set)
                return Array.from(new Set(e));
            if (function (e) {
                if (!(e.length < 2))
                    for (var t = e.slice().sort(), n = t[0], a = 1, r = t.length; a < r; a++) {
                        if (t[a] === n)
                            return !1;
                        n = t[a]
                    }
                return !0
            }(e))
                return e.slice();
            var t, n, a, r = [], o = e.length, i = 0;
            e: for (n = 0; n < o; n++) {
                for (t = e[n],
                    a = 0; a < i; a++)
                    if (r[a] === t)
                        continue e;
                r.push(t),
                    i++
            }
            return r
        }, M = function (e, t) {
            if (Array.isArray(t))
                for (var n = 0; n < t.length; n++)
                    M(e, t[n]);
            else
                e.push(t);
            return e
        };
    function y(t, e) {
        e && e.split(" ").forEach(function (e) {
            e && t.classList.add(e)
        })
    }
    function Z(t) {
        var n, a, r = {};
        H.each(t, function (e) {
            (n = e.match(/^([^A-Z]+?)([A-Z])/)) && -1 !== "a aa ai ao as b fn i m o s ".indexOf(n[1] + " ") && (a = e.replace(n[0], n[2].toLowerCase()),
                r[a] = e,
                "o" === n[1]) && Z(t[e])
        }),
            t._hungarianMap = r
    }
    function q(t, n, a) {
        var r;
        t._hungarianMap || Z(t),
            H.each(n, function (e) {
                void 0 === (r = t._hungarianMap[e]) || !a && void 0 !== n[r] || ("o" === r.charAt(0) ? (n[r] || (n[r] = {}),
                    H.extend(!0, n[r], n[e]),
                    q(t[r], n[r], a)) : n[r] = n[e])
            })
    }
    V.util = {
        diacritics: function (e, t) {
            if ("function" != typeof e)
                return k(e, t);
            k = e
        },
        debounce: function (n, a) {
            var r;
            return function () {
                var e = this
                    , t = arguments;
                clearTimeout(r),
                    r = setTimeout(function () {
                        n.apply(e, t)
                    }, a || 250)
            }
        },
        throttle: function (a, e) {
            var r, o, i = void 0 !== e ? e : 200;
            return function () {
                var e = this
                    , t = +new Date
                    , n = arguments;
                r && t < r + i ? (clearTimeout(o),
                    o = setTimeout(function () {
                        r = void 0,
                            a.apply(e, n)
                    }, i)) : (r = t,
                        a.apply(e, n))
            }
        },
        escapeRegex: function (e) {
            return e.replace(O, "\\$1")
        },
        set: function (a) {
            var f;
            return H.isPlainObject(a) ? V.util.set(a._) : null === a ? function () { }
                : "function" == typeof a ? function (e, t, n) {
                    a(e, "set", t, n)
                }
                    : "string" != typeof a || -1 === a.indexOf(".") && -1 === a.indexOf("[") && -1 === a.indexOf("(") ? function (e, t) {
                        e[a] = t
                    }
                        : (f = function (e, t, n) {
                            for (var a, r, o, i, l = ge(n), n = l[l.length - 1], s = 0, u = l.length - 1; s < u; s++) {
                                if ("__proto__" === l[s] || "constructor" === l[s])
                                    throw new Error("Cannot set prototype values");
                                if (a = l[s].match(pe),
                                    r = l[s].match(p),
                                    a) {
                                    if (l[s] = l[s].replace(pe, ""),
                                        e[l[s]] = [],
                                        (a = l.slice()).splice(0, s + 1),
                                        i = a.join("."),
                                        Array.isArray(t))
                                        for (var c = 0, d = t.length; c < d; c++)
                                            f(o = {}, t[c], i),
                                                e[l[s]].push(o);
                                    else
                                        e[l[s]] = t;
                                    return
                                }
                                r && (l[s] = l[s].replace(p, ""),
                                    e = e[l[s]](t)),
                                    null !== e[l[s]] && void 0 !== e[l[s]] || (e[l[s]] = {}),
                                    e = e[l[s]]
                            }
                            n.match(p) ? e[n.replace(p, "")](t) : e[n.replace(pe, "")] = t
                        }
                            ,
                            function (e, t) {
                                return f(e, t, a)
                            }
                        )
        },
        get: function (r) {
            var o, f;
            return H.isPlainObject(r) ? (o = {},
                H.each(r, function (e, t) {
                    t && (o[e] = V.util.get(t))
                }),
                function (e, t, n, a) {
                    var r = o[t] || o._;
                    return void 0 !== r ? r(e, t, n, a) : e
                }
            ) : null === r ? function (e) {
                return e
            }
                : "function" == typeof r ? function (e, t, n, a) {
                    return r(e, t, n, a)
                }
                    : "string" != typeof r || -1 === r.indexOf(".") && -1 === r.indexOf("[") && -1 === r.indexOf("(") ? function (e) {
                        return e[r]
                    }
                        : (f = function (e, t, n) {
                            var a, r, o;
                            if ("" !== n)
                                for (var i = ge(n), l = 0, s = i.length; l < s; l++) {
                                    if (d = i[l].match(pe),
                                        a = i[l].match(p),
                                        d) {
                                        if (i[l] = i[l].replace(pe, ""),
                                            "" !== i[l] && (e = e[i[l]]),
                                            r = [],
                                            i.splice(0, l + 1),
                                            o = i.join("."),
                                            Array.isArray(e))
                                            for (var u = 0, c = e.length; u < c; u++)
                                                r.push(f(e[u], t, o));
                                        var d = d[0].substring(1, d[0].length - 1);
                                        e = "" === d ? r : r.join(d);
                                        break
                                    }
                                    if (a)
                                        i[l] = i[l].replace(p, ""),
                                            e = e[i[l]]();
                                    else {
                                        if (null === e || null === e[i[l]])
                                            return null;
                                        if (void 0 === e || void 0 === e[i[l]])
                                            return;
                                        e = e[i[l]]
                                    }
                                }
                            return e
                        }
                            ,
                            function (e, t) {
                                return f(e, t, r)
                            }
                        )
        },
        stripHtml: function (e) {
            var t = typeof e;
            if ("function" != t)
                return "string" == t ? L(e) : e;
            L = e
        },
        escapeHtml: function (e) {
            var t = typeof e;
            if ("function" != t)
                return "string" == t || Array.isArray(e) ? u(e) : e;
            u = e
        },
        unique: x
    };
    var r = function (e, t, n) {
        void 0 !== e[t] && (e[n] = e[t])
    };
    function Q(e) {
        r(e, "ordering", "bSort"),
            r(e, "orderMulti", "bSortMulti"),
            r(e, "orderClasses", "bSortClasses"),
            r(e, "orderCellsTop", "bSortCellsTop"),
            r(e, "order", "aaSorting"),
            r(e, "orderFixed", "aaSortingFixed"),
            r(e, "paging", "bPaginate"),
            r(e, "pagingType", "sPaginationType"),
            r(e, "pageLength", "iDisplayLength"),
            r(e, "searching", "bFilter"),
            "boolean" == typeof e.sScrollX && (e.sScrollX = e.sScrollX ? "100%" : ""),
            "boolean" == typeof e.scrollX && (e.scrollX = e.scrollX ? "100%" : "");
        var t = e.aoSearchCols;
        if (t)
            for (var n = 0, a = t.length; n < a; n++)
                t[n] && q(V.models.oSearch, t[n]);
        e.serverSide && !e.searchDelay && (e.searchDelay = 400)
    }
    function K(e) {
        r(e, "orderable", "bSortable"),
            r(e, "orderData", "aDataSort"),
            r(e, "orderSequence", "asSorting"),
            r(e, "orderDataType", "sortDataType");
        var t = e.aDataSort;
        "number" != typeof t || Array.isArray(t) || (e.aDataSort = [t])
    }
    function ee(e) {
        var t = V.defaults.column
            , n = e.aoColumns.length
            , t = H.extend({}, V.models.oColumn, t, {
                aDataSort: t.aDataSort || [n],
                mData: t.mData || n,
                idx: n,
                searchFixed: {},
                colEl: H("<col>").attr("data-dt-column", n)
            })
            , t = (e.aoColumns.push(t),
                e.aoPreSearchCols);
        t[n] = H.extend({}, V.models.oSearch, t[n])
    }
    function te(e, t, n) {
        function a(e) {
            return "string" == typeof e && -1 !== e.indexOf("@")
        }
        var r = e.aoColumns[t]
            , o = (null != n && (K(n),
                q(V.defaults.column, n, !0),
                void 0 === n.mDataProp || n.mData || (n.mData = n.mDataProp),
                n.sType && (r._sManualType = n.sType),
                n.className && !n.sClass && (n.sClass = n.className),
                t = r.sClass,
                H.extend(r, n),
                z(r, n, "sWidth", "sWidthOrig"),
                t !== r.sClass && (r.sClass = t + " " + r.sClass),
                void 0 !== n.iDataSort && (r.aDataSort = [n.iDataSort]),
                z(r, n, "aDataSort")),
                r.mData)
            , i = U(o);
        r.mRender && Array.isArray(r.mRender) && (n = (t = r.mRender.slice()).shift(),
            r.mRender = V.render[n].apply(W, t)),
            r._render = r.mRender ? U(r.mRender) : null;
        r._bAttrSrc = H.isPlainObject(o) && (a(o.sort) || a(o.type) || a(o.filter)),
            r._setter = null,
            r.fnGetData = function (e, t, n) {
                var a = i(e, t, void 0, n);
                return r._render && t ? r._render(a, t, e, n) : a
            }
            ,
            r.fnSetData = function (e, t, n) {
                return v(o)(e, t, n)
            }
            ,
            "number" == typeof o || r._isArrayHost || (e._rowReadObject = !0),
            e.oFeatures.bSort || (r.bSortable = !1)
    }
    function ne(e) {
        var t = e;
        if (t.oFeatures.bAutoWidth) {
            var n, a, r = t.nTable, o = t.aoColumns, i = t.oScroll, l = i.sY, s = i.sX, i = i.sXInner, u = ie(t, "bVisible"), c = r.getAttribute("width"), d = r.parentNode, f = r.style.width, f = (f || c || (r.style.width = "100%",
                f = "100%"),
                f && -1 !== f.indexOf("%") && (c = f),
                G(t, null, "column-calc", {
                    visible: u
                }, !1),
                H(r.cloneNode()).css("visibility", "hidden").removeAttr("id")), h = (f.append("<tbody>"),
                    H("<tr/>").appendTo(f.find("tbody")));
            for (f.append(H(t.nTHead).clone()).append(H(t.nTFoot).clone()),
                f.find("tfoot th, tfoot td").css("width", ""),
                f.find("thead th, thead td").each(function () {
                    var e = ce(t, this, !0, !1);
                    e ? (this.style.width = e,
                        s && H(this).append(H("<div/>").css({
                            width: e,
                            margin: 0,
                            padding: 0,
                            border: 0,
                            height: 1
                        }))) : this.style.width = ""
                }),
                n = 0; n < u.length; n++) {
                p = u[n],
                    a = o[p];
                var p = function (e, t) {
                    var n = e.aoColumns[t];
                    if (!n.maxLenString) {
                        for (var a, r = "", o = -1, i = 0, l = e.aiDisplayMaster.length; i < l; i++) {
                            var s = e.aiDisplayMaster[i]
                                , s = De(e, s)[t]
                                , s = s && "object" == typeof s && s.nodeType ? s.innerHTML : s + "";
                            s = s.replace(/id=".*?"/g, "").replace(/name=".*?"/g, ""),
                                (a = L(s).replace(/&nbsp;/g, " ")).length > o && (r = s,
                                    o = a.length)
                        }
                        n.maxLenString = r
                    }
                    return n.maxLenString
                }(t, p)
                    , g = C.type.className[a.sType]
                    , v = p + a.sContentPadding
                    , p = -1 === p.indexOf("<") ? _.createTextNode(v) : v;
                H("<td/>").addClass(g).addClass(a.sClass).append(p).appendTo(h)
            }
            H("[name]", f).removeAttr("name");
            var m = H("<div/>").css(s || l ? {
                position: "absolute",
                top: 0,
                left: 0,
                height: 1,
                right: 0,
                overflow: "hidden"
            } : {}).append(f).appendTo(d)
                , b = (s && i ? f.width(i) : s ? (f.css("width", "auto"),
                    f.removeAttr("width"),
                    f.width() < d.clientWidth && c && f.width(d.clientWidth)) : l ? f.width(d.clientWidth) : c && f.width(c),
                    0)
                , y = f.find("tbody tr").eq(0).children();
            for (n = 0; n < u.length; n++) {
                var D = y[n].getBoundingClientRect().width;
                b += D,
                    o[u[n]].sWidth = I(D)
            }
            r.style.width = I(b),
                m.remove(),
                c && (r.style.width = I(c)),
                !c && !s || t._reszEvt || (H(W).on("resize.DT-" + t.sInstance, V.util.throttle(function () {
                    t.bDestroying || ne(t)
                })),
                    t._reszEvt = !0)
        }
        for (var x = e, S = x.aoColumns, w = 0; w < S.length; w++) {
            var T = ce(x, [w], !1, !1);
            S[w].colEl.css("width", T)
        }
        i = e.oScroll;
        "" === i.sY && "" === i.sX || Be(e),
            G(e, null, "column-sizing", [e])
    }
    function ae(e, t) {
        e = ie(e, "bVisible");
        return "number" == typeof e[t] ? e[t] : null
    }
    function re(e, t) {
        e = ie(e, "bVisible").indexOf(t);
        return -1 !== e ? e : null
    }
    function oe(e) {
        var t = e.aoHeader
            , n = e.aoColumns
            , a = 0;
        if (t.length)
            for (var r = 0, o = t[0].length; r < o; r++)
                n[r].bVisible && "none" !== H(t[0][r].cell).css("display") && a++;
        return a
    }
    function ie(e, n) {
        var a = [];
        return e.aoColumns.map(function (e, t) {
            e[n] && a.push(t)
        }),
            a
    }
    function le(e, t) {
        return !0 === t ? e.name : t
    }
    function se(e) {
        var t, n, a, r, o, i, l, s, u = e.aoColumns, c = e.aoData, d = V.ext.type.detect;
        if ("ssp" !== J(e))
            for (t = 0,
                n = u.length; t < n; t++) {
                if (s = [],
                    !(l = u[t]).sType && l._sManualType)
                    l.sType = l._sManualType;
                else if (!l.sType) {
                    for (a = 0,
                        r = d.length; a < r; a++) {
                        var f = d[a]
                            , h = f.oneOf
                            , p = f.allOf || f
                            , g = f.init
                            , v = !1
                            , m = null;
                        if (g && (m = le(f, g(e, l, t)))) {
                            l.sType = m;
                            break
                        }
                        for (o = 0,
                            i = c.length; o < i; o++)
                            if (c[o]) {
                                if (void 0 === s[o] && (s[o] = B(e, o, t, "type")),
                                    h && !v && (v = le(f, h(s[o], e))),
                                    !(m = le(f, p(s[o], e))) && a !== d.length - 3)
                                    break;
                                if ("html" === m && !T(s[o]))
                                    break
                            }
                        if (h && v && m || !h && m) {
                            l.sType = m;
                            break
                        }
                    }
                    l.sType || (l.sType = "string")
                }
                var b = C.type.className[l.sType]
                    , b = (b && (ue(e.aoHeader, t, b),
                        ue(e.aoFooter, t, b)),
                        C.type.render[l.sType]);
                if (b && !l._render) {
                    l._render = V.util.get(b),
                        y = w = S = x = D = void 0;
                    for (var y, D = e, x = t, S = D.aoData, w = 0; w < S.length; w++)
                        S[w].nTr && (y = B(D, w, x, "display"),
                            S[w].displayData[x] = y,
                            he(S[w].anCells[x], y))
                }
            }
    }
    function ue(e, t, n) {
        e.forEach(function (e) {
            e[t] && e[t].unique && y(e[t].cell, n)
        })
    }
    function ce(e, t, n, a) {
        Array.isArray(t) || (t = de(t));
        for (var r, o = 0, i = e.aoColumns, l = 0, s = t.length; l < s; l++) {
            var u = i[t[l]]
                , c = n ? u.sWidthOrig : u.sWidth;
            if (a || !1 !== u.bVisible) {
                if (null == c)
                    return null;
                "number" == typeof c ? (r = "px",
                    o += c) : (u = c.match(/([\d\.]+)([^\d]*)/)) && (o += +u[1],
                        r = 3 === u.length ? u[2] : "px")
            }
        }
        return o + r
    }
    function de(e) {
        e = H(e).closest("[data-dt-column]").attr("data-dt-column");
        return e ? e.split(",").map(function (e) {
            return +e
        }) : []
    }
    function D(e, t, n, a) {
        for (var r = e.aoData.length, o = H.extend(!0, {}, V.models.oRow, {
            src: n ? "dom" : "data",
            idx: r
        }), i = (o._aData = t,
            e.aoData.push(o),
            e.aoColumns), l = 0, s = i.length; l < s; l++)
            i[l].sType = null;
        e.aiDisplayMaster.push(r);
        t = e.rowIdFn(t);
        return void 0 !== t && (e.aIds[t] = o),
            !n && e.oFeatures.bDeferRender || xe(e, r, n, a),
            r
    }
    function fe(n, e) {
        var a;
        return (e = e instanceof H ? e : H(e)).map(function (e, t) {
            return a = ye(n, t),
                D(n, a.data, t, a.cells)
        })
    }
    function B(e, t, n, a) {
        "search" === a ? a = "filter" : "order" === a && (a = "sort");
        var r = e.aoData[t];
        if (r) {
            var o = e.iDraw
                , i = e.aoColumns[n]
                , r = r._aData
                , l = i.sDefaultContent
                , s = i.fnGetData(r, a, {
                    settings: e,
                    row: t,
                    col: n
                });
            if (void 0 === (s = "display" !== a && s && "object" == typeof s && s.nodeName ? s.innerHTML : s))
                return e.iDrawError != o && null === l && ($(e, 0, "Requested unknown parameter " + ("function" == typeof i.mData ? "{function}" : "'" + i.mData + "'") + " for row " + t + ", column " + n, 4),
                    e.iDrawError = o),
                    l;
            if (s !== r && null !== s || null === l || void 0 === a) {
                if ("function" == typeof s)
                    return s.call(r)
            } else
                s = l;
            return null === s && "display" === a ? "" : s = "filter" === a && (t = V.ext.type.search)[i.sType] ? t[i.sType](s) : s
        }
    }
    function he(e, t) {
        t && "object" == typeof t && t.nodeName ? H(e).empty().append(t) : e.innerHTML = t
    }
    var pe = /\[.*?\]$/
        , p = /\(\)$/;
    function ge(e) {
        return (e.match(/(\\.|[^.])+/g) || [""]).map(function (e) {
            return e.replace(/\\\./g, ".")
        })
    }
    var U = V.util.get
        , v = V.util.set;
    function ve(e) {
        return m(e.aoData, "_aData")
    }
    function me(e) {
        e.aoData.length = 0,
            e.aiDisplayMaster.length = 0,
            e.aiDisplay.length = 0,
            e.aIds = {}
    }
    function be(e, t, n, a) {
        var r, o, i = e.aoData[t];
        if (i._aSortData = null,
            i._aFilterData = null,
            i.displayData = null,
            "dom" !== n && (n && "auto" !== n || "dom" !== i.src)) {
            var l = i.anCells
                , s = De(e, t);
            if (l)
                if (void 0 !== a)
                    he(l[a], s[a]);
                else
                    for (r = 0,
                        o = l.length; r < o; r++)
                        he(l[r], s[r])
        } else
            i._aData = ye(e, i, a, void 0 === a ? void 0 : i._aData).data;
        var u = e.aoColumns;
        if (void 0 !== a)
            u[a].sType = null,
                u[a].maxLenString = null;
        else {
            for (r = 0,
                o = u.length; r < o; r++)
                u[r].sType = null,
                    u[r].maxLenString = null;
            Se(e, i)
        }
    }
    function ye(e, t, n, a) {
        function r(e, t) {
            var n;
            "string" == typeof e && -1 !== (n = e.indexOf("@")) && (n = e.substring(n + 1),
                v(e)(a, t.getAttribute(n)))
        }
        function o(e) {
            void 0 !== n && n !== d || (l = f[d],
                s = e.innerHTML.trim(),
                l && l._bAttrSrc ? (v(l.mData._)(a, s),
                    r(l.mData.sort, e),
                    r(l.mData.type, e),
                    r(l.mData.filter, e)) : h ? (l._setter || (l._setter = v(l.mData)),
                        l._setter(a, s)) : a[d] = s),
                d++
        }
        var i, l, s, u = [], c = t.firstChild, d = 0, f = e.aoColumns, h = e._rowReadObject;
        a = void 0 !== a ? a : h ? {} : [];
        if (c)
            for (; c;)
                "TD" != (i = c.nodeName.toUpperCase()) && "TH" != i || (o(c),
                    u.push(c)),
                    c = c.nextSibling;
        else
            for (var p = 0, g = (u = t.anCells).length; p < g; p++)
                o(u[p]);
        var t = t.firstChild ? t : t.nTr;
        return t && (t = t.getAttribute("id")) && v(e.rowId)(a, t),
        {
            data: a,
            cells: u
        }
    }
    function De(e, t) {
        var n = e.aoData[t]
            , a = e.aoColumns;
        if (!n.displayData) {
            n.displayData = [];
            for (var r = 0, o = a.length; r < o; r++)
                n.displayData.push(B(e, t, r, "display"))
        }
        return n.displayData
    }
    function xe(e, t, n, a) {
        var r, o, i, l, s, u, c = e.aoData[t], d = c._aData, f = [], h = e.oClasses.tbody.row;
        if (null === c.nTr) {
            for (r = n || _.createElement("tr"),
                c.nTr = r,
                c.anCells = f,
                y(r, h),
                r._DT_RowIndex = t,
                Se(e, c),
                l = 0,
                s = e.aoColumns.length; l < s; l++) {
                i = e.aoColumns[l],
                    (o = (u = !n || !a[l]) ? _.createElement(i.sCellType) : a[l]) || $(e, 0, "Incorrect column count", 18),
                    o._DT_CellIndex = {
                        row: t,
                        column: l
                    },
                    f.push(o);
                var p = De(e, t);
                !u && (!i.mRender && i.mData === l || H.isPlainObject(i.mData) && i.mData._ === l + ".display") || he(o, p[l]),
                    i.bVisible && u ? r.appendChild(o) : i.bVisible || u || o.parentNode.removeChild(o),
                    i.fnCreatedCell && i.fnCreatedCell.call(e.oInstance, o, B(e, t, l), d, t, l)
            }
            G(e, "aoRowCreatedCallback", "row-created", [r, d, t, f])
        } else
            y(c.nTr, h)
    }
    function Se(e, t) {
        var n = t.nTr
            , a = t._aData;
        n && ((e = e.rowIdFn(a)) && (n.id = e),
            a.DT_RowClass && (e = a.DT_RowClass.split(" "),
                t.__rowc = t.__rowc ? x(t.__rowc.concat(e)) : e,
                H(n).removeClass(t.__rowc.join(" ")).addClass(a.DT_RowClass)),
            a.DT_RowAttr && H(n).attr(a.DT_RowAttr),
            a.DT_RowData) && H(n).data(a.DT_RowData)
    }
    function we(e, t) {
        var n, a = e.oClasses, r = e.aoColumns, o = "header" === t ? e.nTHead : e.nTFoot, i = "header" === t ? "sTitle" : t;
        if (o) {
            if (("header" === t || m(e.aoColumns, i).join("")) && 1 === (n = (n = H("tr", o)).length ? n : H("<tr/>").appendTo(o)).length)
                for (var l = H("td, th", n).length, s = r.length; l < s; l++)
                    H("<th/>").html(r[l][i] || "").appendTo(n);
            var u = Ae(e, o, !0);
            "header" === t ? e.aoHeader = u : e.aoFooter = u,
                H(o).children("tr").attr("role", "row"),
                H(o).children("tr").children("th, td").each(function () {
                    at(e, t)(e, H(this), a)
                })
        }
    }
    function Te(e, t, n) {
        var a, r, o, i, l, s = [], u = [], c = e.aoColumns, e = c.length;
        if (t) {
            for (n = n || h(e).filter(function (e) {
                return c[e].bVisible
            }),
                a = 0; a < t.length; a++)
                s[a] = t[a].slice().filter(function (e, t) {
                    return n.includes(t)
                }),
                    u.push([]);
            for (a = 0; a < s.length; a++)
                for (r = 0; r < s[a].length; r++)
                    if (l = i = 1,
                        void 0 === u[a][r]) {
                        for (o = s[a][r].cell; void 0 !== s[a + i] && s[a][r].cell == s[a + i][r].cell;)
                            u[a + i][r] = null,
                                i++;
                        for (; void 0 !== s[a][r + l] && s[a][r].cell == s[a][r + l].cell;) {
                            for (var d = 0; d < i; d++)
                                u[a + d][r + l] = null;
                            l++
                        }
                        var f = H("span.dt-column-title", o);
                        u[a][r] = {
                            cell: o,
                            colspan: l,
                            rowspan: i,
                            title: (f.length ? f : H(o)).html()
                        }
                    }
            return u
        }
    }
    function _e(e, t) {
        for (var n, a, r = Te(e, t), o = 0; o < t.length; o++) {
            if (n = t[o].row)
                for (; a = n.firstChild;)
                    n.removeChild(a);
            for (var i = 0; i < r[o].length; i++) {
                var l = r[o][i];
                l && H(l.cell).appendTo(n).attr("rowspan", l.rowspan).attr("colspan", l.colspan)
            }
        }
    }
    function S(e, t) {
        if (r = "ssp" == J(s = e),
            void 0 !== (i = s.iInitDisplayStart) && -1 !== i && (s._iDisplayStart = !r && i >= s.fnRecordsDisplay() ? 0 : i,
                s.iInitDisplayStart = -1),
            -1 !== G(e, "aoPreDrawCallback", "preDraw", [e]).indexOf(!1))
            w(e, !1);
        else {
            var l, n = [], a = 0, r = "ssp" == J(e), o = e.aiDisplay, i = e._iDisplayStart, s = e.fnDisplayEnd(), u = e.aoColumns, c = H(e.nTBody);
            if (e.bDrawing = !0,
                e.deferLoading)
                e.deferLoading = !1,
                    e.iDraw++,
                    w(e, !1);
            else if (r) {
                if (!e.bDestroying && !t)
                    return 0 === e.iDraw && c.empty().append(Ce(e)),
                        (l = e).iDraw++,
                        w(l, !0),
                        void Fe(l, function (t) {
                            function n(e, t) {
                                return "function" == typeof a[e][t] ? "function" : a[e][t]
                            }
                            var a = t.aoColumns
                                , e = t.oFeatures
                                , r = t.oPreviousSearch
                                , o = t.aoPreSearchCols;
                            return {
                                draw: t.iDraw,
                                columns: a.map(function (t, e) {
                                    return {
                                        data: n(e, "mData"),
                                        name: t.sName,
                                        searchable: t.bSearchable,
                                        orderable: t.bSortable,
                                        search: {
                                            value: o[e].search,
                                            regex: o[e].regex,
                                            fixed: Object.keys(t.searchFixed).map(function (e) {
                                                return {
                                                    name: e,
                                                    term: t.searchFixed[e].toString()
                                                }
                                            })
                                        }
                                    }
                                }),
                                order: Ge(t).map(function (e) {
                                    return {
                                        column: e.col,
                                        dir: e.dir,
                                        name: n(e.col, "sName")
                                    }
                                }),
                                start: t._iDisplayStart,
                                length: e.bPaginate ? t._iDisplayLength : -1,
                                search: {
                                    value: r.search,
                                    regex: r.regex,
                                    fixed: Object.keys(t.searchFixed).map(function (e) {
                                        return {
                                            name: e,
                                            term: t.searchFixed[e].toString()
                                        }
                                    })
                                }
                            }
                        }(l), function (e) {
                            var t = l
                                , n = Ne(t, e = e)
                                , a = je(t, "draw", e)
                                , r = je(t, "recordsTotal", e)
                                , e = je(t, "recordsFiltered", e);
                            if (void 0 !== a) {
                                if (+a < t.iDraw)
                                    return;
                                t.iDraw = +a
                            }
                            n = n || [],
                                me(t),
                                t._iRecordsTotal = parseInt(r, 10),
                                t._iRecordsDisplay = parseInt(e, 10);
                            for (var o = 0, i = n.length; o < i; o++)
                                D(t, n[o]);
                            t.aiDisplay = t.aiDisplayMaster.slice(),
                                S(t, !0),
                                He(t),
                                w(t, !1)
                        })
            } else
                e.iDraw++;
            if (0 !== o.length)
                for (var d = r ? e.aoData.length : s, f = r ? 0 : i; f < d; f++) {
                    for (var h = o[f], p = e.aoData[h], g = (null === p.nTr && xe(e, h),
                        p.nTr), v = 0; v < u.length; v++) {
                        var m = u[v]
                            , b = p.anCells[v];
                        y(b, C.type.className[m.sType]),
                            y(b, m.sClass),
                            y(b, e.oClasses.tbody.cell)
                    }
                    G(e, "aoRowCallback", null, [g, p._aData, a, f, h]),
                        n.push(g),
                        a++
                }
            else
                n[0] = Ce(e);
            G(e, "aoHeaderCallback", "header", [H(e.nTHead).children("tr")[0], ve(e), i, s, o]),
                G(e, "aoFooterCallback", "footer", [H(e.nTFoot).children("tr")[0], ve(e), i, s, o]),
                c[0].replaceChildren ? c[0].replaceChildren.apply(c[0], n) : (c.children().detach(),
                    c.append(H(n))),
                H(e.nTableWrapper).toggleClass("dt-empty-footer", 0 === H("tr", e.nTFoot).length),
                G(e, "aoDrawCallback", "draw", [e], !0),
                e.bSorted = !1,
                e.bFiltered = !1,
                e.bDrawing = !1
        }
    }
    function d(e, t, n) {
        var a = e.oFeatures
            , r = a.bSort
            , a = a.bFilter;
        void 0 !== n && !0 !== n || (se(e),
            r && Je(e),
            a ? Re(e, e.oPreviousSearch) : e.aiDisplay = e.aiDisplayMaster.slice()),
            !0 !== t && (e._iDisplayStart = 0),
            e._drawHold = t,
            S(e),
            e._drawHold = !1
    }
    function Ce(e) {
        var t = e.oLanguage
            , n = t.sZeroRecords
            , a = J(e);
        return e.iDraw < 1 && "ssp" === a || e.iDraw <= 1 && "ajax" === a ? n = t.sLoadingRecords : t.sEmptyTable && 0 === e.fnRecordsTotal() && (n = t.sEmptyTable),
            H("<tr/>").append(H("<td />", {
                colSpan: oe(e),
                class: e.oClasses.empty.row
            }).html(n))[0]
    }
    function Le(e, t, r) {
        var o = [];
        H.each(t, function (e, t) {
            var n, a;
            null !== t && (n = (e = e.match(/^([a-z]+)([0-9]*)([A-Za-z]*)$/))[2] ? +e[2] : 0,
                a = e[3] ? e[3].toLowerCase() : "full",
                e[1] === r) && function e(t, n, a) {
                    if (Array.isArray(a))
                        for (var r = 0; r < a.length; r++)
                            e(t, n, a[r]);
                    else {
                        var o = t[n];
                        H.isPlainObject(a) ? a.features ? (a.rowId && (t.id = a.rowId),
                            a.rowClass && (t.className = a.rowClass),
                            o.id = a.id,
                            o.className = a.className,
                            e(t, n, a.features)) : Object.keys(a).map(function (e) {
                                o.contents.push({
                                    feature: e,
                                    opts: a[e]
                                })
                            }) : o.contents.push(a)
                    }
                }(function (e, t, n) {
                    for (var a, r = 0; r < e.length; r++)
                        if ((a = e[r]).rowNum === t && ("full" === n && a.full || ("start" === n || "end" === n) && (a.start || a.end)))
                            return a[n] || (a[n] = {
                                contents: []
                            }),
                                a;
                    return (a = {
                        rowNum: t
                    })[n] = {
                        contents: []
                    },
                        e.push(a),
                        a
                }(o, n, a), a, t)
        }),
            o.sort(function (e, t) {
                var n = e.rowNum
                    , a = t.rowNum;
                return n === a ? (e = e.full && !t.full ? -1 : 1,
                    "bottom" === r ? -1 * e : e) : a - n
            }),
            "bottom" === r && o.reverse();
        for (var n = 0; n < o.length; n++)
            delete o[n].rowNum,
                !function (o, i) {
                    function l(e, t) {
                        return C.features[e] || $(o, 0, "Unknown feature: " + e),
                            C.features[e].apply(this, [o, t])
                    }
                    function e(e) {
                        if (i[e])
                            for (var t, n = i[e].contents, a = 0, r = n.length; a < r; a++)
                                n[a] && ("string" == typeof n[a] ? n[a] = l(n[a], null) : H.isPlainObject(n[a]) ? n[a] = l(n[a].feature, n[a].opts) : "function" == typeof n[a].node ? n[a] = n[a].node(o) : "function" == typeof n[a] && (t = n[a](o),
                                    n[a] = "function" == typeof t.node ? t.node() : t))
                    }
                    e("start"),
                        e("end"),
                        e("full")
                }(e, o[n]);
        return o
    }
    function Ie(t) {
        var a, e = t.oClasses, n = H(t.nTable), r = H("<div/>").attr({
            id: t.sTableId + "_wrapper",
            class: e.container
        }).insertBefore(n);
        if (t.nTableWrapper = r[0],
            t.sDom)
            for (var o, i, l, s, u, c, d = t, e = t.sDom, f = r, h = e.match(/(".*?")|('.*?')|./g), p = 0; p < h.length; p++)
                o = null,
                    "<" == (i = h[p]) ? (l = H("<div/>"),
                        "'" != (s = h[p + 1])[0] && '"' != s[0] || (s = s.replace(/['"]/g, ""),
                            u = "",
                            -1 != s.indexOf(".") ? (c = s.split("."),
                                u = c[0],
                                c = c[1]) : "#" == s[0] ? u = s : c = s,
                            l.attr("id", u.substring(1)).addClass(c),
                            p++),
                        f.append(l),
                        f = l) : ">" == i ? f = f.parent() : "t" == i ? o = qe(d) : V.ext.feature.forEach(function (e) {
                            i == e.cFeature && (o = e.fnInit(d))
                        }),
                    o && f.append(o);
        else {
            var n = Le(t, t.layout, "top")
                , e = Le(t, t.layout, "bottom")
                , g = at(t, "layout");
            n.forEach(function (e) {
                g(t, r, e)
            }),
                g(t, r, {
                    full: {
                        table: !0,
                        contents: [qe(t)]
                    }
                }),
                e.forEach(function (e) {
                    g(t, r, e)
                })
        }
        var n = t
            , e = n.nTable
            , v = "" !== n.oScroll.sX || "" !== n.oScroll.sY;
        n.oFeatures.bProcessing && (a = H("<div/>", {
            id: n.sTableId + "_processing",
            class: n.oClasses.processing.container,
            role: "status"
        }).html(n.oLanguage.sProcessing).append("<div><div></div><div></div><div></div><div></div></div>"),
            v ? a.prependTo(H("div.dt-scroll", n.nTableWrapper)) : a.insertBefore(e),
            H(e).on("processing.dt.DT", function (e, t, n) {
                a.css("display", n ? "block" : "none")
            }))
    }
    function Ae(e, t, n) {
        for (var a, r, o, i, l, s, u = e.aoColumns, c = H(t).children("tr"), d = t && "thead" === t.nodeName.toLowerCase(), f = [], h = 0, p = c.length; h < p; h++)
            f.push([]);
        for (h = 0,
            p = c.length; h < p; h++)
            for (r = (a = c[h]).firstChild; r;) {
                if ("TD" == r.nodeName.toUpperCase() || "TH" == r.nodeName.toUpperCase()) {
                    var g, v, m, b, y, D = [];
                    for (b = (b = +r.getAttribute("colspan")) && 0 != b && 1 != b ? b : 1,
                        y = (y = +r.getAttribute("rowspan")) && 0 != y && 1 != y ? y : 1,
                        l = function (e, t, n) {
                            for (var a = e[t]; a[n];)
                                n++;
                            return n
                        }(f, h, 0),
                        s = 1 == b,
                        n && (s && (te(e, l, H(r).data()),
                            g = u[l],
                            v = r.getAttribute("width") || null,
                            (m = r.style.width.match(/width:\s*(\d+[pxem%]+)/)) && (v = m[1]),
                            g.sWidthOrig = g.sWidth || v,
                            d ? (null === g.sTitle || g.autoTitle || (r.innerHTML = g.sTitle),
                                !g.sTitle && s && (g.sTitle = L(r.innerHTML),
                                    g.autoTitle = !0)) : g.footer && (r.innerHTML = g.footer),
                            g.ariaTitle || (g.ariaTitle = H(r).attr("aria-label") || g.sTitle),
                            g.className) && H(r).addClass(g.className),
                            0 === H("span.dt-column-title", r).length && H("<span>").addClass("dt-column-title").append(r.childNodes).appendTo(r),
                            d) && 0 === H("span.dt-column-order", r).length && H("<span>").addClass("dt-column-order").appendTo(r),
                        i = 0; i < b; i++) {
                        for (o = 0; o < y; o++)
                            f[h + o][l + i] = {
                                cell: r,
                                unique: s
                            },
                                f[h + o].row = a;
                        D.push(l + i)
                    }
                    r.setAttribute("data-dt-column", x(D).join(","))
                }
                r = r.nextSibling
            }
        return f
    }
    function Fe(n, e, a) {
        function t(e) {
            var t = n.jqXHR ? n.jqXHR.status : null;
            if ((null === e || "number" == typeof t && 204 == t) && Ne(n, e = {}, []),
                (t = e.error || e.sError) && $(n, 0, t),
                e.d && "string" == typeof e.d)
                try {
                    e = JSON.parse(e.d)
                } catch (e) { }
            n.json = e,
                G(n, null, "xhr", [n, e, n.jqXHR], !0),
                a(e)
        }
        var r, o = n.ajax, i = n.oInstance, l = (H.isPlainObject(o) && o.data && (l = "function" == typeof (r = o.data) ? r(e, n) : r,
            e = "function" == typeof r && l ? l : H.extend(!0, e, l),
            delete o.data),
        {
            url: "string" == typeof o ? o : "",
            data: e,
            success: t,
            dataType: "json",
            cache: !1,
            type: n.sServerMethod,
            error: function (e, t) {
                -1 === G(n, null, "xhr", [n, null, n.jqXHR], !0).indexOf(!0) && ("parsererror" == t ? $(n, 0, "Invalid JSON response", 1) : 4 === e.readyState && $(n, 0, "Ajax error", 7)),
                    w(n, !1)
            }
        });
        H.isPlainObject(o) && H.extend(l, o),
            n.oAjaxData = e,
            G(n, null, "preXhr", [n, e, l], !0),
            "function" == typeof o ? n.jqXHR = o.call(i, e, t, n) : "" === o.url ? (i = {},
                V.util.set(o.dataSrc)(i, []),
                t(i)) : n.jqXHR = H.ajax(l),
            r && (o.data = r)
    }
    function Ne(e, t, n) {
        var a = "data";
        if (H.isPlainObject(e.ajax) && void 0 !== e.ajax.dataSrc && ("string" == typeof (e = e.ajax.dataSrc) || "function" == typeof e ? a = e : void 0 !== e.data && (a = e.data)),
            !n)
            return "data" === a ? t.aaData || t[a] : "" !== a ? U(a)(t) : t;
        v(a)(t, n)
    }
    function je(e, t, n) {
        var e = H.isPlainObject(e.ajax) ? e.ajax.dataSrc : null;
        return e && e[t] ? U(e[t])(n) : (e = "",
            "draw" === t ? e = "sEcho" : "recordsTotal" === t ? e = "iTotalRecords" : "recordsFiltered" === t && (e = "iTotalDisplayRecords"),
            void 0 !== n[e] ? n[e] : n[t])
    }
    function Re(n, e) {
        var t = n.aoPreSearchCols;
        if ("ssp" != J(n)) {
            for (var a, r, o, i, l, s = n, u = s.aoColumns, c = s.aoData, d = 0; d < c.length; d++)
                if (c[d] && !(l = c[d])._aFilterData) {
                    for (o = [],
                        a = 0,
                        r = u.length; a < r; a++)
                        u[a].bSearchable ? "string" != typeof (i = null === (i = B(s, d, a, "filter")) ? "" : i) && i.toString && (i = i.toString()) : i = "",
                            i.indexOf && -1 !== i.indexOf("&") && (Ee.innerHTML = i,
                                i = ke ? Ee.textContent : Ee.innerText),
                            i.replace && (i = i.replace(/[\r\n\u2028]/g, "")),
                            o.push(i);
                    l._aFilterData = o,
                        l._sFilterRow = o.join("  "),
                        0
                }
            n.aiDisplay = n.aiDisplayMaster.slice(),
                Oe(n.aiDisplay, n, e.search, e),
                H.each(n.searchFixed, function (e, t) {
                    Oe(n.aiDisplay, n, t, {})
                });
            for (var f = 0; f < t.length; f++) {
                var h = t[f];
                Oe(n.aiDisplay, n, h.search, h, f),
                    H.each(n.aoColumns[f].searchFixed, function (e, t) {
                        Oe(n.aiDisplay, n, t, {}, f)
                    })
            }
            for (var p, g, v = n, m = V.ext.search, b = v.aiDisplay, y = 0, D = m.length; y < D; y++) {
                for (var x = [], S = 0, w = b.length; S < w; S++)
                    g = b[S],
                        p = v.aoData[g],
                        m[y](v, p._aFilterData, g, p._aData, S) && x.push(g);
                b.length = 0,
                    b.push.apply(b, x)
            }
        }
        n.bFiltered = !0,
            G(n, null, "search", [n])
    }
    function Oe(e, t, n, a, r) {
        if ("" !== n) {
            for (var o = 0, i = [], l = "function" == typeof n ? n : null, s = n instanceof RegExp ? n : l ? null : function (e, t) {
                var a = []
                    , t = H.extend({}, {
                        boundary: !1,
                        caseInsensitive: !0,
                        exact: !1,
                        regex: !1,
                        smart: !0
                    }, t);
                "string" != typeof e && (e = e.toString());
                if (e = k(e),
                    t.exact)
                    return new RegExp("^" + Pe(e) + "$", t.caseInsensitive ? "i" : "");
                {
                    var n, r, o;
                    e = t.regex ? e : Pe(e),
                        t.smart && (n = (e.match(/!?["\u201C][^"\u201D]+["\u201D]|[^ ]+/g) || [""]).map(function (e) {
                            var t, n = !1;
                            return "!" === e.charAt(0) && (n = !0,
                                e = e.substring(1)),
                                '"' === e.charAt(0) ? e = (t = e.match(/^"(.*)"$/)) ? t[1] : e : "“" === e.charAt(0) && (e = (t = e.match(/^\u201C(.*)\u201D$/)) ? t[1] : e),
                                n && (1 < e.length && a.push("(?!" + e + ")"),
                                    e = ""),
                                e.replace(/"/g, "")
                        }),
                            r = a.length ? a.join("") : "",
                            o = t.boundary ? "\\b" : "",
                            e = "^(?=.*?" + o + n.join(")(?=.*?" + o) + ")(" + r + ".)*$")
                }
                return new RegExp(e, t.caseInsensitive ? "i" : "")
            }(n, a), o = 0; o < e.length; o++) {
                var u = t.aoData[e[o]]
                    , c = void 0 === r ? u._sFilterRow : u._aFilterData[r];
                (l && l(c, u._aData, e[o], r) || s && s.test(c)) && i.push(e[o])
            }
            for (e.length = i.length,
                o = 0; o < i.length; o++)
                e[o] = i[o]
        }
    }
    var Pe = V.util.escapeRegex
        , Ee = H("<div>")[0]
        , ke = void 0 !== Ee.textContent;
    function Me(i) {
        var l, t, n, e, s = i.oInit, u = i.deferLoading, c = J(i);
        i.bInitialised ? (we(i, "header"),
            we(i, "footer"),
            n = function () {
                _e(i, i.aoHeader),
                    _e(i, i.aoFooter);
                var n = i.iInitDisplayStart;
                if (s.aaData)
                    for (l = 0; l < s.aaData.length; l++)
                        D(i, s.aaData[l]);
                else
                    !u && "dom" != c || fe(i, H(i.nTBody).children("tr"));
                i.aiDisplay = i.aiDisplayMaster.slice(),
                    Ie(i);
                var e = i
                    , t = e.nTHead
                    , a = t.querySelectorAll("tr")
                    , r = e.bSortCellsTop
                    , o = ':not([data-dt-order="disable"]):not([data-dt-order="icon-only"])';
                !0 === r ? t = a[0] : !1 === r && (t = a[a.length - 1]),
                    $e(e, t, t === e.nTHead ? "tr" + o + " th" + o + ", tr" + o + " td" + o : "th" + o + ", td" + o),
                    Ye(e, r = [], e.aaSorting),
                    e.aaSorting = r,
                    Ue(i),
                    w(i, !0),
                    G(i, null, "preInit", [i], !0),
                    d(i),
                    "ssp" == c && !u || ("ajax" == c ? Fe(i, {}, function (e) {
                        var t = Ne(i, e);
                        for (l = 0; l < t.length; l++)
                            D(i, t[l]);
                        i.iInitDisplayStart = n,
                            d(i),
                            w(i, !1),
                            He(i)
                    }) : (He(i),
                        w(i, !1)))
            }
            ,
            (t = i).oFeatures.bStateSave ? void 0 !== (e = t.fnStateLoadCallback.call(t.oInstance, t, function (e) {
                Ke(t, e, n)
            })) && Ke(t, e, n) : n()) : setTimeout(function () {
                Me(i)
            }, 200)
    }
    function He(e) {
        var t;
        e._bInitComplete || (t = [e, e.json],
            e._bInitComplete = !0,
            ne(e),
            G(e, null, "plugin-init", t, !0),
            G(e, "aoInitComplete", "init", t, !0))
    }
    function We(e, t) {
        t = parseInt(t, 10);
        e._iDisplayLength = t,
            nt(e),
            G(e, null, "length", [e, t])
    }
    function Xe(e, t, n) {
        var a = e._iDisplayStart
            , r = e._iDisplayLength
            , o = e.fnRecordsDisplay();
        if (0 === o || -1 === r)
            a = 0;
        else if ("number" == typeof t)
            o < (a = t * r) && (a = 0);
        else if ("first" == t)
            a = 0;
        else if ("previous" == t)
            (a = 0 <= r ? a - r : 0) < 0 && (a = 0);
        else if ("next" == t)
            a + r < o && (a += r);
        else if ("last" == t)
            a = Math.floor((o - 1) / r) * r;
        else {
            if ("ellipsis" === t)
                return;
            $(e, 0, "Unknown paging action: " + t, 5)
        }
        o = e._iDisplayStart !== a;
        e._iDisplayStart = a,
            G(e, null, o ? "page" : "page-nc", [e]),
            o && n && S(e)
    }
    function w(e, t) {
        e.bDrawing && !1 === t || G(e, null, "processing", [e, t])
    }
    function Ve(e, t, n) {
        t ? (w(e, !0),
            setTimeout(function () {
                n(),
                    w(e, !1)
            }, 0)) : n()
    }
    function qe(e) {
        var t, n, a, r, o, i, l, s, u, c, d, f, h, p = H(e.nTable), g = e.oScroll;
        return "" === g.sX && "" === g.sY ? e.nTable : (t = g.sX,
            n = g.sY,
            a = e.oClasses.scrolling,
            o = (r = e.captionNode) ? r._captionSide : null,
            u = H(p[0].cloneNode(!1)),
            i = H(p[0].cloneNode(!1)),
            c = function (e) {
                return e ? I(e) : null
            }
            ,
            (l = p.children("tfoot")).length || (l = null),
            u = H(s = "<div/>", {
                class: a.container
            }).append(H(s, {
                class: a.header.self
            }).css({
                overflow: "hidden",
                position: "relative",
                border: 0,
                width: t ? c(t) : "100%"
            }).append(H(s, {
                class: a.header.inner
            }).css({
                "box-sizing": "content-box",
                width: g.sXInner || "100%"
            }).append(u.removeAttr("id").css("margin-left", 0).append("top" === o ? r : null).append(p.children("thead"))))).append(H(s, {
                class: a.body
            }).css({
                position: "relative",
                overflow: "auto",
                width: c(t)
            }).append(p)),
            l && u.append(H(s, {
                class: a.footer.self
            }).css({
                overflow: "hidden",
                border: 0,
                width: t ? c(t) : "100%"
            }).append(H(s, {
                class: a.footer.inner
            }).append(i.removeAttr("id").css("margin-left", 0).append("bottom" === o ? r : null).append(p.children("tfoot"))))),
            c = u.children(),
            d = c[0],
            f = c[1],
            h = l ? c[2] : null,
            H(f).on("scroll.DT", function () {
                var e = this.scrollLeft;
                d.scrollLeft = e,
                    l && (h.scrollLeft = e)
            }),
            H("th, td", d).on("focus", function () {
                var e = d.scrollLeft;
                f.scrollLeft = e,
                    l && (f.scrollLeft = e)
            }),
            H(f).css("max-height", n),
            g.bCollapse || H(f).css("height", n),
            e.nScrollHead = d,
            e.nScrollBody = f,
            e.nScrollFoot = h,
            e.aoDrawCallback.push(Be),
            u[0])
    }
    function Be(t) {
        var e = t.oScroll.iBarWidth
            , n = H(t.nScrollHead).children("div")
            , a = n.children("table")
            , r = t.nScrollBody
            , o = H(r)
            , i = H(t.nScrollFoot).children("div")
            , l = i.children("table")
            , s = H(t.nTHead)
            , u = H(t.nTable)
            , c = t.nTFoot && H("th, td", t.nTFoot).length ? H(t.nTFoot) : null
            , d = t.oBrowser
            , f = r.scrollHeight > r.clientHeight;
        if (t.scrollBarVis !== f && void 0 !== t.scrollBarVis)
            t.scrollBarVis = f,
                ne(t);
        else {
            if (t.scrollBarVis = f,
                u.children("thead, tfoot").remove(),
                (f = s.clone().prependTo(u)).find("th, td").removeAttr("tabindex"),
                f.find("[id]").removeAttr("id"),
                c && (v = c.clone().prependTo(u)).find("[id]").removeAttr("id"),
                t.aiDisplay.length)
                for (var h = u.children("tbody").eq(0).children("tr").eq(0).children("th, td").map(function (e) {
                    return {
                        idx: ae(t, e),
                        width: H(this).outerWidth()
                    }
                }), p = 0; p < h.length; p++) {
                    var g = t.aoColumns[h[p].idx].colEl[0];
                    g.style.width.replace("px", "") !== h[p].width && (g.style.width = h[p].width + "px")
                }
            a.find("colgroup").remove(),
                a.append(t.colgroup.clone()),
                c && (l.find("colgroup").remove(),
                    l.append(t.colgroup.clone())),
                H("th, td", f).each(function () {
                    H(this.childNodes).wrapAll('<div class="dt-scroll-sizing">')
                }),
                c && H("th, td", v).each(function () {
                    H(this.childNodes).wrapAll('<div class="dt-scroll-sizing">')
                });
            var s = Math.floor(u.height()) > r.clientHeight || "scroll" == o.css("overflow-y")
                , f = "padding" + (d.bScrollbarLeft ? "Left" : "Right")
                , v = u.outerWidth();
            a.css("width", I(v)),
                n.css("width", I(v)).css(f, s ? e + "px" : "0px"),
                c && (l.css("width", I(v)),
                    i.css("width", I(v)).css(f, s ? e + "px" : "0px")),
                u.children("colgroup").prependTo(u),
                o.trigger("scroll"),
                !t.bSorted && !t.bFiltered || t._drawHold || (r.scrollTop = 0)
        }
    }
    function I(e) {
        return null === e ? "0px" : "number" == typeof e ? e < 0 ? "0px" : e + "px" : e.match(/\d$/) ? e + "px" : e
    }
    function Ue(e) {
        var t = e.aoColumns;
        for (e.colgroup.empty(),
            a = 0; a < t.length; a++)
            t[a].bVisible && e.colgroup.append(t[a].colEl)
    }
    function $e(o, e, t, i, l) {
        tt(e, t, function (e) {
            var t = !1
                , n = void 0 === i ? de(e.target) : [i];
            if (n.length) {
                for (var a = 0, r = n.length; a < r; a++)
                    if (!1 !== function (e, t, n, a) {
                        function r(e, t) {
                            var n = e._idx;
                            return (n = void 0 === n ? s.indexOf(e[1]) : n) + 1 < s.length ? n + 1 : t ? null : 0
                        }
                        var o, i = e.aoColumns[t], l = e.aaSorting, s = i.asSorting;
                        if (!i.bSortable)
                            return !1;
                        "number" == typeof l[0] && (l = e.aaSorting = [l]);
                        (a || n) && e.oFeatures.bSortMulti ? -1 !== (i = m(l, "0").indexOf(t)) ? null === (o = null === (o = r(l[i], !0)) && 1 === l.length ? 0 : o) ? l.splice(i, 1) : (l[i][1] = s[o],
                            l[i]._idx = o) : (a ? l.push([t, s[0], 0]) : l.push([t, l[0][1], 0]),
                                l[l.length - 1]._idx = 0) : l.length && l[0][0] == t ? (o = r(l[0]),
                                    l.length = 1,
                                    l[0][1] = s[o],
                                    l[0]._idx = o) : (l.length = 0,
                                        l.push([t, s[0]]),
                                        l[0]._idx = 0)
                    }(o, n[a], a, e.shiftKey) && (t = !0),
                        1 === o.aaSorting.length && "" === o.aaSorting[0][1])
                        break;
                t && Ve(o, !0, function () {
                    Je(o),
                        ze(o, o.aiDisplay),
                        d(o, !1, !1),
                        l && l()
                })
            }
        })
    }
    function ze(e, t) {
        if (!(t.length < 2)) {
            for (var n = e.aiDisplayMaster, a = {}, r = {}, o = 0; o < n.length; o++)
                a[n[o]] = o;
            for (o = 0; o < t.length; o++)
                r[t[o]] = a[t[o]];
            t.sort(function (e, t) {
                return r[e] - r[t]
            })
        }
    }
    function Ye(n, a, e) {
        function t(e) {
            var t;
            H.isPlainObject(e) ? void 0 !== e.idx ? a.push([e.idx, e.dir]) : e.name && -1 !== (t = m(n.aoColumns, "sName").indexOf(e.name)) && a.push([t, e.dir]) : a.push(e)
        }
        if (H.isPlainObject(e))
            t(e);
        else if (e.length && "number" == typeof e[0])
            t(e);
        else if (e.length)
            for (var r = 0; r < e.length; r++)
                t(e[r])
    }
    function Ge(e) {
        var t, n, a, r, o, i, l, s = [], u = V.ext.type.order, c = e.aoColumns, d = e.aaSortingFixed, f = H.isPlainObject(d), h = [];
        if (e.oFeatures.bSort)
            for (Array.isArray(d) && Ye(e, h, d),
                f && d.pre && Ye(e, h, d.pre),
                Ye(e, h, e.aaSorting),
                f && d.post && Ye(e, h, d.post),
                t = 0; t < h.length; t++)
                if (c[l = h[t][0]])
                    for (n = 0,
                        a = (r = c[l].aDataSort).length; n < a; n++)
                        i = c[o = r[n]].sType || "string",
                            void 0 === h[t]._idx && (h[t]._idx = c[o].asSorting.indexOf(h[t][1])),
                            h[t][1] && s.push({
                                src: l,
                                col: o,
                                dir: h[t][1],
                                index: h[t]._idx,
                                type: i,
                                formatter: u[i + "-pre"],
                                sorter: u[i + "-" + h[t][1]]
                            });
        return s
    }
    function Je(e, t, n) {
        var a, r, o, i, l, c, d = [], s = V.ext.type.order, f = e.aoData, u = e.aiDisplayMaster;
        for (void 0 !== t ? (l = e.aoColumns[t],
            c = [{
                src: t,
                col: t,
                dir: n,
                index: 0,
                type: l.sType,
                formatter: s[l.sType + "-pre"],
                sorter: s[l.sType + "-" + n]
            }],
            u = u.slice()) : c = Ge(e),
            a = 0,
            r = c.length; a < r; a++) {
            i = c[a],
                S = x = D = g = p = h = y = b = m = v = void 0;
            var h, p, g, v = e, m = i.col, b = v.aoColumns[m], y = V.ext.order[b.sSortDataType];
            y && (h = y.call(v.oInstance, v, m, re(v, m)));
            for (var D = V.ext.type.order[b.sType + "-pre"], x = v.aoData, S = 0; S < x.length; S++)
                x[S] && ((p = x[S])._aSortData || (p._aSortData = []),
                    p._aSortData[m] && !y || (g = y ? h[S] : B(v, S, m, "sort"),
                        p._aSortData[m] = D ? D(g, v) : g))
        }
        if ("ssp" != J(e) && 0 !== c.length) {
            for (a = 0,
                o = u.length; a < o; a++)
                d[a] = a;
            c.length && "desc" === c[0].dir && e.orderDescReverse && d.reverse(),
                u.sort(function (e, t) {
                    for (var n, a, r, o, i = c.length, l = f[e]._aSortData, s = f[t]._aSortData, u = 0; u < i; u++)
                        if (n = l[(o = c[u]).col],
                            a = s[o.col],
                            o.sorter) {
                            if (0 !== (r = o.sorter(n, a)))
                                return r
                        } else if (0 !== (r = n < a ? -1 : a < n ? 1 : 0))
                            return "asc" === o.dir ? r : -r;
                    return (n = d[e]) < (a = d[t]) ? -1 : a < n ? 1 : 0
                })
        } else
            0 === c.length && u.sort(function (e, t) {
                return e < t ? -1 : t < e ? 1 : 0
            });
        return void 0 === t && (e.bSorted = !0,
            e.sortDetails = c,
            G(e, null, "order", [e, c])),
            u
    }
    function Ze(e) {
        var t, n, a, r = e.aLastSort, o = e.oClasses.order.position, i = Ge(e), l = e.oFeatures;
        if (l.bSort && l.bSortClasses) {
            for (t = 0,
                n = r.length; t < n; t++)
                a = r[t].src,
                    H(m(e.aoData, "anCells", a)).removeClass(o + (t < 2 ? t + 1 : 3));
            for (t = 0,
                n = i.length; t < n; t++)
                a = i[t].src,
                    H(m(e.aoData, "anCells", a)).addClass(o + (t < 2 ? t + 1 : 3))
        }
        e.aLastSort = i
    }
    function Qe(n) {
        var e;
        n._bLoadingState || (e = {
            time: +new Date,
            start: n._iDisplayStart,
            length: n._iDisplayLength,
            order: H.extend(!0, [], n.aaSorting),
            search: H.extend({}, n.oPreviousSearch),
            columns: n.aoColumns.map(function (e, t) {
                return {
                    visible: e.bVisible,
                    search: H.extend({}, n.aoPreSearchCols[t])
                }
            })
        },
            n.oSavedState = e,
            G(n, "aoStateSaveParams", "stateSaveParams", [n, e]),
            n.oFeatures.bStateSave && !n.bDestroying && n.fnStateSaveCallback.call(n.oInstance, n, e))
    }
    function Ke(n, e, t) {
        var a, r, o = n.aoColumns, i = (n._bLoadingState = !0,
            n._bInitComplete ? new V.Api(n) : null);
        if (e && e.time) {
            var l = n.iStateDuration;
            if (0 < l && e.time < +new Date - 1e3 * l)
                n._bLoadingState = !1;
            else if (-1 !== G(n, "aoStateLoadParams", "stateLoadParams", [n, e]).indexOf(!1))
                n._bLoadingState = !1;
            else if (e.columns && o.length !== e.columns.length)
                n._bLoadingState = !1;
            else {
                if (n.oLoadedState = H.extend(!0, {}, e),
                    G(n, null, "stateLoadInit", [n, e], !0),
                    void 0 !== e.length && (i ? i.page.len(e.length) : n._iDisplayLength = e.length),
                    void 0 !== e.start && (null === i ? (n._iDisplayStart = e.start,
                        n.iInitDisplayStart = e.start) : Xe(n, e.start / n._iDisplayLength)),
                    void 0 !== e.order && (n.aaSorting = [],
                        H.each(e.order, function (e, t) {
                            n.aaSorting.push(t[0] >= o.length ? [0, t[1]] : t)
                        })),
                    void 0 !== e.search && H.extend(n.oPreviousSearch, e.search),
                    e.columns) {
                    for (a = 0,
                        r = e.columns.length; a < r; a++) {
                        var s = e.columns[a];
                        void 0 !== s.visible && (i ? i.column(a).visible(s.visible, !1) : o[a].bVisible = s.visible),
                            void 0 !== s.search && H.extend(n.aoPreSearchCols[a], s.search)
                    }
                    i && i.columns.adjust()
                }
                n._bLoadingState = !1,
                    G(n, "aoStateLoaded", "stateLoaded", [n, e])
            }
        } else
            n._bLoadingState = !1;
        t()
    }
    function $(e, t, n, a) {
        if (n = "DataTables warning: " + (e ? "table id=" + e.sTableId + " - " : "") + n,
            a && (n += ". For more information about this error, please see https://datatables.net/tn/" + a),
            t)
            W.console && console.log && console.log(n);
        else {
            t = V.ext,
                t = t.sErrMode || t.errMode;
            if (e && G(e, null, "dt-error", [e, a, n], !0),
                "alert" == t)
                alert(n);
            else {
                if ("throw" == t)
                    throw new Error(n);
                "function" == typeof t && t(e, a, n)
            }
        }
    }
    function z(n, a, e, t) {
        Array.isArray(e) ? H.each(e, function (e, t) {
            Array.isArray(t) ? z(n, a, t[0], t[1]) : z(n, a, t)
        }) : (void 0 === t && (t = e),
            void 0 !== a[e] && (n[t] = a[e]))
    }
    function et(e, t, n) {
        var a, r;
        for (r in t)
            Object.prototype.hasOwnProperty.call(t, r) && (a = t[r],
                H.isPlainObject(a) ? (H.isPlainObject(e[r]) || (e[r] = {}),
                    H.extend(!0, e[r], a)) : n && "data" !== r && "aaData" !== r && Array.isArray(a) ? e[r] = a.slice() : e[r] = a);
        return e
    }
    function tt(e, t, n) {
        H(e).on("click.DT", t, function (e) {
            n(e)
        }).on("keypress.DT", t, function (e) {
            13 === e.which && (e.preventDefault(),
                n(e))
        }).on("selectstart.DT", t, function () {
            return !1
        })
    }
    function Y(e, t, n) {
        n && e[t].push(n)
    }
    function G(t, e, n, a, r) {
        var o = [];
        return e && (o = t[e].slice().reverse().map(function (e) {
            return e.apply(t.oInstance, a)
        })),
            null !== n && (e = H.Event(n + ".dt"),
                n = H(t.nTable),
                e.dt = t.api,
                n[r ? "trigger" : "triggerHandler"](e, a),
                r && 0 === n.parents("body").length && H("body").trigger(e, a),
                o.push(e.result)),
            o
    }
    function nt(e) {
        var t = e._iDisplayStart
            , n = e.fnDisplayEnd()
            , a = e._iDisplayLength;
        n <= t && (t = n - a),
            t -= t % a,
            e._iDisplayStart = t = -1 === a || t < 0 ? 0 : t
    }
    function at(e, t) {
        var e = e.renderer
            , n = V.ext.renderer[t];
        return H.isPlainObject(e) && e[t] ? n[e[t]] || n._ : "string" == typeof e && n[e] || n._
    }
    function J(e) {
        return e.oFeatures.bServerSide ? "ssp" : e.ajax ? "ajax" : "dom"
    }
    function rt(e, t, n) {
        var a = e.fnFormatNumber
            , r = e._iDisplayStart + 1
            , o = e._iDisplayLength
            , i = e.fnRecordsDisplay()
            , l = e.fnRecordsTotal()
            , s = -1 === o;
        return t.replace(/_START_/g, a.call(e, r)).replace(/_END_/g, a.call(e, e.fnDisplayEnd())).replace(/_MAX_/g, a.call(e, l)).replace(/_TOTAL_/g, a.call(e, i)).replace(/_PAGE_/g, a.call(e, s ? 1 : Math.ceil(r / o))).replace(/_PAGES_/g, a.call(e, s ? 1 : Math.ceil(i / o))).replace(/_ENTRIES_/g, e.api.i18n("entries", "", n)).replace(/_ENTRIES-MAX_/g, e.api.i18n("entries", "", l)).replace(/_ENTRIES-TOTAL_/g, e.api.i18n("entries", "", i))
    }
    var ot = []
        , n = Array.prototype;
    X = function (e, t) {
        if (!(this instanceof X))
            return new X(e, t);
        function n(e) {
            e = e,
                t = V.settings,
                a = m(t, "nTable");
            var n, t, a, r = e ? e.nTable && e.oFeatures ? [e] : e.nodeName && "table" === e.nodeName.toLowerCase() ? -1 !== (r = a.indexOf(e)) ? [t[r]] : null : e && "function" == typeof e.settings ? e.settings().toArray() : ("string" == typeof e ? n = H(e).get() : e instanceof H && (n = e.get()),
                n ? t.filter(function (e, t) {
                    return n.includes(a[t])
                }) : void 0) : [];
            r && o.push.apply(o, r)
        }
        var o = [];
        if (Array.isArray(e))
            for (var a = 0, r = e.length; a < r; a++)
                n(e[a]);
        else
            n(e);
        this.context = 1 < o.length ? x(o) : o,
            t && this.push.apply(this, t),
            this.selector = {
                rows: null,
                cols: null,
                opts: null
            },
            X.extend(this, this, ot)
    }
        ,
        V.Api = X,
        H.extend(X.prototype, {
            any: function () {
                return 0 !== this.count()
            },
            context: [],
            count: function () {
                return this.flatten().length
            },
            each: function (e) {
                for (var t = 0, n = this.length; t < n; t++)
                    e.call(this, this[t], t, this);
                return this
            },
            eq: function (e) {
                var t = this.context;
                return t.length > e ? new X(t[e], this[e]) : null
            },
            filter: function (e) {
                e = n.filter.call(this, e, this);
                return new X(this.context, e)
            },
            flatten: function () {
                var e = [];
                return new X(this.context, e.concat.apply(e, this.toArray()))
            },
            get: function (e) {
                return this[e]
            },
            join: n.join,
            includes: function (e) {
                return -1 !== this.indexOf(e)
            },
            indexOf: n.indexOf,
            iterator: function (e, t, n, a) {
                var r, o, i, l, s, u, c, d, f = [], h = this.context, p = this.selector;
                for ("string" == typeof e && (a = n,
                    n = t,
                    t = e,
                    e = !1),
                    o = 0,
                    i = h.length; o < i; o++) {
                    var g = new X(h[o]);
                    if ("table" === t)
                        void 0 !== (r = n.call(g, h[o], o)) && f.push(r);
                    else if ("columns" === t || "rows" === t)
                        void 0 !== (r = n.call(g, h[o], this[o], o)) && f.push(r);
                    else if ("every" === t || "column" === t || "column-rows" === t || "row" === t || "cell" === t)
                        for (c = this[o],
                            "column-rows" === t && (u = vt(h[o], p.opts)),
                            l = 0,
                            s = c.length; l < s; l++)
                            d = c[l],
                                void 0 !== (r = "cell" === t ? n.call(g, h[o], d.row, d.column, o, l) : n.call(g, h[o], d, o, l, u)) && f.push(r)
                }
                return f.length || a ? ((e = (a = new X(h, e ? f.concat.apply([], f) : f)).selector).rows = p.rows,
                    e.cols = p.cols,
                    e.opts = p.opts,
                    a) : this
            },
            lastIndexOf: n.lastIndexOf,
            length: 0,
            map: function (e) {
                e = n.map.call(this, e, this);
                return new X(this.context, e)
            },
            pluck: function (e) {
                var t = V.util.get(e);
                return this.map(function (e) {
                    return t(e)
                })
            },
            pop: n.pop,
            push: n.push,
            reduce: n.reduce,
            reduceRight: n.reduceRight,
            reverse: n.reverse,
            selector: null,
            shift: n.shift,
            slice: function () {
                return new X(this.context, this)
            },
            sort: n.sort,
            splice: n.splice,
            toArray: function () {
                return n.slice.call(this)
            },
            to$: function () {
                return H(this)
            },
            toJQuery: function () {
                return H(this)
            },
            unique: function () {
                return new X(this.context, x(this.toArray()))
            },
            unshift: n.unshift
        }),
        W.__apiStruct = ot,
        X.extend = function (e, t, n) {
            if (n.length && t && (t instanceof X || t.__dt_wrapper))
                for (var a, r = 0, o = n.length; r < o; r++)
                    "__proto__" !== (a = n[r]).name && (t[a.name] = "function" === a.type ? function (t, n, a) {
                        return function () {
                            var e = n.apply(t || this, arguments);
                            return X.extend(e, e, a.methodExt),
                                e
                        }
                    }(e, a.val, a) : "object" === a.type ? {} : a.val,
                        t[a.name].__dt_wrapper = !0,
                        X.extend(e, t[a.name], a.propExt))
        }
        ,
        X.register = t = function (e, t) {
            if (Array.isArray(e))
                for (var n = 0, a = e.length; n < a; n++)
                    X.register(e[n], t);
            else
                for (var r = e.split("."), o = ot, i = 0, l = r.length; i < l; i++) {
                    var s, u, c = function (e, t) {
                        for (var n = 0, a = e.length; n < a; n++)
                            if (e[n].name === t)
                                return e[n];
                        return null
                    }(o, u = (s = -1 !== r[i].indexOf("()")) ? r[i].replace("()", "") : r[i]);
                    c || o.push(c = {
                        name: u,
                        val: {},
                        methodExt: [],
                        propExt: [],
                        type: "object"
                    }),
                        i === l - 1 ? (c.val = t,
                            c.type = "function" == typeof t ? "function" : H.isPlainObject(t) ? "object" : "other") : o = s ? c.methodExt : c.propExt
                }
        }
        ,
        X.registerPlural = e = function (e, t, n) {
            X.register(e, n),
                X.register(t, function () {
                    var e = n.apply(this, arguments);
                    return e === this ? this : e instanceof X ? e.length ? Array.isArray(e[0]) ? new X(e.context, e[0]) : e[0] : void 0 : e
                })
        }
        ;
    function it(e, t) {
        var n, a;
        return Array.isArray(e) ? (n = [],
            e.forEach(function (e) {
                e = it(e, t);
                n.push.apply(n, e)
            }),
            n.filter(function (e) {
                return e
            })) : "number" == typeof e ? [t[e]] : (a = t.map(function (e) {
                return e.nTable
            }),
                H(a).filter(e).map(function () {
                    var e = a.indexOf(this);
                    return t[e]
                }).toArray())
    }
    function lt(r, o, e) {
        var t, n;
        e && (t = new X(r)).one("draw", function () {
            e(t.ajax.json())
        }),
            "ssp" == J(r) ? d(r, o) : (w(r, !0),
                (n = r.jqXHR) && 4 !== n.readyState && n.abort(),
                Fe(r, {}, function (e) {
                    me(r);
                    for (var t = Ne(r, e), n = 0, a = t.length; n < a; n++)
                        D(r, t[n]);
                    d(r, o),
                        He(r),
                        w(r, !1)
                }))
    }
    function st(e, t, n, a, r) {
        for (var o, i, l, s, u = [], c = typeof t, d = 0, f = (t = t && "string" != c && "function" != c && void 0 !== t.length ? t : [t]).length; d < f; d++)
            for (l = 0,
                s = (i = t[d] && t[d].split && !t[d].match(/[[(:]/) ? t[d].split(",") : [t[d]]).length; l < s; l++)
                (o = (o = n("string" == typeof i[l] ? i[l].trim() : i[l])).filter(function (e) {
                    return null != e
                })) && o.length && (u = u.concat(o));
        var h = C.selector[e];
        if (h.length)
            for (d = 0,
                f = h.length; d < f; d++)
                u = h[d](a, r, u);
        return x(u)
    }
    function ut(e) {
        return (e = e || {}).filter && void 0 === e.search && (e.search = e.filter),
            H.extend({
                search: "none",
                order: "current",
                page: "all"
            }, e)
    }
    function ct(e) {
        var t = new X(e.context[0]);
        return e.length && t.push(e[0]),
            t.selector = e.selector,
            t.length && 1 < t[0].length && t[0].splice(1),
            t
    }
    t("tables()", function (e) {
        return null != e ? new X(it(e, this.context)) : this
    }),
        t("table()", function (e) {
            var e = this.tables(e)
                , t = e.context;
            return t.length ? new X(t[0]) : e
        }),
        [["nodes", "node", "nTable"], ["body", "body", "nTBody"], ["header", "header", "nTHead"], ["footer", "footer", "nTFoot"]].forEach(function (t) {
            e("tables()." + t[0] + "()", "table()." + t[1] + "()", function () {
                return this.iterator("table", function (e) {
                    return e[t[2]]
                }, 1)
            })
        }),
        [["header", "aoHeader"], ["footer", "aoFooter"]].forEach(function (n) {
            t("table()." + n[0] + ".structure()", function (e) {
                var e = this.columns(e).indexes().flatten()
                    , t = this.context[0];
                return Te(t, t[n[1]], e)
            })
        }),
        e("tables().containers()", "table().container()", function () {
            return this.iterator("table", function (e) {
                return e.nTableWrapper
            }, 1)
        }),
        t("tables().every()", function (n) {
            var a = this;
            return this.iterator("table", function (e, t) {
                n.call(a.table(t), t)
            })
        }),
        t("caption()", function (r, o) {
            var e, t = this.context;
            return void 0 === r ? (e = t[0].captionNode) && t.length ? e.innerHTML : null : this.iterator("table", function (e) {
                var t = H(e.nTable)
                    , n = H(e.captionNode)
                    , a = H(e.nTableWrapper);
                n.length || (n = H("<caption/>").html(r),
                    e.captionNode = n[0],
                    o) || (t.prepend(n),
                        o = n.css("caption-side")),
                    n.html(r),
                    o && (n.css("caption-side", o),
                        n[0]._captionSide = o),
                    (a.find("div.dataTables_scroll").length ? (e = "top" === o ? "Head" : "Foot",
                        a.find("div.dataTables_scroll" + e + " table")) : t).prepend(n)
            }, 1)
        }),
        t("caption.node()", function () {
            var e = this.context;
            return e.length ? e[0].captionNode : null
        }),
        t("draw()", function (t) {
            return this.iterator("table", function (e) {
                "page" === t ? S(e) : d(e, !1 === (t = "string" == typeof t ? "full-hold" !== t : t))
            })
        }),
        t("page()", function (t) {
            return void 0 === t ? this.page.info().page : this.iterator("table", function (e) {
                Xe(e, t)
            })
        }),
        t("page.info()", function () {
            var e, t, n, a, r;
            if (0 !== this.context.length)
                return t = (e = this.context[0])._iDisplayStart,
                    n = e.oFeatures.bPaginate ? e._iDisplayLength : -1,
                    a = e.fnRecordsDisplay(),
                {
                    page: (r = -1 === n) ? 0 : Math.floor(t / n),
                    pages: r ? 1 : Math.ceil(a / n),
                    start: t,
                    end: e.fnDisplayEnd(),
                    length: n,
                    recordsTotal: e.fnRecordsTotal(),
                    recordsDisplay: a,
                    serverSide: "ssp" === J(e)
                }
        }),
        t("page.len()", function (t) {
            return void 0 === t ? 0 !== this.context.length ? this.context[0]._iDisplayLength : void 0 : this.iterator("table", function (e) {
                We(e, t)
            })
        }),
        t("ajax.json()", function () {
            var e = this.context;
            if (0 < e.length)
                return e[0].json
        }),
        t("ajax.params()", function () {
            var e = this.context;
            if (0 < e.length)
                return e[0].oAjaxData
        }),
        t("ajax.reload()", function (t, n) {
            return this.iterator("table", function (e) {
                lt(e, !1 === n, t)
            })
        }),
        t("ajax.url()", function (t) {
            var e = this.context;
            return void 0 === t ? 0 === e.length ? void 0 : (e = e[0],
                H.isPlainObject(e.ajax) ? e.ajax.url : e.ajax) : this.iterator("table", function (e) {
                    H.isPlainObject(e.ajax) ? e.ajax.url = t : e.ajax = t
                })
        }),
        t("ajax.url().load()", function (t, n) {
            return this.iterator("table", function (e) {
                lt(e, !1 === n, t)
            })
        });
    function dt(o, i, e, t) {
        function l(e, t) {
            var n;
            if (Array.isArray(e) || e instanceof H)
                for (var a = 0, r = e.length; a < r; a++)
                    l(e[a], t);
            else
                e.nodeName && "tr" === e.nodeName.toLowerCase() ? (e.setAttribute("data-dt-row", i.idx),
                    s.push(e)) : (n = H("<tr><td></td></tr>").attr("data-dt-row", i.idx).addClass(t),
                        H("td", n).addClass(t).html(e)[0].colSpan = oe(o),
                        s.push(n[0]))
        }
        var s = [];
        l(e, t),
            i._details && i._details.detach(),
            i._details = H(s),
            i._detailsShow && i._details.insertAfter(i.nTr)
    }
    function ft(e, t) {
        var n = e.context;
        if (n.length && e.length) {
            var a = n[0].aoData[e[0]];
            if (a._details) {
                (a._detailsShow = t) ? (a._details.insertAfter(a.nTr),
                    H(a.nTr).addClass("dt-hasChild")) : (a._details.detach(),
                        H(a.nTr).removeClass("dt-hasChild")),
                    G(n[0], null, "childRow", [t, e.row(e[0])]);
                var i = n[0]
                    , r = new X(i)
                    , a = ".dt.DT_details"
                    , t = "draw" + a
                    , e = "column-sizing" + a
                    , a = "destroy" + a
                    , l = i.aoData;
                if (r.off(t + " " + e + " " + a),
                    m(l, "_details").length > 0) {
                    r.on(t, function (e, t) {
                        if (i !== t)
                            return;
                        r.rows({
                            page: "current"
                        }).eq(0).each(function (e) {
                            var t = l[e];
                            if (t._detailsShow)
                                t._details.insertAfter(t.nTr)
                        })
                    });
                    r.on(e, function (e, t) {
                        if (i !== t)
                            return;
                        var n, a = oe(t);
                        for (var r = 0, o = l.length; r < o; r++) {
                            n = l[r];
                            if (n && n._details)
                                n._details.each(function () {
                                    var e = H(this).children("td");
                                    if (e.length == 1)
                                        e.attr("colspan", a)
                                })
                        }
                    });
                    r.on(a, function (e, t) {
                        if (i !== t)
                            return;
                        for (var n = 0, a = l.length; n < a; n++)
                            if (l[n] && l[n]._details)
                                yt(r, n)
                    })
                }
                bt(n)
            }
        }
    }
    function ht(e, t, n, a, r, o) {
        for (var i = [], l = 0, s = r.length; l < s; l++)
            i.push(B(e, r[l], t, o));
        return i
    }
    function pt(e, t, n) {
        var a = e.aoHeader;
        return a[void 0 !== n ? n : e.bSortCellsTop ? 0 : a.length - 1][t].cell
    }
    function gt(t, n) {
        return function (e) {
            return T(e) || "string" != typeof e || (e = e.replace(F, " "),
                t && (e = L(e)),
                n && (e = k(e, !1))),
                e
        }
    }
    var vt = function (e, t) {
        var n, a = [], r = e.aiDisplay, o = e.aiDisplayMaster, i = t.search, l = t.order, t = t.page;
        if ("ssp" == J(e))
            return "removed" === i ? [] : h(0, o.length);
        if ("current" == t)
            for (u = e._iDisplayStart,
                c = e.fnDisplayEnd(); u < c; u++)
                a.push(r[u]);
        else if ("current" == l || "applied" == l) {
            if ("none" == i)
                a = o.slice();
            else if ("applied" == i)
                a = r.slice();
            else if ("removed" == i) {
                for (var s = {}, u = 0, c = r.length; u < c; u++)
                    s[r[u]] = null;
                o.forEach(function (e) {
                    Object.prototype.hasOwnProperty.call(s, e) || a.push(e)
                })
            }
        } else if ("index" == l || "original" == l)
            for (u = 0,
                c = e.aoData.length; u < c; u++)
                e.aoData[u] && ("none" == i || -1 === (n = r.indexOf(u)) && "removed" == i || 0 <= n && "applied" == i) && a.push(u);
        else if ("number" == typeof l) {
            var d = Je(e, l, "asc");
            if ("none" === i)
                a = d;
            else
                for (u = 0; u < d.length; u++)
                    (-1 === (n = r.indexOf(d[u])) && "removed" == i || 0 <= n && "applied" == i) && a.push(d[u])
        }
        return a
    }
        , mt = (t("rows()", function (n, a) {
            void 0 === n ? n = "" : H.isPlainObject(n) && (a = n,
                n = ""),
                a = ut(a);
            var e = this.iterator("table", function (e) {
                return t = st("row", t = n, function (n) {
                    var e = f(n)
                        , a = r.aoData;
                    if (null !== e && !o)
                        return [e];
                    if (i = i || vt(r, o),
                        null !== e && -1 !== i.indexOf(e))
                        return [e];
                    if (null == n || "" === n)
                        return i;
                    if ("function" == typeof n)
                        return i.map(function (e) {
                            var t = a[e];
                            return n(e, t._aData, t.nTr) ? e : null
                        });
                    if (n.nodeName)
                        return e = n._DT_RowIndex,
                            t = n._DT_CellIndex,
                            void 0 !== e ? a[e] && a[e].nTr === n ? [e] : [] : t ? a[t.row] && a[t.row].nTr === n.parentNode ? [t.row] : [] : (e = H(n).closest("*[data-dt-row]")).length ? [e.data("dt-row")] : [];
                    if ("string" == typeof n && "#" === n.charAt(0)) {
                        var t = r.aIds[n.replace(/^#/, "")];
                        if (void 0 !== t)
                            return [t.idx]
                    }
                    e = A(b(r.aoData, i, "nTr"));
                    return H(e).filter(n).map(function () {
                        return this._DT_RowIndex
                    }).toArray()
                }, r = e, o = a),
                    "current" !== o.order && "applied" !== o.order || ze(r, t),
                    t;
                var r, t, o, i
            }, 1);
            return e.selector.rows = n,
                e.selector.opts = a,
                e
        }),
            t("rows().nodes()", function () {
                return this.iterator("row", function (e, t) {
                    return e.aoData[t].nTr || void 0
                }, 1)
            }),
            t("rows().data()", function () {
                return this.iterator(!0, "rows", function (e, t) {
                    return b(e.aoData, t, "_aData")
                }, 1)
            }),
            e("rows().cache()", "row().cache()", function (n) {
                return this.iterator("row", function (e, t) {
                    e = e.aoData[t];
                    return "search" === n ? e._aFilterData : e._aSortData
                }, 1)
            }),
            e("rows().invalidate()", "row().invalidate()", function (n) {
                return this.iterator("row", function (e, t) {
                    be(e, t, n)
                })
            }),
            e("rows().indexes()", "row().index()", function () {
                return this.iterator("row", function (e, t) {
                    return t
                }, 1)
            }),
            e("rows().ids()", "row().id()", function (e) {
                for (var t = [], n = this.context, a = 0, r = n.length; a < r; a++)
                    for (var o = 0, i = this[a].length; o < i; o++) {
                        var l = n[a].rowIdFn(n[a].aoData[this[a][o]]._aData);
                        t.push((!0 === e ? "#" : "") + l)
                    }
                return new X(n, t)
            }),
            e("rows().remove()", "row().remove()", function () {
                return this.iterator("row", function (e, t) {
                    var n = e.aoData
                        , a = n[t]
                        , r = e.aiDisplayMaster.indexOf(t)
                        , r = (-1 !== r && e.aiDisplayMaster.splice(r, 1),
                            0 < e._iRecordsDisplay && e._iRecordsDisplay--,
                            nt(e),
                            e.rowIdFn(a._aData));
                    void 0 !== r && delete e.aIds[r],
                        n[t] = null
                }),
                    this
            }),
            t("rows.add()", function (o) {
                var e = this.iterator("table", function (e) {
                    for (var t, n = [], a = 0, r = o.length; a < r; a++)
                        (t = o[a]).nodeName && "TR" === t.nodeName.toUpperCase() ? n.push(fe(e, t)[0]) : n.push(D(e, t));
                    return n
                }, 1)
                    , t = this.rows(-1);
                return t.pop(),
                    t.push.apply(t, e),
                    t
            }),
            t("row()", function (e, t) {
                return ct(this.rows(e, t))
            }),
            t("row().data()", function (e) {
                var t, n = this.context;
                return void 0 === e ? n.length && this.length && this[0].length ? n[0].aoData[this[0]]._aData : void 0 : ((t = n[0].aoData[this[0]])._aData = e,
                    Array.isArray(e) && t.nTr && t.nTr.id && v(n[0].rowId)(e, t.nTr.id),
                    be(n[0], this[0], "data"),
                    this)
            }),
            t("row().node()", function () {
                var e = this.context;
                if (e.length && this.length && this[0].length) {
                    e = e[0].aoData[this[0]];
                    if (e && e.nTr)
                        return e.nTr
                }
                return null
            }),
            t("row.add()", function (t) {
                t instanceof H && t.length && (t = t[0]);
                var e = this.iterator("table", function (e) {
                    return t.nodeName && "TR" === t.nodeName.toUpperCase() ? fe(e, t)[0] : D(e, t)
                });
                return this.row(e[0])
            }),
            H(_).on("plugin-init.dt", function (e, t) {
                var a = new X(t);
                a.on("stateSaveParams.DT", function (e, t, n) {
                    for (var a = t.rowIdFn, r = t.aiDisplayMaster, o = [], i = 0; i < r.length; i++) {
                        var l = r[i]
                            , l = t.aoData[l];
                        l._detailsShow && o.push("#" + a(l._aData))
                    }
                    n.childRows = o
                }),
                    a.on("stateLoaded.DT", function (e, t, n) {
                        mt(a, n)
                    }),
                    mt(a, a.state.loaded())
            }),
            function (e, t) {
                t && t.childRows && e.rows(t.childRows.map(function (e) {
                    return e.replace(/([^:\\]*(?:\\.[^:\\]*)*):/g, "$1\\:")
                })).every(function () {
                    G(e.settings()[0], null, "requestChild", [this])
                })
            }
        )
        , bt = V.util.throttle(function (e) {
            Qe(e[0])
        }, 500)
        , yt = function (e, t) {
            var n = e.context;
            n.length && (t = n[0].aoData[void 0 !== t ? t : e[0]]) && t._details && (t._details.remove(),
                t._detailsShow = void 0,
                t._details = void 0,
                H(t.nTr).removeClass("dt-hasChild"),
                bt(n))
        }
        , Dt = "row().child"
        , xt = Dt + "()"
        , St = (t(xt, function (e, t) {
            var n = this.context;
            return void 0 === e ? n.length && this.length && n[0].aoData[this[0]] ? n[0].aoData[this[0]]._details : void 0 : (!0 === e ? this.child.show() : !1 === e ? yt(this) : n.length && this.length && dt(n[0], n[0].aoData[this[0]], e, t),
                this)
        }),
            t([Dt + ".show()", xt + ".show()"], function () {
                return ft(this, !0),
                    this
            }),
            t([Dt + ".hide()", xt + ".hide()"], function () {
                return ft(this, !1),
                    this
            }),
            t([Dt + ".remove()", xt + ".remove()"], function () {
                return yt(this),
                    this
            }),
            t(Dt + ".isShown()", function () {
                var e = this.context;
                return e.length && this.length && e[0].aoData[this[0]] && e[0].aoData[this[0]]._detailsShow || !1
            }),
            /^([^:]+)?:(name|title|visIdx|visible)$/)
        , xt = (t("columns()", function (n, a) {
            void 0 === n ? n = "" : H.isPlainObject(n) && (a = n,
                n = ""),
                a = ut(a);
            var e = this.iterator("table", function (e) {
                return t = n,
                    l = a,
                    s = (i = e).aoColumns,
                    u = m(s, "sName"),
                    c = m(s, "sTitle"),
                    e = V.util.get("[].[].cell")(i.aoHeader),
                    d = x(M([], e)),
                    st("column", t, function (n) {
                        var a, e = f(n);
                        if ("" === n)
                            return h(s.length);
                        if (null !== e)
                            return [0 <= e ? e : s.length + e];
                        if ("function" == typeof n)
                            return a = vt(i, l),
                                s.map(function (e, t) {
                                    return n(t, ht(i, t, 0, 0, a), pt(i, t)) ? t : null
                                });
                        var t, r, o = "string" == typeof n ? n.match(St) : "";
                        if (o)
                            switch (o[2]) {
                                case "visIdx":
                                case "visible":
                                    return o[1] && o[1].match(/^\d+$/) ? (t = parseInt(o[1], 10)) < 0 ? [(r = s.map(function (e, t) {
                                        return e.bVisible ? t : null
                                    }))[r.length + t]] : [ae(i, t)] : s.map(function (e, t) {
                                        return e.bVisible && (!o[1] || 0 < H(d[t]).filter(o[1]).length) ? t : null
                                    });
                                case "name":
                                    return u.map(function (e, t) {
                                        return e === o[1] ? t : null
                                    });
                                case "title":
                                    return c.map(function (e, t) {
                                        return e === o[1] ? t : null
                                    });
                                default:
                                    return []
                            }
                        return n.nodeName && n._DT_CellIndex ? [n._DT_CellIndex.column] : (e = H(d).filter(n).map(function () {
                            return de(this)
                        }).toArray()).length || !n.nodeName ? e : (e = H(n).closest("*[data-dt-column]")).length ? [e.data("dt-column")] : []
                    }, i, l);
                var i, t, l, s, u, c, d
            }, 1);
            return e.selector.cols = n,
                e.selector.opts = a,
                e
        }),
            e("columns().header()", "column().header()", function (n) {
                return this.iterator("column", function (e, t) {
                    return pt(e, t, n)
                }, 1)
            }),
            e("columns().footer()", "column().footer()", function (n) {
                return this.iterator("column", function (e, t) {
                    return e.aoFooter.length ? e.aoFooter[void 0 !== n ? n : 0][t].cell : null
                }, 1)
            }),
            e("columns().data()", "column().data()", function () {
                return this.iterator("column-rows", ht, 1)
            }),
            e("columns().render()", "column().render()", function (o) {
                return this.iterator("column-rows", function (e, t, n, a, r) {
                    return ht(e, t, 0, 0, r, o)
                }, 1)
            }),
            e("columns().dataSrc()", "column().dataSrc()", function () {
                return this.iterator("column", function (e, t) {
                    return e.aoColumns[t].mData
                }, 1)
            }),
            e("columns().cache()", "column().cache()", function (o) {
                return this.iterator("column-rows", function (e, t, n, a, r) {
                    return b(e.aoData, r, "search" === o ? "_aFilterData" : "_aSortData", t)
                }, 1)
            }),
            e("columns().init()", "column().init()", function () {
                return this.iterator("column", function (e, t) {
                    return e.aoColumns[t]
                }, 1)
            }),
            e("columns().nodes()", "column().nodes()", function () {
                return this.iterator("column-rows", function (e, t, n, a, r) {
                    return b(e.aoData, r, "anCells", t)
                }, 1)
            }),
            e("columns().titles()", "column().title()", function (n, a) {
                return this.iterator("column", function (e, t) {
                    "number" == typeof n && (a = n,
                        n = void 0);
                    t = H("span.dt-column-title", this.column(t).header(a));
                    return void 0 !== n ? (t.html(n),
                        this) : t.html()
                }, 1)
            }),
            e("columns().types()", "column().type()", function () {
                return this.iterator("column", function (e, t) {
                    t = e.aoColumns[t].sType;
                    return t || se(e),
                        t
                }, 1)
            }),
            e("columns().visible()", "column().visible()", function (n, a) {
                var t = this
                    , r = []
                    , e = this.iterator("column", function (e, t) {
                        if (void 0 === n)
                            return e.aoColumns[t].bVisible;
                        !function (e, t, n) {
                            var a, r, o = e.aoColumns, i = o[t], l = e.aoData;
                            if (void 0 === n)
                                return i.bVisible;
                            if (i.bVisible === n)
                                return !1;
                            if (n)
                                for (var s = m(o, "bVisible").indexOf(!0, t + 1), u = 0, c = l.length; u < c; u++)
                                    l[u] && (r = l[u].nTr,
                                        a = l[u].anCells,
                                        r) && r.insertBefore(a[t], a[s] || null);
                            else
                                H(m(e.aoData, "anCells", t)).detach();
                            return i.bVisible = n,
                                Ue(e),
                                !0
                        }(e, t, n) || r.push(t)
                    });
                return void 0 !== n && this.iterator("table", function (e) {
                    _e(e, e.aoHeader),
                        _e(e, e.aoFooter),
                        e.aiDisplay.length || H(e.nTBody).find("td[colspan]").attr("colspan", oe(e)),
                        Qe(e),
                        t.iterator("column", function (e, t) {
                            r.includes(t) && G(e, null, "column-visibility", [e, t, n, a])
                        }),
                        r.length && (void 0 === a || a) && t.columns.adjust()
                }),
                    e
            }),
            e("columns().widths()", "column().width()", function () {
                var e = this.columns(":visible").count()
                    , e = H("<tr>").html("<td>" + Array(e).join("</td><td>") + "</td>")
                    , n = (H(this.table().body()).append(e),
                        e.children().map(function () {
                            return H(this).outerWidth()
                        }));
                return e.remove(),
                    this.iterator("column", function (e, t) {
                        e = re(e, t);
                        return null !== e ? n[e] : 0
                    }, 1)
            }),
            e("columns().indexes()", "column().index()", function (n) {
                return this.iterator("column", function (e, t) {
                    return "visible" === n ? re(e, t) : t
                }, 1)
            }),
            t("columns.adjust()", function () {
                return this.iterator("table", function (e) {
                    ne(e)
                }, 1)
            }),
            t("column.index()", function (e, t) {
                var n;
                if (0 !== this.context.length)
                    return n = this.context[0],
                        "fromVisible" === e || "toData" === e ? ae(n, t) : "fromData" === e || "toVisible" === e ? re(n, t) : void 0
            }),
            t("column()", function (e, t) {
                return ct(this.columns(e, t))
            }),
            t("cells()", function (g, e, v) {
                var a, r, o, i, l, s, t;
                return H.isPlainObject(g) && (void 0 === g.row ? (v = g,
                    g = null) : (v = e,
                        e = null)),
                    H.isPlainObject(e) && (v = e,
                        e = null),
                    null == e ? this.iterator("table", function (e) {
                        return a = e,
                            e = g,
                            t = ut(v),
                            d = a.aoData,
                            f = vt(a, t),
                            n = A(b(d, f, "anCells")),
                            h = H(M([], n)),
                            p = a.aoColumns.length,
                            st("cell", e, function (e) {
                                var t, n = "function" == typeof e;
                                if (null == e || n) {
                                    for (o = [],
                                        i = 0,
                                        l = f.length; i < l; i++)
                                        for (r = f[i],
                                            s = 0; s < p; s++)
                                            u = {
                                                row: r,
                                                column: s
                                            },
                                                (!n || (c = d[r],
                                                    e(u, B(a, r, s), c.anCells ? c.anCells[s] : null))) && o.push(u);
                                    return o
                                }
                                return H.isPlainObject(e) ? void 0 !== e.column && void 0 !== e.row && -1 !== f.indexOf(e.row) ? [e] : [] : (t = h.filter(e).map(function (e, t) {
                                    return {
                                        row: t._DT_CellIndex.row,
                                        column: t._DT_CellIndex.column
                                    }
                                }).toArray()).length || !e.nodeName ? t : (c = H(e).closest("*[data-dt-row]")).length ? [{
                                    row: c.data("dt-row"),
                                    column: c.data("dt-column")
                                }] : []
                            }, a, t);
                        var a, t, r, o, i, l, s, u, c, d, f, n, h, p
                    }) : (t = v ? {
                        page: v.page,
                        order: v.order,
                        search: v.search
                    } : {},
                        a = this.columns(e, t),
                        r = this.rows(g, t),
                        t = this.iterator("table", function (e, t) {
                            var n = [];
                            for (o = 0,
                                i = r[t].length; o < i; o++)
                                for (l = 0,
                                    s = a[t].length; l < s; l++)
                                    n.push({
                                        row: r[t][o],
                                        column: a[t][l]
                                    });
                            return n
                        }, 1),
                        t = v && v.selected ? this.cells(t, v) : t,
                        H.extend(t.selector, {
                            cols: e,
                            rows: g,
                            opts: v
                        }),
                        t)
            }),
            e("cells().nodes()", "cell().node()", function () {
                return this.iterator("cell", function (e, t, n) {
                    e = e.aoData[t];
                    return e && e.anCells ? e.anCells[n] : void 0
                }, 1)
            }),
            t("cells().data()", function () {
                return this.iterator("cell", function (e, t, n) {
                    return B(e, t, n)
                }, 1)
            }),
            e("cells().cache()", "cell().cache()", function (a) {
                return a = "search" === a ? "_aFilterData" : "_aSortData",
                    this.iterator("cell", function (e, t, n) {
                        return e.aoData[t][a][n]
                    }, 1)
            }),
            e("cells().render()", "cell().render()", function (a) {
                return this.iterator("cell", function (e, t, n) {
                    return B(e, t, n, a)
                }, 1)
            }),
            e("cells().indexes()", "cell().index()", function () {
                return this.iterator("cell", function (e, t, n) {
                    return {
                        row: t,
                        column: n,
                        columnVisible: re(e, n)
                    }
                }, 1)
            }),
            e("cells().invalidate()", "cell().invalidate()", function (a) {
                return this.iterator("cell", function (e, t, n) {
                    be(e, t, a, n)
                })
            }),
            t("cell()", function (e, t, n) {
                return ct(this.cells(e, t, n))
            }),
            t("cell().data()", function (e) {
                var t, n, a, r, o, i = this.context, l = this[0];
                return void 0 === e ? i.length && l.length ? B(i[0], l[0].row, l[0].column) : void 0 : (t = i[0],
                    n = l[0].row,
                    a = l[0].column,
                    r = t.aoColumns[a],
                    o = t.aoData[n]._aData,
                    r.fnSetData(o, e, {
                        settings: t,
                        row: n,
                        col: a
                    }),
                    be(i[0], l[0].row, "data", l[0].column),
                    this)
            }),
            t("order()", function (t, e) {
                var n = this.context
                    , a = Array.prototype.slice.call(arguments);
                return void 0 === t ? 0 !== n.length ? n[0].aaSorting : void 0 : ("number" == typeof t ? t = [[t, e]] : 1 < a.length && (t = a),
                    this.iterator("table", function (e) {
                        e.aaSorting = Array.isArray(t) ? t.slice() : t
                    }))
            }),
            t("order.listener()", function (t, n, a) {
                return this.iterator("table", function (e) {
                    $e(e, t, {}, n, a)
                })
            }),
            t("order.fixed()", function (t) {
                var e;
                return t ? this.iterator("table", function (e) {
                    e.aaSortingFixed = H.extend(!0, {}, t)
                }) : (e = (e = this.context).length ? e[0].aaSortingFixed : void 0,
                    Array.isArray(e) ? {
                        pre: e
                    } : e)
            }),
            t(["columns().order()", "column().order()"], function (n) {
                var a = this;
                return n ? this.iterator("table", function (e, t) {
                    e.aaSorting = a[t].map(function (e) {
                        return [e, n]
                    })
                }) : this.iterator("column", function (e, t) {
                    for (var n = Ge(e), a = 0, r = n.length; a < r; a++)
                        if (n[a].col === t)
                            return n[a].dir;
                    return null
                }, 1)
            }),
            e("columns().orderable()", "column().orderable()", function (n) {
                return this.iterator("column", function (e, t) {
                    e = e.aoColumns[t];
                    return n ? e.asSorting : e.bSortable
                }, 1)
            }),
            t("processing()", function (t) {
                return this.iterator("table", function (e) {
                    w(e, t)
                })
            }),
            t("search()", function (t, n, a, r) {
                var e = this.context;
                return void 0 === t ? 0 !== e.length ? e[0].oPreviousSearch.search : void 0 : this.iterator("table", function (e) {
                    e.oFeatures.bFilter && Re(e, "object" == typeof n ? H.extend(e.oPreviousSearch, n, {
                        search: t
                    }) : H.extend(e.oPreviousSearch, {
                        search: t,
                        regex: null !== n && n,
                        smart: null === a || a,
                        caseInsensitive: null === r || r
                    }))
                })
            }),
            t("search.fixed()", function (t, n) {
                var e = this.iterator(!0, "table", function (e) {
                    e = e.searchFixed;
                    return t ? void 0 === n ? e[t] : (null === n ? delete e[t] : e[t] = n,
                        this) : Object.keys(e)
                });
                return void 0 !== t && void 0 === n ? e[0] : e
            }),
            e("columns().search()", "column().search()", function (a, r, o, i) {
                return this.iterator("column", function (e, t) {
                    var n = e.aoPreSearchCols;
                    if (void 0 === a)
                        return n[t].search;
                    e.oFeatures.bFilter && ("object" == typeof r ? H.extend(n[t], r, {
                        search: a
                    }) : H.extend(n[t], {
                        search: a,
                        regex: null !== r && r,
                        smart: null === o || o,
                        caseInsensitive: null === i || i
                    }),
                        Re(e, e.oPreviousSearch))
                })
            }),
            t(["columns().search.fixed()", "column().search.fixed()"], function (n, a) {
                var e = this.iterator(!0, "column", function (e, t) {
                    e = e.aoColumns[t].searchFixed;
                    return n ? void 0 === a ? e[n] : (null === a ? delete e[n] : e[n] = a,
                        this) : Object.keys(e)
                });
                return void 0 !== n && void 0 === a ? e[0] : e
            }),
            t("state()", function (e, t) {
                var n;
                return e ? (n = H.extend(!0, {}, e),
                    this.iterator("table", function (e) {
                        !1 !== t && (n.time = +new Date + 100),
                            Ke(e, n, function () { })
                    })) : this.context.length ? this.context[0].oSavedState : null
            }),
            t("state.clear()", function () {
                return this.iterator("table", function (e) {
                    e.fnStateSaveCallback.call(e.oInstance, e, {})
                })
            }),
            t("state.loaded()", function () {
                return this.context.length ? this.context[0].oLoadedState : null
            }),
            t("state.save()", function () {
                return this.iterator("table", function (e) {
                    Qe(e)
                })
            }),
            V.use = function (e, t) {
                var n = "string" == typeof e ? t : e
                    , t = "string" == typeof t ? t : e;
                if (void 0 === n && "string" == typeof t)
                    switch (t) {
                        case "lib":
                        case "jq":
                            return H;
                        case "win":
                            return W;
                        case "datetime":
                            return V.DateTime;
                        case "luxon":
                            return o;
                        case "moment":
                            return i;
                        default:
                            return null
                    }
                "lib" === t || "jq" === t || n && n.fn && n.fn.jquery ? H = n : "win" == t || n && n.document ? _ = (W = n).document : "datetime" === t || n && "DateTime" === n.type ? V.DateTime = n : "luxon" === t || n && n.FixedOffsetZone ? o = n : ("moment" === t || n && n.isMoment) && (i = n)
            }
            ,
            V.factory = function (e, t) {
                var n = !1;
                return e && e.document && (_ = (W = e).document),
                    t && t.fn && t.fn.jquery && (H = t,
                        n = !0),
                    n
            }
            ,
            V.versionCheck = function (e, t) {
                for (var n, a, r = (t || V.version).split("."), o = e.split("."), i = 0, l = o.length; i < l; i++)
                    if ((n = parseInt(r[i], 10) || 0) !== (a = parseInt(o[i], 10) || 0))
                        return a < n;
                return !0
            }
            ,
            V.isDataTable = function (e) {
                var r = H(e).get(0)
                    , o = !1;
                return e instanceof V.Api || (H.each(V.settings, function (e, t) {
                    var n = t.nScrollHead ? H("table", t.nScrollHead)[0] : null
                        , a = t.nScrollFoot ? H("table", t.nScrollFoot)[0] : null;
                    t.nTable !== r && n !== r && a !== r || (o = !0)
                }),
                    o)
            }
            ,
            V.tables = function (t) {
                var e = !1
                    , n = (H.isPlainObject(t) && (e = t.api,
                        t = t.visible),
                        V.settings.filter(function (e) {
                            return !(t && !H(e.nTable).is(":visible"))
                        }).map(function (e) {
                            return e.nTable
                        }));
                return e ? new X(n) : n
            }
            ,
            V.camelToHungarian = q,
            t("$()", function (e, t) {
                t = this.rows(t).nodes(),
                    t = H(t);
                return H([].concat(t.filter(e).toArray(), t.find(e).toArray()))
            }),
            H.each(["on", "one", "off"], function (e, n) {
                t(n + "()", function () {
                    var e = Array.prototype.slice.call(arguments)
                        , t = (e[0] = e[0].split(/\s/).map(function (e) {
                            return e.match(/\.dt\b/) ? e : e + ".dt"
                        }).join(" "),
                            H(this.tables().nodes()));
                    return t[n].apply(t, e),
                        this
                })
            }),
            t("clear()", function () {
                return this.iterator("table", function (e) {
                    me(e)
                })
            }),
            t("error()", function (t) {
                return this.iterator("table", function (e) {
                    $(e, 0, t)
                })
            }),
            t("settings()", function () {
                return new X(this.context, this.context)
            }),
            t("init()", function () {
                var e = this.context;
                return e.length ? e[0].oInit : null
            }),
            t("data()", function () {
                return this.iterator("table", function (e) {
                    return m(e.aoData, "_aData")
                }).flatten()
            }),
            t("trigger()", function (t, n, a) {
                return this.iterator("table", function (e) {
                    return G(e, null, t, n, a)
                }).flatten()
            }),
            t("ready()", function (e) {
                var t = this.context;
                return e ? this.tables().every(function () {
                    this.context[0]._bInitComplete ? e.call(this) : this.on("init", function () {
                        e.call(this)
                    })
                }) : t.length ? t[0]._bInitComplete || !1 : null
            }),
            t("destroy()", function (c) {
                return c = c || !1,
                    this.iterator("table", function (e) {
                        var t = e.oClasses
                            , n = e.nTable
                            , a = e.nTBody
                            , r = e.nTHead
                            , o = e.nTFoot
                            , i = H(n)
                            , a = H(a)
                            , l = H(e.nTableWrapper)
                            , s = e.aoData.map(function (e) {
                                return e ? e.nTr : null
                            })
                            , u = t.order
                            , o = (e.bDestroying = !0,
                                G(e, "aoDestroyCallback", "destroy", [e], !0),
                                c || new X(e).columns().visible(!0),
                                l.off(".DT").find(":not(tbody *)").off(".DT"),
                                H(W).off(".DT-" + e.sInstance),
                                n != r.parentNode && (i.children("thead").detach(),
                                    i.append(r)),
                                o && n != o.parentNode && (i.children("tfoot").detach(),
                                    i.append(o)),
                                e.colgroup.remove(),
                                e.aaSorting = [],
                                e.aaSortingFixed = [],
                                Ze(e),
                                H("th, td", r).removeClass(u.canAsc + " " + u.canDesc + " " + u.isAsc + " " + u.isDesc).css("width", ""),
                                a.children().detach(),
                                a.append(s),
                                e.nTableWrapper.parentNode)
                            , r = e.nTableWrapper.nextSibling
                            , u = c ? "remove" : "detach"
                            , a = (i[u](),
                                l[u](),
                                !c && o && (o.insertBefore(n, r),
                                    i.css("width", e.sDestroyWidth).removeClass(t.table)),
                                V.settings.indexOf(e));
                        -1 !== a && V.settings.splice(a, 1)
                    })
            }),
            H.each(["column", "row", "cell"], function (e, s) {
                t(s + "s().every()", function (a) {
                    var r, o = this.selector.opts, i = this, l = 0;
                    return this.iterator("every", function (e, t, n) {
                        r = i[s](t, o),
                            "cell" === s ? a.call(r, r[0][0].row, r[0][0].column, n, l) : a.call(r, t, n, l),
                            l++
                    })
                })
            }),
            t("i18n()", function (e, t, n) {
                var a = this.context[0]
                    , e = U(e)(a.oLanguage);
                return "string" == typeof (e = H.isPlainObject(e = void 0 === e ? t : e) ? void 0 !== n && void 0 !== e[n] ? e[n] : e._ : e) ? e.replace("%d", n) : e
            }),
            V.version = "2.1.4",
            V.settings = [],
            V.models = {},
            V.models.oSearch = {
                caseInsensitive: !0,
                search: "",
                regex: !1,
                smart: !0,
                return: !1
            },
            V.models.oRow = {
                nTr: null,
                anCells: null,
                _aData: [],
                _aSortData: null,
                _aFilterData: null,
                _sFilterRow: null,
                src: null,
                idx: -1,
                displayData: null
            },
            V.models.oColumn = {
                idx: null,
                aDataSort: null,
                asSorting: null,
                bSearchable: null,
                bSortable: null,
                bVisible: null,
                _sManualType: null,
                _bAttrSrc: !1,
                fnCreatedCell: null,
                fnGetData: null,
                fnSetData: null,
                mData: null,
                mRender: null,
                sClass: null,
                sContentPadding: null,
                sDefaultContent: null,
                sName: null,
                sSortDataType: "std",
                sSortingClass: null,
                sTitle: null,
                sType: null,
                sWidth: null,
                sWidthOrig: null,
                maxLenString: null,
                searchFixed: null
            },
            V.defaults = {
                aaData: null,
                aaSorting: [[0, "asc"]],
                aaSortingFixed: [],
                ajax: null,
                aLengthMenu: [10, 25, 50, 100],
                aoColumns: null,
                aoColumnDefs: null,
                aoSearchCols: [],
                bAutoWidth: !0,
                bDeferRender: !0,
                bDestroy: !1,
                bFilter: !0,
                bInfo: !0,
                bLengthChange: !0,
                bPaginate: !0,
                bProcessing: !1,
                bRetrieve: !1,
                bScrollCollapse: !1,
                bServerSide: !1,
                bSort: !0,
                bSortMulti: !0,
                bSortCellsTop: null,
                bSortClasses: !0,
                bStateSave: !1,
                fnCreatedRow: null,
                fnDrawCallback: null,
                fnFooterCallback: null,
                fnFormatNumber: function (e) {
                    return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, this.oLanguage.sThousands)
                },
                fnHeaderCallback: null,
                fnInfoCallback: null,
                fnInitComplete: null,
                fnPreDrawCallback: null,
                fnRowCallback: null,
                fnStateLoadCallback: function (e) {
                    try {
                        return JSON.parse((-1 === e.iStateDuration ? sessionStorage : localStorage).getItem("DataTables_" + e.sInstance + "_" + location.pathname))
                    } catch (e) {
                        return {}
                    }
                },
                fnStateLoadParams: null,
                fnStateLoaded: null,
                fnStateSaveCallback: function (e, t) {
                    try {
                        (-1 === e.iStateDuration ? sessionStorage : localStorage).setItem("DataTables_" + e.sInstance + "_" + location.pathname, JSON.stringify(t))
                    } catch (e) { }
                },
                fnStateSaveParams: null,
                iStateDuration: 7200,
                iDisplayLength: 10,
                iDisplayStart: 0,
                iTabIndex: 0,
                oClasses: {},
                oLanguage: {
                    oAria: {
                        orderable: ": Activate to sort",
                        orderableReverse: ": Activate to invert sorting",
                        orderableRemove: ": Activate to remove sorting",
                        paginate: {
                            first: "First",
                            last: "Last",
                            next: "Next",
                            previous: "Previous",
                            number: ""
                        }
                    },
                    oPaginate: {
                        sFirst: "«",
                        sLast: "»",
                        sNext: "›",
                        sPrevious: "‹"
                    },
                    entries: {
                        _: "entries",
                        1: "entry"
                    },
                    sEmptyTable: "No data available in table",
                    sInfo: "Showing _START_ to _END_ of _TOTAL_ _ENTRIES-TOTAL_",
                    sInfoEmpty: "Showing 0 to 0 of 0 _ENTRIES-TOTAL_",
                    sInfoFiltered: "(filtered from _MAX_ total _ENTRIES-MAX_)",
                    sInfoPostFix: "",
                    sDecimal: "",
                    sThousands: ",",
                    sLengthMenu: "_MENU_ _ENTRIES_ per page",
                    sLoadingRecords: "Loading...",
                    sProcessing: "",
                    sSearch: "Search:",
                    sSearchPlaceholder: "",
                    sUrl: "",
                    sZeroRecords: "No matching records found"
                },
                orderDescReverse: !0,
                oSearch: H.extend({}, V.models.oSearch),
                layout: {
                    topStart: "pageLength",
                    topEnd: "search",
                    bottomStart: "info",
                    bottomEnd: "paging"
                },
                sDom: null,
                searchDelay: null,
                sPaginationType: "",
                sScrollX: "",
                sScrollXInner: "",
                sScrollY: "",
                sServerMethod: "GET",
                renderer: null,
                rowId: "DT_RowId",
                caption: null,
                iDeferLoading: null
            },
            Z(V.defaults),
            V.defaults.column = {
                aDataSort: null,
                iDataSort: -1,
                ariaTitle: "",
                asSorting: ["asc", "desc", ""],
                bSearchable: !0,
                bSortable: !0,
                bVisible: !0,
                fnCreatedCell: null,
                mData: null,
                mRender: null,
                sCellType: "td",
                sClass: "",
                sContentPadding: "",
                sDefaultContent: null,
                sName: "",
                sSortDataType: "std",
                sTitle: null,
                sType: null,
                sWidth: null
            },
            Z(V.defaults.column),
            V.models.oSettings = {
                oFeatures: {
                    bAutoWidth: null,
                    bDeferRender: null,
                    bFilter: null,
                    bInfo: !0,
                    bLengthChange: !0,
                    bPaginate: null,
                    bProcessing: null,
                    bServerSide: null,
                    bSort: null,
                    bSortMulti: null,
                    bSortClasses: null,
                    bStateSave: null
                },
                oScroll: {
                    bCollapse: null,
                    iBarWidth: 0,
                    sX: null,
                    sXInner: null,
                    sY: null
                },
                oLanguage: {
                    fnInfoCallback: null
                },
                oBrowser: {
                    bScrollbarLeft: !1,
                    barWidth: 0
                },
                ajax: null,
                aanFeatures: [],
                aoData: [],
                aiDisplay: [],
                aiDisplayMaster: [],
                aIds: {},
                aoColumns: [],
                aoHeader: [],
                aoFooter: [],
                oPreviousSearch: {},
                searchFixed: {},
                aoPreSearchCols: [],
                aaSorting: null,
                aaSortingFixed: [],
                sDestroyWidth: 0,
                aoRowCallback: [],
                aoHeaderCallback: [],
                aoFooterCallback: [],
                aoDrawCallback: [],
                aoRowCreatedCallback: [],
                aoPreDrawCallback: [],
                aoInitComplete: [],
                aoStateSaveParams: [],
                aoStateLoadParams: [],
                aoStateLoaded: [],
                sTableId: "",
                nTable: null,
                nTHead: null,
                nTFoot: null,
                nTBody: null,
                nTableWrapper: null,
                bInitialised: !1,
                aoOpenRows: [],
                sDom: null,
                searchDelay: null,
                sPaginationType: "two_button",
                pagingControls: 0,
                iStateDuration: 0,
                aoStateSave: [],
                aoStateLoad: [],
                oSavedState: null,
                oLoadedState: null,
                bAjaxDataGet: !0,
                jqXHR: null,
                json: void 0,
                oAjaxData: void 0,
                sServerMethod: null,
                fnFormatNumber: null,
                aLengthMenu: null,
                iDraw: 0,
                bDrawing: !1,
                iDrawError: -1,
                _iDisplayLength: 10,
                _iDisplayStart: 0,
                _iRecordsTotal: 0,
                _iRecordsDisplay: 0,
                oClasses: {},
                bFiltered: !1,
                bSorted: !1,
                bSortCellsTop: null,
                oInit: null,
                aoDestroyCallback: [],
                fnRecordsTotal: function () {
                    return "ssp" == J(this) ? +this._iRecordsTotal : this.aiDisplayMaster.length
                },
                fnRecordsDisplay: function () {
                    return "ssp" == J(this) ? +this._iRecordsDisplay : this.aiDisplay.length
                },
                fnDisplayEnd: function () {
                    var e = this._iDisplayLength
                        , t = this._iDisplayStart
                        , n = t + e
                        , a = this.aiDisplay.length
                        , r = this.oFeatures
                        , o = r.bPaginate;
                    return r.bServerSide ? !1 === o || -1 === e ? t + a : Math.min(t + e, this._iRecordsDisplay) : !o || a < n || -1 === e ? a : n
                },
                oInstance: null,
                sInstance: null,
                iTabIndex: 0,
                nScrollHead: null,
                nScrollFoot: null,
                aLastSort: [],
                oPlugins: {},
                rowIdFn: null,
                rowId: null,
                caption: "",
                captionNode: null,
                colgroup: null,
                deferLoading: null
            },
            V.ext.pager);
    H.extend(xt, {
        simple: function () {
            return ["previous", "next"]
        },
        full: function () {
            return ["first", "previous", "next", "last"]
        },
        numbers: function () {
            return ["numbers"]
        },
        simple_numbers: function () {
            return ["previous", "numbers", "next"]
        },
        full_numbers: function () {
            return ["first", "previous", "numbers", "next", "last"]
        },
        first_last: function () {
            return ["first", "last"]
        },
        first_last_numbers: function () {
            return ["first", "numbers", "last"]
        },
        _numbers: Et,
        numbers_length: 7
    }),
        H.extend(!0, V.ext.renderer, {
            pagingButton: {
                _: function (e, t, n, a, r) {
                    var e = e.oClasses.paging
                        , o = [e.button];
                    return a && o.push(e.active),
                        r && o.push(e.disabled),
                    {
                        display: a = "ellipsis" === t ? H('<span class="ellipsis"></span>').html(n)[0] : H("<button>", {
                            class: o.join(" "),
                            role: "link",
                            type: "button"
                        }).html(n),
                        clicker: a
                    }
                }
            },
            pagingContainer: {
                _: function (e, t) {
                    return t
                }
            }
        });
    function wt(e, t, n, a, r) {
        return i ? e[t](r) : o ? e[n](r) : a ? e[a](r) : e
    }
    var o, i, Tt = !1;
    function _t(e, t, n) {
        var a;
        if (W.luxon && !o && (o = W.luxon),
            i = W.moment && !i ? W.moment : i) {
            if (!(a = i.utc(e, t, n, !0)).isValid())
                return null
        } else if (o) {
            if (!(a = t && "string" == typeof e ? o.DateTime.fromFormat(e, t) : o.DateTime.fromISO(e)).isValid)
                return null;
            a.setLocale(n)
        } else
            t ? (Tt || alert("DataTables warning: Formatted date without Moment.js or Luxon - https://datatables.net/tn/17"),
                Tt = !0) : a = new Date(e);
        return a
    }
    function Ct(s) {
        return function (a, r, o, i) {
            0 === arguments.length ? (o = "en",
                a = r = null) : 1 === arguments.length ? (o = "en",
                    r = a,
                    a = null) : 2 === arguments.length && (o = r,
                        r = a,
                        a = null);
            var l = "datetime" + (r ? "-" + r : "");
            return V.ext.type.order[l] || V.type(l, {
                detect: function (e) {
                    return e === l && l
                },
                order: {
                    pre: function (e) {
                        return e.valueOf()
                    }
                },
                className: "dt-right"
            }),
                function (e, t) {
                    var n;
                    return null == e && (e = "--now" === i ? (n = new Date,
                        new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds()))) : ""),
                        "type" === t ? l : "" === e ? "sort" !== t ? "" : _t("0000-01-01 00:00:00", null, o) : !(null === r || a !== r || "sort" === t || "type" === t || e instanceof Date) || null === (n = _t(e, a, o)) ? e : "sort" === t ? n : (e = null === r ? wt(n, "toDate", "toJSDate", "")[s]() : wt(n, "format", "toFormat", "toISOString", r),
                            "display" === t ? u(e) : e)
                }
        }
    }
    var Lt = ","
        , It = ".";
    if (void 0 !== W.Intl)
        try {
            for (var At = (new Intl.NumberFormat).formatToParts(100000.1), a = 0; a < At.length; a++)
                "group" === At[a].type ? Lt = At[a].value : "decimal" === At[a].type && (It = At[a].value)
        } catch (e) { }
    V.datetime = function (n, a) {
        var r = "datetime-" + n;
        a = a || "en",
            V.ext.type.order[r] || V.type(r, {
                detect: function (e) {
                    var t = _t(e, n, a);
                    return !("" !== e && !t) && r
                },
                order: {
                    pre: function (e) {
                        return _t(e, n, a) || 0
                    }
                },
                className: "dt-right"
            })
    }
        ,
        V.render = {
            date: Ct("toLocaleDateString"),
            datetime: Ct("toLocaleString"),
            time: Ct("toLocaleTimeString"),
            number: function (r, o, i, l, s) {
                return null == r && (r = Lt),
                    null == o && (o = It),
                {
                    display: function (e) {
                        if ("number" != typeof e && "string" != typeof e)
                            return e;
                        if ("" === e || null === e)
                            return e;
                        var t = e < 0 ? "-" : ""
                            , n = parseFloat(e)
                            , a = Math.abs(n);
                        if (1e11 <= a || a < 1e-4 && 0 !== a)
                            return (a = n.toExponential(i).split(/e\+?/))[0] + " x 10<sup>" + a[1] + "</sup>";
                        if (isNaN(n))
                            return u(e);
                        n = n.toFixed(i),
                            e = Math.abs(n);
                        a = parseInt(e, 10),
                            n = i ? o + (e - a).toFixed(i).substring(2) : "";
                        return (t = 0 === a && 0 === parseFloat(n) ? "" : t) + (l || "") + a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, r) + n + (s || "")
                    }
                }
            },
            text: function () {
                return {
                    display: u,
                    filter: u
                }
            }
        };
    function Ft(e, t) {
        return e = e.toString().toLowerCase(),
            t = t.toString().toLowerCase(),
            e.localeCompare(t, navigator.languages[0] || navigator.language, {
                numeric: !0,
                ignorePunctuation: !0
            })
    }
    var l = V.ext.type
        , Nt = (V.type = function (n, e, t) {
            if (!e)
                return {
                    className: l.className[n],
                    detect: l.detect.find(function (e) {
                        return e.name === n
                    }),
                    order: {
                        pre: l.order[n + "-pre"],
                        asc: l.order[n + "-asc"],
                        desc: l.order[n + "-desc"]
                    },
                    render: l.render[n],
                    search: l.search[n]
                };
            function a(e, t) {
                l[e][n] = t
            }
            function r(e) {
                Object.defineProperty(e, "name", {
                    value: n
                });
                var t = l.detect.findIndex(function (e) {
                    return e.name === n
                });
                -1 === t ? l.detect.unshift(e) : l.detect.splice(t, 1, e)
            }
            function o(e) {
                l.order[n + "-pre"] = e.pre,
                    l.order[n + "-asc"] = e.asc,
                    l.order[n + "-desc"] = e.desc
            }
            void 0 === t && (t = e,
                e = null),
                "className" === e ? a("className", t) : "detect" === e ? r(t) : "order" === e ? o(t) : "render" === e ? a("render", t) : "search" === e ? a("search", t) : e || (t.className && a("className", t.className),
                    void 0 !== t.detect && r(t.detect),
                    t.order && o(t.order),
                    void 0 !== t.render && a("render", t.render),
                    void 0 !== t.search && a("search", t.search))
        }
            ,
            V.types = function () {
                return l.detect.map(function (e) {
                    return e.name
                })
            }
            ,
            V.type("string", {
                detect: function () {
                    return "string"
                },
                order: {
                    pre: function (e) {
                        return T(e) && "boolean" != typeof e ? "" : "string" == typeof e ? e.toLowerCase() : e.toString ? e.toString() : ""
                    }
                },
                search: gt(!1, !0)
            }),
            V.type("string-utf8", {
                detect: {
                    allOf: function (e) {
                        return !0
                    },
                    oneOf: function (e) {
                        return !T(e) && navigator.languages && "string" == typeof e && e.match(/[^\x00-\x7F]/)
                    }
                },
                order: {
                    asc: Ft,
                    desc: function (e, t) {
                        return -1 * Ft(e, t)
                    }
                },
                search: gt(!1, !0)
            }),
            V.type("html", {
                detect: {
                    allOf: function (e) {
                        return T(e) || "string" == typeof e && -1 !== e.indexOf("<")
                    },
                    oneOf: function (e) {
                        return !T(e) && "string" == typeof e && -1 !== e.indexOf("<")
                    }
                },
                order: {
                    pre: function (e) {
                        return T(e) ? "" : e.replace ? L(e).trim().toLowerCase() : e + ""
                    }
                },
                search: gt(!0, !0)
            }),
            V.type("date", {
                className: "dt-type-date",
                detect: {
                    allOf: function (e) {
                        var t;
                        return !e || e instanceof Date || R.test(e) ? null !== (t = Date.parse(e)) && !isNaN(t) || T(e) : null
                    },
                    oneOf: function (e) {
                        return e instanceof Date || "string" == typeof e && R.test(e)
                    }
                },
                order: {
                    pre: function (e) {
                        e = Date.parse(e);
                        return isNaN(e) ? -1 / 0 : e
                    }
                }
            }),
            V.type("html-num-fmt", {
                className: "dt-type-numeric",
                detect: {
                    allOf: function (e, t) {
                        t = t.oLanguage.sDecimal;
                        return c(e, t, !0, !1)
                    },
                    oneOf: function (e, t) {
                        t = t.oLanguage.sDecimal;
                        return c(e, t, !0, !1)
                    }
                },
                order: {
                    pre: function (e, t) {
                        t = t.oLanguage.sDecimal;
                        return Nt(e, t, N, P)
                    }
                },
                search: gt(!0, !0)
            }),
            V.type("html-num", {
                className: "dt-type-numeric",
                detect: {
                    allOf: function (e, t) {
                        t = t.oLanguage.sDecimal;
                        return c(e, t, !1, !0)
                    },
                    oneOf: function (e, t) {
                        t = t.oLanguage.sDecimal;
                        return c(e, t, !1, !1)
                    }
                },
                order: {
                    pre: function (e, t) {
                        t = t.oLanguage.sDecimal;
                        return Nt(e, t, N)
                    }
                },
                search: gt(!0, !0)
            }),
            V.type("num-fmt", {
                className: "dt-type-numeric",
                detect: {
                    allOf: function (e, t) {
                        t = t.oLanguage.sDecimal;
                        return s(e, t, !0, !0)
                    },
                    oneOf: function (e, t) {
                        t = t.oLanguage.sDecimal;
                        return s(e, t, !0, !1)
                    }
                },
                order: {
                    pre: function (e, t) {
                        t = t.oLanguage.sDecimal;
                        return Nt(e, t, P)
                    }
                }
            }),
            V.type("num", {
                className: "dt-type-numeric",
                detect: {
                    allOf: function (e, t) {
                        t = t.oLanguage.sDecimal;
                        return s(e, t, !1, !0)
                    },
                    oneOf: function (e, t) {
                        t = t.oLanguage.sDecimal;
                        return s(e, t, !1, !1)
                    }
                },
                order: {
                    pre: function (e, t) {
                        t = t.oLanguage.sDecimal;
                        return Nt(e, t)
                    }
                }
            }),
            function (e, t, n, a) {
                var r;
                return 0 === e || e && "-" !== e ? "number" == (r = typeof e) || "bigint" == r ? e : +(e = (e = t ? E(e, t) : e).replace && (n && (e = e.replace(n, "")),
                    a) ? e.replace(a, "") : e) : -1 / 0
            }
        );
    function jt(e, t, n) {
        n && (e[t] = n)
    }
    H.extend(!0, V.ext.renderer, {
        footer: {
            _: function (e, t, n) {
                t.addClass(n.tfoot.cell)
            }
        },
        header: {
            _: function (p, g, v) {
                g.addClass(v.thead.cell),
                    p.oFeatures.bSort || g.addClass(v.order.none);
                var e = p.bSortCellsTop
                    , t = g.closest("thead").find("tr")
                    , n = g.parent().index();
                "disable" === g.attr("data-dt-order") || "disable" === g.parent().attr("data-dt-order") || !0 === e && 0 !== n || !1 === e && n !== t.length - 1 || H(p.nTable).on("order.dt.DT column-visibility.dt.DT", function (e, t) {
                    if (p === t) {
                        var n = t.sortDetails;
                        if (n) {
                            for (var a = v.order, r = t.api.columns(g), o = p.aoColumns[r.flatten()[0]], i = r.orderable().includes(!0), l = "", s = r.indexes(), u = r.orderable(!0).flatten(), c = m(n, "col"), d = (g.removeClass(a.isAsc + " " + a.isDesc).toggleClass(a.none, !i).toggleClass(a.canAsc, i && u.includes("asc")).toggleClass(a.canDesc, i && u.includes("desc")),
                                !0), f = 0; f < s.length; f++)
                                c.includes(s[f]) || (d = !1);
                            d && (u = r.order(),
                                g.addClass(u.includes("asc") ? a.isAsc : "" + u.includes("desc") ? a.isDesc : ""));
                            var h = -1;
                            for (f = 0; f < c.length; f++)
                                if (p.aoColumns[c[f]].bVisible) {
                                    h = c[f];
                                    break
                                }
                            s[0] == h ? (r = n[0],
                                u = o.asSorting,
                                g.attr("aria-sort", "asc" === r.dir ? "ascending" : "descending"),
                                l = u[r.index + 1] ? "Reverse" : "Remove") : g.removeAttr("aria-sort"),
                                g.attr("aria-label", i ? o.ariaTitle + t.api.i18n("oAria.orderable" + l) : o.ariaTitle),
                                i && (g.find(".dt-column-title").attr("role", "button"),
                                    g.attr("tabindex", 0))
                        }
                    }
                })
            }
        },
        layout: {
            _: function (e, t, n) {
                var a = e.oClasses.layout
                    , r = H("<div/>").attr("id", n.id || null).addClass(n.className || a.row).appendTo(t);
                H.each(n, function (e, t) {
                    var n;
                    "id" !== e && "className" !== e && (n = "",
                        t.table && (r.addClass(a.tableRow),
                            n += a.tableCell + " "),
                        n += "start" === e ? a.start : "end" === e ? a.end : a.full,
                        H("<div/>").attr({
                            id: t.id || null,
                            class: t.className || a.cell + " " + n
                        }).append(t.contents).appendTo(r))
                })
            }
        }
    }),
        V.feature = {},
        V.feature.register = function (e, t, n) {
            V.ext.features[e] = t,
                n && C.feature.push({
                    cFeature: n,
                    fnInit: t
                })
        }
        ,
        V.feature.register("div", function (e, t) {
            var n = H("<div>")[0];
            return t && (jt(n, "className", t.className),
                jt(n, "id", t.id),
                jt(n, "innerHTML", t.html),
                jt(n, "textContent", t.text)),
                n
        }),
        V.feature.register("info", function (e, s) {
            var t, n, u;
            return e.oFeatures.bInfo ? (t = e.oLanguage,
                n = e.sTableId,
                u = H("<div/>", {
                    class: e.oClasses.info.container
                }),
                s = H.extend({
                    callback: t.fnInfoCallback,
                    empty: t.sInfoEmpty,
                    postfix: t.sInfoPostFix,
                    search: t.sInfoFiltered,
                    text: t.sInfo
                }, s),
                e.aoDrawCallback.push(function (e) {
                    var t = s
                        , n = u
                        , a = e._iDisplayStart + 1
                        , r = e.fnDisplayEnd()
                        , o = e.fnRecordsTotal()
                        , i = e.fnRecordsDisplay()
                        , l = i ? t.text : t.empty;
                    i !== o && (l += " " + t.search),
                        l += t.postfix,
                        l = rt(e, l),
                        t.callback && (l = t.callback.call(e.oInstance, e, a, r, o, i, l)),
                        n.html(l),
                        G(e, null, "info", [e, n[0], l])
                }),
                e._infoEl || (u.attr({
                    "aria-live": "polite",
                    id: n + "_info",
                    role: "status"
                }),
                    H(e.nTable).attr("aria-describedby", n + "_info"),
                    e._infoEl = u),
                u) : null
        }, "i");
    var Rt = 0;
    function Ot(e) {
        var t = [];
        return e.numbers && t.push("numbers"),
            e.previousNext && (t.unshift("previous"),
                t.push("next")),
            e.firstLast && (t.unshift("first"),
                t.push("last")),
            t
    }
    function Pt(e, t, n, a) {
        var r = e.oLanguage.oPaginate
            , o = {
                display: "",
                active: !1,
                disabled: !1
            };
        switch (t) {
            case "ellipsis":
                o.display = "&#x2026;",
                    o.disabled = !0;
                break;
            case "first":
                o.display = r.sFirst,
                    0 === n && (o.disabled = !0);
                break;
            case "previous":
                o.display = r.sPrevious,
                    0 === n && (o.disabled = !0);
                break;
            case "next":
                o.display = r.sNext,
                    0 !== a && n !== a - 1 || (o.disabled = !0);
                break;
            case "last":
                o.display = r.sLast,
                    0 !== a && n !== a - 1 || (o.disabled = !0);
                break;
            default:
                "number" == typeof t && (o.display = e.fnFormatNumber(t + 1),
                    n === t) && (o.active = !0)
        }
        return o
    }
    function Et(e, t, n, a) {
        var r = []
            , o = Math.floor(n / 2)
            , i = a ? 2 : 1
            , l = a ? 1 : 0;
        return t <= n ? r = h(0, t) : 1 === n ? r = [e] : 3 === n ? e <= 1 ? r = [0, 1, "ellipsis"] : t - 2 <= e ? (r = h(t - 2, t)).unshift("ellipsis") : r = ["ellipsis", e, "ellipsis"] : e <= o ? ((r = h(0, n - i)).push("ellipsis"),
            a && r.push(t - 1)) : t - 1 - o <= e ? ((r = h(t - (n - i), t)).unshift("ellipsis"),
                a && r.unshift(0)) : ((r = h(e - o + i, e + o - l)).push("ellipsis"),
                    r.unshift("ellipsis"),
                    a && (r.push(t - 1),
                        r.unshift(0))),
            r
    }
    V.feature.register("search", function (n, a) {
        var e, t, r, o, i, l, s, u, c, d;
        return n.oFeatures.bFilter ? (e = n.oClasses.search,
            t = n.sTableId,
            c = n.oLanguage,
            r = n.oPreviousSearch,
            o = '<input type="search" class="' + e.input + '"/>',
            -1 === (a = H.extend({
                placeholder: c.sSearchPlaceholder,
                processing: !1,
                text: c.sSearch
            }, a)).text.indexOf("_INPUT_") && (a.text += "_INPUT_"),
            a.text = rt(n, a.text),
            c = a.text.match(/_INPUT_$/),
            s = a.text.match(/^_INPUT_/),
            i = a.text.replace(/_INPUT_/, ""),
            l = "<label>" + a.text + "</label>",
            s ? l = "_INPUT_<label>" + i + "</label>" : c && (l = "<label>" + i + "</label>_INPUT_"),
            (s = H("<div>").addClass(e.container).append(l.replace(/_INPUT_/, o))).find("label").attr("for", "dt-search-" + Rt),
            s.find("input").attr("id", "dt-search-" + Rt),
            Rt++,
            u = function (e) {
                var t = this.value;
                r.return && "Enter" !== e.key || t != r.search && Ve(n, a.processing, function () {
                    r.search = t,
                        Re(n, r),
                        n._iDisplayStart = 0,
                        S(n)
                })
            }
            ,
            c = null !== n.searchDelay ? n.searchDelay : 0,
            d = H("input", s).val(r.search).attr("placeholder", a.placeholder).on("keyup.DT search.DT input.DT paste.DT cut.DT", c ? V.util.debounce(u, c) : u).on("mouseup.DT", function (e) {
                setTimeout(function () {
                    u.call(d[0], e)
                }, 10)
            }).on("keypress.DT", function (e) {
                if (13 == e.keyCode)
                    return !1
            }).attr("aria-controls", t),
            H(n.nTable).on("search.dt.DT", function (e, t) {
                n === t && d[0] !== _.activeElement && d.val("function" != typeof r.search ? r.search : "")
            }),
            s) : null
    }, "f"),
        V.feature.register("paging", function (e, t) {
            if (!e.oFeatures.bPaginate)
                return null;
            t = H.extend({
                buttons: V.ext.pager.numbers_length,
                type: e.sPaginationType,
                boundaryNumbers: !0,
                firstLast: !0,
                previousNext: !0,
                numbers: !0
            }, t);
            function n() {
                !function e(t, n, a) {
                    if (!t._bInitComplete)
                        return;
                    var r = a.type ? V.ext.pager[a.type] : Ot
                        , o = t.oLanguage.oAria.paginate || {}
                        , i = t._iDisplayStart
                        , l = t._iDisplayLength
                        , s = t.fnRecordsDisplay()
                        , u = -1 === l
                        , c = u ? 0 : Math.ceil(i / l)
                        , d = u ? 1 : Math.ceil(s / l)
                        , f = r(a).map(function (e) {
                            return "numbers" === e ? Et(c, d, a.buttons, a.boundaryNumbers) : e
                        }).flat();
                    var h = [];
                    for (var p = 0; p < f.length; p++) {
                        var g = f[p]
                            , v = Pt(t, g, c, d)
                            , m = at(t, "pagingButton")(t, g, v.display, v.active, v.disabled)
                            , b = "string" == typeof g ? o[g] : o.number ? o.number + (g + 1) : null;
                        H(m.clicker).attr({
                            "aria-controls": t.sTableId,
                            "aria-disabled": v.disabled ? "true" : null,
                            "aria-current": v.active ? "page" : null,
                            "aria-label": b,
                            "data-dt-idx": g,
                            tabIndex: v.disabled ? -1 : t.iTabIndex || null
                        }),
                            "number" != typeof g && H(m.clicker).addClass(g),
                            tt(m.clicker, {
                                action: g
                            }, function (e) {
                                e.preventDefault(),
                                    Xe(t, e.data.action, !0)
                            }),
                            h.push(m.display)
                    }
                    i = at(t, "pagingContainer")(t, h);
                    u = n.find(_.activeElement).data("dt-idx");
                    n.empty().append(i);
                    void 0 !== u && n.find("[data-dt-idx=" + u + "]").trigger("focus");
                    h.length && 1 < a.buttons && H(n).height() >= 2 * H(h[0]).outerHeight() - 10 && e(t, n, H.extend({}, a, {
                        buttons: a.buttons - 2
                    }))
                }(e, a.children(), t)
            }
            var a = H("<div/>").addClass(e.oClasses.paging.container + (t.type ? " paging_" + t.type : "")).append("<nav>");
            return e.aoDrawCallback.push(n),
                H(e.nTable).on("column-sizing.dt.DT", n),
                a
        }, "p");
    var kt = 0;
    return V.feature.register("pageLength", function (a, e) {
        var t = a.oFeatures;
        if (!t.bPaginate || !t.bLengthChange)
            return null;
        e = H.extend({
            menu: a.aLengthMenu,
            text: a.oLanguage.sLengthMenu
        }, e);
        var t = a.oClasses.length
            , n = a.sTableId
            , r = e.menu
            , o = []
            , i = [];
        if (Array.isArray(r[0]))
            o = r[0],
                i = r[1];
        else
            for (p = 0; p < r.length; p++)
                H.isPlainObject(r[p]) ? (o.push(r[p].value),
                    i.push(r[p].label)) : (o.push(r[p]),
                        i.push(r[p]));
        for (var l = e.text.match(/_MENU_$/), s = e.text.match(/^_MENU_/), u = e.text.replace(/_MENU_/, ""), e = "<label>" + e.text + "</label>", s = (s ? e = "_MENU_<label>" + u + "</label>" : l && (e = "<label>" + u + "</label>_MENU_"),
            "tmp-" + +new Date), c = H("<div/>").addClass(t.container).append(e.replace("_MENU_", '<span id="' + s + '"></span>')), d = [], f = (c.find("label")[0].childNodes.forEach(function (e) {
                e.nodeType === Node.TEXT_NODE && d.push({
                    el: e,
                    text: e.textContent
                })
            }),
                function (t) {
                    d.forEach(function (e) {
                        e.el.textContent = rt(a, e.text, t)
                    })
                }
            ), h = H("<select/>", {
                name: n + "_length",
                "aria-controls": n,
                class: t.select
            }), p = 0; p < o.length; p++)
            h[0][p] = new Option("number" == typeof i[p] ? a.fnFormatNumber(i[p]) : i[p], o[p]);
        return c.find("label").attr("for", "dt-length-" + kt),
            h.attr("id", "dt-length-" + kt),
            kt++,
            c.find("#" + s).replaceWith(h),
            H("select", c).val(a._iDisplayLength).on("change.DT", function () {
                We(a, H(this).val()),
                    S(a)
            }),
            H(a.nTable).on("length.dt.DT", function (e, t, n) {
                a === t && (H("select", c).val(n),
                    f(n))
            }),
            f(a._iDisplayLength),
            c
    }, "l"),
        ((H.fn.dataTable = V).$ = H).fn.dataTableSettings = V.settings,
        H.fn.dataTableExt = V.ext,
        H.fn.DataTable = function (e) {
            return H(this).dataTable(e).api()
        }
        ,
        H.each(V, function (e, t) {
            H.fn.DataTable[e] = t
        }),
        V
});
