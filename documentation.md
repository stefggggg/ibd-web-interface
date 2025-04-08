# IBD RNA-Seq Analysis Platform Documentation

## Overview

The IBD RNA-Seq Analysis Platform is a comprehensive web interface for analyzing bulk RNA-seq data from mouse models of inflammatory bowel disease (IBD) and human IBD samples. This platform enables researchers to:

1. Compare gene expression patterns across different mouse models and human IBD subtypes
2. Explore enriched biological pathways in different models
3. Identify which mouse model best represents human IBD based on gene expression
4. Discover potential targets for validation and therapeutic development

## Datasets

The platform includes data from the following sources:

### Mouse Models
- **CD45RBHigh T cell transfer model**: GSE27302
- **Acute DSS model**: GSE252812
- **Chronic DSS model**: GSE264408
- **IL-10KO model**: GSE107810

### Human IBD Data
- **Ulcerative Colitis (UC) and Crohn's Disease (CD)**: GSE235236

## Features

### Gene Expression Analysis
- Compare expression levels of specific genes across all models
- Visualize expression data as bar plots, heatmaps, or box plots
- Filter by model type and gene of interest

### Pathway Analysis
- Explore enriched biological pathways across different models
- Compare pathway enrichment scores between mouse models and human IBD
- Visualize pathway data as bar plots, heatmaps, or networks

### Model Comparison
- Identify which mouse model best represents human IBD based on:
  - Gene expression correlation
  - Pathway overlap
  - Differentially expressed gene overlap
- View overall similarity scores for each model

### Target Validation
- Identify potential targets for validation based on:
  - Differential expression score
  - Pathway relevance
  - Conservation between mouse and human
  - Druggability
- Prioritize targets based on overall target score

## Technical Implementation

### Data Processing Pipeline
The data processing pipeline includes:

1. **Data Collection**: Downloading and organizing RNA-seq datasets from GEO
2. **Quality Control**: Filtering and normalization of expression data
3. **Differential Expression Analysis**: Identifying differentially expressed genes between conditions
4. **Pathway Analysis**: Enrichment analysis to identify relevant biological pathways
5. **Model Comparison**: Correlation analysis to compare mouse models to human IBD
6. **Target Identification**: Scoring and ranking potential therapeutic targets

### Web Interface
The web interface is built using:

- **Frontend**: HTML, CSS, JavaScript with Bootstrap for responsive design
- **Data Visualization**: Plotly.js for interactive charts and graphs
- **Backend**: Flask API server for data access and processing

## Usage Guide

### Gene Expression Analysis
1. Navigate to the "Gene Expression" section
2. Enter gene symbol(s) in the search box
3. Select models to compare
4. Choose display type (bar plot, heatmap, or box plot)
5. Click "Update" to view results

### Pathway Analysis
1. Navigate to the "Pathway Analysis" section
2. Select a pathway from the dropdown menu
3. Select models to compare
4. Choose display type (bar plot, heatmap, or network)
5. Click "Update" to view results

### Model Comparison
1. Navigate to the "Model Comparison" section
2. View the overall similarity scores for each mouse model
3. Explore detailed metrics for gene expression correlation, pathway overlap, and DE gene overlap

### Target Validation
1. Navigate to the "Target Validation" section
2. View the scatter plot of top potential targets
3. Explore the detailed table of target scores and metrics

## Future Enhancements

1. **User Data Upload**: Allow users to upload their own RNA-seq data for comparison
2. **Advanced Filtering**: Implement more sophisticated filtering options for genes and pathways
3. **Custom Analysis**: Enable users to define custom analysis parameters
4. **Data Export**: Add functionality to export analysis results in various formats
5. **Interactive Network Visualization**: Enhance pathway visualization with interactive network graphs

## Conclusion

The IBD RNA-Seq Analysis Platform provides a user-friendly interface for researchers to explore gene expression patterns across different mouse models of IBD and human IBD samples. By facilitating the comparison of these models, the platform helps identify which mouse model best represents human disease and suggests potential targets for validation and therapeutic development.

This tool addresses a critical need in IBD research by enabling the systematic comparison of preclinical models with human disease, potentially accelerating the translation of findings from animal models to clinical applications.
