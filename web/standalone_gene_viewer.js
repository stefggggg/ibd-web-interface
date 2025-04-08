// Simplified standalone script for gene expression visualization
// This version works without external dependencies and is designed for static deployment

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log("Initializing standalone gene expression viewer...");
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize with default gene (TNF)
    updateGeneExpression('TNF');
});

// Set up event listeners for the form controls
function setupEventListeners() {
    // Gene input form
    const geneForm = document.getElementById('geneExpressionForm');
    if (geneForm) {
        geneForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const geneInput = document.getElementById('geneInput').value;
            updateGeneExpression(geneInput);
        });
    }
    
    // Update button
    const updateButton = document.getElementById('updateGeneButton');
    if (updateButton) {
        updateButton.addEventListener('click', function() {
            const geneInput = document.getElementById('geneInput').value;
            updateGeneExpression(geneInput);
        });
    }
    
    // Quick search form
    const quickSearchForm = document.getElementById('quickSearchForm');
    if (quickSearchForm) {
        quickSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const geneSearch = document.getElementById('geneSearch').value;
            
            // Update the gene input field
            document.getElementById('geneInput').value = geneSearch;
            
            // Update visualization
            updateGeneExpression(geneSearch);
            
            // Navigate to gene expression section
            document.querySelector('a[href="#gene-expression"]').click();
        });
    }
    
    // Quick search button
    const quickSearchButton = document.getElementById('quickSearchButton');
    if (quickSearchButton) {
        quickSearchButton.addEventListener('click', function() {
            const geneSearch = document.getElementById('geneSearch').value;
            
            // Update the gene input field
            document.getElementById('geneInput').value = geneSearch;
            
            // Update visualization
            updateGeneExpression(geneSearch);
            
            // Navigate to gene expression section
            document.querySelector('a[href="#gene-expression"]').click();
        });
    }
}

// Update gene expression visualization
function updateGeneExpression(gene) {
    console.log("Updating gene expression for: " + gene);
    
    // Get the plot container
    const plotContainer = document.getElementById('expressionPlot');
    if (!plotContainer) {
        console.error("Plot container not found");
        return;
    }
    
    // Clear previous content
    plotContainer.innerHTML = '';
    
    // Show loading message
    plotContainer.innerHTML = '<div class="text-center p-5"><div class="spinner-border text-primary" role="status"></div><p class="mt-3">Loading gene expression data...</p></div>';
    
    // Simulate network delay
    setTimeout(function() {
        // Get gene expression data
        const expressionData = getGeneExpressionData(gene);
        
        if (!expressionData) {
            plotContainer.innerHTML = `<div class="alert alert-warning">Gene ${gene} not found in dataset. Try one of these genes: TNF, IL1B, IL6, IL10, IL17A, FOXP3, IFNG, TLR4, MUC2, CLDN1</div>`;
            return;
        }
        
        // Create visualization
        createGeneExpressionVisualization(plotContainer, gene, expressionData);
    }, 500);
}

