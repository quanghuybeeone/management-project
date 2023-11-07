import { Component, ViewChild, ElementRef, Renderer2, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../../services/config.service';

@Component({
  selector: 'app-detele-project',
  templateUrl: './detele-project.component.html',
  styleUrls: ['./detele-project.component.css']
})
export class DeteleProjectComponent {
  @Input() idproject: string | undefined;
  @Output() onProjectDelete: EventEmitter<any> = new EventEmitter();
  @ViewChild('modal') modal!: ElementRef;
  apiUrl: string;

  constructor(private toastr: ToastrService, private renderer: Renderer2, private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = this.configService.getApiUrl();
  }
  openModal() {
    this.renderer.setStyle(this.modal.nativeElement, 'display', 'block');
  }

  closeModal() {
    this.renderer.setStyle(this.modal.nativeElement, 'display', 'none');
  }
  onSubmit() {
    if (this.idproject) {
      this.http.delete(`${this.apiUrl}projects/${this.idproject}`).subscribe(
        (response) => {
          console.log(response);
          this.closeModal();
          this.toastr.success('Xóa dự án thành công!', 'Success');
          this.onProjectDelete.emit();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
