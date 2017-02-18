var datasetI, datasetII, datasetIII, datasetIV;
// Put your part one code here ***********************
d3.csv('data/anscombe_II.csv', function(csvData) {
    var datasetI = csvData;
    checkDataset(datasetI);
    floatedChartInit(datasetI, 'x', 'Anscombe I');
})

d3.csv('data/anscombe_II.csv', function(csvData) {
    var datasetII = csvData;
    checkDataset(datasetII);
    floatedChartInit(datasetII, 'x', 'Anscombe II');
})
d3.csv('data/anscombe_III.csv', function(csvData) {
    var datasetIII = csvData;
    checkDataset(datasetIII);
    barChartInit(datasetIII, 'x');
    scatterPlotInit(datasetIII, 'x');
    floatedChartInit(datasetIII, 'x', 'Anscombe III');
})
d3.csv('data/anscombe_IV.csv', function(csvData) {
    var datasetIV = csvData;
    checkDataset(datasetIV);
    floatedChartInit(datasetIV, 'x', 'Anscombe IV');
})
// Leave this to test your data uploading. All data uploading should be above this line
function checkDataset(dataset) {
    if (dataset.length == 11)
        $('#partOne').append('<p>data loaded correctly</p>');
    else
        $('#partOne').append('<p>data loaded incorrectly. Try using the debugger to help you find the bug!</p>');
}
// Put your part two code here ***********************

var w = 700; // Width of our visualization
var h = 500; // Height of our visualization
var xOffset = 40; // Space for x-axis labels
var yOffset = 100; // Space for y-axis labels
var margin = 10; // Margin around visualization
var vals = ['x', 'y']; // List of data attributes
var xVal = vals[0]; // Value to plot on x-axis
var yVal = vals[1]; // Value to plot on y-axis


