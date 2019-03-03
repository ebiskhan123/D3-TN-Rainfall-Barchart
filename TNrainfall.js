const data = [{summer:118.4,year:"2001" },{summer:85.8,year:"2002"},{summer:129.8,year:"2003"},{summer:283.4,year:"2004"},
{summer:231.7,year:"2005"},{summer:150.9,year:"2006"},{summer:100.4,year:"2007"},{summer:261.2,year:"2008"},
{summer:129.2,year:"2009"},{summer:126.7,year:"2010"},{summer:140,year:"2011"},{summer:86.3,year:"2012"},
{summer:92.2,year:"2013"},{summer:157.1,year:"2014"}]


const margin = 50;
const width = 1200 - (2 * margin);
const height = 600 - (2 * margin);

var svg = d3.select("body")
            .append("svg")
            .attr("class","svgclass")
            .attr("width",1200)
            .attr("height",600);

var chart = svg.append("g")
            .attr("transform","translate(50,50)");

var yScale = d3.scaleLinear()
            .range([height, 0])
            .domain([0, 300]);

chart.append('g')
            .call(d3.axisLeft(yScale));

var xScale = d3.scaleBand()
            .range([0,width])
            .domain(data.map((d) => {
              return d.year;
            }))
            .padding(0.3);

chart.append("g")
            .attr("transform",`translate(0,${height})`)
            .call(d3.axisBottom(xScale));

svg.append('text')
            .attr('x', -(height / 2) - margin)
            .attr('y', margin / 2.4)
            .attr('transform', 'rotate(-90)')
            .attr('text-anchor', 'middle')
            .attr("class","text")
            .text('Rainfall in centimeters(cms)')

svg.append('text')
            .attr('x', width / 2 + margin)
            .attr('y', 40)
            .attr("class","text")
            .attr('text-anchor', 'middle')
            .text('Rainfall in Tamil Nadu 2001-2014')

svg.append('text')
            .attr('x', width / 2 + margin)
            .attr('y', height + (2 * margin-10))
            .attr("class","text")
            .attr('text-anchor', 'middle')
            .text('Years')
chart.append('g')
            .attr('class', 'grid')
            .call(d3.axisLeft()
            .scale(yScale)
            .tickSize(-width, 0, 0)
            .tickFormat(''))

var barchart = chart.selectAll()
            .data(data)
            .enter();
            barchart.append("rect")
            .attr("class","bar")
            .attr("x",(d) =>{
               return xScale(d.year);
            })
            .attr("y",(d)=>{
              return yScale(d.summer);
            })
            .attr("height", (d) =>{
               return (height - yScale(d.summer));
            })
            .attr("width", (d) =>{
              return  xScale.bandwidth();
            })
            .attr("fill","#328c3a")
            .on('mouseenter', function (actual, i) {
          d3.selectAll(".bar").attr("opacity", 0.5);
          d3.select(this).attr("opacity", 1)
            .transition()
            .duration(300)
            .attr('x', (d) => xScale(d.year) - 5)
            .attr('width', xScale.bandwidth() + 10)
            })
            .on("mouseleave", function (actual, i) {
              d3.selectAll(".bar").attr("opacity", 1)
              .transition()
              .duration(300)
              .attr('x', (d) => xScale(d.year))
              .attr('width', xScale.bandwidth());
            });

            barchart.append("text")
                          .attr('class', 'value')
                          .attr('x', (d) => xScale(d.year) + xScale.bandwidth() / 2)
                          .attr('y', (d) => yScale(d.summer) + 30)
                          .attr('text-anchor', 'middle')
                          .text((d) => `${d.summer}cm`);
