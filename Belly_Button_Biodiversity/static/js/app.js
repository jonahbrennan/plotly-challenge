function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  var url = `/metadata/${sample}`;
  var metaData = url;

  // Fetch the JSON data and console log it
  // .then is Asynchronus call to request the data and keep going while waiting for data
  d3.json(url).then(function(data) {
    // console.log(data);

  });
  
    // Use d3 to select the panel with id of `#sample-metadata`
    var sample_metadata_table = d3.select("#sample-metadata");
    // console.log(sample_metadata_table)

    // Use `.html("") to clear any existing metadata
    sample_metadata_table.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    d3.json(url).then((data) => {
      // var span = sample_metadata_table.append("span");
      Object.entries(data).forEach(([key, value]) => {
        var cell = sample_metadata_table.append("li");
        
        cell.text(key + ": " + value);

      });
      var scrubs = data.WFREQ;
      var data = [{
          domain: { x: [0, 1], y: [0, 1] },
          value: scrubs,
          title: { text: "Scrubs per Week" },
          type: "indicator",
          mode: "gauge+number+delta",
          delta: { reference: 10 },
          gauge: {
            axis: { range: [null, 9] },
            bar: { color: "cyan" },
            steps: [
              { range: [0, 1], color: "red" },
              { range: [1, 3], color: "orange" },
              { range: [3, 6], color: "yellow" },
              { range: [6, 9], color: "green" }
            ],
            threshold: {
              line: { color: "blue", width: 10 },
              thickness: 0.75,
              value: scrubs
            }}
        }];
      
      var layout = {  
                    plot_bgcolor: "rgba(0,0,0,0)",
                    paper_bgcolor: "rgba(0,0,0,0)",
                    margin: { t: 0, b: 0 }, 
                    font: { color: "darkblue", 
                    family: "Snowburst One" } 
                  }; // width: 600, height: 500,

      Plotly.newPlot('gauge', data, layout);
      
    });
    

}

///// build PIE Chart HERE:

function buildCharts(sample) {

  // Use `d3.json` to fetch the sample data for the plots
  var url = `/samples/${sample}`;
  var htm_list = d3.select("#pie");
  htm_list.html("")
  d3.json(url).then(function(data) {

  let sampleValues = data.sample_values.slice(0, 10);
  let otuIds = data.otu_ids.slice(0, 10);
  let otuLabels = data.otu_labels.slice(0, 10);
  let sampleValues1 = data.sample_values;
  let otuIds1 = data.otu_ids;
  let otuLabels1 = data.otu_labels;
  
    console.log(sampleValues);

    // function init() {
      var data = [{
        values: sampleValues,
        labels: otuIds,
        hovertext: otuLabels,
        type: "pie"
        
      }];
    
      var layout = {
        title: "Top Ten Organisms per Button",
        font: { color: "rgb(255, 217, 0)", family: "Snowburst One" } ,
        plot_bgcolor: "rgba(0,0,0,0)",
        paper_bgcolor: "rgba(0,0,0,0)",
        // height: 600,  
        // width: 800
      };
    
      Plotly.newPlot("pie", data, layout);

          // @TODO: Build a Bubble Chart using the sample data

        
    var trace1 = {
      x: otuIds1,
      y: sampleValues1,
      mode: 'markers',
      marker: {
        hovertext: otuLabels1,
        size: sampleValues1,
        color: otuIds1
      }
    };
    
    var data = [trace1];
    
    var layout = {
      title: 'Belly Size',
      showlegend: false,
      plot_bgcolor: "rgba(0,0,0,0)",
      paper_bgcolor: "rgba(0,0,0,0)",
      // height: 600,
      // width: 1200
    };
    
    Plotly.newPlot('bubble', data, layout);


  //   }
  // return  init()
});
}




function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
