// Enhanced scripts.js with dynamic gene search functionality

// Global data store
let geneExpressionData = {};
let pathwayData = {};
let modelComparisonData = {};
let targetData = {};

// Initialize random number generator with seed for reproducibility
Math.seedrandom('rna-seq-seed');

// Load data on page load
function loadData() {
    console.log("Loading data...");
    
    // Generate simulated gene expression data
    generateGeneExpressionData();
    
    // Generate simulated pathway data
    generatePathwayData();
    
    // Generate simulated model comparison data
    generateModelComparisonData();
    
    // Generate simulated target data
    generateTargetData();
    
    console.log("Data loaded successfully");
}

// Generate simulated gene expression data
function generateGeneExpressionData() {
    // Define models
    const models = [
        'cd45rb', 'acute_dss', 'chronic_dss', 'il10ko', 'human_uc', 'human_cd'
    ];
    
    // Define conditions for each model
    const conditions = {
        'cd45rb': ['Control', 'Week6'],
        'acute_dss': ['Control', 'DSS'],
        'chronic_dss': ['Control', 'Chronic_DSS'],
        'il10ko': ['WT', 'IL10KO'],
        'human_uc': ['Control', 'UC'],
        'human_cd': ['Control', 'CD']
    };
    
    // Define a set of genes with predefined expression patterns
    const predefinedGenes = {
        'TNF': {
            'cd45rb': { 'Control': 10, 'Week6': 45 },
            'acute_dss': { 'Control': 12, 'DSS': 60 },
            'chronic_dss': { 'Control': 11, 'Chronic_DSS': 40 },
            'il10ko': { 'WT': 15, 'IL10KO': 55 },
            'human_uc': { 'Control': 18, 'UC': 50 },
            'human_cd': { 'Control': 20, 'CD': 65 }
        },
        'IL1B': {
            'cd45rb': { 'Control': 15, 'Week6': 70 },
            'acute_dss': { 'Control': 18, 'DSS': 90 },
            'chronic_dss': { 'Control': 16, 'Chronic_DSS': 65 },
            'il10ko': { 'WT': 20, 'IL10KO': 75 },
            'human_uc': { 'Control': 25, 'UC': 80 },
            'human_cd': { 'Control': 22, 'CD': 85 }
        },
        'IL6': {
            'cd45rb': { 'Control': 8, 'Week6': 55 },
            'acute_dss': { 'Control': 10, 'DSS': 75 },
            'chronic_dss': { 'Control': 9, 'Chronic_DSS': 50 },
            'il10ko': { 'WT': 12, 'IL10KO': 60 },
            'human_uc': { 'Control': 15, 'UC': 65 },
            'human_cd': { 'Control': 14, 'CD': 70 }
        },
        'IL10': {
            'cd45rb': { 'Control': 25, 'Week6': 10 },
            'acute_dss': { 'Control': 28, 'DSS': 12 },
            'chronic_dss': { 'Control': 26, 'Chronic_DSS': 15 },
            'il10ko': { 'WT': 30, 'IL10KO': 0 },
            'human_uc': { 'Control': 35, 'UC': 18 },
            'human_cd': { 'Control': 32, 'CD': 14 }
        },
        'IL17A': {
            'cd45rb': { 'Control': 5, 'Week6': 35 },
            'acute_dss': { 'Control': 6, 'DSS': 25 },
            'chronic_dss': { 'Control': 5, 'Chronic_DSS': 30 },
            'il10ko': { 'WT': 7, 'IL10KO': 40 },
            'human_uc': { 'Control': 8, 'UC': 30 },
            'human_cd': { 'Control': 7, 'CD': 45 }
        },
        'FOXP3': {
            'cd45rb': { 'Control': 20, 'Week6': 8 },
            'acute_dss': { 'Control': 22, 'DSS': 10 },
            'chronic_dss': { 'Control': 21, 'Chronic_DSS': 12 },
            'il10ko': { 'WT': 25, 'IL10KO': 15 },
            'human_uc': { 'Control': 28, 'UC': 14 },
            'human_cd': { 'Control': 26, 'CD': 10 }
        },
        'IFNG': {
            'cd45rb': { 'Control': 12, 'Week6': 50 },
            'acute_dss': { 'Control': 14, 'DSS': 40 },
            'chronic_dss': { 'Control': 13, 'Chronic_DSS': 45 },
            'il10ko': { 'WT': 16, 'IL10KO': 55 },
            'human_uc': { 'Control': 18, 'UC': 45 },
            'human_cd': { 'Control': 17, 'CD': 60 }
        },
        'TLR4': {
            'cd45rb': { 'Control': 30, 'Week6': 60 },
            'acute_dss': { 'Control': 32, 'DSS': 70 },
            'chronic_dss': { 'Control': 31, 'Chronic_DSS': 65 },
            'il10ko': { 'WT': 35, 'IL10KO': 75 },
            'human_uc': { 'Control': 38, 'UC': 70 },
            'human_cd': { 'Control': 36, 'CD': 80 }
        },
        'MUC2': {
            'cd45rb': { 'Control': 100, 'Week6': 40 },
            'acute_dss': { 'Control': 110, 'DSS': 30 },
            'chronic_dss': { 'Control': 105, 'Chronic_DSS': 35 },
            'il10ko': { 'WT': 120, 'IL10KO': 50 },
            'human_uc': { 'Control': 130, 'UC': 25 },
            'human_cd': { 'Control': 125, 'CD': 45 }
        },
        'CLDN1': {
            'cd45rb': { 'Control': 80, 'Week6': 30 },
            'acute_dss': { 'Control': 85, 'DSS': 25 },
            'chronic_dss': { 'Control': 82, 'Chronic_DSS': 28 },
            'il10ko': { 'WT': 90, 'IL10KO': 35 },
            'human_uc': { 'Control': 95, 'UC': 20 },
            'human_cd': { 'Control': 92, 'CD': 30 }
        }
    };
    
    // Generate random expression data for 1000 genes
    for (let i = 1; i <= 1000; i++) {
        const gene = `Gene_${i}`;
        
        // Skip if this is a predefined gene
        if (predefinedGenes[gene]) continue;
        
        const geneData = {};
        
        // Generate expression values for each model and condition
        for (const model of models) {
            geneData[model] = {};
            
            // Base expression level for this gene (1-100)
            const baseExpression = Math.floor(Math.random() * 100) + 1;
            
            // Generate expression for each condition
            for (const condition of conditions[model]) {
                // For disease conditions, add some fold change
                if (condition !== 'Control' && condition !== 'WT') {
                    // Random fold change (-5 to 5)
                    const foldChange = (Math.random() * 10) - 5;
                    
                    if (foldChange > 0) {
                        // Up-regulated
                        geneData[model][condition] = baseExpression * (1 + foldChange);
                    } else {
                        // Down-regulated
                        geneData[model][condition] = baseExpression / (1 - foldChange);
                    }
                } else {
                    // Control condition
                    geneData[model][condition] = baseExpression;
                }
            }
        }
        
        // Store gene data
        predefinedGenes[gene] = geneData;
    }
    
    // Store all gene data
    geneExpressionData = predefinedGenes;
}

