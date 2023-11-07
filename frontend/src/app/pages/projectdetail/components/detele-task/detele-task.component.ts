import { Component, ViewChild, ElementRef, Renderer2, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../../services/config.service';

@Component({
  selector: 'app-detele-task',
  templateUrl: './detele-task.component.html',
  styleUrls: ['./detele-task.component.css']
})
export class DeteleTaskComponent {
  @Input() taskId: string | undefined;
  @Output() onTaskDelete: EventEmitter<any> = new EventEmitter();
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
    if (this.taskId) {
      this.http.delete(`${this.apiUrl}tasks/${this.taskId}`).subscribe(
        (response) => {
          console.log(response);
          this.closeModal();
          this.toastr.success('Xóa công việc thành công!', 'Success');
          this.onTaskDelete.emit();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
