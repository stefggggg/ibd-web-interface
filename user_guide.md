# IBD RNA-Seq Analysis Platform: User Guide

## Introduction

Welcome to the IBD RNA-Seq Analysis Platform, a specialized tool designed for researchers studying inflammatory bowel disease (IBD). This platform allows you to compare gene expression patterns across multiple mouse models and human IBD samples, helping you identify the most relevant animal models and potential therapeutic targets.

## Getting Started

### Accessing the Platform

The IBD RNA-Seq Analysis Platform is a web-based application that can be accessed through any modern web browser. The interface is designed to be intuitive and user-friendly, with clear navigation and interactive visualizations.

### Navigation

The platform is organized into five main sections, accessible from the navigation bar at the top of the page:

1. **Home**: Overview of the platform and quick search functionality
2. **Gene Expression**: Compare expression levels of specific genes across models
3. **Pathway Analysis**: Explore enriched biological pathways in different models
4. **Model Comparison**: Identify which mouse model best represents human IBD
5. **Target Validation**: Discover potential targets for validation

## Quick Search

For rapid analysis, use the Quick Search panel on the home page:

1. Enter a gene symbol (e.g., TNF, IL10, FOXP3) in the search box
2. Select the models you want to compare
3. Click "Search" to view the expression results

## Detailed Analysis Features

### Gene Expression Analysis

This section allows you to compare expression levels of specific genes across different mouse models and human IBD samples.

**How to use:**
1. Enter one or more gene symbols in the "Gene Symbol(s)" field, separated by commas
2. Select the models you want to include in the comparison
3. Choose your preferred display type (Bar Plot, Heatmap, or Box Plot)
4. Click "Update" to generate the visualization

**Tips:**
- Bar plots are best for comparing a single gene across models
- Heatmaps are ideal for comparing multiple genes across models
- Box plots show the distribution of expression values, revealing variability

### Pathway Analysis

This section helps you explore enriched biological pathways across different models.

**How to use:**
1. Select a pathway from the dropdown menu
2. Choose the models you want to include in the comparison
3. Select your preferred display type (Bar Plot, Heatmap, or Network)
4. Click "Update" to generate the visualization

**Available pathways include:**
- Inflammatory response
- Cytokine signaling
- T cell activation
- B cell receptor signaling
- NF-kB signaling
- TNF signaling
- IL-17 signaling
- Toll-like receptor signaling
- JAK-STAT signaling
- MAPK signaling

### Model Comparison

This section helps you identify which mouse model best represents human IBD based on gene expression patterns.

**Features:**
- Overall similarity scores for each mouse model compared to human IBD
- Detailed metrics for:
  - Gene expression correlation
  - Pathway overlap
  - Differentially expressed gene overlap

**Interpretation:**
- Higher scores indicate greater similarity to human IBD
- Models with scores above 0.7 are considered highly representative
- Consider multiple metrics when selecting a model for your research

### Target Validation

This section helps you identify potential targets for validation based on expression patterns and pathway relevance.

**Features:**
- Interactive scatter plot of top potential targets
- Detailed table with scores for:
  - Differential expression
  - Pathway relevance
  - Conservation between mouse and human
  - Druggability
  - Overall target score

**How to interpret the scatter plot:**
- X-axis: Pathway relevance score
- Y-axis: Differential expression score
- Point size: Druggability score (larger = more druggable)
- Color: Conservation score (darker = more conserved)

## Example Workflows

### Comparing Inflammatory Cytokines Across Models

1. Navigate to the Gene Expression section
2. Enter "TNF, IL1B, IL6, IL17A" in the Gene Symbol(s) field
3. Select all models
4. Choose "Heatmap" as the display type
5. Click "Update" to view the comparison

### Identifying the Best Mouse Model for UC Research

1. Navigate to the Model Comparison section
2. Review the overall similarity scores
3. Pay special attention to the IL-10KO and CD45RBHigh T cell models, which show the highest similarity to human UC
4. Examine the detailed metrics to understand specific strengths of each model

### Finding Novel Therapeutic Targets

1. Navigate to the Target Validation section
2. Review the scatter plot to identify genes with high scores in multiple categories
3. Focus on targets in the upper right corner (high expression and pathway relevance)
4. Consult the detailed table to find targets with high overall scores
5. Consider both established targets (e.g., TNF, IL1B) and novel candidates

## Data Sources

The platform includes data from the following sources:

### Mouse Models
- CD45RBHigh T cell transfer model (GSE27302)
- Acute DSS model (GSE252812)
- Chronic DSS model (GSE264408)
- IL-10KO model (GSE107810)

### Human IBD Data
- Ulcerative Colitis (UC) and Crohn's Disease (CD) (GSE235236)

## Troubleshooting

**Issue**: No results appear after clicking "Update"
**Solution**: Ensure you've entered valid gene symbols and selected at least one model

**Issue**: Gene not found in search
**Solution**: Try alternative gene symbols or check for typos

**Issue**: Visualization appears too small
**Solution**: Use a larger screen or try a different display type

## Contact and Support

For questions, feedback, or support, please contact:
- Email: support@ibd-rnaseq-platform.org
- Website: www.ibd-rnaseq-platform.org

## Citation

If you use this platform in your research, please cite:
"IBD RNA-Seq Analysis Platform: A comprehensive tool for comparing mouse models with human inflammatory bowel disease. (2025)"