// Generate simulated pathway data
function generatePathwayData() {
    // Define pathways
    const pathways = [
        'inflammatory_response', 'cytokine_signaling', 't_cell_activation',
        'b_cell_receptor', 'nfkb_signaling', 'tnf_signaling',
        'il17_signaling', 'tlr_signaling', 'jak_stat_signaling', 'mapk_signaling'
    ];
    
    // Define models
    const models = [
        'cd45rb', 'acute_dss', 'chronic_dss', 'il10ko', 'human_uc', 'human_cd'
    ];
    
    // Generate pathway data
    pathwayData = {};
    
    for (const pathway of pathways) {
        pathwayData[pathway] = {};
        
        for (const model of models) {
            // Generate enrichment score (1-10)
            let score;
            
            // Make some pathways more enriched in specific models
            if (pathway === 'inflammatory_response') {
                // Inflammatory response is high in all disease models
                if (model === 'il10ko') {
                    score = 9.5;
                } else if (model === 'cd45rb') {
                    score = 8.7;
                } else if (model === 'human_cd') {
                    score = 9.2;
                } else if (model === 'human_uc') {
                    score = 8.9;
                } else {
                    score = 7.5 + (Math.random() * 2);
                }
            } else if (pathway === 'cytokine_signaling') {
                // Cytokine signaling is high in T cell and IL-10KO models
                if (model === 'cd45rb') {
                    score = 9.3;
                } else if (model === 'il10ko') {
                    score = 9.0;
                } else if (model === 'human_cd') {
                    score = 8.8;
                } else {
                    score = 7.0 + (Math.random() * 2);
                }
            } else if (pathway === 't_cell_activation') {
                // T cell activation is highest in CD45RB model
                if (model === 'cd45rb') {
                    score = 9.8;
                } else if (model === 'human_cd') {
                    score = 8.5;
                } else if (model === 'human_uc') {
                    score = 8.2;
                } else {
                    score = 6.5 + (Math.random() * 2);
                }
            } else if (pathway === 'tlr_signaling') {
                // TLR signaling is highest in DSS models
                if (model === 'acute_dss') {
                    score = 9.4;
                } else if (model === 'chronic_dss') {
                    score = 9.1;
                } else {
                    score = 6.0 + (Math.random() * 3);
                }
            } else {
                // Random scores for other pathways
                score = 5.0 + (Math.random() * 5);
            }
            
            pathwayData[pathway][model] = score;
        }
    }
}

