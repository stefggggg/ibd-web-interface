// Add volcano plot and correlation analysis to the web interface

// Update the JavaScript to include volcano plot visualization
function initializeVolcanoPlot() {
    // Get the plot container
    const plotContainer = document.getElementById('volcanoPlot');
    
    // Default comparison to display
    const defaultComparison = 'il10ko_IL10KO_vs_WT';
    
    // Simulate volcano plot data
    const data = simulateVolcanoPlotData(defaultComparison);
    
    // Create the plot
    Plotly.newPlot(plotContainer, data.traces, data.layout);
}

function simulateVolcanoPlotData(comparison) {
    // Generate simulated volcano plot data
    const numPoints = 1000;
    const traces = [];
    
    // Generate random data points
    const log2FC = [];
    const negLogP = [];
    const genes = [];
    const colors = [];
    const sizes = [];
    
    // Seed for reproducibility
    Math.seedrandom('volcano-seed');
    
    for (let i = 0; i < numPoints; i++) {
        // Generate log2 fold change (-4 to 4)
        const fc = (Math.random() * 8) - 4;
        log2FC.push(fc);
        
        // Generate -log10(p-value) (0 to 6)
        let p;
        if (Math.abs(fc) > 2) {
            // Higher fold changes tend to have lower p-values
            p = Math.random() * 3 + 3;
        } else if (Math.abs(fc) > 1) {
            // Medium fold changes have medium p-values
            p = Math.random() * 3 + 1;
        } else {
            // Low fold changes have higher p-values
            p = Math.random() * 3;
        }
        negLogP.push(p);
        
        // Generate gene names
        genes.push(`Gene_${i+1}`);
        
        // Determine color based on significance and fold change
        let color;
        if (p > 1.3 && fc > 1) { // -log10(0.05) ≈ 1.3
            color = 'rgba(255, 0, 0, 0.7)'; // Red for up-regulated significant
        } else if (p > 1.3 && fc < -1) {
            color = 'rgba(0, 0, 255, 0.7)'; // Blue for down-regulated significant
        } else {
            color = 'rgba(128, 128, 128, 0.5)'; // Gray for non-significant
        }
        colors.push(color);
        
        // Determine size based on fold change magnitude
        const size = 5 + Math.abs(fc) * 2;
        sizes.push(size);
    }
    
    // Create scatter trace
    traces.push({
        x: log2FC,
        y: negLogP,
        mode: 'markers',
        type: 'scatter',
        text: genes,
        marker: {
            color: colors,
            size: sizes
        },
        hovertemplate: 
            '<b>%{text}</b><br>' +
            'log2FC: %{x:.2f}<br>' +
            '-log10(p): %{y:.2f}<br>' +
            '<extra></extra>'
    });
    
    // Add horizontal line for significance threshold
    traces.push({
        x: [-4, 4],
        y: [1.3, 1.3], // -log10(0.05) ≈ 1.3
        mode: 'lines',
        type: 'scatter',
        line: {
            color: 'rgba(0, 0, 0, 0.5)',
            width: 1,
            dash: 'dash'
        },
        hoverinfo: 'none',
        showlegend: false
    });
    
    // Add vertical lines for fold change thresholds
    traces.push({
        x: [-1, -1],
        y: [0, 6],
        mode: 'lines',
        type: 'scatter',
        line: {
            color: 'rgba(0, 0, 0, 0.5)',
            width: 1,
            dash: 'dash'
        },
        hoverinfo: 'none',
        showlegend: false
    });
    
    traces.push({
        x: [1, 1],
        y: [0, 6],
        mode: 'lines',
        type: 'scatter',
        line: {
            color: 'rgba(0, 0, 0, 0.5)',
            width: 1,
            dash: 'dash'
        },
        hoverinfo: 'none',
        showlegend: false
    });
    
    // Define layout
    const layout = {
        title: `Volcano Plot: ${comparison}`,
        xaxis: {
            title: 'log2 Fold Change',
            range: [-4.5, 4.5]
        },
        yaxis: {
            title: '-log10(p-value)',
            range: [0, 6.5]
        },
        hovermode: 'closest',
        shapes: [
            // Add regions for annotation
            {
                type: 'rect',
                xref: 'x',
                yref: 'y',
                x0: 1,
                y0: 1.3,
                x1: 4,
                y1: 6,
                fillcolor: 'rgba(255, 0, 0, 0.1)',
                line: {
                    width: 0
                }
            },
            {
                type: 'rect',
                xref: 'x',
                yref: 'y',
                x0: -4,
                y0: 1.3,
                x1: -1,
                y1: 6,
                fillcolor: 'rgba(0, 0, 255, 0.1)',
                line: {
                    width: 0
                }
            }
        ],
        annotations: [
            {
                x: 2.5,
                y: 5,
                xref: 'x',
                yref: 'y',
                text: 'Up-regulated<br>significant',
                showarrow: false,
                font: {
                    color: 'rgba(255, 0, 0, 0.7)'
                }
            },
            {
                x: -2.5,
                y: 5,
                xref: 'x',
                yref: 'y',
                text: 'Down-regulated<br>significant',
                showarrow: false,
                font: {
                    color: 'rgba(0, 0, 255, 0.7)'
                }
            }
        ]
    };
    
    return { traces, layout };
}

