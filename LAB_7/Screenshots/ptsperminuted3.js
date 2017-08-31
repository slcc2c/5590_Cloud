			//Width and height
			var w = 3500;
			var h = 1750;
            var barPadding = 0;
			
	

			d3.csv("lbj.csv", function(data) {
                var dataset = data;			

                var filterInactive = function(pts){
                    if(pts != "Inactive" && pts != "Did Not Play"){
                        return pts;
                    }
                    else{
                        return 0;
                    }

                }

                var xScale = d3.scale.ordinal()
							.domain(d3.range(data.length))
							.rangeRoundBands([0, w], 0.05);
                
			    var yScale = d3.scale.linear()
							.domain([0, d3.max(data, function(d){
                                        return filterInactive(d.PTS)/filterInactive(d.MP.substr(0,2));
                                    })])
						    .range([0, h]);
                


                var colorScale = d3.scale.linear()
                                    .domain([0, d3.max(data, function(d){
                                        return filterInactive(d.AST);
                                    })])
                                    .range([0,255]);
                var opacityScale = d3.scale.linear()
                                    .domain([0, d3.max(data, function(d){
                                        return filterInactive(d.PTS)/filterInactive(d.MP.substr(0,2));
                                    })])
                                    .range([0.0,1.0]);
                
                //Create SVG element
                var svg = d3.select("body")
                            .append("svg")
                            .attr("width", w)
                            .attr("height", h);
                
                svg.selectAll("rect")
			   .data(data)
			   .enter()
			   .append("rect")
			   .attr("x", function(d, i) {
			   		return xScale(i);
			   })
			   .attr("y", function(d){ return h-yScale(filterInactive(d.PTS)/filterInactive(d.MP.substr(0,2)))})
			   .attr("width", xScale.rangeBand())
			   .attr("height", function(d) { return yScale(filterInactive(d.PTS)/filterInactive(d.MP.substr(0,2))) })
			   .attr("fill", function(d) {
					return "rgb(0, 0, " + parseInt(colorScale(filterInactive(d.AST))) + ")";
			   })
               .attr("fill-opacity", function(d){
                   return opacityScale(filterInactive(d.PTS)/filterInactive(d.MP.substr(0,2)));
               })
			   .on("mouseover", function(d) {

					//Get this bar's x/y values, then augment for the tooltip
					var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.rangeBand() / 2;
					var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + h / 2;
                    
					//Update the tooltip position and value
					d3.select("#tooltip")
						.style("left", xPosition + "px")
						.style("top", yPosition + "px");		
                    d3.select("#pts").text(d.PTS);
			        d3.select("#ast").text(d.AST);
                    d3.select("#reb").text(d.TRB);
			        d3.select("#game").text(d.Rk);
                    d3.select("#min").text(d.MP.substr(0,2));
					//Show the tooltip
					d3.select("#tooltip").classed("hidden", false);
                    if(d.Rk>82){
                        console.log(d.G);
                        d3.select("#playoffs").style("opacity", 1.0);
                        d3.select("#pgamenum").text(d.G);
                    }
                    else{
                        
                        d3.select("#playoffs").style("opacity", 0.0);;
                    }

			   })
			   .on("mouseout", function() {
			   
					//Hide the tooltip
					d3.select("#tooltip").classed("hidden", true);
					
			   });

               svg.selectAll("text.gamenum")
               .data(data)
               .enter()
               .append("text")
               .text(function(d,i){return i+1})
               .attr("text-anchor", "middle")
               .attr("x", function(d, i) {
                   if (i<=data.length-2){
			   		return (xScale(i)+xScale(i+1))/2;
                   }
                   else{
                       return xScale(i)+((xScale(i)-xScale(i-1))/2);
                   }
			   })
               .attr("y", h-5)
               .attr("font-family", "sans-serif")
			   .attr("font-size", "8px")
			   .attr("fill", "black");

               svg.selectAll("text.pts")
               .data(data)
               .enter()
               .append("text")
               .text(function(d,i){return (filterInactive(d.PTS)/filterInactive(d.MP.substr(0,2))).toString().substr(0,5)})
               .attr("text-anchor", "middle")
               .attr("x", function(d, i) {
                   if (i<=data.length-2){
			   		return (xScale(i)+xScale(i+1))/2;
                   }
                   else{
                       return xScale(i)+((xScale(i)-xScale(i-1))/2);
                   }
			   })
               .attr("y", function(d){ return h-yScale(filterInactive(d.PTS)/filterInactive(d.MP.substr(0,2)))+8})
               .attr("font-family", "sans-serif")
			   .attr("font-size", "8px")
			   .attr("fill", "white");

            //Define sort order flag
			var sortOrder = false;
			
			//Define sort function
			

			});




			



			

			
