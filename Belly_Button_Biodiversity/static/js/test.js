
function buildCharts(sample) 
{
    console.log("SOMEONE clicked on drop down")
   urlz = `/samples/${sample}`;
    var htm_list = d3.select("#pie");
    htm_list.html("")
      d3.json(urlz).then(function(response) 
        {
          var infos = response ;
          var labelz = [];
          Object.entries(infos).forEach(([k,v]) =>
            {
              labelz.push(v.slice(0,10));
            });     
          console.log("this is labelz");
          console.log(labelz[0]);
          var trace1 = 
                {
                  labels: labelz[0],
                  values: labelz[2],
                  type: "pie"
                };
          plot_data = [ trace1]  
          var layout = 
              {
                title: "Pie",  // barmode: "group"
              };
          Plotly.newPlot("pie", plot_data, layout);
        });
}



///// buildCharts HERE:

  
function buildCharts(sample) {

    // @TODO: Use `d3.json` to fetch the sample data for the plots
    var url = `/samples/${sample}`;
    // var htm_list = d3.select("#pie");
    // htm_list.html("")
    // Fetch the JSON data and console log it
    // .then is Asynchronus call to request the data and keep going while waiting for data
  // var samplesMapped = [];
  // var sampleValues = [];
  
  d3.json(url).then(function(data) {
      
    // Grab values from the data json object to build the plots
    // var sampleValues = data.sample_values;
    // var sampleValues = unpack(data.sample_values, 0);
  
    let sampleValues = data.sample_values.slice(0, 10);
    let otuIds = data.otu_ids.slice(0, 10);
  
    //   console.log(sampleValues);
    //   sampleValues.reverse();
    // var sampleValues = data.sample_values
    // sampleValues.sort();
      console.log(sampleValues);
      // var samples_pie = d3.select("#pie");
      // samples_pie.html("");
  
      function init() {
        var data = [{
          values: sampleValues,
          labels: otuIds,
          type: "pie"
        }];
      
        var layout = {
          height: 600,
          width: 800
        };
      
        // Plotly.plot("pie", data, layout);
        Plotly.newPlot("pie", data, layout);

        
      }
  
    return  init()
  });
}


/////////////////////////////
//// current: removed the init() now the html clear works too
//////////////////////
function buildCharts(sample) {

    // @TODO: Use `d3.json` to fetch the sample data for the plots
    var url = `/samples/${sample}`;
    var htm_list = d3.select("#pie");
    htm_list.html("")
  d3.json(url).then(function(data) {
  
    let sampleValues = data.sample_values.slice(0, 10);
    let otuIds = data.otu_ids.slice(0, 10);
  
      console.log(sampleValues);
  
      // function init() {
        var data = [{
          values: sampleValues,
          labels: otuIds,
          type: "pie"
        }];
      
        var layout = {
          title: "Pie",
          // height: 600,
          // width: 800
        };
      
        Plotly.newPlot("pie", data, layout);
    //   }
    // return  init()
  });
  }