// Generate simulated model comparison data
function generateModelComparisonData() {
    // Define mouse models
    const mouseModels = [
        'cd45rb', 'acute_dss', 'chronic_dss', 'il10ko'
    ];
    
    // Define human IBD types
    const humanIBD = [
        'human_uc', 'human_cd'
    ];
    
    // Generate comparison data
    modelComparisonData = {
        'overall_similarity': {},
        'gene_correlation': {},
        'pathway_overlap': {},
        'de_gene_overlap': {}
    };
    
    // IL-10KO should be most similar to human CD
    // CD45RB should be most similar to human UC
    // DSS models should be less similar
    
    for (const mouseModel of mouseModels) {
        modelComparisonData['overall_similarity'][mouseModel] = {};
        modelComparisonData['gene_correlation'][mouseModel] = {};
        modelComparisonData['pathway_overlap'][mouseModel] = {};
        modelComparisonData['de_gene_overlap'][mouseModel] = {};
        
        for (const humanModel of humanIBD) {
            let overallScore, geneCorr, pathwayOverlap, deGeneOverlap;
            
            if (mouseModel === 'il10ko' && humanModel === 'human_cd') {
                // IL-10KO is most similar to human CD
                overallScore = 0.85;
                geneCorr = 0.82;
                pathwayOverlap = 0.88;
                deGeneOverlap = 0.85;
            } else if (mouseModel === 'cd45rb' && humanModel === 'human_uc') {
                // CD45RB is most similar to human UC
                overallScore = 0.80;
                geneCorr = 0.78;
                pathwayOverlap = 0.82;
                deGeneOverlap = 0.80;
            } else if (mouseModel === 'il10ko' && humanModel === 'human_uc') {
                // IL-10KO has moderate similarity to human UC
                overallScore = 0.75;
                geneCorr = 0.72;
                pathwayOverlap = 0.78;
                deGeneOverlap = 0.75;
            } else if (mouseModel === 'cd45rb' && humanModel === 'human_cd') {
                // CD45RB has moderate similarity to human CD
                overallScore = 0.70;
                geneCorr = 0.68;
                pathwayOverlap = 0.72;
                deGeneOverlap = 0.70;
            } else if (mouseModel === 'chronic_dss') {
                // Chronic DSS has moderate similarity
                overallScore = 0.65;
                geneCorr = 0.62;
                pathwayOverlap = 0.68;
                deGeneOverlap = 0.65;
            } else {
                // Acute DSS has lowest similarity
                overallScore = 0.60;
                geneCorr = 0.58;
                pathwayOverlap = 0.62;
                deGeneOverlap = 0.60;
            }
            
            // Add some random variation
            overallScore += (Math.random() * 0.1) - 0.05;
            geneCorr += (Math.random() * 0.1) - 0.05;
            pathwayOverlap += (Math.random() * 0.1) - 0.05;
            deGeneOverlap += (Math.random() * 0.1) - 0.05;
            
            // Ensure values are between 0 and 1
            overallScore = Math.max(0, Math.min(1, overallScore));
            geneCorr = Math.max(0, Math.min(1, geneCorr));
            pathwayOverlap = Math.max(0, Math.min(1, pathwayOverlap));
            deGeneOverlap = Math.max(0, Math.min(1, deGeneOverlap));
            
            // Store values
            modelComparisonData['overall_similarity'][mouseModel][humanModel] = overallScore;
            modelComparisonData['gene_correlation'][mouseModel][humanModel] = geneCorr;
            modelComparisonData['pathway_overlap'][mouseModel][humanModel] = pathwayOverlap;
            modelComparisonData['de_gene_overlap'][mouseModel][humanModel] = deGeneOverlap;
        }
    }
}

