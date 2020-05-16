
var fixpower_cadence;
var counter_sensor_0 = 0;
!function (t) {
    function e(i) {
        if (n[i]) return n[i].exports; var r = n[i] = { i: i, l: !1, exports: {} };
        return t[i].call(r.exports, r, r.exports, e), r.l = !0, r.exports
    }
    var n = {};
    e.m = t,
        e.c = n,
        e.d = function (t, n, i) {
            e.o(t, n) || Object.defineProperty(t, n, { enumerable: !0, get: i })
        },
        e.r = function (t) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t, "__esModule", { value: !0 })
        },
        e.t = function (t, n) {
            if (1 & n && (t = e(t)), 8 & n) return t;
            if (4 & n && "object" == typeof t && t && t.__esModule) return t;
            var i = Object.create(null);
            if (e.r(i), Object.defineProperty(i, "default", { enumerable: !0, value: t }), 2 & n && "string" != typeof t)
                for (var r in t) e.d(i, r, function (e) { return t[e] }.bind(null, r));
            return i
        },
        e.n = function (t) {
            var n = t && t.__esModule ? function () { return t.default } : function () { return t }; return e.d(n, "a", n), n
        },
        e.o = function (t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }, e.p = "", e(e.s = 45)
}
    ([function (t) {
        var e = function () { return this }();
        try { e = e || new Function("return this")() }
        catch (t) { "object" == typeof window && (e = window) } t.exports = e
    },
    //With use strict mode, you can not, for example, use undeclared variables.
    function (t) {
        "use strict";
        t.exports = function (t, e, n) {
            if (!e) return t;
            for (var i in e) e.hasOwnProperty(i) && (t.hasOwnProperty(i) && !1 === n || t[i] === e[i] || (t[i] = e[i]));
            return t
        }
    },
    function (t, e, n) {
        "use strict";
        var i = n(1);
        t.exports = function (t, e) {
            "function" != typeof t && (e = t, t = Object);
            var n = function () {
                return this.initialize && this.initialize.apply(this, arguments) || this
            }, r = function () { }; return r.prototype = t.prototype, n.prototype = new r, i(n.prototype, e), n
        }
    },
    function (t) {
        "use strict";
        t.exports = {
            isURI: function (t) {
                return t && t.protocol && t.host && t.path
            },
            isSameOrigin: function (t) {
                return t.protocol === location.protocol && t.hostname === location.hostname && t.port === location.port
            },
            parse: function (t) {
                if ("string" != typeof t) return t;
                var e, n, i, r, s, o, a = {}, c = function (e, n) { t = t.replace(n, function (t) { return a[e] = t, "" }), a[e] = a[e] || "" };
                for (c("protocol", /^[a-z]+\:/i), c("host", /^\/\/[^\/\?#]+/), /^\//.test(t) || a.host || (t = location.pathname.replace(/[^\/]*$/, "") + t), c("pathname", /^[^\?#]*/), c("search", /^\?[^#]*/), c("hash", /^#.*/), a.protocol = a.protocol || location.protocol, a.host ? (a.host = a.host.substr(2), e = a.host.split(":"), a.hostname = e[0], a.port = e[1] || "") : (a.host = location.host, a.hostname = location.hostname, a.port = location.port), a.pathname = a.pathname || "/", a.path = a.pathname + a.search, o = {}, r = 0, s = (i = (n = a.search.replace(/^\?/, "")) ? n.split("&") : []).length; r < s; r++)e = i[r].split("="), o[decodeURIComponent(e[0] || "")] = decodeURIComponent(e[1] || ""); return a.query = o, a.href = this.stringify(a), a
            },
            stringify: function (t) {
                var e = t.protocol + "//" + t.hostname;
                return t.port && (e += ":" + t.port), e += t.pathname + this.queryString(t.query) + (t.hash || "")
            },
            queryString: function (t) {
                var e = [];
                for (var n in t) t.hasOwnProperty(n) && e.push(encodeURIComponent(n) + "=" + encodeURIComponent(t[n]));
                return 0 === e.length ? "" : "?" + e.join("&")
            }
        }
    },
    function (t, e, n) {
        "use strict";
        (function (e) {
            var i = n(2),
                r = n(19).Cookie,
                s = n(8),
                o = n(3),
                a = n(10),
                c = n(1),
                l = n(5),
                u = n(35),
                h = n(17),
                d = c(i({
                    className: "Transport",
                    DEFAULT_PORTS: { "http:": 80, "https:": 443, "ws:": 80, "wss:": 443 },
                    MAX_DELAY: 0,
                    batching: !0,
                    initialize: function (t, e) {
                        this._dispatcher = t,
                            this.endpoint = e,
                            this._outbox = [],
                            this._proxy = c({},
                                this._dispatcher.proxy),
                            this._proxy.origin || (this._proxy.origin = this._findProxy())
                    },
                    close: function () { },
                    encode: function () { return "" },
                    sendMessage: function (t) {
                        return this.debug("Client ? sending message to ?: ?",
                            this._dispatcher.clientId, o.stringify(this.endpoint), t),
                            this.batching ? (this._outbox.push(t), this._flushLargeBatch(), t.channel === h.HANDSHAKE ? this._publish(.01) : (t.channel === h.CONNECT && (this._connectMessage = t), this._publish(this.MAX_DELAY))) : s.resolve(this.request([t]))
                    },
                    _makePromise: function () {
                        var t = this;
                        this._requestPromise = this._requestPromise || new s(function (e) { t._resolvePromise = e })
                    },
                    _publish: function (t) {
                        return this._makePromise(), this.addTimeout("publish", t, function () { this._flush(), delete this._requestPromise }, this), this._requestPromise
                    },
                    _flush: function () {
                        this.removeTimeout("publish"), 1 < this._outbox.length && this._connectMessage && (this._connectMessage.advice = { timeout: 0 }), this._resolvePromise(this.request(this._outbox)), this._connectMessage = null, this._outbox = []
                    },
                    _flushLargeBatch: function () {
                        if (!(this.encode(this._outbox).length < this._dispatcher.maxRequestSize)) { var t = this._outbox.pop(); this._makePromise(), this._flush(), t && this._outbox.push(t) }
                    },
                    _receive: function (t) {
                        if (t) { t = [].concat(t), this.debug("Client ? received from ? via ?: ?", this._dispatcher.clientId, o.stringify(this.endpoint), this.connectionType, t); for (var e = 0, n = t.length; e < n; e++)this._dispatcher.handleResponse(t[e]) }
                    },
                    _handleError: function (t) {
                        t = [].concat(t), this.debug("Client ? failed to send to ? via ?: ?", this._dispatcher.clientId, o.stringify(this.endpoint), this.connectionType, t); for (var e = 0, n = t.length; e < n; e++)this._dispatcher.handleError(t[e])
                    },
                    _getCookies: function () {
                        var t = this._dispatcher.cookies, e = o.stringify(this.endpoint); return t ? a.map(t.getCookiesSync(e), function (t) { return t.cookieString() }).join("; ") : ""
                    },
                    _storeCookies: function (t) {
                        var e, n = this._dispatcher.cookies, i = o.stringify(this.endpoint); if (t && n) for (var s = 0, a = (t = [].concat(t)).length; s < a; s++)e = r.parse(t[s]), n.setCookieSync(e, i)
                    },
                    _findProxy: function () {
                        if (void 0 !== e) {
                            var t = this.endpoint.protocol; if (t) {
                                var n, i, r = t.replace(/:$/, "").toLowerCase() + "_proxy", s = r.toUpperCase(), o = e.env;
                                return "http_proxy" == r && o.REQUEST_METHOD ? (1 === (n = Object.keys(o).filter(function (t) { return /^http_proxy$/i.test(t) })).length ? n[0] === r && void 0 === o[s] && (i = o[r]) : 1 < n.length && (i = o[r]), i = i || o["CGI_" + s]) : (i = o[r] || o[s]) && !o[r] && console.warn("The environment variable " + s + " is discouraged. Use " + r + "."), i
                            }
                        }
                    }
                }), {
                    get: function (t, e, n, i, r) {
                        var s = t.endpoint;
                        a.asyncEach(this._transports, function (s, o) {
                            var c = s[0], l = s[1], u = t.endpointFor(c);
                            return 0 <= a.indexOf(n, c) ? o() : 0 > a.indexOf(e, c) ? (l.isUsable(t, u, function () { }), o()) : void l.isUsable(t, u, function (e) { if (!e) return o(); var n = l.hasOwnProperty("create") ? l.create(t, u) : new l(t, u); i.call(r, n) })
                        }, function () { throw new Error("Could not find a usable connection type for " + o.stringify(s)) })
                    },
                    register: function (t, e) {
                        this._transports.push([t, e]), e.prototype.connectionType = t
                    },
                    getConnectionTypes: function () {
                        return a.map(this._transports, function (t) { return t[0] })
                    },
                    _transports: []
                });
            c(d.prototype, l), c(d.prototype, u), t.exports = d
        }).call(this, n(34))
    },
    function (t, e, n) {
        "use strict";
        var i = n(6), r = {
            LOG_LEVELS: { fatal: 4, error: 3, warn: 2, info: 1, debug: 0 },
            writeLog: function (t, e) {
                var n = r.logger || (r.wrapper || r).logger;
                if (n) {
                    var s = Array.prototype.slice.apply(t), o = "[Faye", a = this.className, c = s.shift().replace(/\?/g,
                        function () {
                            try { return i(s.shift()) }
                            catch (t) { return "[Object]" }
                        });
                    a && (o += "." + a), o += "] ", "function" == typeof n[e] ? n[e](o + c) : "function" == typeof n && n(o + c)
                }
            }
        };
        for (var s in r.LOG_LEVELS) !function (t) { r[t] = function () { this.writeLog(arguments, t) } }(s); t.exports = r
    },
    function (t) {
        "use strict"; t.exports = function (t) {
            return JSON.stringify(t, function (t, e) { return this[t] instanceof Array ? this[t] : e })
        }
    },
    function (t, e, n) {
        "use strict"; (function (e) {
            var i = n(8);
            t.exports = {
                then: function (t, e) {
                    var n = this; return this._promise || (this._promise = new i(function (t, e) { n._resolve = t, n._reject = e })), 0 === arguments.length ? this._promise : this._promise.then(t, e)
                },
                callback: function (t, e) {
                    return this.then(function (n) { t.call(e, n) })
                },
                errback: function (t, e) {
                    return this.then(null, function (n) { t.call(e, n) })
                },
                timeout: function (t, n) {
                    this.then();
                    var i = this;
                    this._timer = e.setTimeout(function () { i._reject(n) }, 1e3 * t)
                },
                setDeferredStatus: function (t, n) {
                    this._timer && e.clearTimeout(this._timer), this.then(), "succeeded" === t ? this._resolve(n) : "failed" === t ? this._reject(n) : delete this._promise
                }
            }
        }).call(this, n(0))
    },
    function (t, e, n) {
        "use strict";
        var i = n(16),
            r = function (t) {
                return t
            },
            s = function (t) {
                throw t
            },
            o = function (t) {
                if (this._state = 0, this._onFulfilled = [], this._onRejected = [], "function" == typeof t) {
                    var e = this;
                    t(function (t) { h(e, t) }, function (t) { f(e, t) })
                }
            };
        o.prototype.then = function (t, e) {
            var n = new o; return a(this, t, n), c(this, e, n), n
        },
            o.prototype.catch = function (t) {
                return this.then(null, t)
            };
        var a = function (t, e, n) {
            "function" != typeof e && (e = r);
            var i = function (t) { l(e, t, n) }; 0 === t._state ? t._onFulfilled.push(i) : 1 === t._state && i(t._value)
        }, c = function (t, e, n) {
            "function" != typeof e && (e = s);
            var i = function (t) { l(e, t, n) }; 0 === t._state ? t._onRejected.push(i) : 2 === t._state && i(t._reason)
        }, l = function (t, e, n) {
            i(function () {
                u(t, e, n)
            })
        },
            u = function (t, e, n) {
                var i;
                try { i = t(e) }
                catch (t) { return f(n, t) } i === n ? f(n, new TypeError("Recursive promise chain detected")) : h(n, i)
            },
            h = function (t, e) {
                var n, i, r = !1;
                try {
                    if (n = typeof e, "function" != typeof (i = null !== e && ("function" === n || "object" === n) && e.then)) return d(t, e);
                    i.call(e, function (e) { r ^ (r = !0) && h(t, e) }, function (e) { r ^ (r = !0) && f(t, e) })
                }
                catch (e) { if (!(r ^ (r = !0))) return; f(t, e) }
            },
            d = function (t, e) {
                if (0 === t._state) { t._state = 1, t._value = e, t._onRejected = []; for (var n, i = t._onFulfilled; n = i.shift();)n(e) }
            },
            f = function (t, e) {
                if (0 === t._state) {
                    t._state = 2, t._reason = e, t._onFulfilled = [];
                    for (var n, i = t._onRejected; n = i.shift();)n(e)
                }
            };
        o.resolve = function (t) {
            return new o(function (e) { e(t) })
        },
            o.reject = function (t) {
                return new o(function (e, n) { n(t) })
            },
            o.all = function (t) {
                return new o(function (e, n) { var i, r = [], s = t.length; if (0 === s) return e(r); for (i = 0; i < s; i++)!function (t, i) { o.resolve(t).then(function (t) { r[i] = t, 0 == --s && e(r) }, n) }(t[i], i) })
            },
            o.race = function (t) {
                return new o(function (e, n) {
                    for (var i = 0, r = t.length; i < r; i++)o.resolve(t[i]).then(e, n)
                })
            },
            o.deferred = o.pending = function () {
                var t = {};
                return t.promise = new o(function (e, n) { t.resolve = e, t.reject = n }), t
            },
            t.exports = o
    },
    function (t, e) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 });
        var n = { fullscreenEnabled: 0, fullscreenElement: 1, requestFullscreen: 2, exitFullscreen: 3, fullscreenchange: 4, fullscreenerror: 5 }, i = ["webkitFullscreenEnabled", "webkitFullscreenElement", "webkitRequestFullscreen", "webkitExitFullscreen", "webkitfullscreenchange", "webkitfullscreenerror"], r = ["mozFullScreenEnabled", "mozFullScreenElement", "mozRequestFullScreen", "mozCancelFullScreen", "mozfullscreenchange", "mozfullscreenerror"], s = ["msFullscreenEnabled", "msFullscreenElement", "msRequestFullscreen", "msExitFullscreen", "MSFullscreenChange", "MSFullscreenError"], o = "undefined" != typeof window && void 0 !== window.document ? window.document : {}, a = "fullscreenEnabled" in o && Object.keys(n) || i[0] in o && i || r[0] in o && r || s[0] in o && s || []; e.default = { requestFullscreen: function (t) { return t[a[n.requestFullscreen]]() }, requestFullscreenFunction: function (t) { return t[a[n.requestFullscreen]] }, get exitFullscreen() { return o[a[n.exitFullscreen]].bind(o) }, addEventListener: function (t, e, i) { return o.addEventListener(a[n[t]], e, i) }, removeEventListener: function (t, e, i) { return o.removeEventListener(a[n[t]], e, i) }, get fullscreenEnabled() { return !!o[a[n.fullscreenEnabled]] }, set fullscreenEnabled(t) { }, get fullscreenElement() { return o[a[n.fullscreenElement]] }, set fullscreenElement(t) { }, get onfullscreenchange() { return o[("on" + a[n.fullscreenchange]).toLowerCase()] }, set onfullscreenchange(t) { return o[("on" + a[n.fullscreenchange]).toLowerCase()] = t }, get onfullscreenerror() { return o[("on" + a[n.fullscreenerror]).toLowerCase()] }, set onfullscreenerror(t) { return o[("on" + a[n.fullscreenerror]).toLowerCase()] = t } }
    },
    function (t) {
        "use strict";
        t.exports = {
            commonElement: function (t, e) {
                for (var n = 0, i = t.length; n < i; n++)
                    if (-1 !== this.indexOf(e, t[n])) return t[n];
                return null
            },
            indexOf: function (t, e) {
                if (t.indexOf) return t.indexOf(e);
                for (var n = 0, i = t.length; n < i; n++)if (t[n] === e) return n;
                return -1
            },
            map: function (t, e, n) {
                if (t.map) return t.map(e, n);
                var i = [];
                if (t instanceof Array)
                    for (var r = 0, s = t.length; r < s; r++)i.push(e.call(n || null, t[r], r));
                else for (var o in t) t.hasOwnProperty(o) && i.push(e.call(n || null, o, t[o]));
                return i
            },
            filter: function (t, e, n) {
                if (t.filter) return t.filter(e, n);
                for (var i = [], r = 0, s = t.length; r < s; r++)e.call(n || null, t[r], r) && i.push(t[r]);
                return i
            },
            asyncEach: function (t, e, n, i) {
                var r = t.length, s = -1, o = 0, a = !1, c = function () {
                    o += 1, function () {
                        if (!a) { for (a = !0; 0 < o;)o -= 1, (s += 1) === r ? n && n.call(i) : e(t[s], c); a = !1 }
                    }()
                };
                c()
            }
        }
    },
    function (t, e, n) {
        "use strict";
        (function (e) {
            var n = {
                _registry: [],
                on: function (t, e, n, i) {
                    var r = function () {
                        n.call(i)
                    };
                    t.addEventListener ? t.addEventListener(e, r, !1) : t.attachEvent("on" + e, r),
                        this._registry.push({ _element: t, _type: e, _callback: n, _context: i, _handler: r })
                },
                detach: function (t, e, n, i) {
                    for (var r, s = this._registry.length; s--;)r = this._registry[s], t && t !== r._element || e && e !== r._type || n && n !== r._callback || i && i !== r._context || (r._element.removeEventListener ? r._element.removeEventListener(r._type, r._handler, !1) : r._element.detachEvent("on" + r._type, r._handler), this._registry.splice(s, 1), r = null)
                }
            };
            void 0 !== e.onunload && n.on(e, "unload", n.detach, n), t.exports = { Event: n }
        }).call(this, n(0))
    },
    function (t, e, n) {
        "use strict";
        var i = {
            countListeners: function (t) {
                return this.listeners(t).length
            },
            bind: function (t, e, n) {
                var i = Array.prototype.slice, r = function () { e.apply(n, i.call(arguments)) };
                return this._listeners = this._listeners || [],
                    this._listeners.push([t, e, n, r]),
                    this.on(t, r)
            },
            unbind: function (t, e, n) {
                this._listeners = this._listeners || [];
                for (var i, r = this._listeners.length; r--;)(i = this._listeners[r])[0] !== t || e && (i[1] !== e || i[2] !== n) || (this._listeners.splice(r, 1), this.removeListener(t, i[3]))
            }
        }; n(1)(i, n(31).prototype), i.trigger = i.emit, t.exports = i
    },
    function (t) {
        "use strict";
        var e = function (t) {
            var n, i, r;
            if (t instanceof Array) {
                for (n = [], i = t.length; i--;)n[i] = e(t[i]);
                return n
            }
            if ("object" == typeof t) {
                for (r in n = null === t ? null : {}, t) n[r] = e(t[r]);
                return n
            }
            return t
        };
        t.exports = e
    },
    function (t, e, n) {
        var i,
            r = Math.pow,
            s = function () {
                function t(t, e) {
                    if (!s[t]) { s[t] = {}; for (var n = 0; n < t.length; n++)s[t][t.charAt(n)] = n } return s[t][e]
                }
                var e = String.fromCharCode,
                    n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                    i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",
                    s = {},
                    o = {
                        compressToBase64: function (t) {
                            if (null == t) return "";
                            var e = o._compress(t, 6, function (t) { return n.charAt(t) });
                            switch (e.length % 4) {
                                default:
                                case 0: return e;
                                case 1: return e + "===";
                                case 2: return e + "==";
                                case 3: return e + "="
                            }
                        },
                        decompressFromBase64: function (e) {
                            return null == e ? "" : "" == e ? null : o._decompress(e.length, 32, function (i) { return t(n, e.charAt(i)) })
                        },
                        compressToUTF16: function (t) { return null == t ? "" : o._compress(t, 15, function (t) { return e(t + 32) }) + " " },
                        decompressFromUTF16: function (t) {
                            return null == t ? "" : "" == t ? null : o._decompress(t.length, 16384,
                                function (e) { return t.charCodeAt(e) - 32 })
                        },
                        compressToUint8Array: function (t) {
                            for (var e, n = o.compress(t), i = new Uint8Array(2 * n.length), r = 0, s = n.length; r < s; r++)e = n.charCodeAt(r), i[2 * r] = e >>> 8, i[2 * r + 1] = e % 256;
                            return i
                        },
                        decompressFromUint8Array: function (t) {
                            if (null == t) return o.decompress(t);
                            for (var n = Array(t.length / 2), i = 0, r = n.length; i < r; i++)n[i] = 256 * t[2 * i] + t[2 * i + 1];
                            var s = [];
                            return n.forEach(function (t) { s.push(e(t)) }), o.decompress(s.join(""))
                        },
                        compressToEncodedURIComponent: function (t) {
                            return null == t ? "" : o._compress(t, 6, function (t) { return i.charAt(t) })
                        },
                        decompressFromEncodedURIComponent: function (e) {
                            return null == e ? "" : "" == e ? null : (e = e.replace(/ /g, "+"), o._decompress(e.length, 32, function (n) { return t(i, e.charAt(n)) }))
                        },
                        compress: function (t) {
                            return o._compress(t, 16, function (t) { return e(t) })
                        },
                        _compress: function (t, e, n) {
                            if (null == t) return "";
                            var i, s, o, a = {}, c = {}, l = "", u = "", h = "", d = 2, f = 3, p = 2, g = [], m = 0, v = 0;
                            for (o = 0; o < t.length; o += 1)
                                if (l = t.charAt(o), Object.prototype.hasOwnProperty.call(a, l) || (a[l] = f++, c[l] = !0), u = h + l, Object.prototype.hasOwnProperty.call(a, u)) h = u;
                                else {
                                    if (Object.prototype.hasOwnProperty.call(c, h)) {
                                        if (256 > h.charCodeAt(0)) {
                                            for (i = 0; i < p; i++)m <<= 1, v == e - 1 ? (v = 0, g.push(n(m)), m = 0) : v++;
                                            for (s = h.charCodeAt(0), i = 0; 8 > i; i++)m = m << 1 | 1 & s, v == e - 1 ? (v = 0, g.push(n(m)), m = 0) : v++, s >>= 1
                                        }
                                        else {
                                            for (s = 1, i = 0; i < p; i++)m = m << 1 | s, v == e - 1 ? (v = 0, g.push(n(m)), m = 0) : v++, s = 0;
                                            for (s = h.charCodeAt(0), i = 0; 16 > i; i++)m = m << 1 | 1 & s, v == e - 1 ? (v = 0, g.push(n(m)), m = 0) : v++, s >>= 1
                                        }
                                        0 == --d && (d = r(2, p), p++), delete c[h]
                                    }
                                    else for (s = a[h], i = 0; i < p; i++)m = m << 1 | 1 & s, v == e - 1 ? (v = 0, g.push(n(m)), m = 0) : v++, s >>= 1; 0 == --d && (d = r(2, p), p++), a[u] = f++, h = l + ""
                                }
                            if ("" != h) {
                                if (Object.prototype.hasOwnProperty.call(c, h)) {
                                    if (256 > h.charCodeAt(0)) {
                                        for (i = 0; i < p; i++)m <<= 1, v == e - 1 ? (v = 0, g.push(n(m)), m = 0) : v++;
                                        for (s = h.charCodeAt(0), i = 0; 8 > i; i++)m = m << 1 | 1 & s, v == e - 1 ? (v = 0, g.push(n(m)), m = 0) : v++, s >>= 1
                                    }
                                    else {
                                        for (s = 1, i = 0; i < p; i++)m = m << 1 | s, v == e - 1 ? (v = 0, g.push(n(m)), m = 0) : v++, s = 0;
                                        for (s = h.charCodeAt(0), i = 0; 16 > i; i++)m = m << 1 | 1 & s, v == e - 1 ? (v = 0, g.push(n(m)), m = 0) : v++, s >>= 1
                                    }
                                    0 == --d && (d = r(2, p), p++), delete c[h]
                                }
                                else for (s = a[h], i = 0; i < p; i++)m = m << 1 | 1 & s, v == e - 1 ? (v = 0, g.push(n(m)), m = 0) : v++, s >>= 1; 0 == --d && (d = r(2, p), p++)
                            }
                            for (s = 2, i = 0; i < p; i++)m = m << 1 | 1 & s, v == e - 1 ? (v = 0, g.push(n(m)), m = 0) : v++, s >>= 1;
                            for (; ;) {
                                if (m <<= 1, v == e - 1) { g.push(n(m)); break } v++
                            }
                            return g.join("")
                        },
                        decompress: function (t) {
                            return null == t ? "" : "" == t ? null :
                                o._decompress(t.length, 32768, function (e) { return t.charCodeAt(e) })
                        },
                        _decompress: function (t, n, i) {
                            var s, o, a, c, l, u, h, d = [], f = 4, p = 4, g = 3, m = "", v = [], y = { val: i(0), position: n, index: 1 };
                            for (s = 0; 3 > s; s += 1)d[s] = s;
                            for (a = 0, l = 4, u = 1; u != l;)c = y.val & y.position, y.position >>= 1, 0 == y.position && (y.position = n, y.val = i(y.index++)), a |= (0 < c ? 1 : 0) * u, u <<= 1;
                            switch (a) {
                                case 0:
                                    for (a = 0, l = 256, u = 1; u != l;)c = y.val & y.position, y.position >>= 1, 0 == y.position && (y.position = n, y.val = i(y.index++)), a |= (0 < c ? 1 : 0) * u, u <<= 1; h = e(a);
                                    break;
                                case 1:
                                    for (a = 0, l = 65536, u = 1; u != l;)c = y.val & y.position, y.position >>= 1, 0 == y.position && (y.position = n, y.val = i(y.index++)), a |= (0 < c ? 1 : 0) * u, u <<= 1; h = e(a);
                                    break;
                                case 2: return ""
                            }
                            for (d[3] = h, o = h, v.push(h); ;) {
                                if (y.index > t) return "";
                                for (a = 0, l = r(2, g), u = 1; u != l;)c = y.val & y.position, y.position >>= 1, 0 == y.position && (y.position = n, y.val = i(y.index++)), a |= (0 < c ? 1 : 0) * u, u <<= 1;
                                switch (h = a) {
                                    case 0:
                                        for (a = 0, l = 256, u = 1; u != l;)c = y.val & y.position, y.position >>= 1, 0 == y.position && (y.position = n, y.val = i(y.index++)), a |= (0 < c ? 1 : 0) * u, u <<= 1; d[p++] = e(a), h = p - 1, f--;
                                        break;
                                    case 1:
                                        for (a = 0, l = 65536, u = 1; u != l;)c = y.val & y.position, y.position >>= 1, 0 == y.position && (y.position = n, y.val = i(y.index++)), a |= (0 < c ? 1 : 0) * u, u <<= 1; d[p++] = e(a), h = p - 1, f--;
                                        break;
                                    case 2: return v.join("")
                                }
                                if (0 == f && (f = r(2, g), g++), d[h]) m = d[h];
                                else {
                                    if (h !== p) return null; m = o + o.charAt(0)
                                }
                                v.push(m), d[p++] = o + m.charAt(0), o = m, 0 == --f && (f = r(2, g), g++)
                            }
                        }
                    };
                return o
            }();
        void 0 === (i = function () { return s }.call(e, n, e, t)) || (t.exports = i)
    },
    function (t) {
        t.exports = {
            VERSION: "1.2.4",
            BAYEUX_VERSION: "1.0",
            ID_LENGTH: 160,
            JSONP_CALLBACK: "jsonpcallback",
            CONNECTION_TYPES: ["long-polling", "cross-origin-long-polling", "callback-polling", "websocket", "eventsource", "in-process"],
            MANDATORY_CONNECTION_TYPES: ["long-polling", "callback-polling", "in-process"]
        }
    },
    function (t, e, n) {
        "use strict";
        function i(t) { var e; (e = o.length ? o.pop() : new r).task = t, s(e) }
        function r() { this.task = null } var s = n(29), o = [], a = [], c = s.makeRequestCallFromTimer(function () {
            if (a.length) throw a.shift()
        });
        t.exports = i,
            r.prototype.call = function () {
                try { this.task.call() }
                catch (t) { i.onerror ? i.onerror(t) : (a.push(t), c()) } finally { this.task = null, o[o.length] = this }
            }
    },
    function (t, e, n) {
        "use strict";
        var i = n(2), r = n(1), s = n(12), o = n(18), a = i({ initialize: function (t) { this.id = this.name = t }, push: function (t) { this.trigger("message", t) }, isUnused: function () { return 0 === this.countListeners("message") } }); r(a.prototype, s), r(a, {
            HANDSHAKE: "/meta/handshake",
            CONNECT: "/meta/connect",
            SUBSCRIBE: "/meta/subscribe",
            UNSUBSCRIBE: "/meta/unsubscribe",
            DISCONNECT: "/meta/disconnect",
            META: "meta",
            SERVICE: "service",
            expand: function (t) {
                var e = this.parse(t), n = ["/**", t], i = e.slice(); i[i.length - 1] = "*", n.push(this.unparse(i));
                for (var r = 1, s = e.length; r < s; r++)(i = e.slice(0, r)).push("**"), n.push(this.unparse(i));
                return n
            },
            isValid: function (t) {
                return o.CHANNEL_NAME.test(t) || o.CHANNEL_PATTERN.test(t)
            },
            parse: function (t) { return this.isValid(t) ? t.split("/").slice(1) : null },
            unparse: function (t) { return "/" + t.join("/") },
            isMeta: function (t) { var e = this.parse(t); return e ? e[0] === this.META : null },
            isService: function (t) { var e = this.parse(t); return e ? e[0] === this.SERVICE : null },
            isSubscribable: function (t) { return this.isValid(t) ? !this.isMeta(t) && !this.isService(t) : null },
            Set: i({
                initialize: function () { this._channels = {} },
                getKeys: function () { var t = []; for (var e in this._channels) t.push(e); return t },
                remove: function (t) { delete this._channels[t] },
                hasSubscription: function (t) { return this._channels.hasOwnProperty(t) },
                subscribe: function (t, e) { for (var n, i = 0, r = t.length; i < r; i++) { n = t[i], (this._channels[n] = this._channels[n] || new a(n)).bind("message", e) } },
                unsubscribe: function (t, e) { var n = this._channels[t]; return !!n && (n.unbind("message", e), !!n.isUnused() && (this.remove(t), !0)) },
                distributeMessage: function (t) { for (var e, n = a.expand(t.channel), i = 0, r = n.length; i < r; i++)(e = this._channels[n[i]]) && e.trigger("message", t) }
            })
        }), t.exports = a
    },
    function (t) {
        "use strict";
        t.exports = {
            CHANNEL_NAME: /^\/(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)))+(\/(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)))+)*$/,
            CHANNEL_PATTERN: /^(\/(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)))+)*\/\*{1,2}$/, ERROR: /^([0-9][0-9][0-9]:(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)| |\/|\*|\.))*(,(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)| |\/|\*|\.))*)*:(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)| |\/|\*|\.))*|[0-9][0-9][0-9]::(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)| |\/|\*|\.))*)$/,
            VERSION: /^([0-9])+(\.(([a-z]|[A-Z])|[0-9])(((([a-z]|[A-Z])|[0-9])|\-|\_))*)*$/
        }
    },
    function (t) {
        "use strict"; t.exports = {}
    },
    function (t, e, n) {
        "use strict";
        var i = n(2);
        t.exports = i({ initialize: function () { this._index = {} }, add: function (t) { var e = void 0 === t.id ? t : t.id; return !this._index.hasOwnProperty(e) && (this._index[e] = t, !0) }, forEach: function (t, e) { for (var n in this._index) this._index.hasOwnProperty(n) && t.call(e, this._index[n]) }, isEmpty: function () { for (var t in this._index) if (this._index.hasOwnProperty(t)) return !1; return !0 }, member: function (t) { for (var e in this._index) if (this._index[e] === t) return !0; return !1 }, remove: function (t) { var e = void 0 === t.id ? t : t.id, n = this._index[e]; return delete this._index[e], n }, toArray: function () { var t = []; return this.forEach(function (e) { t.push(e) }), t } })
    },
    function (t, e, n) {
        "use strict"; (function (e) {
            var i = n(2),
                r = n(3),
                s = n(11),
                o = n(1),
                a = n(6),
                c = o(i(n(4), {
                    encode: function (t) { return a(t) },
                    request: function (t) {
                        var n, i = this.endpoint.href, r = this;
                        if (e.XMLHttpRequest) n = new XMLHttpRequest;
                        else {
                            if (!e.ActiveXObject) return this._handleError(t);
                            n = new ActiveXObject("Microsoft.XMLHTTP")
                        }
                        n.open("POST", i, !0),
                            n.setRequestHeader("Content-Type", "application/json"),
                            n.setRequestHeader("Pragma", "no-cache"),
                            n.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                        var o = this._dispatcher.headers;
                        for (var a in o) o.hasOwnProperty(a) && n.setRequestHeader(a, o[a]);
                        var c = function () { n.abort() };
                        return void 0 !== e.onbeforeunload && s.Event.on(e, "beforeunload", c),
                            n.onreadystatechange = function () {
                                if (n && 4 === n.readyState) {
                                    var i = null,
                                        o = n.status,
                                        a = n.responseText;
                                    if (void 0 !== e.onbeforeunload && s.Event.detach(e, "beforeunload", c), n.onreadystatechange = function () { }, n = null, !(200 <= o && 300 > o || 304 === o || 1223 === o)) return r._handleError(t);
                                    try { i = JSON.parse(a) }
                                    catch (t) { } i ? r._receive(i) : r._handleError(t)
                                }
                            },
                            n.send(this.encode(t)), n
                    }
                }), { isUsable: function (t, e, n, i) { var s = "ReactNative" === navigator.product || r.isSameOrigin(e); n.call(i, s) } }); t.exports = c
        }).call(this, n(0))
    },
    function (t, e, n) {
        "use strict";
        var i = function (t, e) {
            this.message = t,
                this.options = e,
                this.attempts = 0
        };
        n(1)(i.prototype, {
            getTimeout: function () {
                return this.options.timeout
            },
            getInterval: function () {
                return this.options.interval
            },
            isDeliverable: function () {
                var t = this.options.attempts,
                    e = this.attempts,
                    n = this.options.deadline,
                    i = (new Date).getTime();
                return !(void 0 !== t && e >= t || void 0 !== n && i > n)
            },
            send: function () { this.attempts += 1 }, succeed: function () { }, fail: function () { }, abort: function () { }
        }), t.exports = i
    },
    function (t, e) {
        var n, i, r;
        /*!
         * mustache.js - Logic-less {{mustache}} templates with JavaScript
         * http://github.com/janl/mustache.js
         */
        /*!
         * mustache.js - Logic-less {{mustache}} templates with JavaScript
         * http://github.com/janl/mustache.js
         */
        !function (s, o) { e && "string" != typeof e.nodeName ? o(e) : (i = [e], void 0 === (r = "function" == typeof (n = o) ? n.apply(e, i) : n) || (t.exports = r)) }(0, function (t) {
            function e(t) { return "function" == typeof t }
            function n(t) { return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&") }
            function i(t, e) { return null != t && "object" == typeof t && e in t }
            function r(t) { return !function (t, e) { return h.call(t, e) }(d, t) }
            function s(e, i) {
                function s() {
                    if (w && !b) for (; _.length;)delete f[_.pop()];
                    else _ = []; w = !1, b = !1
                }
                function a(t) {
                    if ("string" == typeof t && (t = t.split(g, 2)), !u(t) || 2 !== t.length) throw new Error("Invalid tags: " + t); c = new RegExp(n(t[0]) + "\\s*"), l = new RegExp("\\s*" + n(t[1])), h = new RegExp("\\s*" + n("}" + t[1]))
                }
                if (!e) return [];
                var c, l, h, d = [], f = [], _ = [], w = !1, b = !1; a(i || t.tags);
                for (var E, S, x, T, k, C, N = new o(e); !N.eos();) {
                    if (E = N.pos, x = N.scanUntil(c))
                        for (var I = 0, A = x.length; I < A; ++I)r(T = x.charAt(I)) ? _.push(f.length) : b = !0, f.push(["text", T, E, E + 1]), E += 1, "\n" === T && s();
                    if (!N.scan(c)) break;
                    if (w = !0, S = N.scan(y) || "name", N.scan(p), "=" === S ? (x = N.scanUntil(m), N.scan(m), N.scanUntil(l)) : "{" === S ? (x = N.scanUntil(h), N.scan(v), N.scanUntil(l), S = "&") : x = N.scanUntil(l), !N.scan(l)) throw new Error("Unclosed tag at " + N.pos);
                    if (k = [S, x, E, N.pos], f.push(k), "#" === S || "^" === S) d.push(k);
                    else if ("/" === S) {
                        if (!(C = d.pop())) throw new Error('Unopened section "' + x + '" at ' + E);
                        if (C[1] !== x) throw new Error('Unclosed section "' + C[1] + '" at ' + E)
                    }
                    else "name" === S || "{" === S || "&" === S ? b = !0 : "=" === S && a(x)
                }
                if (C = d.pop()) throw new Error('Unclosed section "' + C[1] + '" at ' + N.pos);
                return function (t) {
                    for (var e, n = [], i = n, r = [], s = 0, o = t.length; s < o; ++s)switch (e = t[s], e[0]) {
                        case "#": case "^": i.push(e), r.push(e), i = e[4] = [];
                            break;
                        case "/": r.pop()[5] = e[2], i = 0 < r.length ? r[r.length - 1][4] : n;
                            break;
                        default: i.push(e)
                    }
                    return n
                }(function (t) {
                    for (var e, n, i = [], r = 0, s = t.length; r < s; ++r)(e = t[r]) && ("text" === e[0] && n && "text" === n[0] ? (n[1] += e[1], n[3] = e[3]) : (i.push(e), n = e));
                    return i
                }(f))
            }
            function o(t) { this.string = t, this.tail = t, this.pos = 0 }
            function a(t, e) { this.view = t, this.cache = { ".": this.view }, this.parent = e }
            function c() { this.cache = {} } var l = Object.prototype.toString, u = Array.isArray || function (t) { return "[object Array]" === l.call(t) }, h = RegExp.prototype.test, d = /\S/, f = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "/": "&#x2F;", "`": "&#x60;", "=": "&#x3D;" }, p = /\s*/, g = /\s+/, m = /\s*=/, v = /\s*\}/, y = /#|\^|\/|>|\{|&|=|!/; o.prototype.eos = function () { return "" === this.tail }, o.prototype.scan = function (t) { var e = this.tail.match(t); if (!e || 0 !== e.index) return ""; var n = e[0]; return this.tail = this.tail.substring(n.length), this.pos += n.length, n }, o.prototype.scanUntil = function (t) { var e, n = this.tail.search(t); return -1 === n ? (e = this.tail, this.tail = "") : 0 === n ? e = "" : (e = this.tail.substring(0, n), this.tail = this.tail.substring(n)), this.pos += e.length, e },
                a.prototype.push = function (t) { return new a(t, this) },
                a.prototype.lookup = function (t) {
                    var n, r = this.cache;
                    if (r.hasOwnProperty(t)) n = r[t];
                    else { for (var s, o, a = this, c = !1; a;) { if (0 < t.indexOf(".")) for (n = a.view, s = t.split("."), o = 0; null != n && o < s.length;)o === s.length - 1 && (c = i(n, s[o])), n = n[s[o++]]; else n = a.view[t], c = i(a.view, t); if (c) break; a = a.parent } r[t] = n } return e(n) && (n = n.call(this.view)), n
                },
                c.prototype.clearCache = function () { this.cache = {} },
                c.prototype.parse = function (t, e) {
                    var n = this.cache, i = n[t];
                    return null == i && (i = n[t] = s(t, e)), i
                },
                c.prototype.render = function (t, e, n) { var i = this.parse(t), r = e instanceof a ? e : new a(e); return this.renderTokens(i, r, n, t) },
                c.prototype.renderTokens = function (t, e, n, i) { for (var r, s, o, a = "", c = 0, l = t.length; c < l; ++c)o = void 0, "#" === (s = (r = t[c])[0]) ? o = this.renderSection(r, e, n, i) : "^" === s ? o = this.renderInverted(r, e, n, i) : ">" === s ? o = this.renderPartial(r, e, n, i) : "&" === s ? o = this.unescapedValue(r, e) : "name" === s ? o = this.escapedValue(r, e) : "text" === s && (o = this.rawValue(r)), void 0 !== o && (a += o); return a },
                c.prototype.renderSection = function (t, n, i, r) {
                    var s = this, o = "", a = n.lookup(t[1]);
                    if (a) {
                        if (u(a)) for (var c = 0, l = a.length; c < l; ++c)o += this.renderTokens(t[4], n.push(a[c]), i, r);
                        else if ("object" == typeof a || "string" == typeof a || "number" == typeof a) o += this.renderTokens(t[4], n.push(a), i, r);
                        else if (e(a)) {
                            if ("string" != typeof r) throw new Error("Cannot use higher-order sections without the original template");
                            null != (a = a.call(n.view, r.slice(t[3], t[5]), function (t) { return s.render(t, n, i) })) && (o += a)
                        }
                        else o += this.renderTokens(t[4], n, i, r);
                        return o
                    }
                },
                c.prototype.renderInverted = function (t, e, n, i) { var r = e.lookup(t[1]); if (!r || u(r) && 0 === r.length) return this.renderTokens(t[4], e, n, i) },
                c.prototype.renderPartial = function (t, n, i) { if (i) { var r = e(i) ? i(t[1]) : i[t[1]]; if (null != r) return this.renderTokens(this.parse(r), n, i, r) } },
                c.prototype.unescapedValue = function (t, e) { var n = e.lookup(t[1]); if (null != n) return n },
                c.prototype.escapedValue = function (e, n) { var i = n.lookup(e[1]); if (null != i) return t.escape(i) },
                c.prototype.rawValue = function (t) {
                    return t[1]
                },
                t.name = "mustache.js",
                t.version = "2.3.2",
                t.tags = ["{{", "}}"];
            var _ = new c;
            return t.clearCache = function () { return _.clearCache() },
                t.parse = function (t, e) { return _.parse(t, e) },
                t.render = function (t, e, n) { if ("string" != typeof t) throw new TypeError('Invalid template! Template should be a "string" but "' + function (t) { return u(t) ? "array" : typeof t }(t) + '" was given as the first argument for mustache#render(template, view, partials)'); return _.render(t, e, n) }, t.to_html = function (n, i, r, s) { var o = t.render(n, i, r); return e(s) ? void s(o) : o }, t.escape = function (t) { return (t + "").replace(/[&<>"'`=\/]/g, function (t) { return f[t] }) }, t.Scanner = o, t.Context = a, t.Writer = c, t
        })
    },
    function (t, e, n) {
        var i;
        !function () {
            "use strict"; function r(t, e) {
                var n = (65535 & t) + (65535 & e);
                return (t >> 16) + (e >> 16) + (n >> 16) << 16 | 65535 & n
            }
            function s(t, e, n, i, s, o) { return r(function (t, e) { return t << e | t >>> 32 - e }(r(r(e, t), r(i, o)), s), n) }
            function o(t, e, n, i, r, o, a) { return s(e & n | ~e & i, t, e, r, o, a) }
            function a(t, e, n, i, r, o, a) { return s(e & i | n & ~i, t, e, r, o, a) }
            function c(t, e, n, i, r, o, a) { return s(e ^ n ^ i, t, e, r, o, a) }
            function l(t, e, n, i, r, o, a) { return s(n ^ (e | ~i), t, e, r, o, a) }
            function u(t, e) {
                t[e >> 5] |= 128 << e % 32, t[14 + (e + 64 >>> 9 << 4)] = e;
                var n, i, s, u, h, d = 1732584193, f = -271733879, p = -1732584194, g = 271733878;
                for (n = 0; n < t.length; n += 16)i = d, s = f, u = p, h = g, d = o(d, f, p, g, t[n], 7, -680876936), g = o(g, d, f, p, t[n + 1], 12, -389564586), p = o(p, g, d, f, t[n + 2], 17, 606105819), f = o(f, p, g, d, t[n + 3], 22, -1044525330), d = o(d, f, p, g, t[n + 4], 7, -176418897), g = o(g, d, f, p, t[n + 5], 12, 1200080426), p = o(p, g, d, f, t[n + 6], 17, -1473231341), f = o(f, p, g, d, t[n + 7], 22, -45705983), d = o(d, f, p, g, t[n + 8], 7, 1770035416), g = o(g, d, f, p, t[n + 9], 12, -1958414417), p = o(p, g, d, f, t[n + 10], 17, -42063), f = o(f, p, g, d, t[n + 11], 22, -1990404162), d = o(d, f, p, g, t[n + 12], 7, 1804603682), g = o(g, d, f, p, t[n + 13], 12, -40341101), p = o(p, g, d, f, t[n + 14], 17, -1502002290), d = a(d, f = o(f, p, g, d, t[n + 15], 22, 1236535329), p, g, t[n + 1], 5, -165796510), g = a(g, d, f, p, t[n + 6], 9, -1069501632), p = a(p, g, d, f, t[n + 11], 14, 643717713), f = a(f, p, g, d, t[n], 20, -373897302), d = a(d, f, p, g, t[n + 5], 5, -701558691), g = a(g, d, f, p, t[n + 10], 9, 38016083), p = a(p, g, d, f, t[n + 15], 14, -660478335), f = a(f, p, g, d, t[n + 4], 20, -405537848), d = a(d, f, p, g, t[n + 9], 5, 568446438), g = a(g, d, f, p, t[n + 14], 9, -1019803690), p = a(p, g, d, f, t[n + 3], 14, -187363961), f = a(f, p, g, d, t[n + 8], 20, 1163531501), d = a(d, f, p, g, t[n + 13], 5, -1444681467), g = a(g, d, f, p, t[n + 2], 9, -51403784), p = a(p, g, d, f, t[n + 7], 14, 1735328473), d = c(d, f = a(f, p, g, d, t[n + 12], 20, -1926607734), p, g, t[n + 5], 4, -378558), g = c(g, d, f, p, t[n + 8], 11, -2022574463), p = c(p, g, d, f, t[n + 11], 16, 1839030562), f = c(f, p, g, d, t[n + 14], 23, -35309556), d = c(d, f, p, g, t[n + 1], 4, -1530992060), g = c(g, d, f, p, t[n + 4], 11, 1272893353), p = c(p, g, d, f, t[n + 7], 16, -155497632), f = c(f, p, g, d, t[n + 10], 23, -1094730640), d = c(d, f, p, g, t[n + 13], 4, 681279174), g = c(g, d, f, p, t[n], 11, -358537222), p = c(p, g, d, f, t[n + 3], 16, -722521979), f = c(f, p, g, d, t[n + 6], 23, 76029189), d = c(d, f, p, g, t[n + 9], 4, -640364487), g = c(g, d, f, p, t[n + 12], 11, -421815835), p = c(p, g, d, f, t[n + 15], 16, 530742520), d = l(d, f = c(f, p, g, d, t[n + 2], 23, -995338651), p, g, t[n], 6, -198630844), g = l(g, d, f, p, t[n + 7], 10, 1126891415), p = l(p, g, d, f, t[n + 14], 15, -1416354905), f = l(f, p, g, d, t[n + 5], 21, -57434055), d = l(d, f, p, g, t[n + 12], 6, 1700485571), g = l(g, d, f, p, t[n + 3], 10, -1894986606), p = l(p, g, d, f, t[n + 10], 15, -1051523), f = l(f, p, g, d, t[n + 1], 21, -2054922799), d = l(d, f, p, g, t[n + 8], 6, 1873313359), g = l(g, d, f, p, t[n + 15], 10, -30611744), p = l(p, g, d, f, t[n + 6], 15, -1560198380), f = l(f, p, g, d, t[n + 13], 21, 1309151649), d = l(d, f, p, g, t[n + 4], 6, -145523070), g = l(g, d, f, p, t[n + 11], 10, -1120210379), p = l(p, g, d, f, t[n + 2], 15, 718787259), f = l(f, p, g, d, t[n + 9], 21, -343485551), d = r(d, i), f = r(f, s), p = r(p, u), g = r(g, h); return [d, f, p, g]
            }
            function h(t) {
                var e, n = "", i = 32 * t.length;
                for (e = 0; e < i; e += 8)n += String.fromCharCode(255 & t[e >> 5] >>> e % 32);
                return n
            }
            function d(t) {
                var e, n = []; for (n[(t.length >> 2) - 1] = void 0, e = 0;
                    e < n.length; e += 1)n[e] = 0;
                var i = 8 * t.length; for (e = 0; e < i; e += 8)n[e >> 5] |= (255 & t.charCodeAt(e / 8)) << e % 32;
                return n
            }
            function f(t) {
                var e, n, i = "0123456789abcdef", r = "";
                for (n = 0; n < t.length; n += 1)e = t.charCodeAt(n), r += i.charAt(15 & e >>> 4) + i.charAt(15 & e);
                return r
            }
            function p(t) {
                return unescape(encodeURIComponent(t))
            }
            function g(t) {
                return function (t) { return h(u(d(t), 8 * t.length)) }(p(t))
            }
            function m(t, e) {
                return function (t, e) {
                    var n, i, r = d(t), s = [], o = [];
                    for (s[15] = o[15] = void 0, 16 < r.length && (r = u(r, 8 * t.length)), n = 0; 16 > n; n += 1)s[n] = 909522486 ^ r[n], o[n] = 1549556828 ^ r[n];
                    return i = u(s.concat(d(e)), 512 + 8 * e.length), h(u(o.concat(i), 640))
                }(p(t), p(e))
            }
            function v(t, e, n) {
                return e ? n ? m(e, t) : function (t, e) { return f(m(t, e)) }(e, t) : n ? g(t) : function (t) { return f(g(t)) }(t)
            }
            void 0 === (i = function () { return v }.call(e, n, e, t)) || (t.exports = i)
        }()
    },
    function (t, e, n) { "use strict"; var i = n(15), r = n(5), s = { VERSION: i.VERSION, Client: n(28), Scheduler: n(22) }; r.wrapper = s, t.exports = s },
    function (t, e, n) {
        "use strict"; (function (e) {
            /*!
            Copyright (C) 2015-2017 Andrea Giammarchi - @WebReflection
            
            Permission is hereby granted, free of charge, to any person obtaining a copy
            of this software and associated documentation files (the "Software"), to deal
            in the Software without restriction, including without limitation the rights
            to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
            copies of the Software, and to permit persons to whom the Software is
            furnished to do so, subject to the following conditions:
            
            The above copyright notice and this permission notice shall be included in
            all copies or substantial portions of the Software.
            
            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
            IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
            FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
            AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
            LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
            OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
            THE SOFTWARE.
            
            */
            function n(t) {
                var e, n, s, a, c, l, u = Object.create(null);
                if (this[d] = u, t) if ("string" == typeof t) for ("?" === t.charAt(0) && (t = t.slice(1)), c = 0, l = (a = t.split("&")).length; c < l; c++)-1 < (e = (s = a[c]).indexOf("=")) ? i(u, r(s.slice(0, e)), r(s.slice(e + 1))) : s.length && i(u, r(s), "");
                else if (o(t)) for (c = 0, l = t.length; c < l; c++)i(u, (s = t[c])[0], s[1]);
                else for (n in t) i(u, n, t[n])
            }
            function i(t, e, n) { e in t ? t[e].push("" + n) : t[e] = o(n) ? n : ["" + n] }
            function r(t) { return decodeURIComponent(t.replace(l, " ")) }
            function s(t) { return encodeURIComponent(t).replace(c, h) }
            var o = Array.isArray, a = n.prototype, c = /[!'\(\)~]|%20|%00/g, l = /\+/g, u = { "!": "%21", "'": "%27", "(": "%28", ")": "%29", "~": "%7E", "%20": "+", "%00": "\0" }, h = function (t) { return u[t] }, d = "__URLSearchParams__:" + Math.random();
            a.append = function (t, e) { i(this[d], t, e) },
                a.delete = function (t) { delete this[d][t] },
                a.get = function (t) { var e = this[d]; return t in e ? e[t][0] : null },
                a.getAll = function (t) { var e = this[d]; return t in e ? e[t].slice(0) : [] },
                a.has = function (t) { return t in this[d] },
                a.set = function (t, e) { this[d][t] = ["" + e] },
                a.forEach = function (t, e) {
                    var n = this[d];
                    Object.getOwnPropertyNames(n).forEach(function (i) { n[i].forEach(function (n) { t.call(e, n, i, this) }, this) }, this)
                },
                a.toJSON = function () {
                    return {}
                },
                a.toString = function () {
                    var t, e, n, i, r = this[d], o = []; for (e in r) for (n = s(e), t = 0, i = r[e]; t < i.length; t++)o.push(n + "=" + s(i[t])); return o.join("&")
                },
                function (t) {
                    var e = function () {
                        try {
                            return !!Symbol.iterator
                        }
                        catch (t) {
                            return !1
                        }
                    }();
                    "forEach" in t || (t.forEach = function (t, e) { var n = Object.create(null); this.toString().replace(/=[\s\S]*?(?:&|$)/g, "=").split("=").forEach(function (i) { !i.length || i in n || (n[i] = this.getAll(i)).forEach(function (n) { t.call(e, n, i, this) }, this) }, this) }),
                        "keys" in t || (t.keys = function () {
                            var t = []; this.forEach(function (e, n) { t.push(n) });
                            var n = {
                                next: function () {
                                    var e = t.shift();
                                    return { done: void 0 === e, value: e }
                                }
                            };
                            return e && (n[Symbol.iterator] = function () { return n }), n
                        }), "values" in t || (t.values = function () {
                            var t = []; this.forEach(function (e) { t.push(e) });
                            var n = { next: function () { var e = t.shift(); return { done: void 0 === e, value: e } } };
                            return e && (n[Symbol.iterator] = function () { return n }), n
                        }), "entries" in t || (t.entries = function () {
                            var t = []; this.forEach(function (e, n) { t.push([n, e]) });
                            var n = { next: function () { var e = t.shift(); return { done: void 0 === e, value: e } } };
                            return e && (n[Symbol.iterator] = function () { return n }), n
                        }), e && !(Symbol.iterator in t) && (t[Symbol.iterator] = t.entries), "sort" in t || (t.sort = function () {
                            for (var t, e, n, i = this.entries(), r = i.next(), s = r.done, o = [], a = Object.create(null); !s;)e = (n = r.value)[0], o.push(e), e in a || (a[e] = []), a[e].push(n[1]), s = (r = i.next()).done;
                            for (o.sort(), t = 0; t < o.length; t++)this.delete(o[t]);
                            for (t = 0; t < o.length; t++)e = o[t], this.append(e, a[e].shift())
                        })
                }((n = t.exports = e.URLSearchParams || n).prototype)
        }).call(this, n(0))
    },
    function (t, e, n) {
        (function (t) {
            !function () {
                function e(t) {
                    var e = 0;
                    return function () { return e < t.length ? { done: !1, value: t[e++] } : { done: !0 } }
                }
                function n() { n = function () { }, v.Symbol || (v.Symbol = _) }
                function i(t, e) { this.s = t, m(this, "description", { configurable: !0, writable: !0, value: e }) }
                function r() {
                    n();
                    var t = v.Symbol.iterator;
                    t || (t = v.Symbol.iterator = v.Symbol("Symbol.iterator")), "function" != typeof Array.prototype[t] && m(Array.prototype, t, { configurable: !0, writable: !0, value: function () { return function (t) { return r(), (t = { next: t })[v.Symbol.iterator] = function () { return this }, t }(e(this)) } }), r = function () { }
                }
                function s(t) {
                    var n = "undefined" != typeof Symbol && Symbol.iterator && t[Symbol.iterator];
                    return n ? n.call(t) : { next: e(t) }
                }
                function o() { this.h = !1, this.c = null, this.o = void 0, this.b = 1, this.m = this.w = 0, this.g = null }
                function a(t) { if (t.h) throw new TypeError("Generator is already running"); t.h = !0 }
                function c(t, e, n) { return t.b = n, { value: e } }
                function l(t) { for (var e in this.C = t, this.l = [], t) this.l.push(e); this.l.reverse() }
                function u(t) { this.a = new o, this.D = t }
                function h(t, e, n, i) {
                    try {
                        var r = e.call(t.a.c, n);
                        if (!(r instanceof Object)) throw new TypeError("Iterator result " + r + " is not an object");
                        if (!r.done) return t.a.h = !1, r; var s = r.value
                    }
                    catch (s) { return t.a.c = null, t.a.j(s), d(t) } return t.a.c = null, i.call(t.a, s), d(t)
                }
                function d(t) {
                    for (; t.a.b;)try {
                        var e = t.D(t.a);
                        if (e) return t.a.h = !1, { value: e.value, done: !1 }
                    }
                        catch (e) { t.a.o = void 0, t.a.j(e) } if (t.a.h = !1, t.a.g) {
                            if (e = t.a.g, t.a.g = null, e.B) throw e.A;
                            return { value: e.return, done: !0 }
                        }
                    return { value: void 0, done: !0 }
                }
                function f(t) {
                    this.next = function (e) { return t.i(e) }, this.throw = function (e) { return t.j(e) }, this.return = function (e) {
                        return function (t, e) {
                            a(t.a);
                            var n = t.a.c;
                            return n ? h(t, "return" in n ? n.return : function (t) { return { value: t, done: !0 } }, e, t.a.return) : (t.a.return(e), d(t))
                        }(t, e)
                    }, r(), this[Symbol.iterator] = function () { return this }
                } function p(t, e) {
                    var n = new f(new u(e));
                    return E && E(n, t.prototype), n
                } var g, m = "function" == typeof Object.defineProperties ? Object.defineProperty : function (t, e, n) { t != Array.prototype && t != Object.prototype && (t[e] = n.value) }, v = "undefined" != typeof window && window === this ? this : void 0 !== t && null != t ? t : this;
                i.prototype.toString = function () { return this.s };
                var y, _ = function () {
                    var t = 0; return function e(n) {
                        if (this instanceof e) throw new TypeError("Symbol is not a constructor");
                        return new i("jscomp_symbol_" + (n || "") + "_" + t++, n)
                    }
                }();
                if ("function" == typeof Object.setPrototypeOf) y = Object.setPrototypeOf;
                else { var w; t: { var b = {}; try { b.__proto__ = { v: !0 }, w = b.v; break t } catch (t) { } w = !1 } y = w ? function (t, e) { if (t.__proto__ = e, t.__proto__ !== e) throw new TypeError(t + " is not extensible"); return t } : null } var E = y;
                if (o.prototype.i = function (t) { this.o = t }, o.prototype.j = function (t) { this.g = { A: t, B: !0 }, this.b = this.w || this.m }, o.prototype.return = function (t) { this.g = { return: t }, this.b = this.m }, u.prototype.i = function (t) { return a(this.a), this.a.c ? h(this, this.a.c.next, t, this.a.i) : (this.a.i(t), d(this)) }, u.prototype.j = function (t) { return a(this.a), this.a.c ? h(this, this.a.c.throw, t, this.a.i) : (this.a.j(t), d(this)) }, "function" == typeof Blob && ("undefined" == typeof FormData || !FormData.prototype.keys)) {
                    var S = function (t, e) {
                        for (var n = 0; n < t.length; n++)e(t[n])
                    }, x = function (t, e, n) { return e instanceof Blob ? [t + "", e, void 0 === n ? "string" == typeof e.name ? e.name : "blob" : n + ""] : [t + "", e + ""] }, T = function (t, e) { if (t.length < e) throw new TypeError(e + " argument required, but only " + t.length + " present.") }, k = function (t) {
                        var e = s(t);
                        return t = e.next().value, e = e.next().value, t instanceof Blob && (t = new File([t], e, { type: t.type, lastModified: t.lastModified })), t
                    }, C = "object" == typeof window ? window : "object" == typeof self ? self : this, N = C.FormData, I = C.XMLHttpRequest && C.XMLHttpRequest.prototype.send, A = C.Request && C.fetch, M = C.navigator && C.navigator.sendBeacon;
                    n();
                    var O = C.Symbol && Symbol.toStringTag; O && (Blob.prototype[O] || (Blob.prototype[O] = "Blob"), "File" in C && !File.prototype[O] && (File.prototype[O] = "File"));
                    try { new File([], "") }
                    catch (t) { C.File = function (t, e, n) { return t = new Blob(t, n), n = n && void 0 !== n.lastModified ? new Date(n.lastModified) : new Date, Object.defineProperties(t, { name: { value: e }, lastModifiedDate: { value: n }, lastModified: { value: +n }, toString: { value: function () { return "[object File]" } } }), O && Object.defineProperty(t, O, { value: "File" }), t } } n(), r(); var L = function (t) {
                        if (this.f = Object.create(null), !t) return this; var e = this; S(t.elements,
                            function (t) {
                                if (t.name && !t.disabled && "submit" !== t.type && "button" !== t.type) if ("file" === t.type) {
                                    var n = t.files && t.files.length ? t.files : [new File([], "", { type: "application/octet-stream" })];
                                    S(n, function (n) { e.append(t.name, n) })
                                }
                                else "select-multiple" === t.type || "select-one" === t.type ? S(t.options, function (n) { !n.disabled && n.selected && e.append(t.name, n.value) }) : "checkbox" === t.type || "radio" === t.type ? t.checked && e.append(t.name, t.value) : (n = "textarea" === t.type ? t.value.replace(/\r\n/g, "\n").replace(/\n/g, "\r\n") : t.value, e.append(t.name, n))
                            })
                    };
                    if ((g = L.prototype).append = function (t, e, n) { T(arguments, 2); var i = s(x.apply(null, arguments)); t = i.next().value, e = i.next().value, n = i.next().value, (i = this.f)[t] || (i[t] = []), i[t].push([e, n]) }, g.delete = function (t) { T(arguments, 1), delete this.f[t + ""] }, g.entries = function t() { var e, n, i, r, o, a, u = this; return p(t, function (t) { switch (t.b) { case 1: e = u.f, i = new l(e); case 2: var h; t: { for (h = i; 0 < h.l.length;) { var d = h.l.pop(); if (d in h.C) { h = d; break t } } h = null } if (null == (n = h)) { t.b = 0; break } r = s(e[n]), o = r.next(); case 5: if (o.done) { t.b = 2; break } return a = o.value, c(t, [n, k(a)], 6); case 6: o = r.next(), t.b = 5 } }) }, g.forEach = function (t, e) { T(arguments, 1); for (var n, i = s(this), r = i.next(); !r.done; r = i.next())r = (n = s(r.value)).next().value, n = n.next().value, t.call(e, n, r, this) }, g.get = function (t) { T(arguments, 1); var e = this.f; return e[t += ""] ? k(e[t][0]) : null }, g.getAll = function (t) { return T(arguments, 1), (this.f[t + ""] || []).map(k) }, g.has = function (t) { return T(arguments, 1), t + "" in this.f }, g.keys = function t() { var e, n, i, r, o = this; return p(t, function (t) { return 1 == t.b && (e = s(o), n = e.next()), 3 != t.b ? n.done ? void (t.b = 0) : (i = n.value, r = s(i), c(t, r.next().value, 3)) : (n = e.next(), void (t.b = 2)) }) }, g.set = function () { T(arguments, 2); var t = x.apply(null, arguments); this.f[t[0]] = [[t[1], t[2]]] }, g.values = function t() { var e, n, i, r, o = this; return p(t, function (t) { return 1 == t.b && (e = s(o), n = e.next()), 3 != t.b ? n.done ? void (t.b = 0) : (i = n.value, (r = s(i)).next(), c(t, r.next().value, 3)) : (n = e.next(), void (t.b = 2)) }) }, L.prototype._asNative = function () { for (var t, e = new N, n = s(this), i = n.next(); !i.done; i = n.next())i = (t = s(i.value)).next().value, t = t.next().value, e.append(i, t); return e }, L.prototype._blob = function () { for (var t, e = "----formdata-polyfill-" + Math.random(), n = [], i = s(this), r = i.next(); !r.done; r = i.next())r = (t = s(r.value)).next().value, t = t.next().value, n.push("--" + e + "\r\n"), t instanceof Blob ? n.push('Content-Disposition: form-data; name="' + r + '"; filename="' + t.name + '"\r\n', "Content-Type: " + (t.type || "application/octet-stream") + "\r\n\r\n", t, "\r\n") : n.push('Content-Disposition: form-data; name="' + r + '"\r\n\r\n' + t + "\r\n"); return n.push("--" + e + "--"), new Blob(n, { type: "multipart/form-data; boundary=" + e }) }, L.prototype[Symbol.iterator] = function () { return this.entries() }, L.prototype.toString = function () { return "[object FormData]" }, O && (L.prototype[O] = "FormData"), I) { var D = C.XMLHttpRequest.prototype.setRequestHeader; C.XMLHttpRequest.prototype.setRequestHeader = function (t, e) { return "content-type" === t.toLowerCase() && (this.u = !0), D.call(this, t, e) }, C.XMLHttpRequest.prototype.send = function (t) { t instanceof L ? (t = t._blob(), this.u || this.setRequestHeader("Content-Type", t.type), I.call(this, t)) : I.call(this, t) } } if (A) { var R = C.fetch; C.fetch = function (t, e) { return e && e.body && e.body instanceof L && (e.body = e.body._blob()), R.call(this, t, e) } } M && (C.navigator.sendBeacon = function (t, e) { return e instanceof L && (e = e._asNative()), M.call(this, t, e) }), C.FormData = L
                }
            }()
        }).call(this, n(0))
    },
    function (t, e, n) {
        "use strict";
        (function (e) {
            var i = n(16),
                r = n(2),
                s = (n(8), n(3)),
                o = n(10),
                a = n(11),
                c = n(15),
                l = n(1),
                u = n(30),
                h = n(7),
                d = n(5),
                f = n(12),
                p = n(17),
                g = n(32),
                m = n(41),
                v = n(42),
                y = n(43),
                _ = n(44),
                w = r({
                    className: "Client",
                    UNCONNECTED: 1,
                    CONNECTING: 2,
                    CONNECTED: 3,
                    DISCONNECTED: 4,
                    HANDSHAKE: "handshake",
                    RETRY: "retry",
                    NONE: "none",
                    CONNECTION_TIMEOUT: 60,
                    DEFAULT_ENDPOINT: "/bayeux",
                    INTERVAL: 0,
                    initialize: function (t, n) {
                        this.info("New client created for ?", t), u(n = n || {}, ["interval", "timeout", "endpoints", "proxy", "retry", "scheduler", "websocketExtensions", "tls", "ca"]),
                            this._channels = new p.Set,
                            this._dispatcher = g.create(this, t || this.DEFAULT_ENDPOINT, n),
                            this._messageId = 0,
                            this._state = this.UNCONNECTED,
                            this._responseCallbacks = {},
                            this._advice = { reconnect: this.RETRY, interval: 1e3 * (n.interval || this.INTERVAL), timeout: 1e3 * (n.timeout || this.CONNECTION_TIMEOUT) },
                            this._dispatcher.timeout = this._advice.timeout / 1e3,
                            this._dispatcher.bind("message", this._receiveMessage, this), a.Event && void 0 !== e.onbeforeunload && a.Event.on(e, "beforeunload", function () { 0 > o.indexOf(this._dispatcher._disabled, "autodisconnect") && this.disconnect() }, this)
                    },
                    addWebsocketExtension: function (t) {
                        return this._dispatcher.addWebsocketExtension(t)
                    },
                    disable: function (t) {
                        return this._dispatcher.disable(t)
                    },
                    setHeader: function (t, e) {
                        return this._dispatcher.setHeader(t, e)
                    },
                    handshake: function (t, n) {
                        if (this._advice.reconnect !== this.NONE && this._state === this.UNCONNECTED) {
                            this._state = this.CONNECTING;
                            var r = this; this.info("Initiating handshake with ?", s.stringify(this._dispatcher.endpoint)), this._dispatcher.selectTransport(c.MANDATORY_CONNECTION_TYPES), this._sendMessage({ channel: p.HANDSHAKE, version: c.BAYEUX_VERSION, supportedConnectionTypes: this._dispatcher.getConnectionTypes() }, {}, function (s) { s.successful ? (this._state = this.CONNECTED, this._dispatcher.clientId = s.clientId, this._dispatcher.selectTransport(s.supportedConnectionTypes), this.info("Handshake successful: ?", this._dispatcher.clientId), this.subscribe(this._channels.getKeys(), !0), t && i(function () { t.call(n) })) : (this.info("Handshake unsuccessful"), e.setTimeout(function () { r.handshake(t, n) }, 1e3 * this._dispatcher.retry), this._state = this.UNCONNECTED) }, this)
                        }
                    },
                    connect: function (t, e) {
                        if (this._advice.reconnect !== this.NONE && this._state !== this.DISCONNECTED) { if (this._state === this.UNCONNECTED) return this.handshake(function () { this.connect(t, e) }, this); this.callback(t, e), this._state === this.CONNECTED && (this.info("Calling deferred actions for ?", this._dispatcher.clientId), this.setDeferredStatus("succeeded"), this.setDeferredStatus("unknown"), this._connectRequest || (this._connectRequest = !0, this.info("Initiating connection for ?", this._dispatcher.clientId), this._sendMessage({ channel: p.CONNECT, clientId: this._dispatcher.clientId, connectionType: this._dispatcher.connectionType }, {}, this._cycleConnection, this))) }
                    },
                    disconnect: function () {
                        if (this._state === this.CONNECTED) { this._state = this.DISCONNECTED, this.info("Disconnecting ?", this._dispatcher.clientId); var t = new y; return this._sendMessage({ channel: p.DISCONNECT, clientId: this._dispatcher.clientId }, {}, function (e) { e.successful ? (this._dispatcher.close(), t.setDeferredStatus("succeeded")) : t.setDeferredStatus("failed", m.parse(e.error)) }, this), this.info("Clearing channel listeners for ?", this._dispatcher.clientId), this._channels = new p.Set, t }
                    },
                    subscribe: function (t, e, n) {
                        if (t instanceof Array) return o.map(t, function (t) { return this.subscribe(t, e, n) }, this); var i = new _(this, t, e, n), r = !0 === e; return this._channels.hasSubscription(t) && !r ? (this._channels.subscribe([t], i), i.setDeferredStatus("succeeded"), i) : (this.connect(function () { this.info("Client ? attempting to subscribe to ?", this._dispatcher.clientId, t), r || this._channels.subscribe([t], i), this._sendMessage({ channel: p.SUBSCRIBE, clientId: this._dispatcher.clientId, subscription: t }, {}, function (e) { if (!e.successful) return i.setDeferredStatus("failed", m.parse(e.error)), this._channels.unsubscribe(t, i); var n = [].concat(e.subscription); this.info("Subscription acknowledged for ? to ?", this._dispatcher.clientId, n), i.setDeferredStatus("succeeded") }, this) }, this), i)
                    },
                    unsubscribe: function (t, e) {
                        if (t instanceof Array) return o.map(t, function (t) { return this.unsubscribe(t, e) }, this); this._channels.unsubscribe(t, e) && this.connect(function () { this.info("Client ? attempting to unsubscribe from ?", this._dispatcher.clientId, t), this._sendMessage({ channel: p.UNSUBSCRIBE, clientId: this._dispatcher.clientId, subscription: t }, {}, function (t) { if (t.successful) { var e = [].concat(t.subscription); this.info("Unsubscription acknowledged for ? from ?", this._dispatcher.clientId, e) } }, this) }, this)
                    },
                    publish: function (t, e, n) {
                        u(n || {}, ["attempts", "deadline"]); var i = new y; return this.connect(function () { this.info("Client ? queueing published message to ?: ?", this._dispatcher.clientId, t, e), this._sendMessage({ channel: t, data: e, clientId: this._dispatcher.clientId }, n, function (t) { t.successful ? i.setDeferredStatus("succeeded") : i.setDeferredStatus("failed", m.parse(t.error)) }, this) }, this), i
                    },
                    _sendMessage: function (t, e, n, i) {
                        t.id = this._generateMessageId(); var r = this._advice.timeout ? 1.2 * this._advice.timeout / 1e3 : 1.2 * this._dispatcher.retry; this.pipeThroughExtensions("outgoing", t, null, function (t) { t && (n && (this._responseCallbacks[t.id] = [n, i]), this._dispatcher.sendMessage(t, r, e || {})) }, this)
                    },
                    _generateMessageId: function () {
                        return this._messageId += 1, 4294967296 <= this._messageId && (this._messageId = 0), this._messageId.toString(36)
                    },
                    _receiveMessage: function (t) {
                        var e, n = t.id;
                        void 0 !== t.successful && (e = this._responseCallbacks[n], delete this._responseCallbacks[n]), this.pipeThroughExtensions("incoming", t, null, function (t) { t && (t.advice && this._handleAdvice(t.advice), this._deliverMessage(t), e && e[0].call(e[1], t)) }, this)
                    },
                    _handleAdvice: function (t) { l(this._advice, t), this._dispatcher.timeout = this._advice.timeout / 1e3, this._advice.reconnect === this.HANDSHAKE && this._state !== this.DISCONNECTED && (this._state = this.UNCONNECTED, this._dispatcher.clientId = null, this._cycleConnection()) }, _deliverMessage: function (t) { t.channel && void 0 !== t.data && (this.info("Client ? calling listeners for ? with ?", this._dispatcher.clientId, t.channel, t.data), this._channels.distributeMessage(t)) }, _cycleConnection: function () { this._connectRequest && (this._connectRequest = null, this.info("Closed connection for ?", this._dispatcher.clientId)); var t = this; e.setTimeout(function () { t.connect() }, this._advice.interval) }
                }); l(w.prototype, h), l(w.prototype, f), l(w.prototype, d), l(w.prototype, v), t.exports = w
        }).call(this, n(0))
    },
    function (t, e, n) {
        "use strict";
        (function (e) {
            function n(t) { o.length || (s(), !0), o[o.length] = t }
            function i() {
                for (; a < o.length;) {
                    var t = a;
                    if (++a, o[t].call(), a > c) {
                        for (var e = 0, n = o.length - a; e < n; e++)o[e] = o[e + a]; o.length -= a, a = 0
                    }
                }
                o.length = 0, a = 0, !1
            }
            function r(t) {
                return function () {
                    function e() { clearTimeout(n), clearInterval(i), t() } var n = setTimeout(e, 0), i = setInterval(e, 50)
                }
            }
            t.exports = n;
            var s, o = [],
                a = 0,
                c = 1024,
                l = void 0 === e ? self : e,
                u = l.MutationObserver || l.WebKitMutationObserver;
            s = "function" == typeof u ? function (t) { var e = 1, n = new u(t), i = document.createTextNode(""); return n.observe(i, { characterData: !0 }), function () { e = -e, i.data = e } }(i) : r(i), n.requestFlush = s, n.makeRequestCallFromTimer = r
        }).call(this, n(0))
    },
    function (t, e, n) {
        "use strict";
        var i = n(10);
        t.exports = function (t, e) {
            for (var n in t)
                if (0 > i.indexOf(e, n)) throw new Error("Unrecognized option: " + n)
        }
    },
    function (t) {
        function e() { } var n = "function" == typeof Array.isArray ? Array.isArray : function (t) { return "[object Array]" === Object.prototype.toString.call(t) }; t.exports = e, e.prototype.emit = function (t) { if ("error" === t && (!this._events || !this._events.error || n(this._events.error) && !this._events.error.length)) throw arguments[1] instanceof Error ? arguments[1] : new Error("Uncaught, unspecified 'error' event."); if (!this._events) return !1; var e = this._events[t]; if (!e) return !1; if ("function" == typeof e) { switch (arguments.length) { case 1: e.call(this); break; case 2: e.call(this, arguments[1]); break; case 3: e.call(this, arguments[1], arguments[2]); break; default: var i = Array.prototype.slice.call(arguments, 1); e.apply(this, i) }return !0 } if (n(e)) { i = Array.prototype.slice.call(arguments, 1); for (var r = e.slice(), s = 0, o = r.length; s < o; s++)r[s].apply(this, i); return !0 } return !1 }, e.prototype.addListener = function (t, e) { if ("function" != typeof e) throw new Error("addListener only takes instances of Function"); return this._events || (this._events = {}), this.emit("newListener", t, e), this._events[t] ? n(this._events[t]) ? this._events[t].push(e) : this._events[t] = [this._events[t], e] : this._events[t] = e, this }, e.prototype.on = e.prototype.addListener, e.prototype.once = function (t, e) { var n = this; return n.on(t, function i() { n.removeListener(t, i), e.apply(this, arguments) }), this }, e.prototype.removeListener = function (t, e) { if ("function" != typeof e) throw new Error("removeListener only takes instances of Function"); if (!this._events || !this._events[t]) return this; var i = this._events[t]; if (n(i)) { var r = function (t, e) { if (t.indexOf) return t.indexOf(e); for (var n = 0; n < t.length; n++)if (e === t[n]) return n; return -1 }(i, e); if (0 > r) return this; i.splice(r, 1), 0 == i.length && delete this._events[t] } else this._events[t] === e && delete this._events[t]; return this }, e.prototype.removeAllListeners = function (t) { return 0 === arguments.length ? (this._events = {}, this) : (t && this._events && this._events[t] && (this._events[t] = null), this) }, e.prototype.listeners = function (t) { return this._events || (this._events = {}), this._events[t] || (this._events[t] = []), n(this._events[t]) || (this._events[t] = [this._events[t]]), this._events[t] }
    },
    function (t, e, n) {
        "use strict";
        (function (e) {
            var i = n(2), r = n(3), s = n(19), o = n(1), a = n(5), c = n(12), l = n(33), u = n(22), h = i({ className: "Dispatcher", MAX_REQUEST_SIZE: 2048, DEFAULT_RETRY: 5, UP: 1, DOWN: 2, initialize: function (t, e, n) { this._client = t, this.endpoint = r.parse(e), this._alternates = n.endpoints || {}, this.cookies = s.CookieJar && new s.CookieJar, this._disabled = [], this._envelopes = {}, this.headers = {}, this.retry = n.retry || this.DEFAULT_RETRY, this._scheduler = n.scheduler || u, this._state = 0, this.transports = {}, this.wsExtensions = [], this.proxy = n.proxy || {}, "string" == typeof this._proxy && (this._proxy = { origin: this._proxy }); var i = n.websocketExtensions; if (i) for (var o = 0, a = (i = [].concat(i)).length; o < a; o++)this.addWebsocketExtension(i[o]); for (var c in this.tls = n.tls || {}, this.tls.ca = this.tls.ca || n.ca, this._alternates) this._alternates[c] = r.parse(this._alternates[c]); this.maxRequestSize = this.MAX_REQUEST_SIZE }, endpointFor: function (t) { return this._alternates[t] || this.endpoint }, addWebsocketExtension: function (t) { this.wsExtensions.push(t) }, disable: function (t) { this._disabled.push(t) }, setHeader: function (t, e) { this.headers[t] = e }, close: function () { var t = this._transport; delete this._transport, t && t.close() }, getConnectionTypes: function () { return l.getConnectionTypes() }, selectTransport: function (t) { l.get(this, t, this._disabled, function (t) { this.debug("Selected ? transport for ?", t.connectionType, r.stringify(t.endpoint)), t === this._transport || (this._transport && this._transport.close(), this._transport = t, this.connectionType = t.connectionType) }, this) }, sendMessage: function (t, e, n) { n = n || {}; var i, r = t.id, s = n.attempts, o = n.deadline && (new Date).getTime() + 1e3 * n.deadline, a = this._envelopes[r]; a || (i = new this._scheduler(t, { timeout: e, interval: this.retry, attempts: s, deadline: o }), a = this._envelopes[r] = { message: t, scheduler: i }), this._sendEnvelope(a) }, _sendEnvelope: function (t) { if (this._transport && !t.request && !t.timer) { var n = t.message, i = t.scheduler, r = this; return i.isDeliverable() ? (t.timer = e.setTimeout(function () { r.handleError(n) }, 1e3 * i.getTimeout()), i.send(), void (t.request = this._transport.sendMessage(n))) : (i.abort(), void delete this._envelopes[n.id]) } }, handleResponse: function (t) { var n = this._envelopes[t.id]; void 0 !== t.successful && n && (n.scheduler.succeed(), delete this._envelopes[t.id], e.clearTimeout(n.timer)), this.trigger("message", t), this._state === this.UP || (this._state = this.UP, this._client.trigger("transport:up")) }, handleError: function (t, n) { var i = this._envelopes[t.id], r = i && i.request, s = this; if (r) { r.then(function (t) { t && t.abort && t.abort() }); var o = i.scheduler; o.fail(), e.clearTimeout(i.timer), i.request = i.timer = null, n ? this._sendEnvelope(i) : i.timer = e.setTimeout(function () { i.timer = null, s._sendEnvelope(i) }, 1e3 * o.getInterval()), this._state === this.DOWN || (this._state = this.DOWN, this._client.trigger("transport:down")) } } }); h.create = function (t, e, n) { return new h(t, e, n) }, o(h.prototype, c), o(h.prototype, a), t.exports = h
        }).call(this, n(0))
    },
    function (t, e, n) {
        "use strict";
        var i = n(4);
        i.register("websocket", n(36)), i.register("eventsource", n(38)), i.register("long-polling", n(21)), i.register("cross-origin-long-polling", n(39)), i.register("callback-polling", n(40)), t.exports = i
    },
    function (t) {
        function e() { throw new Error("setTimeout has not been defined") }
        function n() { throw new Error("clearTimeout has not been defined") }
        function i(t) {
            if (c === setTimeout) return setTimeout(t, 0);
            if ((c === e || !c) && setTimeout) return c = setTimeout, setTimeout(t, 0);
            try { return c(t, 0) }
            catch (e) {
                try { return c.call(null, t, 0) }
                catch (e) { return c.call(this, t, 0) }
            }
        }
        function r() { f && h && (f = !1, h.length ? d = h.concat(d) : p = -1, d.length && s()) }
        function s() {
            if (!f) {
                var t = i(r); f = !0;
                for (var e = d.length; e;) {
                    for (h = d, d = []; ++p < e;)h && h[p].run(); p = -1, e = d.length
                }
                h = null, f = !1, function (t) {
                    if (l === clearTimeout) return clearTimeout(t);
                    if ((l === n || !l) && clearTimeout) return l = clearTimeout, clearTimeout(t);
                    try { l(t) }
                    catch (e) {
                        try { return l.call(null, t) }
                        catch (e) { return l.call(this, t) }
                    }
                }(t)
            }
        }
        function o(t, e) {
            this.fun = t, this.array = e
        }
        function a() { } var c, l, u = t.exports = {}; !function () {
            try { c = "function" == typeof setTimeout ? setTimeout : e }
            catch (t) { c = e }
            try { l = "function" == typeof clearTimeout ? clearTimeout : n }
            catch (t) { l = n }
        }();
        var h, d = [], f = !1, p = -1; u.nextTick = function (t) {
            var e = Array(arguments.length - 1);
            if (1 < arguments.length)
                for (var n = 1; n < arguments.length; n++)e[n - 1] = arguments[n]; d.push(new o(t, e)), 1 !== d.length || f || i(s)
        },
            o.prototype.run = function () {
                this.fun.apply(null, this.array)
            },
            u.title = "browser",
            u.browser = !0,
            u.env = {},
            u.argv = [],
            u.version = "",
            u.versions = {},
            u.on = a,
            u.addListener = a,
            u.once = a,
            u.off = a,
            u.removeListener = a,
            u.removeAllListeners = a,
            u.emit = a,
            u.prependListener = a,
            u.prependOnceListener = a,
            u.listeners = function () { return [] },
            u.binding = function () { throw new Error("process.binding is not supported") },
            u.cwd = function () { return "/" },
            u.chdir = function () { throw new Error("process.chdir is not supported") },
            u.umask = function () { return 0 }
    },
    function (t, e, n) {
        "use strict"; (function (e) { t.exports = { addTimeout: function (t, n, i, r) { if (this._timeouts = this._timeouts || {}, !this._timeouts.hasOwnProperty(t)) { var s = this; this._timeouts[t] = e.setTimeout(function () { delete s._timeouts[t], i.call(r) }, 1e3 * n) } }, removeTimeout: function (t) { this._timeouts = this._timeouts || {}; var n = this._timeouts[t]; n && (e.clearTimeout(n), delete this._timeouts[t]) }, removeAllTimeouts: function () { for (var t in this._timeouts = this._timeouts || {}, this._timeouts) this.removeTimeout(t) } } }).call(this, n(0))
    },
    function (t, e, n) {
        "use strict"; (function (e) { var i = n(2), r = n(8), s = n(20), o = n(3), a = n(11), c = n(13), l = n(1), u = n(6), h = n(37), d = n(7), f = l(i(n(4), { UNCONNECTED: 1, CONNECTING: 2, CONNECTED: 3, batching: !1, isUsable: function (t, e) { this.callback(function () { t.call(e, !0) }), this.errback(function () { t.call(e, !1) }), this.connect() }, request: function (t) { this._pending = this._pending || new s; for (var e = 0, n = t.length; e < n; e++)this._pending.add(t[e]); var i = this, o = new r(function (e) { i.callback(function (n) { n && 1 === n.readyState && (n.send(u(t)), e(n)) }), i.connect() }); return { abort: function () { o.then(function (t) { t.close() }) } } }, connect: function () { if (!f._unloaded && (this._state = this._state || this.UNCONNECTED, this._state === this.UNCONNECTED)) { this._state = this.CONNECTING; var t = this._createSocket(); if (!t) return this.setDeferredStatus("failed"); var e = this; t.onopen = function () { t.headers && e._storeCookies(t.headers["set-cookie"]), e._socket = t, e._state = e.CONNECTED, e._everConnected = !0, e._ping(), e.setDeferredStatus("succeeded", t) }; var n = !1; t.onclose = t.onerror = function () { if (!n) { n = !0; var i = e._state === e.CONNECTED; t.onopen = t.onclose = t.onerror = t.onmessage = null, delete e._socket, e._state = e.UNCONNECTED, e.removeTimeout("ping"); var r = e._pending ? e._pending.toArray() : []; delete e._pending, i || e._everConnected ? (e.setDeferredStatus("unknown"), e._handleError(r, i)) : e.setDeferredStatus("failed") } }, t.onmessage = function (t) { var n; try { n = JSON.parse(t.data) } catch (t) { } if (n) { for (var i = 0, r = (n = [].concat(n)).length; i < r; i++)void 0 !== n[i].successful && e._pending.remove(n[i]); e._receive(n) } } } }, close: function () { this._socket && this._socket.close() }, _createSocket: function () { var t = f.getSocketUrl(this.endpoint), e = this._dispatcher.headers, n = this._dispatcher.wsExtensions, i = this._getCookies(), r = this._dispatcher.tls, s = { extensions: n, headers: e, proxy: this._proxy, tls: r }; return "" !== i && (s.headers.Cookie = i), h.create(t, [], s) }, _ping: function () { this._socket && 1 === this._socket.readyState && (this._socket.send("[]"), this.addTimeout("ping", this._dispatcher.timeout / 2, this._ping, this)) } }), { PROTOCOLS: { "http:": "ws:", "https:": "wss:" }, create: function (t, e) { var n = t.transports.websocket = t.transports.websocket || {}; return n[e.href] = n[e.href] || new this(t, e), n[e.href] }, getSocketUrl: function (t) { return (t = c(t)).protocol = this.PROTOCOLS[t.protocol], o.stringify(t) }, isUsable: function (t, e, n, i) { this.create(t, e).isUsable(n, i) } }); l(f.prototype, d), a.Event && void 0 !== e.onbeforeunload && a.Event.on(e, "beforeunload", function () { f._unloaded = !0 }), t.exports = f }).call(this, n(0))
    },
    function (t, e, n) {
        "use strict"; (function (e) { var n = e.MozWebSocket || e.WebSocket; t.exports = { create: function (t) { return "function" == typeof n ? new n(t) : null } } }).call(this, n(0))
    },
    function (t, e, n) {
        "use strict"; (function (e) { var i = n(2), r = n(3), s = n(13), o = n(1), a = n(7), c = n(4), l = n(21), u = o(i(c, { initialize: function (t, n) { if (c.prototype.initialize.call(this, t, n), !e.EventSource) return this.setDeferredStatus("failed"); this._xhr = new l(t, n), (n = s(n)).pathname += "/" + t.clientId; var i = new e.EventSource(r.stringify(n)), o = this; i.onopen = function () { o._everConnected = !0, o.setDeferredStatus("succeeded") }, i.onerror = function () { o._everConnected ? o._handleError([]) : (o.setDeferredStatus("failed"), i.close()) }, i.onmessage = function (t) { var e; try { e = JSON.parse(t.data) } catch (t) { } e ? o._receive(e) : o._handleError([]) }, this._socket = i }, close: function () { this._socket && (this._socket.onopen = this._socket.onerror = this._socket.onmessage = null, this._socket.close(), delete this._socket) }, isUsable: function (t, e) { this.callback(function () { t.call(e, !0) }), this.errback(function () { t.call(e, !1) }) }, encode: function (t) { return this._xhr.encode(t) }, request: function (t) { return this._xhr.request(t) } }), { isUsable: function (t, e, n, i) { return t.clientId ? void l.isUsable(t, e, function (r) { return r ? void this.create(t, e).isUsable(n, i) : n.call(i, !1) }, this) : n.call(i, !1) }, create: function (t, e) { var n = t.transports.eventsource = t.transports.eventsource || {}, i = t.clientId, o = s(e); return o.pathname += "/" + (i || ""), n[o = r.stringify(o)] = n[o] || new this(t, e), n[o] } }); o(u.prototype, a), t.exports = u }).call(this, n(0))
    },
    function (t, e, n) {
        "use strict"; (function (e) { var i = n(2), r = n(20), s = n(3), o = n(1), a = n(6), c = o(i(n(4), { encode: function (t) { return "message=" + encodeURIComponent(a(t)) }, request: function (t) { var n, i = e.XDomainRequest ? XDomainRequest : XMLHttpRequest, r = new i, o = ++c._id, a = this._dispatcher.headers, l = this; if (r.open("POST", s.stringify(this.endpoint), !0), r.setRequestHeader) for (n in r.setRequestHeader("Pragma", "no-cache"), a) a.hasOwnProperty(n) && r.setRequestHeader(n, a[n]); var u = function () { return !!r && (c._pending.remove(o), r.onload = r.onerror = r.ontimeout = r.onprogress = null, void (r = null)) }; return r.onload = function () { var e; try { e = JSON.parse(r.responseText) } catch (t) { } u(), e ? l._receive(e) : l._handleError(t) }, r.onerror = r.ontimeout = function () { u(), l._handleError(t) }, r.onprogress = function () { }, i === e.XDomainRequest && c._pending.add({ id: o, xhr: r }), r.send(this.encode(t)), r } }), { _id: 0, _pending: new r, isUsable: function (t, n, i, r) { if (s.isSameOrigin(n)) return i.call(r, !1); if (e.XDomainRequest) return i.call(r, n.protocol === location.protocol); if (e.XMLHttpRequest) { var o = new XMLHttpRequest; return i.call(r, void 0 !== o.withCredentials) } return i.call(r, !1) } }); t.exports = c }).call(this, n(0))
    },
    function (t, e, n) {
        "use strict"; (function (e) { var i = n(2), r = n(3), s = n(13), o = n(1), a = n(6), c = o(i(n(4), { encode: function (t) { var e = s(this.endpoint); return e.query.message = a(t), e.query.jsonp = "__jsonp" + c._cbCount + "__", r.stringify(e) }, request: function (t) { var n = document.getElementsByTagName("head")[0], i = document.createElement("script"), o = c.getCallbackName(), l = s(this.endpoint), u = this; l.query.message = a(t), l.query.jsonp = o; var h = function () { if (!e[o]) return !1; e[o] = void 0; try { delete e[o] } catch (t) { } i.parentNode.removeChild(i) }; return e[o] = function (t) { h(), u._receive(t) }, i.type = "text/javascript", i.src = r.stringify(l), n.appendChild(i), i.onerror = function () { h(), u._handleError(t) }, { abort: h } } }), { _cbCount: 0, getCallbackName: function () { return this._cbCount += 1, "__jsonp" + this._cbCount + "__" }, isUsable: function (t, e, n, i) { n.call(i, !0) } }); t.exports = c }).call(this, n(0))
    },
    function (t, e, n) {
        "use strict"; var i = n(2), r = n(18), s = i({ initialize: function (t, e, n) { this.code = t, this.params = Array.prototype.slice.call(e), this.message = n }, toString: function () { return this.code + ":" + this.params.join(",") + ":" + this.message } }); s.parse = function (t) { if (t = t || "", !r.ERROR.test(t)) return new s(null, [], t); var e = t.split(":"), n = parseInt(e[0]), i = e[1].split(","); t = e[2]; return new s(n, i, t) }; var o = { versionMismatch: [300, "Version mismatch"], conntypeMismatch: [301, "Connection types not supported"], extMismatch: [302, "Extension mismatch"], badRequest: [400, "Bad request"], clientUnknown: [401, "Unknown client"], parameterMissing: [402, "Missing required parameter"], channelForbidden: [403, "Forbidden channel"], channelUnknown: [404, "Unknown channel"], channelInvalid: [405, "Invalid channel"], extUnknown: [406, "Unknown extension"], publishFailed: [407, "Failed to publish"], serverError: [500, "Internal server error"] }; for (var a in o) !function (t) { s[t] = function () { return new s(o[t][0], arguments, o[t][1]).toString() } }(a); t.exports = s
    },
    function (t, e, n) {
        "use strict";
        var i = { addExtension: function (t) { this._extensions = this._extensions || [], this._extensions.push(t), t.added && t.added(this) }, removeExtension: function (t) { if (this._extensions) for (var e = this._extensions.length; e--;)this._extensions[e] === t && (this._extensions.splice(e, 1), t.removed && t.removed(this)) }, pipeThroughExtensions: function (t, e, n, i, r) { if (this.debug("Passing through ? extensions: ?", t, e), !this._extensions) return i.call(r, e); var s = this._extensions.slice(), o = function (e) { if (!e) return i.call(r, e); var a = s.shift(); if (!a) return i.call(r, e); var c = a[t]; return c ? void (3 <= c.length ? a[t](e, n, o) : a[t](e, o)) : o(e) }; o(e) } }; n(1)(i, n(5)), t.exports = i
    },
    function (t, e, n) {
        "use strict";
        var i = n(2),
            r = n(7);
        t.exports = i(r)
    },
    function (t, e, n) {
        "use strict";
        var i = n(2),
            r = n(1),
            s = n(7),
            o = i({
                initialize: function (t, e, n, i) {
                    this._client = t,
                        this._channels = e,
                        this._callback = n,
                        this._context = i,
                        this._cancelled = !1
                },
                withChannel: function (t, e) {
                    return this._withChannel = [t, e], this
                },
                apply: function (t, e) {
                    var n = e[0];
                    this._callback && this._callback.call(this._context, n.data),
                        this._withChannel && this._withChannel[0].call(this._withChannel[1], n.channel, n.data)
                },
                cancel: function () {
                    this._cancelled || (this._client.unsubscribe(this._channels, this), this._cancelled = !0)
                },
                unsubscribe: function () { this.cancel() }
            }); r(o.prototype, s), t.exports = o
    },
    function (t, e, n) {
        "use strict";
        function i(t, e) { return new Promise(function (n, i) { pe.getPanorama({ location: t, radius: e }, (t, e) => { e == google.maps.StreetViewStatus.OK ? n(t) : i(new Error(e)) }) }) }
        function r(t) {
            return new Promise(
                function (e, n) { fe.getElevationAlongPath(t, (t, i) => { i == google.maps.ElevationStatus.OK ? e(t) : n(new Error(i)) }) })
        }
        function s(t) { return new Promise(e => setTimeout(e, t)) }
        function o(t) {
            let e = t.getUTCMonth() + 1;
            e = 10 > e ? "0" + e : e;
            let n = t.getUTCDate(); n = 10 > n ? "0" + n : n;
            let i = t.getUTCHours(); i = 10 > i ? "0" + i : i;
            let r = t.getUTCMinutes(); r = 10 > r ? "0" + r : r;
            let s = t.getUTCSeconds();
            return s = 10 > s ? "0" + s : s, t.getUTCFullYear() + "-" + e + "-" + n + "T" + i + ":" + r + ":" + s + "Z"
        }
        function a(t, e, n) {
            var i = 100 * (6.1078 / de(.99999683 + n * (n * (78736169e-12 + n * (n * (4.3884187e-9 + n * (n * (21874425e-20 + n * (n * (11112018e-24 + -3.0994571e-20 * n) - 17892321e-22)) - 29883885e-18)) - 6.1117958e-7)) - .0090826951), 8));
            return (100 * e - i) / (287.0531 * (t + 273.15)) + i / (461.4964 * (t + 273.15))
        }
        function c(t, e) {
            var n = function (t, e) {
                var n = 9.8067 * (e.rp_wr + e.rp_wb) * ue(he(e.ep_g / 100)), i = 9.8067 * (e.rp_wr + e.rp_wb) * le(he(e.ep_g / 100)) * e.ep_crr, r = .5 * e.rp_a * e.rp_cd * e.ep_rho * (1e3 * t / 3600) * (1e3 * t / 3600), s = {};
                return s.Fgravity = n, s.Frolling = i, s.Fdrag = r, s
            }(t, e);
            return (n.Fgravity + n.Frolling + n.Fdrag) * (1e3 * t / 3600) / (1 - e.rp_dtl / 100)
        }
        function l() { }
        function u() {
            return []
        }
        function h(t, e) {
            this.ownerDocument = t.ownerDocument,
                this.namespaceURI = t.namespaceURI,
                this._next = null,
                this._parent = t,
                this.__data__ = e
        }
        function d(t, e, n, i, r, s) {
            for (var o, a = 0, c = e.length, l = s.length; a < l; ++a)(o = e[a]) ? (o.__data__ = s[a], i[a] = o) : n[a] = new h(t, s[a]);
            for (; a < c; ++a)(o = e[a]) && (r[a] = o)
        }
        function f(t, e, n, i, r, s, o) {
            var a, c, l, u = {}, d = e.length, f = s.length, p = Array(d);
            for (a = 0; a < d; ++a)(c = e[a]) && (p[a] = l = xe + o.call(c, c.__data__, a, e), l in u ? r[a] = c : u[l] = c);
            for (a = 0; a < f; ++a)(c = u[l = xe + o.call(t, s[a], a, s)]) ? (i[a] = c, c.__data__ = s[a], u[l] = null) : n[a] = new h(t, s[a]);
            for (a = 0; a < d; ++a)(c = e[a]) && u[p[a]] === c && (r[a] = c)
        }
        function p(t, e) {
            return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN
        }
        function g(t) {
            return function () { this.removeAttribute(t) }
        }
        function m(t) {
            return function () { this.removeAttributeNS(t.space, t.local) }
        }
        function v(t, e) {
            return function () { this.setAttribute(t, e) }
        }
        function y(t, e) {
            return function () { this.setAttributeNS(t.space, t.local, e) }
        }
        function _(t, e) {
            return function () {
                var n = e.apply(this, arguments);
                null == n ? this.removeAttribute(t) : this.setAttribute(t, n)
            }
        }
        function w(t, e) {
            return function () {
                var n = e.apply(this, arguments); null == n ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n)
            }
        }
        function b(t) {
            return function () { this.style.removeProperty(t) }
        }
        function E(t, e, n) {
            return function () { this.style.setProperty(t, e, n) }
        }
        function S(t, e, n) {
            return function () {
                var i = e.apply(this, arguments);
                null == i ? this.style.removeProperty(t) : this.style.setProperty(t, i, n)
            }
        }
        function x(t, e) {
            return t.style.getPropertyValue(e) || Ne(t).getComputedStyle(t, null).getPropertyValue(e)
        }
        function T(t) {
            return function () { delete this[t] }
        }
        function k(t, e) {
            return function () { this[t] = e }
        }
        function C(t, e) {
            return function () { var n = e.apply(this, arguments); null == n ? delete this[t] : this[t] = n }
        }
        function N(t) {
            return t.trim().split(/^|\s+/)
        }
        function I(t) {
            return t.classList || new A(t)
        }
        function A(t) {
            this._node = t, this._names = N(t.getAttribute("class") || "")
        }
        function M(t, e) {
            for (var n = I(t), i = -1, r = e.length; ++i < r;)n.add(e[i])
        }
        function O(t, e) {
            for (var n = I(t), i = -1, r = e.length; ++i < r;)n.remove(e[i])
        }
        function L(t) {
            return function () { M(this, t) }
        }
        function D(t) {
            return function () { O(this, t) }
        }
        function R(t, e) {
            return function () { (e.apply(this, arguments) ? M : O)(this, t) }
        }
        function P() {
            this.textContent = ""
        }
        function U(t) {
            return function () { this.textContent = t }
        }
        function B(t) {
            return function () { var e = t.apply(this, arguments); this.textContent = null == e ? "" : e }
        }
        function F() {
            this.innerHTML = ""
        }
        function j(t) {
            return function () { this.innerHTML = t }
        }
        function q(t) {
            return function () { var e = t.apply(this, arguments); this.innerHTML = null == e ? "" : e }
        }
        function H() {
            this.nextSibling && this.parentNode.appendChild(this)
        }
        function z() {
            this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild)
        }
        function V() {
            return null
        }
        function W() {
            var t = this.parentNode; t && t.removeChild(this)
        }
        function X() {
            return this.parentNode.insertBefore(this.cloneNode(!1), this.nextSibling)
        }
        function J() {
            return this.parentNode.insertBefore(this.cloneNode(!0), this.nextSibling)
        }
        function G(t, e, n) {
            return t = $(t, e, n), function (e) { var n = e.relatedTarget; n && (n === this || 8 & n.compareDocumentPosition(this)) || t.call(this, e) }
        }
        function $(t, e, n) {
            return function (i) { var r = Me; Me = i; try { t.call(this, this.__data__, e, n) } finally { Me = r } }
        }
        function Y(t) {
            return t.trim().split(/^|\s+/).map(function (t) { var e = "", n = t.indexOf("."); return 0 <= n && (e = t.slice(n + 1), t = t.slice(0, n)), { type: t, name: e } })
        }
        function K(t) {
            return function () { var e = this.__on; if (e) { for (var n, i = 0, r = -1, s = e.length; i < s; ++i)n = e[i], t.type && n.type !== t.type || n.name !== t.name ? e[++r] = n : this.removeEventListener(n.type, n.listener, n.capture); ++r ? e.length = r : delete this.__on } }
        }
        function Z(t, e, n) {
            var i = Ae.hasOwnProperty(t.type) ? G : $; return function (r, s, o) { var a, c = this.__on, l = i(e, s, o); if (c) for (var u = 0, h = c.length; u < h; ++u)if ((a = c[u]).type === t.type && a.name === t.name) return this.removeEventListener(a.type, a.listener, a.capture), this.addEventListener(a.type, a.listener = l, a.capture = n), void (a.value = e); this.addEventListener(t.type, l, n), a = { type: t.type, name: t.name, value: e, listener: l, capture: n }, c ? c.push(a) : this.__on = [a] }
        }
        function Q(t, e, n) {
            var i = Ne(t), r = i.CustomEvent; "function" == typeof r ? r = new r(e, n) : (r = i.document.createEvent("Event"), n ? (r.initEvent(e, n.bubbles, n.cancelable), r.detail = n.detail) : r.initEvent(e, !1, !1)), t.dispatchEvent(r)
        }
        function tt(t, e) {
            this._groups = t, this._parents = e
        }
        function et(t, e, n) {
            var i = (e - t) / re(0, n), r = ie(ne(i) / ee), s = i / de(10, r); return 0 <= r ? (s >= Be ? 10 : s >= Fe ? 5 : s >= je ? 2 : 1) * de(10, r) : -de(10, -r) / (s >= Be ? 10 : s >= Fe ? 5 : s >= je ? 2 : 1)
        }
        function nt(t, e) {
            var n = Object.create(t.prototype); for (var i in e) n[i] = e[i]; return n
        }
        function it() { }
        function rt(t) {
            var e;
            return t = (t + "").trim().toLowerCase(), (e = Ve.exec(t)) ? new lt(15 & (e = parseInt(e[1], 16)) >> 8 | 240 & e >> 4, 15 & e >> 4 | 240 & e, (15 & e) << 4 | 15 & e, 1) : (e = We.exec(t)) ? st(parseInt(e[1], 16)) : (e = Xe.exec(t)) ? new lt(e[1], e[2], e[3], 1) : (e = Je.exec(t)) ? new lt(255 * e[1] / 100, 255 * e[2] / 100, 255 * e[3] / 100, 1) : (e = Ge.exec(t)) ? ot(e[1], e[2], e[3], e[4]) : (e = $e.exec(t)) ? ot(255 * e[1] / 100, 255 * e[2] / 100, 255 * e[3] / 100, e[4]) : (e = Ye.exec(t)) ? ut(e[1], e[2] / 100, e[3] / 100, 1) : (e = Ke.exec(t)) ? ut(e[1], e[2] / 100, e[3] / 100, e[4]) : Ze.hasOwnProperty(t) ? st(Ze[t]) : "transparent" === t ? new lt(NaN, NaN, NaN, 0) : null
        }
        function st(t) {
            return new lt(255 & t >> 16, 255 & t >> 8, 255 & t, 1)
        }
        function ot(t, e, n, i) {
            return 0 >= i && (t = e = n = NaN), new lt(t, e, n, i)
        }
        function at(t) {
            return t instanceof it || (t = rt(t)), t ? new lt((t = t.rgb()).r, t.g, t.b, t.opacity) : new lt
        }
        function ct(t, e, n, i) {
            return 1 === arguments.length ? at(t) : new lt(t, e, n, null == i ? 1 : i)
        }
        function lt(t, e, n, i) {
            this.r = +t, this.g = +e, this.b = +n, this.opacity = +i
        }
        function ut(t, e, n, i) {
            return 0 >= i ? t = e = n = NaN : 0 >= n || 1 <= n ? t = e = NaN : 0 >= e && (t = NaN), new dt(t, e, n, i)
        }
        function ht(t, e, n, i) {
            return 1 === arguments.length ? function (t) {
                if (t instanceof dt) return new dt(t.h, t.s, t.l, t.opacity);
                if (t instanceof it || (t = rt(t)), !t) return new dt;
                if (t instanceof dt) return t;
                var e = (t = t.rgb()).r / 255, n = t.g / 255, i = t.b / 255, r = ae(e, n, i), s = re(e, n, i), o = NaN, a = s - r, c = (s + r) / 2;
                return a ? (o = e === s ? (n - i) / a + 6 * (n < i) : n === s ? (i - e) / a + 2 : (e - n) / a + 4, a /= .5 > c ? s + r : 2 - s - r, o *= 60) : a = 0 < c && 1 > c ? 0 : o, new dt(o, a, c, t.opacity)
            }(t) : new dt(t, e, n, null == i ? 1 : i)
        }
        function dt(t, e, n, i) {
            this.h = +t,
                this.s = +e,
                this.l = +n,
                this.opacity = +i
        }
        function ft(t, e, n) {
            return 255 * (60 > t ? e + (n - e) * t / 60 : 180 > t ? n : 240 > t ? e + (n - e) * (240 - t) / 60 : e)
        }
        function pt(t) {
            if (t instanceof gt) return new gt(t.l, t.a, t.b, t.opacity);
            if (t instanceof bt) {
                var e = t.h * Qe;
                return new gt(t.l, le(e) * t.c, ue(e) * t.c, t.opacity)
            }
            t instanceof lt || (t = at(t));
            var n = _t(t.r), i = _t(t.g), r = _t(t.b), s = mt((.4124564 * n + .3575761 * i + .1804375 * r) / en), o = mt((.2126729 * n + .7151522 * i + .072175 * r) / nn);
            return new gt(116 * o - 16, 500 * (s - o), 200 * (o - mt((.0193339 * n + .119192 * i + .9503041 * r) / rn)), t.opacity)
        }
        function gt(t, e, n, i) {
            this.l = +t,
                this.a = +e,
                this.b = +n,
                this.opacity = +i
        }
        function mt(t) {
            return t > cn ? de(t, 1 / 3) : t / an + sn
        }
        function vt(t) {
            return t > on ? t * t * t : an * (t - sn)
        }
        function yt(t) {
            return 255 * (.0031308 >= t ? 12.92 * t : 1.055 * de(t, 1 / 2.4) - .055)
        }
        function _t(t) {
            return .04045 >= (t /= 255) ? t / 12.92 : de((t + .055) / 1.055, 2.4)
        }
        function wt(t, e, n, i) {
            return 1 === arguments.length ? function (t) {
                if (t instanceof bt) return new bt(t.h, t.c, t.l, t.opacity); t instanceof gt || (t = pt(t)); var e = Zt(t.b, t.a) * tn;
                return new bt(0 > e ? e + 360 : e, oe(t.a * t.a + t.b * t.b), t.l, t.opacity)
            }(t) : new bt(t, e, n, null == i ? 1 : i)
        }
        function bt(t, e, n, i) {
            this.h = +t, this.c = +e, this.l = +n, this.opacity = +i
        }
        function Et(t, e, n, i) {
            return 1 === arguments.length ? function (t) {
                if (t instanceof St) return new St(t.h, t.s, t.l, t.opacity);
                t instanceof lt || (t = at(t));
                var e = t.r / 255, n = t.g / 255, i = t.b / 255, r = (gn * i + fn * e - pn * n) / (gn + fn - pn), s = i - r, o = (dn * (n - r) - un * s) / hn, a = oe(o * o + s * s) / (dn * r * (1 - r)), c = a ? Zt(o, s) * tn - 120 : NaN;
                return new St(0 > c ? c + 360 : c, a, r, t.opacity)
            }(t) : new St(t, e, n, null == i ? 1 : i)
        }
        function St(t, e, n, i) {
            this.h = +t,
                this.s = +e,
                this.l = +n,
                this.opacity = +i
        }
        function xt(t, e, n, i, r) {
            var s = t * t, o = s * t;
            return ((1 - 3 * t + 3 * s - o) * e + (4 - 6 * s + 3 * o) * n + (1 + 3 * t + 3 * s - 3 * o) * i + o * r) / 6
        }
        function Tt(t, e) {
            return function (n) { return t + n * e }
        }
        function kt(t, e) {
            var n = e - t;
            return n ? Tt(t, 180 < n || -180 > n ? n - 360 * te(n / 360) : n) : bn(isNaN(t) ? e : t)
        }
        function Ct(t) {
            return 1 == (t = +t) ? Nt : function (e, n) { return n - e ? function (t, e, n) { return t = de(t, n), e = de(e, n) - t, n = 1 / n, function (i) { return de(t + i * e, n) } }(e, n, t) : bn(isNaN(e) ? n : e) }
        }
        function Nt(t, e) {
            var n = e - t; return n ? Tt(t, n) : bn(isNaN(t) ? e : t)
        }
        function It(t) {
            return function (e) {
                var n, i, r = e.length, s = Array(r), o = Array(r), a = Array(r);
                for (n = 0; n < r; ++n)i = ct(e[n]), s[n] = i.r || 0, o[n] = i.g || 0, a[n] = i.b || 0;
                return s = t(s), o = t(o), a = t(a), i.opacity = 1, function (t) { return i.r = s(t), i.g = o(t), i.b = a(t), i + "" }
            }
        }
        function At(t, e, n, i) {
            function r(t) { return t.length ? t.pop() + " " : "" }
            function s(t, i, r, s, o, a) {
                if (t !== r || i !== s) { var c = o.push("translate(", null, e, null, n); a.push({ i: c - 4, x: Sn(t, r) }, { i: c - 2, x: Sn(i, s) }) }
                else (r || s) && o.push("translate(" + r + e + s + n)
            }
            function o(t, e, n, s) {
                t === e ? e && n.push(r(n) + "rotate(" + e + i) : (180 < t - e ? e += 360 : 180 < e - t && (t += 360), s.push({ i: n.push(r(n) + "rotate(", null, i) - 2, x: Sn(t, e) }))
            }
            function a(t, e, n, s) {
                t === e ? e && n.push(r(n) + "skewX(" + e + i) : s.push({ i: n.push(r(n) + "skewX(", null, i) - 2, x: Sn(t, e) })
            }
            function c(t, e, n, i, s, o) {
                if (t !== n || e !== i) { var a = s.push(r(s) + "scale(", null, ",", null, ")"); o.push({ i: a - 4, x: Sn(t, n) }, { i: a - 2, x: Sn(e, i) }) }
                else (1 !== n || 1 !== i) && s.push(r(s) + "scale(" + n + "," + i + ")")
            }
            return function (e, n) {
                var i = [], r = [];
                return e = t(e), n = t(n), s(e.translateX, e.translateY, n.translateX, n.translateY, i, r), o(e.rotate, n.rotate, i, r), a(e.skewX, n.skewX, i, r), c(e.scaleX, e.scaleY, n.scaleX, n.scaleY, i, r), e = n = null, function (t) { for (var e, n = -1, s = r.length; ++n < s;)i[(e = r[n]).i] = e.x(t); return i.join("") }
            }
        }
        function Mt(t) {
            return function (e, n) { var i = t((e = ht(e)).h, (n = ht(n)).h), r = Nt(e.s, n.s), s = Nt(e.l, n.l), o = Nt(e.opacity, n.opacity); return function (t) { return e.h = i(t), e.s = r(t), e.l = s(t), e.opacity = o(t), e + "" } }
        }
        function Ot(t) {
            return function (e, n) {
                var i = t((e = wt(e)).h, (n = wt(n)).h), r = Nt(e.c, n.c), s = Nt(e.l, n.l), o = Nt(e.opacity, n.opacity);
                return function (t) { return e.h = i(t), e.c = r(t), e.l = s(t), e.opacity = o(t), e + "" }
            }
        }
        function Lt(t) {
            return function e(n) {
                function i(e, i) {
                    var r = t((e = Et(e)).h, (i = Et(i)).h), s = Nt(e.s, i.s), o = Nt(e.l, i.l), a = Nt(e.opacity, i.opacity);
                    return function (t) {
                        return e.h = r(t), e.s = s(t), e.l = o(de(t, n)), e.opacity = a(t), e + ""
                    }
                } return n = +n, i.gamma = e, i
            }(1)
        }
        function Dt(t, e) {
            return (e -= t = +t) ? function (n) { return (n - t) / e } : Dn(e)
        }
        function Rt(t, e, n, i) {
            var r = t[0], s = t[1], o = e[0], a = e[1]; return s < r ? (r = n(s, r), o = i(a, o)) : (r = n(r, s), o = i(o, a)), function (t) { return o(r(t)) }
        }
        function Pt(t, e, n, i) {
            var r = ae(t.length, e.length) - 1, s = Array(r), o = Array(r), a = -1; for (t[r] < t[0] && (t = t.slice().reverse(), e = e.slice().reverse()); ++a < r;)s[a] = n(t[a], t[a + 1]), o[a] = i(e[a], e[a + 1]); return function (e) { var n = Pe(t, e, 1, r) - 1; return o[n](s[n](e)) }
        }
        function Ut(t) {
            return new Bt(t)
        }
        function Bt(t) {
            if (!(e = qn.exec(t))) throw new Error("invalid format: " + t);
            var e, n = e[1] || " ", i = e[2] || ">", r = e[3] || "-", s = e[4] || "", o = !!e[5], a = e[6] && +e[6], c = !!e[7], l = e[8] && +e[8].slice(1), u = e[9] || ""; "n" === u ? (c = !0, u = "g") : !jn[u] && (u = ""), (o || "0" === n && "=" === i) && (o = !0, n = "0", i = "="), this.fill = n, this.align = i, this.sign = r, this.symbol = s, this.zero = o, this.width = a, this.comma = c, this.precision = l, this.type = u
        }
        function Ft(t, e, n) {
            return 1 / oe(2 * Qt) * Yt(-de(t - e, 2) / (2 * de(n, 2)))
        }
        function jt(t, e, n) {
            return 1 < ce((t - e) / n) ? 0 : .75 * (1 - de((t - e) / n, 2))
        }
        function qt(t, e, n) { return 1 / (Yt((t - e) / n) + Yt(-(t - e) / n)) }
        function Ht(t, e, n) { return 1 < ce((t - e) / n) ? 0 : .5 } function zt(t, e, n) {
            return 1 < ce((t - e) / n) ? 0 : 1 - ce((t - e) / n)
        }
        function Vt(t, e, n) {
            return 1 < ce((t - e) / n) ? 0 : .9375 * de(1 - de((t - e) / n, 2), 2)
        }
        function Wt(t, e, n) {
            return 1 < ce((t - e) / n) ? 0 : 35 / 32 * de(1 - de((t - e) / n, 2), 3)
        }
        function Xt(t, e, n) {
            return 1 < ce((t - e) / n) ? 0 : Qt / 4 * le(Qt / 2 * ((t - e) / n))
        }
        function Jt(t, e, n) {
            return 1 < ce((t - e) / n) ? 0 : 70 / 81 * de(1 - de(ce((t - e) / n), 3), 3)
        }
        function Gt(t, e, n) {
            var i = ce((e - t) / n);
            return .5 * Yt(-i / Kt) * ue(i / Kt + Qt / 4)
        }
        function $t() {
            let t = new URL(window.location), e = new Mi.a(t.search); if (e.get("state") && e.get("code")) {
                let t = e.get("code");
                localStorage.setItem("strava-oauth-code-" + Yn.STRAVA_CLIENT_ID, t);
                let n = window.location.pathname;
                return "true" === e.get("useant") && (n += "?useant=true"), void window.location.assign(n)
            }
            let n = window.location.protocol, i = "true" !== e.get("useant");
            (void 0 === Yn.STRAVA_CLIENT_ID || null === Yn.STRAVA_CLIENT_ID || "" === Yn.STRAVA_CLIENT_ID) && (document.getElementById("container-strava").style.display = "none"),
                localStorage.getItem("strava-oauth-code-" + Yn.STRAVA_CLIENT_ID) && (document.getElementById("strava-btn-connect").style.display = "none", document.getElementById("strava-btn-connected").style.display = "block");
            let r = ti.container("route-progress"), s = document.getElementById("continue-previous");
            for (let e of r)
                try {
                    let n = ti.get(e);
                    var o = document.createElement("option");
                    let i = new Date; i.setTime(n.id), o.innerHTML = i.toLocaleDateString() + " " + i.toLocaleTimeString() + " - " + n.routeName, o.setAttribute("value", e), s.add(o)
                }
                catch (t) {
                    localStorage.clear(),
                        location.reload();
                    break
                }
            let a,
                c = [["virtual", new Si], ["cycleopsmagnetopowercurve", new xi]],
                //c = ["cycleopsmagnetopowercurve", new xi],
                l = [],
                u = [],
                h = document.getElementById("gpx-file-upload"),
                d = document.getElementById("display-unit"),
                f = document.getElementById("rider-weight"),
                p = document.getElementById("begin-session"),
                g = document.getElementById("btn-bluetooth-device-txt"),
                m = document.getElementById("btn-ant-device-txt"),
                v = document.getElementById("strava-btn-connect"),
                y = document.getElementById("btn-bluetooth-device"),
                _ = document.getElementById("btn-ant-device"),
                w = document.getElementById("power-meter"),
                b = document.getElementById("hr-meter"),
                E = document.getElementById("cadence-meter"),
                S = document.getElementById("menuopen-btn"),
                x = document.getElementById("btn-fullscreen"),
                T = document.getElementById("bluetooth-device-container"),
                k = document.getElementById("ant-device-container"),
                C = document.getElementById("ant-ws-url"),
                N = t => {
                    //w.options.length = 0;
                    //for (let [n, i] of c) {
                    //    (e = document.createElement("option")).innerHTML = i.name, e.setAttribute("value", i.id), i.id === t.id && e.setAttribute("selected", "true"), w.add(e)
                    //}
                    "virtual" === w.value && 1 < c.length && w.options[0].setAttribute("selected", "true"), b.options.length = 0;
                    for (let [n, i] of l) { (e = document.createElement("option")).innerHTML = i.name, e.setAttribute("value", i.id), i.id === t.id && e.setAttribute("selected", "true"), b.options.add(e) } 0 === b.options.length && ((e = document.createElement("option")).innerHTML = "Disabled", e.setAttribute("value", ""), b.options.add(e));
                    E.options.length = 0;
                    for (let [n, i] of u) {
                        var e;
                        (e = document.createElement("option")).innerHTML = i.name, e.setAttribute("value", i.id), i.id === t.id && e.setAttribute("selected", "true"), E.options.add(e)
                    } 0 === E.options.length && ((e = document.createElement("option")).innerHTML = "Disabled", e.setAttribute("value", ""), E.options.add(e))
                };
            for (let t of document.querySelectorAll("#route-nav a")) t.onclick = t => {
                t.preventDefault();
                let e = t.target.getAttribute("href");
                for (let t of document.querySelectorAll(".nav-link")) t.classList.remove("active"); t.target.classList.add("active");
                for (let t of document.querySelectorAll(".tab-pane")) t.classList.remove("active"); document.querySelector(e).classList.add("active")
            };
            d.onchange = () => {
                "imperial" === d.value ? (
                    document.getElementById("rider-weight-label").innerHTML = "Rider Weight (lbs)",
                    document.getElementById("rider-weight").setAttribute("placeholder", 185)) :
                    (document.getElementById("rider-weight-label").innerHTML = "Rider Weight (kg)",
                        document.getElementById("rider-weight").setAttribute("placeholder", 85))
            },
                //menuopen-btn
                S.onclick = t => { t.preventDefault(), "none" === document.getElementById("ui-finalize-container").style.display ? a.showFinalizeUI("Complete Ride") : document.getElementById("ui-finalize-container").style.display = "none" },
                //btn-fullscreen
                x.onclick = t => {
                    t.preventDefault(),
                        //ik ga de knop go fullscreen gebruiken als de route is gefietst je terug een nieuwe route kan laden door de pagina start in de browser opnieuw te laden
                        location.reload();
                    //t.preventDefault(), null === Li.a.fullscreenElement ? Li.a.requestFullscreen(document.body) : Li.a.exitFullscreen();
                    //onderstaande code bijgevoegd als je de knop go fullscreen hebt geklikd het venster terug sluit
                    document.getElementById("ui-finalize-container").style.display = "none"
                },
                //strava-btn-connect
                v.onclick = t => {
                    t.preventDefault();
                    let n = window.location.protocol + "//" + window.location.host + window.location.pathname;
                    "true" === e.get("useant") && (n += "?useant=true"),
                        window.location.assign("https://www.strava.com/oauth/authorize?client_id=" + Yn.STRAVA_CLIENT_ID + "&response_type=code&redirect_uri=" + encodeURIComponent(n) + "&scope=activity%3Awrite&state=strava")
                },
                //btn-bluetooth-device
                y.onclick = t => {
                    //waitring laten zien zodat men ziet dat het zoeken naar een sensor bezig is.
                    document.getElementById("waitring").style.display = "inline";
                    //om te vermijden dat je tijdens het kiezen van een sensor toch zou starten door op de begin knop te drukken wordt deze hier niet werkzaam gemaakt
                    document.getElementById("begin-session").disabled = true;
                    if (t.preventDefault(), "undefined" == typeof navigator || !("bluetooth" in navigator))
                        return document.getElementById("btn-bluetooth-device").style.display = "none",
                            void (document.getElementById("btn-bluetooth-device-warning").style.display = "block");
                    y.classList.contains("disabled") || (y.classList.add("disabled"), g.innerHTML = "Connecting ...",
                        async function () {
                        //HeartRate = 6157 CyclingPower = 6168 CyclingSpeedAndCadence = 6166
                            let t,
                                e = await navigator.bluetooth.requestDevice({ filters: [{ services: [6157] }, { services: [6168] }, { services: [6166] }] }),
                                n = await e.gatt.connect();
                            //more info about servioces gatt bluetooth devices https://docs.microsoft.com/en-us/dotnet/api/microsoft.toolkit.uwp.connectivity.gattnativeuuid?view=win-comm-toolkit-dotnet-stable
                            if (!c.find(t => t[0] === e.id)) {
                                let i;
                                //6168 = CyclingPower
                                try { i = await n.getPrimaryService(6168) }
                                catch (e) { }
                                if (i) {
                                    //CyclingPowerMeasurement	10851
                                    let r = await i.getCharacteristic(10851),
                                        s = new mi,
                                        o = await function (t) {
                                            return new Promise(function (e) {
                                                let n = !1,
                                                    i = r => { t.removeEventListener("characteristicvaluechanged", i), t.stopNotifications(), n || (n = !0, e(r.target.value)) };
                                                t.addEventListener("characteristicvaluechanged", i), t.startNotifications()
                                            })
                                        }(r);
                                    "cumulative_crank_revolutions" in s.getData(o) ? (t = new _i(e, n, i, r), c.push([t.id, t]), u.push([t.id, t])) : (t = new wi(e, n, i, r), c.push([t.id, t]))
                                }
                            }
                            if (!u.find(t => t[0] === e.id)) {
                                let i;
                                // 6166 = CyclingSpeedAndCadence
                                try { i = await n.getPrimaryService(6166) }
                                catch (e) { }
                                //10843 CSCMeasurement cycling speed cadence meting
                                if (i) {
                                    let r = await i.getCharacteristic(10843);
                                    //ga naar de class bi regel 3157
                                    t = new bi(e, n, i, r), u.push([t.id, t]);
                                }
                            }
                            if (!l.find(t => t[0] === e.id)) {
                                let i;
                                //HeartRate = 6157
                                try { i = await n.getPrimaryService(6157) }
                                catch (e) { }
                                if (i) {
                                    //HeartRateMeasurement	10807
                                    let r = await i.getCharacteristic(10807);
                                    t = new Ei(e, n, i, r), l.push([t.id, t])
                                }
                            } t && N(t), y.classList.remove("disabled"), g.innerHTML = "Connect"
                            //waitring wegnemen omdat we geconnecteerd zijn met een sensor.
                            document.getElementById("waitring").style.display = "none";
                            //begin knop terug werkzaam maken
                            document.getElementById("begin-session").disabled = false;
                        document.getElementById("begin-session").style.backgroundColor = "green";
                        //simulate button begin-session (p.onclick funktie) als toch alles in orde is wil ik niet wachten totdat je op de knop
                        //begin-session klikt maar gaan dan verder met het scherm van google street view
                        document.getElementById("begin-session").click();
                        }().catch(t => {
                            y.classList.remove("disabled"),
                                g.innerHTML = "Connect",
                                console.log("Error: ", t),
                                //waitring wegnemen omdat het connecteren met een sensor mislukt is
                                document.getElementById("waitring").style.display = "none";
                            //begin knop terug werkzaam maken
                            //document.getElementById("begin-session").disabled = false;
                        }))
                },
                //btn-ant-device
                _.onclick = t => {
                    if (t.preventDefault(), _.classList.contains("disabled")) return; _.classList.add("disabled"), m.innerHTML = "Scanning ...";
                    let e = document.getElementById("btn-ant-device-error"); C.style.display = "none", e.style.display = "none",
                        async function () {
                            let t = C.value; localStorage.setItem("ant-ws-url", t), t || (t = "https:" === n ? "https://localhost:4430/" : "http://localhost:8000/");
                            const i = new Ii(t);
                            i.addListener("bike_power", t => { c.push([t.id, t]), N(t) }),
                                i.addListener("speed_cadence", t => { u.push([t.id, t]), N(t) }),
                                i.addListener("hr", t => { l.push([t.id, t]), N(t) }),
                                i.addListener("namechange", t => { N(t) }),
                                i.addListener("error", () => {
                                    C.style.display = "inline";
                                    let t = "";
                                    "https:" === n && (t = "<br/>You may need to allow a self signed cert for " + i.url + ' by clicking <a href="' + i.url + '" target="_blank">here</a>'),
                                        e.innerHTML = "<br/> Could not connect to the ANT-WS server located at: " + i.url + t, e.style.display = "inline", _.classList.remove("disabled"), m.innerHTML = "Scan"
                                }),
                                i.scan()
                        }().catch(t => { _.classList.remove("disabled"), m.innerHTML = "Scan", console.log("Error: ", t) })
                },
                //begin-session
                p.onclick = t => {
                    //zolang de kaart is niet geladen wordt de waitring getoond;
                    document.getElementById("waitring").style.display = "inline";

                    if (t.preventDefault(), (h.value || s.value) && f.value) {
                        if (p.classList.contains("disabled")) return; p.classList.add("disabled"),
                            async function () {
                                let t,
                                    e = f.value,
                                    n = d.value,
                                    i = b.value;
                                i && (t = l.find(t => t[0] === i)[1]).listen();
                                let r,
                                    o = E.value;
                                o && (r = u.find(t => t[0] === o)[1]).listen();
                                let p = w.value,
                                    g = c.find(t => t[0] === p)[1];
                                //if (g.listen({ heartMeter: t, cadenceMeter: r }), localStorage.setItem("form-weight", e), localStorage.setItem("form-unit", n), s.value) {
                                if (g.listen({ heartMeter: t, cadenceMeter: r }), localStorage.setItem("form-unit", n), s.value) {
                                    let e = ti.get(s.value);
                                    (a = si.fromJSON(e)).powerMeter = g,
                                        a.heartMeter = t,
                                        a.cadenceMeter = r,
                                        ti.unshift("route-progress", a.cacheName())
                                }
                                else {
                                    let i = await function (t) {
                                        return new Promise(function (e, n) {
                                            let i = new FileReader; i.onload = t => { e(t.target.result) }, i.onerror = t => { n(t.target.error) }, i.readAsText(t, "UTF-8")
                                        })
                                    }
                                        (h.files[0]),
                                        s = new ri(i),
                                        o = await s.create();
                                    a = new si({
                                        points: o,
                                        riderWeight: e,
                                        unit: n,
                                        powerMeter: g,
                                        heartMeter: t,
                                        cadenceMeter: r
                                    }), ti.add("route-progress", a.cacheName(), a)
                                }
                                si.transitionUI(),
                                    await a.init(),
                                    a.updateUI(),
                                    await a.updatePosition(),
                                    ti.remove("route-progress", a.cacheName()),
                                    a.showFinalizeUI("Ride Finished")
                            }
                                ().catch(t => { console.log("Error: ", t) })
                        //zowel GPX file als sensor is gekoppeld dan pas geef ik de knop begin vrij
                        document.getElementById("begin-session").disabled = false;
                        document.getElementById("begin-session").style.backgroundColor = "green";
                    }
                    else {
                        // indien er een fout is moet de waitring terug verdwijnen
                        document.getElementById("waitring").style.display = "none";


                        let t = ""; h.value || s.value ? !f.value && (t = "Please enter the riders weight.") : t = "Please select a GPX file.";
                        let e = document.getElementById("messages");
                        e.innerHTML = t, e.style.display = "block", window.scrollTo(0, 0)
                    }
                },
                //localStorage.getItem("form-weight") && (f.value = localStorage.getItem("form-weight")),
                //nemen default gewicht = 80 Kg dwz niet meer zelf te kiezen
                //localStorage.getItem("form-weight") && (f.value = 75),
                f.value = 66,
                localStorage.getItem("form-unit") && (d.value = localStorage.getItem("form-unit"), d.onchange()),
                localStorage.getItem("ant-ws-url") && (C.value = localStorage.getItem("ant-ws-url")), i || (T.style.display = "none", k.style.display = "block")
        }
        var Yt = Math.exp,
            Kt = Math.SQRT2,
            Zt = Math.atan2,
            Qt = Math.PI,
            te = Math.round,
            ee = Math.LN10,
            ne = Math.log, ie = Math.floor,
            re = Math.max,
            se = Math.ceil,
            oe = Math.sqrt,
            ae = Math.min,
            ce = Math.abs,
            le = Math.cos,
            ue = Math.sin,
            he = Math.atan,
            de = Math.pow; n.r(e);
        let fe = new google.maps.ElevationService,
            pe = new google.maps.StreetViewService,
            ge = new google.maps.Geocoder;
        var me = n(23),
            ve = n.n(me),
            ye = function (t) { return null == t ? l : function () { return this.querySelector(t) } },
            _e = function (t) { return function () { return this.matches(t) } };
        if ("undefined" != typeof document) {
            var we = document.documentElement;
            if (!we.matches) {
                var be = we.webkitMatchesSelector || we.msMatchesSelector || we.mozMatchesSelector || we.oMatchesSelector;
                _e = function (t) { return function () { return be.call(this, t) } }
            }
        }
        var Ee = _e,
            Se = function (t) { return Array(t.length) };
        h.prototype = {
            constructor: h, appendChild: function (t) { return this._parent.insertBefore(t, this._next) },
            insertBefore: function (t, e) {
                return this._parent.insertBefore(t, e)
            },
            querySelector: function (t) {
                return this._parent.querySelector(t)
            },
            querySelectorAll: function (t) {
                return this._parent.querySelectorAll(t)
            }
        };
        var xe = "$",
            Te = "http://www.w3.org/1999/xhtml",
            ke = {
                svg: "http://www.w3.org/2000/svg",
                xhtml: Te, xlink: "http://www.w3.org/1999/xlink",
                xml: "http://www.w3.org/XML/1998/namespace",
                xmlns: "http://www.w3.org/2000/xmlns/"
            },
            Ce = function (t) {
                var e = t += "",
                    n = e.indexOf(":");
                return 0 <= n && "xmlns" !== (e = t.slice(0, n)) && (t = t.slice(n + 1)), ke.hasOwnProperty(e) ? { space: ke[e], local: t } : t
            },
            Ne = function (t) {
                return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView
            };
        A.prototype = {
            add: function (t) { 0 > this._names.indexOf(t) && (this._names.push(t), this._node.setAttribute("class", this._names.join(" "))) },
            remove: function (t) { var e = this._names.indexOf(t); 0 <= e && (this._names.splice(e, 1), this._node.setAttribute("class", this._names.join(" "))) },
            contains: function (t) { return 0 <= this._names.indexOf(t) }
        };
        var Ie = function (t) {
            var e = Ce(t);
            return (e.local ? function (t) {
                return function () {
                    return this.ownerDocument.createElementNS(t.space, t.local)
                }
            } : function (t) {
                return function () {
                    var e = this.ownerDocument,
                        n = this.namespaceURI;
                    return n === Te && e.documentElement.namespaceURI === Te ? e.createElement(t) : e.createElementNS(n, t)
                }
            })(e)
        }, Ae = {}, Me = null; "undefined" != typeof document && ("onmouseenter" in document.documentElement || (Ae = { mouseenter: "mouseover", mouseleave: "mouseout" }));
        var Oe = [null];
        tt.prototype = function () { return new tt([[document.documentElement]], Oe) }.prototype = {
            constructor: tt, select: function (t) {
                "function" != typeof t && (t = ye(t));
                for (var e = this._groups, n = e.length, i = Array(n), r = 0; r < n; ++r)
                    for (var s, o, a = e[r], c = a.length, l = i[r] = Array(c), u = 0; u < c; ++u)(s = a[u]) && (o = t.call(s, s.__data__, u, a)) && ("__data__" in s && (o.__data__ = s.__data__), l[u] = o);
                return new tt(i, this._parents)
            },
            selectAll: function (t) {
                "function" != typeof t && (t = function (t) { return null == t ? u : function () { return this.querySelectorAll(t) } }(t));
                for (var e = this._groups, n = e.length, i = [], r = [], s = 0; s < n; ++s)
                    for (var o, a = e[s], c = a.length, l = 0; l < c; ++l)(o = a[l]) && (i.push(t.call(o, o.__data__, l, a)), r.push(o));
                return new tt(i, r)
            },
            filter: function (t) {
                "function" != typeof t && (t = Ee(t));
                for (var e = this._groups, n = e.length, i = Array(n), r = 0; r < n; ++r)
                    for (var s, o = e[r], a = o.length, c = i[r] = [], l = 0; l < a; ++l)(s = o[l]) && t.call(s, s.__data__, l, o) && c.push(s);
                return new tt(i, this._parents)
            },
            data: function (t, e) {
                if (!t) return g = Array(this.size()), l = -1, this.each(function (t) { g[++l] = t }), g;
                var n = e ? f : d, i = this._parents, r = this._groups; "function" != typeof t && (t = function (t) { return function () { return t } }(t));
                for (var s = r.length, o = Array(s), a = Array(s), c = Array(s), l = 0; l < s; ++l) {
                    var u = i[l], h = r[l], p = h.length, g = t.call(u, u && u.__data__, l, i), m = g.length, v = a[l] = Array(m), y = o[l] = Array(m); n(u, h, v, y, c[l] = Array(p), g, e);
                    for (var _, w, b = 0, E = 0; b < m; ++b)if (_ = v[b]) { for (b >= E && (E = b + 1); !(w = y[E]) && ++E < m;); _._next = w || null }
                }
                return (o = new tt(o, i))._enter = a, o._exit = c, o
            },
            enter: function () {
                return new tt(this._enter || this._groups.map(Se), this._parents)
            },
            exit: function () {
                return new tt(this._exit || this._groups.map(Se), this._parents)
            },
            merge: function (t) {
                for (var e = this._groups, n = t._groups, i = e.length, r = n.length, s = ae(i, r), o = Array(i), a = 0; a < s; ++a)
                    for (var c, l = e[a], u = n[a], h = l.length, d = o[a] = Array(h), f = 0; f < h; ++f)(c = l[f] || u[f]) && (d[f] = c);
                for (; a < i; ++a)o[a] = e[a];
                return new tt(o, this._parents)
            },
            order: function () {
                for (var t = this._groups, e = -1, n = t.length; ++e < n;)
                    for (var i, r = t[e], s = r.length - 1, o = r[s]; 0 <= --s;)(i = r[s]) && (o && o !== i.nextSibling && o.parentNode.insertBefore(i, o), o = i);
                return this
            },
            sort: function (t) {
                function e(e, n) {
                    return e && n ? t(e.__data__, n.__data__) : !e - !n
                } t || (t = p);
                for (var n = this._groups, i = n.length, r = Array(i), s = 0; s < i; ++s) {
                    for (var o, a = n[s], c = a.length, l = r[s] = Array(c), u = 0; u < c; ++u)(o = a[u]) && (l[u] = o); l.sort(e)
                }
                return new tt(r, this._parents).order()
            },
            call: function () {
                var t = arguments[0]; return arguments[0] = this, t.apply(null, arguments), this
            },
            nodes: function () {
                var t = Array(this.size()), e = -1; return this.each(function () { t[++e] = this }), t
            },
            node: function () {
                for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
                    for (var i, r = t[e], s = 0, o = r.length; s < o; ++s)if (i = r[s]) return i;
                return null
            },
            size: function () {
                var t = 0; return this.each(function () { ++t }), t
            },
            empty: function () {
                return !this.node()
            },
            each: function (t) {
                for (var e = this._groups, n = 0, i = e.length; n < i; ++n)
                    for (var r, s = e[n], o = 0, a = s.length; o < a; ++o)(r = s[o]) && t.call(r, r.__data__, o, s);
                return this
            },
            attr: function (t, e) {
                var n = Ce(t);
                if (2 > arguments.length) {
                    var i = this.node();
                    return n.local ? i.getAttributeNS(n.space, n.local) : i.getAttribute(n)
                }
                return this.each((null == e ? n.local ? m : g : "function" == typeof e ? n.local ? w : _ : n.local ? y : v)(n, e))
            },
            style: function (t, e, n) {
                return 1 < arguments.length ? this.each((null == e ? b : "function" == typeof e ? S : E)(t, e, null == n ? "" : n)) : x(this.node(), t)
            },
            property: function (t, e) {
                return 1 < arguments.length ? this.each((null == e ? T : "function" == typeof e ? C : k)(t, e)) : this.node()[t]
            }, classed: function (t, e) {
                var n = N(t + "");
                if (2 > arguments.length) {
                    for (var i = I(this.node()), r = -1, s = n.length; ++r < s;)
                        if (!i.contains(n[r])) return !1;
                    return !0
                }
                return this.each(("function" == typeof e ? R : e ? L : D)(n, e))
            },
            text: function (t) {
                return arguments.length ? this.each(null == t ? P : ("function" == typeof t ? B : U)(t)) : this.node().textContent
            },
            html: function (t) {
                return arguments.length ? this.each(null == t ? F : ("function" == typeof t ? q : j)(t)) : this.node().innerHTML
            },
            raise: function () {
                return this.each(H)
            },
            lower: function () {
                return this.each(z)
            },
            append: function (t) {
                var e = "function" == typeof t ? t : Ie(t);
                return this.select(function () { return this.appendChild(e.apply(this, arguments)) })
            },
            insert: function (t, e) {
                var n = "function" == typeof t ? t : Ie(t), i = null == e ? V : "function" == typeof e ? e : ye(e);
                return this.select(function () { return this.insertBefore(n.apply(this, arguments), i.apply(this, arguments) || null) })
            },
            remove: function () {
                return this.each(W)
            },
            clone: function (t) {
                return this.select(t ? J : X)
            },
            datum: function (t) {
                return arguments.length ? this.property("__data__", t) : this.node().__data__
            },
            on: function (t, e, n) {
                var i, r, s = Y(t + ""), o = s.length;
                if (!(2 > arguments.length)) {
                    for (a = e ? Z : K, null == n && (n = !1), i = 0; i < o; ++i)this.each(a(s[i], e, n));
                    return this
                }
                var a = this.node().__on;
                if (a)
                    for (var c, l = 0, u = a.length; l < u; ++l)
                        for (i = 0, c = a[l]; i < o; ++i)if ((r = s[i]).type === c.type && r.name === c.name) return c.value
            },
            dispatch: function (t, e) {
                return this.each(("function" == typeof e ? function (t, e) {
                    return function () { return Q(this, t, e.apply(this, arguments)) }
                } : function (t, e) { return function () { return Q(this, t, e) } })(t, e))
            }
        };
        var Le = function (t, e) {
            return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN
        },
            De = function (t) {
                return 1 === t.length && (t = function (t) {
                    return function (e, n) { return Le(t(e), n) }
                }(t)), {
                    left: function (e, n, i, r) {
                        for (null == i && (i = 0), null == r && (r = e.length); i < r;) { var s = i + r >>> 1; 0 > t(e[s], n) ? i = s + 1 : r = s } return i
                    },
                    right: function (e, n, i, r) {
                        for (null == i && (i = 0), null == r && (r = e.length); i < r;) { var s = i + r >>> 1; 0 < t(e[s], n) ? r = s : i = s + 1 } return i
                    }
                }
            }(Le),
            Re = De.right,
            Pe = (De.left, Re),
            Ue = Array.prototype,
            Be = (Ue.slice, Ue.map, 7.0710678118654755),
            Fe = 3.1622776601683795,
            je = 1.4142135623730951,
            qe = function (t, e, n) {
                var i, r, s, o, a = -1;
                if (n = +n, (t = +t) === (e = +e) && 0 < n) return [t];
                if ((i = e < t) && (r = t, t = e, e = r), 0 === (o = et(t, e, n)) || !isFinite(o)) return [];
                if (0 < o) for (t = se(t / o), e = ie(e / o), s = Array(r = se(e - t + 1)); ++a < r;)s[a] = (t + a) * o;
                else for (t = ie(t * o), e = se(e * o), s = Array(r = se(t - e + 1)); ++a < r;)s[a] = (t - a) / o;
                return i && s.reverse(), s
            },
            He = function (t, e, n) {
                t.prototype = e.prototype = n, n.constructor = t
            },
            ze = 1 / .7,
            Ve = /^#([0-9a-f]{3})$/,
            We = /^#([0-9a-f]{6})$/,
            Xe = /^rgb\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*\)$/,
            Je = /^rgb\(\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*\)$/,
            Ge = /^rgba\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)\s*\)$/,
            $e = /^rgba\(\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)\s*\)$/,
            Ye = /^hsl\(\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*\)$/,
            Ke = /^hsla\(\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)\s*\)$/,
            Ze = {
                aliceblue: 15792383,
                antiquewhite: 16444375,
                aqua: 65535,
                aquamarine: 8388564,
                azure: 15794175,
                beige: 16119260,
                bisque: 16770244,
                black: 0,
                blanchedalmond: 16772045,
                blue: 255,
                blueviolet: 9055202,
                brown: 10824234,
                burlywood: 14596231,
                cadetblue: 6266528,
                chartreuse: 8388352,
                chocolate: 13789470,
                coral: 16744272,
                cornflowerblue: 6591981,
                cornsilk: 16775388,
                crimson: 14423100,
                cyan: 65535,
                darkblue: 139,
                darkcyan: 35723,
                darkgoldenrod: 12092939,
                darkgray: 11119017,
                darkgreen: 25600,
                darkgrey: 11119017,
                darkkhaki: 12433259,
                darkmagenta: 9109643,
                darkolivegreen: 5597999,
                darkorange: 16747520,
                darkorchid: 10040012,
                darkred: 9109504,
                darksalmon: 15308410,
                darkseagreen: 9419919,
                darkslateblue: 4734347,
                darkslategray: 3100495,
                darkslategrey: 3100495,
                darkturquoise: 52945,
                darkviolet: 9699539,
                deeppink: 16716947,
                deepskyblue: 49151,
                dimgray: 6908265,
                dimgrey: 6908265,
                dodgerblue: 2003199,
                firebrick: 11674146,
                floralwhite: 16775920,
                forestgreen: 2263842,
                fuchsia: 16711935,
                gainsboro: 14474460,
                ghostwhite: 16316671,
                gold: 16766720,
                goldenrod: 14329120,
                gray: 8421504,
                green: 32768,
                greenyellow: 11403055,
                grey: 8421504,
                honeydew: 15794160,
                hotpink: 16738740,
                indianred: 13458524,
                indigo: 4915330,
                ivory: 16777200,
                khaki: 15787660,
                lavender: 15132410,
                lavenderblush: 16773365,
                lawngreen: 8190976,
                lemonchiffon: 16775885,
                lightblue: 11393254,
                lightcoral: 15761536,
                lightcyan: 14745599,
                lightgoldenrodyellow: 16448210,
                lightgray: 13882323,
                lightgreen: 9498256,
                lightgrey: 13882323,
                lightpink: 16758465,
                lightsalmon: 16752762,
                lightseagreen: 2142890,
                lightskyblue: 8900346,
                lightslategray: 7833753,
                lightslategrey: 7833753,
                lightsteelblue: 11584734,
                lightyellow: 16777184,
                lime: 65280,
                limegreen: 3329330,
                linen: 16445670,
                magenta: 16711935,
                maroon: 8388608,
                mediumaquamarine: 6737322,
                mediumblue: 205,
                mediumorchid: 12211667,
                mediumpurple: 9662683,
                mediumseagreen: 3978097,
                mediumslateblue: 8087790,
                mediumspringgreen: 64154,
                mediumturquoise: 4772300,
                mediumvioletred: 13047173,
                midnightblue: 1644912,
                mintcream: 16121850,
                mistyrose: 16770273,
                moccasin: 16770229,
                navajowhite: 16768685,
                navy: 128,
                oldlace: 16643558,
                olive: 8421376,
                olivedrab: 7048739,
                orange: 16753920,
                orangered: 16729344,
                orchid: 14315734,
                palegoldenrod: 15657130,
                palegreen: 10025880,
                paleturquoise: 11529966,
                palevioletred: 14381203,
                papayawhip: 16773077,
                peachpuff: 16767673,
                peru: 13468991,
                pink: 16761035,
                plum: 14524637,
                powderblue: 11591910,
                purple: 8388736,
                rebeccapurple: 6697881,
                red: 16711680,
                rosybrown: 12357519,
                royalblue: 4286945,
                saddlebrown: 9127187,
                salmon: 16416882,
                sandybrown: 16032864,
                seagreen: 3050327,
                seashell: 16774638,
                sienna: 10506797,
                silver: 12632256,
                skyblue: 8900331,
                slateblue: 6970061,
                slategray: 7372944, slategrey: 7372944, snow: 16775930, springgreen: 65407, steelblue: 4620980, tan: 13808780, teal: 32896, thistle: 14204888, tomato: 16737095, turquoise: 4251856, violet: 15631086, wheat: 16113331, white: 16777215, whitesmoke: 16119285, yellow: 16776960, yellowgreen: 10145074
            };
        He(it, rt, {
            displayable: function () {
                return this.rgb().displayable()
            }, toString: function () { return this.rgb() + "" }
        }), He(lt, ct, nt(it, {
            brighter: function (t) {
                return t = null == t ? ze : de(ze, t), new lt(this.r * t, this.g * t, this.b * t, this.opacity)
            },
            darker: function (t) { return t = null == t ? .7 : de(.7, t), new lt(this.r * t, this.g * t, this.b * t, this.opacity) },
            rgb: function () { return this },
            displayable: function () { return 0 <= this.r && 255 >= this.r && 0 <= this.g && 255 >= this.g && 0 <= this.b && 255 >= this.b && 0 <= this.opacity && 1 >= this.opacity },
            toString: function () {
                var t = this.opacity;
                return (1 === (t = isNaN(t) ? 1 : re(0, ae(1, t))) ? "rgb(" : "rgba(") + re(0, ae(255, te(this.r) || 0)) + ", " + re(0, ae(255, te(this.g) || 0)) + ", " + re(0, ae(255, te(this.b) || 0)) + (1 === t ? ")" : ", " + t + ")")
            }
        })), He(dt, ht, nt(it, {
            brighter: function (t) {
                return t = null == t ? ze : de(ze, t), new dt(this.h, this.s, this.l * t, this.opacity)
            },
            darker: function (t) {
                return t = null == t ? .7 : de(.7, t), new dt(this.h, this.s, this.l * t, this.opacity)
            },
            rgb: function () {
                var t = this.h % 360 + 360 * (0 > this.h), e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, i = n + (.5 > n ? n : 1 - n) * e, r = 2 * n - i;
                return new lt(ft(240 <= t ? t - 240 : t + 120, r, i), ft(t, r, i), ft(120 > t ? t + 240 : t - 120, r, i), this.opacity)
            },
            displayable: function () {
                return (0 <= this.s && 1 >= this.s || isNaN(this.s)) && 0 <= this.l && 1 >= this.l && 0 <= this.opacity && 1 >= this.opacity
            }
        }));
        var Qe = Qt / 180,
            tn = 180 / Qt,
            en = .95047,
            nn = 1,
            rn = 1.08883,
            sn = 4 / 29,
            on = 6 / 29, an = 3 * on * on,
            cn = on * on * on;
        He(gt, function (t, e, n, i) {
            return 1 === arguments.length ? pt(t) : new gt(t, e, n, null == i ? 1 : i)
        },
            nt(it, {
                brighter: function (t) {
                    return new gt(this.l + 18 * (null == t ? 1 : t), this.a, this.b, this.opacity)
                },
                darker: function (t) {
                    return new gt(this.l - 18 * (null == t ? 1 : t), this.a, this.b, this.opacity)
                },
                rgb: function () {
                    var t = (this.l + 16) / 116, e = isNaN(this.a) ? t : t + this.a / 500, n = isNaN(this.b) ? t : t - this.b / 200; return t = nn * vt(t), new lt(yt(3.2404542 * (e = en * vt(e)) - 1.5371385 * t - .4985314 * (n = rn * vt(n))), yt(-.969266 * e + 1.8760108 * t + .041556 * n), yt(.0556434 * e - .2040259 * t + 1.0572252 * n), this.opacity)
                }
            })),
            He(bt, wt, nt(it, {
                brighter: function (t) {
                    return new bt(this.h, this.c, this.l + 18 * (null == t ? 1 : t), this.opacity)
                },
                darker: function (t) {
                    return new bt(this.h, this.c, this.l - 18 * (null == t ? 1 : t), this.opacity)
                },
                rgb: function () {
                    return pt(this).rgb()
                }
            }));
        var ln = 1.78277,
            un = -.29227,
            hn = -.90649,
            dn = 1.97294,
            fn = dn * hn,
            pn = dn * ln,
            gn = ln * un - -.14861 * hn;
        He(St, Et, nt(it, {
            brighter: function (t) { return t = null == t ? ze : de(ze, t), new St(this.h, this.s, this.l * t, this.opacity) },
            darker: function (t) { return t = null == t ? .7 : de(.7, t), new St(this.h, this.s, this.l * t, this.opacity) },
            rgb: function () {
                var t = isNaN(this.h) ? 0 : (this.h + 120) * Qe, e = +this.l, n = isNaN(this.s) ? 0 : this.s * e * (1 - e), i = le(t), r = ue(t);
                return new lt(255 * (e + n * (-.14861 * i + ln * r)), 255 * (e + n * (un * i + hn * r)), 255 * (e + n * (dn * i)), this.opacity)
            }
        }));
        var mn,
            vn,
            yn,
            _n,
            wn,
            bn = function (t) {
                return function () { return t }
            },
            En = function t(e) {
                function n(t, e) {
                    var n = i((t = ct(t)).r, (e = ct(e)).r), r = i(t.g, e.g), s = i(t.b, e.b), o = Nt(t.opacity, e.opacity);
                    return function (e) { return t.r = n(e), t.g = r(e), t.b = s(e), t.opacity = o(e), t + "" }
                }
                var i = Ct(e);
                return n.gamma = t, n
            }(1),
            Sn = (It(function (t) {
                var e = t.length - 1;
                return function (n) {
                    var i = 0 >= n ? n = 0 : 1 <= n ? (n = 1, e - 1) : ie(n * e), r = t[i], s = t[i + 1], o = 0 < i ? t[i - 1] : 2 * r - s, a = i < e - 1 ? t[i + 2] : 2 * s - r;
                    return xt((n - i / e) * e, o, r, s, a)
                }
            }),
                It(function (t) {
                    var e = t.length;
                    return function (n) {
                        var i = ie((0 > (n %= 1) ? ++n : n) * e), r = t[(i + e - 1) % e], s = t[i % e], o = t[(i + 1) % e], a = t[(i + 2) % e];
                        return xt((n - i / e) * e, r, s, o, a)
                    }
                }),
                function (t, e) {
                    return e -= t = +t,
                        function (n) { return t + e * n }
                }),
            xn = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Tn = new RegExp(xn.source, "g"),
            kn = function (t, e) {
                var n, i = typeof e; return null == e || "boolean" == i ? bn(e) : ("number" == i ? Sn : "string" == i ? (n = rt(e)) ? (e = n, En) : function (t, e) {
                    var n, i, r, s = xn.lastIndex = Tn.lastIndex = 0, o = -1, a = [], c = [];
                    for (t += "", e += ""; (n = xn.exec(t)) && (i = Tn.exec(e));)(r = i.index) > s && (r = e.slice(s, r), a[o] ? a[o] += r : a[++o] = r), (n = n[0]) === (i = i[0]) ? a[o] ? a[o] += i : a[++o] = i : (a[++o] = null, c.push({ i: o, x: Sn(n, i) })), s = Tn.lastIndex;
                    return s < e.length && (r = e.slice(s), a[o] ? a[o] += r : a[++o] = r), 2 > a.length ? c[0] ? function (t) { return function (e) { return t(e) + "" } }(c[0].x) : function (t) { return function () { return t } }(e) : (e = c.length, function (t) { for (var n, i = 0; i < e; ++i)a[(n = c[i]).i] = n.x(t); return a.join("") })
                } : e instanceof rt ? En : e instanceof Date ? function (t, e) { var n = new Date; return e -= t = +t, function (i) { return n.setTime(t + e * i), n } } : Array.isArray(e) ? function (t, e) { var n, i = e ? e.length : 0, r = t ? ae(i, t.length) : 0, s = Array(r), o = Array(i); for (n = 0; n < r; ++n)s[n] = kn(t[n], e[n]); for (; n < i; ++n)o[n] = e[n]; return function (t) { for (n = 0; n < r; ++n)o[n] = s[n](t); return o } } : "function" != typeof e.valueOf && "function" != typeof e.toString || isNaN(e) ? function (t, e) { var n, i = {}, r = {}; for (n in (null === t || "object" != typeof t) && (t = {}), (null === e || "object" != typeof e) && (e = {}), e) n in t ? i[n] = kn(t[n], e[n]) : r[n] = e[n]; return function (t) { for (n in i) r[n] = i[n](t); return r } } : Sn)(t, e)
            },
            Cn = function (t, e) {
                return e -= t = +t,
                    function (n) { return te(t + e * n) }
            },
            Nn = 180 / Qt, In = { translateX: 0, translateY: 0, rotate: 0, skewX: 0, scaleX: 1, scaleY: 1 },
            An = function (t, e, n, i, r, s) {
                var o, a, c;
                return (o = oe(t * t + e * e)) && (t /= o, e /= o), (c = t * n + e * i) && (n -= t * c, i -= e * c), (a = oe(n * n + i * i)) && (n /= a, i /= a, c /= a), t * i < e * n && (t = -t, e = -e, c = -c, o = -o),
                    { translateX: r, translateY: s, rotate: Zt(e, t) * Nn, skewX: he(c) * Nn, scaleX: o, scaleY: a }
            },
            Mn = (At(function (t) {
                return "none" === t ? In : (mn || (mn = document.createElement("DIV"),
                    vn = document.documentElement,
                    yn = document.defaultView),
                    mn.style.transform = t,
                    t = yn.getComputedStyle(vn.appendChild(mn), null).getPropertyValue("transform"), vn.removeChild(mn),
                    t = t.slice(7, -1).split(","), An(+t[0], +t[1], +t[2], +t[3], +t[4], +t[5]))
            }, "px, ", "px)", "deg)"),
                At(function (t) {
                    return null == t ? In : (_n || (_n = document.createElementNS("http://www.w3.org/2000/svg", "g")),
                        _n.setAttribute("transform", t), (t = _n.transform.baseVal.consolidate()) ? (t = t.matrix, An(t.a, t.b, t.c, t.d, t.e, t.f)) : In)
                }, ", ", ")", ")"),
                Mt(kt),
                Mt(Nt),
                Ot(kt),
                Ot(Nt),
                Lt(kt),
                Lt(Nt),
                Array.prototype),
            On = Mn.map,
            Ln = Mn.slice,
            Dn = function (t) {
                return function () { return t }
            },
            Rn = function (t) {
                return +t
            },
            Pn = [0, 1],
            Un = function (t, e) {
                if (0 > (n = (t = e ? t.toExponential(e - 1) : t.toExponential()).indexOf("e"))) return null;
                var n, i = t.slice(0, n);
                return [1 < i.length ? i[0] + i.slice(2) : i, +t.slice(n + 1)]
            },
            Bn = function (t) {
                return (t = Un(ce(t))) ? t[1] : NaN
            },
            Fn = function (t, e) {
                var n = Un(t, e);
                if (!n) return t + ""; var i = n[0], r = n[1];
                return 0 > r ? "0." + Array(-r).join("0") + i : i.length > r + 1 ? i.slice(0, r + 1) + "." + i.slice(r + 1) : i + Array(r - i.length + 2).join("0")
            },
            jn = {
                "": function (t, e) {
                    t:
                    for (
                        var n,
                        i = (t = t.toPrecision(e)).length, r = 1, s = -1; r < i; ++r)switch (t[r]) {
                            case ".": s = n = r; break;
                            case "0": 0 === s && (s = r), n = r; break;
                            case "e": break t;
                            default: 0 < s && (s = 0)
                        }
                    return 0 < s ? t.slice(0, s) + t.slice(n + 1) : t
                }, "%": function (t, e) {
                    return (100 * t).toFixed(e)
                },
                b: function (t) {
                    return te(t).toString(2)
                },
                c: function (t) {
                    return t + ""
                },
                d: function (t) {
                    return te(t).toString(10)
                },
                e: function (t, e) {
                    return t.toExponential(e)
                },
                f: function (t, e) {
                    return t.toFixed(e)
                },
                g: function (t, e) {
                    return t.toPrecision(e)
                },
                o: function (t) {
                    return te(t).toString(8)
                },
                p: function (t, e) {
                    return Fn(100 * t, e)
                },
                r: Fn,
                s: function (t, e) {
                    var n = Un(t, e); if (!n) return t + "";
                    var i = n[0], r = n[1], s = r - (wn = 3 * re(-8, ae(8, ie(r / 3)))) + 1, o = i.length;
                    return s === o ? i : s > o ? i + Array(s - o + 1).join("0") : 0 < s ? i.slice(0, s) + "." + i.slice(s) : "0." + Array(1 - s).join("0") + Un(t, re(0, e + s - 1))[0]
                },
                X: function (t) {
                    return te(t).toString(16).toUpperCase()
                },
                x: function (t) { return te(t).toString(16) }
            },
            qn = /^(?:(.)?([<>=^]))?([+\-\( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?([a-z%])?$/i;
        Ut.prototype = Bt.prototype,
            Bt.prototype.toString = function () {
                return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (null == this.width ? "" : re(1, 0 | this.width)) + (this.comma ? "," : "") + (null == this.precision ? "" : "." + re(0, 0 | this.precision)) + this.type
            };
        var Hn, zn, Vn,
            Wn = function (t) {
                return t
            },
            Xn = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"],
            Jn = function (t) {
                function e(t) {
                    function e(t) {
                        var e, i, o, u = m, w = v;
                        if ("c" === g) w = y(t) + w, t = "";
                        else {
                            var b = 0 > (t = +t);
                            if (t = y(ce(t), p), b && 0 == +t && (b = !1), u = (b ? "(" === l ? l : "-" : "-" === l || "(" === l ? "" : l) + u, w = ("s" === g ? Xn[8 + wn / 3] : "") + w + (b && "(" === l ? ")" : ""), _)
                                for (e = -1, i = t.length; ++e < i;)
                                    if (48 > (o = t.charCodeAt(e)) || 57 < o) {
                                        w = (46 === o ? r + t.slice(e + 1) : t.slice(e)) + w, t = t.slice(0, e);
                                        break
                                    }
                        } f && !h && (t = n(t, 1 / 0));
                        var E = u.length + t.length + w.length, S = E < d ? Array(d - E + 1).join(a) : "";
                        switch (f && h && (t = n(S + t, S.length ? d - w.length : 1 / 0), S = ""), c) {
                            case "<": t = u + t + w + S; break;
                            case "=": t = u + S + t + w; break;
                            case "^": t = S.slice(0, E = S.length >> 1) + u + t + w + S.slice(E); break;
                            default: t = S + u + t + w
                        }
                        return s(t)
                    }
                    var a = (t = Ut(t)).fill,
                        c = t.align,
                        l = t.sign,
                        u = t.symbol,
                        h = t.zero,
                        d = t.width,
                        f = t.comma,
                        p = t.precision,
                        g = t.type, m = "$" === u ? i[0] : "#" === u && /[boxX]/.test(g) ? "0" + g.toLowerCase() : "",
                        v = "$" === u ? i[1] : /[%p]/.test(g) ? o : "",
                        y = jn[g], _ = !g || /[defgprs%]/.test(g);
                    return p = null == p ? g ? 6 : 12 : /[gprs]/.test(g) ? re(1, ae(21, p)) : re(0, ae(20, p)), e.toString = function () { return t + "" }, e
                }
                var n = t.grouping && t.thousands ? function (t, e) {
                    return function (n, i) {
                        for (var r = n.length,
                            s = [],
                            o = 0,
                            a = t[0],
                            c = 0;
                            0 < r && 0 < a && (c + a + 1 > i && (a = re(1, i - c)), s.push(n.substring(r -= a, r + a)), !((c += a + 1) > i));)a = t[o = (o + 1) % t.length];
                        return s.reverse().join(e)
                    }
                }(t.grouping, t.thousands) : Wn, i = t.currency, r = t.decimal, s = t.numerals ? function (t) {
                    return function (e) { return e.replace(/[0-9]/g, function (e) { return t[+e] }) }
                }(t.numerals) : Wn, o = t.percent || "%";
                return {
                    format: e, formatPrefix: function (t, n) {
                        var i = e(((t = Ut(t)).type = "f", t)), r = 3 * re(-8, ae(8, ie(Bn(n) / 3))), s = de(10, -r), o = Xn[8 + r / 3];
                        return function (t) { return i(s * t) + o }
                    }
                }
            };
        !function (t) { Hn = Jn(t), zn = Hn.format, Vn = Hn.formatPrefix }({ decimal: ".", thousands: ",", grouping: [3], currency: ["$", ""] });
        var Gn = function (t, e, n) {
            var i,
                r = t[0], s = t[t.length - 1],
                o = function (t, e, n) {
                    var i = ce(e - t) / re(0, n), r = de(10, ie(ne(i) / ee)), s = i / r;
                    return s >= Be ? r *= 10 : s >= Fe ? r *= 5 : s >= je && (r *= 2), e < t ? -r : r
                }(r, s, null == e ? 10 : e);
            switch ((n = Ut(null == n ? ",f" : n)).type) {
                case "s": var a = re(ce(r), ce(s));
                    return null != n.precision || isNaN(i = function (t, e) {
                        return re(0, 3 * re(-8, ae(8, ie(Bn(e) / 3))) - Bn(ce(t)))
                    }(o, a)) || (n.precision = i), Vn(n, a);
                case "":
                case "e":
                case "g":
                case "p":
                case "r": null != n.precision || isNaN(i = function (t, e) {
                    return t = ce(t), e = ce(e) - t, re(0, Bn(e) - Bn(t)) + 1
                }(o, re(ce(r), ce(s)))) || (n.precision = i - ("e" === n.type)); break;
                case "f":
                case "%": null != n.precision || isNaN(i = function (t) {
                    return re(0, -Bn(ce(t)))
                }(o)) || (n.precision = i - 2 * ("%" === n.type))
            }return zn(n)
        };
        const $n = {
            select: function (t) {
                return "string" == typeof t ? new tt([[document.querySelector(t)]], [document.documentElement]) : new tt([[t]], Oe)
            },
            scaleLinear: function t() {
                var e = function (t, e) {
                    function n() { return r = 2 < ae(a.length, c.length) ? Pt : Rt, s = o = null, i } function i(e) {
                        return (s || (s = r(a, c, u ? function (t) {
                            return function (e, n) {
                                var i = t(e = +e, n = +n);
                                return function (t) { return t <= e ? 0 : t >= n ? 1 : i(t) }
                            }
                        }(t) : t, l)))(+e)
                    }
                    var r, s, o, a = Pn, c = Pn, l = kn, u = !1;
                    return i.invert = function (t) {
                        return (o || (o = r(c, a, Dt, u ? function (t) {
                            return function (e, n) {
                                var i = t(e = +e, n = +n); return function (t) {
                                    return 0 >= t ? e : 1 <= t ? n : i(t)
                                }
                            }
                        }(e) : e)))(+t)
                    }, i.domain = function (t) {
                        return arguments.length ? (a = On.call(t, Rn), n()) : a.slice()
                    }, i.range = function (t) {
                        return arguments.length ? (c = Ln.call(t), n()) : c.slice()
                    }, i.rangeRound = function (t) {
                        return c = Ln.call(t), l = Cn, n()
                    }, i.clamp = function (t) {
                        return arguments.length ? (u = !!t, n()) : u
                    }, i.interpolate = function (t) {
                        return arguments.length ? (l = t, n()) : l
                    }, n()
                }(Dt, Sn);
                return e.copy = function () {
                    return function (t, e) {
                        return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp())
                    }(e, t())
                }, function (t) {
                    var e = t.domain;
                    return t.ticks = function (t) {
                        var n = e(); return qe(n[0], n[n.length - 1], null == t ? 10 : t)
                    }, t.tickFormat = function (t, n) {
                        return Gn(e(), t, n)
                    }, t.nice = function (n) {
                        null == n && (n = 10);
                        var i, r = e(), s = 0, o = r.length - 1, a = r[s], c = r[o];
                        return c < a && (i = a, a = c, c = i, i = s, s = o, o = i), 0 < (i = et(a, c, n)) ? i = et(a = ie(a / i) * i, c = se(c / i) * i, n) : 0 > i && (i = et(a = se(a * i) / i, c = ie(c * i) / i, n)), 0 < i ? (r[s] = ie(a / i) * i, r[o] = se(c / i) * i, e(r)) : 0 > i && (r[s] = se(a * i) / i, r[o] = ie(c * i) / i, e(r)), t
                    }, t
                }(e)
            },
            extent: function (t, e) {
                var n, i, r, s = t.length, o = -1;
                if (null == e) {
                    for (; ++o < s;)
                        if (null != (n = t[o]) && n >= n)
                            for (i = r = n; ++o < s;)null != (n = t[o]) && (i > n && (i = n), r < n && (r = n))
                }
                else for (; ++o < s;)
                    if (null != (n = e(t[o], o, t)) && n >= n)
                        for (i = r = n; ++o < s;)null != (n = e(t[o], o, t)) && (i > n && (i = n), r < n && (r = n));
                return [i, r]
            }
        },
            Yn = {
                STRAVA_CLIENT_ID: "19775",
                STRAVA_CLIENT_SECRET: "d1fd34e8c88fc5611ff41d9361e0668e9fe676f0",
                STRAVA_ACCESS_TOKEN: "b4eb2c4a2517d2b916583bcbeec2aa2f6a22a8b2"
            },
            Kn = { smooth: {} };
        Kn.smooth.kernel2 = function () {
            function t() {
                var t; t = a.map(function (t) { return [l(t), u(t)] }); var h = [];
                if ("number" == typeof o) for (e = 0; e < t.length; e++)h.push(o);
                else {
                    if ("object" != typeof o || !Array.isArray(o)) throw console.log(o), new Error("Invalid scale parameter");
                    if (o.length === t.length) h = o.slice();
                    else { var d = 0; for (e = 0; e < t.length; e++)h.push(o[d]), e < o.length ? d++ : d = 0 }
                }
                for (e = 0; e < t.length; e++) {
                    var f = 0,
                        p = 0,
                        g = 0,
                        m = r[c](t[e][0], t[e][0], h[e]);
                    for (f += m * t[e][1], p += m, n = e - 1; -1 < n && !((g = r[c](t[e][0], t[n][0], h[e])) / m < s); n--)f += g * t[n][1], p += g;
                    for (n = e + 1; n < t.length && !((g = r[c](t[e][0], t[n][0], h[e])) / m < s); n++)f += g * t[n][1], p += g; i.push([t[e][0], f / p])
                }
            }
            var e, n, i = [],
                r = { Uniform: Ht, Triangle: zt, Epanechnikov: jt, Quartic: Vt, Triweight: Wt, Logistic: qt, Cosine: Xt, Gaussian: Ft, Tricube: Jt, Silverman: Gt }, s = .001, o = [], a = [], c = "Gaussian", l = function (t) { return t[0] }, u = function (t) { return t[1] }; return t.scale = function (e) { return arguments.length ? (o = e, t) : o }, t.kernel = function (e) { if (!arguments.length) return c; if ("function" != typeof r[e]) throw new Error("Invalid kernel"); return c = e, t }, t.x = function (e) { return arguments.length ? (l = e, t) : l }, t.y = function (e) { return arguments.length ? (u = e, t) : u }, t.output = function () { return i }, t.diff = function (e) { return arguments.length ? (s = e, t) : s }, t.data = function (e) { return a = e, t }, t
        };
        var Zn = n(14), Qn = n.n(Zn);
        const ti = { container: t => JSON.parse(localStorage.getItem(t)) || [], unshift: (t, e) => { let n = ti.container(t); (n = n.filter(t => t !== e)).unshift(e), localStorage.setItem(t, JSON.stringify(n)) }, remove: (t, e) => { let n = ti.container(t); n = n.filter(t => t !== e), localStorage.removeItem(e), localStorage.setItem(t, JSON.stringify(n)) }, add: (t, e, n) => { let i = ti.container(t); if (i.unshift(e), 3 < i.length) { let t = i.pop(); localStorage.removeItem(t) } localStorage.setItem(t, JSON.stringify(i)), ti.set(e, n) }, set: (t, e) => { let n = e; "toJSON" in e && (n = e.toJSON()), localStorage.setItem(t, Qn.a.compressToUTF16(JSON.stringify(n))) }, get: t => { let e = localStorage.getItem(t); return null != e ? JSON.parse(Qn.a.decompressFromUTF16(e)) : e } }; var ei = n(24), ni = n.n(ei); class ii { constructor({ elevation: t, grade: e, smoothedGrade: n, distance: i, heading: r, climb: s, opposite: o, location: a }) { this.elevation = t, this.grade = e, this.smoothedGrade = n, this.distance = i, this.heading = r, this.climb = s, this.opposite = o, this.location = a instanceof google.maps.LatLng ? a : new google.maps.LatLng(a.lat, a.lng) } toJSON() { let { elevation: t, grade: e, smoothedGrade: n, distance: i, heading: r, climb: s, opposite: o } = this; return { elevation: t, grade: e, smoothedGrade: n, distance: i, heading: r, climb: s, opposite: o, location: this.location.toJSON() } } static fromJSON(t) { return new ii(t) } } class ri {
            constructor(t) { this.fileBody = t, this.md5 = ni()(t), this.points = [] } expandPointsWithGradeAndHeading() { for (let t, e = 0; e < this.points.length; e++)if (t = this.points[e], e < this.points.length - 1) { let n = this.points[e + 1]; t.heading = google.maps.geometry.spherical.computeHeading(t.location, n.location); let i = google.maps.geometry.spherical.computeDistanceBetween(t.location, n.location), r = n.elevation - t.elevation; t.distance = i, t.grade = r / i * 100, t.opposite = r, t.climb = r } else t.distance = 0, t.heading = 0, t.grade = 0, t.opposite = 0, t.climb = 0; let t = this.points.map((t, e) => [e, t.grade]), e = Kn.smooth.kernel2().kernel("Gaussian").data(t).scale(2); e(); let n = e.output(); for (let t = 0; t < this.points.length; t++)this.points[t].smoothedGrade = n[t][1], (.95 > this.points[t].smoothedGrade || 0 > this.points[t].climb) && (this.points[t].climb = 0) } async expandPointsWithElevation(t) {
                let e = 0; for (; e < t.length;) {
                    0 < e && await s(4e3);
                    let n = [], i = 0, o = 0;
                    for (let r = e; r < t.length; r++) {
                        let e = t[r], s = 0;
                        if (r < t.length - 1) { let n = t[r + 1]; s = google.maps.geometry.spherical.computeDistanceBetween(e.location, n.location) }
                        if (o += 1, !((i += s) <= 10240 && o < 512)) { o -= 1, i -= s; break } n.push(e.location)
                    }
                    let a = { path: n, samples: se(i / 20) }, c = (await r(a)).map(t => new ii({ elevation: t.elevation, location: t.location }));
                    Array.prototype.push.apply(this.points, c), e = o + e
                }
            }
            async create() {
                let t = "gpx-cache-" + this.md5, e = ti.get(t);
                if (null != e) ti.unshift("gpx-cache", t), this.points = e.map(t => ii.fromJSON(t));
                else {
                    let e = (new DOMParser).parseFromString(this.fileBody, "text/xml"),
                        n = Array.from(e.documentElement.getElementsByTagName("trkpt")).map(t => {
                            let e = parseFloat(t.getAttribute("lat")), n = parseFloat(t.getAttribute("lon"));
                            return new ii({ location: { lat: e, lng: n } })
                        });
                    await this.expandPointsWithElevation(n), this.expandPointsWithGradeAndHeading(), ti.add("gpx-cache", t, this.points)
                }
                return this.points
            }
        }
        n(27);
        class si {
            constructor({
                id: t,
                powerMeter: e,
                heartMeter: n,
                cadenceMeter: i,
                riderWeight: r,
                unit: s,
                routeName: o = "",
                history: a = [],
                points: c,
                ridingState: l
            }) {
                this.id = t,
                    this.powerMeter = e,
                    this.heartMeter = n,
                    this.cadenceMeter = i,
                    this.riderWeight = r,
                    this.unit = s,
                    this.routeName = o,
                    this.history = a,
                    this.points = c,
                    this.ridingState = l,
                    this.routeCompleted = !1,
                    this.powerSamples = [],
                    (void 0 === this.id || null === this.id) && (this.id = (new Date).getTime()),
                    "string" == typeof this.riderWeight && (this.riderWeight = parseInt(this.riderWeight)),
                    (void 0 === this.ridingState || null === this.ridingState) && (this.ridingState = {
                        pointIdx: 0,
                        point: this.points[0],
                        pointPct: 0,
                        lastSampleTime: new Date,
                        location: this.points[0].location,
                        elevation: this.points[0].elevation,
                        average_grade: 0,
                        mapMode: "SV",
                        watts: 0,
                        rpm: void 0,
                        bpm: void 0,
                        speed: 0,
                        distance: 0,
                        climb: 0,
                        elapsed: 0
                    })
            }
            //initieren van google maps scherm
            async init() {
                this.miniMap = new google.maps.Map(document.getElementById("tracker"), {
                    center: this.ridingState.point.location,
                    zoom: 14,
                    fullscreenControl: !1,
                    zoomControl: !0,
                    mapTypeId: google.maps.MapTypeId.TERRAIN
                });
                let t = this.points.map(t => ({ lat: t.location.lat(), lng: t.location.lng() }));
                new google.maps.Polyline({ path: t, geodesic: !0, strokeColor: "#0c7ac9", strokeOpacity: 1, strokeWeight: 2 }).setMap(this.miniMap),
                    this.fullMap = new google.maps.Map(document.getElementById("map-view"), {
                        center: this.ridingState.point.location,
                        zoom: 18, fullscreenControl: !1,
                        zoomControl: !0, mapTypeId: google.maps.MapTypeId.TERRAIN
                    }),
                    new google.maps.Polyline({ path: t, geodesic: !0, strokeColor: "#0c7ac9", strokeOpacity: 1, strokeWeight: 2 }).setMap(this.fullMap),
                    this.fullMarker = new google.maps.Marker({
                        position: this.ridingState.point.location,
                        map: this.fullMap,
                        icon: "./images/here.png"
                    }),
                    this.fullMarker.setMap(this.fullMap);
                let e = this.streetViewPanoramaInit(
                    this.ridingState.point.location,
                    this.ridingState.point.heading);
                this.miniMap.setStreetView(e),
                    this.zoomSvg = $n.select("#ui-elevation").append("svg").attr("id", "ui-elevation-svg").attr("x", 0).attr("y", 0).attr("viewBox", "0 0 150 60").attr("preserveAspectRatio", "none"),
                    this.drawHeightMap(),
                    this.powerMeter.addListener("power", t => this.collectPower(t)),
                    this.heartMeter && this.heartMeter.addListener("hr", t => this.collectHR(t)),
                    this.cadenceMeter && this.cadenceMeter.addListener("cadence", t => this.collectCadence(t));
                let n = await function (t) {
                    return new Promise(function (e, n) { ge.geocode({ location: t }, function (t, i) { "OK" === i ? e(t) : n(new Error(i)) }) })
                }(this.points[0].location), i = ["street_address", "route", "intersection", "postal_code"];
                for (let t of n) {
                    let e = "";
                    if (0 < t.types.length && (e = t.types[0]), !i.includes(e)) { this.routeName = t.formatted_address; break }
                }
            }
            collectPower(t) { this.powerSamples.push(t) }
            collectHR(t) { this.ridingState.bpm = t }
            collectCadence(t) { this.ridingState.rpm = t }
            streetViewPanoramaInit(t, e) {
                let n = document.getElementById("street-view");
                n.innerHTML = "";
                let i = new google.maps.StreetViewPanorama(n, {
                    visible: !0,
                    fullscreenControl: !1,
                    clickToGo: !1,
                    addressControl: !1,
                    panControl: !1,
                    zoomControl: !1,
                    linksControl: !1,
                    pov: { heading: e, pitch: 0 }, position: t
                });
                return i.addListener("status_changed", () => { i.setPov({ heading: this.ridingState.point.heading, pitch: 0 }) }), i
            }
            drawHeightMap() {
                this.fullSvg = $n.select("#ui-heightmap").append("svg").attr("id", "ui-heightmap-svg").attr("x", 0).attr("y", 0).attr("viewBox", "0 0 150 37.5").attr("preserveAspectRatio", "none"), this.fullSvgData = [];
                for (let t = 0; t < this.points.length; t++)this.fullSvgData.push([t, this.points[t].elevation]);
                let [t, e] = $n.extent(this.fullSvgData, t => t[1]); 125 > e - t && (e = t + 125);
                const n = $n.scaleLinear().domain([e, t]).range([6, 33]), i = $n.scaleLinear().domain([0, this.points.length - 1]).range([0, 150]);
                this.fullSvgData = this.fullSvgData.map(t => [i(t[0]), n(t[1])]),
                    this.fullSvgData.push([150, 37.5]),
                    this.fullSvgData.push([0, 37.5]),
                    this.fullSvgData.push([0, this.fullSvgData[0][1]]),
                    this.fullSvg.selectAll("polygon").data([this.fullSvgData]).attr("points", t => t.map(t => [t[0], t[1]].join(",")).join(" ")).enter().append("polygon").attr("points", t => t.map(t => [t[0], t[1]].join(",")).join(" ")).attr("fill", "#31A3CC").attr("stroke", "#31A3CC").attr("stroke-width", "1")
            }
            updateGraphs() {
                let t = Array(101);
                for (let e, n = 0; n < t.length; n++)0 > (e = n - 50 + this.ridingState.pointIdx) && (e = 0), e >= this.points.length && (e = this.points.length - 1), t[n] = [n, this.points[e].elevation];
                let [e, n] = $n.extent(t, t => t[1]); 50 > n - e && (n = e + 50);
                const i = $n.scaleLinear().domain([n, e]).range([15, 40.8]), r = $n.scaleLinear().domain([0, 100]).range([0, 150]);
                (t = t.map(t => [r(t[0]), i(t[1])])).push([150, 60]), t.push([0, 60]), t.push([0, t[0][1]]),
                    this.zoomSvg.selectAll("polygon").data([t]).attr("points",
                        t => t.map(t => [t[0], t[1]].join(",")).join(" ")).enter().append("polygon").attr("points",
                            t => t.map(t => [t[0], t[1]].join(",")).join(" ")).attr("fill", "#31A3CC").attr("stroke", "#31A3CC").attr("stroke-width", "1"),
                    this.zoomSvg.selectAll("image").data([t[51]]).attr("x", t => t[0] - 7.5).attr("y",
                        t => t[1] - 15).attr("width", "15").attr("height", "15").attr("xlink:href", "./images/marker.svg").enter().append("image").attr("x",
                            t => { t[0] }).attr("y", t => { t[1] }),
                    this.fullSvg.selectAll("image").data([this.fullSvgData[this.ridingState.pointIdx]]).attr("x", t => t[0] - 3).attr("y",
                        t => t[1] - 6).attr("width", "6").attr("height", "6").attr("xlink:href", "./images/marker.svg").enter().append("image").attr("x",
                            t => { t[0] }).attr("y", t => { t[1] })
            }
            async updatePosition() {
                for (let t = 0; !this.routeCompleted;) {
                    this.powerSamples.length && (this.ridingState.watts = this.powerSamples.reduce((t, e) => t + e, 0) / this.powerSamples.length, this.powerSamples.length = 0);
                    let e = new Date, n = (e - this.ridingState.lastSampleTime) / 1e3; this.ridingState.lastSampleTime = e;
                    let r = 1, o = 0, a = 0;
                    for (; 0 < r;) {
                        let t = this.speedFromPower(
                            this.ridingState.watts,
                            this.ridingState.point.smoothedGrade,
                            this.ridingState.point.elevation),
                            e = this.ridingState.speed + .2 * (t - this.ridingState.speed);
                        .447 > e && (e = 0);
                        let i = e * n * r, s = this.ridingState.point.distance - this.ridingState.point.distance * this.ridingState.pointPct;
                        if (i > s) {
                            let t = s / i;
                            if (a += this.ridingState.point.smoothedGrade * t, r -= r * t,
                                this.ridingState.pointIdx += 1,
                                this.ridingState.pointPct = 0,
                                this.ridingState.climb += this.ridingState.point.climb,
                                this.ridingState.point = this.points[this.ridingState.pointIdx], o += s,
                                this.ridingState.pointIdx >= this.points.length) break
                        }
                        else {
                            let t = r;
                            a += this.ridingState.point.smoothedGrade * t, r = 0, 0 == s ? this.ridingState.pointPct = 0 : (this.ridingState.pointPct = 1 - (s - i) / this.ridingState.point.distance, o += i)
                        }
                    }
                    if (this.ridingState.pointIdx >= this.points.length) break;
                    if (
                        this.ridingState.average_grade = a,
                        this.ridingState.distance += o,
                        this.ridingState.elevation = this.ridingState.point.elevation + this.ridingState.point.opposite * this.ridingState.pointPct,
                        //this.ridingState.speed = o / n, 0 < this.ridingState.speed && (this.ridingState.elapsed += n),
                        this.ridingState.location = google.maps.geometry.spherical.interpolate(
                            this.ridingState.point.location,
                            this.points[this.ridingState.pointIdx + 1].location,
                            this.ridingState.pointPct),
                        this.history.push({
                            time: e, location: this.ridingState.location,
                            power: this.ridingState.watts,
                            elevation: this.ridingState.elevation,
                            hr: this.ridingState.bpm,
                            cad: this.ridingState.rpm
                        }), 0 == t % 5) {
                        let t = this.miniMap.getStreetView();
                        // bijgevoegd om onmiddelijk te stoppen als het vermogen = 0, anders loop je nog eventjes verder
                        if (this.ridingState.watts > 0) {
                            this.ridingState.speed = o / n, 0 < this.ridingState.speed && (this.ridingState.elapsed += n);
                        }
                        else {
                            this.ridingState.speed = 0;
                        }

                        try {
                            let e = await i(this.ridingState.location, 50); "profileUrl" in e.location || ("MV" === this.ridingState.mapMode && (
                                document.getElementById("map-view").style.display = "none",
                                document.getElementById("tracker").style.display = "block",
                                document.getElementById("street-view").style.display = "block",
                                t.setVisible(!0),
                                google.maps.event.trigger(t, "resize"),
                                google.maps.event.trigger(this.miniMap, "resize")),
                                this.miniMap.panTo(this.ridingState.location),
                                "MV" === this.ridingState.mapMode ? t.setPano(e.location.pano) : t.setPosition(this.ridingState.location),
                                this.ridingState.mapMode = "SV")
                        }
                        catch (e) {
                            "SV" === this.ridingState.mapMode && (t.setVisible(!1),
                                document.getElementById("street-view").style.display = "none",
                                document.getElementById("tracker").style.display = "none",
                                document.getElementById("map-view").style.display = "block",
                                google.maps.event.trigger(this.fullMap, "resize")),
                                this.ridingState.mapMode = "MV",
                                this.fullMap.panTo(this.ridingState.location),
                                this.fullMarker.setPosition(this.ridingState.location)
                        }
                    } 0 == t % 30 && Promise.resolve().then(() => { ti.set(this.cacheName(), this) }), this.updateGraphs(), t += 1, await s(1e3)
                } this.routeCompleted = !0
            }
            speedFromPower(t, e, n) {
                let i = 1e3 * Yt(-n / 7e3),
                    r = function (t, e) {
                        var n = -1e3, i = 1e3, r = 0, s = c(r, e), o = 0; do { if (ce(s - t) < 1e-6) break; s > t ? i = r : n = r, s = c(r = (i + n) / 2, e) }
                        while (100 > o++);
                        return r
                    }(t, {
                        units: "metric",
                        rp_wr: this.riderWeight * ("imperial" === this.unit ? .453592 : 1),
                        rp_wb: 8,
                        rp_a: .65,
                        rp_cd: .63,
                        rp_dtl: 4,
                        ep_crr: .005,
                        ep_g: e,
                        ep_rho: a(23.8889, i, 7.5)
                    });
                return r *= .277778
            }
            // continu bijwerken van google streetview scherm
            async updateUI() {               
                for (; !this.routeCompleted;) {
                    let t = this.ridingState.elapsed.toFixed(), e = ie(t / 3600), n = ie((t - 3600 * e) / 60), i = t - 3600 * e - 60 * n; 10 > n && (n = "0" + n), 10 > i && (i = "0" + i);
                    let r = 0 === e ? n + ":" + i : e + ":" + n + ":" + i, o = this.ridingState.distance * ("imperial" === this.unit ? 621371e-9 : .001); o = 100 < o ? o.toFixed() : o.toFixed(1);
                    let a = this.ridingState.average_grade.toFixed(1); ("-0" === a || "-0.0" === a) && (a = "0.0");
                    let c = document.getElementById("grade-unit-icon"); 0 <= a ? c.classList.contains("fa-long-arrow-down") && (c.classList.remove("fa-long-arrow-down"),
                        c.classList.add("fa-long-arrow-up")) : c.classList.contains("fa-long-arrow-up") && (c.classList.remove("fa-long-arrow-up"), c.classList.add("fa-long-arrow-down"));
                    let l = this.ridingState.watts; l = null != l ? l.toFixed() : "--";
                    let u = this.ridingState.bpm; u = null != u ? u.toFixed() : "--";
                    //indien geen cadence sensor maar een speed sensor is operationeel dan is ridingState.rpm = undifined en wordt er geen rekening gehouden met de waarde van fixpower_cadence
                    if (this.ridingState.rpm >= 0) { this.ridingState.watts = fixpower_cadence; };
                    let h = this.ridingState.rpm; h = null != h ? h.toFixed() : "--",                        
                        document.getElementById("watts").innerHTML = l,
                        document.getElementById("heart").innerHTML = u,
                        document.getElementById("cadence").innerHTML = h,
                        document.getElementById("speed").innerHTML = (this.ridingState.speed * ("imperial" === this.unit ? 2.23694 : 3.6)).toFixed(),
                        document.getElementById("distance").innerHTML = o,
                        document.getElementById("climb").innerHTML = (this.ridingState.climb * ("imperial" === this.unit ? 3.28084 : 1)).toFixed(),
                        document.getElementById("time").innerHTML = r,
                        document.getElementById("grade").innerHTML = a,
                        document.getElementById("distance-unit-value").innerHTML = "imperial" === this.unit ? "mi" : "&nbsp;km",
                        document.getElementById("speed-unit-value").innerHTML = "imperial" === this.unit ? "mph" : "km/h",
                        document.getElementById("climb-container-value").innerHTML = "imperial" === this.unit ? "ft" : "m", await s(1e3)
                }
            }
            async stravaExport() {
                let t = document.getElementById("btn-export-strava");
                if (t.classList.contains("disabled")) return; t.classList.add("disabled"), t.innerHTML = "Exporting", this.routeCompleted = !0;
                let e = document.getElementById("input-ride-name").value,
                    n = document.getElementById("strava-gpx-template").innerHTML,
                    i = this.history.map(t => ({
                        lat: t.location.lat(),
                        lng: t.location.lng(),
                        elevation: t.elevation.toFixed(5),
                        time: o(t.time),
                        power: t.power,
                        hr: t.hr,
                        cad: t.cad
                    })),
                    r = ve.a.render(n, { export_time: o(new Date), export_name: e, points: i }),
                    a = new FormData; a.set("client_id", Yn.STRAVA_CLIENT_ID),
                        a.set("client_secret", Yn.STRAVA_CLIENT_SECRET),
                        a.set("code", localStorage.getItem("strava-oauth-code-" + Yn.STRAVA_CLIENT_ID));
                let c = await fetch("https://www.strava.com/oauth/token", { method: "POST", body: a }),
                    l = (await c.json()).access_token, u = new File([r], "import_to_strava.gpx", { type: "text/xml" }),
                    h = new FormData;
                h.set("activity_type", "virtualride"),
                    h.set("name", e),
                    h.set("data_type", "gpx"),
                    h.set("file", u);
                let d = new Headers;
                d.set("Authorization", "Bearer " + l);
                let f = await fetch("https://www.strava.com/api/v3/uploads", { method: "POST", headers: d, body: h }),
                    p = (await f.json()).id; for (; ;) {
                        let t = await fetch("https://www.strava.com/api/v3/uploads/" + p, { headers: d });
                        if ((await t.json()).activity_id) break; await s(4e3)
                    }
                ti.remove("route-progress", this.cacheName()), t.innerHTML = "Done!"
            }
            showFinalizeUI(t) {
                if (
                    document.getElementById("ui-finalize-container").style.display = "block",
                    document.getElementById("ui-finalize-label").innerHTML = t,
                    localStorage.getItem("strava-oauth-code-" + Yn.STRAVA_CLIENT_ID)) {
                    let t = new Date,
                        e = "GPedal - ";
                    e += this.routeName ? this.routeName : t.getMonth() + 1 + "/" + t.getDate();
                    let n = document.getElementById("input-ride-name");
                    n.value = e,
                        n.style.display = "block";
                    let i = document.getElementById("btn-export-strava"); i.style.display = "block", i.onclick = t => {
                        t.preventDefault(),
                            this.stravaExport().catch(t => { console.log("Error: ", t) })
                    }
                }
            }
            cacheName() {
                return "route-progress-" + this.id
            }
            toJSON() {
                let { history: t, id: e, points: n, riderWeight: i, ridingState: r, routeName: s, unit: o } = this;
                return t = t.map(t => (
                    t = Object.assign({}, t),
                    t.location = t.location.toJSON(),
                    t.time = t.time.toJSON(), t)),
                    n = n.map(t => t.toJSON()),
                    (r = Object.assign({}, r)).lastSampleTime = r.lastSampleTime.toJSON(),
                    r.location = r.location.toJSON(),
                    r.point = r.point.toJSON(),
                    r.bpm = void 0,
                    r.rpm = void 0,
                    r.speed = 0,
                    r.watts = 0, {
                    history: t,
                    id: e,
                    points: n,
                    riderWeight: i,
                    ridingState: r,
                    routeName: s,
                    unit: o
                }
            }
            static fromJSON(t) {
                for (let e of t.history) e.location = new google.maps.LatLng(e.location.lat, e.location.lng), e.time = new Date(e.time);
                return t.points = t.points.map(t => ii.fromJSON(t)), t.ridingState.lastSampleTime = new Date(t.ridingState.lastSampleTime),
                    t.ridingState.location = new google.maps.LatLng(t.ridingState.location.lat, t.ridingState.location.lng), t.ridingState.point = ii.fromJSON(t.ridingState.point), new si(t)
            }
            static transitionUI() { document.getElementById("configure-container").style.display = "none", document.getElementById("app-container").style.display = "block" }
        }
        var oi = n(25), ai = n.n(oi);
        let ci = ["getInt16", 2, !0],
            li = ["getUint16", 2, !0],
            ui = ["getUint32", 4, !0],
            hi = [
                [0, [[ci, "instantaneous_power"]]],
                [1, [[["getUint8", 1], "pedal_power_balance"]]],
                [2, []],
                [4, [[li, "accumulated_torque"]]],
                [8, []],
                [16, [[ui, "cumulative_wheel_revolutions"], [li, "last_wheel_event_time"]]],
                [32, [[li, "cumulative_crank_revolutions"], [li, "last_crank_event_time"]]],
                [64, [[ci, "maximum_force_magnitude"], [ci, "minimum_force_magnitude"]]],
                [128, [[ci, "maximum_torque_magnitude"], [ci, "minimum_torque_magnitude"]]],
                [256, [[["getUint8", 3], "maximum_minimum_angle"]]],
                [512, [[li, "top_dead_spot_angle"]]],
                [1024, [[li, "bottom_dead_spot_angle"]]],
                [2048, [[li, "accumulated_energy"]]],
                [4096, []]], di = [[1, [[ui, "cumulative_wheel_revolutions"], [li, "last_wheel_event_time"]]], [2, [[li, "cumulative_crank_revolutions"], [li, "last_crank_event_time"]]]],
            fi = {
                1: "garmin",
                2: "garmin_fr405_antfs",
                3: "zephyr",
                4: "dayton", 5: "idt", 6: "srm", 7: "quarq", 8: "ibike", 9: "saris", 10: "spark_hk", 11: "tanita", 12: "echowell", 13: "dynastream_oem", 14: "nautilus", 15: "dynastream", 16: "timex", 17: "metrigear", 18: "xelic", 19: "beurer", 20: "cardiosport", 21: "a_and_d", 22: "hmm", 23: "suunto", 24: "thita_elektronik", 25: "gpulse", 26: "clean_mobile", 27: "pedal_brain", 28: "peaksware", 29: "saxonar", 30: "lemond_fitness", 31: "dexcom", 32: "wahoo_fitness", 33: "octane_fitness", 34: "archinoetics", 35: "the_hurt_box", 36: "citizen_systems", 37: "magellan", 38: "osynce", 39: "holux", 40: "concept2", 42: "one_giant_leap", 43: "ace_sensor", 44: "brim_brothers", 45: "xplova", 46: "perception_digital", 47: "bf1systems", 48: "pioneer", 49: "spantec", 50: "metalogics", 51: "4iiiis", 52: "seiko_epson", 53: "seiko_epson_oem", 54: "ifor_powell", 55: "maxwell_guider", 56: "star_trac", 57: "breakaway", 58: "alatech_technology_ltd", 59: "mio_technology_europe", 60: "rotor", 61: "geonaute", 62: "id_bike", 63: "specialized", 64: "wtek", 65: "physical_enterprises", 66: "north_pole_engineering", 67: "bkool", 68: "cateye", 69: "stages_cycling", 70: "sigmasport", 71: "tomtom", 72: "peripedal", 73: "wattbike", 76: "moxy", 77: "ciclosport", 78: "powerbahn", 79: "acorn_projects_aps", 80: "lifebeam", 81: "bontrager", 82: "wellgo", 83: "scosche", 84: "magura", 85: "woodway", 86: "elite", 87: "nielsen_kellerman", 88: "dk_city", 89: "tacx", 90: "direction_technology", 91: "magtonic", 92: "1partcarbon", 93: "inside_ride_technologies", 94: "sound_of_motion", 95: "stryd", 96: "icg", 97: "MiPulse", 98: "bsx_athletics", 99: "look", 100: "campagnolo_srl", 101: "body_bike_smart", 102: "praxisworks", 103: "limits_technology", 104: "topaction_technology", 105: "cosinuss", 106: "fitcare", 107: "magene", 108: "giant_manufacturing_co", 109: "tigrasport", 110: "salutron", 111: "technogym", 112: "bryton_sensors", 113: "latitude_limited", 114: "soaring_technology", 115: "igpsport", 116: "thinkrider", 117: "gopher_sport", 118: "waterrower", 255: "development", 257: "healthandlife", 258: "lezyne", 259: "scribe_labs", 260: "zwift", 261: "watteam", 262: "recon", 263: "favero_electronics", 264: "dynovelo", 265: "strava", 266: "precor", 267: "bryton", 268: "sram", 269: "navman", 270: "cobi", 271: "spivi", 272: "mio_magellan", 273: "evesports", 274: "sensitivus_gauge", 275: "podoon", 276: "life_time_fitness", 277: "falco_e_motors", 278: "minoura", 279: "cycliq", 280: "luxottica", 281: "trainer_road", 282: "the_sufferfest", 283: "fullspeedahead", 284: "virtualtraining", 285: "feedbacksports", 286: "omata", 287: "vdo", 5759: "actigraphcorp"
            };
        class pi {
            getData(t) {
                let e, n = 0; 16 === this.mask_size ? (e = t.getUint16(0, !0), n += 2) : (e = t.getUint8(0), n += 1);
                let i = []; if (0 === this.fields[0][0]) for (let t of this.fields[0][1]) i.push(t);
                for (let [t, n] of this.fields) if (e & t) for (let t of n) i.push(t);
                let r = {}; for (let e of i) {
                    var [[s, o, a], c] = e;
                    let i; i = a ? t[s](n, a) : t[s](n), r[c] = i, n += o
                }
                return r
            }
        }
        class gi extends pi { constructor() { super(), this.fields = di, this.mask_size = 8 } }
        class mi extends pi { constructor() { super(), this.fields = hi, this.mask_size = 16 } }
          //vi child class of another class
        class vi {
            constructor() {
                this.listeners = {}, this.timeoutID = void 0, this.milliTimeout = 8e3
            }
            clearValueOnTimeout(t) {
                void 0 !== this.timeoutID && clearTimeout(this.timeoutID), this.timeoutID = setTimeout(() => {
                    if (this.timeoutID = void 0, t.constructor === Array) for (let e of t) this.dispatch(e, 0);
                    else this.dispatch(t, 0)
                }, this.milliTimeout)
            }
            addListener(t, e) {
                t in this.listeners || (this.listeners[t] = []), this.listeners[t].push(e)
            }
            dispatch(t, e) {
                t in this.listeners || (this.listeners[t] = []);
                for (let n of this.listeners[t]) n(e)
            }
        }
        //yi child class of another class
        class yi extends vi {
            //The constructor method is a special method for creating and initializing an object created
            constructor(t, e, n, i) {
                //The super keyword is used to access and call functions on an object's parent.
                super(),
                    this.device = t,
                    this.server = e,
                    this.service = n,
                    this.characteristic = i,
                    this.name = this.device.name,
                    this.id = this.device.id,
                    this.listening = !1,
                    this.device.addEventListener("gattserverdisconnected",
                        t => { this.gattserverdisconnected(t).catch(t => { console.log("Error: ", t) }) })
            }
            async gattserverdisconnected() {
                console.log("Reconnecting"),
                    this.server = await this.device.gatt.connect(),
                    this.service = await this.server.getPrimaryService(this.serviceId),
                    this.characteristic = await this.service.getCharacteristic(this.characteristicId), this.listening && (this.listening = !1, this.listen())
            }
        }
        //cumulative_crank_revolutions
        //The extends keyword is used to create a child class of another class (parent).
        class _i extends yi {
            constructor(t, e, n, i) {
                super(t, e, n, i),
                    this.serviceId = 6168,
                    this.characteristicId = 10851,
                    this.parser = new mi,
                    this.lastCrankRevolutions = 0,
                    this.lastCrankTime = 0,
                    this.lastWheelRevolutions = 0,
                    this.lastWheelTime = 0
            }
            listen() {
                this.listening || (this.characteristic.addEventListener("characteristicvaluechanged", t => {
                    let e = this.parser.getData(t.target.value),
                        n = e.instantaneous_power,
                        i = e.cumulative_crank_revolutions,
                        r = e.last_crank_event_time,
                        s = e.cumulative_wheel_revolutions,
                        o = e.last_wheel_event_time;
                    this.lastCrankTime > r && (this.lastCrankTime -= 65536), this.lastCrankRevolutions > i && (this.lastCrankRevolutions -= 65536);
                    let a = i - this.lastCrankRevolutions, c = (r - this.lastCrankTime) / 1024, l = 0;
                    if (0 < c && (l = a / c * 60),
                        this.lastCrankRevolutions = i,
                        this.lastCrankTime = r, void 0 !== s && void 0 !== o) {
                        this.lastWheelTime > o && (this.lastWheelTime -= 65536),
                            this.lastWheelRevolutions > s && (this.lastWheelRevolutions -= 65536);
                        let t = s - this.lastWheelRevolutions, e = (o - this.lastWheelTime) / 1024, n = 0; 0 < e && (n = t / e * 60),
                            this.lastWheelRevolutions = s,
                            this.lastWheelTime = o,
                            this.dispatch("wheelrpm", n)
                    } this.dispatch("power", n), this.dispatch("cadence", l), this.clearValueOnTimeout(["power", "cadence", "wheelrpm"])
                }), this.characteristic.startNotifications(), this.listening = !0)
            }
        }
        //yi is a child class of wi
        class wi extends yi {
            constructor(t, e, n, i) {
                super(t, e, n, i),
                    this.serviceId = 6168,
                    this.characteristicId = 10851,
                    this.parser = new mi
            }
            listen() {
                this.listening || (this.characteristic.addEventListener("characteristicvaluechanged", t => {
                    let e = this.parser.getData(t.target.value).instantaneous_power;
                    this.dispatch("power", e),
                        this.clearValueOnTimeout("power")
                }),
                    this.characteristic.startNotifications(),
                    this.listening = !0)
            }
        }
                //yi is a child class of bi
        class bi extends yi {
            constructor(t, e, n, i) {
                super(t, e, n, i),
                    this.serviceId = 6166,
                    this.characteristicId = 10843,
                    this.parser = new gi,
                    this.lastCrankRevolutions = 0,
                    this.lastCrankTime = 0,
                    this.lastWheelRevolutions = 0,
                    this.lastWheelTime = 0
            }
            listen() {
           
                this.listening || (this.characteristic.addEventListener("characteristicvaluechanged", t => {
                    let e = this.parser.getData(t.target.value),
                        n = e.cumulative_crank_revolutions,
                        i = e.last_crank_event_time,
                        r = e.cumulative_wheel_revolutions,
                        s = e.last_wheel_event_time;
                    if (void 0 !== n && void 0 !== i) {
                        this.lastCrankTime > i && (this.lastCrankTime -= 65536),
                            this.lastCrankRevolutions > n && (this.lastCrankRevolutions -= 65536);
                        let t = n - this.lastCrankRevolutions,
                            e = (i - this.lastCrankTime) / 1024,
                            r = 0;
                        0 < e && (r = t / e * 60),
                            this.lastCrankRevolutions = n,
                            this.lastCrankTime = i,
                            this.dispatch("cadence", r);
                        //als het een cadence sensor wil ik ook dat we kunnen fietsen in het scherm street view, 
                        //vandaar dat ik de this.ridingState.watts = 50 watt maakt zie de functie async updateUI()
                        //"counter_sensor_0" toegvoegd omdat regelmatig een 0 waarde verschijnt ondanks dat de sensor toch beweegt
                        //if (counter_sensor_0 > 2) geeft rust van het getal watt op het scherm
                        if (r > 0) {
                            fixpower_cadence = 50;
                        }
                        else {
                            if (counter_sensor_0 > 2) {
                                fixpower_cadence = 0;
                                counter_sensor_0 = 0;
                            }
                            else {
                                counter_sensor_0 = counter_sensor_0 + 1;
                            }
                        }
                    }
                    if (void 0 !== r && void 0 !== s) {
                        this.lastWheelTime > s && (
                            this.lastWheelTime -= 65536),
                            this.lastWheelRevolutions > r && (this.lastWheelRevolutions -= 65536);
                        let t = r - this.lastWheelRevolutions, e = (s - this.lastWheelTime) / 1024, n = 0; 0 < e && (n = t / e * 60),
                            this.lastWheelRevolutions = r,
                            this.lastWheelTime = s,
                            this.dispatch("wheelrpm", n)
                    }
                    //this.clearValueOnTimeout(["cadence", "wheelrpm"])
                    this.clearValueOnTimeout(["cadence", "wheelrpm", "power"])
                }), this.characteristic.startNotifications(), this.listening = !0)
            }

        }
        class Ei extends yi {
            constructor(t, e, n, i) { super(t, e, n, i), this.serviceId = 6157, this.characteristicId = 10807 } listen() {
                this.listening || (this.characteristic.addEventListener("characteristicvaluechanged", t => {
                    let e = t.target.value.getUint8(1);
                    this.dispatch("hr", e), this.clearValueOnTimeout("hr")
                }),
                    this.characteristic.startNotifications(), this.listening = !0)
            }
        }
        class Si extends vi {
            constructor() { super(), this.listening = !1, this.watts = 0, this.id = "virtual", this.name = "Virtual Power Meter" } listen() {
                if (!this.listening) {
                    document.getElementById("ui-vpower-container").style.display = "block";
                    let t = document.getElementById("vpower");
                    t.value = this.watts, t.onchange = () => { this.watts = parseInt(t.value) }, setInterval(() => { this.dispatch("power", this.watts) }, 750), this.listening = !0
                }
            }
        }
        class xi extends vi {
            constructor() { super(), this.listening = !1, this.id = "cycleopsmagnetopowercurve", this.name = "Cycleops Magneto Power Curve" } listen(t) {
                if (!this.listening) {
                    let e = t.cadenceMeter;
                    void 0 !== e && (e.addListener("wheelrpm", t => {
                        let e = this.Exponential_DoubleAsymptoticExponentialB_model(2136 * t * 60 / 1e6);
                        0 > e && (e = 0),
                            this.dispatch("power", e),
                            this.clearValueOnTimeout("power")
                    }), this.listening = !0)
                }
            }
            Exponential_DoubleAsymptoticExponentialB_model(t) {
                let e = 0;
                return e = -425.5747279901687 * (1 - Yt(.01671978158087617 * t)) + -73.52558744233421 * (1 - Yt(-.13986922573862917 * t))
            }
        }
        class Ti extends vi {
            constructor(t, e, n, i) {
                super(), this.type = t,
                    this.manId = e,
                    this.modelNum = n,
                    this.deviceId = i,
                    this.setName()
            }
            listen() { } setName() {
                let t = "Unknown";
                this.manId in fi && (t = fi[this.manId].split("_").map(t => t[0].toUpperCase() + t.substr(1)).join(" ")), this.name = t + " - " + this.deviceId
            }
        }
        class ki extends Ti {
            constructor(t, e, n, i, r) {
                super(e, n, i, r),
                    this.id = t
            } antMessage(t) { let e = t.Power; void 0 !== e && (this.dispatch("power", e), this.clearValueOnTimeout("power")) }
        }
        class Ci extends Ti {
            constructor(t, e, n, i, r) { super(e, n, i, r), this.id = t, this.lastWheelRevolutions = 0, this.lastWheelTime = 0 } antMessage(t) {
                let e;
                void 0 !== t.Cadence && (e = t.Cadence),
                    void 0 !== t.CalculatedCadence && (e = t.CalculatedCadence),
                    void 0 !== e && this.dispatch("cadence", e);
                let n = t.SpeedEventTime, i = t.CumulativeSpeedRevolutionCount;
                if (void 0 !== i && void 0 !== n && this.lastWheelTime !== n) {
                    this.lastWheelTime > n && (this.lastWheelTime -= 65536),
                        this.lastWheelRevolutions > i && (this.lastWheelRevolutions -= 65536);
                    let t = i - this.lastWheelRevolutions, e = (n - this.lastWheelTime) / 1024, r = 0; 0 < e && (r = t / e * 60),
                        this.lastWheelRevolutions = i,
                        this.lastWheelTime = n,
                        this.dispatch("wheelrpm", r)
                }
                this.clearValueOnTimeout(["cadence", "wheelrpm"])
            }
        }
        class Ni extends Ti {
            constructor(t, e, n, i, r) {
                super(e, n, i, r),
                    this.id = t
            } antMessage(t) {
                let e = t.ComputedHeartRate;
                void 0 !== e && (this.dispatch("hr", e), this.clearValueOnTimeout("hr"))
            }
        }
        class Ii {
            constructor(t = "http://localhost:8000/") {
                this.url = t,
                    this.listeners = {},
                    this.devicesByType = {},
                    this.devices = {},
                    this.url.startsWith("http") || (this.url = "http://" + this.url),
                    this.url.endsWith("/") || (this.url += "/"),
                    this.meterClasses = { hr: Ni, bike_power: ki, speed_cadence: Ci }
            }
            addListener(t, e) { t in this.listeners || (this.listeners[t] = []), this.listeners[t].push(e) } dispatch(t, e) {
                t in this.listeners || (this.listeners[t] = []);
                for (let n of this.listeners[t]) n(e)
            }
            scan() {
                let t = new ai.a.Client(this.url, { timeout: 120, retry: 10 });
                t.on("transport:down", t => { this.dispatch("error", t) }), t.subscribe("/*", t => {
                    const e = JSON.parse(t.text);
                    let n = [e.type]; "bike_power" === e.type && (e.Cadence || e.CalculatedCadence) && n.push("speed_cadence");
                    for (let t of n) {
                        let n = t + e.DeviceID;
                        if (!(n in this.devicesByType) && t in this.meterClasses) {
                            let i = new this.meterClasses[t](n, t, e.ManId, e.ModelNum, e.DeviceID);
                            e.DeviceID in this.devices || (this.devices[e.DeviceID] = []), this.devices[e.DeviceID].push(i), this.devicesByType[n] = i, this.dispatch(t, i)
                        }
                    }
                    if (e.DeviceID in this.devices)
                        for (let t of this.devices[e.DeviceID]) t.antMessage(e);
                    if ((void 0 !== e.ManId || void 0 !== e.ModelNum) && e.DeviceID in this.devices)
                        for (let t of this.devices[e.DeviceID]) { let n = !1; void 0 !== e.ManId && e.ManId !== t.manId && (t.manId = e.ManId, n = !0), void 0 !== e.ModelNum && e.ModelNum !== t.modelNum && (t.modelNum = e.ModelNum, n = !0), n && (t.setName(), this.dispatch("namechange", t)) }
                })
            }
        }
        var Ai = n(26), Mi = n.n(Ai), Oi = n(9), Li = n.n(Oi); document.addEventListener("DOMContentLoaded", () => { $t() })
    }]);
//# sourceMappingURL=bundle.js.map