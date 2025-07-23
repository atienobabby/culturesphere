# services/qloo_service.py (Updated get_user_tastes function - ONLY CHANGE IS IN THE PARSING LOOP)

import os
import json
import requests
import logging

logger = logging.getLogger(__name__)

# Base URL for the Qloo Hackathon API (confirmed by Qloo)
QLOO_BASE_URL = "https://hackathon.api.qloo.com"

# Mapping for Qloo domains to their respective filter types for insights
# and search types for entity lookup.
# Sample_entity_id values will become less critical as dynamic search works.
QLOO_DOMAIN_MAPPING = {
    "music": {"insight_filter_type": "urn:entity:artist", "search_type": "urn:entity:artist", "sample_entity_id": "4BBEF799-A0C4-4110-AB01-39216993C312"}, # Taylor Swift ID
    "movies": {"insight_filter_type": "urn:entity:movie", "search_type": "urn:entity:movie", "sample_entity_id": "5512B5DE-927A-412E-9941-6923C46B18D8"}, # Placeholder
    "books": {"insight_filter_type": "urn:entity:book", "search_type": "urn:entity:book", "sample_entity_id": "5D6F2C2B-0F8B-4D8A-A0A5-4E7F8C4D7E2B"}, # Placeholder
    "dining": {"insight_filter_type": "urn:entity:place", "search_type": "urn:entity:place", "sample_entity_id": "9B2F1F8E-3C4A-4E7C-9F8A-2C7E9D4B5C6A"}, # Placeholder
    "travel": {"insight_filter_type": "urn:entity:destination", "search_type": "urn:entity:destination", "sample_entity_id": "6C9A0A7D-B2C3-4E1F-8D5E-7A6B8C9D0E1F"}, # Placeholder
    "fashion": {"insight_filter_type": "urn:entity:brand", "search_type": "urn:entity:brand", "sample_entity_id": "8A1B2C3D-4E5F-6A7B-8C9D-0E1F2A3B4C5D"}, # Placeholder
    "wellness": {"insight_filter_type": "urn:entity:person", "search_type": "urn:entity:person", "sample_entity_id": "1D2E3F4A-5B6C-7D8E-9F0A-1B2C3D4E5F6A"}, # Placeholder
    "learning": {"insight_filter_type": "urn:entity:book", "search_type": "urn:entity:book", "sample_entity_id": "7E8F9A0B-1C2D-3E4F-5A6B-7C8D9E0F1A2B"}, # Placeholder
    "general": {"insight_filter_type": "urn:entity:tag", "search_type": "urn:entity:tag", "sample_entity_id": "C1D2E3F4-A5B6-C7D8-E9F0-A1B2C3D4E5F6"}, # Placeholder
}

def _get_qloo_entity_id(query: str, search_type: str, qloo_api_key: str) -> str | None:
    """
    Performs a Qloo /search call to find an entity ID based on a query and type.
    This uses the hackathon base URL for the /search endpoint.
    Returns the entity ID if found, otherwise None.
    """
    search_url = f"{QLOO_BASE_URL}/search"
    
    headers = {
        "X-Api-Key": qloo_api_key,
        "Content-Type": "application/json"
    }
    
    params = {
        "query": query,
        "types": search_type,
        "take": 2
    }

    logger.info(f"Attempting Qloo entity search for '{query}' with type '{search_type}'.")
    logger.info(f"Making Qloo /search API call to {search_url} with params: {params}")

    try:
        response = requests.get(search_url, headers=headers, params=params)
        response.raise_for_status()
        search_results = response.json()
        logger.debug(f"Qloo /search API response: {json.dumps(search_results, indent=2)}")

        if search_results and search_results.get('results'):
            first_result = search_results['results'][0]
            
            entity_id = first_result.get('entity_id') 
            
            if not entity_id: 
                entity_id = first_result.get('id') 
            
            if not entity_id and isinstance(first_result.get('entity'), dict):
                entity_id = first_result['entity'].get('id') 
            
            entity_name = first_result.get('name')
            if not entity_name and isinstance(first_result.get('entity'), dict):
                entity_name = first_result['entity'].get('name')


            if entity_id:
                logger.info(f"Found Qloo entity ID '{entity_id}' for '{entity_name or query}'.") 
                return entity_id
        
        logger.info(f"No Qloo entity found for '{query}'.") 
        return None

    except requests.exceptions.HTTPError as e:
        status_code = e.response.status_code
        logger.error(f"HTTP Error calling Qloo /search API: Status {status_code} - Reason: {e.response.reason}")
        logger.error(f"Response content: {e.response.text}")
        return None
    except requests.exceptions.RequestException as e:
        logger.error(f"Network/Request Error calling Qloo /search API: {e}")
        return None
    except json.JSONDecodeError as e:
        logger.error(f"Error decoding JSON response from Qloo /search: {e}. Raw response: {response.text}")
        return None
    except Exception as e:
        logger.error(f"An unexpected error occurred in Qloo /search call: {e}", exc_info=True)
        return None

