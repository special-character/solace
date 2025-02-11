import type { Advocate } from "@/app/types";
/**
 * Filter advocates based on the search term
 */
export const getFilteredAdvocates = (
  advocates: Advocate[],
  searchTerm: string
) =>
  advocates.filter((advocate) => {
    const fieldMatchesSearchTerm = (field: string) => {
      const normalizedSearchTerm = searchTerm.toLowerCase().trim();
      const normalizedField = field.toLowerCase().trim();
      return normalizedField.includes(normalizedSearchTerm);
    };

    const fieldsMatchSearchTerm = (fields: string[]) =>
      fields.some(fieldMatchesSearchTerm);

    return (
      fieldMatchesSearchTerm(advocate.firstName) ||
      fieldMatchesSearchTerm(advocate.lastName) ||
      fieldMatchesSearchTerm(advocate.city) ||
      fieldMatchesSearchTerm(advocate.degree) ||
      // Need to check all specialties
      fieldsMatchSearchTerm(advocate.specialties) ||
      // match years of experience exactly, this makes more sense to me than matching digits
      advocate.yearsOfExperience === parseInt(searchTerm) ||
      // match phone number with any digits, this makes more sense for a use to search for a phone number
      fieldMatchesSearchTerm(`${advocate.phoneNumber}`)
    );
  });