// Generate simulated target data
function generateTargetData() {
    // Define potential targets
    const targets = [
        'TNF', 'IL1B', 'IL6', 'IL17A', 'IL23A', 'IL12B', 'IFNG', 'TLR4',
        'NOD2', 'STAT3', 'JAK2', 'MAPK14', 'NFKB1', 'RELA', 'FOXP3',
        'RORC', 'ITGB7', 'CCR9', 'S1PR1', 'PTGS2', 'PDE4', 'SMAD7'
    ];
    
    // Generate target data
    targetData = {};
    
    for (const target of targets) {
        // Generate scores
        let deScore, pathwayRelevance, conservation, druggability;
        
        // Assign scores based on known targets
        if (target === 'TNF') {
            // TNF is a validated target (infliximab, adalimumab)
            deScore = 0.95;
            pathwayRelevance = 0.98;
            conservation = 0.90;
            druggability = 0.99;
        } else if (target === 'IL12B' || target === 'IL23A') {
            // IL-12/23 pathway (ustekinumab)
            deScore = 0.90;
            pathwayRelevance = 0.92;
            conservation = 0.88;
            druggability = 0.95;
        } else if (target === 'ITGB7') {
            // Integrins (vedolizumab)
            deScore = 0.85;
            pathwayRelevance = 0.88;
            conservation = 0.82;
            druggability = 0.90;
        } else if (target === 'JAK2' || target === 'STAT3') {
            // JAK-STAT pathway (tofacitinib)
            deScore = 0.88;
            pathwayRelevance = 0.90;
            conservation = 0.85;
            druggability = 0.92;
        } else if (target === 'PDE4') {
            // PDE4 (apremilast)
            deScore = 0.80;
            pathwayRelevance = 0.82;
            conservation = 0.78;
            druggability = 0.85;
        } else if (target === 'S1PR1') {
            // S1P receptor (ozanimod)
            deScore = 0.82;
            pathwayRelevance = 0.84;
            conservation = 0.80;
            druggability = 0.88;
        } else if (target === 'IL1B') {
            // IL-1β (potential target)
            deScore = 0.86;
            pathwayRelevance = 0.88;
            conservation = 0.84;
            druggability = 0.86;
        } else if (target === 'IL6') {
            // IL-6 (potential target)
            deScore = 0.84;
            pathwayRelevance = 0.86;
            conservation = 0.82;
            druggability = 0.84;
        } else {
            // Random scores for other targets
            deScore = 0.50 + (Math.random() * 0.3);
            pathwayRelevance = 0.50 + (Math.random() * 0.3);
            conservation = 0.50 + (Math.random() * 0.3);
            druggability = 0.50 + (Math.random() * 0.3);
        }
        
        // Add some random variation
        deScore += (Math.random() * 0.1) - 0.05;
        pathwayRelevance += (Math.r
(Content truncated due to size limit. Use line ranges to read in chunks)