def get_user_tastes(user_input: str, domain: str, qloo_api_key: str) -> dict:
    """
    Attempts to get cultural insights from Qloo API.
    First, tries to find a matching entity using the /search endpoint based on user input.
    If found, uses that entity's ID for the /v2/insights call.
    Returns a dictionary with 'status_message' and 'qloo_recommendations' (a list of dicts).
    """
    if not qloo_api_key:
        logger.error("QLOO_API_KEY was not provided to get_user_tastes function.")
        return {"status_message": "Qloo API key not configured.", "qloo_recommendations": []}

    headers = {
        "Content-Type": "application/json", 
        "X-Api-Key": qloo_api_key
    }
    
    status_message = ""
    qloo_recommendations_list = [] 

    domain_map_info = QLOO_DOMAIN_MAPPING.get(domain.lower(), {})
    selected_insight_filter_type = domain_map_info.get("insight_filter_type") 
    selected_search_type = domain_map_info.get("search_type")
    
    target_entity_id = None
    
    # --- Step 1: Attempt to find entity ID using /search endpoint ---
    if selected_search_type and user_input:
        found_entity_id = _get_qloo_entity_id(user_input, selected_search_type, qloo_api_key)
        if found_entity_id:
            target_entity_id = found_entity_id
            status_message = f"Qloo found a matching entity for '{user_input}'. Getting insights..."
        else:
            status_message = (
                f"Qloo could not find a specific entity for '{user_input}' in the '{domain}' domain. "
                f"Recommendations will be based on general AI knowledge."
            )
            logger.info(status_message) 
    else:
        status_message = (
            f"Qloo search not attempted for '{user_input}' in '{domain}' domain "
            f"(missing search type or query). Recommendations will be based on general AI knowledge."
        )
        logger.info(status_message) 

    # Fallback to sample ID only if NO entity was found via search AND a sample ID exists
    if not target_entity_id and domain_map_info.get("sample_entity_id"):
        target_entity_id = domain_map_info["sample_entity_id"]
        status_message += " Falling back to sample ID for insights demo."
        logger.warning(f"No specific entity found, using sample ID: {target_entity_id}")
    elif not target_entity_id: 
        status_message += " No valid entity ID (dynamic or sample) found for insights."
        logger.warning(status_message)
        return {"status_message": status_message, "qloo_recommendations": []}

    # --- Step 2: Make /v2/insights API call using the obtained (or sample) entity ID ---
    if target_entity_id and selected_insight_filter_type:
        insights_url = f"{QLOO_BASE_URL}/v2/insights"
        
        insights_params = {
            "limit": 5, 
            "signal.interests.entities": target_entity_id,  
            "filter.type": selected_insight_filter_type 
        }

        logger.info(f"Making Qloo /insights API (GET) call with params: {insights_params}")
        
        try:
            response = requests.get(insights_url, headers=headers, params=insights_params)
            response.raise_for_status()
            qloo_insights_raw_data = response.json()
            logger.info("Qloo /insights API (GET) call successful.")
            logger.debug(f"Qloo /insights API raw response: {json.dumps(qloo_insights_raw_data, indent=2)}")

            # --- Extract specific recommendations from Qloo Insights Data ---
            # CORRECTED: Iterate over qloo_insights_raw_data['results']['entities']
            if qloo_insights_raw_data and qloo_insights_raw_data.get('results') and qloo_insights_raw_data['results'].get('entities'):
                for entity_item in qloo_insights_raw_data['results']['entities']: # Changed variable name to entity_item for clarity
                    # Each 'entity_item' is now directly the entity dictionary
                    qloo_recommendations_list.append({
                        "name": entity_item.get('name'), 
                        "id": entity_item.get('entity_id'), # Use 'entity_id' from insights response
                        "type": entity_item.get('subtype') or entity_item.get('type') # Use subtype if available, else type
                    })
                status_message += f"\nQloo provided {len(qloo_recommendations_list)} specific recommendations."
            else:
                status_message += "\nQloo /insights API call successful, but no specific results found for the entity's insights."

        except requests.exceptions.HTTPError as e:
            status_code = e.response.status_code
            response_text = e.response.text
            logger.error(f"HTTP Error calling Qloo /insights API: Status {status_code} - Reason: {e.response.reason}")
            logger.error(f"Response content: {response_text}")
            status_message += f"\nQloo /insights API Error: Status {status_code}. Details: {response_text}"
        except requests.exceptions.RequestException as e:
            logger.error(f"Network/Request Error calling Qloo /insights API: {e}")
            status_message += f"\nQloo /insights API Network Error: {e}"
        except json.JSONDecodeError as e:
            logger.error(f"Error decoding JSON response from Qloo /insights: {e}. Raw response: {response.text}")
            status_message += "\nQloo /insights API returned unreadable response."
        except Exception as e:
            logger.error(f"An unexpected error occurred in Qloo /insights call: {e}", exc_info=True)
            status_message += f"\nAn unexpected Qloo /insights service error: {e}"
    else:
        status_message += "\nQloo insights not attempted due to missing target entity ID or filter type."
        logger.warning(status_message)

    return {
        "status_message": status_message,
        "qloo_recommendations": qloo_recommendations_list
    }