// Update the JavaScript to include correlation analysis visualization
function initializeCorrelationMatrix() {
    // Get the plot container
    const plotContainer = document.getElementById('correlationMatrixPlot');
    
    // Simulate correlation matrix data
    const data = simulateCorrelationMatrixData();
    
    // Create the plot
    Plotly.newPlot(plotContainer, data.traces, data.layout);
}

function simulateCorrelationMatrixData() {
    // Define models
    const models = [
        'CD45RBHigh T cell',
        'Acute DSS',
        'Chronic DSS',
        'IL-10KO',
        'Human UC',
        'Human CD'
    ];
    
    // Generate correlation matrix
    const correlationMatrix = [];
    
    // Seed for reproducibility
    Math.seedrandom('correlation-seed');
    
    // IL-10KO should have highest correlation with Human CD
    // CD45RBHigh should have high correlation with Human UC
    const baseCorrelations = {
        'CD45RBHigh T cell': { 'Human UC': 0.75, 'Human CD': 0.65 },
        'Acute DSS': { 'Human UC': 0.60, 'Human CD': 0.55 },
        'Chronic DSS': { 'Human UC': 0.65, 'Human CD': 0.70 },
        'IL-10KO': { 'Human UC': 0.70, 'Human CD': 0.80 }
    };
    
    // Generate full correlation matrix
    for (let i = 0; i < models.length; i++) {
        const row = [];
        for (let j = 0; j < models.length; j++) {
            if (i === j) {
                // Diagonal is always 1
                row.push(1);
            } else {
                // Check if we have a predefined correlation
                const model1 = models[i];
                const model2 = models[j];
                
                if (baseCorrelations[model1] && baseCorrelations[model1][model2]) {
                    // Use predefined correlation
                    row.push(baseCorrelations[model1][model2]);
                } else if (baseCorrelations[model2] && baseCorrelations[model2][model1]) {
                    // Use predefined correlation (symmetric)
                    row.push(baseCorrelations[model2][model1]);
                } else {
                    // Generate random correlation (0.5 to 0.9)
                    const correlation = 0.5 + Math.random() * 0.4;
                    row.push(correlation);
                }
            }
        }
        correlationMatrix.push(row);
    }
    
    // Create heatmap trace
    const traces = [{
        z: correlationMatrix,
        x: models,
        y: models,
        type: 'heatmap',
        colorscale: 'Viridis',
        zmin: 0,
        zmax: 1,
        hoverongaps: false,
        hovertemplate: 
            'Model 1: %{y}<br>' +
            'Model 2: %{x}<br>' +
            'Correlation: %{z:.2f}<br>' +
            '<extra></extra>'
    }];
    
    // Define layout
    const layout = {
        title: 'Gene Expression Correlation Between Models',
        xaxis: {
            title: 'Model'
        },
        yaxis: {
            title: 'Model'
        },
        annotations: []
    };
    
    // Add annotations for correlation values
    for (let i = 0; i < models.length; i++) {
        for (let j = 0; j < models.length; j++) {
            const value = correlationMatrix[i][j];
            const textColor = value > 0.75 ? 'white' : 'black';
            
            layout.annotations.push({
                x: models[j],
                y: models[i],
                text: value.toFixed(2),
                font: {
                    color: textColor
                },
                showarrow: false
            });
        }
    }
    
    return { traces, layout };
}

// Update the JavaScript to include PCA analysis visualization
function initializePCAPlot() {
    // Get the plot container
    const plotContainer = document.getElementById('pcaPlot');
    
    // Simulate PCA data
    const data = simulatePCAData();
    
    // Create the plot
    Plotly.newPlot(plotContainer, data.traces, data.layout);
}

