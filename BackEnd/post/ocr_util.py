# ocr_util.py
import requests
import openai
import pandas as pd
import re


def perform_ocr(image_path):
    api_key = 'K82267638488957'
    api_url = 'https://api.ocr.space/parse/image'
    
    headers = {
        'apikey': api_key
    }

    with open(image_path, 'rb') as image_file:
        response = requests.post(api_url, headers=headers, files={'image': ('image.jpg', image_file)})
    
    if response.status_code == 200:
        result = response.json()
        extracted_text = result.get('ParsedResults')[0].get('ParsedText')
        print('Text extracted from the image:')
        print(extracted_text)
        return extracted_text
    else:
        print('Error:', response.status_code)
        print(response.text)
        return None

def ask_gpt3_with_prompt(prompt):
    # Set your GPT-3 API key
    openai.api_key = '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'

    try:
        response = openai.Completion.create(
            engine="text-davinci-002",
            prompt=prompt,
            max_tokens=150,
            temperature=0.7,
            stop=None
        )
        return response.choices[0].text.strip()
    except Exception as e:
        print(f"Error interacting with GPT-3: {e}")
        return None

def extract_and_create_dataframe(gpt3_response):
    # Split the response into a list of product-quantity pairs
    response_lines = gpt3_response.split('\n')

    # Create an empty list to store rows
    rows = []

    #commande = pd.DataFrame(columns=['nom_produit', 'quantite', 'status'])

    # Function to add a row to the DataFrame
    def add_row(product_quantity):
        # Split at the first occurrence of a digit to separate quantity from product name
        parts = re.split(r'(\d+)', product_quantity, maxsplit=1)
        if len(parts) == 3:
            product = parts[0].strip()
            quantity = parts[1].strip()
            print({'nom_produit': product, 'quantite': int(quantity), 'status': 'en attente'})
            return {'nom_produit': product, 'quantite': int(quantity), 'status': 'en attente'}
        else:
            print(f"Skipping invalid entry: {product_quantity}")
            return None

    # Add rows to the DataFrame
    #commande = pd.DataFrame([add_row(line) for line in response_lines if line.strip()])
    rows = [add_row(line) for line in response_lines if line.strip()]
    # Filter out None values
    rows = [row for row in rows if row is not None]
    # Create the DataFrame
    commande = pd.DataFrame(rows)

    return commande

# def main():
#     # Your image processing and OCR code here...
#     image_path = 'C:/Users/HP/Documents/GitHub/SmartPack/BackEnd/post/aa.jpg'
#     extracted_text = perform_ocr(image_path)
#     # Example prompt
#     prompt = "Extrait la liste des fournitures et de leurs quantités à partir du texte suivant, puis présente les résultats sous la forme d'une liste avec chaque fourniture suivie de sa quantité. Assure-toi d'inclure uniquement les fournitures et leurs quantités dans la liste de sortie. la liste doit contenir les éléments et la quantité le séparateur entre les éléments doit être ; comme ça output de l'assistant:[element1 5 ,element2 3,element3 8,element4 7]"
#     text=prompt+'\n\n voici le text: \n\n'+extracted_text
#     # Get GPT-3 response
#     gpt3_response = ask_gpt3_with_prompt(text)
#     print('the gpt3 response\n')
#     print(gpt3_response)

#     if gpt3_response is not None:
#         # Extract and create DataFrame
#         commande_df = extract_and_create_dataframe(gpt3_response)
#         commande_df = commande_df.dropna()
#         # Display the DataFrame
#         print("Display the DataFrame")
#         print(commande_df)


# if __name__ == "__main__":
#     main()