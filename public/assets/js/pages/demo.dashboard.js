!function (r) {
    "use strict";
    var t = function () {
        this.$body = r("body"), this.charts = []
    };
    t.prototype.respChart = function (t, a, e, o) {
        var n = Chart.controllers.line.prototype.draw;
        Chart.controllers.line.prototype.draw = function () {
            n.apply(this, arguments);
            var r = this.chart.chart.ctx, t = r.stroke;
            r.stroke = function () {
                r.save(), r.shadowColor = "rgba(0,0,0,0.01)", r.shadowBlur = 20, r.shadowOffsetX = 0, r.shadowOffsetY = 5, t.apply(this, arguments), r.restore()
            }
        };
        var s = Chart.controllers.doughnut.prototype.draw;
        Chart.controllers.doughnut = Chart.controllers.doughnut.extend({
            draw: function () {
                s.apply(this, arguments);
                var r = this.chart.chart.ctx, t = r.fill;
                r.fill = function () {
                    r.save(), r.shadowColor = "rgba(0,0,0,0.03)", r.shadowBlur = 4, r.shadowOffsetX = 0, r.shadowOffsetY = 3, t.apply(this, arguments), r.restore()
                }
            }
        });
        var l = Chart.controllers.bar.prototype.draw;
        Chart.controllers.bar = Chart.controllers.bar.extend({
            draw: function () {
                l.apply(this, arguments);
                var r = this.chart.chart.ctx, t = r.fill;
                r.fill = function () {
                    r.save(), r.shadowColor = "rgba(0,0,0,0.01)", r.shadowBlur = 20, r.shadowOffsetX = 4, r.shadowOffsetY = 5, t.apply(this, arguments), r.restore()
                }
            }
        }), Chart.defaults.global.defaultFontColor = "#8391a2", Chart.defaults.scale.gridLines.color = "#8391a2";
        var i = t.get(0).getContext("2d"), d = r(t).parent();
        return function () {
            var n;
            switch (t.attr("width", r(d).width()), a) {
                case"Line":
                    n = new Chart(i, {type: "line", data: e, options: o});
                    break;
                case"Doughnut":
                    n = new Chart(i, {type: "doughnut", data: e, options: o});
                    break;
                case"Pie":
                    n = new Chart(i, {type: "pie", data: e, options: o});
                    break;
                case"Bar":
                    n = new Chart(i, {type: "bar", data: e, options: o});
                    break;
                case"Radar":
                    n = new Chart(i, {type: "radar", data: e, options: o});
                    break;
                case"PolarArea":
                    n = new Chart(i, {data: e, type: "polarArea", options: o})
            }
            return n
        }()
    }, t.prototype.initCharts = function () {
        var t = [];
        if (r("#revenue-chart").length > 0) {
            t.push(this.respChart(r("#revenue-chart"), "Line", {
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                datasets: [{
                    label: "Current Week",
                    backgroundColor: "transparent",
                    borderColor: "#727cf5",
                    data: [32, 42, 42, 62, 52, 75, 62]
                }, {
                    label: "Previous Week",
                    fill: !0,
                    backgroundColor: "transparent",
                    borderColor: "#0acf97",
                    data: [42, 58, 66, 93, 82, 105, 92]
                }]
            }, {
                maintainAspectRatio: !1,
                legend: {display: !1},
                tooltips: {
                    backgroundColor: "#727cf5",
                    titleFontColor: "#fff",
                    bodyFontColor: "#fff",
                    bodyFontSize: 14,
                    displayColors: !1
                },
                hover: {intersect: !0},
                plugins: {filler: {propagate: !1}},
                scales: {
                    xAxes: [{reverse: !0, gridLines: {color: "rgba(0,0,0,0.05)"}}],
                    yAxes: [{
                        ticks: {stepSize: 20},
                        display: !0,
                        borderDash: [5, 5],
                        gridLines: {color: "rgba(0,0,0,0.01)", fontColor: "#fff"}
                    }]
                }
            }))
        }
        if (r("#high-performing-product").length > 0) {
            var a = document.getElementById("high-performing-product").getContext("2d").createLinearGradient(0, 500, 0, 150);
            a.addColorStop(0, "#fa5c7c"), a.addColorStop(1, "#727cf5");
            var e = {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                datasets: [{
                    label: "Sales Analytics",
                    backgroundColor: a,
                    borderColor: a,
                    hoverBackgroundColor: a,
                    hoverBorderColor: a,
                    data: [65, 59, 80, 81, 56, 89, 40, 32, 65, 59, 80, 81]
                }, {
                    label: "Dollar Rate",
                    backgroundColor: "#e3eaef",
                    borderColor: "#e3eaef",
                    hoverBackgroundColor: "#e3eaef",
                    hoverBorderColor: "#e3eaef",
                    data: [89, 40, 32, 65, 59, 80, 81, 56, 89, 40, 65, 59]
                }]
            };
            t.push(this.respChart(r("#high-performing-product"), "Bar", e, {
                maintainAspectRatio: !1,
                legend: {display: !1},
                tooltips: {
                    backgroundColor: "#727cf5",
                    titleFontColor: "#fff",
                    bodyFontColor: "#fff",
                    bodyFontSize: 14,
                    displayColors: !1
                },
                scales: {
                    yAxes: [{
                        gridLines: {display: !1, color: "rgba(0,0,0,0.05)"},
                        stacked: !1,
                        ticks: {stepSize: 20}
                    }],
                    xAxes: [{
                        barPercentage: .7,
                        categoryPercentage: .5,
                        stacked: !1,
                        gridLines: {color: "rgba(0,0,0,0.01)"}
                    }]
                }
            }))
        }
        if (r("#average-sales").length > 0) {
            t.push(this.respChart(r("#average-sales"), "Doughnut", {
                labels: ["在校学生", "离校学生", "请假人数", "未到校人数"],
                datasets: [{
                    data: [300, 135, 48, 154],
                    backgroundColor: ["#727cf5", "#fa5c7c", "#0acf97", "#ebeff2"],
                    borderColor: "transparent",
                    borderWidth: "3"
                }]
            }, {maintainAspectRatio: !1, cutoutPercentage: 60, legend: {display: !1}}))
        }
        return t
    }, t.prototype.initMaps = function () {
        r("#world-map-markers").length > 0 && r("#world-map-markers").vectorMap({
            map: "world_mill_en",
            normalizeFunction: "polynomial",
            hoverOpacity: .7,
            hoverColor: !1,
            regionStyle: {initial: {fill: "#e3eaef"}},
            markerStyle: {
                initial: {
                    r: 9,
                    fill: "#f53900",
                    "fill-opacity": .9,
                    stroke: "#fff",
                    "stroke-width": 7,
                    "stroke-opacity": .4
                }, hover: {stroke: "#fff", "fill-opacity": 1, "stroke-width": 1.5}
            },
            backgroundColor: "transparent",
            markers: [
                {latLng: [1.3,103.8], name: "新加坡"},
                { latLng: [33.905421,104.802159], name: "重庆" },
                {latLng: [38.723213,106.251351], name: "银川"},
                {latLng: [39.828768,116.424691], name: "北京"}],
            zoomOnScroll: !1
        })
    }, t.prototype.init = function () {
        var t = this;
        Chart.defaults.global.defaultFontFamily = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif', r("#dash-daterange").daterangepicker({singleDatePicker: !0}), t.charts = this.initCharts(), this.initMaps(), r(window).on("resize", function (a) {
            r.each(t.charts, function (r, t) {
                try {
                    t.destroy()
                } catch (r) {
                }
            }), t.charts = t.initCharts()
        })
    }, r.Dashboard = new t, r.Dashboard.Constructor = t
}(window.jQuery), function (r) {
    "use strict";
    r.Dashboard.init()
}(window.jQuery);