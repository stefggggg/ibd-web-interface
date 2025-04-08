#!/usr/bin/env python3
"""
Backend API for IBD RNA-Seq Analysis Platform
"""

import os
import sys
import json
import pandas as pd
import numpy as np
from pathlib import Path
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

# Define base directories
BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / 'data'
ANALYSIS_DIR = BASE_DIR / 'analysis'
WEB_DIR = BASE_DIR / 'web'

# Create Flask app
app = Flask(__name__, static_folder=str(WEB_DIR))
CORS(app)  # Enable CORS for all routes

# Define routes
@app.route('/')
def index():
    """Serve the main HTML page"""
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def static_files(path):
    """Serve static files"""
    return send_from_directory(app.static_folder, path)

@app.route('/api/gene_expression', methods=['GET'])
def get_gene_expression():
    """Get gene expression data for specified genes and models"""
    # Get query parameters
    genes = request.args.get('genes', '').split(',')
    models = request.args.get('models', '').split(',')
    
    # In a real implementation, this would query the database or load from files
    # For demonstration, we'll return simulated data
    
    # Load gene expression data from analysis directory
    try:
        # Simulate loading data from files
        data = simulate_gene_expression_data(genes, models)
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/pathway_analysis', methods=['GET'])
def get_pathway_analysis():
    """Get pathway analysis data for specified pathway and models"""
    # Get query parameters
    pathway = request.args.get('pathway', '')
    models = request.args.get('models', '').split(',')
    
    # In a real implementation, this would query the database or load from files
    # For demonstration, we'll return simulated data
    
    # Load pathway analysis data from analysis directory
    try:
        # Simulate loading data from files
        data = simulate_pathway_analysis_data(pathway, models)
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/model_comparison', methods=['GET'])
def get_model_comparison():
    """Get model comparison data"""
    # In a real implementation, this would query the database or load from files
    # For demonstration, we'll return simulated data
    
    # Load model comparison data from analysis directory
    try:
        # Simulate loading data from files
        data = simulate_model_comparison_data()
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/target_validation', methods=['GET'])
def get_target_validation():
    """Get target validation data"""
    # In a real implementation, this would query the database or load from files
    # For demonstration, we'll return simulated data
    
    # Load target validation data from analysis directory
    try:
        # Simulate loading data from files
        data = simulate_target_validation_data()
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/search_gene', methods=['GET'])
def search_gene():
    """Search for a gene in the database"""
    # Get query parameters
    query = request.args.get('query', '')
    
    # In a real implementation, this would query the database
    # For demonstration, we'll return simulated data
    
    # Simulate gene search
    try:
        # Simulate searching for genes
        data = simulate_gene_search(query)
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Helper functions to simulate data
def simulate_gene_expression_data(genes, models):
    """Simulate gene expression data for demonstration"""
    # Define model names
    model_names = {
        'cd45rb': 'CD45RBHigh T cell',
        'acute_dss': 'Acute DSS',
        'chronic_dss': 'Chronic DSS',
        'il10ko': 'IL-10KO',
        'human_uc': 'Human UC',
        'human_cd': 'Human CD'
    }
    
    # Create simulated data
    data = {
        'genes': genes,
        'models': {}
    }
    
    # Generate random data for each model
    np.random.seed(42)  # For reproducibility
    
    for model_id in models:
        if model_id in model_names:
            model_name = model_names[model_id]
            
            # Create model data
            model_data = {
                'name': model_name,
                'values': {},
                'errors': {}
            }
            
            # Generate random values for each gene
            for gene in genes:
                # Base values for different models
                base_values = {
                    'cd45rb': 7.0,
                    'acute_dss': 6.5,
                    'chronic_dss': 7.2,
                    'il10ko': 8.0,
                    'human_uc': 6.8,
                    'human_cd': 7.5
                }
                
                # Generate random value based on model
                base = base_values.get(model_id, 7.0)
                model_data['values'][gene] = base + np.random.normal(0, 1.0)
                model_data['errors'][gene] = 0.2 + np.random.uniform(0, 0.8)
            
            # Add model data to result
            data['models'][model_id] = model_data
    
    return data

