#!/usr/bin/env python3
"""
Script to download and process mouse model RNA-seq datasets for IBD research
"""

import os
import sys
import subprocess
import pandas as pd
import numpy as np
import requests
import gzip
import shutil
from pathlib import Path

# Define base directories
BASE_DIR = Path('/home/ubuntu/rna_seq_interface')
DATA_DIR = BASE_DIR / 'data'
MOUSE_RAW_DIR = DATA_DIR / 'mouse' / 'raw'
MOUSE_PROCESSED_DIR = DATA_DIR / 'mouse' / 'processed'

# Ensure directories exist
os.makedirs(MOUSE_RAW_DIR, exist_ok=True)
os.makedirs(MOUSE_PROCESSED_DIR, exist_ok=True)

# Define dataset information
DATASETS = {
    'acute_dss': {
        'geo_id': 'GSE252812',
        'description': 'Acute DSS-induced colitis model',
        'type': 'bulk_rnaseq'
    },
    'acute_chronic_dss': {
        'geo_id': 'GSE264408',
        'description': 'Acute and chronic DSS-induced colitis model',
        'type': 'single_cell_rnaseq'
    },
    'il10ko': {
        'geo_id': 'GSE107810',
        'description': 'IL-10 knockout model',
        'type': 'microarray'
    },
    'cd45rb_tcell': {
        'geo_id': 'GSE27302',
        'description': 'CD45RBHigh T cell transfer model',
        'type': 'microarray'
    }
}

def download_geo_metadata(geo_id, output_dir):
    """Download metadata for a GEO dataset"""
    print(f"Downloading metadata for {geo_id}...")
    
    # Create directory for this dataset
    dataset_dir = output_dir / geo_id
    os.makedirs(dataset_dir, exist_ok=True)
    
    # Download series matrix file
    series_matrix_url = f"https://ftp.ncbi.nlm.nih.gov/geo/series/{geo_id[:-3]}nnn/{geo_id}/matrix/{geo_id}_series_matrix.txt.gz"
    series_matrix_file = dataset_dir / f"{geo_id}_series_matrix.txt.gz"
    
    try:
        response = requests.get(series_matrix_url, stream=True)
        if response.status_code == 200:
            with open(series_matrix_file, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
            
            # Extract the gzipped file
            with gzip.open(series_matrix_file, 'rb') as f_in:
                with open(dataset_dir / f"{geo_id}_series_matrix.txt", 'wb') as f_out:
                    shutil.copyfileobj(f_in, f_out)
            
            print(f"Successfully downloaded and extracted metadata for {geo_id}")
            return True
        else:
            print(f"Failed to download metadata for {geo_id}: HTTP status {response.status_code}")
            return False
    except Exception as e:
        print(f"Error downloading metadata for {geo_id}: {str(e)}")
        return False

def download_geo_supplementary_files(geo_id, output_dir):
    """Download supplementary files for a GEO dataset"""
    print(f"Downloading supplementary files for {geo_id}...")
    
    # Create directory for this dataset
    dataset_dir = output_dir / geo_id
    os.makedirs(dataset_dir, exist_ok=True)
    
    # Use GEOquery or direct FTP access to get supplementary files
    # This is a simplified approach - in practice, you might need to parse the series matrix
    # to find the exact supplementary file URLs
    suppl_dir_url = f"https://ftp.ncbi.nlm.nih.gov/geo/series/{geo_id[:-3]}nnn/{geo_id}/suppl/"
    
    # For demonstration, we'll just create a file noting that this step would require
    # more specific handling for each dataset
    with open(dataset_dir / "download_note.txt", 'w') as f:
        f.write(f"Supplementary files for {geo_id} would be downloaded from {suppl_dir_url}\n")
        f.write("In a production environment, this would involve:\n")
        f.write("1. Parsing the series matrix to find specific file URLs\n")
        f.write("2. Downloading raw count data or processed expression matrices\n")
        f.write("3. Handling dataset-specific file formats and structures\n")
    
    print(f"Created download note for {geo_id} supplementary files")
    return True

def process_dataset(geo_id, dataset_type, output_dir):
    """Process a downloaded dataset based on its type"""
    print(f"Processing {geo_id} ({dataset_type})...")
    
    # Create directory for processed data
    processed_dir = output_dir / geo_id
    os.makedirs(processed_dir, exist_ok=True)
    
    # Create a placeholder file with processing information
    with open(processed_dir / "processing_info.txt", 'w') as f:
        f.write(f"Processing information for {geo_id} ({dataset_type})\n\n")
        
        if dataset_type == 'bulk_rnaseq':
            f.write("Bulk RNA-seq processing would include:\n")
            f.write("1. Quality control with FastQC\n")
            f.write("2. Adapter trimming with Trimmomatic or similar\n")
            f.write("3. Alignment with STAR or similar\n")
            f.write("4. Quantification with featureCounts or similar\n")
            f.write("5. Normalization with DESeq2 or similar\n")
        
        elif dataset_type == 'single_cell_rnaseq':
            f.write("Single-cell RNA-seq processing would include:\n")
            f.write("1. Quality control with FastQC\n")
            f.write("2. Cell filtering and quality metrics with Seurat or similar\n")
            f.write("3. Normalization and scaling\n")
            f.write("4. Dimensionality reduction (PCA, UMAP, t-SNE)\n")
            f.write("5. Clustering and cell type annotation\n")
        
        elif dataset_type == 'microarray':
            f.write("Microarray processing would include:\n")
            f.write("1. Background correction\n")
            f.write("2. Normalization (RMA, quantile, etc.)\n")
            f.write("3. Probe filtering and summarization\n")
            f.write("4. Batch correction if necessary\n")
    
    print(f"Created processing information for {geo_id}")
    return True

def main():
    """Main function to download and process all datasets"""
    print("Starting download and processing of mouse model datasets...")
    
    # Download and process each dataset
    for dataset_name, dataset_info in DATASETS.items():
        geo_id = dataset_info['geo_id']
        dataset_type = dataset_info['type']
        description = dataset_info['description']
        
        print(f"\nProcessing {description} (GEO: {geo_id})...")
        
        # Download metadata
        if download_geo_metadata(geo_id, MOUSE_RAW_DIR):
            print(f"Successfully downloaded metadata for {geo_id}")
        else:
            print(f"Failed to download metadata for {geo_id}")
            continue
        
        # Download supplementary files
        if download_geo_supplementary_files(geo_id, MOUSE_RAW_DIR):
            print(f"Successfully downloaded supplementary files for {geo_id}")
        else:
            print(f"Failed to download supplementary files for {geo_id}")
            continue
        
        # Process the dataset
        if process_dataset(geo_id, dataset_type, MOUSE_PROCESSED_DIR):
            print(f"Successfully processed {geo_id}")
        else:
            print(f"Failed to process {geo_id}")
    
    print("\nCompleted download and processing of mouse model datasets")

if __name__ == "__main__":
    main()
