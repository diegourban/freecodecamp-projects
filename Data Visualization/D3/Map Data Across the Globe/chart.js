var MeteoriteLanding = MeteoriteLanding || {};

MeteoriteLanding.Config = {
  'data_url' : 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json'
};

MeteoriteLanding.MapData = (function(){
  var config = MeteoriteLanding.Config;
	
  var url = config.data_url;
  
  function drawChart() { 
    var width = '100%', height = '100%', hue = 0, colors = {}, meteorites;

    var projection = d3.geoMercator()
      .translate([800,575])
      .scale(300);

    var zoom = d3.zoom()
      .scaleExtent([.5, 18]);
    d3.zoomTransform(zoom)
      .scale(1)
      .translate([0, 0]);

    var path = d3.geoPath()
      .projection(projection);

    var svg = d3.select('#container')
      .append('svg')
      .attr('width', '100%')

    svg.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', '#266D98')
      .call(zoom)

    d3.select(window).on("resize", sizeChange);

    var div = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    var map = svg.append('g');

    // Map of earth
    d3.json('https://d3js.org/world-50m.v1.json', function(json) {
      map.selectAll('path')
        .data(topojson.feature(json, json.objects.countries).features)
        .enter()
        .append('path')
        .attr('fill', '#95E1D3')
        .attr('stroke', '#266D98')
        .attr('d', path)
    });

    d3.json(url, function(data) {

      data.features.sort(function(a,b) {
        return new Date(a.properties.year) - new Date(b.properties.year);
      });

      data.features.map(function(e) {
        hue+=.35;
        colors[e.properties.year] = hue;
        e.color = 'hsl(' + hue + ',100%, 50%)';
      });

      data.features.sort(function(a,b) {
        return b.properties.mass - a.properties.mass
      });

      meteorites = svg.append('g')
      .selectAll('path')
        .data(data.features)
        .enter()
          .append('circle')
          .attr('cx', function(d) { return projection([d.properties.reclong,d.properties.reclat])[0] })
          .attr('cy', function(d) { return projection([d.properties.reclong,d.properties.reclat])[1] })
          .attr('r', function(d) { 
            var range = 718750/2/2;
        
            if (d.properties.mass <= range) return 2;
            else if (d.properties.mass <= range*2) return 10;
            else if (d.properties.mass <= range*3) return 20;
            else if (d.properties.mass <= range*20) return 30;
            else if (d.properties.mass <= range*100) return 40;
            return 50;
          })
          .attr('fill-opacity', function(d) {
            var range = 718750/2/2;
            if (d.properties.mass <= range) return 1;
            return .5;
          })
          .attr('stroke-width', 1)
          .attr('stroke', '#EAFFD0')
          .attr('fill', function(d) { return d.color })
          .on('mouseover', function(d) {
            d3.select(this).attr('d', path).style('fill', 'black');

            div.transition()
              .duration(200)
              .style('opacity', .9);
            div.html( '<span class="def">Name:</span> ' + d.properties.name + '<br>' +
                      '<span class="def">Year:</span> ' + new Date(d.properties.year).getFullYear() + '<br>' +
                      '<span class="def">Mass:</span> ' + d.properties.mass + '(g)<br>' + 
                      '<span class="def">Fall:</span> ' + d.properties.fall + '<br>' +
                      '<span class="def">Nametype:</span> ' + d.properties.nametype + '<br>' +
                      '<span class="def">Recclass:</span> ' + d.properties.recclass + '<br>' + 
                      '<span class="def">Reclat:</span> ' + d.properties.reclat + '<br>')
              .style('left', (d3.event.pageX+30) + 'px')
              .style('top', (d3.event.pageY/1.5) + 'px')
          })
          .on('mouseout', function(d) {
            d3.select(this).attr('d', path).style('fill', function(d) { return d.properties.hsl });

            div.transition()
              .duration(500)
              .style('opacity', 0);
          });
      
      sizeChange();
    });

    function sizeChange() {
      var container = document.getElementById("container");
      var containerWidth = container.scrollWidth;
      d3.selectAll("g").attr("transform", "scale(" + containerWidth / 1900 + ")");
      document.querySelector("svg").style.height = containerWidth / 2 + "px";
    }
  } 
  	
  return {
    draw: function() {
	    return drawChart();
	  }
  };
})();

MeteoriteLanding.MapData.draw();