def simulate_pathway_analysis_data(pathway, models):
    """Simulate pathway analysis data for demonstration"""
    # Define model names
    model_names = {
        'cd45rb': 'CD45RBHigh T cell',
        'acute_dss': 'Acute DSS',
        'chronic_dss': 'Chronic DSS',
        'il10ko': 'IL-10KO',
        'human_uc': 'Human UC',
        'human_cd': 'Human CD'
    }
    
    # Define pathways
    pathways = [
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
    ]
    
    # Create simulated data
    data = {
        'pathway': pathway if pathway else pathways[0],
        'pathways': pathways,
        'models': {}
    }
    
    # Generate random data for each model
    np.random.seed(42)  # For reproducibility
    
    for model_id in models:
        if model_id in model_names:
            model_name = model_names[model_id]
            
            # Create model data
            model_data = {
                'name': model_name,
                'values': {},
                'pvalues': {}
            }
            
            # Generate random values for each pathway
            for p in pathways:
                # Base values for different models
                base_values = {
                    'cd45rb': 3.8,
                    'acute_dss': 3.5,
                    'chronic_dss': 3.7,
                    'il10ko': 4.1,
                    'human_uc': 3.6,
                    'human_cd': 3.9
                }
                
                # Generate random value based on model
                base = base_values.get(model_id, 3.7)
                model_data['values'][p] = base + np.random.normal(0, 0.3)
                model_data['pvalues'][p] = 0.001 + np.random.beta(0.5, 10.0) * 0.05
            
            # Add model data to result
            data['models'][model_id] = model_data
    
    return data

def simulate_model_comparison_data():
    """Simulate model comparison data for demonstration"""
    # Define models
    models = [
        {
            'id': 'cd45rb',
            'name': 'CD45RBHigh T cell',
            'gene_expression_correlation': 0.72,
            'pathway_overlap_score': 0.68,
            'differentially_expressed_genes_overlap': 0.65,
            'overall_similarity_score': 0.69
        },
        {
            'id': 'acute_dss',
            'name': 'Acute DSS',
            'gene_expression_correlation': 0.58,
            'pathway_overlap_score': 0.62,
            'differentially_expressed_genes_overlap': 0.53,
            'overall_similarity_score': 0.58
        },
        {
            'id': 'chronic_dss',
            'name': 'Chronic DSS',
            'gene_expression_correlation': 0.65,
            'pathway_overlap_score': 0.70,
            'differentially_expressed_genes_overlap': 0.61,
            'overall_similarity_score': 0.66
        },
        {
            'id': 'il10ko',
            'name': 'IL-10KO',
            'gene_expression_correlation': 0.78,
            'pathway_overlap_score': 0.75,
            'differentially_expressed_genes_overlap': 0.69,
            'overall_similarity_score': 0.75
        }
    ]
    
    # Create simulated data
    data = {
        'models': models
    }
    
    return data

