
app.controller('IndexController', ['$scope', '$routeParams', '$location',
    function($scope, $routeParams, $location) {
        $location.path("/index");
        function testD3Function () {
            var margin = {top:20, right:20, bottom:30, left:50},
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;
            var container = d3.select("div.test-div")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom);
            var svg = container.append("g")
                .attr("class", "content")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            var data = Array.apply(0, Array(31)).map(function(item, i){
                i++;
                return {date: (i<10 ? '0'+i : i), pv: parseInt(Math.random()*100)}
            });
            console.log(data);
            var x = d3.scale.linear()
                .domain([0, d3.max(data, function(d) { return d.date;})])
                .range([0, width]);
            var y = d3.scale.linear()
                .domain([0, d3.max(data, function (d) { return d.pv;})])
                .range([height, 0]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient('bottom')
                .ticks(30);
            var yAxis = d3.svg.axis()
                .scale(y)
                .orient('left')
                .ticks(10);
            svg.append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(0,' + height + ')')
                .call(xAxis)
                .append('text')
                .text('riqi')
                .attr('transform', 'translate(' + width + ', 0)');
            svg.append('g')
                .attr('class', 'y axis')
                .call(yAxis)
                .append('text')
                .text('ci/tian');
            var line = d3.svg.line()
                .x(function(d){return x(d.date)})
                .y(function(d){return y(d.pv)})
                .interpolate('monotone');
            var path = svg.append('path')
                .attr('class', 'line')
                .attr('d', line(data));
            var g = svg.selectAll('circle')
              .data(data)
              .enter()
              .append('g')
              .append('circle')
              .attr('class', 'linecircle')
              .attr('cx', line.x())
              .attr('cy', line.y())
              .attr('r', 3.5)
              .on('mouseover', function() {
                d3.select(this).transition().duration(5).attr('r', 15);
              })
              .on('mouseout', function() {
                d3.select(this).transition().duration(50).attr('r', 3.5);
              });
            var tips = svg.append('g').attr('class', 'tips');
            tips.append('rect')
                .attr('class', 'tips-border')
                .attr('width', 200)
                .attr('height', 50)
                .attr('rx', 10)
                .attr('ry', 10);


            var wording1 = tips.append('text')
                .attr('class', 'tips-text')
                .attr('x', 10)
                .attr('y', 20)
                .text('');

            var wording2 = tips.append('text')
              .attr('class', 'tips-text')
              .attr('x', 10)
              .attr('y', 40)
              .text('');
            d3.select('.tips').style('display', 'none');
            container.on("mouseover", function(){
                var m = d3.mouse(this),
                    cx = m[0] - margin.left;
                var x0 = x.invert(cx);
                console.log(m);
                console.log(cx);
                console.log(x0);
                var i = (d3.bisector(function(d) {
                    return d.date;
                }).left)(data, x0, 1);
             
                var d0 = data[i - 1],
                  d1 = data[i] || {},
                  d = x0 - d0.date > d1.date - x0 ? d1 : d0;
             
                function formatWording(d) {
                  return '日期：' + d.date;
                }
                wording1.text(formatWording(d));
                wording2.text('PV：' + d.pv);
             
                var x1 = x(d.date),
                  y1 = y(d.pv);
             
                // 处理超出边界的情况
                var dx = x1 > width ? x1 - width + 200 : x1 + 200 > width ? 200 : 0;
             
                var dy = y1 > height ? y1 - height + 50 : y1 + 50 > height ? 50 : 0;
             
                x1 -= dx;
                y1 -= dy;
             
                d3.select('.tips')
                  .attr('transform', 'translate(' + x1 + ',' + y1 + ')');
             
                d3.select('.tips').style('display', 'block');
            })
            .on('mouseout', function(){
                d3.select('.tips').style('display', 'none');
            })

        }
        // testD3Function();
        function testD3Function2 () {
            var data = [10, 15, 30, 50, 80, 65, 55, 30, 20, 10, 8];
            
            function render (data) {
                d3.select("div.test-div")
                    .selectAll("div.h-bar")
                    .data(data)
                    .enter()
                    .append("div")
                        .attr("class", "h-bar")
                        .append("span");
                d3.select("div.test-div")
                    .selectAll("div.h-bar")
                    .data(data)
                    .style("width", function (d) {
                        return (d*3) + "px";
                    })
                    .style("background-color", "rgb(124,205,124)")
                    .select("span")
                        .text(function (d) {
                            return d;
                        });
                d3.select("div.test-div")
                    .selectAll("div.h-bar")
                    .data(data)
                    .exit()
                        .remove();
            }
            setInterval (function () {
                data.shift();
                data.push(Math.round(Math.random()*100));
                render(data);
            }, 1000);
            render(data);
        }
        // testD3Function2();
        function testD3Function3 () {
            var data = [
                {width: 10, color: 23},
                {width: 15, color: 33},
                {width: 20, color: 43},
                {width: 30, color: 53},
                {width: 25, color: 63},
                {width: 10, color: 73},
                {width: 2, color: 83}
            ];
            var colorScale = d3.scale.linear()
                .domain([0, 100])
                .range(["#add8e6", "red"]);
            function render (data) {
                d3.select("div.test-div")
                    .selectAll("div.h-bar")
                    .data(data)
                    .enter()
                    .append("div")
                        .attr("class", "h-bar")
                        .append("span");
                d3.select("div.test-div")
                    .selectAll("div.h-bar")
                    .data(data)
                    .style("width", function (d) {
                        return (d.width*5) + "px";
                    })
                    .style("background-color", function (d) {
                        return colorScale(d.color);
                    })
                    .select("span")
                        .text(function (d) {
                            return d.width;
                        });
                d3.select("div.test-div")
                    .selectAll("div.h-bar")
                    .data(data)
                    .exit()
                        .remove();
            }
            function randomValue () {
                return Math.round(Math.random()*100);
            }
            setInterval(function () {
                data.shift();
                data.push({width: Math.round(Math.random()*100), color: Math.round(Math.random()*100)});
                render(data);
            }, 1000);
            render(data);
        }
        // testD3Function3();
        function testD3Function4 () {
            var data = [];
            var next = function (x) {
                return 15+x*x;
            }
            console.log(next);
            var newData = function () {
                data.push(next);
                return data;
            }

            // console.log(newData());
            function render () {
                var selection = d3.select("div.test-div2")
                    .selectAll("div")
                    .data(newData);
                selection.enter()
                    .append("div")
                    .append("span");
                selection.exit()
                    .remove();
                selection.attr("class", "v-bar")
                    .style("height", function (d, i) {
                        return d(i)+"px";
                    })
                    .style("width", "20px")
                    .style("display","inline-block")
                    .style("background-color","red")
                    .select("span")
                        .text(function (d, i) {
                            return d(i);
                        });

            }
            setInterval(function () {
                // render();
            }, 1500);
            render();
        }
        // testD3Function4();
        function testD3Function5 () {
            var array = [3,2,11,7,6,4,10,8,15];
            var selection = d3.select("div.test-div2")
            selection.append("div")
                .attr("id", "min")
                .text(d3.extent(array));
            selection.append("div")
                .attr("id", "asc")
                .text(array.sort(d3.ascending));
            selection.append("div")
                .attr("id", "quantile")
                .text(d3.quantile(array.sort(d3.ascending), 0.2));
            var records = [
                {qu: 2, to: 190, tip: 100, type: "tab"},
                {qu: 2, to: 190, tip: 100, type: "tab"},
                {qu: 2, to: 90, tip: 0, type: "tab"},
                {qu: 1, to: 300, tip: 200, type: "visa"},
                {qu: 2, to: 90, tip: 0, type: "tab"}
            ];
            var nest = d3.nest()
                .key(function (d) {
                    return d.type;
                });
            selection.append("div")
                .attr("id", "nest")
                .html(printNest(nest, ""));

        }
        // testD3Function5();
        function testD3Function6 () {
            var data = [
                {ex: 10, ca: "re"},
                {ex: 45, ca: "re"},
                {ex: 25, ca: "re"},
                {ex: 35, ca: "ga"},
                {ex: 5, ca: "re"},
                {ex: 19, ca: "ga"},
                {ex: 65, ca: "re"}
            ];
            function render (data, ca, cp) {
                var selection = d3.select("div.test-div2")
                    .selectAll("div.h-bar")
                    .data(data);
                selection.enter()
                    .append("div")
                        .attr("class", "h-bar")
                    .append("span");
                selection.exit()
                    .remove();
                selection.style("width", function (d) {
                    return (d.ex*5)+"px";
                })
                .style("background-color", "red")
                .select("span")
                    .text(function (d) {
                        return d.ca;
                    });
                d3.select("div.test-div2")
                    .selectAll("div.h-bar")
                    .filter(function (d, i) {
                        return d.ca == ca;
                    })
                    .style("background-color", "blue");
                if (cp) {
                    d3.select("div.test-div2")
                        .selectAll("div.h-bar")
                        .sort(cp);
                }
            }
            var cpByEx = function (a, b) {
                return a.ex < b.ex ? -1 : 1;
            }
            var cpByCa = function (a, b) {
                return a.ca < b.ca ? -1 : 1;
            }
            render(data, "ga", cpByEx);
            var i = 0;
            setInterval(function () {
                if (i%2==0) {
                    render(data, "ga", cpByCa);
                } else {
                    render(data, "ga", cpByEx);
                }
                i++;
            }, 1500);
        }
        // testD3Function6();
        function testD3Function7 () {
            var max = 11, data = [];
            for (var i = 0; i < max; ++i) data.push(i);
            var alphabet = d3.scale.ordinal()
                .domain(data)
                // .range(["#eeeeee", "#xxxxxx"]);
                .range(["a","b","c","d","e","f","g","h","i","j"]);
            var sizeScale = d3.scale.linear()
                .domain([0, max])
                .range(["italic bold 12px/30px Georgia, serif", "italic bold 120px/180px Georgia, serif"]);
            function render (data, scale, scale2) {
                d3.select("div.test-div")
                    .selectAll("div.cell")
                    .data(data)
                    .enter()
                    .append("div")
                        .classed("cell", true);
                d3.select("div.test-div")
                    .selectAll("div.cell")
                    .data(data)
                    .exit()
                    .remove();
                d3.select("div.test-div")
                    .selectAll("div.cell")
                    .data(data)
                    .style("display", "inline-block")
                    .style("background-color", function (d) {
                        return scale(d) .indexOf("#")>=0 ? scale(d) : "white";
                    })
                    .text(function (d) {
                        return sizeScale(d);
                    });
            }
            render(data, d3.scale.category10(), sizeScale);
        }
        testD3Function7();
        function testD3Function8 () {
            var selection = d3.select("div.test-div3"), duration = 5000;
            selection.append("div")
                .classed("box", true)
                .style("background-color", "#e9967a")
                .style("margin-left", "10px")
                .style("width", "200px")
                .style("height", "200px")
                .transition()
                .duration(duration)
                .style("background-color", "#add8e6")
                .style("margin-left", "600px")
                .style("width", "100px")
                .style("height", "100px");
        }
        // testD3Function8();
        function testD3Function9 () {
            var id = 0, data = [], duration = 1000, chartHeight = 200, chartWidth = 680;
            for (var i = 0; i < 20; i++){
                push(data);
            }
            function render (data) {
                var selection = d3.select("div.test-div3")
                    .selectAll("div.v-bar")
                    .data(data, function (d) { return d.id;});
                selection.enter()
                    .append("div")
                        .attr("class", "v-bar")
                        .style("position", "fixed")
                        .style("top", chartHeight + "px")
                        .style("left", function (d, i) {
                            return barLeft(i) + "px";
                        })
                        .style("height", "0px")
                        .style("width", "0")
                            .append("span");
                selection.transition().duration(duration)
                    .style("top", function (d) {
                        return chartHeight-barHeight(d)+"px";
                    })
                    .style("left", function (d, i) {
                        return barLeft(i) + "px";
                    })
                    .style("height", function (d) {
                        return barHeight(d) + "px";
                    })
                    .style("width", "20px")
                    .select("span")
                        .text(function (d) {
                            return d.value;
                        });
                selection.exit()
                    .transition()
                    .duration(duration)
                    .style("left", function (d, i) {
                        // return barLeft(-1) + "px";
                    })
                    .remove();
            }
            function push (data) {
                data.push({
                    id: ++id,
                    value: Math.round(Math.random()*chartHeight)
                });
            }
            function barLeft (i) {
                return i*(30+2);
            }
            function barHeight (d) {
                return d.value;
            }
            setInterval(function () {
                data.shift();
                push(data);
                render(data);
            }, 2000);
            render(data);
            d3.select("div.test-div3")
                .append("div")
                    .attr("class", "baseline")
                    .style("position", "fixed")
                    .style("top", chartHeight + "px")
                    .style("left", "0px")
                    .style("width", chartWidth + "px");

        }
        // testD3Function9();
        function testD3Function10 () {
            var data = ["linear", "cubic", "cubic-in-out", "sin", "sin-out", "exp", "circle", "back", "bounce", function(t){return t*t}];
            var colors = d3.scale.category10();

            d3.select("div.test-div4")
                .selectAll("div.fixed-cell")
                .data(data)
                .enter()
                .append("div")
                    .attr("class", "fixed-cell")
                    .style("top", function (d, i) {
                        return i*10 + "px";
                    })
                    .style("background-color", function (d, i) {
                        return colors(i);
                    })
                    .style("color", "white")
                    .style("left", "800px")
                    .text(function (d) {
                        if (typeof d === "function") return "custom";
                        return d;
                    });
            d3.select("div.test-div4").selectAll("div").each(function (d) {
                d3.select(this)
                    .transition()
                    .ease(d)
                    .duration(1500)
                    .style("left", "10px")
                    .filter(function (d) {
                        return d=="cubic" || d=="exp";
                    })
                    .transition()
                    .duration(1500)
                    .delay(1500)
                    .each("start", function () {
                        d3.select(this).text("transitioning");
                    })
                    .each("end", function () {
                        d3.select(this).text("done");
                    })
                    .style("left","800px");
            });
        }
        // testD3Function10();
        function testD3Function11 () {
            var selection = d3.select("div.test-div4");
            selection.append("div")
                .style("position", "relative")
                .style("background-color", "steelblue")
                .style("left", "10px")
                .style("width", "80px")
                .style("height", "80px")
                .call(teleport);
            function teleport (s) {
                s.transition().duration(1000)
                    .style("width", "200px")
                    .style("height", "1px")
                    .style("top","40px")
                .transition().duration(500)
                    .style("left","600px")
                .transition().duration(1000)
                    .style("left", "800px")
                    .style("height","80px")
                    .style("width", "80px");
            }
        }
        // testD3Function11();
        function testD3Function12 () {
            var width = 500, height = 500, margin = 50;
            var x = d3.scale.linear().domain([0, 10]).range([margin, width-margin]);
            var y = d3.scale.linear().domain([0, 10]).range([height-margin, margin]);
            var data = [
            [
                {x:0,y:5},
                {x:1,y:9},
                {x:2,y:7},
                {x:3,y:5},
                {x:4,y:3},
                {x:6,y:4},
                {x:7,y:2},
                {x:8,y:3},
                {x:9,y:2}
            ],
            
                d3.range(10).map(function (i) {
                    return {x: i, y: Math.sin(i)+5};
                })
            
            ];
            var line = d3.svg.line()
                .x(function (d) {return x(d.x);})
                .y(function (d) {return y(d.y);});
            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom")
                .ticks(10);
            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left")
                .ticks(10)
                .tickSubdivide(5);
            var svg = d3.select("div.test-div4").append("svg");
            svg.attr("height", height)
                .attr("width", width);
            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0,"+(height-margin)+")")
                .call(xAxis);
            svg.append("g")
                .attr("class", "y axis")
                .attr("transform", "translate("+margin+","+0+")")
                .call(yAxis);
            svg.selectAll("path.line")
                .data(data)
                .enter()
                .append("path")
                .attr("class", "line")
                .attr("d", function (d) {return line(d);});

        }
        testD3Function12();

        function addSystemChart () {
            var margin = {top: 30, right: 120, bottom: 0, left: 120},
                width = 1200 - margin.left - margin.right,
                height = 300 - margin.top - margin.bottom;

            var x = d3.scale.linear()
                .range([0, width]);

            var barHeight = 20;

            var color = d3.scale.ordinal()
                .range(["steelblue", "#4682b4"]);

            var duration = 750,
                delay = 25;

            var partition = d3.layout.partition()
                .value(function(d) { return d.size; });

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("top");

            var svg = d3.select("div#index div#system_chart").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            svg.append("rect")
                .attr("class", "background")
                .attr("width", width)
                .attr("height", height)
                .on("click", up);

            svg.append("g")
                .attr("class", "x axis");

            svg.append("g")
                .attr("class", "y axis")
              .append("line")
                .attr("y1", "100%");

            d3.json("../../../data/systemData", function(error, root) {
              partition.nodes(root);
              x.domain([0, root.value]).nice();
              down(root, 0);
            });

            function down(d, i) {
              if (!d.children || this.__transition__) return;
              var end = duration + d.children.length * delay;

              // Mark any currently-displayed bars as exiting.
              var exit = svg.selectAll(".enter")
                  .attr("class", "exit");

              // Entering nodes immediately obscure the clicked-on bar, so hide it.
              exit.selectAll("rect").filter(function(p) { return p === d; })
                  .style("fill-opacity", 1e-6);

              // Enter the new bars for the clicked-on data.
              // Per above, entering bars are immediately visible.
              var enter = bar(d)
                  .attr("transform", stack(i))
                  .style("opacity", 1);

              // Have the text fade-in, even though the bars are visible.
              // Color the bars as parents; they will fade to children if appropriate.
              enter.select("text").style("fill-opacity", 1e-6);
              enter.select("rect").style("fill", color(true));

              // Update the x-scale domain.
              x.domain([0, d3.max(d.children, function(d) { return d.value; })]).nice();

              // Update the x-axis.
              svg.selectAll(".x.axis").transition()
                  .duration(duration)
                  .call(xAxis);

              // Transition entering bars to their new position.
              var enterTransition = enter.transition()
                  .duration(duration)
                  .delay(function(d, i) { return i * delay; })
                  .attr("transform", function(d, i) { return "translate(0," + barHeight * i * 1.2 + ")"; });

              // Transition entering text.
              enterTransition.select("text")
                  .style("fill-opacity", 1);

              // Transition entering rects to the new x-scale.
              enterTransition.select("rect")
                  .attr("width", function(d) { return x(d.value); })
                  .style("fill", function(d) { return color(!!d.children); });

              // Transition exiting bars to fade out.
              var exitTransition = exit.transition()
                  .duration(duration)
                  .style("opacity", 1e-6)
                  .remove();

              // Transition exiting bars to the new x-scale.
              exitTransition.selectAll("rect")
                  .attr("width", function(d) { return x(d.value); });

              // Rebind the current node to the background.
              svg.select(".background")
                  .datum(d)
                .transition()
                  .duration(end);


              d.index = i;
            }

            function up(d) {
              if (!d.parent || this.__transition__) return;
              var end = duration + d.children.length * delay;

              // Mark any currently-displayed bars as exiting.
              var exit = svg.selectAll(".enter")
                  .attr("class", "exit");

              // Enter the new bars for the clicked-on data's parent.
              var enter = bar(d.parent)
                  .attr("transform", function(d, i) { return "translate(0," + barHeight * i * 1.2 + ")"; })
                  .style("opacity", 1e-6);

              // Color the bars as appropriate.
              // Exiting nodes will obscure the parent bar, so hide it.
              enter.select("rect")
                  .style("fill", function(d) { return color(!!d.children); })
                .filter(function(p) { return p === d; })
                  .style("fill-opacity", 1e-6);

              // Update the x-scale domain.
              x.domain([0, d3.max(d.parent.children, function(d) { return d.value; })]).nice();

              // Update the x-axis.
              svg.selectAll(".x.axis").transition()
                  .duration(duration)
                  .call(xAxis);

              // Transition entering bars to fade in over the full duration.
              var enterTransition = enter.transition()
                  .duration(end)
                  .style("opacity", 1);

              // Transition entering rects to the new x-scale.
              // When the entering parent rect is done, make it visible!
              enterTransition.select("rect")
                  .attr("width", function(d) { return x(d.value); })
                  .each("end", function(p) { if (p === d) d3.select(this).style("fill-opacity", null); });

              // Transition exiting bars to the parent's position.
              var exitTransition = exit.selectAll("g").transition()
                  .duration(duration)
                  .delay(function(d, i) { return i * delay; })
                  .attr("transform", stack(d.index));

              // Transition exiting text to fade out.
              exitTransition.select("text")
                  .style("fill-opacity", 1e-6);

              // Transition exiting rects to the new scale and fade to parent color.
              exitTransition.select("rect")
                  .attr("width", function(d) { return x(d.value); })
                  .style("fill", color(true));

              // Remove exiting nodes when the last child has finished transitioning.
              exit.transition()
                  .duration(end)
                  .remove();

              // Rebind the current parent to the background.
              svg.select(".background")
                  .datum(d.parent)
                .transition()
                  .duration(end);
            }

            // Creates a set of bars for the given data node, at the specified index.
            function bar(d) {
              var bar = svg.insert("g", ".y.axis")
                  .attr("class", "enter")
                  .attr("transform", "translate(0,5)")
                .selectAll("g")
                  .data(d.children)
                .enter().append("g")
                  .style("cursor", function(d) { return !d.children ? null : "pointer"; })
                  .on("click", down);

              bar.append("text")
                  .attr("x", -6)
                  .attr("y", barHeight / 2)
                  .attr("dy", ".35em")
                  .style("text-anchor", "end")
                  .text(function(d) { return d.name; });



              bar.append("rect")
                  .attr("width", function(d) { return x(d.value); })
                  .attr("height", barHeight);

              bar.append("text")
                  .attr("x", function(d) { return d.value*80; })
                  .attr("y", barHeight / 2)
                  .attr("dy", ".35em")
                  .style("text-anchor", "end")
                  .text(function(d) { return d.weight+"（权重）"; });

              return bar;
            }

            // A stateful closure for stacking bars horizontally.
            function stack(i) {
              var x0 = 0;
              return function(d) {
                var tx = "translate(" + x0 + "," + barHeight * i * 1.2 + ")";
                x0 += x(d.value);
                return tx;
              };
            }
        }
        addSystemChart();

        function addModuleLeftChart () {
            // var links = [
              // {source: "Microsoft", target: "Amazon", type: "suit"},
              // {source: "Microsoft", target: "HTC", type: "suit"},
              // {source: "Samsung", target: "Apple", type: "suit"},
              // {source: "Nokia", target: "Apple", type: "suit"}
              // {source: {name:"模块A", flag:0, num:1}, target:{name:"模块B", flag:1, num:1}, type: "suit"},
              // {source: {name:"模块A", flag:0, num:1}, target:{name:"模块C", flag:1, num:2}, type: "suit"},
              // {source: {name:"模块E", flag:0, num:1}, target:{name:"模块D", flag:1, num:3}, type: "suit"},
              // {source: {name:"模块E", flag:0, num:1}, target:{name:"模块F", flag:1, num:4}, type: "suit"},
              // {source: {name:"模块D", flag:1, num:3}, target:{name:"模块H", flag:2, num:1}, type: "suit"}
              // {source: "Motorola", target: "Apple", type: "suit"},
              // {source: "HTC", target: "Apple", type: "suit"},
              // {source: "Kodak", target: "Apple", type: "suit"},
              // {source: "Microsoft", target: "Barnes & Noble", type: "suit"},
              // {source: "Microsoft", target: "Foxconn", type: "suit"},
              // {source: "Oracle", target: "Google", type: "suit"},
              // {source: "Apple", target: "HTC", type: "suit"},
              // {source: "Microsoft", target: "Inventec", type: "suit"},
              // {source: "Samsung", target: "Kodak", type: "resolved"},
              // {source: "LG", target: "Kodak", type: "resolved"},
              // {source: "RIM", target: "Kodak", type: "suit"},
              // {source: "Sony", target: "LG", type: "suit"},
              // {source: "Kodak", target: "LG", type: "resolved"},
              // {source: "Apple", target: "Nokia", type: "resolved"},
              // {source: "Qualcomm", target: "Nokia", type: "resolved"},
              // {source: "Apple", target: "Motorola", type: "suit"},
              // {source: "Microsoft", target: "Motorola", type: "suit"},
              // {source: "Motorola", target: "Microsoft", type: "suit"},
              // {source: "Huawei", target: "ZTE", type: "suit"},
              // {source: "Ericsson", target: "ZTE", type: "suit"},
              // {source: "Kodak", target: "Samsung", type: "resolved"},
              // {source: "Apple", target: "Samsung", type: "suit"},
              // {source: "Kodak", target: "RIM", type: "suit"},
              // {source: "Nokia", target: "Qualcomm", type: "suit"}
            // ];

            // var nodes = {};

            // Compute the distinct nodes from the links.
            // links.forEach(function(link) {
              // link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
              // link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
              // link.source = nodes[link.source.name] || (nodes[link.source.name] = {name: link.source.name, flag: link.source.flag});
              // link.target = nodes[link.target.name] || (nodes[link.target.name] = {name: link.target.name, flag: link.target.flag});
            // });
            d3.json("../../../data/topology", function(error, json) {
                // console.log(json);
                var links = json.children;
                console.log("links0->");
                for (var xx in links) {
                    console.log(links[xx]);
                }
                var nodes = {};

                // Compute the distinct nodes from the links.
                links.forEach(function(link) {
                  // link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
                  // link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
                  link.source = nodes[link.source.name] || (nodes[link.source.name] = {name: link.source.name, flag: link.source.flag});
                  link.target = nodes[link.target.name] || (nodes[link.target.name] = {name: link.target.name, flag: link.target.flag});
                });
                console.log("nodes->");
                for (var xx in nodes) {
                    console.log(nodes[xx]);
                }
                console.log("links->");
                for (var xx in links) {
                    console.log(links[xx]);
                }
                topology(nodes, links);
            });
            function topology (nodes, links) {
                var nodes = nodes;
                var links = links;
                var width = 1200,
                height = 700;

                var force = d3.layout.force()
                    .nodes(d3.values(nodes))
                    .links(links)
                    .size([width, height])
                    .linkDistance(100)
                    .charge(-1300)
                    .on("tick", tick)
                    .start();

                var svg = d3.select("div#index div#module_chart_left").append("svg")
                    .attr("width", width)
                    .attr("height", height);

                // Per-type markers, as they don't inherit styles.
                svg.append("defs").selectAll("marker")
                    .data(["suit", "licensing", "resolved"])
                    .enter().append("marker")
                    .attr("id", function(d) { return d; })
                    .attr("viewBox", "0 -5 10 10")
                    .attr("refX", 13)
                    .attr("refY", 0)
                    .attr("markerWidth", 6)
                    .attr("markerHeight", 6)
                    .attr("orient", "auto")
                    .append("path")
                    .attr("d", "M0,-5L10,0L0,5");

                var path = svg.append("g").selectAll("path")
                    .data(force.links())
                    .enter().append("path")
                    .attr("class", function(d) { return "link " + d.type; })
                    .attr("marker-end", function(d) { return "url(#" + d.type + ")"; });

                var circle = svg.append("g").selectAll("circle")
                    .data(force.nodes())
                    .enter().append("circle")
                    .attr("r", function(d){if (d.flag==0) {return 15;} else if(d.flag==1) {return 20;};})
                    // .attr("lay",function(d){return d.flag})
                    .style("fill", function(d){if (d.flag==0) {return "steelblue"} else if(d.flag==1) {return "#7CCD7C"} else {return "blue"};})
                    .call(force.drag)
                    // .attr('cx',function(d){ console.log("fff"+force.nodes())});
                    // .call(force.drag);
                    // .attr('cx',function(d){ return (d.index+d.flag)*10+10;})
                    // .attr('cy',function(d){ return d.flag*10+10;});

                var text = svg.append("g").selectAll("text")
                    .data(force.nodes())
                    .enter().append("text")
                    .attr("x", -30)
                    .attr("y", 0)
                    // .attr("y", ".41em")
                    .text(function(d) { return d.name; });

                // // Use elliptical arc path segments to doubly-encode directionality.
                function tick() {
                  path.attr("d", linkArc);
                  circle.attr("transform", transform);
                  text.attr("transform", transform);
                }

                function linkArc(d) {
                  // var dx = d.target.x - d.source.x,
                  //     dy = d.target.y - d.source.y,
                  //     dr = Math.sqrt(dx * dx + dy * dy);
                  // return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;

                  var deltaX = d.target.x - d.source.x,
                        deltaY = d.target.y - d.source.y,
                        dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY),
                        normX = deltaX / dist,
                        normY = deltaY / dist,
                        sourcePadding = d.left ? 17 : 12,
                        targetPadding = d.right ? 17 : 12,
                        sourceX = d.source.x + (sourcePadding * normX),
                        sourceY = d.source.y + (sourcePadding * normY),
                        targetX = d.target.x - (targetPadding * normX),
                        targetY = d.target.y - (targetPadding * normY);
                    return 'M' + sourceX + ',' + sourceY + 'L' + targetX + ',' + targetY;
                }

                function transform(d) {
                    // console.log(d);
                  return "translate(" + d.x + "," + d.y + ")";
                }
            }
            
        }
        addModuleLeftChart();

        function addModuleRightChart () {
            d3.json("../../../data/moduleData", function(error, json) {
                moduleChart(json.xAxis, json.children);
            });
            function moduleChart(xAxis, data){
                var w = 600;                        //width
                var h = 500;                        //height
                var padding = {top: 40, right: 40, bottom: 40, left:40};
                var margin = {top: 30, right: 120, bottom: 0, left: 120}
                // var moduleArr = ["A", "B", "C"];
                var xbarName = xAxis;
                var dataset = data;
                //Set up stack method
                var stack = d3.layout.stack();

                //Data, stacked
                stack(dataset);

                var color_hash = {
                    0 : ["稳定性","#1f77b4"],
                    1 : ["实时性","#2ca02c"],
                    2 : ["安全性","#ff7f0e"]

                };
 
                var yScale = d3.scale.linear()
                    .domain([0, d3.max(dataset, function(d) {
                            // console.log(d);
                            return d3.max(d, function(d) {
                                // console.log(d);
                                return d.y0 + d.y;
                                // return
                            });
                        })
                    ])
                    .range([h-padding.bottom-padding.top,0]);


                var yAxis = d3.svg.axis()
                    .scale(yScale)
                    .orient("left")
                    .ticks(10);



                //Easy colors accessible via a 10-step ordinal scale
                var colors = d3.scale.category10();

                //Create SVG element
                var svg = d3.select("#module_chart_right")
                            .append("svg")
                            .attr("width", w)
                            .attr("height", h);

                // Add a group for each row of data
                var groups = svg.selectAll("g")
                    .data(dataset)
                    .enter()
                    .append("g")
                    .attr("class","rgroups")
                    .attr("transform","translate("+ padding.left + "," + (h - padding.bottom) +")")
                    .style("fill", function(d, i) {
                        return color_hash[dataset.indexOf(d)][1];
                    });

                // Add a rect for each data value
                var rects = groups.selectAll("rect")
                    .data(function(d) { return d; })
                    .enter()
                    .append("rect")
                    .attr("width", 2)
                    .style("fill-opacity",1e-6);


                rects.transition()
                     .duration(function(d,i){
                         return 500 * i;
                     })
                     .ease("linear")
                    .attr("x", function(d) {
                        // console.log(xScale(new Date(d.time)));
                        // return xScale(new Date(d.time));
                        // console.log(d.type);
                        return d.type*100+35;
                    })
                    .attr("y", function(d) {
                        return -(- yScale(d.y0) - yScale(d.y) + (h - padding.top - padding.bottom)*2);
                    })
                    .attr("height", function(d) {
                        return -yScale(d.y) + (h - padding.top - padding.bottom);
                    })
                    .attr("width", 30)
                    .style("fill-opacity",1);

                    var xbar = svg.append("g")
                    .attr("class", "x axis");
                    
                    xbar.append("line")
                    .attr("x1", "40")
                    .attr("y1", "92%")
                    .attr("x2", "100%")
                    .attr("y2", "92%");

                var nameIndex = 0;
                xbarName.forEach(function(name){
                    xbar.append("text")
                    .attr("x", 93+nameIndex*100)
                    .attr("y", 470)
                    .attr("dy", ".35em")
                    .style("text-anchor", "middle")
                    .text(name);
                    nameIndex++;
                 });
                nameIndex = 0;
                        

                        svg.append("g")
                            .attr("class","y axis")
                            .attr("transform","translate(" + padding.left + "," + padding.top + ")")
                            .call(yAxis);

                        // adding legend

                        var legend = svg.append("g")
                            .attr("class","legend")
                            .attr("x", w - padding.right - 65)
                            .attr("y", 25)
                            .attr("height", 100)
                            .attr("width",100);

                        legend.selectAll("g").data(dataset)
                        .enter()
                        .append('g')
                        .each(function(d,i){
                            var g = d3.select(this);
                            g.append("rect")
                            .attr("x", w - padding.right - 65)
                            .attr("y", i*25 + 10)
                            .attr("width", 10)
                            .attr("height",10)
                            .style("fill",color_hash[String(i)][1]);

                            g.append("text")
                            .attr("x", w - padding.right - 50)
                            .attr("y", i*25 + 20)
                            .attr("height",30)
                            .attr("width",100)
                            .style("fill",color_hash[String(i)][1])
                            .text(color_hash[String(i)][0]);
                        });


                        svg.append("text")
                        .attr("class","title")
                        .attr("x", (w / 2))             
                        .attr("y", 20)
                        .attr("text-anchor", "middle")  
                        .style("font-size", "16px") 
                        // .style("text-decoration", "underline")  
                        .text("模块性能评估表");
            }
                           
        }
        // addModuleRightChart();
        function addModuleRightChart2 () {
            var margin = {top: 30, right: 120, bottom: 0, left: 120},
                width = 1200 - margin.left - margin.right,
                height = 400 - margin.top - margin.bottom;

            var x = d3.scale.linear()
                .range([0, width]);

            var barHeight = 20;

            var color = d3.scale.ordinal()
                .range(["steelblue", "#48D1CC"]);

            var duration = 750,
                delay = 25;

            var partition = d3.layout.partition()
                .value(function(d) { return d.size; });

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("top");

            var svg = d3.select("div#module_chart_right").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
              .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            svg.append("rect")
                .attr("class", "background")
                .attr("width", width)
                .attr("height", height)
                .on("click", up);

            svg.append("g")
                .attr("class", "x axis");

            svg.append("g")
                .attr("class", "y axis")
              .append("line")
                .attr("y1", "100%");

            d3.json("../../../data/moduleData2", function(error, root) {
              console.log(root);
              partition.nodes(root);
              // console.log(root);
              x.domain([0, root.value]).nice();
              // console.log(root);
              down2(root, 0);
              // bar(root, 0);
            });

            function down(d, i) {
              if (!d.children || this.__transition__) return;
              var end = duration + d.children.length * delay;

              // Mark any currently-displayed bars as exiting.
              var exit = svg.selectAll(".enter")
                  .attr("class", "exit");

              // Entering nodes immediately obscure the clicked-on bar, so hide it.
              exit.selectAll("rect").filter(function(p) { return p === d; })
                  .style("fill-opacity", 1e-6);

              // Enter the new bars for the clicked-on data.
              // Per above, entering bars are immediately visible.
              var enter = bar2(d)
                  .attr("transform", stack(i))
                  .style("opacity", 1);

              // Have the text fade-in, even though the bars are visible.
              // Color the bars as parents; they will fade to children if appropriate.
              enter.select("text").style("fill-opacity", 1e-6);
              enter.select("rect").style("fill", color(true));

              // Update the x-scale domain.
              x.domain([0, d3.max(d.children, function(d) { return d.value; })]).nice();

              // Update the x-axis.
              svg.selectAll(".x.axis").transition()
                  .duration(duration)
                  .call(xAxis);

              // Transition entering bars to their new position.
              var enterTransition = enter.transition()
                  .duration(duration)
                  .delay(function(d, i) { return i * delay; })
                  .attr("transform", function(d, i) { return "translate(0," + barHeight * i * 1.2 + ")"; });

              // Transition entering text.
              enterTransition.select("text")
                  .style("fill-opacity", 1);

              // Transition entering rects to the new x-scale.
              enterTransition.select("rect")
                  .attr("width", function(d) { return x(d.value); })
                  .style("fill", function(d) { return color(!!d.children); });

              // Transition exiting bars to fade out.
              var exitTransition = exit.transition()
                  .duration(duration)
                  .style("opacity", 1e-6)
                  .remove();

              // Transition exiting bars to the new x-scale.
              exitTransition.selectAll("rect")
                  .attr("width", function(d) { return x(d.value); });

              // Rebind the current node to the background.
              svg.select(".background")
                  .datum(d)
                .transition()
                  .duration(end);

              d.index = i;
            }
            function down2(d, i) {
              if (!d.children || this.__transition__) return;
              var end = duration + d.children.length * delay;

              // Mark any currently-displayed bars as exiting.
              var exit = svg.selectAll(".enter")
                  .attr("class", "exit");

              // Entering nodes immediately obscure the clicked-on bar, so hide it.
              exit.selectAll("rect").filter(function(p) { return p === d; })
                  .style("fill-opacity", 1e-6);

              // Enter the new bars for the clicked-on data.
              // Per above, entering bars are immediately visible.
              var enter = bar(d)
                  .attr("transform", stack(i))
                  .style("opacity", 1);

              // Have the text fade-in, even though the bars are visible.
              // Color the bars as parents; they will fade to children if appropriate.
              enter.select("text").style("fill-opacity", 1e-6);
              enter.select("rect").style("fill", color(true));

              // Update the x-scale domain.
              // x.domain([0, d3.max(d.children, function(d) { return d.value; })]).nice();
              x.domain([0, 10]).nice();
              // x.domain([0, 10]).ticks(5).map(x.tickFormat(5,"%"));

              // Update the x-axis.
              svg.selectAll(".x.axis").transition()
                  .duration(duration)
                  .call(xAxis);

              // Transition entering bars to their new position.
              var enterTransition = enter.transition()
                  .duration(duration)
                  .delay(function(d, i) { return i * delay; })
                  .attr("transform", function(d, i) { return "translate(0," + barHeight * i * 1.2 + ")"; });

              // Transition entering text.
              enterTransition.select("text")
                  .style("fill-opacity", 1);

              // Transition entering rects to the new x-scale.
              enterTransition.select("rect")
                  .attr("width", function(d) { return x(d.size); })
                  .style("fill", function(d) { return color(!!d.children); });

              // Transition exiting bars to fade out.
              var exitTransition = exit.transition()
                  .duration(duration)
                  .style("opacity", 1e-6)
                  .remove();

              // Transition exiting bars to the new x-scale.
              // exitTransition.selectAll("rect")
              //     .attr("width", function(d) { return x(d.value); });

              // Rebind the current node to the background.
              svg.select(".background")
                  .datum(d)
                .transition()
                  .duration(end);

              d.index = i;
            }

            function up(d) {
                console.log(d.children);

              if (!d.parent || this.__transition__) return;
              var d = d.parent;
              var end = duration + d.children.length * delay;

              // Mark any currently-displayed bars as exiting.
              var exit = svg.selectAll(".enter")
                  .attr("class", "exit");

              // Enter the new bars for the clicked-on data's parent.
              var enter = bar(d.parent)
                  .attr("transform", function(d, i) { return "translate(0," + barHeight * i * 1.2 + ")"; })
                  .style("opacity", 1e-6);

              // Color the bars as appropriate.
              // Exiting nodes will obscure the parent bar, so hide it.
              enter.select("rect")
                  .style("fill", function(d) { return color(!!d.children); })
                .filter(function(p) { return p === d; })
                  .style("fill-opacity", 1e-6);

              // Update the x-scale domain.
              // x.domain([0, d3.max(d.parent.children, function(d) { return d.value; })]).nice();
              x.domain([0, 10]).nice();

              // Update the x-axis.
              svg.selectAll(".x.axis").transition()
                  .duration(duration)
                  .call(xAxis);

              // Transition entering bars to fade in over the full duration.
              var enterTransition = enter.transition()
                  .duration(end)
                  .style("opacity", 1);

              // Transition entering rects to the new x-scale.
              // When the entering parent rect is done, make it visible!
              enterTransition.select("rect")
                  // .attr("width", function(d) { return x(d.value); })
                  .attr("width", function(d) { return x(d.size); })
                  .each("end", function(p) { if (p === d) d3.select(this).style("fill-opacity", null); });

              // Transition exiting bars to the parent's position.
              var exitTransition = exit.selectAll("g").transition()
                  .duration(duration)
                  .delay(function(d, i) { return i * delay; })
                  .attr("transform", stack(d.index));

              // Transition exiting text to fade out.
              exitTransition.select("text")
                  .style("fill-opacity", 1e-6);

              // Transition exiting rects to the new scale and fade to parent color.
              // exitTransition.select("rect")
                  // .attr("width", function(d) { return x(d.value); })
                  // .style("fill", color(true));

              // Remove exiting nodes when the last child has finished transitioning.
              exit.transition()
                  .duration(end)
                  .remove();

              // Rebind the current parent to the background.
              svg.select(".background")
                  .datum(d.parent)
                .transition()
                  .duration(end);
            }

            // Creates a set of bars for the given data node, at the specified index.
            function bar(d) {
                // console.log(d);
              var bar = svg.insert("g", ".y.axis")
                  .attr("class", "enter")
                  .attr("transform", "translate(0,5)")
                .selectAll("g")
                  .data(d.children)
                .enter().append("g")
                  .style("cursor", function(d) { return !d.children ? null : "pointer"; })
                  .on("click", down);

              bar.append("text")
                  .attr("x", -6)
                  .attr("y", barHeight / 2)
                  .attr("dy", ".35em")
                  .style("text-anchor", "end")
                  .text(function(d) { return d.name; });

              bar.append("rect")
                  // .attr("width", function(d) { return x(10); })
                  .attr("height", barHeight);

              return bar;
            }
            function bar2(d) {
                var bar = svg.insert("g", ".y.axis")
                    .attr("class", "enter")
                    .attr("transform", "translate(0,5)")
                    .selectAll("g")
                    .data(d.children)
                    .enter().append("g")
                    .style("cursor", function(d) { return !d.children ? "pointer" : "pointer"; })
                    .on("click", up);

                bar.append("text")
                    .attr("x", -6)
                    .attr("y", barHeight / 2)
                    .attr("dy", ".35em")
                    .style("text-anchor", "end")
                    .text(function(d) { return d.name; });

                bar.append("rect")
                  // .attr("width", function(d) { return x(d.value); })
                    .attr("height", barHeight);

                bar.append("text")
                    .attr("x", function(d) { return d.value*90; })
                    .attr("y", barHeight / 2)
                    .attr("dy", ".35em")
                    .style("text-anchor", "end")
                    .text(function(d) { return d.weight!=0 ? d.weight+"（权重）" : ""; });

              return bar;
            }

            // A stateful closure for stacking bars horizontally.
            function stack(i) {
              var x0 = 0;
              return function(d) {
                var tx = "translate(" + x0 + "," + barHeight * i * 1.2 + ")";
                x0 += x(d.value);
                return tx;
              };
            }
        }
        addModuleRightChart2();

        function addTuopuChart () {
            // set up SVG for D3
            var width  = 960,
                height = 500,
                colors = d3.scale.category10();

            var svg = d3.select('div#tuopu_chart')
              .append('svg')
              .attr('width', width)
              .attr('height', height);

            // set up initial nodes and links
            //  - nodes are known by 'id', not by index in array.
            //  - reflexive edges are indicated on the node (as a bold black circle).
            //  - links are always source < target; edge directions are set by 'left' and 'right'.
            var nodes = [
                {id: 0, reflexive: false},
                {id: 1, reflexive: true },
                {id: 2, reflexive: false},
                {id: 3, reflexive: false},
                {id: 4, reflexive: true },
                {id: 5, reflexive: false}
              ],
              lastNodeId = 2,
              links = [
                {source: nodes[0], target: nodes[1], left: false, right: true },
                {source: nodes[1], target: nodes[2], left: false, right: true },
                {source: nodes[3], target: nodes[4], left: false, right: true },
                {source: nodes[4], target: nodes[5], left: false, right: true },
              ];

            // init D3 force layout
            var force = d3.layout.force()
                .nodes(nodes)
                .links(links)
                .size([width, height])
                .linkDistance(150)
                .charge(-500)
                .on('tick', tick)

            // define arrow markers for graph links
            svg.append('svg:defs').append('svg:marker')
                .attr('id', 'end-arrow')
                .attr('viewBox', '0 -5 10 10')
                .attr('refX', 6)
                .attr('markerWidth', 3)
                .attr('markerHeight', 3)
                .attr('orient', 'auto')
              .append('svg:path')
                .attr('d', 'M0,-5L10,0L0,5')
                .attr('fill', '#000');

            svg.append('svg:defs').append('svg:marker')
                .attr('id', 'start-arrow')
                .attr('viewBox', '0 -5 10 10')
                .attr('refX', 4)
                .attr('markerWidth', 3)
                .attr('markerHeight', 3)
                .attr('orient', 'auto')
              .append('svg:path')
                .attr('d', 'M10,-5L0,0L10,5')
                .attr('fill', '#000');

            // line displayed when dragging new nodes
            var drag_line = svg.append('svg:path')
              .attr('class', 'link dragline hidden')
              .attr('d', 'M0,0L0,0');

            // handles to link and node element groups
            var path = svg.append('svg:g').selectAll('path'),
                circle = svg.append('svg:g').selectAll('g');

            // mouse event vars
            var selected_node = null,
                selected_link = null,
                mousedown_link = null,
                mousedown_node = null,
                mouseup_node = null;

            function resetMouseVars() {
              mousedown_node = null;
              mouseup_node = null;
              mousedown_link = null;
            }

            // update force layout (called automatically each iteration)
            function tick() {
              // draw directed edges with proper padding from node centers
              path.attr('d', function(d) {
                var deltaX = d.target.x - d.source.x,
                    deltaY = d.target.y - d.source.y,
                    dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY),
                    normX = deltaX / dist,
                    normY = deltaY / dist,
                    sourcePadding = d.left ? 17 : 12,
                    targetPadding = d.right ? 17 : 12,
                    sourceX = d.source.x + (sourcePadding * normX),
                    sourceY = d.source.y + (sourcePadding * normY),
                    targetX = d.target.x - (targetPadding * normX),
                    targetY = d.target.y - (targetPadding * normY);
                return 'M' + sourceX + ',' + sourceY + 'L' + targetX + ',' + targetY;
              });

              circle.attr('transform', function(d) {
                return 'translate(' + d.x + ',' + d.y + ')';
              });
            }

            // update graph (called when needed)
            function restart() {
              // path (link) group
              path = path.data(links);

              // update existing links
              path.classed('selected', function(d) { return d === selected_link; })
                .style('marker-start', function(d) { return d.left ? 'url(#start-arrow)' : ''; })
                .style('marker-end', function(d) { return d.right ? 'url(#end-arrow)' : ''; });


              // add new links
              path.enter().append('svg:path')
                .attr('class', 'link')
                .classed('selected', function(d) { return d === selected_link; })
                .style('marker-start', function(d) { return d.left ? 'url(#start-arrow)' : ''; })
                .style('marker-end', function(d) { return d.right ? 'url(#end-arrow)' : ''; })
                .on('mousedown', function(d) {
                  if(d3.event.ctrlKey) return;

                  // select link
                  mousedown_link = d;
                  if(mousedown_link === selected_link) selected_link = null;
                  else selected_link = mousedown_link;
                  selected_node = null;
                  restart();
                });

              // remove old links
              path.exit().remove();


              // circle (node) group
              // NB: the function arg is crucial here! nodes are known by id, not by index!
              circle = circle.data(nodes, function(d) { return d.id; });

              // update existing nodes (reflexive & selected visual states)
              circle.selectAll('circle')
                .style('fill', function(d) { return (d === selected_node) ? d3.rgb(colors(d.id)).brighter().toString() : colors(d.id); })
                .classed('reflexive', function(d) { return d.reflexive; });

              // add new nodes
              var g = circle.enter().append('svg:g');

              g.append('svg:circle')
                .attr('class', 'node')
                .attr('r', 12)
                .style('fill', function(d) { return (d === selected_node) ? d3.rgb(colors(d.id)).brighter().toString() : colors(d.id); })
                .style('stroke', function(d) { return d3.rgb(colors(d.id)).darker().toString(); })
                .classed('reflexive', function(d) { return d.reflexive; })
                .on('mouseover', function(d) {
                  if(!mousedown_node || d === mousedown_node) return;
                  // enlarge target node
                  d3.select(this).attr('transform', 'scale(1.1)');
                })
                .on('mouseout', function(d) {
                  if(!mousedown_node || d === mousedown_node) return;
                  // unenlarge target node
                  d3.select(this).attr('transform', '');
                })
                .on('mousedown', function(d) {
                  if(d3.event.ctrlKey) return;

                  // select node
                  mousedown_node = d;
                  if(mousedown_node === selected_node) selected_node = null;
                  else selected_node = mousedown_node;
                  selected_link = null;

                  // reposition drag line
                  drag_line
                    .style('marker-end', 'url(#end-arrow)')
                    .classed('hidden', false)
                    .attr('d', 'M' + mousedown_node.x + ',' + mousedown_node.y + 'L' + mousedown_node.x + ',' + mousedown_node.y);

                  restart();
                })
                .on('mouseup', function(d) {
                  if(!mousedown_node) return;

                  // needed by FF
                  drag_line
                    .classed('hidden', true)
                    .style('marker-end', '');

                  // check for drag-to-self
                  mouseup_node = d;
                  if(mouseup_node === mousedown_node) { resetMouseVars(); return; }

                  // unenlarge target node
                  d3.select(this).attr('transform', '');

                  // add link to graph (update if exists)
                  // NB: links are strictly source < target; arrows separately specified by booleans
                  var source, target, direction;
                  if(mousedown_node.id < mouseup_node.id) {
                    source = mousedown_node;
                    target = mouseup_node;
                    direction = 'right';
                  } else {
                    source = mouseup_node;
                    target = mousedown_node;
                    direction = 'left';
                  }

                  var link;
                  link = links.filter(function(l) {
                    return (l.source === source && l.target === target);
                  })[0];

                  if(link) {
                    link[direction] = true;
                  } else {
                    link = {source: source, target: target, left: false, right: false};
                    link[direction] = true;
                    links.push(link);
                  }

                  // select new link
                  selected_link = link;
                  selected_node = null;
                  restart();
                });

              // show node IDs
              g.append('svg:text')
                  .attr('x', 0)
                  .attr('y', 4)
                  .attr('class', 'id')
                  .text(function(d) { return d.id; });

              // remove old nodes
              circle.exit().remove();

              // set the graph in motion
              force.start();
            }

            function mousedown() {
              // prevent I-bar on drag
              //d3.event.preventDefault();
              
              // because :active only works in WebKit?
              svg.classed('active', true);

              if(d3.event.ctrlKey || mousedown_node || mousedown_link) return;

              // insert new node at point
              var point = d3.mouse(this),
                  node = {id: ++lastNodeId, reflexive: false};
              node.x = point[0];
              node.y = point[1];
              nodes.push(node);

              restart();
            }

            function mousemove() {
              if(!mousedown_node) return;

              // update drag line
              drag_line.attr('d', 'M' + mousedown_node.x + ',' + mousedown_node.y + 'L' + d3.mouse(this)[0] + ',' + d3.mouse(this)[1]);

              restart();
            }

            function mouseup() {
              if(mousedown_node) {
                // hide drag line
                drag_line
                  .classed('hidden', true)
                  .style('marker-end', '');
              }

              // because :active only works in WebKit?
              svg.classed('active', false);

              // clear mouse event vars
              resetMouseVars();
            }

            function spliceLinksForNode(node) {
              var toSplice = links.filter(function(l) {
                return (l.source === node || l.target === node);
              });
              toSplice.map(function(l) {
                links.splice(links.indexOf(l), 1);
              });
            }

            // only respond once per keydown
            var lastKeyDown = -1;

            function keydown() {
              d3.event.preventDefault();

              if(lastKeyDown !== -1) return;
              lastKeyDown = d3.event.keyCode;

              // ctrl
              if(d3.event.keyCode === 17) {
                circle.call(force.drag);
                svg.classed('ctrl', true);
              }

              if(!selected_node && !selected_link) return;
              switch(d3.event.keyCode) {
                case 8: // backspace
                case 46: // delete
                  if(selected_node) {
                    nodes.splice(nodes.indexOf(selected_node), 1);
                    spliceLinksForNode(selected_node);
                  } else if(selected_link) {
                    links.splice(links.indexOf(selected_link), 1);
                  }
                  selected_link = null;
                  selected_node = null;
                  restart();
                  break;
                case 66: // B
                  if(selected_link) {
                    // set link direction to both left and right
                    selected_link.left = true;
                    selected_link.right = true;
                  }
                  restart();
                  break;
                case 76: // L
                  if(selected_link) {
                    // set link direction to left only
                    selected_link.left = true;
                    selected_link.right = false;
                  }
                  restart();
                  break;
                case 82: // R
                  if(selected_node) {
                    // toggle node reflexivity
                    selected_node.reflexive = !selected_node.reflexive;
                  } else if(selected_link) {
                    // set link direction to right only
                    selected_link.left = false;
                    selected_link.right = true;
                  }
                  restart();
                  break;
              }
            }

            function keyup() {
              lastKeyDown = -1;

              // ctrl
              if(d3.event.keyCode === 17) {
                circle
                  .on('mousedown.drag', null)
                  .on('touchstart.drag', null);
                svg.classed('ctrl', false);
              }
            }

            // app starts here
            svg.on('mousedown', mousedown)
              .on('mousemove', mousemove)
              .on('mouseup', mouseup);
            d3.select(window)
              .on('keydown', keydown)
              .on('keyup', keyup);
            restart();
        }
        // addTuopuChart();
    }
]);
