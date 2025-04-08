// Gene Knockout Simulation JavaScript
// This script simulates the effects of blocking/degrading specific genes on gene expression

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log("Initializing gene knockout simulation...");
    
    // Set up event listeners
    setupEventListeners();
    
    // Generate gene regulatory network
    generateGeneRegulatoryNetwork();
    
    // Initialize with default target gene (NFKB1)
    updateKnockoutSimulation('NFKB1');
    
    // Initialize gene search autocomplete
    initializeGeneSearch();
});

// Global variables
let geneRegulatoryNetwork = {};
let geneExpressionDatabase = {};
let allGenesList = [];
let knockoutResults = {};

// Set up event listeners for the form controls
function setupEventListeners() {
    // Target gene form
    const targetGeneForm = document.getElementById('targetGeneForm');
    if (targetGeneForm) {
        targetGeneForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const targetGene = document.getElementById('targetGeneInput').value;
            updateKnockoutSimulation(targetGene);
        });
    }
    
    // Simulate button
    const simulateButton = document.getElementById('simulateButton');
    if (simulateButton) {
        simulateButton.addEventListener('click', function() {
            const targetGene = document.getElementById('targetGeneInput').value;
            updateKnockoutSimulation(targetGene);
        });
    }
    
    // Model selection
    const modelSelect = document.getElementById('modelSelect');
    if (modelSelect) {
        modelSelect.addEventListener('change', function() {
            const targetGene = document.getElementById('targetGeneInput').value;
            if (targetGene) {
                updateKnockoutVisualization(targetGene);
            }
        });
    }
}

