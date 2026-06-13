import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';

import { ArrayFilters } from '@/app/utils/utils.types';
import { CheckboxGroup } from '@/components/ui/checkbox-group/checkbox-group';
import { CheckboxList } from '@/components/ui/checkbox-list/checkbox-list';
import { FiltersService } from '@/services/filters.service';

@Component({
  selector: 'app-schools-filters',
  imports: [ CheckboxList ],
  templateUrl: './schools-filters.html',
  styleUrl: './schools-filters.scss',
  host: {
    style: 'display: contents;'
  },
})
export class SchoolsFilters implements OnInit {
  selectedCategories = []
  selectedDuration = []
  selectedPaymentTypes = []
  selectedEducationFormats = []

  @Output() updateFilters = new EventEmitter<Omit<ArrayFilters, 'selectedSchools'>>();
  handleFilterChanging () {
    this.updateFilters.emit({
      selectedCategories: this.selectedCategories,
      selectedDuration: this.selectedDuration,
      selectedPaymentTypes: this.selectedPaymentTypes,
      selectedEducationFormats: this.selectedEducationFormats,
    });
  }

  filtersService = inject(FiltersService);
  ngOnInit() {
    this.filtersService.loadAll();
  }
}
