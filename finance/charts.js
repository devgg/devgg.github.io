function Quandl(code) {
    this.code = code;
    this.id = code.replace("/", "_");
}


Quandl.prototype = {
    constructor: Quandl,

    setResult: function (data) {
        this.name = data.dataset.name + " - " + this.code.replace("/", " / ");
        var parseDate = d3.timeParse("%Y-%m-%d");
        this.formatedResult = data.dataset.data.map(function (d) {
            return {
                date: parseDate(d[0]),
                close: +d[4]
            };
        }).reverse();
    }
};


function createGraph(data, divId) {

    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 600 - margin.left - margin.right,
        height = 350 - margin.top - margin.bottom;

    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    var line = d3.line()
        .x(function (d) {
            return x(d.date);
        })
        .y(function (d) {
            return y(d.close);
        });

    var svg = d3.select("#" + divId).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(d3.extent(data, function (d) {
        return d.date;
    }));
    y.domain(d3.extent(data, function (d) {
        return d.close;
    }));


    svg.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSizeInner(-height));

    svg.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).tickSizeInner(-width))
        .append("text")
        .attr("class", "axis-title")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end");

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line);
}