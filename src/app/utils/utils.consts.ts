import type { Filters } from '@/app/utils/utils.types';

export const emptyFilters: Filters = {
  selectedCategories: [],
  selectedSchools: [],
  selectedDuration: [],
  selectedPaymentTypes: [],
  selectedEducationFormats: [],
  sorting: {
    field: '',
    type: 'ASC',
  },
  searchString: '',
  limit: 20,
  page: 1,
}
