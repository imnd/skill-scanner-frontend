export type PrimaryKey = string | number

export type Id = number | string | boolean;

export type Sorting = {
  field: string
  type: 'ASC' | 'DESC'
}

export type AvailableSorting = {
  value: Sorting,
  title: string,
}

export type ArrayFilters = {
  selectedSchools: PrimaryKey[]
  selectedCategories: PrimaryKey[]
  selectedDuration: PrimaryKey[]
  selectedPaymentTypes: PrimaryKey[]
  selectedEducationFormats: PrimaryKey[]
}

export type ScalarFilters = {
  page: number
  sorting: Sorting
  searchString: string
  limit: number
}

export type Filters = ScalarFilters & ArrayFilters
