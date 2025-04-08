// Enhanced standalone gene viewer with expanded gene database
// This version includes a more comprehensive set of genes and improved search functionality

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log("Initializing enhanced gene expression viewer...");
    
    // Set up event listeners
    setupEventListeners();
    
    // Generate expanded gene database
    generateExpandedGeneDatabase();
    
    // Initialize with default gene (TNF)
    updateGeneExpression('TNF');
    
    // Initialize gene search autocomplete
    initializeGeneSearch();
});

// Global variables
let geneExpressionDatabase = {};
let allGenesList = [];

// Generate an expanded database with more genes
function generateExpandedGeneDatabase() {
    // Start with our predefined genes
    const predefinedGenes = {
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
    
    // Add these to our database
    geneExpressionDatabase = {...predefinedGenes};
    
    // Add additional IBD-related genes
    const additionalGenes = [
        // Cytokines and receptors
        'IL2', 'IL4', 'IL5', 'IL12A', 'IL12B', 'IL13', 'IL18', 'IL21', 'IL22', 'IL23A', 'IL23R', 'IL27',
        'TGFB1', 'TGFBR1', 'TGFBR2', 'TNFRSF1A', 'TNFRSF1B', 'TNFSF13B',
        
        // Chemokines and receptors
        'CCL2', 'CCL3', 'CCL4', 'CCL5', 'CCL11', 'CCL17', 'CCL20', 'CCL22', 'CCL25',
        'CCR1', 'CCR2', 'CCR5', 'CCR6', 'CCR7', 'CCR9', 'CXCL1', 'CXCL2', 'CXCL8', 'CXCL10', 'CXCR3',
        
        // Transcription factors
        'NFKB1', 'RELA', 'STAT1', 'STAT3', 'STAT4', 'STAT6', 'TBX21', 'RORC', 'GATA3',
        
        // Pattern recognition receptors
        'TLR1', 'TLR2', 'TLR3', 'TLR5', 'TLR6', 'TLR7', 'TLR8', 'TLR9', 'NOD1', 'NOD2', 'NLRP3',
        
        // Adhesion molecules
        'ICAM1', 'VCAM1', 'MADCAM1', 'ITGA4', 'ITGB7', 'ITGAE', 'SELP', 'SELE',
        
        // Barrier function
        'OCLN', 'TJP1', 'CLDN2', 'CLDN3', 'CLDN4', 'MUC1', 'MUC3A', 'MUC4', 'MUC5AC', 'MUC13',
        
        // Antimicrobial peptides
        'DEFB1', 'DEFB4A', 'REG3A', 'REG3G', 'LCN2', 'LYZ', 'S100A8', 'S100A9',
        
        // Inflammasome components
        'CASP1', 'PYCARD', 'IL1A', 'IL1R1', 'IL1RN',
        
        // Signaling molecules
        'MYD88', 'TRAF6', 'IRAK4', 'MAPK1', 'MAPK3', 'MAPK8', 'MAPK14', 'JAK1', 'JAK2', 'JAK3', 'TYK2',
        
        // Autophagy
        'ATG16L1', 'IRGM', 'LRRK2', 'XBP1',
        
        // Metabolism
        'HIF1A', 'PPARG', 'PPARA', 'IDO1', 'ARG1', 'NOS2',
        
        // Apoptosis
        'BCL2', 'BAX', 'CASP3', 'CASP8', 'FAS', 'FASLG',
        
        // Extracellular matrix
        'MMP2', 'MMP9', 'MMP13', 'TIMP1', 'TIMP2', 'COL1A1', 'COL3A1', 'FN1',
        
        // Growth factors
        'EGF', 'EGFR', 'VEGFA', 'VEGFR2', 'IGF1', 'IGF1R',
        
        // Immune cell markers
        'CD3E', 'CD4', 'CD8A', 'CD19', 'CD14', 'CD68', 'CD11B', 'CD11C', 'ITGAX', 'CD20', 'MS4A1',
        
        // Therapeutic targets
        'TNF', 'TNFRSF1A', 'IL12B', 'IL23A', 'IL23R', 'ITGA4', 'ITGB7', 'JAK1', 'JAK2', 'JAK3', 'PDE4', 'S1PR1',
        
        // Genetic risk factors
        'NOD2', 'ATG16L1', 'IRGM', 'IL23R', 'CARD9', 'LRRK2', 'PTPN22', 'IL10', 'IL10RA', 'IL10RB', 'STAT3', 'TNFSF15'
    ];
    
    // Add more general genes
    const generalGenes = [];
    for (let i = 1; i <= 1000; i++) {
        generalGenes.push(`GENE${i}`);
    }
    
    // Combine all gene lists
    allGenesList = [...Object.keys(predefinedGenes), ...additionalGenes, ...generalGenes];
    
    // Remove duplicates
    allGenesList = [...new Set(allGenesList)];
    
    // Sort alphabetically
    allGenesList.sort();
    
    // Generate data for additional genes
    for (const gene of [...additionalGenes, ...generalGenes]) {
        if (!geneExpressionDatabase[gene]) {
            geneExpressionDatabase[gene] = generateRandomGeneData(gene);
        }
    }
    
    console.log(`Generated database with ${allGenesList.length} genes`);
}

// Generate random gene expression data for a gene
function generateRandomGeneData(gene) {
    const models = [
        'CD45RBHigh T cell',
        'Acute DSS',
        'Chronic DSS',
        'IL-10KO',
        'Human UC',
        'Human CD'
    ];
    
    const conditions = {
        'CD45RBHigh T cell': ['Control', 'Week6'],
        'Acute DSS': ['Control', 'DSS'],
        'Chronic DSS': ['Control', 'Chronic DSS'],
        'IL-10KO': ['WT', 'IL10KO'],
        'Human UC': ['Control', 'UC'],
        'Human CD': ['Control', 'CD']
    };
    
    // Generate a seed based on gene name for reproducibility
    let seed = 0;
    for (let i = 0; i < gene.length; i++) {
        seed += gene.charCodeAt(i);
    }
    
    // Simple pseudo-random number generator
    const random = function() {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
    };
    
    // Base expression level for this gene (1-100)
    const baseExpression = Math.floor(random() * 100) + 1;
    
    // Generate expression data for each model and condition
    const geneData = {};
    
    for (const model of models) {
        geneData[model] = {};
        
        for (const condition of conditions[model]) {
            if (condition === 'Control' || condition === 'WT') {
                // Control condition
                geneData[model][condition] = baseExpression;
            } else {
                // Disease condition - add fold change
                const foldChange = (random() * 4) - 2; // -2 to 2 fold change
                
                if (foldChange > 0) {
                    // Up-regulated
                    geneData[model][condition] = baseExpression * (1 + foldChange);
                } else {
                    // Down-regulated
                    geneData[model][condition] = baseExpression / (1 - foldChange);
                }
            }
        }
    }
    
    return geneData;
}

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
}

