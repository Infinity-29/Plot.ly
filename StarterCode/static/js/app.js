var names = [];
function init() {
    d3.json("samples.json").then(function(data) {
      
        names = data.names;

        // drop down & for loop
        let DD = d3.select("#selDataset");
        names.forEach(function(name){
          DD.append("option").text(name).property("value", name);
        });

       });

      // 940 id for default value for initial launch
      demographicInfo(940);
      BarChartChart(940);
      bubbleChart(940);
      gaugeChart(940);

    
}

// Option selection
function optionChanged(select){
    demographicInfo(select);
    BarChartChart(select);
    bubbleChart(select);
    gaugeChart(select);
};


// bar chart
function BarChartChart(select){
    d3.json("samples.json").then(function(data) {
        samples = data.samples;

        // Filter the metadata
        let filterSample = samples.filter(function(f){return f.id == select});
        let filterSampleselect = filterSample[0];


        // Store the OTU Id
        let OTU_ID = filterSampleselect.otu_ids;
        for (let i = 0; i < OTU_ID.length; i++){
            OTU_ID[i] = "OTU " + OTU_ID[i]
        }

        let o_label = filterSampleselect.otu_labels;
        let samp_values = filterSampleselect.sample_values;

        let trace1 = {
            x: samp_values.slice(0,10).reverse(),
            y: OTU_ID.slice(0,10).reverse(),
            text: o_label.slice(0,10).reverse(),
            type: 'bar',
            orientation: 'h'
        }
        let graph_data = [trace1];

        Plotly.newPlot("bar", graph_data);


    });
};

// Function that  defines metadata
function demographicInfo(select){
  //Read in our JSON File
  d3.json("samples.json").then(function(data) {
      
      metadata = data.metadata;

      // Filter the metadata
      let filteredId  = metadata.filter(function(f){return f.id == select});
      let selection = filteredId [0];

      let Demographic_Info = d3.select("#sample-metadata");

      // Resetting Demographic_info to clear old selected data
      Demographic_Info.html("");

      Object.entries(selection).forEach(function([key, value]){return Demographic_Info.append("p").text(`${key}: ${value}`)
      });
  });
}

//  bubble chart
function bubbleChart(select){

    d3.json("samples.json").then(function(data) {
        samples = data.samples;

        let filterSample = samples.filter(function(f){return f.id == select});
        let filterSampleselect = filterSample[0];

        let OTU_ID = filterSampleselect.otu_ids;
        
        let yvalue = filterSampleselect.sample_values;

        let trace2 = {
            x: OTU_ID,
            y: yvalue,
            text: filterSampleselect.otu_labels,
            mode: "markers",
            marker:{
                color: OTU_ID,
                size: yvalue
            }
        }

        // Create the data object for plotly
        let graph2_data = [trace2];

        // Create the graph
        Plotly.newPlot("bubble", graph2_data);

    });
};

// gauge chart
function gaugeChart(select){

    d3.json("samples.json").then(function(data) {

        metadata = data.metadata;

        let filteredId  = metadata.filter(function(f){return f.id == select});
        let selection = filteredId [0];

        // Pulling out the wfreq item in the object
        let washFreq = selection.wfreq;

        let trace3 = {
            value: washFreq,
            title: {
                text: "Belly Button Washing Frequency<br><sup>Scrubs per Week</sup>"
            },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [null, 9]},
                bar: { color: "pink" },
                steps: [
                        { range: [0, 1], color: "#00ffff"},
                        { range: [1, 2], color: "#00e5e5"},
                        { range: [2, 3], color: "#00cccc"},
                        { range: [3, 4], color: "#00b2b2"},
                        { range: [4, 5], color: "#009999"},
                        { range: [5, 6], color: "#007f7f"},
                        { range: [6, 7], color: "#006666"},
                        { range: [7, 8], color: "#003333"},
                        { range: [8, 9], color: "#001919"}
                        ]
                    }
        }

        // Create plotly object
        let graph3_data = [trace3];

        Plotly.newPlot('gauge', graph3_data);
    });
}

init();