def simulate_target_validation_data():
    """Simulate target validation data for demonstration"""
    # Define targets
    targets = [
        {
            'gene': 'IL1B',
            'differential_expression_score': 0.92,
            'pathway_relevance_score': 0.88,
            'conservation_score': 0.95,
            'druggability_score': 0.85,
            'overall_target_score': 0.90
        },
        {
            'gene': 'TNF',
            'differential_expression_score': 0.95,
            'pathway_relevance_score': 0.90,
            'conservation_score': 0.98,
            'druggability_score': 0.88,
            'overall_target_score': 0.93
        },
        {
            'gene': 'IL6',
            'differential_expression_score': 0.88,
            'pathway_relevance_score': 0.85,
            'conservation_score': 0.92,
            'druggability_score': 0.80,
            'overall_target_score': 0.86
        },
        {
            'gene': 'IL17A',
            'differential_expression_score': 0.85,
            'pathway_relevance_score': 0.82,
            'conservation_score': 0.90,
            'druggability_score': 0.75,
            'overall_target_score': 0.83
        },
        {
            'gene': 'IFNG',
            'differential_expression_score': 0.87,
            'pathway_relevance_score': 0.84,
            'conservation_score': 0.93,
            'druggability_score': 0.72,
            'overall_target_score': 0.84
        },
        {
            'gene': 'FOXP3',
            'differential_expression_score': 0.78,
            'pathway_relevance_score': 0.80,
            'conservation_score': 0.88,
            'druggability_score': 0.65,
            'overall_target_score': 0.78
        },
        {
            'gene': 'RORC',
            'differential_expression_score': 0.82,
            'pathway_relevance_score': 0.79,
            'conservation_score': 0.85,
            'druggability_score': 0.68,
            'overall_target_score': 0.79
        },
        {
            'gene': 'TBX21',
            'differential_expression_score': 0.80,
            'pathway_relevance_score': 0.78,
            'conservation_score': 0.87,
            'druggability_score': 0.62,
            'overall_target_score': 0.77
        },
        {
            'gene': 'GATA3',
            'differential_expression_score': 0.75,
            'pathway_relevance_score': 0.72,
            'conservation_score': 0.84,
            'druggability_score': 0.60,
            'overall_target_score': 0.73
        },
        {
            'gene': 'IL10',
            'differential_expression_score': 0.83,
            'pathway_relevance_score': 0.85,
            'conservation_score': 0.91,
            'druggability_score': 0.78,
            'overall_target_score': 0.84
        },
        {
            'gene': 'IL23A',
            'differential_expression_score': 0.86,
            'pathway_relevance_score': 0.83,
            'conservation_score': 0.89,
            'druggability_score': 0.76,
            'overall_target_score': 0.84
        },
        {
            'gene': 'IL12B',
            'differential_expression_score': 0.84,
            'pathway_relevance_score': 0.81,
            'conservation_score': 0.88,
            'druggability_score': 0.74,
            'overall_target_score': 0.82
        },
        {
            'gene': 'TGFB1',
            'differential_expression_score': 0.79,
            'pathway_relevance_score': 0.82,
            'conservation_score': 0.90,
            'druggability_score': 0.71,
            'overall_target_score': 0.81
        },
        {
            'gene': 'STAT3',
            'differential_expression_score': 0.88,
            'pathway_relevance_score': 0.86,
            'conservation_score': 0.92,
            'druggability_score': 0.79,
            'overall_target_score': 0.86
        },
        {
            'gene': 'STAT1',
            'differential_expression_score': 0.85,
            'pathway_relevance_score': 0.83,
            'conservation_score': 0.91,
            'druggability_score': 0.77,
            'overall_target_score': 0.84
        }
    ]
    
    # Sort targets by overall score
    targets.sort(key=lambda x: x['overall_target_score'], reverse=True)
    
    # Create simulated data
    data = {
        'targets': targets
    }
    
    return data

def simulate_gene_search(query):
    """Simulate gene search for demonstration"""
    # Define a list of genes
    all_genes = [
        'IL1B', 'TNF', 'IL6', 'IL17A', 'IFNG', 'FOXP3', 'RORC', 'TBX21', 'GATA3', 'IL10',
        'IL23A', 'IL12B', 'TGFB1', 'STAT3', 'STAT1', 'NFKB1', 'RELA', 'MAPK1', 'MAPK3', 'JAK1',
        'JAK2', 'TLR4', 'TLR2', 'MYD88', 'NLRP3', 'IL18', 'IL1A', 'IL4', 'IL5', 'IL13',
        'CCL2', 'CCL5', 'CXCL8', 'CXCL10', 'CCR2', 'CCR5', 'CXCR3', 'CD4', 'CD8A', 'CD19',
        'CD3E', 'CD14', 'CD68', 'ITGAM', 'ITGAX', 'PTGS2', 'NOS2', 'ARG1', 'MRC1', 'IL1RN'
    ]
    
    # Filter genes based on query
    if query:
        filtered_genes = [gene for gene in all_genes if query.upper() in gene]
    else:
        filtered_genes = all_genes
    
    # Create simulated data
    data = {
        'query': query,
        'results': filtered_genes[:10]  # Return top 10 results
    }
    
    return data

# Main function
if __name__ == '__main__':
    # Check if port is provided as command line argument
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 5000
    
    # Run the app
    app.run(host='0.0.0.0', port=port, debug=True)