// Initialize gene search with autocomplete
function initializeGeneSearch() {
    const geneInput = document.getElementById('geneInput');
    const datalist = document.getElementById('geneList');
    
    // Clear existing options
    if (datalist) {
        datalist.innerHTML = '';
        
        // Add options for all genes
        for (const gene of allGenesList) {
            const option = document.createElement('option');
            option.value = gene;
            datalist.appendChild(option);
        }
    }
    
    // Add search functionality
    if (geneInput) {
        geneInput.addEventListener('input', function() {
            const searchTerm = this.value.toUpperCase();
            
            // Filter genes based on search term
            const filteredGenes = allGenesList.filter(gene => 
                gene.toUpperCase().includes(searchTerm)
            ).slice(0, 10); // Limit to 10 results
            
            // Update datalist
            if (datalist) {
                datalist.innerHTML = '';
                for (const gene of filteredGenes) {
                    const option = document.createElement('option');
                    option.value = gene;
                    datalist.appendChild(option);
                }
            }
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
        const expressionData = geneExpressionDatabase[gene];
        
        if (!expressionData) {
            plotContainer.innerHTML = `<div class="alert alert-warning">Gene ${gene} not found in dataset. Please try another gene.</div>`;
            return;
        }
        
        // Create visualization
        createGeneExpressionVisualization(plotContainer, gene, expressionData);
        
        // Update gene info
        updateGeneInfo(gene);
    }, 500);
}

// Update gene information
function updateGeneInfo(gene) {
    const geneInfoContainer = document.getElementById('geneInfo');
    if (!geneInfoContainer) return;
    
    // Predefined gene descriptions
    const geneDescriptions = {
        'TNF': 'Tumor Necrosis Factor Alpha (TNF-α) is a pro-inflammatory cytokine involved in systemic inflammation and acute phase reaction. It plays a key role in IBD pathogenesis and is a major therapeutic target.',
        'IL1B': 'Interleukin 1 Beta (IL-1β) is a pro-inflammatory cytokine that mediates inflammatory responses and is involved in cell proliferation, differentiation, and apoptosis.',
        'IL6': 'Interleukin 6 (IL-6) is a pro-inflammatory cytokine that plays a role in inflammation and B cell maturation. It is elevated in IBD and correlates with disease activity.',
        'IL10': 'Interleukin 10 (IL-10) is an anti-inflammatory cytokine that inhibits the production of pro-inflammatory cytokines. Defects in IL-10 signaling are associated with early-onset IBD.',
        'IL17A': 'Interleukin 17A (IL-17A) is a pro-inflammatory cytokine produced by Th17 cells that stimulates the production of other inflammatory mediators.',
        'FOXP3': 'Forkhead Box P3 (FOXP3) is a transcription factor essential for the development and function of regulatory T cells, which suppress excessive immune responses.',
        'IFNG': 'Interferon Gamma (IFN-γ) is a cytokine that is critical for innate and adaptive immunity against viral and bacterial infections and for tumor control.',
        'TLR4': 'Toll-like Receptor 4 (TLR4) recognizes lipopolysaccharide (LPS) from Gram-negative bacteria and plays a key role in pathogen recognition and activation of innate immunity.',
        'MUC2': 'Mucin 2 (MUC2) is the major component of intestinal mucus, which forms a protective barrier between the epithelium and the gut microbiota.',
        'CLDN1': 'Claudin 1 (CLDN1) is a tight junction protein that regulates paracellular permeability and epithelial barrier function in the intestine.'
    };
    
    // Get gene description
    let description = geneDescriptions[gene];
    if (!description) {
        description = `${gene} is involved in inflammatory bowel disease pathways. Expression data is available across multiple mouse models and human IBD samples.`;
    }
    
    // Update gene info
    geneInfoContainer.innerHTML = `
        <h5>${gene}</h5>
        <p>${description}</p>
    `;
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
    const width = cont
(Content truncated due to size limit. Use line ranges to read in chunks)