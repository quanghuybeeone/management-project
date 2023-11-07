import { Component, ViewChild, ElementRef, Renderer2, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ConfigService } from '../../../../services/config.service';
import { ITask, Member } from '../../ITask'
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-addnewtask',
  templateUrl: './addnewtask.component.html',
  styleUrls: ['./addnewtask.component.css']
})

export class AddnewtaskComponent implements OnInit{
  @Input() projectId!: string;
  @Output() onTaskAdded: EventEmitter<any> = new EventEmitter();
  members = new FormControl();
  memberList: Member[] = [];

  apiUrl: string;
  imageUrl: string;

  @ViewChild('modal') modal!: ElementRef;

  constructor(private toastr: ToastrService, private renderer: Renderer2, private http: HttpClient, private configService: ConfigService, private authService: AuthService) {
    this.apiUrl = this.configService.getApiUrl();
    this.imageUrl = this.configService.getImageUrl();
    this.newTask.members = []
  }

  ngOnInit(): void {
    this.newTask.projectId = this.projectId
  }

  openModal() {
    this.renderer.setStyle(this.modal.nativeElement, 'display', 'block');
  }

  closeModal() {
    this.renderer.setStyle(this.modal.nativeElement, 'display', 'none');
  }

  newTask:ITask = <ITask>{}

  handleMembersChange(updatedMembers: Member[]): void {
    this.newTask.members = updatedMembers;
  }

  onSubmit() {
    // console.log(this.newTask);
    const creator = this.authService.getUser()
    if(creator){
      this.newTask.creator = creator
    }

    this.http.post(`${this.apiUrl}tasks`, this.newTask).subscribe(
      (response) => {
        // console.log(response);
        this.closeModal()
        this.toastr.success('Thêm mới công việc thành công!', 'Success');
        this.onTaskAdded.emit();
        this.newTask = <ITask>{}
        this.newTask.projectId = this.projectId
        this.newTask.members = []
        if(creator){
          this.newTask.creator = creator
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