// Get gene expression data for a specific gene
function getGeneExpressionData(gene) {
    // Predefined gene expression data
    const geneData = {
        'TNF': {
            'CD45RBHigh T cell': { 'Control': 10, 'Week6': 45 },
            'Acute DSS': { 'Control': 12, 'DSS': 60 },
            'Chronic DSS': { 'Control': 11, 'Chronic DSS': 40 },
            'IL-10KO': { 'WT': 15, 'IL10KO': 55 },
            'Human UC': { 'Control': 18, 'UC': 50 },
            'Human CD': { 'Control': 20, 'CD': 65 }
        },
        'IL1B': {
            'CD45RBHigh T cell': { 'Control': 15, 'Week6': 70 },
            'Acute DSS': { 'Control': 18, 'DSS': 90 },
            'Chronic DSS': { 'Control': 16, 'Chronic DSS': 65 },
            'IL-10KO': { 'WT': 20, 'IL10KO': 75 },
            'Human UC': { 'Control': 25, 'UC': 80 },
            'Human CD': { 'Control': 22, 'CD': 85 }
        },
        'IL6': {
            'CD45RBHigh T cell': { 'Control': 8, 'Week6': 55 },
            'Acute DSS': { 'Control': 10, 'DSS': 75 },
            'Chronic DSS': { 'Control': 9, 'Chronic DSS': 50 },
            'IL-10KO': { 'WT': 12, 'IL10KO': 60 },
            'Human UC': { 'Control': 15, 'UC': 65 },
            'Human CD': { 'Control': 14, 'CD': 70 }
        },
        'IL10': {
            'CD45RBHigh T cell': { 'Control': 25, 'Week6': 10 },
            'Acute DSS': { 'Control': 28, 'DSS': 12 },
            'Chronic DSS': { 'Control': 26, 'Chronic DSS': 15 },
            'IL-10KO': { 'WT': 30, 'IL10KO': 0 },
            'Human UC': { 'Control': 35, 'UC': 18 },
            'Human CD': { 'Control': 32, 'CD': 14 }
        },
        'IL17A': {
            'CD45RBHigh T cell': { 'Control': 5, 'Week6': 35 },
            'Acute DSS': { 'Control': 6, 'DSS': 25 },
            'Chronic DSS': { 'Control': 5, 'Chronic DSS': 30 },
            'IL-10KO': { 'WT': 7, 'IL10KO': 40 },
            'Human UC': { 'Control': 8, 'UC': 30 },
            'Human CD': { 'Control': 7, 'CD': 45 }
        },
        'FOXP3': {
            'CD45RBHigh T cell': { 'Control': 20, 'Week6': 8 },
            'Acute DSS': { 'Control': 22, 'DSS': 10 },
            'Chronic DSS': { 'Control': 21, 'Chronic DSS': 12 },
            'IL-10KO': { 'WT': 25, 'IL10KO': 15 },
            'Human UC': { 'Control': 28, 'UC': 14 },
            'Human CD': { 'Control': 26, 'CD': 10 }
        },
        'IFNG': {
            'CD45RBHigh T cell': { 'Control': 12, 'Week6': 50 },
            'Acute DSS': { 'Control': 14, 'DSS': 40 },
            'Chronic DSS': { 'Control': 13, 'Chronic DSS': 45 },
            'IL-10KO': { 'WT': 16, 'IL10KO': 55 },
            'Human UC': { 'Control': 18, 'UC': 45 },
            'Human CD': { 'Control': 17, 'CD': 60 }
        },
        'TLR4': {
            'CD45RBHigh T cell': { 'Control': 30, 'Week6': 60 },
            'Acute DSS': { 'Control': 32, 'DSS': 70 },
            'Chronic DSS': { 'Control': 31, 'Chronic DSS': 65 },
            'IL-10KO': { 'WT': 35, 'IL10KO': 75 },
            'Human UC': { 'Control': 38, 'UC': 70 },
            'Human CD': { 'Control': 36, 'CD': 80 }
        },
        'MUC2': {
            'CD45RBHigh T cell': { 'Control': 100, 'Week6': 40 },
            'Acute DSS': { 'Control': 110, 'DSS': 30 },
            'Chronic DSS': { 'Control': 105, 'Chronic DSS': 35 },
            'IL-10KO': { 'WT': 120, 'IL10KO': 50 },
            'Human UC': { 'Control': 130, 'UC': 25 },
            'Human CD': { 'Control': 125, 'CD': 45 }
        },
        'CLDN1': {
            'CD45RBHigh T cell': { 'Control': 80, 'Week6': 30 },
            'Acute DSS': { 'Control': 85, 'DSS': 25 },
            'Chronic DSS': { 'Control': 82, 'Chronic DSS': 28 },
            'IL-10KO': { 'WT': 90, 'IL10KO': 35 },
            'Human UC': { 'Control': 95, 'UC': 20 },
            'Human CD': { 'Control': 92, 'CD': 30 }
        }
    };
    
    return geneData[gene];
}

