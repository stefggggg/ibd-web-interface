// scripts.js - JavaScript functionality for IBD RNA-Seq Analysis Platform

// Global variables to store data
let geneExpressionData = {};
let pathwayAnalysisData = {};
let modelComparisonData = {};
let targetValidationData = {};

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Load data from the server
    loadData();
    
    // Set up event listeners for navigation
    setupNavigation();
    
    // Initialize plots with default data
    initializePlots();
});

// Function to load data from the server
function loadData() {
    // In a real implementation, this would fetch data from the server
    // For demonstration, we'll use simulated data
    
    // Simulate loading gene expression data
    console.log("Loading gene expression data...");
    simulateGeneExpressionData();
    
    // Simulate loading pathway analysis data
    console.log("Loading pathway analysis data...");
    simulatePathwayAnalysisData();
    
    // Simulate loading model comparison data
    console.log("Loading model comparison data...");
    simulateModelComparisonData();
    
    // Simulate loading target validation data
    console.log("Loading target validation data...");
    simulateTargetValidationData();
}

// Function to set up navigation event listeners
function setupNavigation() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // Add click event listener to each link
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Prevent default link behavior
            event.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get the target section ID from the href attribute
            const targetId = this.getAttribute('href');
            
            // Scroll to the target section
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Function to initialize plots with default data
function initializePlots() {
    // Initialize gene expression plot
    initializeGeneExpressionPlot();
    
    // Initialize pathway analysis plot
    initializePathwayAnalysisPlot();
    
    // Initialize model comparison plots
    initializeModelComparisonPlots();
    
    // Initialize target validation plots and table
    initializeTargetValidationPlots();
}

// Function to simulate gene expression data
function simulateGeneExpressionData() {
    // Create simulated gene expression data for demonstration
    geneExpressionData = {
        genes: ['IL10', 'TNF', 'IL6', 'IL17A', 'IFNG', 'FOXP3', 'RORC', 'TBX21', 'GATA3'],
        models: {
            cd45rb: {
                name: 'CD45RBHigh T cell',
                values: {
                    'IL10': 2.1, 'TNF': 8.7, 'IL6': 7.2, 'IL17A': 6.5, 'IFNG': 9.1,
                    'FOXP3': 3.2, 'RORC': 5.8, 'TBX21': 7.3, 'GATA3': 2.9
                },
                errors: {
                    'IL10': 0.4, 'TNF': 0.9, 'IL6': 0.7, 'IL17A': 0.8, 'IFNG': 1.1,
                    'FOXP3': 0.5, 'RORC': 0.6, 'TBX21': 0.8, 'GATA3': 0.4
                }
            },
            acute_dss: {
                name: 'Acute DSS',
                values: {
                    'IL10': 3.5, 'TNF': 7.2, 'IL6': 8.9, 'IL17A': 5.1, 'IFNG': 6.3,
                    'FOXP3': 2.8, 'RORC': 4.9, 'TBX21': 5.7, 'GATA3': 3.2
                },
                errors: {
                    'IL10': 0.5, 'TNF': 0.8, 'IL6': 0.9, 'IL17A': 0.6, 'IFNG': 0.7,
                    'FOXP3': 0.4, 'RORC': 0.5, 'TBX21': 0.6, 'GATA3': 0.4
                }
            },
            chronic_dss: {
                name: 'Chronic DSS',
                values: {
                    'IL10': 2.8, 'TNF': 8.1, 'IL6': 7.8, 'IL17A': 7.2, 'IFNG': 7.5,
                    'FOXP3': 2.5, 'RORC': 6.2, 'TBX21': 6.8, 'GATA3': 2.7
                },
                errors: {
                    'IL10': 0.4, 'TNF': 0.9, 'IL6': 0.8, 'IL17A': 0.8, 'IFNG': 0.8,
                    'FOXP3': 0.3, 'RORC': 0.7, 'TBX21': 0.7, 'GATA3': 0.3
                }
            },
            il10ko: {
                name: 'IL-10KO',
                values: {
                    'IL10': 0.2, 'TNF': 9.5, 'IL6': 8.7, 'IL17A': 8.1, 'IFNG': 8.9,
                    'FOXP3': 1.9, 'RORC': 7.3, 'TBX21': 8.2, 'GATA3': 2.1
                },
                errors: {
                    'IL10': 0.1, 'TNF': 1.0, 'IL6': 0.9, 'IL17A': 0.9, 'IFNG': 0.9,
                    'FOXP3': 0.3, 'RORC': 0.8, 'TBX21': 0.9, 'GATA3': 0.3
                }
            },
            human_uc: {
                name: 'Human UC',
                values: {
                    'IL10': 3.2, 'TNF': 7.8, 'IL6': 7.5, 'IL17A': 6.9, 'IFNG': 7.2,
                    'FOXP3': 2.7, 'RORC': 5.9, 'TBX21': 6.5, 'GATA3': 3.1
                },
                errors: {
                    'IL10': 0.5, 'TNF': 0.8, 'IL6': 0.8, 'IL17A': 0.7, 'IFNG': 0.8,
                    'FOXP3': 0.4, 'RORC': 0.6, 'TBX21': 0.7, 'GATA3': 0.4
                }
            },
            human_cd: {
                name: 'Human CD',
                values: {
                    'IL10': 2.9, 'TNF': 8.3, 'IL6': 8.1, 'IL17A': 7.5, 'IFNG': 8.2,
                    'FOXP3': 2.4, 'RORC': 6.5, 'TBX21': 7.1, 'GATA3': 2.8
                },
                errors: {
                    'IL10': 0.4, 'TNF': 0.9, 'IL6': 0.9, 'IL17A': 0.8, 'IFNG': 0.9,
                    'FOXP3': 0.3, 'RORC': 0.7, 'TBX21': 0.8, 'GATA3': 0.4
                }
            }
        }
    };
}

