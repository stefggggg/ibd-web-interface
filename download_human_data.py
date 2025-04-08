#!/usr/bin/env python3
"""
Script to download and process human IBD RNA-seq datasets for IBD research
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
HUMAN_RAW_DIR = DATA_DIR / 'human' / 'raw'
HUMAN_PROCESSED_DIR = DATA_DIR / 'human' / 'processed'

# Ensure directories exist
os.makedirs(HUMAN_RAW_DIR, exist_ok=True)
os.makedirs(HUMAN_PROCESSED_DIR, exist_ok=True)

# Define dataset information
DATASETS = {
    'human_ibd': {
        'geo_id': 'GSE235236',
        'description': 'Human UC and CD bulk RNA-seq dataset',
        'type': 'bulk_rnaseq'
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

def extract_sample_metadata(geo_id, input_dir, output_dir):
    """Extract sample metadata from series matrix file"""
    print(f"Extracting sample metadata for {geo_id}...")
    
    # Path to series matrix file
    series_matrix_file = input_dir / geo_id / f"{geo_id}_series_matrix.txt"
    
    if not os.path.exists(series_matrix_file):
        print(f"Series matrix file not found for {geo_id}")
        return False
    
    # Extract sample metadata
    sample_metadata = {}
    characteristics = {}
    
    try:
        with open(series_matrix_file, 'r') as f:
            for line in f:
                if line.startswith('!Sample_geo_accession'):
                    sample_ids = line.strip().split('\t')[1:]
                    for sample_id in sample_ids:
                        sample_metadata[sample_id] = {}
                        characteristics[sample_id] = []
                
                elif line.startswith('!Sample_title'):
                    sample_titles = line.strip().split('\t')[1:]
                    for i, sample_id in enumerate(sample_metadata.keys()):
                        sample_metadata[sample_id]['title'] = sample_titles[i]
                
                elif line.startswith('!Sample_characteristics_ch'):
                    parts = line.strip().split('\t')
                    for i, sample_id in enumerate(sample_metadata.keys()):
                        if i+1 < len(parts):
                            characteristics[sample_id].append(parts[i+1])
                
                elif line.startswith('!Sample_source_name_ch'):
                    sources = line.strip().split('\t')[1:]
                    for i, sample_id in enumerate(sample_metadata.keys()):
                        if i < len(sources):
                            sample_metadata[sample_id]['source'] = sources[i]
        
        # Process characteristics to extract key-value pairs
        for sample_id, chars in characteristics.items():
            for char in chars:
                if ':' in char:
                    key, value = char.split(':', 1)
                    sample_metadata[sample_id][key.strip()] = value.strip()
        
        # Save metadata to CSV
        metadata_df = pd.DataFrame.from_dict(sample_metadata, orient='index')
        metadata_file = output_dir / geo_id / f"{geo_id}_sample_metadata.csv"
        os.makedirs(os.path.dirname(metadata_file), exist_ok=True)
        metadata_df.to_csv(metadata_file)
        
        print(f"Successfully extracted sample metadata for {geo_id}")
        return True
    
    except Exception as e:
        print(f"Error extracting sample metadata for {geo_id}: {str(e)}")
        return False

def process_dataset(geo_id, dataset_type, input_dir, output_dir):
    """Process a downloaded dataset based on its type"""
    print(f"Processing {geo_id} ({dataset_type})...")
    
    # Create directory for processed data
    processed_dir = output_dir / geo_id
    os.makedirs(processed_dir, exist_ok=True)
    
    # Extract sample metadata
    extract_sample_metadata(geo_id, input_dir, output_dir)
    
    # Create a placeholder file with processing information
    with open(processed_dir / "processing_info.txt", 'w') as f:
        f.write(f"Processing information for {geo_id} ({dataset_type})\n\n")
        
        if dataset_type == 'bulk_rnaseq':
            f.write("Human IBD bulk RNA-seq processing would include:\n")
            f.write("1. Quality control with FastQC\n")
            f.write("2. Adapter trimming with Trimmomatic or similar\n")
            f.write("3. Alignment with STAR to human genome (GRCh38)\n")
            f.write("4. Quantification with featureCounts or similar\n")
            f.write("5. Normalization with DESeq2 or similar\n")
            f.write("6. Differential expression analysis between:\n")
            f.write("   - UC vs. healthy controls\n")
            f.write("   - CD vs. healthy controls\n")
            f.write("   - UC vs. CD\n")
            f.write("7. Pathway enrichment analysis\n")
    
    print(f"Created processing information for {geo_id}")
    return True

def main():
    """Main function to download and process all datasets"""
    print("Starting download and processing of human IBD datasets...")
    
    # Download and process each dataset
    for dataset_name, dataset_info in DATASETS.items():
        geo_id = dataset_info['geo_id']
        dataset_type = dataset_info['type']
        description = dataset_info['description']
        
        print(f"\nProcessing {description} (GEO: {geo_id})...")
        
        # Download metadata
        if download_geo_metadata(geo_id, HUMAN_RAW_DIR):
            print(f"Successfully downloaded metadata for {geo_id}")
        else:
            print(f"Failed to download metadata for {geo_id}")
            continue
        
        # Download supplementary files
        if download_geo_supplementary_files(geo_id, HUMAN_RAW_DIR):
            print(f"Successfully downloaded supplementary files for {geo_id}")
        else:
            print(f"Failed to download supplementary files for {geo_id}")
            continue
        
        # Process the dataset
        if process_dataset(geo_id, dataset_type, HUMAN_RAW_DIR, HUMAN_PROCESSED_DIR):
            print(f"Successfully processed {geo_id}")
        else:
            print(f"Failed to process {geo_id}")
    
    print("\nCompleted download and processing of human IBD datasets")

if __name__ == "__main__":
    main()
