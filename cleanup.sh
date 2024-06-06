#!/bin/bash

# Define the base directory where the numbered folders are located
base_dir="."


#Generate current date
current_date=$(date -u +%Y%m%d)
echo "Current Date: $current_date"


# Iterate over each numbered folder in the base directory
for folder in "$base_dir"/*; do

    # Check if the folder is a directory and its name is a number
    if [ -d "$folder" ] && [[ "$(basename "$folder")" =~ ^[0-9]+$ ]]; then
        
        # Iterate over each subfolder in the numbered folder
        for subfolder in "$folder"/*; do
            
            # Check if the subfolder is a directory
            if [ -d "$subfolder" ]; then
                echo "Directory Found: $subfolder"

                # Extract the subfolder name and strip the timestamp suffix
                subfolder_name=$(basename "$subfolder" | cut -d '_' -f 1)
                echo $subfolder_name

                # Convert subfolder_name into a date
                subfolder_date=$(date -u -d "$subfolder_name" +%Y%m%d)

                # Calculate the difference in days between subfolder_date and current_date
                days_difference=$(( ($(date -u -d "$current_date" +%s) - $(date -u -d "$subfolder_date" +%s)) / 86400 ))

                #If a report is older than 30 days, remove it
                if [ "$days_difference" -gt 30 ]; then
                    echo "Directory: $subfolder is $days_difference days old. Removing..."
                    rm -rf "$subfolder"
                    echo "Removed subfolder: $subfolder"
                fi
            fi
        done
    fi
done