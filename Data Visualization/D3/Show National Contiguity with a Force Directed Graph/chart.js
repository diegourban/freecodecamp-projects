var NationalContiguity = NationalContiguity || {};

NationalContiguity.Config = {
  'data_url' : 'https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json'
};

NationalContiguity.ForceDirectedGraph = (function(){
  var config = NationalContiguity.Config;
	
  var url = config.data_url;

  var simulation;
  
  function drawChart() { 
    var margin = { top: 50, right: 0, bottom: 100, left: 80 }, width = 800, height = 600;

    d3.select(".chart").append("div")
      .attr("class", "title")
      .text("Force Directed Graph of State Contiguity");

    var svg = d3.select(".chart").append("svg")
      .attr("class", "graph")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id(function(d) { return d.id; }))
      .force("charge", d3.forceManyBody().distanceMin(40).distanceMax(100))
      .force("center", d3.forceCenter(width / 2, height / 2));

    d3.json(url, function(error, graph) {
      if (error) throw error;

      graph.nodes.forEach(function(d,i) {
        d.id = i;
      });

      var link = svg.append("g")
          .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line");

      var node = svg.append("g")
          .attr("class", "nodes")
        .selectAll("image")
        .data(graph.nodes)
        .enter().append("image")
          .attr("class", d => "flag")
          .call(d3.drag()
              .on("start", dragstarted)
              .on("drag", dragged)
              .on("end", dragended));

      node.append("title")
        .text(function(d) { return d.country; });

      simulation
        .nodes(graph.nodes)
        .on("tick", ticked);

      simulation.force("link")
        .links(graph.links);

      function ticked() {
        link
          .attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });

        node
          .attr("x", d => (d.x - 8))
          .attr("y", d => (d.y - 5))
          .attr("xlink:href", d => "flags/" + d.code + ".svg");

        node
          .attr("cx", function(d) { return d.x; })
          .attr("cy", function(d) { return d.y; });
      }
    });
  } 

  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
  	
  return {
    draw: function() {
	    return drawChart();
	  }
  };
})();

NationalContiguity.ForceDirectedGraph.draw();