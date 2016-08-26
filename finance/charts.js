function Quandl(code) {
    this.code = code;
    this.name = code.replace("/", " / ");
    this.id = code.replace("/", "_");
}


Quandl.prototype = {
    constructor: Quandl,

    setResult: function (data) {
        var parseDate = d3.time.format("%Y-%m-%d").parse;
        this.formatedResult = data.dataset.data.map(function (d) {
            return {
                date: parseDate(d[0]),
                open: +d[1],
                high: +d[2],
                low: +d[3],
                close: +d[4],
                volume: +d[5]
            };
        }).reverse();
    }
};


function createGraph(data, divId) {

    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var svg = d3.select("#" + divId).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = techan.scale.financetime()
        .range([0, width])
        .outerPadding(0);

    var y = d3.scale.linear()
        .range([height, 0]);

    var close = techan.plot.close()
        .xScale(x)
        .yScale(y);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var accessor = close.accessor();

    x.domain(data.map(accessor.d));
    y.domain(techan.scale.plot.ohlc(data, accessor).domain());

    svg.append("g")
        .datum(data)
        .attr("class", "close")
        .call(close);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Price ($)");
}