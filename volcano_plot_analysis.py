#!/usr/bin/env python3
"""
Volcano plot analysis for IBD RNA-seq data
"""

import os
import sys
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from pathlib import Path
from scipy.stats import pearsonr, spearmanr

# Define base directories
BASE_DIR = Path('/home/ubuntu/rna_seq_interface')
ANALYSIS_DIR = BASE_DIR / 'analysis'
FIGURES_DIR = ANALYSIS_DIR / 'figures'

# Ensure directories exist
os.makedirs(FIGURES_DIR, exist_ok=True)

def generate_volcano_plot_data(de_results, output_dir, comparison_name):
    """
    Generate volcano plot data from differential expression results
    
    Parameters:
    -----------
    de_results : pd.DataFrame
        Differential expression results with log2FoldChange and pvalue columns
    output_dir : Path
        Directory to save results
    comparison_name : str
        Name of the comparison (e.g., 'UC_vs_Control')
    
    Returns:
    --------
    pd.DataFrame
        Volcano plot data
    """
    print(f"Generating volcano plot data for {comparison_name}...")
    
    # Create volcano plot data
    volcano_data = pd.DataFrame({
        'gene': de_results.index,
        'log2FoldChange': de_results['log2FoldChange'],
        'pvalue': de_results['pvalue'],
        '-log10(pvalue)': -np.log10(de_results['pvalue'])
    })
    
    # Add significance and fold change categories
    volcano_data['significant'] = volcano_data['pvalue'] < 0.05
    volcano_data['fold_change_category'] = pd.cut(
        volcano_data['log2FoldChange'],
        bins=[-float('inf'), -2, -1, 1, 2, float('inf')],
        labels=['Strong Down', 'Moderate Down', 'No Change', 'Moderate Up', 'Strong Up']
    )
    
    # Save volcano data to file
    output_file = output_dir / f"{comparison_name}_volcano_data.csv"
    volcano_data.to_csv(output_file)
    
    print(f"Saved volcano plot data to {output_file}")
    
    # Create volcano plot
    plt.figure(figsize=(10, 8))
    
    # Define colors for different categories
    colors = {
        'Strong Down': 'blue',
        'Moderate Down': 'lightblue',
        'No Change': 'gray',
        'Moderate Up': 'pink',
        'Strong Up': 'red'
    }
    
    # Plot points
    for category, color in colors.items():
        subset = volcano_data[volcano_data['fold_change_category'] == category]
        plt.scatter(
            subset['log2FoldChange'],
            subset['-log10(pvalue)'],
            color=color,
            alpha=0.7,
            label=category
        )
    
    # Add horizontal line for significance threshold
    plt.axhline(y=-np.log10(0.05), color='gray', linestyle='--', alpha=0.7)
    
    # Add vertical lines for fold change thresholds
    plt.axvline(x=-1, color='gray', linestyle='--', alpha=0.7)
    plt.axvline(x=1, color='gray', linestyle='--', alpha=0.7)
    
    # Label top significant genes
    top_genes = volcano_data[volcano_data['significant']].nlargest(10, '-log10(pvalue)')
    for _, row in top_genes.iterrows():
        plt.text(
            row['log2FoldChange'],
            row['-log10(pvalue)'],
            row['gene'],
            fontsize=9
        )
    
    # Set plot labels and title
    plt.xlabel('log2 Fold Change')
    plt.ylabel('-log10(p-value)')
    plt.title(f'Volcano Plot: {comparison_name}')
    plt.legend()
    plt.grid(alpha=0.3)
    
    # Save figure
    figure_file = FIGURES_DIR / f"{comparison_name}_volcano_plot.png"
    plt.savefig(figure_file, dpi=300)
    plt.close()
    
    print(f"Saved volcano plot to {figure_file}")
    
    return volcano_data

