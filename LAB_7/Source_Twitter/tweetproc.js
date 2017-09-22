function bubbleChart() {
    var width = 1000,
        height = 1000,
        maxRadius = 6,
        indexForColors = "source",
        indexForRadius = "views";

    function chart(selection) {
        var data = selection.enter().data();
        var div = selection,
            svg = div.selectAll('svg');
        svg.attr('width', width).attr('height', height);

        var tooltip = selection
            .append("div")
            .style("position", "absolute")
            .style("visibility", "hidden")
            .style("color", "white")
            .style("padding", "8px")
            .style("background-color", "#626D71")
            .style("border-radius", "6px")
            .style("text-align", "center")
            .style("font-family", "monospace")
            .style("width", "400px")
            .text("");


        var simulation = d3.forceSimulation(data)
            .force("charge", d3.forceManyBody().strength([-50]))
            .force("x", d3.forceX())
            .force("y", d3.forceY())
            .on("tick", ticked);

        function ticked(e) {
            node.attr("cx", function(d) {
                return d.x;
            })
                .attr("cy", function(d) {
                    return d.y;
                });
        }

        var colorCircles = d3.scaleOrdinal(d3.schemeCategory10);
        var scaleRadius = d3.scaleLinear().domain([d3.min(data, function(d) {
            return +d[indexForRadius];
        }), d3.max(data, function(d) {
            return +d['user']['followers_count'];
        })]).range([5, 18]);

        var node = svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr('r', function(d) {
                return scaleRadius(d['user']['followers_count'])
            })
            .style("fill", function(d) {
                return colorCircles(d[indexForColors])
            })
            .attr('transform', 'translate(' + [width / 2, height / 2] + ')')
            .on("mouseover", function(d) {
                tooltip.html(d[indexForColors] + "<br>" + d.title + "<br>" + d['user']['followers_count'] + " hearts");
                return tooltip.style("visibility", "visible");
            })
            .on("mousemove", function() {
                return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
            })
            .on("mouseout", function() {
                return tooltip.style("visibility", "hidden");
            });
    }

    chart.width = function(value) {
        if (!arguments.length) {
            return width;
        }
        width = value;
        return chart;
    };

    chart.height = function(value) {
        if (!arguments.length) {
            return height;
        }
        height = value;
        return chart;
    };


    chart.indexForColors = function(value) {
        if (!arguments.indexForColors) {
            return indexForColors;
        }
        indexForColors = value;
        return chart;
    };

    chart.indexForRadius = function(value) {
        if (!arguments.indexForRadius) {
            return indexForRadius;
        }
        indexForRadius = value;
        return chart;
    };

    return chart;
}