// Function to simulate pathway analysis data
function simulatePathwayAnalysisData() {
    // Create simulated pathway analysis data for demonstration
    pathwayAnalysisData = {
        pathways: [
            'Inflammatory response',
            'Cytokine signaling',
            'T cell activation',
            'B cell receptor signaling',
            'NF-kB signaling',
            'TNF signaling',
            'IL-17 signaling',
            'Toll-like receptor signaling',
            'JAK-STAT signaling',
            'MAPK signaling'
        ],
        models: {
            cd45rb: {
                name: 'CD45RBHigh T cell',
                values: {
                    'Inflammatory response': 3.8,
                    'Cytokine signaling': 4.2,
                    'T cell activation': 4.5,
                    'B cell receptor signaling': 2.1,
                    'NF-kB signaling': 3.7,
                    'TNF signaling': 4.1,
                    'IL-17 signaling': 3.9,
                    'Toll-like receptor signaling': 3.2,
                    'JAK-STAT signaling': 3.6,
                    'MAPK signaling': 3.4
                },
                pvalues: {
                    'Inflammatory response': 0.001,
                    'Cytokine signaling': 0.002,
                    'T cell activation': 0.001,
                    'B cell receptor signaling': 0.03,
                    'NF-kB signaling': 0.005,
                    'TNF signaling': 0.002,
                    'IL-17 signaling': 0.003,
                    'Toll-like receptor signaling': 0.01,
                    'JAK-STAT signaling': 0.007,
                    'MAPK signaling': 0.008
                }
            },
            acute_dss: {
                name: 'Acute DSS',
                values: {
                    'Inflammatory response': 3.5,
                    'Cytokine signaling': 3.8,
                    'T cell activation': 2.9,
                    'B cell receptor signaling': 2.3,
                    'NF-kB signaling': 3.9,
                    'TNF signaling': 3.7,
                    'IL-17 signaling': 3.1,
                    'Toll-like receptor signaling': 3.8,
                    'JAK-STAT signaling': 3.2,
                    'MAPK signaling': 3.6
                },
                pvalues: {
                    'Inflammatory response': 0.002,
                    'Cytokine signaling': 0.003,
                    'T cell activation': 0.01,
                    'B cell receptor signaling': 0.02,
                    'NF-kB signaling': 0.003,
                    'TNF signaling': 0.004,
                    'IL-17 signaling': 0.009,
                    'Toll-like receptor signaling': 0.003,
                    'JAK-STAT signaling': 0.008,
                    'MAPK signaling': 0.005
                }
            },
            chronic_dss: {
                name: 'Chronic DSS',
                values: {
                    'Inflammatory response': 3.7,
                    'Cytokine signaling': 3.9,
                    'T cell activation': 3.2,
                    'B cell receptor signaling': 2.5,
                    'NF-kB signaling': 3.8,
                    'TNF signaling': 3.9,
                    'IL-17 signaling': 3.5,
                    'Toll-like receptor signaling': 3.6,
                    'JAK-STAT signaling': 3.4,
                    'MAPK signaling': 3.7
                },
                pvalues: {
                    'Inflammatory response': 0.001,
                    'Cytokine signaling': 0.002,
                    'T cell activation': 0.008,
                    'B cell receptor signaling': 0.015,
                    'NF-kB signaling': 0.003,
                    'TNF signaling': 0.002,
                    'IL-17 signaling': 0.006,
                    'Toll-like receptor signaling': 0.005,
                    'JAK-STAT signaling': 0.007,
                    'MAPK signaling': 0.004
                }
            },
            il10ko: {
                name: 'IL-10KO',
                values: {
                    'Inflammatory response': 4.1,
                    'Cytokine signaling': 4.3,
                    'T cell activation': 3.8,
                    'B cell receptor signaling': 2.7,
                    'NF-kB signaling': 4.0,
                    'TNF signaling': 4.2,
                    'IL-17 signaling': 4.0,
                    'Toll-like receptor signaling': 3.5,
                    'JAK-STAT signaling': 3.9,
                    'MAPK signaling': 3.8
                },
                pvalues: {
                    'Inflammatory response': 0.0005,
                    'Cytokine signaling': 0.0008,
                    'T cell activation': 0.003,
                    'B cell receptor signaling': 0.01,
                    'NF-kB signaling': 0.001,
                    'TNF signaling': 0.0009,
                    'IL-17 signaling': 0.001,
                    'Toll-like receptor signaling': 0.006,
                    'JAK-STAT signaling': 0.002,
                    'MAPK signaling': 0.003
                }
            },
            human_uc: {
                name: 'Human UC',
                values: {
                    'Inflammatory response': 3.6,
                    'Cytokine signaling': 3.8,
                    'T cell activation': 3.3,
                    'B cell receptor signaling': 2.8,
                    'NF-kB signaling': 3.7,
                    'TNF signaling': 3.8,
                    'IL-17 signaling': 3.7,
                    'Toll-like receptor signaling': 3.4,
                    'JAK-STAT signaling': 3.5,
                    'MAPK signaling': 3.6
                },
                pvalues: {
                    'Inflammatory response': 0.002,
                    'Cytokine signaling': 0.003,
                    'T cell activation': 0.007,
                    'B cell receptor signaling': 0.01,
                    'NF-kB signaling': 0.004,
                    'TNF signaling': 0.003,
                    'IL-17 signaling': 0.004,
                    'Toll-like receptor signaling': 0.006,
                    'JAK-STAT signaling': 0.005,
                    'MAPK signaling': 0.004
                }
            },
            human_cd: {
                name: 'Human CD',
                values: {
                    'Inflammatory response': 3.9,
                    'Cytokine signaling': 4.0,
                    'T cell activation': 3.6,
                    'B cell receptor signaling': 2.9,
                    'NF-kB signaling': 3.9,
                    'TNF signaling': 4.0,
                    'IL-17 signaling': 3.8,
                    'Toll-like receptor signaling': 3.5,
                    'JAK-STAT signaling': 3.7,
                    'MAPK signaling': 3.8
                },
                pvalues: {
                    'Inflammatory response': 0.001,
                    'Cytokine signaling': 0.002,
                    'T cell activation': 0.005,
                    'B cell receptor signaling': 0.009,
                    'NF-kB signaling': 0.002,
                    'TNF signaling': 0.001,
                    'IL-17 signaling': 0.003,
                    'Toll-like receptor signaling': 0.005,
                    'JAK-STAT signaling': 0.004,
                    'MAPK signaling': 0.003
                }
            }
        }
    };
}