def generate_correlation_analysis(expression_data_dict, metadata_dict, output_dir):
    """
    Generate correlation analysis between different models
    
    Parameters:
    -----------
    expression_data_dict : dict
        Dictionary of expression data DataFrames for different models
    metadata_dict : dict
        Dictionary of metadata DataFrames for different models
    output_dir : Path
        Directory to save results
    
    Returns:
    --------
    pd.DataFrame
        Correlation analysis results
    """
    print("Generating correlation analysis between models...")
    
    # Get common genes across all models
    # In a real implementation, this would involve ortholog mapping for cross-species comparison
    # For demonstration, we'll assume the same gene names across models
    
    # Extract model names
    model_names = list(expression_data_dict.keys())
    
    # Create correlation matrix
    correlation_matrix = pd.DataFrame(
        index=model_names,
        columns=model_names
    )
    
    # Calculate correlations between models
    for model1 in model_names:
        for model2 in model_names:
            if model1 == model2:
                correlation_matrix.loc[model1, model2] = 1.0
            else:
                # Get expression data for both models
                expr1 = expression_data_dict[model1]
                expr2 = expression_data_dict[model2]
                
                # Get common genes
                common_genes = expr1.index.intersection(expr2.index)
                
                # Calculate mean expression for each gene in each model
                mean_expr1 = expr1.loc[common_genes].mean(axis=1)
                mean_expr2 = expr2.loc[common_genes].mean(axis=1)
                
                # Calculate correlation
                corr, _ = pearsonr(mean_expr1, mean_expr2)
                correlation_matrix.loc[model1, model2] = corr
    
    # Save correlation matrix to file
    output_file = output_dir / "model_correlation_matrix.csv"
    correlation_matrix.to_csv(output_file)
    
    print(f"Saved correlation matrix to {output_file}")
    
    # Create heatmap
    plt.figure(figsize=(10, 8))
    sns.heatmap(
        correlation_matrix,
        annot=True,
        cmap='viridis',
        vmin=0,
        vmax=1,
        square=True
    )
    plt.title('Gene Expression Correlation Between Models')
    plt.tight_layout()
    
    # Save figure
    figure_file = FIGURES_DIR / "model_correlation_heatmap.png"
    plt.savefig(figure_file, dpi=300)
    plt.close()
    
    print(f"Saved correlation heatmap to {figure_file}")
    
    # Create hierarchical clustering of models based on correlation
    plt.figure(figsize=(12, 8))
    sns.clustermap(
        correlation_matrix,
        cmap='viridis',
        vmin=0,
        vmax=1,
        annot=True,
        figsize=(12, 10)
    )
    plt.title('Hierarchical Clustering of Models Based on Gene Expression')
    
    # Save figure
    figure_file = FIGURES_DIR / "model_correlation_clustering.png"
    plt.savefig(figure_file, dpi=300)
    plt.close()
    
    print(f"Saved correlation clustering to {figure_file}")
    
    return correlation_matrix

def generate_pca_analysis(expression_data_dict, metadata_dict, output_dir):
    """
    Generate PCA analysis of all models
    
    Parameters:
    -----------
    expression_data_dict : dict
        Dictionary of expression data DataFrames for different models
    metadata_dict : dict
        Dictionary of metadata DataFrames for different models
    output_dir : Path
        Directory to save results
    
    Returns:
    --------
    dict
        PCA analysis results
    """
    print("Generating PCA analysis of all models...")
    
    # Combine expression data from all models
    # In a real implementation, this would involve ortholog mapping for cross-species comparison
    # For demonstration, we'll assume the same gene names across models
    
    # Create a list to store combined data
    combined_data = []
    combined_metadata = []
    
    # Process each model
    for model_name, expr_data in expression_data_dict.items():
        # Get metadata for this model
        metadata = metadata_dict[model_name]
        
        # Calculate mean expression for each gene in each condition
        for condition in metadata['condition'].unique():
            # Get samples for this condition
            condition_samples = metadata[metadata['condition'] == condition].index
            
            # Calculate mean expression
            mean_expr = expr_data[condition_samples].mean(axis=1)
            
            # Add to combined data
            combined_data.append(mean_expr)
            
            # Add metadata
            combined_metadata.append({
                'model': model_name,
                'condition': condition
            })
    
    # Convert to DataFrame
    combined_df = pd.DataFrame(combined_data).T
    combined_df.columns = [f"{meta['model']}_{meta['condition']}" for meta in combined_metadata]
    
    # Perform PCA
    from sklearn.decomposition import PCA
    from sklearn.preprocessing import StandardScaler
    
    # Transpose for PCA (samples as rows)
    X = combined_df.T
    
    # Standardize the data
    X_std = StandardScaler().fit_transform(X)
    
    # Perform PCA
    pca = PCA(n_components=2)
    principal_components = pca.fit_transform(X_std)
    
    # Create DataFrame with principal components
    pca_df = pd.DataFrame(
        data=principal_components,
        columns=['PC1', 'PC2']
    )
    
    # Add metadata
    pca_df['model'] = [meta['model'] for meta in combined_metadata]
    pca_df['condition'] = [meta['condition'] for meta in combined_metadata]
    pca_df['label'] = [f"{meta['model']}_{meta['condition']}" for meta in combined_metadata]
    
    # Save PCA results to file
    output_file = output_dir / "pca_analysis.csv"
    pca_df.to_csv(output_file)
    
    print(f"Saved PCA analysis to {output_file}")
    
    # Create PCA plot
    plt.figure(figsize=(12, 10))
    
    # Define colors for different models
    models = pca_df['model'].unique()
    model_colors = {
        model: plt.cm.tab10(i) for i, model in enumerate(models)
    }
    
    # Define markers for different conditions
    conditions = pca_df['condition'].unique()
    condition_markers = {
        condition: marker for condition, marker in zip(conditions, ['o', 's', '^', 'D', 'v', '<', '>', 'p'])
    }
    
    # Plot points
    for model in models:
        for condition in conditions:
            subset = pca_df[(pca_df['model'] == model) & (pca_df['condition'] == condition)]
            if not subset.empty:
                plt.scatter(
                    subset['PC1'],
                    subset['PC2'],
                    color=model_colors[model],
                    marker=condition_markers[condition],
                    s=100,
                    alpha=0.7,
                    label=f"{model} - {condition}"
                )
    
    # Add labels
    for _, row in pca_df.iterrows():
        plt.text(
            row['PC1'] + 0.1,
            row['PC2'] + 0.1,
            row['label'],
            fontsize=9
        )
    
    # Set plot labels and title
    plt.xlabel(f'PC1 ({pca.explained_variance_ratio_[0]:.2%} variance)')
    plt.ylabel(f'PC2 ({pca.explained_variance_ratio_[1]:.2%} variance)')
    plt.title('PCA of Gene Expression Across Models and Conditions')
    plt.legend(bbox_to_anchor=(1.05, 1), loc='upper left')
    plt.grid(alpha=0.3)
    plt.tight_layout()
    
    # Save figure
    figure_file = FIGURES_DIR / "pca_analysis.png"
    plt.savefig(figure_file, dpi=300)
    plt.close()
    
    print(f"Saved PCA plot to {figure_file}")
    
    return {
        'pca_df': pca_df,
        'pca': pca,
        'variance_explained': pca.explained_variance_ratio_
    }

