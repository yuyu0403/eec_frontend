/*
 Highcharts JS v9.1.2 (2021-06-16)

 (c) 2009-2021 Torstein Honsi

 License: www.highcharts.com/license
*/
"use strict";
(function (e) {
    "object" === typeof module && module.exports
        ? ((e["default"] = e), (module.exports = e))
        : "function" === typeof define && define.amd
        ? define("highcharts/highcharts-more", ["highcharts"], function (y) {
              e(y);
              e.Highcharts = y;
              return e;
          })
        : e("undefined" !== typeof Highcharts ? Highcharts : void 0);
})(function (e) {
    function y(e, c, d, l) {
        e.hasOwnProperty(c) || (e[c] = l.apply(null, d));
    }
    e = e ? e._modules : {};
    y(e, "Extensions/Pane.js", [e["Core/Chart/Chart.js"], e["Core/Globals.js"], e["Core/Color/Palette.js"], e["Core/Pointer.js"], e["Core/Utilities.js"], e["Mixins/CenteredSeries.js"]], function (e, c, d, l, a, n) {
        function f(b, a, h) {
            return Math.sqrt(Math.pow(b - h[0], 2) + Math.pow(a - h[1], 2)) <= h[2] / 2;
        }
        var r = a.addEvent,
            q = a.extend,
            w = a.merge,
            b = a.pick,
            h = a.splat;
        e.prototype.collectionsWithUpdate.push("pane");
        a = (function () {
            function b(b, a) {
                this.options = this.chart = this.center = this.background = void 0;
                this.coll = "pane";
                this.defaultOptions = { center: ["50%", "50%"], size: "85%", innerSize: "0%", startAngle: 0 };
                this.defaultBackgroundOptions = {
                    shape: "circle",
                    borderWidth: 1,
                    borderColor: d.neutralColor20,
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, d.backgroundColor],
                            [1, d.neutralColor10],
                        ],
                    },
                    from: -Number.MAX_VALUE,
                    innerRadius: 0,
                    to: Number.MAX_VALUE,
                    outerRadius: "105%",
                };
                this.init(b, a);
            }
            b.prototype.init = function (b, a) {
                this.chart = a;
                this.background = [];
                a.pane.push(this);
                this.setOptions(b);
            };
            b.prototype.setOptions = function (b) {
                this.options = w(this.defaultOptions, this.chart.angular ? { background: {} } : void 0, b);
            };
            b.prototype.render = function () {
                var b = this.options,
                    a = this.options.background,
                    p = this.chart.renderer;
                this.group ||
                    (this.group = p
                        .g("pane-group")
                        .attr({ zIndex: b.zIndex || 0 })
                        .add());
                this.updateCenter();
                if (a) for (a = h(a), b = Math.max(a.length, this.background.length || 0), p = 0; p < b; p++) a[p] && this.axis ? this.renderBackground(w(this.defaultBackgroundOptions, a[p]), p) : this.background[p] && ((this.background[p] = this.background[p].destroy()), this.background.splice(p, 1));
            };
            b.prototype.renderBackground = function (b, a) {
                var h = "animate",
                    p = { class: "highcharts-pane " + (b.className || "") };
                this.chart.styledMode || q(p, { fill: b.backgroundColor, stroke: b.borderColor, "stroke-width": b.borderWidth });
                this.background[a] || ((this.background[a] = this.chart.renderer.path().add(this.group)), (h = "attr"));
                this.background[a][h]({ d: this.axis.getPlotBandPath(b.from, b.to, b) }).attr(p);
            };
            b.prototype.updateCenter = function (b) {
                this.center = (b || this.axis || {}).center = n.getCenter.call(this);
            };
            b.prototype.update = function (b, a) {
                w(!0, this.options, b);
                w(!0, this.chart.options.pane, b);
                this.setOptions(this.options);
                this.render();
                this.chart.axes.forEach(function (b) {
                    b.pane === this && ((b.pane = null), b.update({}, a));
                }, this);
            };
            return b;
        })();
        e.prototype.getHoverPane = function (b) {
            var a = this,
                h;
            b &&
                a.pane.forEach(function (p) {
                    var c = b.chartX - a.plotLeft,
                        F = b.chartY - a.plotTop;
                    f(a.inverted ? F : c, a.inverted ? c : F, p.center) && (h = p);
                });
            return h;
        };
        r(e, "afterIsInsidePlot", function (b) {
            this.polar &&
                (b.isInsidePlot = this.pane.some(function (a) {
                    return f(b.x, b.y, a.center);
                }));
        });
        r(l, "beforeGetHoverData", function (a) {
            var h = this.chart;
            h.polar
                ? ((h.hoverPane = h.getHoverPane(a)),
                  (a.filter = function (p) {
                      return p.visible && !(!a.shared && p.directTouch) && b(p.options.enableMouseTracking, !0) && (!h.hoverPane || p.xAxis.pane === h.hoverPane);
                  }))
                : (h.hoverPane = void 0);
        });
        r(l, "afterGetHoverData", function (b) {
            var a = this.chart;
            b.hoverPoint && b.hoverPoint.plotX && b.hoverPoint.plotY && a.hoverPane && !f(b.hoverPoint.plotX, b.hoverPoint.plotY, a.hoverPane.center) && (b.hoverPoint = void 0);
        });
        c.Pane = a;
        return c.Pane;
    });
    y(e, "Core/Axis/HiddenAxis.js", [], function () {
        return (function () {
            function e() {}
            e.init = function (c) {
                c.getOffset = function () {};
                c.redraw = function () {
                    this.isDirty = !1;
                };
                c.render = function () {
                    this.isDirty = !1;
                };
                c.createLabelCollector = function () {
                    return function () {};
                };
                c.setScale = function () {};
                c.setCategories = function () {};
                c.setTitle = function () {};
                c.isHidden = !0;
            };
            return e;
        })();
    });
    y(e, "Core/Axis/RadialAxis.js", [e["Core/Axis/Axis.js"], e["Core/Axis/AxisDefaults.js"], e["Core/Axis/Tick.js"], e["Core/Axis/HiddenAxis.js"], e["Core/Utilities.js"]], function (e, c, d, l, a) {
        var n = a.addEvent,
            f = a.correctFloat,
            r = a.defined,
            q = a.extend,
            w = a.fireEvent,
            b = a.merge,
            h = a.pick,
            p = a.relativeLength,
            v = a.wrap;
        a = (function () {
            function a() {}
            a.init = function (a) {
                var c = e.prototype;
                a.setOptions = function (h) {
                    h = this.options = b(a.constructor.defaultOptions, this.defaultPolarOptions, h);
                    h.plotBands || (h.plotBands = []);
                    w(this, "afterSetOptions");
                };
                a.getOffset = function () {
                    c.getOffset.call(this);
                    this.chart.axisOffset[this.side] = 0;
                };
                a.getLinePath = function (b, a, t) {
                    b = this.pane.center;
                    var k = this.chart,
                        g = h(a, b[2] / 2 - this.offset),
                        u = this.left || 0,
                        m = this.top || 0;
                    "undefined" === typeof t && (t = this.horiz ? 0 : this.center && -this.center[3] / 2);
                    t && (g += t);
                    this.isCircular || "undefined" !== typeof a
                        ? ((a = this.chart.renderer.symbols.arc(u + b[0], m + b[1], g, g, { start: this.startAngleRad, end: this.endAngleRad, open: !0, innerR: 0 })), (a.xBounds = [u + b[0]]), (a.yBounds = [m + b[1] - g]))
                        : ((a = this.postTranslate(this.angleRad, g)),
                          (a = [
                              ["M", this.center[0] + k.plotLeft, this.center[1] + k.plotTop],
                              ["L", a.x, a.y],
                          ]));
                    return a;
                };
                a.setAxisTranslation = function () {
                    c.setAxisTranslation.call(this);
                    this.center && ((this.transA = this.isCircular ? (this.endAngleRad - this.startAngleRad) / (this.max - this.min || 1) : (this.center[2] - this.center[3]) / 2 / (this.max - this.min || 1)), (this.minPixelPadding = this.isXAxis ? this.transA * this.minPointOffset : 0));
                };
                a.beforeSetTickPositions = function () {
                    this.autoConnect = this.isCircular && "undefined" === typeof h(this.userMax, this.options.max) && f(this.endAngleRad - this.startAngleRad) === f(2 * Math.PI);
                    !this.isCircular && this.chart.inverted && this.max++;
                    this.autoConnect && (this.max += (this.categories && 1) || this.pointRange || this.closestPointRange || 0);
                };
                a.setAxisSize = function () {
                    c.setAxisSize.call(this);
                    if (this.isRadial) {
                        this.pane.updateCenter(this);
                        var b = (this.center = this.pane.center.slice());
                        if (this.isCircular) this.sector = this.endAngleRad - this.startAngleRad;
                        else {
                            var a = this.postTranslate(this.angleRad, b[3] / 2);
                            b[0] = a.x - this.chart.plotLeft;
                            b[1] = a.y - this.chart.plotTop;
                        }
                        this.len = this.width = this.height = ((b[2] - b[3]) * h(this.sector, 1)) / 2;
                    }
                };
                a.getPosition = function (b, a) {
                    b = this.translate(b);
                    return this.postTranslate(this.isCircular ? b : this.angleRad, h(this.isCircular ? a : 0 > b ? 0 : b, this.center[2] / 2) - this.offset);
                };
                a.postTranslate = function (b, a) {
                    var t = this.chart,
                        k = this.center;
                    b = this.startAngleRad + b;
                    return { x: t.plotLeft + k[0] + Math.cos(b) * a, y: t.plotTop + k[1] + Math.sin(b) * a };
                };
                a.getPlotBandPath = function (b, a, t) {
                    var k = function (g) {
                            if ("string" === typeof g) {
                                var k = parseInt(g, 10);
                                p.test(g) && (k = (k * m) / 100);
                                return k;
                            }
                            return g;
                        },
                        g = this.center,
                        u = this.startAngleRad,
                        m = g[2] / 2,
                        A = Math.min(this.offset, 0),
                        x = this.left || 0,
                        z = this.top || 0,
                        p = /%$/;
                    var c = this.isCircular;
                    var D = h(k(t.outerRadius), m),
                        f = k(t.innerRadius);
                    k = h(k(t.thickness), 10);
                    if ("polygon" === this.options.gridLineInterpolation) A = this.getPlotLinePath({ value: b }).concat(this.getPlotLinePath({ value: a, reverse: !0 }));
                    else {
                        b = Math.max(b, this.min);
                        a = Math.min(a, this.max);
                        b = this.translate(b);
                        a = this.translate(a);
                        c || ((D = b || 0), (f = a || 0));
                        if ("circle" !== t.shape && c) (t = u + (b || 0)), (u += a || 0);
                        else {
                            t = -Math.PI / 2;
                            u = 1.5 * Math.PI;
                            var r = !0;
                        }
                        D -= A;
                        A = this.chart.renderer.symbols.arc(x + g[0], z + g[1], D, D, { start: Math.min(t, u), end: Math.max(t, u), innerR: h(f, D - (k - A)), open: r });
                        c && ((c = (u + t) / 2), (x = x + g[0] + (g[2] / 2) * Math.cos(c)), (A.xBounds = c > -Math.PI / 2 && c < Math.PI / 2 ? [x, this.chart.plotWidth] : [0, x]), (A.yBounds = [z + g[1] + (g[2] / 2) * Math.sin(c)]), (A.yBounds[0] += (c > -Math.PI && 0 > c) || c > Math.PI ? -10 : 10));
                    }
                    return A;
                };
                a.getCrosshairPosition = function (b, a, t) {
                    var k = b.value,
                        g = this.pane.center;
                    if (this.isCircular) {
                        if (r(k)) b.point && ((u = b.point.shapeArgs || {}), u.start && (k = this.chart.inverted ? this.translate(b.point.rectPlotY, !0) : b.point.x));
                        else {
                            var u = b.chartX || 0;
                            var m = b.chartY || 0;
                            k = this.translate(Math.atan2(m - t, u - a) - this.startAngleRad, !0);
                        }
                        b = this.getPosition(k);
                        u = b.x;
                        m = b.y;
                    } else r(k) || ((u = b.chartX), (m = b.chartY)), r(u) && r(m) && ((t = g[1] + this.chart.plotTop), (k = this.translate(Math.min(Math.sqrt(Math.pow(u - a, 2) + Math.pow(m - t, 2)), g[2] / 2) - g[3] / 2, !0)));
                    return [k, u || 0, m || 0];
                };
                a.getPlotLinePath = function (b) {
                    var a = this,
                        t = a.pane.center,
                        k = a.chart,
                        g = k.inverted,
                        u = b.value,
                        m = b.reverse,
                        A = a.getPosition(u),
                        x = a.pane.options.background ? a.pane.options.background[0] || a.pane.options.background : {},
                        h = x.innerRadius || "0%",
                        c = x.outerRadius || "100%";
                    x = t[0] + k.plotLeft;
                    var f = t[1] + k.plotTop,
                        D = A.x,
                        r = A.y,
                        d = a.height;
                    A = t[3] / 2;
                    var l;
                    b.isCrosshair && ((r = this.getCrosshairPosition(b, x, f)), (u = r[0]), (D = r[1]), (r = r[2]));
                    if (a.isCircular)
                        (u = Math.sqrt(Math.pow(D - x, 2) + Math.pow(r - f, 2))),
                            (m = "string" === typeof h ? p(h, 1) : h / u),
                            (k = "string" === typeof c ? p(c, 1) : c / u),
                            t && A && ((u = A / u), m < u && (m = u), k < u && (k = u)),
                            (t = [
                                ["M", x + m * (D - x), f - m * (f - r)],
                                ["L", D - (1 - k) * (D - x), r + (1 - k) * (f - r)],
                            ]);
                    else if (((u = a.translate(u)) && (0 > u || u > d) && (u = 0), "circle" === a.options.gridLineInterpolation)) t = a.getLinePath(0, u, A);
                    else if (
                        ((t = []),
                        k[g ? "yAxis" : "xAxis"].forEach(function (g) {
                            g.pane === a.pane && (l = g);
                        }),
                        l)
                    )
                        for (x = l.tickPositions, l.autoConnect && (x = x.concat([x[0]])), m && (x = x.slice().reverse()), u && (u += A), D = 0; D < x.length; D++) (f = l.getPosition(x[D], u)), t.push(D ? ["L", f.x, f.y] : ["M", f.x, f.y]);
                    return t;
                };
                a.getTitlePosition = function () {
                    var b = this.center,
                        a = this.chart,
                        t = this.options.title;
                    return { x: a.plotLeft + b[0] + (t.x || 0), y: a.plotTop + b[1] - { high: 0.5, middle: 0.25, low: 0 }[t.align] * b[2] + (t.y || 0) };
                };
                a.createLabelCollector = function () {
                    var b = this;
                    return function () {
                        if (b.isRadial && b.tickPositions && b.options.labels && !0 !== b.options.labels.allowOverlap)
                            return b.tickPositions
                                .map(function (a) {
                                    return b.ticks[a] && b.ticks[a].label;
                                })
                                .filter(function (b) {
                                    return !!b;
                                });
                    };
                };
            };
            a.compose = function (f, d) {
                n(f, "init", function (h) {
                    var z = this.chart,
                        t = z.inverted,
                        k = z.angular,
                        g = z.polar,
                        u = this.isXAxis,
                        m = this.coll,
                        A = k && u,
                        x,
                        p = z.options;
                    h = h.userOptions.pane || 0;
                    h = this.pane = z.pane && z.pane[h];
                    if ("colorAxis" === m) this.isRadial = !1;
                    else {
                        if (k) {
                            if ((A ? l.init(this) : a.init(this), (x = !u))) this.defaultPolarOptions = a.defaultRadialGaugeOptions;
                        } else g && (a.init(this), (this.defaultPolarOptions = (x = this.horiz) ? a.defaultCircularOptions : b("xAxis" === m ? c.defaultXAxisOptions : c.defaultYAxisOptions, a.defaultRadialOptions)), t && "yAxis" === m && ((this.defaultPolarOptions.stackLabels = c.defaultYAxisOptions.stackLabels), (this.defaultPolarOptions.reversedStacks = !0)));
                        k || g ? ((this.isRadial = !0), (p.chart.zoomType = null), this.labelCollector || (this.labelCollector = this.createLabelCollector()), this.labelCollector && z.labelCollectors.push(this.labelCollector)) : (this.isRadial = !1);
                        h && x && (h.axis = this);
                        this.isCircular = x;
                    }
                });
                n(f, "afterInit", function () {
                    var b = this.chart,
                        a = this.options,
                        t = this.pane,
                        k = t && t.options;
                    (b.angular && this.isXAxis) || !t || (!b.angular && !b.polar) || ((this.angleRad = ((a.angle || 0) * Math.PI) / 180), (this.startAngleRad = ((k.startAngle - 90) * Math.PI) / 180), (this.endAngleRad = ((h(k.endAngle, k.startAngle + 360) - 90) * Math.PI) / 180), (this.offset = a.offset || 0));
                });
                n(f, "autoLabelAlign", function (b) {
                    this.isRadial && ((b.align = void 0), b.preventDefault());
                });
                n(f, "destroy", function () {
                    if (this.chart && this.chart.labelCollectors) {
                        var b = this.labelCollector ? this.chart.labelCollectors.indexOf(this.labelCollector) : -1;
                        0 <= b && this.chart.labelCollectors.splice(b, 1);
                    }
                });
                n(f, "initialAxisTranslation", function () {
                    this.isRadial && this.beforeSetTickPositions();
                });
                n(d, "afterGetPosition", function (b) {
                    this.axis.getPosition && q(b.pos, this.axis.getPosition(this.pos));
                });
                n(d, "afterGetLabelPosition", function (b) {
                    var a = this.axis,
                        t = this.label;
                    if (t) {
                        var k = t.getBBox(),
                            g = a.options.labels,
                            u = g.y,
                            m = 20,
                            A = g.align,
                            x = (((a.translate(this.pos) + a.startAngleRad + Math.PI / 2) / Math.PI) * 180) % 360,
                            c = Math.round(x),
                            f = "end",
                            d = 0 > c ? c + 360 : c,
                            D = d,
                            l = 0,
                            e = 0,
                            w = r(u) ? 0 : 0.3 * -k.height;
                        if (a.isRadial) {
                            var q = a.getPosition(this.pos, a.center[2] / 2 + p(h(g.distance, -25), a.center[2] / 2, -a.center[2] / 2));
                            "auto" === g.rotation ? t.attr({ rotation: x }) : r(u) || (u = a.chart.renderer.fontMetrics(t.styles && t.styles.fontSize).b - k.height / 2);
                            r(A) || (a.isCircular ? (k.width > (a.len * a.tickInterval) / (a.max - a.min) && (m = 0), (A = x > m && x < 180 - m ? "left" : x > 180 + m && x < 360 - m ? "right" : "center")) : (A = "center"), t.attr({ align: A }));
                            if ("auto" === A && 2 === a.tickPositions.length && a.isCircular) {
                                90 < d && 180 > d ? (d = 180 - d) : 270 < d && 360 >= d && (d = 540 - d);
                                180 < D && 360 >= D && (D = 360 - D);
                                if (a.pane.options.startAngle === c || a.pane.options.startAngle === c + 360 || a.pane.options.startAngle === c - 360) f = "start";
                                A = (-90 <= c && 90 >= c) || (-360 <= c && -270 >= c) || (270 <= c && 360 >= c) ? ("start" === f ? "right" : "left") : "start" === f ? "left" : "right";
                                70 < D && 110 > D && (A = "center");
                                15 > d || (180 <= d && 195 > d) ? (l = 0.3 * k.height) : 15 <= d && 35 >= d ? (l = "start" === f ? 0 : 0.75 * k.height) : 195 <= d && 215 >= d ? (l = "start" === f ? 0.75 * k.height : 0) : 35 < d && 90 >= d ? (l = "start" === f ? 0.25 * -k.height : k.height) : 215 < d && 270 >= d && (l = "start" === f ? k.height : 0.25 * -k.height);
                                15 > D ? (e = "start" === f ? 0.15 * -k.height : 0.15 * k.height) : 165 < D && 180 >= D && (e = "start" === f ? 0.15 * k.height : 0.15 * -k.height);
                                t.attr({ align: A });
                                t.translate(e, l + w);
                            }
                            b.pos.x = q.x + (g.x || 0);
                            b.pos.y = q.y + (u || 0);
                        }
                    }
                });
                v(d.prototype, "getMarkPath", function (b, a, t, k, g, u, m) {
                    var A = this.axis;
                    A.isRadial ? ((b = A.getPosition(this.pos, A.center[2] / 2 + k)), (a = ["M", a, t, "L", b.x, b.y])) : (a = b.call(this, a, t, k, g, u, m));
                    return a;
                });
            };
            a.defaultCircularOptions = { gridLineWidth: 1, labels: { align: void 0, distance: 15, x: 0, y: void 0, style: { textOverflow: "none" } }, maxPadding: 0, minPadding: 0, showLastLabel: !1, tickLength: 0 };
            a.defaultRadialGaugeOptions = { labels: { align: "center", x: 0, y: void 0 }, minorGridLineWidth: 0, minorTickInterval: "auto", minorTickLength: 10, minorTickPosition: "inside", minorTickWidth: 1, tickLength: 10, tickPosition: "inside", tickWidth: 2, title: { rotation: 0 }, zIndex: 2 };
            a.defaultRadialOptions = { gridLineInterpolation: "circle", gridLineWidth: 1, labels: { align: "right", x: -3, y: -2 }, showLastLabel: !1, title: { x: 4, text: null, rotation: 90 } };
            return a;
        })();
        a.compose(e, d);
        return a;
    });
    y(e, "Series/AreaRange/AreaRangePoint.js", [e["Series/Area/AreaSeries.js"], e["Core/Series/Point.js"], e["Core/Utilities.js"]], function (e, c, d) {
        var l =
                (this && this.__extends) ||
                (function () {
                    var a = function (c, f) {
                        a =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (b, a) {
                                    b.__proto__ = a;
                                }) ||
                            function (b, a) {
                                for (var h in a) a.hasOwnProperty(h) && (b[h] = a[h]);
                            };
                        return a(c, f);
                    };
                    return function (c, f) {
                        function b() {
                            this.constructor = c;
                        }
                        a(c, f);
                        c.prototype = null === f ? Object.create(f) : ((b.prototype = f.prototype), new b());
                    };
                })(),
            a = c.prototype,
            n = d.defined,
            f = d.isNumber;
        return (function (c) {
            function d() {
                var a = (null !== c && c.apply(this, arguments)) || this;
                a.high = void 0;
                a.low = void 0;
                a.options = void 0;
                a.plotHigh = void 0;
                a.plotLow = void 0;
                a.plotHighX = void 0;
                a.plotLowX = void 0;
                a.plotX = void 0;
                a.series = void 0;
                return a;
            }
            l(d, c);
            d.prototype.setState = function () {
                var c = this.state,
                    b = this.series,
                    h = b.chart.polar;
                n(this.plotHigh) || (this.plotHigh = b.yAxis.toPixels(this.high, !0));
                n(this.plotLow) || (this.plotLow = this.plotY = b.yAxis.toPixels(this.low, !0));
                b.stateMarkerGraphic && ((b.lowerStateMarkerGraphic = b.stateMarkerGraphic), (b.stateMarkerGraphic = b.upperStateMarkerGraphic));
                this.graphic = this.upperGraphic;
                this.plotY = this.plotHigh;
                h && (this.plotX = this.plotHighX);
                a.setState.apply(this, arguments);
                this.state = c;
                this.plotY = this.plotLow;
                this.graphic = this.lowerGraphic;
                h && (this.plotX = this.plotLowX);
                b.stateMarkerGraphic && ((b.upperStateMarkerGraphic = b.stateMarkerGraphic), (b.stateMarkerGraphic = b.lowerStateMarkerGraphic), (b.lowerStateMarkerGraphic = void 0));
                a.setState.apply(this, arguments);
            };
            d.prototype.haloPath = function () {
                var c = this.series.chart.polar,
                    b = [];
                this.plotY = this.plotLow;
                c && (this.plotX = this.plotLowX);
                this.isInside && (b = a.haloPath.apply(this, arguments));
                this.plotY = this.plotHigh;
                c && (this.plotX = this.plotHighX);
                this.isTopInside && (b = b.concat(a.haloPath.apply(this, arguments)));
                return b;
            };
            d.prototype.isValid = function () {
                return f(this.low) && f(this.high);
            };
            return d;
        })(e.prototype.pointClass);
    });
    y(e, "Series/AreaRange/AreaRangeSeries.js", [e["Series/AreaRange/AreaRangePoint.js"], e["Series/Area/AreaSeries.js"], e["Series/Column/ColumnSeries.js"], e["Core/Globals.js"], e["Core/Series/Series.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function (e, c, d, l, a, n, f) {
        var r =
                (this && this.__extends) ||
                (function () {
                    var b = function (a, h) {
                        b =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (b, k) {
                                    b.__proto__ = k;
                                }) ||
                            function (b, k) {
                                for (var g in k) k.hasOwnProperty(g) && (b[g] = k[g]);
                            };
                        return b(a, h);
                    };
                    return function (a, h) {
                        function t() {
                            this.constructor = a;
                        }
                        b(a, h);
                        a.prototype = null === h ? Object.create(h) : ((t.prototype = h.prototype), new t());
                    };
                })(),
            q = c.prototype,
            w = d.prototype;
        d = l.noop;
        var b = a.prototype,
            h = f.defined,
            p = f.extend,
            v = f.isArray,
            C = f.pick,
            H = f.merge;
        a = (function (a) {
            function f() {
                var b = (null !== a && a.apply(this, arguments)) || this;
                b.data = void 0;
                b.options = void 0;
                b.points = void 0;
                b.lowerStateMarkerGraphic = void 0;
                b.xAxis = void 0;
                return b;
            }
            r(f, a);
            f.prototype.toYData = function (b) {
                return [b.low, b.high];
            };
            f.prototype.highToXY = function (b) {
                var a = this.chart,
                    k = this.xAxis.postTranslate(b.rectPlotX || 0, this.yAxis.len - b.plotHigh);
                b.plotHighX = k.x - a.plotLeft;
                b.plotHigh = k.y - a.plotTop;
                b.plotLowX = b.plotX;
            };
            f.prototype.translate = function () {
                var b = this,
                    a = b.yAxis,
                    k = !!b.modifyValue;
                q.translate.apply(b);
                b.points.forEach(function (g) {
                    var u = g.high,
                        m = g.plotY;
                    g.isNull ? (g.plotY = null) : ((g.plotLow = m), (g.plotHigh = a.translate(k ? b.modifyValue(u, g) : u, 0, 1, 0, 1)), k && (g.yBottom = g.plotHigh));
                });
                this.chart.polar &&
                    this.points.forEach(function (g) {
                        b.highToXY(g);
                        g.tooltipPos = [(g.plotHighX + g.plotLowX) / 2, (g.plotHigh + g.plotLow) / 2];
                    });
            };
            f.prototype.getGraphPath = function (b) {
                var a = [],
                    k = [],
                    g,
                    u = q.getGraphPath;
                var m = this.options;
                var A = this.chart.polar,
                    x = A && !1 !== m.connectEnds,
                    h = m.connectNulls,
                    c = m.step;
                b = b || this.points;
                for (g = b.length; g--; ) {
                    var f = b[g];
                    var p = A ? { plotX: f.rectPlotX, plotY: f.yBottom, doCurve: !1 } : { plotX: f.plotX, plotY: f.plotY, doCurve: !1 };
                    f.isNull || x || h || (b[g + 1] && !b[g + 1].isNull) || k.push(p);
                    var d = { polarPlotY: f.polarPlotY, rectPlotX: f.rectPlotX, yBottom: f.yBottom, plotX: C(f.plotHighX, f.plotX), plotY: f.plotHigh, isNull: f.isNull };
                    k.push(d);
                    a.push(d);
                    f.isNull || x || h || (b[g - 1] && !b[g - 1].isNull) || k.push(p);
                }
                b = u.call(this, b);
                c && (!0 === c && (c = "left"), (m.step = { left: "right", center: "center", right: "left" }[c]));
                a = u.call(this, a);
                k = u.call(this, k);
                m.step = c;
                m = [].concat(b, a);
                !this.chart.polar && k[0] && "M" === k[0][0] && (k[0] = ["L", k[0][1], k[0][2]]);
                this.graphPath = m;
                this.areaPath = b.concat(k);
                m.isArea = !0;
                m.xMap = b.xMap;
                this.areaPath.xMap = b.xMap;
                return m;
            };
            f.prototype.drawDataLabels = function () {
                var a = this.points,
                    t = a.length,
                    k,
                    g = [],
                    u = this.options.dataLabels,
                    m,
                    A = this.chart.inverted;
                if (u) {
                    if (v(u)) {
                        var x = u[0] || { enabled: !1 };
                        var h = u[1] || { enabled: !1 };
                    } else (x = p({}, u)), (x.x = u.xHigh), (x.y = u.yHigh), (h = p({}, u)), (h.x = u.xLow), (h.y = u.yLow);
                    if (x.enabled || this._hasPointLabels) {
                        for (k = t; k--; )
                            if ((m = a[k])) {
                                var c = x.inside ? m.plotHigh < m.plotLow : m.plotHigh > m.plotLow;
                                m.y = m.high;
                                m._plotY = m.plotY;
                                m.plotY = m.plotHigh;
                                g[k] = m.dataLabel;
                                m.dataLabel = m.dataLabelUpper;
                                m.below = c;
                                A ? x.align || (x.align = c ? "right" : "left") : x.verticalAlign || (x.verticalAlign = c ? "top" : "bottom");
                            }
                        this.options.dataLabels = x;
                        b.drawDataLabels && b.drawDataLabels.apply(this, arguments);
                        for (k = t; k--; ) if ((m = a[k])) (m.dataLabelUpper = m.dataLabel), (m.dataLabel = g[k]), delete m.dataLabels, (m.y = m.low), (m.plotY = m._plotY);
                    }
                    if (h.enabled || this._hasPointLabels) {
                        for (k = t; k--; ) if ((m = a[k])) (c = h.inside ? m.plotHigh < m.plotLow : m.plotHigh > m.plotLow), (m.below = !c), A ? h.align || (h.align = c ? "left" : "right") : h.verticalAlign || (h.verticalAlign = c ? "bottom" : "top");
                        this.options.dataLabels = h;
                        b.drawDataLabels && b.drawDataLabels.apply(this, arguments);
                    }
                    if (x.enabled)
                        for (k = t; k--; )
                            if ((m = a[k]))
                                m.dataLabels = [m.dataLabelUpper, m.dataLabel].filter(function (g) {
                                    return !!g;
                                });
                    this.options.dataLabels = u;
                }
            };
            f.prototype.alignDataLabel = function () {
                w.alignDataLabel.apply(this, arguments);
            };
            f.prototype.drawPoints = function () {
                var a = this.points.length,
                    t;
                b.drawPoints.apply(this, arguments);
                for (t = 0; t < a; ) {
                    var k = this.points[t];
                    k.origProps = { plotY: k.plotY, plotX: k.plotX, isInside: k.isInside, negative: k.negative, zone: k.zone, y: k.y };
                    k.lowerGraphic = k.graphic;
                    k.graphic = k.upperGraphic;
                    k.plotY = k.plotHigh;
                    h(k.plotHighX) && (k.plotX = k.plotHighX);
                    k.y = C(k.high, k.origProps.y);
                    k.negative = k.y < (this.options.threshold || 0);
                    this.zones.length && (k.zone = k.getZone());
                    this.chart.polar || (k.isInside = k.isTopInside = "undefined" !== typeof k.plotY && 0 <= k.plotY && k.plotY <= this.yAxis.len && 0 <= k.plotX && k.plotX <= this.xAxis.len);
                    t++;
                }
                b.drawPoints.apply(this, arguments);
                for (t = 0; t < a; ) (k = this.points[t]), (k.upperGraphic = k.graphic), (k.graphic = k.lowerGraphic), k.origProps && (p(k, k.origProps), delete k.origProps), t++;
            };
            f.defaultOptions = H(c.defaultOptions, { lineWidth: 1, threshold: null, tooltip: { pointFormat: '<span style="color:{series.color}">\u25cf</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>' }, trackByArea: !0, dataLabels: { align: void 0, verticalAlign: void 0, xLow: 0, xHigh: 0, yLow: 0, yHigh: 0 } });
            return f;
        })(c);
        p(a.prototype, { pointArrayMap: ["low", "high"], pointValKey: "low", deferTranslatePolar: !0, pointClass: e, setStackedPoints: d });
        n.registerSeriesType("arearange", a);
        ("");
        return a;
    });
    y(e, "Series/AreaSplineRange/AreaSplineRangeSeries.js", [e["Series/AreaRange/AreaRangeSeries.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function (e, c, d) {
        var l =
                (this && this.__extends) ||
                (function () {
                    var a = function (c, f) {
                        a =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (b, a) {
                                    b.__proto__ = a;
                                }) ||
                            function (b, a) {
                                for (var h in a) a.hasOwnProperty(h) && (b[h] = a[h]);
                            };
                        return a(c, f);
                    };
                    return function (c, f) {
                        function b() {
                            this.constructor = c;
                        }
                        a(c, f);
                        c.prototype = null === f ? Object.create(f) : ((b.prototype = f.prototype), new b());
                    };
                })(),
            a = c.seriesTypes.spline,
            n = d.merge;
        d = d.extend;
        var f = (function (a) {
            function c() {
                var c = (null !== a && a.apply(this, arguments)) || this;
                c.options = void 0;
                c.data = void 0;
                c.points = void 0;
                return c;
            }
            l(c, a);
            c.defaultOptions = n(e.defaultOptions);
            return c;
        })(e);
        d(f.prototype, { getPointSpline: a.prototype.getPointSpline });
        c.registerSeriesType("areasplinerange", f);
        ("");
        return f;
    });
    y(e, "Series/ColumnRange/ColumnRangePoint.js", [e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function (e, c) {
        var d =
                (this && this.__extends) ||
                (function () {
                    var a = function (c, f) {
                        a =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (a, b) {
                                    a.__proto__ = b;
                                }) ||
                            function (a, b) {
                                for (var h in b) b.hasOwnProperty(h) && (a[h] = b[h]);
                            };
                        return a(c, f);
                    };
                    return function (c, f) {
                        function d() {
                            this.constructor = c;
                        }
                        a(c, f);
                        c.prototype = null === f ? Object.create(f) : ((d.prototype = f.prototype), new d());
                    };
                })(),
            l = e.seriesTypes;
        e = l.column.prototype.pointClass;
        var a = c.extend,
            n = c.isNumber;
        c = (function (a) {
            function c() {
                var c = (null !== a && a.apply(this, arguments)) || this;
                c.series = void 0;
                c.options = void 0;
                c.barX = void 0;
                c.pointWidth = void 0;
                c.shapeType = void 0;
                return c;
            }
            d(c, a);
            c.prototype.isValid = function () {
                return n(this.low);
            };
            return c;
        })(l.arearange.prototype.pointClass);
        a(c.prototype, { setState: e.prototype.setState });
        return c;
    });
    y(e, "Series/ColumnRange/ColumnRangeSeries.js", [e["Series/ColumnRange/ColumnRangePoint.js"], e["Core/Globals.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function (e, c, d, l) {
        var a =
            (this && this.__extends) ||
            (function () {
                var b = function (a, c) {
                    b =
                        Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array &&
                            function (b, a) {
                                b.__proto__ = a;
                            }) ||
                        function (b, a) {
                            for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c]);
                        };
                    return b(a, c);
                };
                return function (a, c) {
                    function h() {
                        this.constructor = a;
                    }
                    b(a, c);
                    a.prototype = null === c ? Object.create(c) : ((h.prototype = c.prototype), new h());
                };
            })();
        c = c.noop;
        var n = d.seriesTypes,
            f = n.arearange,
            r = n.column,
            q = r.prototype,
            w = f.prototype,
            b = l.clamp,
            h = l.merge,
            p = l.pick;
        l = l.extend;
        var v = { pointRange: null, marker: null, states: { hover: { halo: !1 } } };
        n = (function (c) {
            function d() {
                var b = (null !== c && c.apply(this, arguments)) || this;
                b.data = void 0;
                b.points = void 0;
                b.options = void 0;
                return b;
            }
            a(d, c);
            d.prototype.setOptions = function () {
                h(!0, arguments[0], { stacking: void 0 });
                return w.setOptions.apply(this, arguments);
            };
            d.prototype.translate = function () {
                var a = this,
                    c = a.yAxis,
                    h = a.xAxis,
                    t = h.startAngleRad,
                    k,
                    g = a.chart,
                    u = a.xAxis.isRadial,
                    m = Math.max(g.chartWidth, g.chartHeight) + 999,
                    A;
                q.translate.apply(a);
                a.points.forEach(function (x) {
                    var f = x.shapeArgs || {},
                        d = a.options.minPointLength;
                    x.plotHigh = A = b(c.translate(x.high, 0, 1, 0, 1), -m, m);
                    x.plotLow = b(x.plotY, -m, m);
                    var e = A;
                    var l = p(x.rectPlotY, x.plotY) - A;
                    Math.abs(l) < d ? ((d -= l), (l += d), (e -= d / 2)) : 0 > l && ((l *= -1), (e -= l));
                    u ? ((k = x.barX + t), (x.shapeType = "arc"), (x.shapeArgs = a.polarArc(e + l, e, k, k + x.pointWidth))) : ((f.height = l), (f.y = e), (d = f.x), (d = void 0 === d ? 0 : d), (f = f.width), (f = void 0 === f ? 0 : f), (x.tooltipPos = g.inverted ? [c.len + c.pos - g.plotLeft - e - l / 2, h.len + h.pos - g.plotTop - d - f / 2, l] : [h.left - g.plotLeft + d + f / 2, c.pos - g.plotTop + e + l / 2, l]));
                });
            };
            d.prototype.crispCol = function () {
                return q.crispCol.apply(this, arguments);
            };
            d.prototype.drawPoints = function () {
                return q.drawPoints.apply(this, arguments);
            };
            d.prototype.drawTracker = function () {
                return q.drawTracker.apply(this, arguments);
            };
            d.prototype.getColumnMetrics = function () {
                return q.getColumnMetrics.apply(this, arguments);
            };
            d.prototype.pointAttribs = function () {
                return q.pointAttribs.apply(this, arguments);
            };
            d.prototype.adjustForMissingColumns = function () {
                return q.adjustForMissingColumns.apply(this, arguments);
            };
            d.prototype.animate = function () {
                return q.animate.apply(this, arguments);
            };
            d.prototype.translate3dPoints = function () {
                return q.translate3dPoints.apply(this, arguments);
            };
            d.prototype.translate3dShapes = function () {
                return q.translate3dShapes.apply(this, arguments);
            };
            d.defaultOptions = h(r.defaultOptions, f.defaultOptions, v);
            return d;
        })(f);
        l(n.prototype, {
            directTouch: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            drawGraph: c,
            getSymbol: c,
            polarArc: function () {
                return q.polarArc.apply(this, arguments);
            },
            pointClass: e,
        });
        d.registerSeriesType("columnrange", n);
        ("");
        return n;
    });
    y(e, "Series/ColumnPyramid/ColumnPyramidSeries.js", [e["Series/Column/ColumnSeries.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function (e, c, d) {
        var l =
                (this && this.__extends) ||
                (function () {
                    var a = function (c, b) {
                        a =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (b, a) {
                                    b.__proto__ = a;
                                }) ||
                            function (b, a) {
                                for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c]);
                            };
                        return a(c, b);
                    };
                    return function (c, b) {
                        function h() {
                            this.constructor = c;
                        }
                        a(c, b);
                        c.prototype = null === b ? Object.create(b) : ((h.prototype = b.prototype), new h());
                    };
                })(),
            a = e.prototype,
            n = d.clamp,
            f = d.merge,
            r = d.pick;
        d = (function (c) {
            function d() {
                var b = (null !== c && c.apply(this, arguments)) || this;
                b.data = void 0;
                b.options = void 0;
                b.points = void 0;
                return b;
            }
            l(d, c);
            d.prototype.translate = function () {
                var b = this,
                    c = b.chart,
                    f = b.options,
                    d = (b.dense = 2 > b.closestPointRange * b.xAxis.transA);
                d = b.borderWidth = r(f.borderWidth, d ? 0 : 1);
                var e = b.yAxis,
                    l = f.threshold,
                    q = (b.translatedThreshold = e.getThreshold(l)),
                    w = r(f.minPointLength, 5),
                    z = b.getColumnMetrics(),
                    t = z.width,
                    k = (b.barW = Math.max(t, 1 + 2 * d)),
                    g = (b.pointXOffset = z.offset);
                c.inverted && (q -= 0.5);
                f.pointPadding && (k = Math.ceil(k));
                a.translate.apply(b);
                b.points.forEach(function (a) {
                    var m = r(a.yBottom, q),
                        u = 999 + Math.abs(m),
                        x = n(a.plotY, -u, e.len + u);
                    u = a.plotX + g;
                    var h = k / 2,
                        d = Math.min(x, m);
                    m = Math.max(x, m) - d;
                    var p;
                    a.barX = u;
                    a.pointWidth = t;
                    a.tooltipPos = c.inverted ? [e.len + e.pos - c.plotLeft - x, b.xAxis.len - u - h, m] : [u + h, x + e.pos - c.plotTop, m];
                    x = l + (a.total || a.y);
                    "percent" === f.stacking && (x = l + (0 > a.y) ? -100 : 100);
                    x = e.toPixels(x, !0);
                    var D = (p = c.plotHeight - x - (c.plotHeight - q)) ? (h * (d - x)) / p : 0;
                    var z = p ? (h * (d + m - x)) / p : 0;
                    p = u - D + h;
                    D = u + D + h;
                    var v = u + z + h;
                    z = u - z + h;
                    var C = d - w;
                    var G = d + m;
                    0 > a.y && ((C = d), (G = d + m + w));
                    c.inverted && ((v = c.plotWidth - d), (p = x - (c.plotWidth - q)), (D = (h * (x - v)) / p), (z = (h * (x - (v - m))) / p), (p = u + h + D), (D = p - 2 * D), (v = u - z + h), (z = u + z + h), (C = d), (G = d + m - w), 0 > a.y && (G = d + m + w));
                    a.shapeType = "path";
                    a.shapeArgs = { x: p, y: C, width: D - p, height: m, d: [["M", p, C], ["L", D, C], ["L", v, G], ["L", z, G], ["Z"]] };
                });
            };
            d.defaultOptions = f(e.defaultOptions, {});
            return d;
        })(e);
        c.registerSeriesType("columnpyramid", d);
        ("");
        return d;
    });
    y(e, "Series/Gauge/GaugePoint.js", [e["Core/Series/SeriesRegistry.js"]], function (e) {
        var c =
            (this && this.__extends) ||
            (function () {
                var c = function (d, a) {
                    c =
                        Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array &&
                            function (a, c) {
                                a.__proto__ = c;
                            }) ||
                        function (a, c) {
                            for (var f in c) c.hasOwnProperty(f) && (a[f] = c[f]);
                        };
                    return c(d, a);
                };
                return function (d, a) {
                    function e() {
                        this.constructor = d;
                    }
                    c(d, a);
                    d.prototype = null === a ? Object.create(a) : ((e.prototype = a.prototype), new e());
                };
            })();
        return (function (d) {
            function e() {
                var a = (null !== d && d.apply(this, arguments)) || this;
                a.options = void 0;
                a.series = void 0;
                a.shapeArgs = void 0;
                return a;
            }
            c(e, d);
            e.prototype.setState = function (a) {
                this.state = a;
            };
            return e;
        })(e.series.prototype.pointClass);
    });
    y(e, "Series/Gauge/GaugeSeries.js", [e["Series/Gauge/GaugePoint.js"], e["Core/Globals.js"], e["Core/Color/Palette.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function (e, c, d, l, a) {
        var n =
            (this && this.__extends) ||
            (function () {
                var a = function (b, c) {
                    a =
                        Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array &&
                            function (a, b) {
                                a.__proto__ = b;
                            }) ||
                        function (a, b) {
                            for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
                        };
                    return a(b, c);
                };
                return function (b, c) {
                    function h() {
                        this.constructor = b;
                    }
                    a(b, c);
                    b.prototype = null === c ? Object.create(c) : ((h.prototype = c.prototype), new h());
                };
            })();
        c = c.noop;
        var f = l.series,
            r = l.seriesTypes.column,
            q = a.clamp,
            w = a.isNumber,
            b = a.extend,
            h = a.merge,
            p = a.pick,
            v = a.pInt;
        a = (function (a) {
            function b() {
                var b = (null !== a && a.apply(this, arguments)) || this;
                b.data = void 0;
                b.points = void 0;
                b.options = void 0;
                b.yAxis = void 0;
                return b;
            }
            n(b, a);
            b.prototype.translate = function () {
                var b = this.yAxis,
                    a = this.options,
                    c = b.center;
                this.generatePoints();
                this.points.forEach(function (t) {
                    var k = h(a.dial, t.dial),
                        g = (v(p(k.radius, "80%")) * c[2]) / 200,
                        u = (v(p(k.baseLength, "70%")) * g) / 100,
                        m = (v(p(k.rearLength, "10%")) * g) / 100,
                        A = k.baseWidth || 3,
                        x = k.topWidth || 1,
                        f = a.overshoot,
                        d = b.startAngleRad + b.translate(t.y, null, null, null, !0);
                    if (w(f) || !1 === a.wrap) (f = w(f) ? (f / 180) * Math.PI : 0), (d = q(d, b.startAngleRad - f, b.endAngleRad + f));
                    d = (180 * d) / Math.PI;
                    t.shapeType = "path";
                    t.shapeArgs = { d: k.path || [["M", -m, -A / 2], ["L", u, -A / 2], ["L", g, -x / 2], ["L", g, x / 2], ["L", u, A / 2], ["L", -m, A / 2], ["Z"]], translateX: c[0], translateY: c[1], rotation: d };
                    t.plotX = c[0];
                    t.plotY = c[1];
                });
            };
            b.prototype.drawPoints = function () {
                var b = this,
                    a = b.chart,
                    c = b.yAxis.center,
                    t = b.pivot,
                    k = b.options,
                    g = k.pivot,
                    u = a.renderer;
                b.points.forEach(function (g) {
                    var c = g.graphic,
                        m = g.shapeArgs,
                        t = m.d,
                        f = h(k.dial, g.dial);
                    c ? (c.animate(m), (m.d = t)) : (g.graphic = u[g.shapeType](m).attr({ rotation: m.rotation, zIndex: 1 }).addClass("highcharts-dial").add(b.group));
                    if (!a.styledMode) g.graphic[c ? "animate" : "attr"]({ stroke: f.borderColor || "none", "stroke-width": f.borderWidth || 0, fill: f.backgroundColor || d.neutralColor100 });
                });
                t ? t.animate({ translateX: c[0], translateY: c[1] }) : ((b.pivot = u.circle(0, 0, p(g.radius, 5)).attr({ zIndex: 2 }).addClass("highcharts-pivot").translate(c[0], c[1]).add(b.group)), a.styledMode || b.pivot.attr({ "stroke-width": g.borderWidth || 0, stroke: g.borderColor || d.neutralColor20, fill: g.backgroundColor || d.neutralColor100 }));
            };
            b.prototype.animate = function (b) {
                var a = this;
                b ||
                    a.points.forEach(function (b) {
                        var c = b.graphic;
                        c && (c.attr({ rotation: (180 * a.yAxis.startAngleRad) / Math.PI }), c.animate({ rotation: b.shapeArgs.rotation }, a.options.animation));
                    });
            };
            b.prototype.render = function () {
                this.group = this.plotGroup("group", "series", this.visible ? "visible" : "hidden", this.options.zIndex, this.chart.seriesGroup);
                f.prototype.render.call(this);
                this.group.clip(this.chart.clipRect);
            };
            b.prototype.setData = function (b, a) {
                f.prototype.setData.call(this, b, !1);
                this.processData();
                this.generatePoints();
                p(a, !0) && this.chart.redraw();
            };
            b.prototype.hasData = function () {
                return !!this.points.length;
            };
            b.defaultOptions = h(f.defaultOptions, { dataLabels: { borderColor: d.neutralColor20, borderRadius: 3, borderWidth: 1, crop: !1, defer: !1, enabled: !0, verticalAlign: "top", y: 15, zIndex: 2 }, dial: {}, pivot: {}, tooltip: { headerFormat: "" }, showInLegend: !1 });
            return b;
        })(f);
        b(a.prototype, { angular: !0, directTouch: !0, drawGraph: c, drawTracker: r.prototype.drawTracker, fixedBox: !0, forceDL: !0, noSharedTooltip: !0, pointClass: e, trackerGroups: ["group", "dataLabelsGroup"] });
        l.registerSeriesType("gauge", a);
        ("");
        return a;
    });
    y(e, "Series/BoxPlot/BoxPlotSeries.js", [e["Series/Column/ColumnSeries.js"], e["Core/Globals.js"], e["Core/Color/Palette.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function (e, c, d, l, a) {
        var n =
            (this && this.__extends) ||
            (function () {
                var a = function (b, c) {
                    a =
                        Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array &&
                            function (b, a) {
                                b.__proto__ = a;
                            }) ||
                        function (b, a) {
                            for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c]);
                        };
                    return a(b, c);
                };
                return function (b, c) {
                    function h() {
                        this.constructor = b;
                    }
                    a(b, c);
                    b.prototype = null === c ? Object.create(c) : ((h.prototype = c.prototype), new h());
                };
            })();
        c = c.noop;
        var f = a.extend,
            r = a.merge,
            q = a.pick;
        a = (function (a) {
            function b() {
                var b = (null !== a && a.apply(this, arguments)) || this;
                b.data = void 0;
                b.options = void 0;
                b.points = void 0;
                return b;
            }
            n(b, a);
            b.prototype.pointAttribs = function () {
                return {};
            };
            b.prototype.translate = function () {
                var b = this.yAxis,
                    c = this.pointArrayMap;
                a.prototype.translate.apply(this);
                this.points.forEach(function (a) {
                    c.forEach(function (c) {
                        null !== a[c] && (a[c + "Plot"] = b.translate(a[c], 0, 1, 0, 1));
                    });
                    a.plotHigh = a.highPlot;
                });
            };
            b.prototype.drawPoints = function () {
                var b = this,
                    a = b.options,
                    c = b.chart,
                    f = c.renderer,
                    d,
                    e,
                    l,
                    r,
                    t,
                    k,
                    g = 0,
                    u,
                    m,
                    A,
                    x,
                    J = !1 !== b.doQuartiles,
                    n,
                    w = b.options.whiskerLength;
                b.points.forEach(function (h) {
                    var p = h.graphic,
                        v = p ? "animate" : "attr",
                        D = h.shapeArgs,
                        z = {},
                        K = {},
                        C = {},
                        L = {},
                        B = h.color || b.color;
                    "undefined" !== typeof h.plotY &&
                        ((u = Math.round(D.width)),
                        (m = Math.floor(D.x)),
                        (A = m + u),
                        (x = Math.round(u / 2)),
                        (d = Math.floor(J ? h.q1Plot : h.lowPlot)),
                        (e = Math.floor(J ? h.q3Plot : h.lowPlot)),
                        (l = Math.floor(h.highPlot)),
                        (r = Math.floor(h.lowPlot)),
                        p ||
                            ((h.graphic = p = f.g("point").add(b.group)),
                            (h.stem = f.path().addClass("highcharts-boxplot-stem").add(p)),
                            w && (h.whiskers = f.path().addClass("highcharts-boxplot-whisker").add(p)),
                            J &&
                                (h.box = f
                                    .path(void 0)
                                    .addClass("highcharts-boxplot-box")
                                    .add(p)),
                            (h.medianShape = f
                                .path(void 0)
                                .addClass("highcharts-boxplot-median")
                                .add(p))),
                        c.styledMode ||
                            ((K.stroke = h.stemColor || a.stemColor || B),
                            (K["stroke-width"] = q(h.stemWidth, a.stemWidth, a.lineWidth)),
                            (K.dashstyle = h.stemDashStyle || a.stemDashStyle || a.dashStyle),
                            h.stem.attr(K),
                            w && ((C.stroke = h.whiskerColor || a.whiskerColor || B), (C["stroke-width"] = q(h.whiskerWidth, a.whiskerWidth, a.lineWidth)), (C.dashstyle = h.whiskerDashStyle || a.whiskerDashStyle || a.dashStyle), h.whiskers.attr(C)),
                            J && ((z.fill = h.fillColor || a.fillColor || B), (z.stroke = a.lineColor || B), (z["stroke-width"] = a.lineWidth || 0), (z.dashstyle = h.boxDashStyle || a.boxDashStyle || a.dashStyle), h.box.attr(z)),
                            (L.stroke = h.medianColor || a.medianColor || B),
                            (L["stroke-width"] = q(h.medianWidth, a.medianWidth, a.lineWidth)),
                            (L.dashstyle = h.medianDashStyle || a.medianDashStyle || a.dashStyle),
                            h.medianShape.attr(L)),
                        (k = (h.stem.strokeWidth() % 2) / 2),
                        (g = m + x + k),
                        (p = [
                            ["M", g, e],
                            ["L", g, l],
                            ["M", g, d],
                            ["L", g, r],
                        ]),
                        h.stem[v]({ d: p }),
                        J && ((k = (h.box.strokeWidth() % 2) / 2), (d = Math.floor(d) + k), (e = Math.floor(e) + k), (m += k), (A += k), (p = [["M", m, e], ["L", m, d], ["L", A, d], ["L", A, e], ["L", m, e], ["Z"]]), h.box[v]({ d: p })),
                        w &&
                            ((k = (h.whiskers.strokeWidth() % 2) / 2),
                            (l += k),
                            (r += k),
                            (n = /%$/.test(w) ? (x * parseFloat(w)) / 100 : w / 2),
                            (p = [
                                ["M", g - n, l],
                                ["L", g + n, l],
                                ["M", g - n, r],
                                ["L", g + n, r],
                            ]),
                            h.whiskers[v]({ d: p })),
                        (t = Math.round(h.medianPlot)),
                        (k = (h.medianShape.strokeWidth() % 2) / 2),
                        (t += k),
                        (p = [
                            ["M", m, t],
                            ["L", A, t],
                        ]),
                        h.medianShape[v]({ d: p }));
                });
            };
            b.prototype.toYData = function (a) {
                return [a.low, a.q1, a.median, a.q3, a.high];
            };
            b.defaultOptions = r(e.defaultOptions, { threshold: null, tooltip: { pointFormat: '<span style="color:{point.color}">\u25cf</span> <b> {series.name}</b><br/>Maximum: {point.high}<br/>Upper quartile: {point.q3}<br/>Median: {point.median}<br/>Lower quartile: {point.q1}<br/>Minimum: {point.low}<br/>' }, whiskerLength: "50%", fillColor: d.backgroundColor, lineWidth: 1, medianWidth: 2, whiskerWidth: 2 });
            return b;
        })(e);
        f(a.prototype, { pointArrayMap: ["low", "q1", "median", "q3", "high"], pointValKey: "high", drawDataLabels: c, setStackedPoints: c });
        l.registerSeriesType("boxplot", a);
        ("");
        return a;
    });
    y(e, "Series/ErrorBar/ErrorBarSeries.js", [e["Series/BoxPlot/BoxPlotSeries.js"], e["Series/Column/ColumnSeries.js"], e["Core/Color/Palette.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function (e, c, d, l, a) {
        var n =
                (this && this.__extends) ||
                (function () {
                    var a = function (b, c) {
                        a =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (a, b) {
                                    a.__proto__ = b;
                                }) ||
                            function (a, b) {
                                for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
                            };
                        return a(b, c);
                    };
                    return function (b, c) {
                        function h() {
                            this.constructor = b;
                        }
                        a(b, c);
                        b.prototype = null === c ? Object.create(c) : ((h.prototype = c.prototype), new h());
                    };
                })(),
            f = l.seriesTypes.arearange,
            r = a.merge;
        a = a.extend;
        var q = (function (a) {
            function b() {
                var b = (null !== a && a.apply(this, arguments)) || this;
                b.data = void 0;
                b.options = void 0;
                b.points = void 0;
                return b;
            }
            n(b, a);
            b.prototype.getColumnMetrics = function () {
                return (this.linkedParent && this.linkedParent.columnMetrics) || c.prototype.getColumnMetrics.call(this);
            };
            b.prototype.drawDataLabels = function () {
                var a = this.pointValKey;
                f &&
                    (f.prototype.drawDataLabels.call(this),
                    this.data.forEach(function (b) {
                        b.y = b[a];
                    }));
            };
            b.prototype.toYData = function (a) {
                return [a.low, a.high];
            };
            b.defaultOptions = r(e.defaultOptions, { color: d.neutralColor100, grouping: !1, linkedTo: ":previous", tooltip: { pointFormat: '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>' }, whiskerWidth: null });
            return b;
        })(e);
        a(q.prototype, { pointArrayMap: ["low", "high"], pointValKey: "high", doQuartiles: !1 });
        l.registerSeriesType("errorbar", q);
        ("");
        return q;
    });
    y(e, "Core/Axis/WaterfallAxis.js", [e["Extensions/Stacking.js"], e["Core/Utilities.js"]], function (e, c) {
        var d = c.addEvent,
            l = c.objectEach,
            a;
        (function (a) {
            function c() {
                var a = this.waterfall.stacks;
                a && ((a.changed = !1), delete a.alreadyChanged);
            }
            function r() {
                var a = this.options.stackLabels;
                a && a.enabled && this.waterfall.stacks && this.waterfall.renderStackTotals();
            }
            function n() {
                for (var a = this.axes, b = this.series, c = b.length; c--; )
                    b[c].options.stacking &&
                        (a.forEach(function (a) {
                            a.isXAxis || (a.waterfall.stacks.changed = !0);
                        }),
                        (c = 0));
            }
            function w() {
                this.waterfall || (this.waterfall = new b(this));
            }
            var b = (function () {
                function a(a) {
                    this.axis = a;
                    this.stacks = { changed: !1 };
                }
                a.prototype.renderStackTotals = function () {
                    var a = this.axis,
                        b = a.waterfall.stacks,
                        c = a.stacking && a.stacking.stackTotalGroup,
                        f = new e(a, a.options.stackLabels, !1, 0, void 0);
                    this.dummyStackItem = f;
                    l(b, function (a) {
                        l(a, function (a) {
                            f.total = a.stackTotal;
                            a.label && (f.label = a.label);
                            e.prototype.render.call(f, c);
                            a.label = f.label;
                            delete f.label;
                        });
                    });
                    f.total = null;
                };
                return a;
            })();
            a.Composition = b;
            a.compose = function (a, b) {
                d(a, "init", w);
                d(a, "afterBuildStacks", c);
                d(a, "afterRender", r);
                d(b, "beforeRedraw", n);
            };
        })(a || (a = {}));
        return a;
    });
    y(e, "Series/Waterfall/WaterfallPoint.js", [e["Series/Column/ColumnSeries.js"], e["Core/Series/Point.js"], e["Core/Utilities.js"]], function (e, c, d) {
        var l =
                (this && this.__extends) ||
                (function () {
                    var a = function (c, d) {
                        a =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (a, c) {
                                    a.__proto__ = c;
                                }) ||
                            function (a, c) {
                                for (var b in c) c.hasOwnProperty(b) && (a[b] = c[b]);
                            };
                        return a(c, d);
                    };
                    return function (c, d) {
                        function f() {
                            this.constructor = c;
                        }
                        a(c, d);
                        c.prototype = null === d ? Object.create(d) : ((f.prototype = d.prototype), new f());
                    };
                })(),
            a = d.isNumber;
        return (function (d) {
            function f() {
                var a = (null !== d && d.apply(this, arguments)) || this;
                a.options = void 0;
                a.series = void 0;
                return a;
            }
            l(f, d);
            f.prototype.getClassName = function () {
                var a = c.prototype.getClassName.call(this);
                this.isSum ? (a += " highcharts-sum") : this.isIntermediateSum && (a += " highcharts-intermediate-sum");
                return a;
            };
            f.prototype.isValid = function () {
                return a(this.y) || this.isSum || !!this.isIntermediateSum;
            };
            return f;
        })(e.prototype.pointClass);
    });
    y(e, "Series/Waterfall/WaterfallSeries.js", [e["Core/Axis/Axis.js"], e["Core/Chart/Chart.js"], e["Core/Color/Palette.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"], e["Core/Axis/WaterfallAxis.js"], e["Series/Waterfall/WaterfallPoint.js"]], function (e, c, d, l, a, n, f) {
        var r =
                (this && this.__extends) ||
                (function () {
                    var a = function (b, c) {
                        a =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (a, b) {
                                    a.__proto__ = b;
                                }) ||
                            function (a, b) {
                                for (var g in b) b.hasOwnProperty(g) && (a[g] = b[g]);
                            };
                        return a(b, c);
                    };
                    return function (b, c) {
                        function k() {
                            this.constructor = b;
                        }
                        a(b, c);
                        b.prototype = null === c ? Object.create(c) : ((k.prototype = c.prototype), new k());
                    };
                })(),
            q = l.seriesTypes,
            w = q.column,
            b = q.line,
            h = a.arrayMax,
            p = a.arrayMin,
            v = a.correctFloat;
        q = a.extend;
        var C = a.merge,
            B = a.objectEach,
            y = a.pick;
        a = (function (a) {
            function c() {
                var b = (null !== a && a.apply(this, arguments)) || this;
                b.chart = void 0;
                b.data = void 0;
                b.options = void 0;
                b.points = void 0;
                b.stackedYNeg = void 0;
                b.stackedYPos = void 0;
                b.stackKey = void 0;
                b.xData = void 0;
                b.yAxis = void 0;
                b.yData = void 0;
                return b;
            }
            r(c, a);
            c.prototype.generatePoints = function () {
                var a;
                w.prototype.generatePoints.apply(this);
                var b = 0;
                for (a = this.points.length; b < a; b++) {
                    var g = this.points[b];
                    var c = this.processedYData[b];
                    if (g.isIntermediateSum || g.isSum) g.y = v(c);
                }
            };
            c.prototype.translate = function () {
                var a = this.options,
                    b = this.yAxis,
                    g,
                    c = y(a.minPointLength, 5),
                    m = c / 2,
                    d = a.threshold,
                    x = a.stacking,
                    f = b.waterfall.stacks[this.stackKey];
                w.prototype.translate.apply(this);
                var h = (g = d);
                var e = this.points;
                var l = 0;
                for (a = e.length; l < a; l++) {
                    var p = e[l];
                    var r = this.processedYData[l];
                    var n = p.shapeArgs;
                    var v = [0, r];
                    var q = p.y;
                    if (x) {
                        if (f) {
                            v = f[l];
                            if ("overlap" === x) {
                                var z = v.stackState[v.stateIndex--];
                                z = 0 <= q ? z : z - q;
                                Object.hasOwnProperty.call(v, "absolutePos") && delete v.absolutePos;
                                Object.hasOwnProperty.call(v, "absoluteNeg") && delete v.absoluteNeg;
                            } else 0 <= q ? ((z = v.threshold + v.posTotal), (v.posTotal -= q)) : ((z = v.threshold + v.negTotal), (v.negTotal -= q), (z -= q)), !v.posTotal && Object.hasOwnProperty.call(v, "absolutePos") && ((v.posTotal = v.absolutePos), delete v.absolutePos), !v.negTotal && Object.hasOwnProperty.call(v, "absoluteNeg") && ((v.negTotal = v.absoluteNeg), delete v.absoluteNeg);
                            p.isSum || (v.connectorThreshold = v.threshold + v.stackTotal);
                            b.reversed ? ((r = 0 <= q ? z - q : z + q), (q = z)) : ((r = z), (q = z - q));
                            p.below = r <= y(d, 0);
                            n.y = b.translate(r, 0, 1, 0, 1);
                            n.height = Math.abs(n.y - b.translate(q, 0, 1, 0, 1));
                            if ((q = b.waterfall.dummyStackItem)) (q.x = l), (q.label = f[l].label), q.setOffset(this.pointXOffset || 0, this.barW || 0, this.stackedYNeg[l], this.stackedYPos[l]);
                        }
                    } else
                        (z = Math.max(h, h + q) + v[0]),
                            (n.y = b.translate(z, 0, 1, 0, 1)),
                            p.isSum
                                ? ((n.y = b.translate(v[1], 0, 1, 0, 1)), (n.height = Math.min(b.translate(v[0], 0, 1, 0, 1), b.len) - n.y))
                                : p.isIntermediateSum
                                ? (0 <= q ? ((r = v[1] + g), (q = g)) : ((r = g), (q = v[1] + g)), b.reversed && ((r ^= q), (q ^= r), (r ^= q)), (n.y = b.translate(r, 0, 1, 0, 1)), (n.height = Math.abs(n.y - Math.min(b.translate(q, 0, 1, 0, 1), b.len))), (g += v[1]))
                                : ((n.height = 0 < r ? b.translate(h, 0, 1, 0, 1) - n.y : b.translate(h, 0, 1, 0, 1) - b.translate(h - r, 0, 1, 0, 1)), (h += r), (p.below = h < y(d, 0))),
                            0 > n.height && ((n.y += n.height), (n.height *= -1));
                    p.plotY = n.y = Math.round(n.y) - (this.borderWidth % 2) / 2;
                    n.height = Math.max(Math.round(n.height), 0.001);
                    p.yBottom = n.y + n.height;
                    n.height <= c && !p.isNull ? ((n.height = c), (n.y -= m), (p.plotY = n.y), (p.minPointLengthOffset = 0 > p.y ? -m : m)) : (p.isNull && (n.width = 0), (p.minPointLengthOffset = 0));
                    n = p.plotY + (p.negative ? n.height : 0);
                    this.chart.inverted ? (p.tooltipPos[0] = b.len - n) : (p.tooltipPos[1] = n);
                }
            };
            c.prototype.processData = function (b) {
                var c = this.options,
                    g = this.yData,
                    u = c.data,
                    m = g.length,
                    d = c.threshold || 0,
                    f,
                    h,
                    t,
                    e,
                    l;
                for (l = h = f = t = e = 0; l < m; l++) {
                    var p = g[l];
                    var n = u && u[l] ? u[l] : {};
                    "sum" === p || n.isSum ? (g[l] = v(h)) : "intermediateSum" === p || n.isIntermediateSum ? ((g[l] = v(f)), (f = 0)) : ((h += p), (f += p));
                    t = Math.min(h, t);
                    e = Math.max(h, e);
                }
                a.prototype.processData.call(this, b);
                c.stacking || ((this.dataMin = t + d), (this.dataMax = e));
            };
            c.prototype.toYData = function (a) {
                return a.isSum ? "sum" : a.isIntermediateSum ? "intermediateSum" : a.y;
            };
            c.prototype.updateParallelArrays = function (b, c) {
                a.prototype.updateParallelArrays.call(this, b, c);
                if ("sum" === this.yData[0] || "intermediateSum" === this.yData[0]) this.yData[0] = null;
            };
            c.prototype.pointAttribs = function (a, b) {
                var g = this.options.upColor;
                g && !a.options.color && (a.color = 0 < a.y ? g : null);
                a = w.prototype.pointAttribs.call(this, a, b);
                delete a.dashstyle;
                return a;
            };
            c.prototype.getGraphPath = function () {
                return [["M", 0, 0]];
            };
            c.prototype.getCrispPath = function () {
                var a = this.data,
                    b = this.yAxis,
                    g = a.length,
                    c = (Math.round(this.graph.strokeWidth()) % 2) / 2,
                    m = (Math.round(this.borderWidth) % 2) / 2,
                    f = this.xAxis.reversed,
                    d = this.yAxis.reversed,
                    h = this.options.stacking,
                    e = [],
                    l;
                for (l = 1; l < g; l++) {
                    var p = a[l].shapeArgs;
                    var n = a[l - 1];
                    var r = a[l - 1].shapeArgs;
                    var v = b.waterfall.stacks[this.stackKey];
                    var q = 0 < n.y ? -r.height : 0;
                    v && r && p && ((v = v[l - 1]), h ? ((v = v.connectorThreshold), (q = Math.round(b.translate(v, 0, 1, 0, 1) + (d ? q : 0)) - c)) : (q = r.y + n.minPointLengthOffset + m - c), e.push(["M", (r.x || 0) + (f ? 0 : r.width || 0), q], ["L", (p.x || 0) + (f ? p.width || 0 : 0), q]));
                    r && e.length && ((!h && 0 > n.y && !d) || (0 < n.y && d)) && ((n = e[e.length - 2]) && "number" === typeof n[2] && (n[2] += r.height || 0), (n = e[e.length - 1]) && "number" === typeof n[2] && (n[2] += r.height || 0));
                }
                return e;
            };
            c.prototype.drawGraph = function () {
                b.prototype.drawGraph.call(this);
                this.graph.attr({ d: this.getCrispPath() });
            };
            c.prototype.setStackedPoints = function () {
                function a(a, b, g, c) {
                    if (y) for (g; g < y; g++) w.stackState[g] += c;
                    else (w.stackState[0] = a), (y = w.stackState.length);
                    w.stackState.push(w.stackState[y - 1] + b);
                }
                var b = this.options,
                    g = this.yAxis.waterfall.stacks,
                    c = b.threshold,
                    m = c || 0,
                    f = m,
                    d = this.stackKey,
                    h = this.xData,
                    e = h.length,
                    l,
                    p,
                    n;
                this.yAxis.stacking.usePercentage = !1;
                var r = (p = n = m);
                if (this.visible || !this.chart.options.chart.ignoreHiddenSeries) {
                    var v = g.changed;
                    (l = g.alreadyChanged) && 0 > l.indexOf(d) && (v = !0);
                    g[d] || (g[d] = {});
                    l = g[d];
                    for (var q = 0; q < e; q++) {
                        var z = h[q];
                        if (!l[z] || v) l[z] = { negTotal: 0, posTotal: 0, stackTotal: 0, threshold: 0, stateIndex: 0, stackState: [], label: v && l[z] ? l[z].label : void 0 };
                        var w = l[z];
                        var C = this.yData[q];
                        0 <= C ? (w.posTotal += C) : (w.negTotal += C);
                        var B = b.data[q];
                        z = w.absolutePos = w.posTotal;
                        var H = (w.absoluteNeg = w.negTotal);
                        w.stackTotal = z + H;
                        var y = w.stackState.length;
                        B && B.isIntermediateSum ? (a(n, p, 0, n), (n = p), (p = c), (m ^= f), (f ^= m), (m ^= f)) : B && B.isSum ? (a(c, r, y), (m = c)) : (a(m, C, 0, r), B && ((r += C), (p += C)));
                        w.stateIndex++;
                        w.threshold = m;
                        m += w.stackTotal;
                    }
                    g.changed = !1;
                    g.alreadyChanged || (g.alreadyChanged = []);
                    g.alreadyChanged.push(d);
                }
            };
            c.prototype.getExtremes = function () {
                var a = this.options.stacking;
                if (a) {
                    var b = this.yAxis;
                    b = b.waterfall.stacks;
                    var g = (this.stackedYNeg = []);
                    var c = (this.stackedYPos = []);
                    "overlap" === a
                        ? B(b[this.stackKey], function (a) {
                              g.push(p(a.stackState));
                              c.push(h(a.stackState));
                          })
                        : B(b[this.stackKey], function (a) {
                              g.push(a.negTotal + a.threshold);
                              c.push(a.posTotal + a.threshold);
                          });
                    return { dataMin: p(g), dataMax: h(c) };
                }
                return { dataMin: this.dataMin, dataMax: this.dataMax };
            };
            c.defaultOptions = C(w.defaultOptions, { dataLabels: { inside: !0 }, lineWidth: 1, lineColor: d.neutralColor80, dashStyle: "Dot", borderColor: d.neutralColor80, states: { hover: { lineWidthPlus: 0 } } });
            return c;
        })(w);
        q(a.prototype, { getZonesGraphs: b.prototype.getZonesGraphs, pointValKey: "y", showLine: !0, pointClass: f });
        l.registerSeriesType("waterfall", a);
        n.compose(e, c);
        ("");
        return a;
    });
    y(e, "Series/Polygon/PolygonSeries.js", [e["Core/Globals.js"], e["Mixins/LegendSymbol.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function (e, c, d, l) {
        var a =
            (this && this.__extends) ||
            (function () {
                var a = function (b, c) {
                    a =
                        Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array &&
                            function (a, b) {
                                a.__proto__ = b;
                            }) ||
                        function (a, b) {
                            for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
                        };
                    return a(b, c);
                };
                return function (b, c) {
                    function d() {
                        this.constructor = b;
                    }
                    a(b, c);
                    b.prototype = null === c ? Object.create(c) : ((d.prototype = c.prototype), new d());
                };
            })();
        e = e.noop;
        var n = d.series,
            f = d.seriesTypes,
            r = f.area,
            q = f.line,
            w = f.scatter;
        f = l.extend;
        var b = l.merge;
        l = (function (c) {
            function d() {
                var a = (null !== c && c.apply(this, arguments)) || this;
                a.data = void 0;
                a.options = void 0;
                a.points = void 0;
                return a;
            }
            a(d, c);
            d.prototype.getGraphPath = function () {
                for (var a = q.prototype.getGraphPath.call(this), b = a.length + 1; b--; ) (b === a.length || "M" === a[b][0]) && 0 < b && a.splice(b, 0, ["Z"]);
                return (this.areaPath = a);
            };
            d.prototype.drawGraph = function () {
                this.options.fillColor = this.color;
                r.prototype.drawGraph.call(this);
            };
            d.defaultOptions = b(w.defaultOptions, { marker: { enabled: !1, states: { hover: { enabled: !1 } } }, stickyTracking: !1, tooltip: { followPointer: !0, pointFormat: "" }, trackByArea: !0 });
            return d;
        })(w);
        f(l.prototype, { type: "polygon", drawLegendSymbol: c.drawRectangle, drawTracker: n.prototype.drawTracker, setStackedPoints: e });
        d.registerSeriesType("polygon", l);
        ("");
        return l;
    });
    y(e, "Series/Bubble/BubblePoint.js", [e["Core/Series/Point.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function (e, c, d) {
        var l =
            (this && this.__extends) ||
            (function () {
                var a = function (c, d) {
                    a =
                        Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array &&
                            function (a, c) {
                                a.__proto__ = c;
                            }) ||
                        function (a, c) {
                            for (var d in c) c.hasOwnProperty(d) && (a[d] = c[d]);
                        };
                    return a(c, d);
                };
                return function (c, d) {
                    function f() {
                        this.constructor = c;
                    }
                    a(c, d);
                    c.prototype = null === d ? Object.create(d) : ((f.prototype = d.prototype), new f());
                };
            })();
        d = d.extend;
        c = (function (a) {
            function c() {
                var c = (null !== a && a.apply(this, arguments)) || this;
                c.options = void 0;
                c.series = void 0;
                return c;
            }
            l(c, a);
            c.prototype.haloPath = function (a) {
                return e.prototype.haloPath.call(this, 0 === a ? 0 : (this.marker ? this.marker.radius || 0 : 0) + a);
            };
            return c;
        })(c.seriesTypes.scatter.prototype.pointClass);
        d(c.prototype, { ttBelow: !1 });
        return c;
    });
    y(e, "Series/Bubble/BubbleLegend.js", [e["Core/Chart/Chart.js"], e["Core/Color/Color.js"], e["Core/FormatUtilities.js"], e["Core/Globals.js"], e["Core/Legend.js"], e["Core/DefaultOptions.js"], e["Core/Color/Palette.js"], e["Core/Series/Series.js"], e["Core/Utilities.js"]], function (e, c, d, l, a, n, f, r, q) {
        var w = c.parse,
            b = l.noop;
        n = n.setOptions;
        c = q.addEvent;
        var h = q.arrayMax,
            p = q.arrayMin,
            v = q.isNumber,
            C = q.merge,
            B = q.objectEach,
            y = q.pick,
            F = q.stableSort;
        q = q.wrap;
        ("");
        n({
            legend: {
                bubbleLegend: {
                    borderColor: void 0,
                    borderWidth: 2,
                    className: void 0,
                    color: void 0,
                    connectorClassName: void 0,
                    connectorColor: void 0,
                    connectorDistance: 60,
                    connectorWidth: 1,
                    enabled: !1,
                    labels: { className: void 0, allowOverlap: !1, format: "", formatter: void 0, align: "right", style: { fontSize: "10px", color: f.neutralColor100 }, x: 0, y: 0 },
                    maxSize: 60,
                    minSize: 10,
                    legendIndex: 0,
                    ranges: { value: void 0, borderColor: void 0, color: void 0, connectorColor: void 0 },
                    sizeBy: "area",
                    sizeByAbsoluteValue: !1,
                    zIndex: 1,
                    zThreshold: 0,
                },
            },
        });
        f = (function () {
            function a(a, c) {
                this.options = this.symbols = this.visible = this.ranges = this.movementX = this.maxLabel = this.legendSymbol = this.legendItemWidth = this.legendItemHeight = this.legendItem = this.legendGroup = this.legend = this.fontMetrics = this.chart = void 0;
                this.setState = b;
                this.init(a, c);
            }
            a.prototype.init = function (a, b) {
                this.options = a;
                this.visible = !0;
                this.chart = b.chart;
                this.legend = b;
            };
            a.prototype.addToLegend = function (a) {
                a.splice(this.options.legendIndex, 0, this);
            };
            a.prototype.drawLegendSymbol = function (a) {
                var b = this.chart,
                    g = this.options,
                    c = y(a.options.itemDistance, 20),
                    m = g.ranges;
                var d = g.connectorDistance;
                this.fontMetrics = b.renderer.fontMetrics(g.labels.style.fontSize);
                m && m.length && v(m[0].value)
                    ? (F(m, function (a, b) {
                          return b.value - a.value;
                      }),
                      (this.ranges = m),
                      this.setOptions(),
                      this.render(),
                      (b = this.getMaxLabelSize()),
                      (m = this.ranges[0].radius),
                      (a = 2 * m),
                      (d = d - m + b.width),
                      (d = 0 < d ? d : 0),
                      (this.maxLabel = b),
                      (this.movementX = "left" === g.labels.align ? d : 0),
                      (this.legendItemWidth = a + d + c),
                      (this.legendItemHeight = a + this.fontMetrics.h / 2))
                    : (a.options.bubbleLegend.autoRanges = !0);
            };
            a.prototype.setOptions = function () {
                var a = this.ranges,
                    b = this.options,
                    g = this.chart.series[b.seriesIndex],
                    c = this.legend.baseline,
                    m = { zIndex: b.zIndex, "stroke-width": b.borderWidth },
                    d = { zIndex: b.zIndex, "stroke-width": b.connectorWidth },
                    f = { align: this.legend.options.rtl || "left" === b.labels.align ? "right" : "left", zIndex: b.zIndex },
                    h = g.options.marker.fillOpacity,
                    e = this.chart.styledMode;
                a.forEach(function (k, u) {
                    e || ((m.stroke = y(k.borderColor, b.borderColor, g.color)), (m.fill = y(k.color, b.color, 1 !== h ? w(g.color).setOpacity(h).get("rgba") : g.color)), (d.stroke = y(k.connectorColor, b.connectorColor, g.color)));
                    a[u].radius = this.getRangeRadius(k.value);
                    a[u] = C(a[u], { center: a[0].radius - a[u].radius + c });
                    e || C(!0, a[u], { bubbleAttribs: C(m), connectorAttribs: C(d), labelAttribs: f });
                }, this);
            };
            a.prototype.getRangeRadius = function (a) {
                var b = this.options;
                return this.chart.series[this.options.seriesIndex].getRadius.call(this, b.ranges[b.ranges.length - 1].value, b.ranges[0].value, b.minSize, b.maxSize, a);
            };
            a.prototype.render = function () {
                var a = this.chart.renderer,
                    b = this.options.zThreshold;
                this.symbols || (this.symbols = { connectors: [], bubbleItems: [], labels: [] });
                this.legendSymbol = a.g("bubble-legend");
                this.legendItem = a.g("bubble-legend-item");
                this.legendSymbol.translateX = 0;
                this.legendSymbol.translateY = 0;
                this.ranges.forEach(function (a) {
                    a.value >= b && this.renderRange(a);
                }, this);
                this.legendSymbol.add(this.legendItem);
                this.legendItem.add(this.legendGroup);
                this.hideOverlappingLabels();
            };
            a.prototype.renderRange = function (a) {
                var b = this.options,
                    g = b.labels,
                    c = this.chart,
                    m = c.series[b.seriesIndex],
                    d = c.renderer,
                    f = this.symbols;
                c = f.labels;
                var h = a.center,
                    e = Math.abs(a.radius),
                    l = b.connectorDistance || 0,
                    p = g.align;
                l = this.legend.options.rtl || "left" === p ? -l : l;
                var t = b.connectorWidth,
                    n = this.ranges[0].radius || 0,
                    r = h - e - b.borderWidth / 2 + t / 2,
                    v = this.fontMetrics;
                v = v.f / 2 - (v.h - v.f) / 2;
                var q = d.styledMode;
                "center" === p && ((l = 0), (b.connectorDistance = 0), (a.labelAttribs.align = "center"));
                p = r + b.labels.y;
                var w = n + l + b.labels.x;
                f.bubbleItems.push(
                    d
                        .circle(n, h + ((r % 1 ? 1 : 0.5) - (t % 2 ? 0 : 0.5)), e)
                        .attr(q ? {} : a.bubbleAttribs)
                        .addClass((q ? "highcharts-color-" + m.colorIndex + " " : "") + "highcharts-bubble-legend-symbol " + (b.className || ""))
                        .add(this.legendSymbol)
                );
                f.connectors.push(
                    d
                        .path(
                            d.crispLine(
                                [
                                    ["M", n, r],
                                    ["L", n + l, r],
                                ],
                                b.connectorWidth
                            )
                        )
                        .attr(q ? {} : a.connectorAttribs)
                        .addClass((q ? "highcharts-color-" + this.options.seriesIndex + " " : "") + "highcharts-bubble-legend-connectors " + (b.connectorClassName || ""))
                        .add(this.legendSymbol)
                );
                a = d
                    .text(this.formatLabel(a), w, p + v)
                    .attr(q ? {} : a.labelAttribs)
                    .css(q ? {} : g.style)
                    .addClass("highcharts-bubble-legend-labels " + (b.labels.className || ""))
                    .add(this.legendSymbol);
                c.push(a);
                a.placed = !0;
                a.alignAttr = { x: w, y: p + v };
            };
            a.prototype.getMaxLabelSize = function () {
                var a, b;
                this.symbols.labels.forEach(function (g) {
                    b = g.getBBox(!0);
                    a = a ? (b.width > a.width ? b : a) : b;
                });
                return a || {};
            };
            a.prototype.formatLabel = function (a) {
                var b = this.options,
                    g = b.labels.formatter;
                b = b.labels.format;
                var c = this.chart.numberFormatter;
                return b ? d.format(b, a) : g ? g.call(a) : c(a.value, 1);
            };
            a.prototype.hideOverlappingLabels = function () {
                var a = this.chart,
                    b = this.symbols;
                !this.options.labels.allowOverlap &&
                    b &&
                    (a.hideOverlappingLabels(b.labels),
                    b.labels.forEach(function (a, c) {
                        a.newOpacity ? a.newOpacity !== a.oldOpacity && b.connectors[c].show() : b.connectors[c].hide();
                    }));
            };
            a.prototype.getRanges = function () {
                var a = this.legend.bubbleLegend,
                    b = a.options.ranges,
                    g,
                    c = Number.MAX_VALUE,
                    d = -Number.MAX_VALUE;
                a.chart.series.forEach(function (a) {
                    a.isBubble && !a.ignoreSeries && ((g = a.zData.filter(v)), g.length && ((c = y(a.options.zMin, Math.min(c, Math.max(p(g), !1 === a.options.displayNegative ? a.options.zThreshold : -Number.MAX_VALUE)))), (d = y(a.options.zMax, Math.max(d, h(g))))));
                });
                var f = c === d ? [{ value: d }] : [{ value: c }, { value: (c + d) / 2 }, { value: d, autoRanges: !0 }];
                b.length && b[0].radius && f.reverse();
                f.forEach(function (a, g) {
                    b && b[g] && (f[g] = C(b[g], a));
                });
                return f;
            };
            a.prototype.predictBubbleSizes = function () {
                var a = this.chart,
                    b = this.fontMetrics,
                    g = a.legend.options,
                    c = "horizontal" === g.layout,
                    d = c ? a.legend.lastLineHeight : 0,
                    f = a.plotSizeX,
                    h = a.plotSizeY,
                    e = a.series[this.options.seriesIndex];
                a = Math.ceil(e.minPxSize);
                var l = Math.ceil(e.maxPxSize);
                e = e.options.maxSize;
                var p = Math.min(h, f);
                if (g.floating || !/%$/.test(e)) b = l;
                else if (((e = parseFloat(e)), (b = ((p + d - b.h / 2) * e) / 100 / (e / 100 + 1)), (c && h - b >= f) || (!c && f - b >= h))) b = l;
                return [a, Math.ceil(b)];
            };
            a.prototype.updateRanges = function (a, b) {
                var g = this.legend.options.bubbleLegend;
                g.minSize = a;
                g.maxSize = b;
                g.ranges = this.getRanges();
            };
            a.prototype.correctSizes = function () {
                var a = this.legend,
                    b = this.chart.series[this.options.seriesIndex];
                1 < Math.abs(Math.ceil(b.maxPxSize) - this.options.maxSize) && (this.updateRanges(this.options.minSize, b.maxPxSize), a.render());
            };
            return a;
        })();
        c(a, "afterGetAllItems", function (a) {
            var b = this.bubbleLegend,
                c = this.options,
                g = c.bubbleLegend,
                d = this.chart.getVisibleBubbleSeriesIndex();
            b && b.ranges && b.ranges.length && (g.ranges.length && (g.autoRanges = !!g.ranges[0].autoRanges), this.destroyItem(b));
            0 <= d && c.enabled && g.enabled && ((g.seriesIndex = d), (this.bubbleLegend = new l.BubbleLegend(g, this)), this.bubbleLegend.addToLegend(a.allItems));
        });
        e.prototype.getVisibleBubbleSeriesIndex = function () {
            for (var a = this.series, b = 0; b < a.length; ) {
                if (a[b] && a[b].isBubble && a[b].visible && a[b].zData.length) return b;
                b++;
            }
            return -1;
        };
        a.prototype.getLinesHeights = function () {
            var a = this.allItems,
                b = [],
                c = a.length,
                g,
                d = 0;
            for (g = 0; g < c; g++)
                if ((a[g].legendItemHeight && (a[g].itemHeight = a[g].legendItemHeight), a[g] === a[c - 1] || (a[g + 1] && a[g]._legendItemPos[1] !== a[g + 1]._legendItemPos[1]))) {
                    b.push({ height: 0 });
                    var m = b[b.length - 1];
                    for (d; d <= g; d++) a[d].itemHeight > m.height && (m.height = a[d].itemHeight);
                    m.step = g;
                }
            return b;
        };
        a.prototype.retranslateItems = function (a) {
            var b,
                c,
                g,
                d = this.options.rtl,
                m = 0;
            this.allItems.forEach(function (k, f) {
                b = k.legendGroup.translateX;
                c = k._legendItemPos[1];
                if ((g = k.movementX) || (d && k.ranges)) (g = d ? b - k.options.maxSize / 2 : b + g), k.legendGroup.attr({ translateX: g });
                f > a[m].step && m++;
                k.legendGroup.attr({ translateY: Math.round(c + a[m].height / 2) });
                k._legendItemPos[1] = c + a[m].height / 2;
            });
        };
        c(r, "legendItemClick", function () {
            var a = this.chart,
                b = this.visible,
                c = this.chart.legend;
            c && c.bubbleLegend && ((this.visible = !b), (this.ignoreSeries = b), (a = 0 <= a.getVisibleBubbleSeriesIndex()), c.bubbleLegend.visible !== a && (c.update({ bubbleLegend: { enabled: a } }), (c.bubbleLegend.visible = a)), (this.visible = b));
        });
        q(e.prototype, "drawChartBox", function (a, b, c) {
            var g = this.legend,
                d = 0 <= this.getVisibleBubbleSeriesIndex();
            if (g && g.options.enabled && g.bubbleLegend && g.options.bubbleLegend.autoRanges && d) {
                var k = g.bubbleLegend.options;
                d = g.bubbleLegend.predictBubbleSizes();
                g.bubbleLegend.updateRanges(d[0], d[1]);
                k.placed ||
                    ((g.group.placed = !1),
                    g.allItems.forEach(function (a) {
                        a.legendGroup.translateY = null;
                    }));
                g.render();
                this.getMargins();
                this.axes.forEach(function (a) {
                    a.visible && a.render();
                    k.placed ||
                        (a.setScale(),
                        a.updateNames(),
                        B(a.ticks, function (a) {
                            a.isNew = !0;
                            a.isNewLabel = !0;
                        }));
                });
                k.placed = !0;
                this.getMargins();
                a.call(this, b, c);
                g.bubbleLegend.correctSizes();
                g.retranslateItems(g.getLinesHeights());
            } else a.call(this, b, c), g && g.options.enabled && g.bubbleLegend && (g.render(), g.retranslateItems(g.getLinesHeights()));
        });
        l.BubbleLegend = f;
        return l.BubbleLegend;
    });
    y(e, "Series/Bubble/BubbleSeries.js", [e["Core/Axis/Axis.js"], e["Series/Bubble/BubblePoint.js"], e["Core/Color/Color.js"], e["Core/Globals.js"], e["Core/Series/Series.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function (e, c, d, l, a, n, f) {
        var r =
                (this && this.__extends) ||
                (function () {
                    var a = function (b, g) {
                        a =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (a, b) {
                                    a.__proto__ = b;
                                }) ||
                            function (a, b) {
                                for (var g in b) b.hasOwnProperty(g) && (a[g] = b[g]);
                            };
                        return a(b, g);
                    };
                    return function (b, g) {
                        function c() {
                            this.constructor = b;
                        }
                        a(b, g);
                        b.prototype = null === g ? Object.create(g) : ((c.prototype = g.prototype), new c());
                    };
                })(),
            q = d.parse;
        d = l.noop;
        var w = n.seriesTypes;
        l = w.column;
        var b = w.scatter,
            h = f.arrayMax,
            p = f.arrayMin,
            v = f.clamp,
            C = f.extend,
            B = f.isNumber,
            y = f.merge,
            F = f.pick,
            z = f.pInt;
        f = (function (c) {
            function d() {
                var a = (null !== c && c.apply(this, arguments)) || this;
                a.data = void 0;
                a.maxPxSize = void 0;
                a.minPxSize = void 0;
                a.options = void 0;
                a.points = void 0;
                a.radii = void 0;
                a.yData = void 0;
                a.zData = void 0;
                return a;
            }
            r(d, c);
            d.prototype.animate = function (a) {
                !a &&
                    this.points.length < this.options.animationLimit &&
                    this.points.forEach(function (a) {
                        var b = a.graphic;
                        b && b.width && (this.hasRendered || b.attr({ x: a.plotX, y: a.plotY, width: 1, height: 1 }), b.animate(this.markerAttribs(a), this.options.animation));
                    }, this);
            };
            d.prototype.getRadii = function (a, b, c) {
                var g = this.zData,
                    d = this.yData,
                    k = c.minPxSize,
                    f = c.maxPxSize,
                    m = [];
                var h = 0;
                for (c = g.length; h < c; h++) {
                    var e = g[h];
                    m.push(this.getRadius(a, b, k, f, e, d[h]));
                }
                this.radii = m;
            };
            d.prototype.getRadius = function (a, b, c, d, k, f) {
                var g = this.options,
                    m = "width" !== g.sizeBy,
                    h = g.zThreshold,
                    e = b - a,
                    u = 0.5;
                if (null === f || null === k) return null;
                if (B(k)) {
                    g.sizeByAbsoluteValue && ((k = Math.abs(k - h)), (e = Math.max(b - h, Math.abs(a - h))), (a = 0));
                    if (k < a) return c / 2 - 1;
                    0 < e && (u = (k - a) / e);
                }
                m && 0 <= u && (u = Math.sqrt(u));
                return Math.ceil(c + u * (d - c)) / 2;
            };
            d.prototype.hasData = function () {
                return !!this.processedXData.length;
            };
            d.prototype.pointAttribs = function (b, c) {
                var g = this.options.marker.fillOpacity;
                b = a.prototype.pointAttribs.call(this, b, c);
                1 !== g && (b.fill = q(b.fill).setOpacity(g).get("rgba"));
                return b;
            };
            d.prototype.translate = function () {
                var a,
                    b = this.data,
                    d = this.radii;
                c.prototype.translate.call(this);
                for (a = b.length; a--; ) {
                    var k = b[a];
                    var f = d ? d[a] : 0;
                    B(f) && f >= this.minPxSize / 2 ? ((k.marker = C(k.marker, { radius: f, width: 2 * f, height: 2 * f })), (k.dlBox = { x: k.plotX - f, y: k.plotY - f, width: 2 * f, height: 2 * f })) : (k.shapeArgs = k.plotY = k.dlBox = void 0);
                }
            };
            d.defaultOptions = y(b.defaultOptions, {
                dataLabels: {
                    formatter: function () {
                        return this.point.z;
                    },
                    inside: !0,
                    verticalAlign: "middle",
                },
                animationLimit: 250,
                marker: { lineColor: null, lineWidth: 1, fillOpacity: 0.5, radius: null, states: { hover: { radiusPlus: 0 } }, symbol: "circle" },
                minSize: 8,
                maxSize: "20%",
                softThreshold: !1,
                states: { hover: { halo: { size: 5 } } },
                tooltip: { pointFormat: "({point.x}, {point.y}), Size: {point.z}" },
                turboThreshold: 0,
                zThreshold: 0,
                zoneAxis: "z",
            });
            return d;
        })(b);
        C(f.prototype, { alignDataLabel: l.prototype.alignDataLabel, applyZones: d, bubblePadding: !0, buildKDTree: d, directTouch: !0, isBubble: !0, pointArrayMap: ["y", "z"], pointClass: c, parallelArrays: ["x", "y", "z"], trackerGroups: ["group", "dataLabelsGroup"], specialGroup: "group", zoneAxis: "z" });
        e.prototype.beforePadding = function () {
            var a = this,
                b = this.len,
                c = this.chart,
                d = 0,
                f = b,
                e = this.isXAxis,
                l = e ? "xData" : "yData",
                n = this.min,
                r = {},
                q = Math.min(c.plotWidth, c.plotHeight),
                w = Number.MAX_VALUE,
                C = -Number.MAX_VALUE,
                y = this.max - n,
                H = b / y,
                G = [];
            this.series.forEach(function (b) {
                var g = b.options;
                !b.bubblePadding ||
                    (!b.visible && c.options.chart.ignoreHiddenSeries) ||
                    ((a.allowZoomOutside = !0),
                    G.push(b),
                    e &&
                        (["minSize", "maxSize"].forEach(function (a) {
                            var b = g[a],
                                c = /%$/.test(b);
                            b = z(b);
                            r[a] = c ? (q * b) / 100 : b;
                        }),
                        (b.minPxSize = r.minSize),
                        (b.maxPxSize = Math.max(r.maxSize, r.minSize)),
                        (b = b.zData.filter(B)),
                        b.length && ((w = F(g.zMin, v(p(b), !1 === g.displayNegative ? g.zThreshold : -Number.MAX_VALUE, w))), (C = F(g.zMax, Math.max(C, h(b)))))));
            });
            G.forEach(function (b) {
                var c = b[l],
                    g = c.length;
                e && b.getRadii(w, C, b);
                if (0 < y)
                    for (; g--; )
                        if (B(c[g]) && a.dataMin <= c[g] && c[g] <= a.max) {
                            var k = b.radii ? b.radii[g] : 0;
                            d = Math.min((c[g] - n) * H - k, d);
                            f = Math.max((c[g] - n) * H + k, f);
                        }
            });
            G.length &&
                0 < y &&
                !this.logarithmic &&
                ((f -= b),
                (H *= (b + Math.max(0, d) - Math.min(f, b)) / b),
                [
                    ["min", "userMin", d],
                    ["max", "userMax", f],
                ].forEach(function (b) {
                    "undefined" === typeof F(a.options[b[0]], a[b[1]]) && (a[b[0]] += b[2] / H);
                }));
        };
        n.registerSeriesType("bubble", f);
        ("");
        ("");
        return f;
    });
    y(e, "Series/PackedBubble/PackedBubblePoint.js", [e["Core/Chart/Chart.js"], e["Core/Series/Point.js"], e["Core/Series/SeriesRegistry.js"]], function (e, c, d) {
        var l =
            (this && this.__extends) ||
            (function () {
                var a = function (c, d) {
                    a =
                        Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array &&
                            function (a, c) {
                                a.__proto__ = c;
                            }) ||
                        function (a, c) {
                            for (var d in c) c.hasOwnProperty(d) && (a[d] = c[d]);
                        };
                    return a(c, d);
                };
                return function (c, d) {
                    function f() {
                        this.constructor = c;
                    }
                    a(c, d);
                    c.prototype = null === d ? Object.create(d) : ((f.prototype = d.prototype), new f());
                };
            })();
        return (function (a) {
            function d() {
                var c = (null !== a && a.apply(this, arguments)) || this;
                c.degree = NaN;
                c.mass = NaN;
                c.radius = NaN;
                c.options = void 0;
                c.series = void 0;
                c.value = null;
                return c;
            }
            l(d, a);
            d.prototype.destroy = function () {
                this.series.layout && this.series.layout.removeElementFromCollection(this, this.series.layout.nodes);
                return c.prototype.destroy.apply(this, arguments);
            };
            d.prototype.firePointEvent = function () {
                var a = this.series.options;
                if (this.isParentNode && a.parentNode) {
                    var d = a.allowPointSelect;
                    a.allowPointSelect = a.parentNode.allowPointSelect;
                    c.prototype.firePointEvent.apply(this, arguments);
                    a.allowPointSelect = d;
                } else c.prototype.firePointEvent.apply(this, arguments);
            };
            d.prototype.select = function () {
                var a = this.series.chart;
                this.isParentNode ? ((a.getSelectedPoints = a.getSelectedParentNodes), c.prototype.select.apply(this, arguments), (a.getSelectedPoints = e.prototype.getSelectedPoints)) : c.prototype.select.apply(this, arguments);
            };
            return d;
        })(d.seriesTypes.bubble.prototype.pointClass);
    });
    y(e, "Series/Networkgraph/DraggableNodes.js", [e["Core/Chart/Chart.js"], e["Core/Globals.js"], e["Core/Utilities.js"]], function (e, c, d) {
        var l = d.addEvent;
        c.dragNodesMixin = {
            onMouseDown: function (a, c) {
                c = this.chart.pointer.normalize(c);
                a.fixedPosition = { chartX: c.chartX, chartY: c.chartY, plotX: a.plotX, plotY: a.plotY };
                a.inDragMode = !0;
            },
            onMouseMove: function (a, c) {
                if (a.fixedPosition && a.inDragMode) {
                    var d = this.chart,
                        e = d.pointer.normalize(c);
                    c = a.fixedPosition.chartX - e.chartX;
                    e = a.fixedPosition.chartY - e.chartY;
                    var l = void 0,
                        n = void 0,
                        b = d.graphLayoutsLookup;
                    if (5 < Math.abs(c) || 5 < Math.abs(e))
                        (l = a.fixedPosition.plotX - c),
                            (n = a.fixedPosition.plotY - e),
                            d.isInsidePlot(l, n) &&
                                ((a.plotX = l),
                                (a.plotY = n),
                                (a.hasDragged = !0),
                                this.redrawHalo(a),
                                b.forEach(function (a) {
                                    a.restartSimulation();
                                }));
                }
            },
            onMouseUp: function (a, c) {
                a.fixedPosition && (a.hasDragged && (this.layout.enableSimulation ? this.layout.start() : this.chart.redraw()), (a.inDragMode = a.hasDragged = !1), this.options.fixedDraggable || delete a.fixedPosition);
            },
            redrawHalo: function (a) {
                a && this.halo && this.halo.attr({ d: a.haloPath(this.options.states.hover.halo.size) });
            },
        };
        l(e, "load", function () {
            var a = this,
                c,
                d,
                e;
            a.container &&
                (c = l(a.container, "mousedown", function (c) {
                    var f = a.hoverPoint;
                    f &&
                        f.series &&
                        f.series.hasDraggableNodes &&
                        f.series.options.draggable &&
                        (f.series.onMouseDown(f, c),
                        (d = l(a.container, "mousemove", function (a) {
                            return f && f.series && f.series.onMouseMove(f, a);
                        })),
                        (e = l(a.container.ownerDocument, "mouseup", function (a) {
                            d();
                            e();
                            return f && f.series && f.series.onMouseUp(f, a);
                        })));
                }));
            l(a, "destroy", function () {
                c();
            });
        });
    });
    y(e, "Series/Networkgraph/Integrations.js", [e["Core/Globals.js"]], function (e) {
        e.networkgraphIntegrations = {
            verlet: {
                attractiveForceFunction: function (c, d) {
                    return (d - c) / c;
                },
                repulsiveForceFunction: function (c, d) {
                    return ((d - c) / c) * (d > c ? 1 : 0);
                },
                barycenter: function () {
                    var c = this.options.gravitationalConstant,
                        d = this.barycenter.xFactor,
                        e = this.barycenter.yFactor;
                    d = (d - (this.box.left + this.box.width) / 2) * c;
                    e = (e - (this.box.top + this.box.height) / 2) * c;
                    this.nodes.forEach(function (a) {
                        a.fixedPosition || ((a.plotX -= d / a.mass / a.degree), (a.plotY -= e / a.mass / a.degree));
                    });
                },
                repulsive: function (c, d, e) {
                    d = (d * this.diffTemperature) / c.mass / c.degree;
                    c.fixedPosition || ((c.plotX += e.x * d), (c.plotY += e.y * d));
                },
                attractive: function (c, d, e) {
                    var a = c.getMass(),
                        l = -e.x * d * this.diffTemperature;
                    d = -e.y * d * this.diffTemperature;
                    c.fromNode.fixedPosition || ((c.fromNode.plotX -= (l * a.fromNode) / c.fromNode.degree), (c.fromNode.plotY -= (d * a.fromNode) / c.fromNode.degree));
                    c.toNode.fixedPosition || ((c.toNode.plotX += (l * a.toNode) / c.toNode.degree), (c.toNode.plotY += (d * a.toNode) / c.toNode.degree));
                },
                integrate: function (c, d) {
                    var e = -c.options.friction,
                        a = c.options.maxSpeed,
                        n = (d.plotX + d.dispX - d.prevX) * e;
                    e *= d.plotY + d.dispY - d.prevY;
                    var f = Math.abs,
                        r = f(n) / (n || 1);
                    f = f(e) / (e || 1);
                    n = r * Math.min(a, Math.abs(n));
                    e = f * Math.min(a, Math.abs(e));
                    d.prevX = d.plotX + d.dispX;
                    d.prevY = d.plotY + d.dispY;
                    d.plotX += n;
                    d.plotY += e;
                    d.temperature = c.vectorLength({ x: n, y: e });
                },
                getK: function (c) {
                    return Math.pow((c.box.width * c.box.height) / c.nodes.length, 0.5);
                },
            },
            euler: {
                attractiveForceFunction: function (c, d) {
                    return (c * c) / d;
                },
                repulsiveForceFunction: function (c, d) {
                    return (d * d) / c;
                },
                barycenter: function () {
                    var c = this.options.gravitationalConstant,
                        d = this.barycenter.xFactor,
                        e = this.barycenter.yFactor;
                    this.nodes.forEach(function (a) {
                        if (!a.fixedPosition) {
                            var l = a.getDegree();
                            l *= 1 + l / 2;
                            a.dispX += ((d - a.plotX) * c * l) / a.degree;
                            a.dispY += ((e - a.plotY) * c * l) / a.degree;
                        }
                    });
                },
                repulsive: function (c, d, e, a) {
                    c.dispX += ((e.x / a) * d) / c.degree;
                    c.dispY += ((e.y / a) * d) / c.degree;
                },
                attractive: function (c, d, e, a) {
                    var l = c.getMass(),
                        f = (e.x / a) * d;
                    d *= e.y / a;
                    c.fromNode.fixedPosition || ((c.fromNode.dispX -= (f * l.fromNode) / c.fromNode.degree), (c.fromNode.dispY -= (d * l.fromNode) / c.fromNode.degree));
                    c.toNode.fixedPosition || ((c.toNode.dispX += (f * l.toNode) / c.toNode.degree), (c.toNode.dispY += (d * l.toNode) / c.toNode.degree));
                },
                integrate: function (c, d) {
                    d.dispX += d.dispX * c.options.friction;
                    d.dispY += d.dispY * c.options.friction;
                    var e = (d.temperature = c.vectorLength({ x: d.dispX, y: d.dispY }));
                    0 !== e && ((d.plotX += (d.dispX / e) * Math.min(Math.abs(d.dispX), c.temperature)), (d.plotY += (d.dispY / e) * Math.min(Math.abs(d.dispY), c.temperature)));
                },
                getK: function (c) {
                    return Math.pow((c.box.width * c.box.height) / c.nodes.length, 0.3);
                },
            },
        };
    });
    y(e, "Series/Networkgraph/QuadTree.js", [e["Core/Globals.js"], e["Core/Utilities.js"]], function (e, c) {
        c = c.extend;
        var d = (e.QuadTreeNode = function (c) {
            this.box = c;
            this.boxSize = Math.min(c.width, c.height);
            this.nodes = [];
            this.body = this.isInternal = !1;
            this.isEmpty = !0;
        });
        c(d.prototype, {
            insert: function (c, a) {
                this.isInternal
                    ? this.nodes[this.getBoxPosition(c)].insert(c, a - 1)
                    : ((this.isEmpty = !1), this.body ? (a ? ((this.isInternal = !0), this.divideBox(), !0 !== this.body && (this.nodes[this.getBoxPosition(this.body)].insert(this.body, a - 1), (this.body = !0)), this.nodes[this.getBoxPosition(c)].insert(c, a - 1)) : ((a = new d({ top: c.plotX, left: c.plotY, width: 0.1, height: 0.1 })), (a.body = c), (a.isInternal = !1), this.nodes.push(a))) : ((this.isInternal = !1), (this.body = c)));
            },
            updateMassAndCenter: function () {
                var c = 0,
                    a = 0,
                    d = 0;
                this.isInternal
                    ? (this.nodes.forEach(function (e) {
                          e.isEmpty || ((c += e.mass), (a += e.plotX * e.mass), (d += e.plotY * e.mass));
                      }),
                      (a /= c),
                      (d /= c))
                    : this.body && ((c = this.body.mass), (a = this.body.plotX), (d = this.body.plotY));
                this.mass = c;
                this.plotX = a;
                this.plotY = d;
            },
            divideBox: function () {
                var c = this.box.width / 2,
                    a = this.box.height / 2;
                this.nodes[0] = new d({ left: this.box.left, top: this.box.top, width: c, height: a });
                this.nodes[1] = new d({ left: this.box.left + c, top: this.box.top, width: c, height: a });
                this.nodes[2] = new d({ left: this.box.left + c, top: this.box.top + a, width: c, height: a });
                this.nodes[3] = new d({ left: this.box.left, top: this.box.top + a, width: c, height: a });
            },
            getBoxPosition: function (c) {
                var a = c.plotY < this.box.top + this.box.height / 2;
                return c.plotX < this.box.left + this.box.width / 2 ? (a ? 0 : 3) : a ? 1 : 2;
            },
        });
        e = e.QuadTree = function (c, a, e, f) {
            this.box = { left: c, top: a, width: e, height: f };
            this.maxDepth = 25;
            this.root = new d(this.box, "0");
            this.root.isInternal = !0;
            this.root.isRoot = !0;
            this.root.divideBox();
        };
        c(e.prototype, {
            insertNodes: function (c) {
                c.forEach(function (a) {
                    this.root.insert(a, this.maxDepth);
                }, this);
            },
            visitNodeRecursive: function (c, a, d) {
                var e;
                c || (c = this.root);
                c === this.root && a && (e = a(c));
                !1 !== e &&
                    (c.nodes.forEach(function (c) {
                        if (c.isInternal) {
                            a && (e = a(c));
                            if (!1 === e) return;
                            this.visitNodeRecursive(c, a, d);
                        } else c.body && a && a(c.body);
                        d && d(c);
                    }, this),
                    c === this.root && d && d(c));
            },
            calculateMassAndCenter: function () {
                this.visitNodeRecursive(null, null, function (c) {
                    c.updateMassAndCenter();
                });
            },
        });
    });
    y(e, "Series/Networkgraph/Layouts.js", [e["Core/Chart/Chart.js"], e["Core/Animation/AnimationUtilities.js"], e["Core/Globals.js"], e["Core/Utilities.js"]], function (e, c, d, l) {
        var a = c.setAnimation;
        c = l.addEvent;
        var n = l.clamp,
            f = l.defined,
            r = l.extend,
            q = l.isFunction,
            w = l.pick;
        d.layouts = { "reingold-fruchterman": function () {} };
        r(d.layouts["reingold-fruchterman"].prototype, {
            init: function (a) {
                this.options = a;
                this.nodes = [];
                this.links = [];
                this.series = [];
                this.box = { x: 0, y: 0, width: 0, height: 0 };
                this.setInitialRendering(!0);
                this.integration = d.networkgraphIntegrations[a.integration];
                this.enableSimulation = a.enableSimulation;
                this.attractiveForce = w(a.attractiveForce, this.integration.attractiveForceFunction);
                this.repulsiveForce = w(a.repulsiveForce, this.integration.repulsiveForceFunction);
                this.approximation = a.approximation;
            },
            updateSimulation: function (a) {
                this.enableSimulation = w(a, this.options.enableSimulation);
            },
            start: function () {
                var a = this.series,
                    c = this.options;
                this.currentStep = 0;
                this.forces = (a[0] && a[0].forces) || [];
                this.chart = a[0] && a[0].chart;
                this.initialRendering &&
                    (this.initPositions(),
                    a.forEach(function (a) {
                        a.finishedAnimating = !0;
                        a.render();
                    }));
                this.setK();
                this.resetSimulation(c);
                this.enableSimulation && this.step();
            },
            step: function () {
                var a = this,
                    c = this.series;
                a.currentStep++;
                "barnes-hut" === a.approximation && (a.createQuadTree(), a.quadTree.calculateMassAndCenter());
                a.forces.forEach(function (b) {
                    a[b + "Forces"](a.temperature);
                });
                a.applyLimits(a.temperature);
                a.temperature = a.coolDown(a.startTemperature, a.diffTemperature, a.currentStep);
                a.prevSystemTemperature = a.systemTemperature;
                a.systemTemperature = a.getSystemTemperature();
                a.enableSimulation &&
                    (c.forEach(function (a) {
                        a.chart && a.render();
                    }),
                    a.maxIterations-- && isFinite(a.temperature) && !a.isStable()
                        ? (a.simulation && d.win.cancelAnimationFrame(a.simulation),
                          (a.simulation = d.win.requestAnimationFrame(function () {
                              a.step();
                          })))
                        : (a.simulation = !1));
            },
            stop: function () {
                this.simulation && d.win.cancelAnimationFrame(this.simulation);
            },
            setArea: function (a, c, d, e) {
                this.box = { left: a, top: c, width: d, height: e };
            },
            setK: function () {
                this.k = this.options.linkLength || this.integration.getK(this);
            },
            addElementsToCollection: function (a, c) {
                a.forEach(function (a) {
                    -1 === c.indexOf(a) && c.push(a);
                });
            },
            removeElementFromCollection: function (a, c) {
                a = c.indexOf(a);
                -1 !== a && c.splice(a, 1);
            },
            clear: function () {
                this.nodes.length = 0;
                this.links.length = 0;
                this.series.length = 0;
                this.resetSimulation();
            },
            resetSimulation: function () {
                this.forcedStop = !1;
                this.systemTemperature = 0;
                this.setMaxIterations();
                this.setTemperature();
                this.setDiffTemperature();
            },
            restartSimulation: function () {
                this.simulation ? this.resetSimulation() : (this.setInitialRendering(!1), this.enableSimulation ? this.start() : this.setMaxIterations(1), this.chart && this.chart.redraw(), this.setInitialRendering(!0));
            },
            setMaxIterations: function (a) {
                this.maxIterations = w(a, this.options.maxIterations);
            },
            setTemperature: function () {
                this.temperature = this.startTemperature = Math.sqrt(this.nodes.length);
            },
            setDiffTemperature: function () {
                this.diffTemperature = this.startTemperature / (this.options.maxIterations + 1);
            },
            setInitialRendering: function (a) {
                this.initialRendering = a;
            },
            createQuadTree: function () {
                this.quadTree = new d.QuadTree(this.box.left, this.box.top, this.box.width, this.box.height);
                this.quadTree.insertNodes(this.nodes);
            },
            initPositions: function () {
                var a = this.options.initialPositions;
                q(a)
                    ? (a.call(this),
                      this.nodes.forEach(function (a) {
                          f(a.prevX) || (a.prevX = a.plotX);
                          f(a.prevY) || (a.prevY = a.plotY);
                          a.dispX = 0;
                          a.dispY = 0;
                      }))
                    : "circle" === a
                    ? this.setCircularPositions()
                    : this.setRandomPositions();
            },
            setCircularPositions: function () {
                function a(b) {
                    b.linksFrom.forEach(function (b) {
                        r[b.toNode.id] || ((r[b.toNode.id] = !0), l.push(b.toNode), a(b.toNode));
                    });
                }
                var c = this.box,
                    d = this.nodes,
                    e = (2 * Math.PI) / (d.length + 1),
                    f = d.filter(function (a) {
                        return 0 === a.linksTo.length;
                    }),
                    l = [],
                    r = {},
                    q = this.options.initialPositionRadius;
                f.forEach(function (b) {
                    l.push(b);
                    a(b);
                });
                l.length
                    ? d.forEach(function (a) {
                          -1 === l.indexOf(a) && l.push(a);
                      })
                    : (l = d);
                l.forEach(function (a, b) {
                    a.plotX = a.prevX = w(a.plotX, c.width / 2 + q * Math.cos(b * e));
                    a.plotY = a.prevY = w(a.plotY, c.height / 2 + q * Math.sin(b * e));
                    a.dispX = 0;
                    a.dispY = 0;
                });
            },
            setRandomPositions: function () {
                function a(a) {
                    a = (a * a) / Math.PI;
                    return (a -= Math.floor(a));
                }
                var c = this.box,
                    d = this.nodes,
                    e = d.length + 1;
                d.forEach(function (b, d) {
                    b.plotX = b.prevX = w(b.plotX, c.width * a(d));
                    b.plotY = b.prevY = w(b.plotY, c.height * a(e + d));
                    b.dispX = 0;
                    b.dispY = 0;
                });
            },
            force: function (a) {
                this.integration[a].apply(this, Array.prototype.slice.call(arguments, 1));
            },
            barycenterForces: function () {
                this.getBarycenter();
                this.force("barycenter");
            },
            getBarycenter: function () {
                var a = 0,
                    c = 0,
                    d = 0;
                this.nodes.forEach(function (b) {
                    c += b.plotX * b.mass;
                    d += b.plotY * b.mass;
                    a += b.mass;
                });
                return (this.barycenter = { x: c, y: d, xFactor: c / a, yFactor: d / a });
            },
            barnesHutApproximation: function (a, c) {
                var b = this.getDistXY(a, c),
                    d = this.vectorLength(b);
                if (a !== c && 0 !== d)
                    if (c.isInternal)
                        if (c.boxSize / d < this.options.theta && 0 !== d) {
                            var e = this.repulsiveForce(d, this.k);
                            this.force("repulsive", a, e * c.mass, b, d);
                            var f = !1;
                        } else f = !0;
                    else (e = this.repulsiveForce(d, this.k)), this.force("repulsive", a, e * c.mass, b, d);
                return f;
            },
            repulsiveForces: function () {
                var a = this;
                "barnes-hut" === a.approximation
                    ? a.nodes.forEach(function (b) {
                          a.quadTree.visitNodeRecursive(null, function (c) {
                              return a.barnesHutApproximation(b, c);
                          });
                      })
                    : a.nodes.forEach(function (b) {
                          a.nodes.forEach(function (c) {
                              if (b !== c && !b.fixedPosition) {
                                  var d = a.getDistXY(b, c);
                                  var e = a.vectorLength(d);
                                  if (0 !== e) {
                                      var f = a.repulsiveForce(e, a.k);
                                      a.force("repulsive", b, f * c.mass, d, e);
                                  }
                              }
                          });
                      });
            },
            attractiveForces: function () {
                var a = this,
                    c,
                    d,
                    e;
                a.links.forEach(function (b) {
                    b.fromNode && b.toNode && ((c = a.getDistXY(b.fromNode, b.toNode)), (d = a.vectorLength(c)), 0 !== d && ((e = a.attractiveForce(d, a.k)), a.force("attractive", b, e, c, d)));
                });
            },
            applyLimits: function () {
                var a = this;
                a.nodes.forEach(function (b) {
                    b.fixedPosition || (a.integration.integrate(a, b), a.applyLimitBox(b, a.box), (b.dispX = 0), (b.dispY = 0));
                });
            },
            applyLimitBox: function (a, c) {
                var b = a.radius;
                a.plotX = n(a.plotX, c.left + b, c.width - b);
                a.plotY = n(a.plotY, c.top + b, c.height - b);
            },
            coolDown: function (a, c, d) {
                return a - c * d;
            },
            isStable: function () {
                return 0.00001 > Math.abs(this.systemTemperature - this.prevSystemTemperature) || 0 >= this.temperature;
            },
            getSystemTemperature: function () {
                return this.nodes.reduce(function (a, c) {
                    return a + c.temperature;
                }, 0);
            },
            vectorLength: function (a) {
                return Math.sqrt(a.x * a.x + a.y * a.y);
            },
            getDistR: function (a, c) {
                a = this.getDistXY(a, c);
                return this.vectorLength(a);
            },
            getDistXY: function (a, c) {
                var b = a.plotX - c.plotX;
                a = a.plotY - c.plotY;
                return { x: b, y: a, absX: Math.abs(b), absY: Math.abs(a) };
            },
        });
        c(e, "predraw", function () {
            this.graphLayoutsLookup &&
                this.graphLayoutsLookup.forEach(function (a) {
                    a.stop();
                });
        });
        c(e, "render", function () {
            function b(a) {
                a.maxIterations-- && isFinite(a.temperature) && !a.isStable() && !a.enableSimulation && (a.beforeStep && a.beforeStep(), a.step(), (d = !1), (c = !0));
            }
            var c = !1;
            if (this.graphLayoutsLookup) {
                a(!1, this);
                for (
                    this.graphLayoutsLookup.forEach(function (a) {
                        a.start();
                    });
                    !d;

                ) {
                    var d = !0;
                    this.graphLayoutsLookup.forEach(b);
                }
                c &&
                    this.series.forEach(function (a) {
                        a && a.layout && a.render();
                    });
            }
        });
        c(e, "beforePrint", function () {
            this.graphLayoutsLookup &&
                (this.graphLayoutsLookup.forEach(function (a) {
                    a.updateSimulation(!1);
                }),
                this.redraw());
        });
        c(e, "afterPrint", function () {
            this.graphLayoutsLookup &&
                this.graphLayoutsLookup.forEach(function (a) {
                    a.updateSimulation();
                });
            this.redraw();
        });
    });
    y(e, "Series/PackedBubble/PackedBubbleComposition.js", [e["Core/Chart/Chart.js"], e["Core/Globals.js"], e["Core/Utilities.js"]], function (e, c, d) {
        var l = c.layouts["reingold-fruchterman"],
            a = d.addEvent,
            n = d.extendClass,
            f = d.pick;
        e.prototype.getSelectedParentNodes = function () {
            var a = [];
            this.series.forEach(function (c) {
                c.parentNode && c.parentNode.selected && a.push(c.parentNode);
            });
            return a;
        };
        c.networkgraphIntegrations.packedbubble = {
            repulsiveForceFunction: function (a, c, d, b) {
                return Math.min(a, (d.marker.radius + b.marker.radius) / 2);
            },
            barycenter: function () {
                var a = this,
                    c = a.options.gravitationalConstant,
                    d = a.box,
                    b = a.nodes,
                    e,
                    f;
                b.forEach(function (h) {
                    a.options.splitSeries && !h.isParentNode ? ((e = h.series.parentNode.plotX), (f = h.series.parentNode.plotY)) : ((e = d.width / 2), (f = d.height / 2));
                    h.fixedPosition || ((h.plotX -= ((h.plotX - e) * c) / (h.mass * Math.sqrt(b.length))), (h.plotY -= ((h.plotY - f) * c) / (h.mass * Math.sqrt(b.length))));
                });
            },
            repulsive: function (a, c, d, b) {
                var e = (c * this.diffTemperature) / a.mass / a.degree;
                c = d.x * e;
                d = d.y * e;
                a.fixedPosition || ((a.plotX += c), (a.plotY += d));
                b.fixedPosition || ((b.plotX -= c), (b.plotY -= d));
            },
            integrate: c.networkgraphIntegrations.verlet.integrate,
            getK: c.noop,
        };
        c.layouts.packedbubble = n(l, {
            beforeStep: function () {
                this.options.marker &&
                    this.series.forEach(function (a) {
                        a && a.calculateParentRadius();
                    });
            },
            isStable: function () {
                var a = Math.abs(this.prevSystemTemperature - this.systemTemperature);
                return (1 > Math.abs((10 * this.systemTemperature) / Math.sqrt(this.nodes.length)) && 0.00001 > a) || 0 >= this.temperature;
            },
            setCircularPositions: function () {
                var a = this,
                    c = a.box,
                    d = a.nodes,
                    b = (2 * Math.PI) / (d.length + 1),
                    e,
                    l,
                    n = a.options.initialPositionRadius;
                d.forEach(function (d, h) {
                    a.options.splitSeries && !d.isParentNode ? ((e = d.series.parentNode.plotX), (l = d.series.parentNode.plotY)) : ((e = c.width / 2), (l = c.height / 2));
                    d.plotX = d.prevX = f(d.plotX, e + n * Math.cos(d.index || h * b));
                    d.plotY = d.prevY = f(d.plotY, l + n * Math.sin(d.index || h * b));
                    d.dispX = 0;
                    d.dispY = 0;
                });
            },
            repulsiveForces: function () {
                var a = this,
                    c,
                    d,
                    b,
                    e = a.options.bubblePadding;
                a.nodes.forEach(function (f) {
                    f.degree = f.mass;
                    f.neighbours = 0;
                    a.nodes.forEach(function (h) {
                        c = 0;
                        f === h || f.fixedPosition || (!a.options.seriesInteraction && f.series !== h.series) || ((b = a.getDistXY(f, h)), (d = a.vectorLength(b) - (f.marker.radius + h.marker.radius + e)), 0 > d && ((f.degree += 0.01), f.neighbours++, (c = a.repulsiveForce(-d / Math.sqrt(f.neighbours), a.k, f, h))), a.force("repulsive", f, c * h.mass, b, h, d));
                    });
                });
            },
            applyLimitBox: function (a) {
                if (this.options.splitSeries && !a.isParentNode && this.options.parentNodeLimit) {
                    var c = this.getDistXY(a, a.series.parentNode);
                    var d = a.series.parentNodeRadius - a.marker.radius - this.vectorLength(c);
                    0 > d && d > -2 * a.marker.radius && ((a.plotX -= 0.01 * c.x), (a.plotY -= 0.01 * c.y));
                }
                l.prototype.applyLimitBox.apply(this, arguments);
            },
        });
        a(e, "beforeRedraw", function () {
            this.allDataPoints && delete this.allDataPoints;
        });
    });
    y(e, "Series/PackedBubble/PackedBubbleSeries.js", [e["Core/Color/Color.js"], e["Core/Globals.js"], e["Series/PackedBubble/PackedBubblePoint.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function (e, c, d, l, a) {
        var n =
                (this && this.__extends) ||
                (function () {
                    var a = function (b, c) {
                        a =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (a, b) {
                                    a.__proto__ = b;
                                }) ||
                            function (a, b) {
                                for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
                            };
                        return a(b, c);
                    };
                    return function (b, c) {
                        function g() {
                            this.constructor = b;
                        }
                        a(b, c);
                        b.prototype = null === c ? Object.create(c) : ((g.prototype = c.prototype), new g());
                    };
                })(),
            f = e.parse,
            r = l.series,
            q = l.seriesTypes.bubble,
            w = a.addEvent,
            b = a.clamp,
            h = a.defined,
            p = a.extend,
            v = a.fireEvent,
            y = a.isArray,
            B = a.isNumber,
            I = a.merge,
            F = a.pick,
            z = c.dragNodesMixin;
        e = (function (a) {
            function d() {
                var b = (null !== a && a.apply(this, arguments)) || this;
                b.chart = void 0;
                b.data = void 0;
                b.layout = void 0;
                b.options = void 0;
                b.points = void 0;
                b.xData = void 0;
                return b;
            }
            n(d, a);
            d.prototype.accumulateAllPoints = function (a) {
                var b = a.chart,
                    c = [],
                    g,
                    d;
                for (g = 0; g < b.series.length; g++) if (((a = b.series[g]), (a.is("packedbubble") && a.visible) || !b.options.chart.ignoreHiddenSeries)) for (d = 0; d < a.yData.length; d++) c.push([null, null, a.yData[d], a.index, d, { id: d, marker: { radius: 0 } }]);
                return c;
            };
            d.prototype.addLayout = function () {
                var a = this.options.layoutAlgorithm,
                    b = this.chart.graphLayoutsStorage,
                    d = this.chart.graphLayoutsLookup,
                    e = this.chart.options.chart;
                b || ((this.chart.graphLayoutsStorage = b = {}), (this.chart.graphLayoutsLookup = d = []));
                var f = b[a.type];
                f || ((a.enableSimulation = h(e.forExport) ? !e.forExport : a.enableSimulation), (b[a.type] = f = new c.layouts[a.type]()), f.init(a), d.splice(f.index, 0, f));
                this.layout = f;
                this.points.forEach(function (a) {
                    a.mass = 2;
                    a.degree = 1;
                    a.collisionNmb = 1;
                });
                f.setArea(0, 0, this.chart.plotWidth, this.chart.plotHeight);
                f.addElementsToCollection([this], f.series);
                f.addElementsToCollection(this.points, f.nodes);
            };
            d.prototype.addSeriesLayout = function () {
                var a = this.options.layoutAlgorithm,
                    b = this.chart.graphLayoutsStorage,
                    d = this.chart.graphLayoutsLookup,
                    e = I(a, a.parentNodeOptions, { enableSimulation: this.layout.options.enableSimulation });
                var f = b[a.type + "-series"];
                f || ((b[a.type + "-series"] = f = new c.layouts[a.type]()), f.init(e), d.splice(f.index, 0, f));
                this.parentNodeLayout = f;
                this.createParentNodes();
            };
            d.prototype.calculateParentRadius = function () {
                var a = this.seriesBox();
                this.parentNodeRadius = b(Math.sqrt((2 * this.parentNodeMass) / Math.PI) + 20, 20, a ? Math.max(Math.sqrt(Math.pow(a.width, 2) + Math.pow(a.height, 2)) / 2 + 20, 20) : Math.sqrt((2 * this.parentNodeMass) / Math.PI) + 20);
                this.parentNode && (this.parentNode.marker.radius = this.parentNode.radius = this.parentNodeRadius);
            };
            d.prototype.calculateZExtremes = function () {
                var a = this.options.zMin,
                    b = this.options.zMax,
                    c = Infinity,
                    d = -Infinity;
                if (a && b) return [a, b];
                this.chart.series.forEach(function (a) {
                    a.yData.forEach(function (a) {
                        h(a) && (a > d && (d = a), a < c && (c = a));
                    });
                });
                a = F(a, c);
                b = F(b, d);
                return [a, b];
            };
            d.prototype.checkOverlap = function (a, b) {
                var c = a[0] - b[0],
                    d = a[1] - b[1];
                return -0.001 > Math.sqrt(c * c + d * d) - Math.abs(a[2] + b[2]);
            };
            d.prototype.createParentNodes = function () {
                var a = this,
                    b = a.chart,
                    c = a.parentNodeLayout,
                    d,
                    e = a.parentNode,
                    f = a.pointClass;
                a.parentNodeMass = 0;
                a.points.forEach(function (b) {
                    a.parentNodeMass += Math.PI * Math.pow(b.marker.radius, 2);
                });
                a.calculateParentRadius();
                c.nodes.forEach(function (b) {
                    b.seriesIndex === a.index && (d = !0);
                });
                c.setArea(0, 0, b.plotWidth, b.plotHeight);
                d || (e || (e = new f().init(this, { mass: a.parentNodeRadius / 2, marker: { radius: a.parentNodeRadius }, dataLabels: { inside: !1 }, dataLabelOnNull: !0, degree: a.parentNodeRadius, isParentNode: !0, seriesIndex: a.index })), a.parentNode && ((e.plotX = a.parentNode.plotX), (e.plotY = a.parentNode.plotY)), (a.parentNode = e), c.addElementsToCollection([a], c.series), c.addElementsToCollection([e], c.nodes));
            };
            d.prototype.deferLayout = function () {
                var a = this.options.layoutAlgorithm;
                this.visible && (this.addLayout(), a.splitSeries && this.addSeriesLayout());
            };
            d.prototype.destroy = function () {
                this.chart.graphLayoutsLookup &&
                    this.chart.graphLayoutsLookup.forEach(function (a) {
                        a.removeElementFromCollection(this, a.series);
                    }, this);
                this.parentNode && this.parentNodeLayout && (this.parentNodeLayout.removeElementFromCollection(this.parentNode, this.parentNodeLayout.nodes), this.parentNode.dataLabel && (this.parentNode.dataLabel = this.parentNode.dataLabel.destroy()));
                r.prototype.destroy.apply(this, arguments);
            };
            d.prototype.drawDataLabels = function () {
                var a = this.options.dataLabels.textPath,
                    b = this.points;
                r.prototype.drawDataLabels.apply(this, arguments);
                this.parentNode && ((this.parentNode.formatPrefix = "parentNode"), (this.points = [this.parentNode]), (this.options.dataLabels.textPath = this.options.dataLabels.parentNodeTextPath), r.prototype.drawDataLabels.apply(this, arguments), (this.points = b), (this.options.dataLabels.textPath = a));
            };
            d.prototype.drawGraph = function () {
                if (this.layout && this.layout.options.splitSeries) {
                    var a = this.chart;
                    var b = this.layout.options.parentNodeOptions.marker;
                    var c = { fill: b.fillColor || f(this.color).brighten(0.4).get(), opacity: b.fillOpacity, stroke: b.lineColor || this.color, "stroke-width": b.lineWidth };
                    this.parentNodesGroup || ((this.parentNodesGroup = this.plotGroup("parentNodesGroup", "parentNode", this.visible ? "inherit" : "hidden", 0.1, a.seriesGroup)), this.group.attr({ zIndex: 2 }));
                    this.calculateParentRadius();
                    b = I({ x: this.parentNode.plotX - this.parentNodeRadius, y: this.parentNode.plotY - this.parentNodeRadius, width: 2 * this.parentNodeRadius, height: 2 * this.parentNodeRadius }, c);
                    this.parentNode.graphic || (this.graph = this.parentNode.graphic = a.renderer.symbol(c.symbol).add(this.parentNodesGroup));
                    this.parentNode.graphic.attr(b);
                }
            };
            d.prototype.drawTracker = function () {
                var b = this.parentNode;
                a.prototype.drawTracker.call(this);
                if (b) {
                    var c = y(b.dataLabels) ? b.dataLabels : b.dataLabel ? [b.dataLabel] : [];
                    b.graphic && (b.graphic.element.point = b);
                    c.forEach(function (a) {
                        a.div ? (a.div.point = b) : (a.element.point = b);
                    });
                }
            };
            d.prototype.getPointRadius = function () {
                var a = this,
                    c = a.chart,
                    d = a.options,
                    e = d.useSimulation,
                    f = Math.min(c.plotWidth, c.plotHeight),
                    k = {},
                    h = [],
                    l = c.allDataPoints,
                    n,
                    p,
                    q,
                    r;
                ["minSize", "maxSize"].forEach(function (a) {
                    var b = parseInt(d[a], 10),
                        c = /%$/.test(d[a]);
                    k[a] = c ? (f * b) / 100 : b * Math.sqrt(l.length);
                });
                c.minRadius = n = k.minSize / Math.sqrt(l.length);
                c.maxRadius = p = k.maxSize / Math.sqrt(l.length);
                var t = e ? a.calculateZExtremes() : [n, p];
                (l || []).forEach(function (c, d) {
                    q = e ? b(c[2], t[0], t[1]) : c[2];
                    r = a.getRadius(t[0], t[1], n, p, q);
                    0 === r && (r = null);
                    l[d][2] = r;
                    h.push(r);
                });
                a.radii = h;
            };
            d.prototype.init = function () {
                r.prototype.init.apply(this, arguments);
                this.eventsToUnbind.push(
                    w(this, "updatedData", function () {
                        this.chart.series.forEach(function (a) {
                            a.type === this.type && (a.isDirty = !0);
                        }, this);
                    })
                );
                return this;
            };
            d.prototype.onMouseUp = function (a) {
                if (a.fixedPosition && !a.removed) {
                    var b,
                        c,
                        d = this.layout,
                        g = this.parentNodeLayout;
                    g &&
                        d.options.dragBetweenSeries &&
                        g.nodes.forEach(function (g) {
                            a && a.marker && g !== a.series.parentNode && ((b = d.getDistXY(a, g)), (c = d.vectorLength(b) - g.marker.radius - a.marker.radius), 0 > c && (g.series.addPoint(I(a.options, { plotX: a.plotX, plotY: a.plotY }), !1), d.removeElementFromCollection(a, d.nodes), a.remove()));
                        });
                    z.onMouseUp.apply(this, arguments);
                }
            };
            d.prototype.placeBubbles = function (a) {
                var b = this.checkOverlap,
                    c = this.positionBubble,
                    d = [],
                    g = 1,
                    e = 0,
                    f = 0;
                var k = [];
                var h;
                a = a.sort(function (a, b) {
                    return b[2] - a[2];
                });
                if (a.length) {
                    d.push([[0, 0, a[0][2], a[0][3], a[0][4]]]);
                    if (1 < a.length) for (d.push([[0, 0 - a[1][2] - a[0][2], a[1][2], a[1][3], a[1][4]]]), h = 2; h < a.length; h++) (a[h][2] = a[h][2] || 1), (k = c(d[g][e], d[g - 1][f], a[h])), b(k, d[g][0]) ? (d.push([]), (f = 0), d[g + 1].push(c(d[g][e], d[g][0], a[h])), g++, (e = 0)) : 1 < g && d[g - 1][f + 1] && b(k, d[g - 1][f + 1]) ? (f++, d[g].push(c(d[g][e], d[g - 1][f], a[h])), e++) : (e++, d[g].push(k));
                    this.chart.stages = d;
                    this.chart.rawPositions = [].concat.apply([], d);
                    this.resizeRadius();
                    k = this.chart.rawPositions;
                }
                return k;
            };
            d.prototype.positionBubble = function (a, b, c) {
                var d = Math.sqrt,
                    g = Math.asin,
                    e = Math.acos,
                    f = Math.pow,
                    k = Math.abs;
                d = d(f(a[0] - b[0], 2) + f(a[1] - b[1], 2));
                e = e((f(d, 2) + f(c[2] + b[2], 2) - f(c[2] + a[2], 2)) / (2 * (c[2] + b[2]) * d));
                g = g(k(a[0] - b[0]) / d);
                a = (0 > a[1] - b[1] ? 0 : Math.PI) + e + g * (0 > (a[0] - b[0]) * (a[1] - b[1]) ? 1 : -1);
                return [b[0] + (b[2] + c[2]) * Math.sin(a), b[1] - (b[2] + c[2]) * Math.cos(a), c[2], c[3], c[4]];
            };
            d.prototype.render = function () {
                var a = [];
                r.prototype.render.apply(this, arguments);
                this.options.dataLabels.allowOverlap ||
                    (this.data.forEach(function (b) {
                        y(b.dataLabels) &&
                            b.dataLabels.forEach(function (b) {
                                a.push(b);
                            });
                    }),
                    this.options.useSimulation && this.chart.hideOverlappingLabels(a));
            };
            d.prototype.resizeRadius = function () {
                var a = this.chart,
                    b = a.rawPositions,
                    c = Math.min,
                    d = Math.max,
                    e = a.plotLeft,
                    f = a.plotTop,
                    k = a.plotHeight,
                    h = a.plotWidth,
                    l,
                    n,
                    p;
                var q = (l = Number.POSITIVE_INFINITY);
                var r = (n = Number.NEGATIVE_INFINITY);
                for (p = 0; p < b.length; p++) {
                    var t = b[p][2];
                    q = c(q, b[p][0] - t);
                    r = d(r, b[p][0] + t);
                    l = c(l, b[p][1] - t);
                    n = d(n, b[p][1] + t);
                }
                p = [r - q, n - l];
                c = c.apply([], [(h - e) / p[0], (k - f) / p[1]]);
                if (1e-10 < Math.abs(c - 1)) {
                    for (p = 0; p < b.length; p++) b[p][2] *= c;
                    this.placeBubbles(b);
                } else (a.diffY = k / 2 + f - l - (n - l) / 2), (a.diffX = h / 2 + e - q - (r - q) / 2);
            };
            d.prototype.seriesBox = function () {
                var a = this.chart,
                    b = Math.max,
                    c = Math.min,
                    d,
                    e = [a.plotLeft, a.plotLeft + a.plotWidth, a.plotTop, a.plotTop + a.plotHeight];
                this.data.forEach(function (a) {
                    h(a.plotX) && h(a.plotY) && a.marker.radius && ((d = a.marker.radius), (e[0] = c(e[0], a.plotX - d)), (e[1] = b(e[1], a.plotX + d)), (e[2] = c(e[2], a.plotY - d)), (e[3] = b(e[3], a.plotY + d)));
                });
                return B(e.width / e.height) ? e : null;
            };
            d.prototype.setVisible = function () {
                var a = this;
                r.prototype.setVisible.apply(a, arguments);
                a.parentNodeLayout && a.graph
                    ? a.visible
                        ? (a.graph.show(), a.parentNode.dataLabel && a.parentNode.dataLabel.show())
                        : (a.graph.hide(), a.parentNodeLayout.removeElementFromCollection(a.parentNode, a.parentNodeLayout.nodes), a.parentNode.dataLabel && a.parentNode.dataLabel.hide())
                    : a.layout &&
                      (a.visible
                          ? a.layout.addElementsToCollection(a.points, a.layout.nodes)
                          : a.points.forEach(function (b) {
                                a.layout.removeElementFromCollection(b, a.layout.nodes);
                            }));
            };
            d.prototype.translate = function () {
                var a = this.chart,
                    b = this.data,
                    c = this.index,
                    d,
                    e = this.options.useSimulation;
                this.processedXData = this.xData;
                this.generatePoints();
                h(a.allDataPoints) || ((a.allDataPoints = this.accumulateAllPoints(this)), this.getPointRadius());
                if (e) var f = a.allDataPoints;
                else (f = this.placeBubbles(a.allDataPoints)), (this.options.draggable = !1);
                for (d = 0; d < f.length; d++)
                    if (f[d][3] === c) {
                        var k = b[f[d][4]];
                        var l = F(f[d][2], void 0);
                        e || ((k.plotX = f[d][0] - a.plotLeft + a.diffX), (k.plotY = f[d][1] - a.plotTop + a.diffY));
                        B(l) && ((k.marker = p(k.marker, { radius: l, width: 2 * l, height: 2 * l })), (k.radius = l));
                    }
                e && this.deferLayout();
                v(this, "afterTranslate");
            };
            d.defaultOptions = I(q.defaultOptions, {
                minSize: "10%",
                maxSize: "50%",
                sizeBy: "area",
                zoneAxis: "y",
                crisp: !1,
                tooltip: { pointFormat: "Value: {point.value}" },
                draggable: !0,
                useSimulation: !0,
                parentNode: { allowPointSelect: !1 },
                dataLabels: {
                    formatter: function () {
                        return this.point.value;
                    },
                    parentNodeFormatter: function () {
                        return this.name;
                    },
                    parentNodeTextPath: { enabled: !0 },
                    padding: 0,
                    style: { transition: "opacity 2000ms" },
                },
                layoutAlgorithm: {
                    initialPositions: "circle",
                    initialPositionRadius: 20,
                    bubblePadding: 5,
                    parentNodeLimit: !1,
                    seriesInteraction: !0,
                    dragBetweenSeries: !1,
                    parentNodeOptions: { maxIterations: 400, gravitationalConstant: 0.03, maxSpeed: 50, initialPositionRadius: 100, seriesInteraction: !0, marker: { fillColor: null, fillOpacity: 1, lineWidth: 1, lineColor: null, symbol: "circle" } },
                    enableSimulation: !0,
                    type: "packedbubble",
                    integration: "packedbubble",
                    maxIterations: 1e3,
                    splitSeries: !1,
                    maxSpeed: 5,
                    gravitationalConstant: 0.01,
                    friction: -0.981,
                },
            });
            return d;
        })(q);
        p(e.prototype, { alignDataLabel: r.prototype.alignDataLabel, axisTypes: [], directTouch: !0, forces: ["barycenter", "repulsive"], hasDraggableNodes: !0, isCartesian: !1, noSharedTooltip: !0, onMouseDown: z.onMouseDown, onMouseMove: z.onMouseMove, pointArrayMap: ["value"], pointClass: d, pointValKey: "value", redrawHalo: z.redrawHalo, requireSorting: !1, searchPoint: c.noop, trackerGroups: ["group", "dataLabelsGroup", "parentNodesGroup"] });
        l.registerSeriesType("packedbubble", e);
        ("");
        ("");
        return e;
    });
    y(e, "Extensions/Polar.js", [e["Core/Animation/AnimationUtilities.js"], e["Core/Chart/Chart.js"], e["Core/Globals.js"], e["Extensions/Pane.js"], e["Core/Pointer.js"], e["Core/Series/Series.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Renderer/SVG/SVGRenderer.js"], e["Core/Utilities.js"]], function (e, c, d, l, a, n, f, r, q) {
        var w = e.animObject;
        f = f.seriesTypes;
        var b = q.addEvent,
            h = q.defined,
            p = q.find,
            v = q.isNumber,
            y = q.pick,
            B = q.splat,
            I = q.uniqueKey;
        e = q.wrap;
        var F = n.prototype;
        a = a.prototype;
        F.searchPointByAngle = function (a) {
            var b = this.chart,
                c = this.xAxis.pane.center;
            return this.searchKDTree({ clientX: 180 + (-180 / Math.PI) * Math.atan2(a.chartX - c[0] - b.plotLeft, a.chartY - c[1] - b.plotTop) });
        };
        F.getConnectors = function (a, b, c, d) {
            var e = d ? 1 : 0;
            var g = 0 <= b && b <= a.length - 1 ? b : 0 > b ? a.length - 1 + b : 0;
            b = 0 > g - 1 ? a.length - (1 + e) : g - 1;
            e = g + 1 > a.length - 1 ? e : g + 1;
            var f = a[b];
            e = a[e];
            var k = f.plotX;
            f = f.plotY;
            var h = e.plotX;
            var m = e.plotY;
            e = a[g].plotX;
            g = a[g].plotY;
            k = (1.5 * e + k) / 2.5;
            f = (1.5 * g + f) / 2.5;
            h = (1.5 * e + h) / 2.5;
            var l = (1.5 * g + m) / 2.5;
            m = Math.sqrt(Math.pow(k - e, 2) + Math.pow(f - g, 2));
            var u = Math.sqrt(Math.pow(h - e, 2) + Math.pow(l - g, 2));
            k = Math.atan2(f - g, k - e);
            l = Math.PI / 2 + (k + Math.atan2(l - g, h - e)) / 2;
            Math.abs(k - l) > Math.PI / 2 && (l -= Math.PI);
            k = e + Math.cos(l) * m;
            f = g + Math.sin(l) * m;
            h = e + Math.cos(Math.PI + l) * u;
            l = g + Math.sin(Math.PI + l) * u;
            e = { rightContX: h, rightContY: l, leftContX: k, leftContY: f, plotX: e, plotY: g };
            c && (e.prevPointCont = this.getConnectors(a, b, !1, d));
            return e;
        };
        F.toXY = function (a) {
            var b = this.chart,
                c = this.xAxis,
                d = this.yAxis,
                e = a.plotX,
                f = a.plotY,
                k = a.series,
                h = b.inverted,
                l = a.y,
                n = h ? e : d.len - f;
            h && k && !k.isRadialBar && (a.plotY = f = "number" === typeof l ? d.translate(l) || 0 : 0);
            a.rectPlotX = e;
            a.rectPlotY = f;
            d.center && (n += d.center[3] / 2);
            v(f) && ((d = h ? d.postTranslate(f, n) : c.postTranslate(e, n)), (a.plotX = a.polarPlotX = d.x - b.plotLeft), (a.plotY = a.polarPlotY = d.y - b.plotTop));
            this.kdByAngle ? ((b = ((e / Math.PI) * 180 + c.pane.options.startAngle) % 360), 0 > b && (b += 360), (a.clientX = b)) : (a.clientX = a.plotX);
        };
        f.spline &&
            (e(f.spline.prototype, "getPointSpline", function (a, b, c, d) {
                this.chart.polar ? (d ? ((a = this.getConnectors(b, d, !0, this.connectEnds)), (b = a.prevPointCont && a.prevPointCont.rightContX), (c = a.prevPointCont && a.prevPointCont.rightContY), (a = ["C", v(b) ? b : a.plotX, v(c) ? c : a.plotY, v(a.leftContX) ? a.leftContX : a.plotX, v(a.leftContY) ? a.leftContY : a.plotY, a.plotX, a.plotY])) : (a = ["M", c.plotX, c.plotY])) : (a = a.call(this, b, c, d));
                return a;
            }),
            f.areasplinerange && (f.areasplinerange.prototype.getPointSpline = f.spline.prototype.getPointSpline));
        b(
            n,
            "afterTranslate",
            function () {
                var a = this.chart;
                if (a.polar && this.xAxis) {
                    (this.kdByAngle = a.tooltip && a.tooltip.shared) ? (this.searchPoint = this.searchPointByAngle) : (this.options.findNearestPointBy = "xy");
                    if (!this.preventPostTranslate) for (var c = this.points, e = c.length; e--; ) this.toXY(c[e]), !a.hasParallelCoordinates && !this.yAxis.reversed && c[e].y < this.yAxis.min && (c[e].isNull = !0);
                    this.hasClipCircleSetter ||
                        (this.hasClipCircleSetter = !!this.eventsToUnbind.push(
                            b(this, "afterRender", function () {
                                if (a.polar) {
                                    var b = this.yAxis.pane.center;
                                    this.clipCircle ? this.clipCircle.animate({ x: b[0], y: b[1], r: b[2] / 2, innerR: b[3] / 2 }) : (this.clipCircle = a.renderer.clipCircle(b[0], b[1], b[2] / 2, b[3] / 2));
                                    this.group.clip(this.clipCircle);
                                    this.setClip = d.noop;
                                }
                            })
                        ));
                }
            },
            { order: 2 }
        );
        e(f.line.prototype, "getGraphPath", function (a, b) {
            var c = this,
                d;
            if (this.chart.polar) {
                b = b || this.points;
                for (d = 0; d < b.length; d++)
                    if (!b[d].isNull) {
                        var e = d;
                        break;
                    }
                if (!1 !== this.options.connectEnds && "undefined" !== typeof e) {
                    this.connectEnds = !0;
                    b.splice(b.length, 0, b[e]);
                    var g = !0;
                }
                b.forEach(function (a) {
                    "undefined" === typeof a.polarPlotY && c.toXY(a);
                });
            }
            d = a.apply(this, [].slice.call(arguments, 1));
            g && b.pop();
            return d;
        });
        var z = function (a, b) {
            var c = this,
                e = this.chart,
                g = this.options.animation,
                f = this.group,
                k = this.markerGroup,
                h = this.xAxis.center,
                l = e.plotLeft,
                n = e.plotTop,
                p,
                q,
                r,
                t;
            if (e.polar)
                if (c.isRadialBar) b || ((c.startAngleRad = y(c.translatedThreshold, c.xAxis.startAngleRad)), d.seriesTypes.pie.prototype.animate.call(c, b));
                else {
                    if (e.renderer.isSVG)
                        if (((g = w(g)), c.is("column"))) {
                            if (!b) {
                                var v = h[3] / 2;
                                c.points.forEach(function (a) {
                                    p = a.graphic;
                                    r = (q = a.shapeArgs) && q.r;
                                    t = q && q.innerR;
                                    p && q && (p.attr({ r: v, innerR: v }), p.animate({ r: r, innerR: t }, c.options.animation));
                                });
                            }
                        } else b ? ((a = { translateX: h[0] + l, translateY: h[1] + n, scaleX: 0.001, scaleY: 0.001 }), f.attr(a), k && k.attr(a)) : ((a = { translateX: l, translateY: n, scaleX: 1, scaleY: 1 }), f.animate(a, g), k && k.animate(a, g));
                }
            else a.call(this, b);
        };
        e(F, "animate", z);
        if (f.column) {
            var t = f.arearange.prototype;
            f = f.column.prototype;
            f.polarArc = function (a, b, c, d) {
                var e = this.xAxis.center,
                    f = this.yAxis.len,
                    g = e[3] / 2;
                b = f - b + g;
                a = f - y(a, f) + g;
                this.yAxis.reversed && (0 > b && (b = g), 0 > a && (a = g));
                return { x: e[0], y: e[1], r: b, innerR: a, start: c, end: d };
            };
            e(f, "animate", z);
            e(f, "translate", function (a) {
                var b = this.options,
                    c = b.stacking,
                    d = this.chart,
                    e = this.xAxis,
                    f = this.yAxis,
                    k = f.reversed,
                    l = f.center,
                    n = e.startAngleRad,
                    p = e.endAngleRad - n;
                this.preventPostTranslate = !0;
                a.call(this);
                if (e.isRadial) {
                    a = this.points;
                    e = a.length;
                    var r = f.translate(f.min);
                    var t = f.translate(f.max);
                    b = b.threshold || 0;
                    if (d.inverted && v(b)) {
                        var w = f.translate(b);
                        h(w) && (0 > w ? (w = 0) : w > p && (w = p), (this.translatedThreshold = w + n));
                    }
                    for (; e--; ) {
                        b = a[e];
                        var y = b.barX;
                        var z = b.x;
                        var C = b.y;
                        b.shapeType = "arc";
                        if (d.inverted) {
                            b.plotY = f.translate(C);
                            if (c && f.stacking) {
                                if (((C = f.stacking.stacks[(0 > C ? "-" : "") + this.stackKey]), this.visible && C && C[z] && !b.isNull)) {
                                    var B = C[z].points[this.getStackIndicator(void 0, z, this.index).key];
                                    var E = f.translate(B[0]);
                                    B = f.translate(B[1]);
                                    h(E) && (E = q.clamp(E, 0, p));
                                }
                            } else (E = w), (B = b.plotY);
                            E > B && (B = [E, (E = B)][0]);
                            if (!k)
                                if (E < r) E = r;
                                else if (B > t) B = t;
                                else {
                                    if (B < r || E > t) E = B = 0;
                                }
                            else if (B > r) B = r;
                            else if (E < t) E = t;
                            else if (E > r || B < t) E = B = p;
                            f.min > f.max && (E = B = k ? p : 0);
                            E += n;
                            B += n;
                            l && (b.barX = y += l[3] / 2);
                            z = Math.max(y, 0);
                            C = Math.max(y + b.pointWidth, 0);
                            b.shapeArgs = { x: l && l[0], y: l && l[1], r: C, innerR: z, start: E, end: B };
                            b.opacity = E === B ? 0 : void 0;
                            b.plotY = (h(this.translatedThreshold) && (E < this.translatedThreshold ? E : B)) - n;
                        } else (E = y + n), (b.shapeArgs = this.polarArc(b.yBottom, b.plotY, E, E + b.pointWidth));
                        this.toXY(b);
                        d.inverted ? ((y = f.postTranslate(b.rectPlotY, y + b.pointWidth / 2)), (b.tooltipPos = [y.x - d.plotLeft, y.y - d.plotTop])) : (b.tooltipPos = [b.plotX, b.plotY]);
                        l && (b.ttBelow = b.plotY > l[1]);
                    }
                }
            });
            f.findAlignments = function (a, b) {
                null === b.align && (b.align = 20 < a && 160 > a ? "left" : 200 < a && 340 > a ? "right" : "center");
                null === b.verticalAlign && (b.verticalAlign = 45 > a || 315 < a ? "bottom" : 135 < a && 225 > a ? "top" : "middle");
                return b;
            };
            t && (t.findAlignments = f.findAlignments);
            e(f, "alignDataLabel", function (a, b, c, d, e, f) {
                var g = this.chart,
                    h = y(d.inside, !!this.options.stacking);
                g.polar
                    ? ((a = (b.rectPlotX / Math.PI) * 180),
                      g.inverted
                          ? ((this.forceDL = g.isInsidePlot(b.plotX, Math.round(b.plotY))), h && b.shapeArgs ? ((e = b.shapeArgs), (e = this.yAxis.postTranslate(((e.start || 0) + (e.end || 0)) / 2 - this.xAxis.startAngleRad, b.barX + b.pointWidth / 2)), (e = { x: e.x - g.plotLeft, y: e.y - g.plotTop })) : b.tooltipPos && (e = { x: b.tooltipPos[0], y: b.tooltipPos[1] }), (d.align = y(d.align, "center")), (d.verticalAlign = y(d.verticalAlign, "middle")))
                          : this.findAlignments && (d = this.findAlignments(a, d)),
                      F.alignDataLabel.call(this, b, c, d, e, f),
                      this.isRadialBar && b.shapeArgs && b.shapeArgs.start === b.shapeArgs.end && c.hide(!0))
                    : a.call(this, b, c, d, e, f);
            });
        }
        e(a, "getCoordinates", function (a, b) {
            var c = this.chart,
                d = { xAxis: [], yAxis: [] };
            c.polar
                ? c.axes.forEach(function (a) {
                      var e = a.isXAxis,
                          f = a.center;
                      if ("colorAxis" !== a.coll) {
                          var g = b.chartX - f[0] - c.plotLeft;
                          f = b.chartY - f[1] - c.plotTop;
                          d[e ? "xAxis" : "yAxis"].push({ axis: a, value: a.translate(e ? Math.PI - Math.atan2(g, f) : Math.sqrt(Math.pow(g, 2) + Math.pow(f, 2)), !0) });
                      }
                  })
                : (d = a.call(this, b));
            return d;
        });
        r.prototype.clipCircle = function (a, b, c, d) {
            var e = I(),
                f = this.createElement("clipPath").attr({ id: e }).add(this.defs);
            a = d ? this.arc(a, b, c, d, 0, 2 * Math.PI).add(f) : this.circle(a, b, c).add(f);
            a.id = e;
            a.clipPath = f;
            return a;
        };
        b(c, "getAxes", function () {
            this.pane || (this.pane = []);
            B(this.options.pane).forEach(function (a) {
                new l(a, this);
            }, this);
        });
        b(c, "afterDrawChartBox", function () {
            this.pane.forEach(function (a) {
                a.render();
            });
        });
        b(n, "afterInit", function () {
            var a = this.chart;
            a.inverted && a.polar && ((this.isRadialSeries = !0), this.is("column") && (this.isRadialBar = !0));
        });
        e(c.prototype, "get", function (a, b) {
            return (
                p(this.pane || [], function (a) {
                    return a.options.id === b;
                }) || a.call(this, b)
            );
        });
    });
    y(e, "masters/highcharts-more.src.js", [], function () {});
});
//# sourceMappingURL=highcharts-more.js.map