function barChartInit(dataset, value) {

        //console.log(dataset);

        //set the scales to linear   code from class tutorial
        var xScale = d3.scale.linear()
                        //   .domain( [d3.min( dataset, function( d ){
                        //    return parseFloat( d['x'] );
                        //  } )-1, d3.max( dataset, function( d ){
                        //    return parseFloat( d['x'] );
                        //  } )+1] )
                        //
                        //above code does not place bars in the correct position
                        //hard code domain instead
                        .domain([0, 11]) //hard code domain
                        .range([xOffset + margin, w - margin]);

        var yScale = d3.scale.linear()
                        .domain([d3.min(dataset, function(d) {
                            return parseFloat(d[yVal]);
                        })-1, d3.max(dataset, function(d) {
                            return parseFloat(d[yVal]);
                        })+1])
                        .range([h - yOffset - margin, margin]);
        // SVG element to contain our visualization
        //code from tutorial
        var barSvg = d3.select('#barchart').append('svg:svg')
        //var svg = d3.select('#pointsSVG').append('svg:svg')
                      .attr('width', w)
                      .attr('height', h);
        // Specify the axis scale and general position
        var xAxis = d3.svg.axis()
                          .scale(xScale)
                          .orient('bottom')
                          .ticks(5);

        // Add a graphics element to hold the axis we created above (xAxis)
        var xAxisG = barSvg.append('g')
                        .attr('class', 'axis')
                        .attr('transform', 'translate(0, ' + (h - yOffset) + ')')
                        .call(xAxis);
                        //.style?
        var yAxis = d3.svg.axis()
                          .scale(yScale)
                          .orient('left')
                          .ticks(5);

        var yAxisG = barSvg.append('g')
                        .attr('class', 'axis')
                        .attr('transform', 'translate(' + xOffset + ', 0)')
                        .call(yAxis);
        // Axis labels
        var xLabel = barSvg.append('text')
                        .attr('class', 'label')
                        .attr('x', w/2)
                        .attr('y', h - margin/2)
                        .text(xVal);
        var yLabel = barSvg.append('text')
                        .attr('class', 'label')
                        .attr('x', xOffset/2)
                        .attr('y', h/2)
                        .text(yVal);

        //Maximum value that bar can be
        var maxVal = d3.max(dataset, function(d) { return parseFloat(d[value]); })+1;

        //bars on graph
        //code used from https://bost.ocks.org/mike/bar/
        var bar = barSvg.selectAll('rect')
            .data(dataset)
            .enter().append('rect')

            bar.attr('id', function(d, i) { return 'rect_' + i; });
            bar
                .attr('class', 'bar')
                .attr('width', 30)
                .attr('height', function(d) { return yScale(maxVal - d[xVal])})
                .attr('x', function(d, i) {return (xScale(i))})
                .attr('y', function(d) {return (h - yOffset - yScale(maxVal - d[xVal]))})
                .style('fill', 'green');

            bar.append('text')
                .attr('x', function(d) { return (d[value]) - 3; })
                .attr('y', maxVal / 2)
                .attr('dy', '.35em')
                .text(function(d) { return d[value]; });

}
// Put your part three & four code here ***********************
function scatterPlotInit(dataset, value){

        //console.log(dataset);

        //set the scales to linear   code from class tutorial
        var xScale = d3.scale.linear()
                       .domain([d3.min( dataset, function(d){
                                return parseFloat(d['x']);
                              })-1, d3.max(dataset, function(d){
                                return parseFloat(d['x']);
                              })+1] )
                       .range([xOffset, w - margin]);
        var yScale = d3.scale.linear()
                      .domain([d3.min( dataset, function(d){
                               return parseFloat(d['x']);
                             })-1, d3.max(dataset, function(d){
                               return parseFloat(d['x']);
                             })+1])
                      .range([h - yOffset, margin]);

        //needs to use the y values for scaling
        var yPointScale = d3.scale.linear()
                   .domain([d3.min( dataset, function(d){
                            return parseFloat(d['y']);
                          })-1, d3.max( dataset, function( d ){
                            return parseFloat( d['y'] );
                          })+1])
                   .range([h - yOffset, margin]);

        // SVG element to contain our visualization
        //code from tutorial
        var pointSvg = d3.select('#scatterplot').append('svg:svg')
        //var svg = d3.select('#pointsSVG').append('svg:svg')
                      .attr('width', w)
                      .attr('height', h);

        // Specify the axis scale and general position
        var xAxis = d3.svg.axis()
                          .scale(xScale)
                          .orient('bottom')
                          .ticks(5);

        // Add a graphics element to hold the axis we created above (xAxis)
        var xAxisG = pointSvg.append('g')
                        .attr('class', 'axis')
                        .attr('transform', 'translate(0, ' + (h - yOffset) + ')')
                        .call(xAxis);
                        //.style?
        var yAxis = d3.svg.axis()
                          .scale(yScale)
                          .orient('left')
                          .ticks(5);

        var yAxisG = pointSvg.append('g')
                        .attr('class', 'axis')
                        .attr('transform', 'translate(' + xOffset + ', 0)')
                        .call(yAxis);
        // Axis labels
        var xLabel = pointSvg.append('text')
                        .attr('class', 'label')
                        .attr('x', w/2)
                        .attr('y', h - margin/2)
                        .text(xVal);
        var yLabel = pointSvg.append('text')
                        .attr('class', 'label')
                        .attr('x', xOffset/2)
                        .attr('y', h/2)
                        .text(yVal);

        //Maximum value that bar can be
        var maxVal = d3.max(dataset, function(d) { return parseFloat(d[value]); })+1;


        //code from in class tutorial from Danielle Szafir
        point = pointSvg.selectAll('.point') // Select elements
        			.data(dataset);		// Bind data to elements

        	point.enter().append('svg:circle');	// Create new elements if needed

        	// Update our selection
        	point.attr('id', function(d, i) { return 'point_' + i; });
          point
            .attr('class', 'point')									// Give it a class
        		.attr('cx', function(d) { return xScale(d[xVal]); })	// x-coordinate
        		.attr('cy', function(d) { return yPointScale(d[yVal]); })	// y-coordinate
        		.style('fill','green')									// color
        		.attr('r', 5)
          
          //part 3 code  http://stackoverflow.com/questions/10805184/show-data-on-mouseover-of-circle
            .on( 'click', function(d, i){
            d3.select( '#scatterLabel' )
              .text('coordinates: (' + d['x'] + ', ' + d['y']+')')
            })
            .on('mouseover', function(){
                d3.select(this).style('fill', 'blue');
                })
            .on('mouseout', function() {
                d3.select(this).style('fill', 'green');
                })
                //Part 5 bell
                point.append('svg:title')
              		.text(function(d) {
                      console.log(d['x']);
                      return ('('+d['x'] + ', '+d['y']+')');
                })
}
// Put your part five code here ***********************
function floatedChartInit(dataset, value, name){

    var w = 200; // Width of our visualization
    var h = 175; // Height of our visualization

    var xScale = d3.scale.linear()
                   .domain( [d3.min( dataset, function( d ){
                            return parseFloat( d['x'] );
                          } )-1, d3.max( dataset, function( d ){
                            return parseFloat( d['x'] );
                          } )+1] )
                   .range( [xOffset, w - margin] );
    var yScale = d3.scale.linear()
                  .domain( [d3.min( dataset, function( d ){
                           return parseFloat( d['x'] );
                         } )-1, d3.max( dataset, function( d ){
                           return parseFloat( d['x'] );
                         } )+1] )
                  .range( [h - yOffset, margin] );

    //needs to use the y values for scaling
    var yPointScale = d3.scale.linear()
               .domain( [d3.min( dataset, function( d ){
                        return parseFloat( d['y'] );
                      } )-1, d3.max( dataset, function( d ){
                        return parseFloat( d['y'] );
                      } )+1] )
               .range( [h - yOffset, margin] );
    // SVG element to contain our visualization
    //code from tutorial
    var pointSvg = d3.select('#scatterplotSet').append('svg:svg')
                  .attr('width', w)
                  .attr('height', h);

    // Specify the axis scale and general position
    var xAxis = d3.svg.axis()
                      .scale(xScale)
                      .orient('bottom')
                      .ticks(5);

    // Add a graphics element to hold the axis we created above (xAxis)
    var xAxisG = pointSvg.append('g')
                    .attr('class', 'axis')
                    .attr('transform', 'translate(0, ' + (h - yOffset) + ')')
                    .call(xAxis);
                    //.style?
    var yAxis = d3.svg.axis()
                      .scale(yScale)
                      .orient('left')
                      .ticks(5);

    var yAxisG = pointSvg.append('g')
                    .attr('class', 'axis')
                    .attr('transform', 'translate(' + xOffset + ', 0)')
                    .call(yAxis);
    // Axis labels
    var xLabel = pointSvg.append('text')
                    .attr('class', 'label')
                    .attr('x', w/2)
                    .attr('y', h-60)
                    .text(xVal);

    var yLabel = pointSvg.append('text')
                    .attr('class', 'label')
                    .attr('x', xOffset/2)
                    .attr('y', h/2)
                    .text(yVal);

    //new var for label
    var Title = pointSvg.append('text')
                    .attr('class', 'label')
                    .attr('x', w/3.5)
                    .attr('y', h-30)
                    .text(name);

    //code from in class tutorial from Danielle Szafir
    point = pointSvg.selectAll('.point') // Select elements
          .data(dataset);		// Bind data to elements

      point.enter().append('svg:circle');	// Create new elements if needed

      // Update our selection
      point.attr('id', function(d, i) { return 'point_' + i; });
      point
        .attr('class', 'point')									// Give it a class
        .attr('cx', function(d) { return xScale(d[xVal]); })	// x-coordinate
        .attr('cy', function(d) { return yPointScale(d[yVal]); })	// y-coordinate
        .style('fill','green')									// color
        .attr('r', 5)
}
