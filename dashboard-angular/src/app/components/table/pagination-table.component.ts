import { Component, OnInit, ChangeDetectorRef } from '@angular/core';  // ✅ add ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';

export type Column = {
  Header: string;
  accessor: string;
};

type RowData = { [key: string]: string | number };

@Component({
  selector: 'app-pagination-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination-table.component.html',
  styleUrls: ['./pagination-table.component.scss'],
})
export class PaginationTableComponent implements OnInit {
  columns: Column[] = [];
  data: RowData[] = [];
  page = 1;
  totalPages = 1;
  loading = true;
  error = '';

  constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef   // ✅ ADD THIS
  ) {}

  async ngOnInit() {
    await this.loadHeaders();
    await this.loadData();
  }

  async loadHeaders() {
    try {
      const headers: { header: string; accessor: string }[] =
        await this.api.getHeaders();
      this.columns = headers.map((col) => ({
        Header: col.header,
        accessor: col.accessor,
      }));
      this.cdr.detectChanges();      // ✅ force re-render after headers load
    } catch (err) {
      console.error('Table header error:', err);
      this.error = 'Failed to load table headers';
      this.cdr.detectChanges();
    }
  }

  async loadData() {
    this.loading = true;
    try {
      const result = await this.api.getCandidates(this.page, 3);
      this.data = [...result.data];          // ✅ spread to new array reference
      this.totalPages = result.totalPages;
    } catch (err) {
      console.error('Table data error:', err);
      this.error = 'Failed to load candidates';
    } finally {
      this.loading = false;
      this.cdr.detectChanges();      // ✅ force re-render after data loads
    }
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  async goToPage(p: number) {
    if (p < 1 || p > this.totalPages) return;
    this.page = p;
    await this.loadData();
  }
}