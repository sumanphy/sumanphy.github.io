# need to test.
"""
Script to fetch citation data from Google Scholar
Run this script periodically to update your citation statistics
Requires: pip install scholarly

Usage: python fetch_scholar_data.py
"""

from scholarly import scholarly
import json
from datetime import datetime

# Your Google Scholar ID (from your profile URL)
SCHOLAR_ID = "GygfZgYAAAAJ"

def fetch_citation_data():
    """Fetch citation data from Google Scholar"""
    print(f"Fetching data for Scholar ID: {SCHOLAR_ID}")
    
    try:
        # Search for the author
        author = scholarly.search_author_id(SCHOLAR_ID)
        author = scholarly.fill(author)
        
        # Extract citation data
        citations = author.get('cites_per_year', {})
        total_citations = author.get('citedby', 0)
        h_index = author.get('hindex', 0)
        i10_index = author.get('i10index', 0)
        
        # Prepare data structure
        data = {
            'last_updated': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'total_citations': total_citations,
            'h_index': h_index,
            'i10_index': i10_index,
            'citations_per_year': citations
        }
        
        # Save to JSON file
        with open('citations/scholar_data.json', 'w') as f:
            json.dump(data, f, indent=2)
        
        print("✓ Data fetched successfully!")
        print(f"Total Citations: {total_citations}")
        print(f"h-index: {h_index}")
        print(f"i10-index: {i10_index}")
        print(f"Years with data: {list(citations.keys())}")
        print(f"\nData saved to: scholar_data.json")
        
        return data
        
    except Exception as e:
        print(f"Error fetching data: {e}")
        return None

if __name__ == "__main__":
    fetch_citation_data()