
//create function for demographic section
function getData(id) {
    d3.json("samples.json").then((data) => {
        var demoData=data.metadata
        // console.log(demoData)

        //Filter data by id
        var info = demoData.filter(demo => demo.id.toString() === id)[0];
     
         //append date to demographics tag
         var demographicInfo = d3.select("#sample-metadata");

         // Empty the demographic info panel each time before getting new id info
         demographicInfo.html("");

        //Create loop to append to array for charting
        Object.entries(info).forEach(([key, value]) => {
            demographicInfo.append("h5").text(`${key}: ${value}`);
        })
      
        
    
    })


}


//create function for building plots advised by tutor
function buildChart(id){
    //Read in sample data
    d3.json("samples.json").then(data =>{
        
        //filter data by id
        var data = data.samples.filter(s => s.id.toString() === id)[0];
        
        //slice data for top 10 values
        var values=data.sample_values.slice(0,10).reverse();

        var ids=data.otu_ids.slice(0,10);

        var labels=data.otu_labels.slice(0,10);
    
    
        //build bar chart
        var trace1 = {
            x: values,
            y: ids,
            text: labels,
            title: "Top 10 OTU IDs",
            type: "bar",
            orientation: "h"
          };
        
        
        var chartData = [trace1];
        
        
        var layout = {
                margin: {
                l: 100,
                r: 100,
                t: 20,
                b: 50
                }
          };
        
        // Render the plot to the div tag with id "bar"
        Plotly.newPlot("bar", chartData, layout);


        //build bubble chart
            var trace2 = {
                x: data.otu_ids,
                y: data.sample_values,
                mode: "markers",
                marker: {
                    size: data.sample_values,
                    color: data.otu_ids
                },
                text: data.otu_labels
    
            };
    
            // set the layout for the bubble plot
            var layout = {
                xaxis:{title: "OTU ID"},
                height: 600,
                width: 1300
            };
    
            // create the data variable 
            var data1 = [trace2];
    
            // create the bubble plot
            Plotly.newPlot("bubble", data1, layout); 
        
        
         })

}

    
function init() {
        // Assign the value of the dropdown menu option to a variable
        var dropdownMenu = d3.select("#selDataset");

        //read in data and append values to dropdown 
        d3.json("samples.json").then(sampleName =>{
            sampleName.names.forEach((name) =>{
                dropdownMenu.append("option").text(name).property("value", name)
        })
         
        //call functions to show plots and ids
        const sampleOne=sampleName.names[0];
        buildChart(sampleOne)
        getData(sampleOne);      
    
             })

            }
            function optionChanged(id) {
                buildChart(id)
                getData(id);
            
            }
    
            
        
//initiate page
    init();