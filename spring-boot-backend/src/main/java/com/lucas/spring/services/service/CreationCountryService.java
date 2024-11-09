package com.lucas.spring.services.service;

import com.lucas.spring.model.entity.CreationCountryEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public interface CreationCountryService {
    /**
     * Fetch the list of countries where the images were taken.
     * @return List of countries.
     */
    ArrayList<CreationCountryEntity> getCreationCountries();

    /**
     * Fetch a single country where the image was taken from.
     * @param countryCode The country code to fetch by from the db.
     * @return a country.
     */
    CreationCountryEntity getCreationCountry(String countryCode);

    /**
     * Saves the country, and it's code where the image was taken.
     * @param countryCode the ISO 3166-1 alpha-2 code of the country.
     * @param countryName the full name of the country.
     */
    void addCreationCountry(String countryCode, String countryName);

    /**
     * Checks if the provided country is already exists in the db. If not, then we
     * add this new country, and it's code to the db.
     * @param countryCode the ISO 3166-1 alpha-2 code of the country.
     * @param countryName the full name of the country.
     */
    void isCreationDirectionIncludedInTheDB(String countryCode, String countryName);
}
