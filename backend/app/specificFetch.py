import requests

# Define the API URL
listing_id = "your_listing_id_here"
api_url = f"http://localhost:5000/api/listings/{listing_id}"

# Send a GET request to fetch the listing by ID
response = requests.get(api_url)

# Check if the request was successful
if response.status_code == 200:
    listing = response.json()
    print(f"Listing with ID {listing_id} fetched successfully:")
    print(listing)
else:
    print(f"Failed to fetch listing. Status code: {response.status_code}")
    print("Error:", response.json())
