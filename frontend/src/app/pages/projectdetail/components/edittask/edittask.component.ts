import { Component, ViewChild, ElementRef, Renderer2, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ConfigService } from '../../../../services/config.service';
import { ITask } from '../../ITask';

interface Member {
  _id: string;
  name: string;
}

@Component({
  selector: 'app-edittask',
  templateUrl: './edittask.component.html',
  styleUrls: ['./edittask.component.css']
})
export class EdittaskComponent {
  @Input() projectId!: string;
  @Input() taskId: string | undefined;
  @Output() onTaskEdit: EventEmitter<any> = new EventEmitter();
  members:FormControl = new FormControl();

  apiUrl: string;
  imageUrl: string;

  @ViewChild('modal') modal!: ElementRef;
  constructor(private toastr: ToastrService, private renderer: Renderer2, private http: HttpClient,private datePipe: DatePipe, private configService: ConfigService) {
    this.apiUrl = this.configService.getApiUrl();
    this.imageUrl = this.configService.getImageUrl();
  }

  ngOnInit() {
  }

  fetchTaskDetails() {
    if (this.taskId) {
      this.http.get<ITask>(`${this.apiUrl}tasks/find/${this.taskId}`).subscribe(
        (response) => {
          this.task = {
            name: response.name,
            creator: response.creator,
            members: response.members,
            description: response.description,
          }
          this.members = new FormControl(this.task.members)
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  openModal() {
    this.renderer.setStyle(this.modal.nativeElement, 'display', 'block');
    this.fetchTaskDetails();
  }

  closeModal() {
    this.renderer.setStyle(this.modal.nativeElement, 'display', 'none');
  }

  handleMembersChange(updatedMembers: Member[]): void {
    this.task.members = updatedMembers;
  }

  task: any = {
    name: '',
    creator: { _id: '650284123c15396bb64cb255', name: 'Ngô Quang Huy' },
    members: [],
    description: ''
  };

  onSubmit() {
    this.http.put(`${this.apiUrl}tasks/${this.taskId}`, this.task).subscribe(
      (response) => {
        console.log(response);
        this.closeModal();
        this.toastr.success('Cập nhật công việc thành công!', 'Success');
        this.onTaskEdit.emit();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