// Initialize gene search with autocomplete
function initializeGeneSearch() {
    const targetGeneInput = document.getElementById('targetGeneInput');
    const datalist = document.getElementById('geneList');
    
    // Generate gene list if not already done
    if (allGenesList.length === 0) {
        generateGeneList();
    }
    
    // Clear existing options
    if (datalist) {
        datalist.innerHTML = '';
        
        // Add options for transcription factors and key regulatory genes
        const regulatoryGenes = [
            // Transcription factors
            'NFKB1', 'RELA', 'STAT1', 'STAT3', 'STAT4', 'STAT6', 'TBX21', 'RORC', 'GATA3', 'FOXP3',
            // Cytokines
            'TNF', 'IL1B', 'IL6', 'IL10', 'IL17A', 'IL23A', 'IFNG', 'TGFB1',
            // Signaling molecules
            'MYD88', 'TRAF6', 'JAK1', 'JAK2', 'MAPK1', 'MAPK14'
        ];
        
        for (const gene of regulatoryGenes) {
            const option = document.createElement('option');
            option.value = gene;
            datalist.appendChild(option);
        }
    }
    
    // Add search functionality
    if (targetGeneInput) {
        targetGeneInput.addEventListener('input', function() {
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

// Generate list of all genes
function generateGeneList() {
    // Predefined gene categories
    const transcriptionFactors = [
        'NFKB1', 'RELA', 'STAT1', 'STAT3', 'STAT4', 'STAT6', 'TBX21', 'RORC', 'GATA3', 'FOXP3',
        'IRF1', 'IRF3', 'IRF4', 'IRF5', 'IRF7', 'IRF8', 'HIF1A', 'TP53', 'MYC', 'JUN', 'FOS'
    ];
    
    const cytokines = [
        'TNF', 'IL1B', 'IL2', 'IL4', 'IL5', 'IL6', 'IL10', 'IL12A', 'IL12B', 'IL13', 
        'IL17A', 'IL18', 'IL21', 'IL22', 'IL23A', 'IL27', 'IFNG', 'TGFB1', 'TGFB2', 'TGFB3'
    ];
    
    const signalingMolecules = [
        'MYD88', 'TRAF6', 'IRAK4', 'MAPK1', 'MAPK3', 'MAPK8', 'MAPK14', 'JAK1', 'JAK2', 'JAK3', 'TYK2',
        'SOCS1', 'SOCS3', 'PTEN', 'PI3K', 'AKT1', 'MTOR', 'GSK3B', 'NFKBIA', 'NFKBIB'
    ];
    
    const receptors = [
        'IL1R1', 'IL2RA', 'IL4R', 'IL6R', 'IL10RA', 'IL10RB', 'IL12RB1', 'IL12RB2', 'IL17RA',
        'IL23R', 'IFNGR1', 'IFNGR2', 'TNFRSF1A', 'TNFRSF1B', 'TGFBR1', 'TGFBR2'
    ];
    
    // Combine all gene lists
    allGenesList = [...transcriptionFactors, ...cytokines, ...signalingMolecules, ...receptors];
    
    // Add more general genes
    for (let i = 1; i <= 100; i++) {
        allGenesList.push(`GENE${i}`);
    }
    
    // Remove duplicates
    allGenesList = [...new Set(allGenesList)];
    
    // Sort alphabetically
    allGenesList.sort();
}

// Generate gene regulatory network
function generateGeneRegulatoryNetwork() {
    // Define key regulatory relationships
    const regulatoryRelationships = {
        // NF-κB pathway
        'NFKB1': {
            'activates': ['TNF', 'IL1B', 'IL6', 'IL8', 'CXCL10', 'CCL2', 'ICAM1', 'VCAM1', 'MMP9', 'COX2', 'NFKBIA'],
            'represses': ['IL10', 'FOXP3']
        },
        'RELA': {
            'activates': ['TNF', 'IL1B', 'IL6', 'IL8', 'CXCL10', 'CCL2', 'ICAM1', 'VCAM1', 'MMP9', 'COX2'],
            'represses': ['IL10']
        },
        
        // STAT pathways
        'STAT1': {
            'activates': ['CXCL10', 'IRF1', 'IDO1', 'ICAM1', 'VCAM1', 'MHC1', 'MHC2', 'SOCS1'],
            'represses': ['IL17A', 'RORC']
        },
        'STAT3': {
            'activates': ['IL6', 'IL17A', 'IL21', 'IL22', 'IL23R', 'RORC', 'BCL2', 'SOCS3', 'HIF1A'],
            'represses': ['IL12', 'IFNG', 'TNF']
        },
        'STAT4': {
            'activates': ['IFNG', 'TBX21', 'IL12RB1', 'IL12RB2'],
            'represses': ['IL4', 'GATA3']
        },
        'STAT6': {
            'activates': ['IL4', 'IL13', 'GATA3', 'CCL11', 'CCL17', 'CCL22'],
            'represses': ['IFNG', 'TBX21']
        },
        
        // T cell transcription factors
        'TBX21': {
            'activates': ['IFNG', 'IL12RB1', 'IL12RB2'],
            'represses': ['IL4', 'IL5', 'IL13', 'GATA3']
        },
        'RORC': {
            'activates': ['IL17A', 'IL17F', 'IL22', 'IL23R', 'CCR6'],
            'represses': ['FOXP3', 'IFNG']
        },
        'GATA3': {
            'activates': ['IL4', 'IL5', 'IL13', 'IL10'],
            'represses': ['IFNG', 'TBX21']
        },
        'FOXP3': {
            'activates': ['IL10', 'TGFB1', 'CTLA4', 'IL2RA'],
            'represses': ['IL2', 'IFNG', 'IL17A', 'TNF']
        },
        
        // Cytokines
        'TNF': {
            'activates': ['IL1B', 'IL6', 'IL8', 'CXCL10', 'CCL2', 'ICAM1', 'VCAM1', 'MMP9', 'COX2', 'NFKB1', 'RELA'],
            'represses': ['MUC2', 'CLDN1', 'OCLN', 'TJP1']
        },
        'IL1B': {
            'activates': ['IL6', 'IL8', 'CCL2', 'COX2', 'MMP9', 'NFKB1', 'RELA'],
            'represses': ['MUC2', 'CLDN1']
        },
        'IL6': {
            'activates': ['STAT3', 'IL17A', 'IL21', 'IL22', 'SOCS3', 'CRP', 'FGA', 'FGB', 'FGG'],
            'represses': ['IL10', 'FOXP3']
        },
        'IL10': {
            'activates': ['STAT3', 'SOCS3', 'IL10RA', 'IL10RB', 'FOXP3'],
            'represses': ['TNF', 'IL1B', 'IL6', 'IL12', 'IL23A', 'NFKB1', 'RELA']
        },
        'IL17A': {
            'activates': ['IL6', 'IL8', 'CCL2', 'CCL20', 'MMP9', 'MMP13', 'G-CSF', 'GM-CSF'],
            'represses': []
        },
        'IFNG': {
            'activates': ['STAT1', 'IRF1', 'CXCL10', 'CXCL9', 'CXCL11', 'IDO1', 'NOS2', 'MHC1', 'MHC2'],
            'represses': ['IL4', 'IL5', 'IL13', 'GATA3']
        },
        'TGFB1': {
            'activates': ['FOXP3', 'SMAD2', 'SMAD3', 'SMAD4', 'COL1A1', 'COL3A1', 'FN1', 'ACTA2'],
            'represses': ['IL2', 'IFNG', 'TNF', 'IL17A']
        },
        
        // Signaling molecules
        'MYD88': {
            'activates': ['IRAK4', 'TRAF6', 'NFKB1', 'RELA', 'MAPK1', 'MAPK14'],
            'represses': []
        },
        'JAK1': {
            'activates': ['STAT1', 'STAT3', 'STAT4', 'STAT6'],
            'represses': []
        },
        'JAK2': {
            'activates': ['STAT1', 'STAT3', 'STAT4', 'STAT5'],
            'represses': []
        }
    };
    
    // Store the regulatory network
    geneRegulatoryNetwork = regulatoryRelationships;
    
    // Generate baseline expression data
    generateBaselineExpressionData();
}

// Generate baseline expression data
function generateBaselineExpressionData() {
    // Define models
    const models = [
        'CD45RBHigh T cell',
        'Acute DSS',
        'Chronic DSS',
        'IL-10KO',
        'Human UC',
        'Human CD'
    ];
    
    // Define conditions for each model
    const conditions = {
        'CD45RBHigh T cell': ['Control', 'Week6'],
        'Acute DSS': ['Control', 'DSS'],
        'Chronic DSS': ['Control', 'Chronic DSS'],
        'IL-10KO': ['WT', 'IL10KO'],
        'Human UC': ['Control', 'UC'],
        'Human CD': ['Control', 'CD']
    };
    
    // Predefined gene expression data for key genes
    const predefinedGenes = {
        'NFKB1': {
            'CD45RBHigh T cell': { 'Control': 25, 'Week6': 60 },
            'Acute DSS': { 'Control': 28, 'DSS': 70 },
            'Chronic DSS': { 'Control': 26, 'Chronic DSS': 65 },
            'IL-10KO': { 'WT': 30, 'IL10KO': 75 },
            'Human UC': { 'Control': 32, 'UC': 68 },
            'Human CD': { 'Control': 30, 'CD': 72 }
        },
        'RELA': {
            'CD45RBHigh T cell': { 'Control': 30, 'Week6': 65 },
            'Acute DSS': { 'Control': 32, 'DSS': 75 },
            'Chronic DSS': { 'Control': 31, 'Chronic DSS': 70 },
            'IL-10KO': { 'WT': 35, 'IL10KO': 80 },
            'Human UC': { 'Control': 38, 'UC': 72 },
            'Human CD': { 'Control': 36, 'CD': 78 }
        },
        'STAT3': {
            'CD45RBHigh T cell': { 'Control': 35, 'Week6': 70 },
            'Acute DSS': { 'Control': 38, 'DSS': 65 },
            'Chronic DSS': { 'Control': 36, 'Chronic DSS': 68 },
            'IL-10KO': { 'WT': 40, 'IL10KO': 85 },
            'Human UC': { 'Control': 42, 'UC': 75 },
            'Human CD': { 'Control': 40, 'CD': 80 }
        },
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
    
    // Store the expression data
    geneExpressionDatabase = {...predefinedGenes};
    
    // Generate expression data for all genes in the regulatory network
    for (const gene in geneRegulatoryNetwork) {
        if (!geneExpressionDatabase[gene]) {
            geneExpressionDatabase[gene] = generateRandomGeneData(gene);
        }
        
        // Generate data for regulated genes
        if (geneRegulatoryNetwork[gene].activates) {
            for (const targetGene of geneRegulatoryNetwork[gene].activates) {
                if (!geneExpressionDatabase[targetGene]) {
                    geneExpressionDatabase[targetGene] = generateRandomGeneData(targetGene);
                }
            }
        }
        
        if (geneRegulatoryNetwork[gene].represses) {
            for (const targetGene of geneRegulatoryNetwork[gene].represses) {
                if (!geneExpressionDatabase[targetGene]) {
                    geneExpressionDatabase[targetGene] = generateRandomGeneData(targetGene);
                }
            }
        }
    }
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
    const 
(Content truncated due to size limit. Use line ranges to read in chunks)