// Function to simulate model comparison data
function simulateModelComparisonData() {
    // Create simulated model comparison data for demonstration
    modelComparisonData = {
        models: [
            {
                id: 'cd45rb',
                name: 'CD45RBHigh T cell',
                gene_expression_correlation: 0.72,
                pathway_overlap_score: 0.68,
                differentially_expressed_genes_overlap: 0.65,
                overall_similarity_score: 0.69
            },
            {
                id: 'acute_dss',
                name: 'Acute DSS',
                gene_expression_correlation: 0.58,
                pathway_overlap_score: 0.62,
                differentially_expressed_genes_overlap: 0.53,
                overall_similarity_score: 0.58
            },
            {
                id: 'chronic_dss',
                name: 'Chronic DSS',
                gene_expression_correlation: 0.65,
                pathway_overlap_score: 0.70,
                differentially_expressed_genes_overlap: 0.61,
                overall_similarity_score: 0.66
            },
            {
                id: 'il10ko',
                name: 'IL-10KO',
                gene_expression_correlation: 0.78,
                pathway_overlap_score: 0.75,
                differentially_expressed_genes_overlap: 0.69,
                overall_similarity_score: 0.75
            }
        ]
    };
}

// Function to simulate target validation data
function simulateTargetValidationData() {
    // Create simulated target validation data for demonstration
    targetValidationData = {
        targets: [
            {
                gene: 'IL1B',
                differential_expression_score: 0.92,
                pathway_relevance_score: 0.88,
                conservation_score: 0.95,
                druggability_score: 0.85,
                overall_target_score: 0.90
            },
            {
                gene: 'TNF',
                differential_expression_score: 0.95,
                pathway_relevance_score: 0.90,
                conservation_score: 0.98,
                druggability_score: 0.88,
                overall_target_score: 0.93
            },
            {
                gene: 'IL6',
                differential_expression_score: 0.88,
                pathway_relevance_score: 0.85,
                conservation_score: 0.92,
                druggability_score: 0.80,
                overall_target_score: 0.86
            },
            {
                gene: 'IL17A',
                differential_expression_score: 0.85,
                pathway_relevance_score: 0.82,
                conservation_score: 0.90,
                druggability_score: 0.75,
                overall_target_score: 0.83
            },
           
(Content truncated due to size limit. Use line ranges to read in chunks)