// Create gene expression visualization
function createGeneExpressionVisualization(container, gene, data) {
    // Clear container
    container.innerHTML = '';
    
    // Create SVG element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "500");
    svg.style.fontFamily = "Arial, sans-serif";
    container.appendChild(svg);
    
    // Get container dimensions
    const containerWidth = container.clientWidth;
    const containerHeight = 500;
    
    // Set margins
    const margin = { top: 50, right: 30, bottom: 80, left: 60 };
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;
    
    // Create group element for the chart
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("transform", `translate(${margin.left},${margin.top})`);
    svg.appendChild(g);
    
    // Add title
    const title = document.createElementNS("http://www.w3.org/2000/svg", "text");
    title.setAttribute("x", width / 2);
    title.setAttribute("y", -20);
    title.setAttribute("text-anchor", "middle");
    title.setAttribute("font-size", "18px");
    title.setAttribute("font-weight", "bold");
    title.textContent = `Expression of ${gene}`;
    g.appendChild(title);
    
    // Prepare data for visualization
    const barData = [];
    
    // For each model
    for (const model in data) {
        // For each condition
        for (const condition in data[model]) {
            barData.push({
                label: `${model} - ${condition}`,
                value: data[model][condition],
                model: model,
                condition: condition
            });
        }
    }
    
    // Sort bars by model and condition
    barData.sort((a, b) => {
        if (a.model === b.model) {
            return a.condition.localeCompare(b.condition);
        }
        return a.model.localeCompare(b.model);
    });
    
    // Define scales
    const xScale = width / barData.length;
    const maxValue = Math.max(...barData.map(d => d.value));
    const yScale = height / maxValue;
    
    // Define colors for conditions
    const conditionColors = {
        'Control': '#1f77b4',
        'Week6': '#ff7f0e',
        'DSS': '#2ca02c',
        'Chronic DSS': '#d62728',
        'WT': '#9467bd',
        'IL10KO': '#8c564b',
        'UC': '#e377c2',
        'CD': '#7f7f7f'
    };
    
    // Create bars
    barData.forEach((d, i) => {
        const bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        const barWidth = xScale * 0.8;
        const barHeight = d.value * yScale;
        const x = i * xScale + (xScale - barWidth) / 2;
        const y = height - barHeight;
        
        bar.setAttribute("x", x);
        bar.setAttribute("y", y);
        bar.setAttribute("width", barWidth);
        bar.setAttribute("height", barHeight);
        bar.setAttribute("fill", conditionColors[d.condition]);
        
        // Add tooltip on hover
        bar.setAttribute("data-label", d.label);
        bar.setAttribute("data-value", d.value);
        bar.addEventListener("mouseover", showTooltip);
        bar.addEventListener("mouseout", hideTooltip);
        
        g.appendChild(bar);
        
        // Add value label
        const valueLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
        valueLabel.setAttribute("x", x + barWidth / 2);
        valueLabel.setAttribute("y", y - 5);
        valueLabel.setAttribute("text-anchor", "middle");
        valueLabel.setAttribute("font-size", "12px");
        valueLabel.textContent = d.value.toFixed(1);
        g.appendChild(valueLabel);
    });
    
    // Create x-axis
    const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "g");
    xAxis.setAttribute("transform", `translate(0,${height})`);
    g.appendChild(xAxis);
    
    // Add x-axis labels
    barData.forEach((d, i) => {
        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        const x = i * xScale + xScale / 2;
        const y = 10;
        
        label.setAttribute("x", x);
        label.setAttribute("y", y);
        label.setAttribute("text-anchor", "end");
        label.setAttribute("transform", `rotate(-45, ${x}, ${y})`);
        label.setAttribute("font-size", "12px");
        label.textContent = d.label;
        xAxis.appendChild(label);
    });
    
    // Create y-axis
    const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.appendChild(yAxis);
    
    // Add y-axis line
    const yAxisLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    yAxisLine.setAttribute("x1", 0);
    yAxisLine.setAttribute("y1", 0);
    yAxisLine.setAttribute("x2", 0);
    yAxisLine.setAttribute("y2", height);
    yAxisLine.setAttribute("stroke", "black");
    yAxis.appendChild(yAxisLine);
    
    // Add y-axis ticks and labels
    const numTicks = 5;
    for (let i = 0; i <= numTicks; i++) {
        const tickValue = (maxValue / numTicks) * i;
        const y = height - tickValue * yScale;
        
        // Add tick
        const tick = document.createElementNS("http://www.w3.org/2000/svg", "line");
        tick.setAttribute("x1", -5);
        tick.setAttribute("y1", y);
        tick.setAttribute("x2", 0);
        tick.setAttribute("y2", y);
        tick.setAttribute("stroke", "black");
        yAxis.appendChild(tick);
        
        // Add label
        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        label.setAttribute("x", -10);
        label.setAttribute("y", y + 5);
        label.setAttribute("text-anchor", "end");
        label.setAttribute("font-size", "12px");
        label.textContent = tickValue.toFixed(0);
        yAxis.appendChild(label);
    }
    
    // Add y-axis label
    const yAxisLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
    yAxisLabel.setAttribute("transform", `rotate(-90)`);
    yAxisLabel.setAttribute("x", -height / 2);
    yAxisLabel.setAttribute("y", -40);
    yAxisLabel.setAttribute("text-anchor", "middle");
    yAxisLabel.setAttribute("font-size", "14px");
    yAxisLabel.textContent = "Expression Level";
    g.appendChild(yAxisLabel);
    
    // Add legend
    const legendGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    legendGroup.setAttribute("transform", `translate(${width - 150}, 0)`);
    g.appendChild(legendGroup);
    
    // Get unique conditions
    const conditions = [...new Set(barData.map(d => d.condition))];
    
    // Add legend items
    conditions.forEach((condition, i) => {
        const legendItem = document.createElementNS("http://www.w3.org/2000/svg", "g");
        legendItem.setAttribute("transform", `translate(0, ${i * 20})`);
        legendGroup.appendChild(legendItem);
        
        // Add color box
        const colorBox = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        colorBox.setAttribute("x", 0);
        colorBox.setAttribute("y", 0);
        colorBox.setAttribute("width", 15);
        colorBox.setAttribute("height", 15);
        colorBox.setAttribute("fill", conditionColors[condition]);
        legendItem.appendChild(colorBox);
        
        // Add label
        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        label.setAttribute("x", 20);
        label.setAttribute("y", 12);
        label.setAttribute("font-size", "12px");
        label.textContent = condition;
        legendItem.appendChild(label);
    });
    
    // Create tooltip element
    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.style.position = "absolute";
    tooltip.style.padding = "10px";
    tooltip.style.background = "rgba(0, 0, 0, 0.8)";
    tooltip.style.color = "white";
    tooltip.style.borderRadius = "5px";
    tooltip.style.pointerEvents = "none";
    tooltip.style.opacity = "0";
    tooltip.style.transition = "opacity 0.3s";
    document.body.appendChild(tooltip);
    
    // Show tooltip function
    function showTooltip(event) {
        const label = event.target.getAttribute("data-label");
        const value = event.target.getAttribute("data-value");
        
        tooltip.inner
(Content truncated due to size limit. Use line ranges to read in chunks)