def main():
    """Main function to run the volcano plot and correlation analysis"""
    print("Starting volcano plot and correlation analysis...")
    
    # For demonstration purposes, we'll use simulated data
    # In a real implementation, this would load the actual processed data
    
    # Generate simulated expression data for mouse models
    from data_processing_pipeline import generate_simulated_expression_data, generate_simulated_metadata
    
    # Define mouse models
    mouse_models = {
        'acute_dss': {
            'name': 'Acute DSS',
            'conditions': ['Control', 'DSS'],
            'n_samples': 10,
            'seed': 42
        },
        'chronic_dss': {
            'name': 'Chronic DSS',
            'conditions': ['Control', 'Chronic_DSS'],
            'n_samples': 10,
            'seed': 43
        },
        'il10ko': {
            'name': 'IL-10KO',
            'conditions': ['WT', 'IL10KO'],
            'n_samples': 12,
            'seed': 44
        },
        'cd45rb_tcell': {
            'name': 'CD45RBHigh T cell',
            'conditions': ['Control', 'Week6'],
            'n_samples': 10,
            'seed': 45
        }
    }
    
    # Define human IBD models
    human_models = {
        'human_uc': {
            'name': 'Human UC',
            'conditions': ['Control', 'UC'],
            'n_samples': 10,
            'seed': 46
        },
        'human_cd': {
            'name': 'Human CD',
            'conditions': ['Control', 'CD'],
            'n_samples': 10,
            'seed': 47
        }
    }
    
    # Combine all models
    all_models = {**mouse_models, **human_models}
    
    # Generate expression data and metadata for all models
    expression_data = {}
    metadata = {}
    
    for model_id, model_info in all_models.items():
        print(f"Generating simulated data for {model_info['name']}...")
        
        # Generate expression data
        expr_data = generate_simulated_expression_data(
            n_genes=1000,
            n_samples=model_info['n_samples'],
            seed=model_info['seed']
        )
        
        # Generate metadata
        meta_data = generate_simulated_metadata(
            n_samples=model_info['n_samples'],
            condition_labels=model_info['conditions'],
            seed=model_info['seed']
        )
        
        # Store data
        expression_data[model_id] = expr_data
        metadata[model_id] = meta_data
    
    # Generate differential expression results for each model
    from data_processing_pipeline import perform_differential_expression_analysis
    
    de_results = {}
    
    for model_id, model_info in all_models.items():
        # Get conditions
        conditions = model_info['conditions']
        
        # Skip if there's only one condition
        if len(conditions) < 2:
            continue
        
        # Define comparison name
        comparison_name = f"{model_id}_{conditions[1]}_vs_{conditions[0]}"
        
        # Perform differential expression analysis
        de_result = perform_differential_expression_analysis(
            expression_data[model_id],
            metadata[model_id],
            ANALYSIS_DIR / 'differential_expression',
            comparison_name
        )
        
        # Store results
        de_results[comparison_name] = de_result
    
    # Generate volcano plot data for each differential expression result
    volcano_data = {}
    
    for comparison_name, de_result in de_results.items():
        volcano_data[comparison_name] = generate_volcano_plot_data(
            de_result,
            ANALYSIS_DIR / 'differential_expression',
            comparison_name
        )
    
    # Generate correlation analysis
    correlation_matrix = generate_correlation_analysis(
        expression_data,
        metadata,
        ANALYSIS_DIR / 'model_comparison'
    )
    
    # Generate PCA analysis
    pca_results = generate_pca_analysis(
        expression_data,
        metadata,
        ANALYSIS_DIR / 'model_comparison'
    )
    
    print("Volcano plot and correlation analysis completed successfully")

if __name__ == "__main__":
    main()