function simulatePCAData() {
    // Define models and conditions
    const modelConditions = [
        { model: 'CD45RBHigh T cell', condition: 'Control' },
        { model: 'CD45RBHigh T cell', condition: 'Week6' },
        { model: 'Acute DSS', condition: 'Control' },
        { model: 'Acute DSS', condition: 'DSS' },
        { model: 'Chronic DSS', condition: 'Control' },
        { model: 'Chronic DSS', condition: 'Chronic_DSS' },
        { model: 'IL-10KO', condition: 'WT' },
        { model: 'IL-10KO', condition: 'IL10KO' },
        { model: 'Human UC', condition: 'Control' },
        { model: 'Human UC', condition: 'UC' },
        { model: 'Human CD', condition: 'Control' },
        { model: 'Human CD', condition: 'CD' }
    ];
    
    // Define colors for models
    const modelColors = {
        'CD45RBHigh T cell': 'rgba(31, 119, 180, 0.8)',
        'Acute DSS': 'rgba(255, 127, 14, 0.8)',
        'Chronic DSS': 'rgba(44, 160, 44, 0.8)',
        'IL-10KO': 'rgba(214, 39, 40, 0.8)',
        'Human UC': 'rgba(148, 103, 189, 0.8)',
        'Human CD': 'rgba(140, 86, 75, 0.8)'
    };
    
    // Define markers for conditions
    const conditionMarkers = {
        'Control': 'circle',
        'Week6': 'square',
        'DSS': 'diamond',
        'Chronic_DSS': 'triangle-up',
        'WT': 'triangle-down',
        'IL10KO': 'star',
        'UC': 'pentagon',
        'CD': 'hexagon'
    };
    
    // Generate PCA data
    // Seed for reproducibility
    Math.seedrandom('pca-seed');
    
    // Generate PC coordinates
    // We want disease conditions to cluster together and away from controls
    // Human IBD should be closer to IL-10KO and CD45RBHigh than to DSS models
    const pcaCoordinates = [];
    
    for (const mc of modelConditions) {
        let x, y;
        
        if (mc.condition === 'Control' || mc.condition === 'WT') {
            // Controls cluster on the left
            x = -5 + Math.random() * 2;
            y = -2 + Math.random() * 4;
        } else {
            // Disease conditions on the right, with specific patterns
            if (mc.model === 'IL-10KO' || mc.model === 'Human CD') {
                // IL-10KO and Human CD cluster together in upper right
                x = 3 + Math.random() * 2;
                y = 2 + Math.random() * 2;
            } else if (mc.model === 'CD45RBHigh T cell' || mc.model === 'Human UC') {
                // CD45RBHigh and Human UC cluster together in middle right
                x = 2 + Math.random() * 2;
                y = -1 + Math.random() * 2;
            } else {
                // DSS models in lower right
                x = 1 + Math.random() * 2;
                y = -3 + Math.random() * 2;
            }
        }
        
        pcaCoordinates.push({
            model: mc.model,
            condition: mc.condition,
            label: `${mc.model} - ${mc.condition}`,
            x: x,
            y: y
        });
    }
    
    // Create traces for each model
    const traces = [];
    const models = [...new Set(modelConditions.map(mc => mc.model))];
    
    for (const model of models) {
        const modelData = pcaCoordinates.filter(d => d.model === model);
        
        traces.push({
            x: modelData.map(d => d.x),
            y: modelData.map(d => d.y),
            mode: 'markers+text',
            type: 'scatter',
            name: model,
            text: modelData.map(d => d.condition),
            textposition: 'top',
            marker: {
                color: modelColors[model],
                size: 12,
                symbol: modelData.map(d => conditionMarkers[d.condition])
            },
            hovertemplate: 
                '<b>%{text}</b><br>' +
                'Model: ' + model + '<br>' +
                'PC1: %{x:.2f}<br>' +
                'PC2: %{y:.2f}<br>' +
                '<extra></extra>'
        });
    }
    
    // Define layout
    const layout = {
        title: 'PCA of Gene Expression Across Models and Conditions',
        xaxis: {
            title: 'PC1 (35.2% variance)',
            zeroline: true
        },
        yaxis: {
            title: 'PC2 (18.7% variance)',
            zeroline: true
        },
        hovermode: 'closest',
        legend: {
            title: {
                text: 'Model'
            }
        },
        annotations: [
            {
                x: 4,
                y: 3,
                xref: 'x',
                yref: 'y',
                text: 'IL-10KO & Human CD<br>cluster',
                showarrow: true,
                arrowhead: 2,
                ax: -30,
                ay: -30
            },
            {
                x: 3,
                y: 0,
                xref: 'x',
                yref: 'y',
                text: 'CD45RBHigh & Human UC<br>cluster',
                showarrow: true,
                arrowhead: 2,
                ax: -30,
                ay: -30
            },
            {
                x: 2,
                y: -3,
                xref: 'x',
                yref: 'y',
                text: 'DSS models<br>cluster',
                showarrow: true,
                arrowhead: 2,
                ax: -30,
                ay: 30
            },
            {
                x: -4,
                y: 0,
                xref: 'x',
                yref: 'y',
                text: 'Control<br>samples',
                showarrow: true,
                arrowhead: 2,
                ax: -30,
                ay: -30
            }
        ]
    };
    
    return { traces, layout };
}

// Add these functions to the initialization
document.addEventListener('DOMContentLoaded', function() {
    // Existing initialization code
    loadData();
    setupNavigation();
    initializePlots();
    
    // Add new initializations
    initializeVolcanoPlot();
    initializeCorrelationMatrix();
    initializePCAPlot();
});
